/**
 * Blog Content Audit Admin Page
 * Analyzes all CMS blog posts and generates audit report
 * Access: /admin/blog-content-audit
 */

import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SEOHead } from '@/components/ui/seo-head';
import { 
  generateAuditReport, 
  formatAuditReportAsMarkdown,
  BlogAuditReport,
  ContentAnalysis 
} from '@/services/blogContentAnalyzer';
import { Download, RefreshCw, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export default function BlogContentAuditPage() {
  const [report, setReport] = useState<BlogAuditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<ContentAnalysis | null>(null);

  useEffect(() => {
    const runAudit = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all blog posts
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');

        if (items.length === 0) {
          setError('No blog posts found in CMS');
          setLoading(false);
          return;
        }

        // Generate audit report
        const auditReport = generateAuditReport(items);
        setReport(auditReport);
      } catch (err) {
        setError(`Error running audit: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    runAudit();
  }, []);

  const handleDownloadReport = () => {
    if (!report) return;

    const markdown = formatAuditReportAsMarkdown(report);
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`);
    element.setAttribute('download', `blog-audit-report-${new Date().toISOString().split('T')[0]}.md`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRefreshAudit = () => {
    setLoading(true);
    setSelectedPost(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Running blog content audit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <SEOHead 
            title="Blog Content Audit"
            description="Admin tool for analyzing blog content quality"
          />
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h1 className="text-2xl font-heading text-red-900 mb-2">Error</h1>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <SEOHead 
            title="Blog Content Audit"
            description="Admin tool for analyzing blog content quality"
          />
          <p className="text-secondary">No audit data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Blog Content Audit Report"
        description="Comprehensive analysis of blog post content quality and recommendations"
      />

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading text-dark-gray mb-4">Blog Content Audit Report</h1>
          <p className="text-lg text-secondary mb-6">
            Comprehensive analysis of all CMS blog posts with recommendations for improvement
          </p>
          <div className="flex gap-4">
            <Button onClick={handleDownloadReport} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Download Report (Markdown)
            </Button>
            <Button onClick={handleRefreshAudit} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Audit
            </Button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-sm mb-2">Total Posts</p>
                  <p className="text-3xl font-heading text-dark-gray">{report.totalPosts}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-sm mb-2">Avg Word Count</p>
                  <p className="text-3xl font-heading text-dark-gray">{report.averageWordCount}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-sm mb-2">Posts Needing Rewrite</p>
                  <p className="text-3xl font-heading text-dark-gray">{report.postsNeedingRewrite}</p>
                  <p className="text-xs text-secondary mt-1">
                    {Math.round((report.postsNeedingRewrite / report.totalPosts) * 100)}% of total
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-sm mb-2">Words Needed</p>
                  <p className="text-3xl font-heading text-dark-gray">
                    {(report.totalWordCountNeeded / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-secondary mt-1">to reach 3000+ per post</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Quality Breakdown */}
        <Card className="border-0 shadow-sm mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading text-dark-gray mb-6">Content Quality Breakdown</h2>
            
            <div className="space-y-4">
              {/* Thin Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary font-medium">Thin Content (&lt;500 words)</span>
                  <span className="text-dark-gray font-heading">
                    {report.thinContentPosts} posts ({Math.round((report.thinContentPosts / report.totalPosts) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-light-gray rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(report.thinContentPosts / report.totalPosts) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Moderate Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary font-medium">Moderate Content (500-1500 words)</span>
                  <span className="text-dark-gray font-heading">
                    {report.moderateContentPosts} posts ({Math.round((report.moderateContentPosts / report.totalPosts) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-light-gray rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${(report.moderateContentPosts / report.totalPosts) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Comprehensive Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary font-medium">Comprehensive Content (1500+ words)</span>
                  <span className="text-dark-gray font-heading">
                    {report.comprehensiveContentPosts} posts ({Math.round((report.comprehensiveContentPosts / report.totalPosts) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-light-gray rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(report.comprehensiveContentPosts / report.totalPosts) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post-by-Post Analysis */}
        <div>
          <h2 className="text-2xl font-heading text-dark-gray mb-6">Post-by-Post Analysis</h2>
          
          <div className="space-y-4">
            {report.analyses.map((analysis, index) => (
              <Card 
                key={analysis.postId} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPost(selectedPost?.postId === analysis.postId ? null : analysis)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-secondary text-sm font-medium">#{index + 1}</span>
                        <h3 className="text-lg font-heading text-dark-gray line-clamp-2">
                          {analysis.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-secondary mb-3">
                        <span>📝 {analysis.wordCount} words</span>
                        <span>⏱️ {analysis.readingTime} min read</span>
                        <span>
                          {analysis.contentQuality === 'thin' && '🔴 Thin'}
                          {analysis.contentQuality === 'moderate' && '🟠 Moderate'}
                          {analysis.contentQuality === 'comprehensive' && '🟢 Comprehensive'}
                        </span>
                      </div>

                      {/* Structure Indicators */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {analysis.hasH2Sections && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">H2 ✓</span>}
                        {!analysis.hasH2Sections && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">No H2</span>}
                        
                        {analysis.hasH3Sections && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">H3 ✓</span>}
                        {!analysis.hasH3Sections && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">No H3</span>}
                        
                        {analysis.hasFAQ && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">FAQ ✓</span>}
                        {!analysis.hasFAQ && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">No FAQ</span>}
                        
                        {analysis.hasKeyTakeaways && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Takeaways ✓</span>}
                        {!analysis.hasKeyTakeaways && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">No Takeaways</span>}
                        
                        {analysis.hasComparisons && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Comparison ✓</span>}
                        {!analysis.hasComparisons && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">No Comparison</span>}
                        
                        {analysis.hasExamples && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Examples ✓</span>}
                        {!analysis.hasExamples && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">No Examples</span>}
                      </div>
                    </div>

                    <div className="text-right">
                      {analysis.issues.length > 0 && (
                        <AlertCircle className="h-6 w-6 text-red-500" />
                      )}
                      {analysis.issues.length === 0 && (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedPost?.postId === analysis.postId && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      {analysis.issues.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-heading text-dark-gray mb-2">Issues:</h4>
                          <ul className="space-y-1">
                            {analysis.issues.map((issue, i) => (
                              <li key={i} className="text-sm text-secondary flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {analysis.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-heading text-dark-gray mb-2">Recommendations:</h4>
                          <ul className="space-y-1">
                            {analysis.recommendations.map((rec, i) => (
                              <li key={i} className="text-sm text-secondary flex items-start gap-2">
                                <span className="text-blue-500 mt-1">→</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 p-6 bg-light-gray rounded-lg">
          <p className="text-secondary text-sm">
            <strong>Note:</strong> This audit analyzes content structure, word count, and presence of key elements. 
            For detailed content quality assessment, manual review is recommended. 
            See <code className="bg-white px-2 py-1 rounded">/src/PHASE6_BLOG_REWRITE_TEMPLATE.md</code> for rewrite guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
