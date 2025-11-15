import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface SlugAnalysis {
  post: BlogPosts;
  hasProtocol: boolean;
  originalSlug: string;
  fixedSlug: string;
  needsUpdate: boolean;
}

export default function BlogSlugFixPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [analysis, setAnalysis] = useState<SlugAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [fixing, setFixing] = useState(false);
  const [fixComplete, setFixComplete] = useState(false);

  const analyzeSlug = (slug: string | undefined): { hasProtocol: boolean; fixedSlug: string } => {
    if (!slug) return { hasProtocol: false, fixedSlug: '' };
    
    // Check if slug contains protocol
    const hasProtocol = /^https?:\/\/|^heep:\/\/|^ftp:\/\/|^[a-z]+:\/\//i.test(slug);
    
    let fixedSlug = slug;
    
    if (hasProtocol) {
      try {
        // Try to extract path from URL
        const url = new URL(slug.startsWith('heep://') ? slug.replace('heep://', 'http://') : slug);
        fixedSlug = url.pathname.replace(/^\//, ''); // Remove leading slash
        
        // If it's a blog path, extract just the slug part
        if (fixedSlug.startsWith('blog/')) {
          fixedSlug = fixedSlug.replace('blog/', '');
        }
      } catch (error) {
        // If URL parsing fails, try to extract manually
        fixedSlug = slug.replace(/^[a-z]+:\/\/[^\/]+\/?/i, '');
        if (fixedSlug.startsWith('blog/')) {
          fixedSlug = fixedSlug.replace('blog/', '');
        }
      }
    }
    
    // Ensure slug is URL-friendly
    fixedSlug = fixedSlug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    return { hasProtocol, fixedSlug };
  };

  useEffect(() => {
    const fetchAndAnalyzePosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setBlogPosts(items);
        
        const analysisResults: SlugAnalysis[] = items.map(post => {
          const { hasProtocol, fixedSlug } = analyzeSlug(post.slug);
          return {
            post,
            hasProtocol,
            originalSlug: post.slug || '',
            fixedSlug,
            needsUpdate: hasProtocol || (post.slug !== fixedSlug && fixedSlug !== '')
          };
        });
        
        setAnalysis(analysisResults);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzePosts();
  }, []);

  const fixAllSlugs = async () => {
    setFixing(true);
    
    try {
      const postsToUpdate = analysis.filter(item => item.needsUpdate);
      
      for (const item of postsToUpdate) {
        // CRITICAL: Preserve all existing data when updating
        await BaseCrudService.update<BlogPosts>('blogposts', {
          ...item.post, // Preserve all existing fields
          slug: item.fixedSlug // Only update the slug
        });
      }
      
      setFixComplete(true);
      
      // Refresh the analysis
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const newAnalysis: SlugAnalysis[] = items.map(post => {
        const { hasProtocol, fixedSlug } = analyzeSlug(post.slug);
        return {
          post,
          hasProtocol,
          originalSlug: post.slug || '',
          fixedSlug,
          needsUpdate: hasProtocol || (post.slug !== fixedSlug && fixedSlug !== '')
        };
      });
      
      setAnalysis(newAnalysis);
    } catch (error) {
      console.error('Error fixing slugs:', error);
    } finally {
      setFixing(false);
    }
  };

  const problemCount = analysis.filter(item => item.needsUpdate).length;
  const protocolCount = analysis.filter(item => item.hasProtocol).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Analyzing blog post slugs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-gray mb-4">Blog Slug Analysis & Fix</h1>
          <p className="text-secondary">
            This tool analyzes and fixes blog post slugs that contain protocols or other formatting issues.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-dark-gray mb-2">{analysis.length}</div>
              <div className="text-sm text-secondary">Total Posts</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{protocolCount}</div>
              <div className="text-sm text-secondary">With Protocols</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{problemCount}</div>
              <div className="text-sm text-secondary">Need Updates</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{analysis.length - problemCount}</div>
              <div className="text-sm text-secondary">Correct Format</div>
            </CardContent>
          </Card>
        </div>

        {/* Fix Button */}
        {problemCount > 0 && !fixComplete && (
          <div className="mb-8 text-center">
            <Button 
              onClick={fixAllSlugs} 
              disabled={fixing}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
            >
              {fixing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Fixing Slugs...
                </>
              ) : (
                <>
                  Fix All Slugs ({problemCount})
                </>
              )}
            </Button>
          </div>
        )}

        {/* Success Message */}
        {fixComplete && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 font-medium">All blog post slugs have been fixed successfully!</p>
          </div>
        )}

        {/* Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle>Slug Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.map((item, index) => (
                <div key={item.post._id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-dark-gray mb-1">
                        {item.post.title || `Post ${index + 1}`}
                      </h3>
                      <div className="text-sm text-secondary">ID: {item.post._id}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.hasProtocol && (
                        <Badge variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Has Protocol
                        </Badge>
                      )}
                      {item.needsUpdate && !item.hasProtocol && (
                        <Badge variant="secondary">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Needs Format Fix
                        </Badge>
                      )}
                      {!item.needsUpdate && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Correct
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700 mb-1">Original Slug:</div>
                      <div className="bg-gray-100 p-2 rounded font-mono break-all">
                        {item.originalSlug || '(empty)'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700 mb-1">Fixed Slug:</div>
                      <div className="bg-green-50 p-2 rounded font-mono break-all">
                        {item.fixedSlug || '(empty)'}
                      </div>
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