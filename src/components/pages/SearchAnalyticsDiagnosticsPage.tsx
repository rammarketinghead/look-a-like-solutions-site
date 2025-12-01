import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SEOHead } from '@/components/ui/seo-head';
import { BaseCrudService } from '@/integrations';
import { SearchAnalytics } from '@/entities';
import { SearchAnalyticsService } from '@/services/searchAnalyticsService';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function SearchAnalyticsDiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState<any>(null);

  const runDiagnostics = async () => {
    setIsLoading(true);
    const results: any = {
      timestamp: new Date().toISOString(),
      tests: []
    };

    try {
      // Test 1: Can we read from searchanalytics collection?
      try {
        const { items } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
        results.tests.push({
          name: 'Read Collection',
          status: 'success',
          message: `Successfully read ${items.length} records from searchanalytics collection`
        });
      } catch (error) {
        results.tests.push({
          name: 'Read Collection',
          status: 'error',
          message: `Failed to read: ${error instanceof Error ? error.message : String(error)}`
        });
      }

      // Test 2: Can we create a test record?
      try {
        const testId = `test-${Date.now()}`;
        await BaseCrudService.create('searchanalytics', {
          _id: testId,
          queryString: `test-query-${Date.now()}`,
          searchCount: 1,
          firstSearchedAt: new Date(),
          lastSearchedAt: new Date(),
          hasResults: true,
          lastSearchUserAgent: navigator.userAgent
        });
        results.tests.push({
          name: 'Create Record',
          status: 'success',
          message: `Successfully created test record (ID: ${testId})`
        });
        
        // Clean up test record
        try {
          await BaseCrudService.delete('searchanalytics', testId);
        } catch (e) {
          console.log('Could not delete test record');
        }
      } catch (error) {
        results.tests.push({
          name: 'Create Record',
          status: 'error',
          message: `Failed to create: ${error instanceof Error ? error.message : String(error)}`
        });
      }

      // Test 3: Check collection structure
      try {
        const { items } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
        if (items.length > 0) {
          const sample = items[0];
          const fields = Object.keys(sample).filter(k => !k.startsWith('_'));
          results.tests.push({
            name: 'Collection Structure',
            status: 'success',
            message: `Collection has ${fields.length} fields: ${fields.join(', ')}`
          });
        } else {
          results.tests.push({
            name: 'Collection Structure',
            status: 'warning',
            message: 'Collection is empty - cannot verify structure'
          });
        }
      } catch (error) {
        results.tests.push({
          name: 'Collection Structure',
          status: 'error',
          message: `Failed to check: ${error instanceof Error ? error.message : String(error)}`
        });
      }

      // Test 4: Browser environment
      results.tests.push({
        name: 'Browser Environment',
        status: 'success',
        message: `User Agent: ${navigator.userAgent}`
      });

    } catch (error) {
      results.error = error instanceof Error ? error.message : String(error);
    }

    setDiagnostics(results);
    setIsLoading(false);
  };

  const runTestSearch = async () => {
    if (!testQuery.trim()) {
      setTestResult({ error: 'Please enter a test query' });
      return;
    }

    setTestResult({ loading: true });
    try {
      await SearchAnalyticsService.recordSearch(testQuery, true);
      
      // Verify it was recorded
      const { items } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
      const recorded = items.find(item => item.queryString === testQuery.toLowerCase());
      
      if (recorded) {
        setTestResult({
          success: true,
          message: `✓ Search query "${testQuery}" was successfully recorded!`,
          details: {
            queryString: recorded.queryString,
            searchCount: recorded.searchCount,
            hasResults: recorded.hasResults,
            lastSearchedAt: recorded.lastSearchedAt
          }
        });
      } else {
        setTestResult({
          error: 'Query was not found in collection after recording'
        });
      }
    } catch (error) {
      setTestResult({
        error: `Failed to record test query: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <SEOHead 
        title="Search Analytics Diagnostics - Lookalike Solutions"
        description="Diagnose search analytics collection setup and permissions"
        noIndex={true}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-[100rem]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-dark-gray mb-4">
            Search Analytics Diagnostics
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            Test and verify your search analytics collection setup, permissions, and integration.
          </p>
        </div>

        {/* Diagnostic Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Test Runner */}
          <Card>
            <CardHeader>
              <CardTitle>Run Diagnostics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-secondary">
                Click the button below to run a series of tests on your search analytics collection setup.
              </p>
              <Button 
                onClick={runDiagnostics} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  'Run Diagnostics'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Test Search */}
          <Card>
            <CardHeader>
              <CardTitle>Test Search Recording</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-dark-gray block mb-2">
                  Test Query
                </label>
                <input
                  type="text"
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  placeholder="Enter a test search query..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <Button 
                onClick={runTestSearch}
                className="w-full"
              >
                Record Test Query
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Diagnostic Results */}
        {diagnostics && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Diagnostic Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-secondary mb-4">
                Ran at: {new Date(diagnostics.timestamp).toLocaleString()}
              </div>
              
              {diagnostics.tests.map((test: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {test.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    {test.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    {test.status === 'warning' && (
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-dark-gray">{test.name}</h4>
                        <Badge variant={
                          test.status === 'success' ? 'default' : 
                          test.status === 'error' ? 'destructive' : 
                          'secondary'
                        }>
                          {test.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-secondary">{test.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Test Result */}
        {testResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Test Result</CardTitle>
            </CardHeader>
            <CardContent>
              {testResult.loading && (
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Recording test query...</span>
                </div>
              )}
              {testResult.success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <p className="font-medium mb-2">{testResult.message}</p>
                    <div className="text-sm space-y-1">
                      <p><strong>Query:</strong> {testResult.details.queryString}</p>
                      <p><strong>Search Count:</strong> {testResult.details.searchCount}</p>
                      <p><strong>Has Results:</strong> {testResult.details.hasResults ? 'Yes' : 'No'}</p>
                      <p><strong>Last Searched:</strong> {new Date(testResult.details.lastSearchedAt).toLocaleString()}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              {testResult.error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {testResult.error}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Troubleshooting Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-dark-gray mb-2">❌ "Read Collection" Test Failed</h4>
              <p className="text-sm text-secondary mb-2">
                The searchanalytics collection cannot be read. This is likely a permission issue.
              </p>
              <p className="text-sm text-secondary font-medium">Fix:</p>
              <ol className="text-sm text-secondary list-decimal list-inside space-y-1 ml-2">
                <li>Go to Wix CMS Collections</li>
                <li>Select "Search Analytics" collection</li>
                <li>Click "Permissions"</li>
                <li>Change "Read" from "ADMIN" to "ANYONE"</li>
                <li>Save and refresh this page</li>
              </ol>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-dark-gray mb-2">❌ "Create Record" Test Failed</h4>
              <p className="text-sm text-secondary mb-2">
                New records cannot be created in the collection. Check insert permissions.
              </p>
              <p className="text-sm text-secondary font-medium">Fix:</p>
              <ol className="text-sm text-secondary list-decimal list-inside space-y-1 ml-2">
                <li>Go to Wix CMS Collections</li>
                <li>Select "Search Analytics" collection</li>
                <li>Click "Permissions"</li>
                <li>Ensure "Insert" is set to "ANYONE"</li>
                <li>Ensure "Update" is set to "ANYONE"</li>
                <li>Save and refresh this page</li>
              </ol>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-dark-gray mb-2">✓ All Tests Pass But No Data Shows</h4>
              <p className="text-sm text-secondary mb-2">
                The collection is working but no search data is being recorded.
              </p>
              <p className="text-sm text-secondary font-medium">Check:</p>
              <ol className="text-sm text-secondary list-decimal list-inside space-y-1 ml-2">
                <li>Use "Test Search Recording" above to verify recording works</li>
                <li>Check browser console for any error messages</li>
                <li>Verify search bar is being used on the website</li>
                <li>Check that recordSearch() is being called in search-bar.tsx</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
