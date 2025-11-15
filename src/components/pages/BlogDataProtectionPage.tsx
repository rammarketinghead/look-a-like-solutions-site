import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  FileText, 
  Image as ImageIcon,
  Calendar,
  User,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

interface DataIntegrityCheck {
  post: BlogPosts;
  issues: string[];
  hasEmptyFields: boolean;
  missingCriticalData: boolean;
  lastModified: Date | undefined;
}

export default function BlogDataProtectionPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [dataChecks, setDataChecks] = useState<DataIntegrityCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [backupData, setBackupData] = useState<string>('');

  const performDataIntegrityCheck = (posts: BlogPosts[]): DataIntegrityCheck[] => {
    return posts.map(post => {
      const issues: string[] = [];
      let hasEmptyFields = false;
      let missingCriticalData = false;

      // Check for empty or missing critical fields
      if (!post.title || post.title.trim() === '') {
        issues.push('Missing title');
        missingCriticalData = true;
      }

      if (!post.content || post.content.trim() === '') {
        issues.push('Missing content');
        missingCriticalData = true;
      }

      if (!post.slug || post.slug.trim() === '') {
        issues.push('Missing slug');
        missingCriticalData = true;
      }

      // Check for empty optional fields that were likely filled before
      if (!post.author || post.author.trim() === '') {
        issues.push('Missing author');
        hasEmptyFields = true;
      }

      if (!post.excerpt || post.excerpt.trim() === '') {
        issues.push('Missing excerpt');
        hasEmptyFields = true;
      }

      if (!post.featuredImage || post.featuredImage.trim() === '') {
        issues.push('Missing featured image');
        hasEmptyFields = true;
      }

      if (!post.metaDescription || post.metaDescription.trim() === '') {
        issues.push('Missing meta description');
        hasEmptyFields = true;
      }

      if (!post.publishedDate) {
        issues.push('Missing published date');
        hasEmptyFields = true;
      }

      // Check for suspicious data patterns that might indicate data loss
      if (post.title && post.title.length < 10) {
        issues.push('Unusually short title (possible data truncation)');
      }

      if (post.content && post.content.length < 100) {
        issues.push('Unusually short content (possible data loss)');
      }

      return {
        post,
        issues,
        hasEmptyFields,
        missingCriticalData,
        lastModified: post._updatedDate ? new Date(post._updatedDate) : undefined
      };
    });
  };

  useEffect(() => {
    const fetchAndAnalyzePosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setBlogPosts(items);
        
        const checks = performDataIntegrityCheck(items);
        setDataChecks(checks);
        
        // Create backup of current data
        setBackupData(JSON.stringify(items, null, 2));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzePosts();
  }, []);

  const recheckData = async () => {
    setChecking(true);
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setBlogPosts(items);
      
      const checks = performDataIntegrityCheck(items);
      setDataChecks(checks);
      
      setBackupData(JSON.stringify(items, null, 2));
    } catch (error) {
      console.error('Error rechecking data:', error);
    } finally {
      setChecking(false);
    }
  };

  const downloadBackup = () => {
    const blob = new Blob([backupData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-posts-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const criticalIssues = dataChecks.filter(check => check.missingCriticalData);
  const emptyFieldIssues = dataChecks.filter(check => check.hasEmptyFields && !check.missingCriticalData);
  const healthyPosts = dataChecks.filter(check => check.issues.length === 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Analyzing blog post data integrity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-dark-gray">Blog Data Protection & Integrity</h1>
          </div>
          <p className="text-secondary text-lg">
            Monitor and protect your blog post data from accidental deletion or corruption.
          </p>
        </div>

        {/* Critical Alert */}
        {criticalIssues.length > 0 && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Critical Data Loss Detected!</strong> {criticalIssues.length} blog post(s) are missing essential data (title, content, or slug). 
              This may indicate data corruption or accidental deletion.
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-gray mb-1">{dataChecks.length}</div>
              <div className="text-sm text-secondary">Total Posts</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">{healthyPosts.length}</div>
              <div className="text-sm text-secondary">Healthy Posts</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">{emptyFieldIssues.length}</div>
              <div className="text-sm text-secondary">Missing Fields</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600 mb-1">{criticalIssues.length}</div>
              <div className="text-sm text-secondary">Critical Issues</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={recheckData} 
            disabled={checking}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {checking ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Rechecking...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Recheck Data
              </>
            )}
          </Button>
          
          <Button 
            onClick={downloadBackup}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Backup
          </Button>
        </div>

        {/* Data Protection Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Data Protection Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Root Cause Analysis</h4>
                <p className="text-blue-800 text-sm">
                  The primary cause of data loss in CMS blog posts is typically due to <strong>partial updates</strong> that only send 
                  specific fields (like _id and one field) instead of preserving all existing data. When using BaseCrudService.update(), 
                  always spread the existing object (...existingPost) to preserve all fields.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Prevention Measures</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Always use spread operator (...post) when updating CMS records</li>
                  <li>• Implement data validation before updates</li>
                  <li>• Create regular backups of critical content</li>
                  <li>• Monitor data integrity with automated checks</li>
                  <li>• Use version control for content changes</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">Fixed Code Pattern</h4>
                <pre className="text-orange-800 text-sm bg-orange-100 p-2 rounded mt-2 overflow-x-auto">
{`// WRONG - This will delete other fields
await BaseCrudService.update('blogposts', {
  _id: post._id,
  slug: newSlug
});

// CORRECT - This preserves all existing data
await BaseCrudService.update('blogposts', {
  ...post,        // Preserve all existing fields
  slug: newSlug   // Only update the specific field
});`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Data Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataChecks.map((check, index) => (
                <div key={check.post._id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-dark-gray mb-1">
                        {check.post.title || `Untitled Post ${index + 1}`}
                      </h3>
                      <div className="text-sm text-secondary">
                        ID: {check.post._id}
                      </div>
                      {check.lastModified && (
                        <div className="text-sm text-secondary flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Last modified: {check.lastModified.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {check.missingCriticalData && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Critical
                        </Badge>
                      )}
                      {check.hasEmptyFields && !check.missingCriticalData && (
                        <Badge variant="secondary">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Missing Fields
                        </Badge>
                      )}
                      {check.issues.length === 0 && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Healthy
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {check.issues.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">Issues Found:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {check.issues.map((issue, issueIndex) => (
                          <div key={issueIndex} className="flex items-center text-sm">
                            {issue.includes('Missing title') || issue.includes('Missing content') || issue.includes('Missing slug') ? (
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                            )}
                            <span className={issue.includes('Missing title') || issue.includes('Missing content') || issue.includes('Missing slug') ? 'text-red-700' : 'text-orange-700'}>
                              {issue}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Field Status Grid */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className={`flex items-center ${check.post.title ? 'text-green-600' : 'text-red-600'}`}>
                      <FileText className="h-3 w-3 mr-1" />
                      Title: {check.post.title ? '✓' : '✗'}
                    </div>
                    <div className={`flex items-center ${check.post.content ? 'text-green-600' : 'text-red-600'}`}>
                      <FileText className="h-3 w-3 mr-1" />
                      Content: {check.post.content ? '✓' : '✗'}
                    </div>
                    <div className={`flex items-center ${check.post.featuredImage ? 'text-green-600' : 'text-orange-600'}`}>
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Image: {check.post.featuredImage ? '✓' : '✗'}
                    </div>
                    <div className={`flex items-center ${check.post.author ? 'text-green-600' : 'text-orange-600'}`}>
                      <User className="h-3 w-3 mr-1" />
                      Author: {check.post.author ? '✓' : '✗'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}