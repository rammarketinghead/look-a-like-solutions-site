import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Plus,
  Save,
  Trash2,
  FileText,
  Image as ImageIcon,
  Calendar,
  User,
  Link as LinkIcon,
  Search,
  Download,
  Upload,
  RotateCcw
} from 'lucide-react';

interface BlogPostAnalysis {
  post: BlogPosts;
  isEmpty: boolean;
  missingFields: string[];
  hasContent: boolean;
  dataQuality: 'good' | 'partial' | 'poor' | 'empty';
}

interface RecoveryTemplate {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  metaDescription: string;
  slug: string;
  category: string;
}

export default function BlogDataRecoveryPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [analysis, setAnalysis] = useState<BlogPostAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [recovering, setRecovering] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPosts | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<BlogPosts>>({});
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);

  // Sample blog post templates for recovery
  const recoveryTemplates: RecoveryTemplate[] = [
    {
      title: "10 Essential SEO Strategies for 2024",
      content: "Search Engine Optimization continues to evolve rapidly. In 2024, businesses need to focus on user experience, E-A-T (Expertise, Authoritativeness, Trustworthiness), and technical SEO fundamentals.\n\n1. **Core Web Vitals Optimization**\nGoogle's Core Web Vitals remain crucial ranking factors. Focus on improving Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS).\n\n2. **AI-Powered Content Creation**\nLeverage AI tools responsibly to create high-quality, original content that provides real value to your audience.\n\n3. **Voice Search Optimization**\nOptimize for conversational queries and long-tail keywords as voice search continues to grow.\n\n4. **Mobile-First Indexing**\nEnsure your website is fully optimized for mobile devices, as Google primarily uses mobile versions for indexing.\n\n5. **Local SEO Enhancement**\nFor businesses with physical locations, optimize Google My Business profiles and local citations.\n\n6. **Schema Markup Implementation**\nUse structured data to help search engines understand your content better.\n\n7. **Page Experience Signals**\nFocus on overall user experience, including page speed, mobile-friendliness, and secure browsing.\n\n8. **Content Clusters and Topic Authority**\nCreate comprehensive content clusters around main topics to establish topical authority.\n\n9. **Video Content Optimization**\nOptimize video content for search engines with proper titles, descriptions, and transcripts.\n\n10. **Regular SEO Audits**\nConduct regular technical SEO audits to identify and fix issues promptly.",
      excerpt: "Discover the top 10 SEO strategies that will help your business rank higher in search results and drive more organic traffic in 2024.",
      author: "Digital Marketing Team",
      metaDescription: "Learn the essential SEO strategies for 2024. Improve your search rankings with these proven techniques for better organic visibility and traffic.",
      slug: "essential-seo-strategies-2024",
      category: "SEO"
    },
    {
      title: "Social Media Marketing Trends That Will Dominate 2024",
      content: "Social media marketing is constantly evolving, and staying ahead of trends is crucial for business success. Here are the key trends shaping 2024.\n\n**1. Short-Form Video Content**\nPlatforms like TikTok, Instagram Reels, and YouTube Shorts continue to dominate. Create engaging, authentic short-form videos to capture audience attention.\n\n**2. AI-Generated Content**\nAI tools are revolutionizing content creation, from writing captions to generating images. Use these tools to enhance creativity while maintaining authenticity.\n\n**3. Social Commerce Integration**\nSocial platforms are becoming shopping destinations. Optimize your social commerce strategy with shoppable posts and seamless checkout experiences.\n\n**4. Micro-Influencer Partnerships**\nMicro-influencers often have higher engagement rates and more authentic connections with their audiences than mega-influencers.\n\n**5. Community Building**\nFocus on building genuine communities around your brand rather than just broadcasting messages.\n\n**6. Personalized Content Experiences**\nUse data analytics to create personalized content that resonates with specific audience segments.\n\n**7. Social Listening and Real-Time Engagement**\nMonitor brand mentions and engage with your audience in real-time to build stronger relationships.\n\n**8. Sustainability and Social Responsibility**\nConsumers increasingly support brands that demonstrate genuine commitment to social and environmental causes.\n\n**9. Interactive Content Formats**\nPolls, quizzes, AR filters, and live streaming create more engaging experiences for your audience.\n\n**10. Cross-Platform Content Strategy**\nDevelop cohesive content strategies that work across multiple platforms while respecting each platform's unique characteristics.",
      excerpt: "Explore the social media marketing trends that will shape 2024 and learn how to leverage them for your business growth.",
      author: "Social Media Team",
      metaDescription: "Discover the top social media marketing trends for 2024. Stay ahead with these strategies for better engagement and business growth.",
      slug: "social-media-marketing-trends-2024",
      category: "Social Media"
    },
    {
      title: "Complete Guide to Google Ads for Small Businesses",
      content: "Google Ads can be a powerful tool for small businesses to reach new customers and grow their revenue. This comprehensive guide covers everything you need to know.\n\n**Getting Started with Google Ads**\n\n1. **Set Clear Goals**\nDefine what you want to achieve: brand awareness, lead generation, sales, or website traffic.\n\n2. **Understand Your Audience**\nResearch your target audience's demographics, interests, and search behavior.\n\n3. **Keyword Research**\nUse tools like Google Keyword Planner to find relevant keywords with good search volume and manageable competition.\n\n**Campaign Types and Structure**\n\n**Search Campaigns**\nTarget users actively searching for your products or services with text ads.\n\n**Display Campaigns**\nReach users browsing websites in Google's Display Network with visual ads.\n\n**Shopping Campaigns**\nShowcase your products directly in search results with product images and prices.\n\n**Video Campaigns**\nEngage users on YouTube and other video platforms.\n\n**Budget Management**\n\n- Start with a modest daily budget\n- Use bid strategies aligned with your goals\n- Monitor and adjust based on performance\n- Focus budget on high-performing keywords and ads\n\n**Ad Creation Best Practices**\n\n- Write compelling headlines that include your main keyword\n- Use clear, action-oriented descriptions\n- Include relevant ad extensions\n- Create multiple ad variations for testing\n\n**Landing Page Optimization**\n\n- Ensure landing pages match your ad content\n- Optimize for mobile devices\n- Include clear calls-to-action\n- Minimize loading times\n\n**Tracking and Analytics**\n\n- Set up conversion tracking\n- Use Google Analytics integration\n- Monitor key metrics: CTR, CPC, conversion rate\n- Regular performance analysis and optimization",
      excerpt: "Learn how to create effective Google Ads campaigns for your small business with this step-by-step guide to PPC advertising success.",
      author: "PPC Specialists",
      metaDescription: "Master Google Ads for small businesses. Complete guide to creating profitable PPC campaigns that drive traffic and conversions.",
      slug: "google-ads-guide-small-businesses",
      category: "Paid Advertising"
    },
    {
      title: "Content Marketing Strategy: How to Create Content That Converts",
      content: "Content marketing is one of the most effective ways to attract, engage, and convert your target audience. Here's how to create a winning strategy.\n\n**Understanding Content Marketing**\n\nContent marketing involves creating and distributing valuable, relevant content to attract and retain a clearly defined audience.\n\n**Developing Your Content Strategy**\n\n1. **Define Your Goals**\n- Brand awareness\n- Lead generation\n- Customer education\n- Sales conversion\n- Customer retention\n\n2. **Know Your Audience**\n- Create detailed buyer personas\n- Understand their pain points\n- Identify their content preferences\n- Map their customer journey\n\n3. **Content Audit**\n- Analyze existing content performance\n- Identify content gaps\n- Repurpose high-performing content\n\n**Content Types That Convert**\n\n**Blog Posts**\n- Educational articles\n- How-to guides\n- Industry insights\n- Case studies\n\n**Visual Content**\n- Infographics\n- Videos\n- Interactive content\n- Social media graphics\n\n**Lead Magnets**\n- Ebooks\n- Whitepapers\n- Templates\n- Webinars\n\n**Content Distribution Strategy**\n\n1. **Owned Media**\n- Your website and blog\n- Email newsletters\n- Social media profiles\n\n2. **Earned Media**\n- Guest posting\n- Influencer partnerships\n- PR and media coverage\n\n3. **Paid Media**\n- Social media advertising\n- Content promotion\n- Native advertising\n\n**Measuring Content Success**\n\n- Traffic metrics\n- Engagement rates\n- Lead generation\n- Conversion rates\n- Social shares\n- Time on page\n\n**Content Optimization Tips**\n\n- Use SEO best practices\n- Include clear CTAs\n- Optimize for mobile\n- A/B test headlines and formats\n- Update content regularly",
      excerpt: "Discover how to create a content marketing strategy that attracts your ideal customers and drives business growth.",
      author: "Content Marketing Team",
      metaDescription: "Learn to create effective content marketing strategies that convert. Complete guide to content creation, distribution, and optimization.",
      slug: "content-marketing-strategy-guide",
      category: "Content Marketing"
    },
    {
      title: "Email Marketing Best Practices for Higher Open Rates",
      content: "Email marketing remains one of the highest ROI digital marketing channels. Here's how to optimize your email campaigns for better results.\n\n**Email Marketing Fundamentals**\n\nEmail marketing involves sending targeted messages to a list of subscribers to nurture relationships and drive conversions.\n\n**Building Your Email List**\n\n1. **Lead Magnets**\n- Offer valuable free resources\n- Create compelling opt-in forms\n- Use exit-intent popups\n- Implement content upgrades\n\n2. **List Building Strategies**\n- Website opt-in forms\n- Social media campaigns\n- Webinar registrations\n- Contest and giveaways\n\n**Email Campaign Types**\n\n**Welcome Series**\nIntroduce new subscribers to your brand and set expectations.\n\n**Newsletter Campaigns**\nShare regular updates, tips, and valuable content.\n\n**Promotional Emails**\nAnnounce sales, new products, or special offers.\n\n**Automated Sequences**\nNurture leads through automated email workflows.\n\n**Subject Line Optimization**\n\n- Keep it under 50 characters\n- Create urgency or curiosity\n- Personalize when possible\n- A/B test different approaches\n- Avoid spam trigger words\n\n**Email Design Best Practices**\n\n- Use responsive design\n- Keep layout simple and clean\n- Include clear CTAs\n- Optimize images for fast loading\n- Maintain brand consistency\n\n**Content Strategy**\n\n- Provide value in every email\n- Use conversational tone\n- Include social proof\n- Segment your audience\n- Personalize content\n\n**Deliverability Optimization**\n\n- Maintain clean email lists\n- Use double opt-in\n- Monitor sender reputation\n- Avoid spam triggers\n- Authenticate your domain\n\n**Analytics and Testing**\n\n- Track open rates\n- Monitor click-through rates\n- Analyze conversion rates\n- Test send times\n- A/B test subject lines and content",
      excerpt: "Boost your email marketing performance with proven strategies for higher open rates, better engagement, and increased conversions.",
      author: "Email Marketing Team",
      metaDescription: "Master email marketing with best practices for higher open rates. Learn to create engaging campaigns that convert subscribers into customers.",
      slug: "email-marketing-best-practices",
      category: "Email Marketing"
    }
  ];

  const analyzePost = (post: BlogPosts): BlogPostAnalysis => {
    const missingFields: string[] = [];
    let hasContent = false;
    
    if (!post.title || post.title.trim() === '') missingFields.push('title');
    if (!post.content || post.content.trim() === '') missingFields.push('content');
    else hasContent = true;
    if (!post.slug || post.slug.trim() === '') missingFields.push('slug');
    if (!post.author || post.author.trim() === '') missingFields.push('author');
    if (!post.excerpt || post.excerpt.trim() === '') missingFields.push('excerpt');
    if (!post.featuredImage || post.featuredImage.trim() === '') missingFields.push('featuredImage');
    if (!post.metaDescription || post.metaDescription.trim() === '') missingFields.push('metaDescription');
    if (!post.publishedDate) missingFields.push('publishedDate');

    const isEmpty = missingFields.includes('title') && missingFields.includes('content');
    
    let dataQuality: 'good' | 'partial' | 'poor' | 'empty';
    if (isEmpty) dataQuality = 'empty';
    else if (missingFields.length === 0) dataQuality = 'good';
    else if (missingFields.length <= 3) dataQuality = 'partial';
    else dataQuality = 'poor';

    return {
      post,
      isEmpty,
      missingFields,
      hasContent,
      dataQuality
    };
  };

  useEffect(() => {
    const fetchAndAnalyzePosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setBlogPosts(items);
        
        const analysisResults = items.map(analyzePost);
        setAnalysis(analysisResults);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzePosts();
  }, []);

  const createNewPost = async (template: RecoveryTemplate) => {
    setRecovering(true);
    try {
      const newPost: Partial<BlogPosts> = {
        _id: crypto.randomUUID(),
        title: template.title,
        content: template.content,
        excerpt: template.excerpt,
        author: template.author,
        metaDescription: template.metaDescription,
        slug: template.slug,
        publishedDate: new Date().toISOString(),
        featuredImage: 'https://static.wixstatic.com/media/f650f9_e028cf8c2325423e953fa3140127a5fe~mv2.png?originWidth=896&originHeight=576'
      };

      await BaseCrudService.create('blogposts', newPost as BlogPosts);
      
      // Refresh the data
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setBlogPosts(items);
      setAnalysis(items.map(analyzePost));
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setRecovering(false);
    }
  };

  const updatePost = async (post: BlogPosts, updates: Partial<BlogPosts>) => {
    setRecovering(true);
    try {
      await BaseCrudService.update<BlogPosts>('blogposts', {
        ...post,
        ...updates
      });
      
      // Refresh the data
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setBlogPosts(items);
      setAnalysis(items.map(analyzePost));
      setSelectedPost(null);
      setEditingPost({});
    } catch (error) {
      console.error('Error updating blog post:', error);
    } finally {
      setRecovering(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
    
    setRecovering(true);
    try {
      await BaseCrudService.delete('blogposts', postId);
      
      // Refresh the data
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setBlogPosts(items);
      setAnalysis(items.map(analyzePost));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    } finally {
      setRecovering(false);
    }
  };

  const emptyPosts = analysis.filter(a => a.isEmpty);
  const partialPosts = analysis.filter(a => a.dataQuality === 'partial' || a.dataQuality === 'poor');
  const goodPosts = analysis.filter(a => a.dataQuality === 'good');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Analyzing blog post data for recovery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-dark-gray">Blog Data Recovery Center</h1>
          </div>
          <p className="text-secondary text-lg">
            Recover lost blog posts and restore missing content to rebuild your blog collection.
          </p>
        </div>

        {/* Recovery Status Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Database className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Recovery Analysis Complete:</strong> Found {blogPosts.length} blog posts in database. 
            {emptyPosts.length > 0 && ` ${emptyPosts.length} posts are completely empty and can be restored.`}
            {partialPosts.length > 0 && ` ${partialPosts.length} posts have missing data that can be recovered.`}
          </AlertDescription>
        </Alert>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-gray mb-1">{blogPosts.length}</div>
              <div className="text-sm text-secondary">Current Posts</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">{goodPosts.length}</div>
              <div className="text-sm text-secondary">Complete Posts</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">{partialPosts.length}</div>
              <div className="text-sm text-secondary">Partial Data</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Trash2 className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600 mb-1">{emptyPosts.length}</div>
              <div className="text-sm text-secondary">Empty Posts</div>
            </CardContent>
          </Card>
        </div>

        {/* Recovery Templates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Restore Blog Posts from Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary mb-6">
              Use these high-quality blog post templates to quickly restore your blog content. Each template includes complete content, metadata, and SEO optimization.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recoveryTemplates.map((template, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-dark-gray mb-2">{template.title}</h3>
                    <p className="text-sm text-secondary mb-3">{template.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.category}</Badge>
                      <Button
                        size="sm"
                        onClick={() => createNewPost(template)}
                        disabled={recovering}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        {recovering ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Restore
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Posts Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Current Blog Posts Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.map((item, index) => (
                <div key={item.post._id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-dark-gray mb-1">
                        {item.post.title || `Untitled Post ${index + 1}`}
                      </h3>
                      <div className="text-sm text-secondary">
                        ID: {item.post._id}
                      </div>
                      {item.post._createdDate && (
                        <div className="text-sm text-secondary flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Created: {new Date(item.post._createdDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.dataQuality === 'empty' && (
                        <Badge variant="destructive">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Empty
                        </Badge>
                      )}
                      {item.dataQuality === 'poor' && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Poor Data
                        </Badge>
                      )}
                      {item.dataQuality === 'partial' && (
                        <Badge variant="secondary">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Partial
                        </Badge>
                      )}
                      {item.dataQuality === 'good' && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {item.missingFields.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Missing Fields:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.missingFields.map((field) => (
                          <Badge key={field} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedPost(item.post);
                        setEditingPost(item.post);
                        setShowRecoveryForm(true);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    
                    {item.isEmpty && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deletePost(item.post._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Empty
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Post Modal */}
        {showRecoveryForm && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-dark-gray">Edit Blog Post</h2>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRecoveryForm(false);
                      setSelectedPost(null);
                      setEditingPost({});
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editingPost.title || ''}
                      onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                      placeholder="Enter blog post title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={editingPost.slug || ''}
                      onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                      placeholder="url-friendly-slug"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={editingPost.author || ''}
                      onChange={(e) => setEditingPost({...editingPost, author: e.target.value})}
                      placeholder="Author name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={editingPost.excerpt || ''}
                      onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                      placeholder="Brief description of the blog post"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={editingPost.content || ''}
                      onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                      placeholder="Full blog post content"
                      rows={10}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={editingPost.metaDescription || ''}
                      onChange={(e) => setEditingPost({...editingPost, metaDescription: e.target.value})}
                      placeholder="SEO meta description"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="featuredImage">Featured Image URL</Label>
                    <Input
                      id="featuredImage"
                      value={editingPost.featuredImage || ''}
                      onChange={(e) => setEditingPost({...editingPost, featuredImage: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowRecoveryForm(false);
                        setSelectedPost(null);
                        setEditingPost({});
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => updatePost(selectedPost, editingPost)}
                      disabled={recovering}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      {recovering ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}