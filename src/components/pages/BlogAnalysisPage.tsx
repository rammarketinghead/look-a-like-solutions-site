import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  Calendar,
  User,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';

export default function BlogAnalysisPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        // Sort by creation date to see chronological order
        const sortedPosts = items.sort((a, b) => 
          new Date(a._createdDate || 0).getTime() - new Date(b._createdDate || 0).getTime()
        );
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const getPostStatus = (post: BlogPosts) => {
    const hasTitle = post.title && post.title.trim() !== '';
    const hasContent = post.content && post.content.trim() !== '';
    const hasSlug = post.slug && post.slug.trim() !== '';
    
    if (!hasTitle && !hasContent && hasSlug) return 'slug-only';
    if (!hasTitle && !hasContent) return 'empty';
    if (hasTitle && hasContent) return 'complete';
    return 'partial';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Complete</Badge>;
      case 'partial':
        return <Badge variant="secondary"><AlertTriangle className="h-3 w-3 mr-1" />Partial</Badge>;
      case 'slug-only':
        return <Badge variant="destructive"><LinkIcon className="h-3 w-3 mr-1" />Slug Only</Badge>;
      case 'empty':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Empty</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Analyzing blog posts...</p>
        </div>
      </div>
    );
  }

  const slugOnlyPosts = blogPosts.filter(post => getPostStatus(post) === 'slug-only');
  const emptyPosts = blogPosts.filter(post => getPostStatus(post) === 'empty');
  const partialPosts = blogPosts.filter(post => getPostStatus(post) === 'partial');
  const completePosts = blogPosts.filter(post => getPostStatus(post) === 'complete');

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-dark-gray">Blog Posts Analysis</h1>
          </div>
          <p className="text-secondary text-lg">
            Complete analysis of all blog posts in chronological order to identify recovery targets.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-gray mb-1">{blogPosts.length}</div>
              <div className="text-sm text-secondary">Total Posts</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">{completePosts.length}</div>
              <div className="text-sm text-secondary">Complete</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <LinkIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">{slugOnlyPosts.length}</div>
              <div className="text-sm text-secondary">Slug Only</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600 mb-1">{emptyPosts.length + partialPosts.length}</div>
              <div className="text-sm text-secondary">Needs Recovery</div>
            </CardContent>
          </Card>
        </div>

        {/* Recovery Actions */}
        {slugOnlyPosts.length > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Posts with Slug Only - Recovery Targets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 mb-4">
                Found {slugOnlyPosts.length} posts that have slugs but missing title and content. These are likely your target blogs 13, 14, and 15.
              </p>
              <Button 
                onClick={() => window.location.href = '/admin/specific-blog-recovery'}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Recover These Posts
              </Button>
            </CardContent>
          </Card>
        )}

        {/* All Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts (Chronological Order)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.map((post, index) => {
                const status = getPostStatus(post);
                const isTarget = status === 'slug-only' && index >= 12 && index <= 14; // Potential blogs 13, 14, 15
                
                return (
                  <div 
                    key={post._id} 
                    className={`border rounded-lg p-4 ${isTarget ? 'border-orange-300 bg-orange-50' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-dark-gray">
                            #{index + 1}: {post.title || 'Untitled Post'}
                          </h3>
                          {isTarget && (
                            <Badge className="bg-orange-100 text-orange-800">
                              Recovery Target
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Database className="h-3 w-3 mr-1" />
                              ID: {post._id}
                            </div>
                            {post._createdDate && (
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Created: {new Date(post._createdDate).toLocaleDateString()}
                              </div>
                            )}
                            {post.author && (
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                Author: {post.author}
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            {post.slug && (
                              <div className="flex items-center">
                                <LinkIcon className="h-3 w-3 mr-1" />
                                Slug: {post.slug}
                              </div>
                            )}
                            {post.featuredImage && (
                              <div className="flex items-center">
                                <ImageIcon className="h-3 w-3 mr-1" />
                                Has Featured Image
                              </div>
                            )}
                            {post.publishedDate && (
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Published: {new Date(post.publishedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {post.excerpt && (
                          <p className="text-sm text-secondary mt-2 italic">
                            "{post.excerpt}"
                          </p>
                        )}
                      </div>
                      
                      <div className="ml-4">
                        {getStatusBadge(status)}
                      </div>
                    </div>
                    
                    {/* Content Preview */}
                    {post.content && (
                      <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                        <strong>Content Preview:</strong> {post.content.substring(0, 150)}
                        {post.content.length > 150 && '...'}
                      </div>
                    )}
                    
                    {/* Missing Fields */}
                    {status !== 'complete' && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Missing Fields:</div>
                        <div className="flex flex-wrap gap-2">
                          {!post.title && <Badge variant="outline" className="text-xs">title</Badge>}
                          {!post.content && <Badge variant="outline" className="text-xs">content</Badge>}
                          {!post.author && <Badge variant="outline" className="text-xs">author</Badge>}
                          {!post.excerpt && <Badge variant="outline" className="text-xs">excerpt</Badge>}
                          {!post.featuredImage && <Badge variant="outline" className="text-xs">featuredImage</Badge>}
                          {!post.metaDescription && <Badge variant="outline" className="text-xs">metaDescription</Badge>}
                          {!post.publishedDate && <Badge variant="outline" className="text-xs">publishedDate</Badge>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}