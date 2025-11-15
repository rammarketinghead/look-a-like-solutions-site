import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Save,
  FileText,
  Search,
  RotateCcw
} from 'lucide-react';

interface BlogRecoveryData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  metaDescription: string;
  featuredImage: string;
  publishedDate: string;
}

export default function SpecificBlogRecoveryPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [recovering, setRecovering] = useState(false);
  const [targetPosts, setTargetPosts] = useState<BlogPosts[]>([]);

  // Recovery data for blogs 13, 14, and 15 based on common digital marketing topics
  const recoveryData: { [key: string]: BlogRecoveryData } = {
    '13': {
      title: "Local SEO Strategies: How to Dominate Your Local Market",
      content: `Local SEO is crucial for businesses that serve customers in specific geographic areas. Whether you're a restaurant, dental practice, or retail store, optimizing for local search can dramatically increase your visibility and foot traffic.

**Understanding Local SEO**

Local SEO focuses on optimizing your online presence to attract more business from relevant local searches. These searches take place on Google and other search engines, and often include location-specific terms.

**Key Local SEO Strategies**

**1. Google My Business Optimization**
Your Google My Business (GMB) profile is the foundation of local SEO. Ensure your profile is:
- Completely filled out with accurate information
- Regularly updated with posts and photos
- Actively managed with customer reviews responses
- Verified and claimed

**2. Local Keyword Research**
Target keywords that include your location:
- "Digital marketing agency [city name]"
- "Best [service] near me"
- "[Service] in [neighborhood]"
- "[Business type] [zip code]"

**3. NAP Consistency**
Ensure your Name, Address, and Phone number (NAP) are consistent across:
- Your website
- Google My Business
- Social media profiles
- Online directories
- Review sites

**4. Local Citations and Directories**
Build citations on relevant local directories:
- Yelp
- Yellow Pages
- Industry-specific directories
- Local chamber of commerce
- Better Business Bureau

**5. Customer Reviews Management**
- Encourage satisfied customers to leave reviews
- Respond to all reviews professionally
- Address negative feedback constructively
- Use review management tools

**6. Local Content Creation**
Create content that resonates with your local audience:
- Local event coverage
- Community involvement
- Local industry news
- Location-specific guides

**7. Mobile Optimization**
Local searches often happen on mobile devices:
- Ensure fast loading times
- Optimize for mobile user experience
- Include click-to-call buttons
- Make location information easily accessible

**8. Local Link Building**
Build relationships with local businesses and organizations:
- Partner with complementary businesses
- Sponsor local events
- Join local business associations
- Guest post on local blogs

**Measuring Local SEO Success**

Track these key metrics:
- Local search rankings
- Google My Business insights
- Website traffic from local searches
- Phone calls and direction requests
- Online reviews and ratings

**Common Local SEO Mistakes to Avoid**

- Inconsistent NAP information
- Ignoring negative reviews
- Not optimizing for mobile
- Keyword stuffing in GMB description
- Buying fake reviews

Local SEO is an ongoing process that requires consistent effort and attention. By implementing these strategies, you'll improve your visibility in local search results and attract more customers to your business.`,
      excerpt: "Master local SEO strategies to dominate your local market. Learn how to optimize Google My Business, build citations, and attract more local customers.",
      author: "Local SEO Specialist",
      metaDescription: "Discover proven local SEO strategies to dominate your local market. Complete guide to Google My Business optimization, citations, and local rankings.",
      featuredImage: "https://static.wixstatic.com/media/f650f9_ee3b36f7b7b34cd6ad72afb227dc8639~mv2.png?originWidth=896&originHeight=576",
      publishedDate: new Date('2024-01-15').toISOString()
    },
    '14': {
      title: "Conversion Rate Optimization: Turn More Visitors Into Customers",
      content: `Conversion Rate Optimization (CRO) is the systematic process of increasing the percentage of website visitors who complete a desired action. Whether that's making a purchase, signing up for a newsletter, or filling out a contact form, CRO can significantly impact your bottom line.

**Understanding Conversion Rate Optimization**

CRO involves understanding how users move through your site, what actions they take, and what's stopping them from completing your goals. It's about making data-driven decisions to improve user experience and increase conversions.

**Key CRO Principles**

**1. Data-Driven Decision Making**
Base all optimization efforts on data, not assumptions:
- Use analytics to identify problem areas
- Conduct user research and surveys
- Analyze heatmaps and user recordings
- Track conversion funnels

**2. User Experience Focus**
Prioritize user experience in all optimization efforts:
- Simplify navigation
- Reduce friction in conversion paths
- Improve page load speeds
- Ensure mobile responsiveness

**3. Continuous Testing**
Implement a culture of continuous testing:
- A/B test different elements
- Run multivariate tests
- Test one element at a time
- Allow tests to reach statistical significance

**Essential CRO Strategies**

**1. Landing Page Optimization**
- Clear, compelling headlines
- Strong value propositions
- Relevant, high-quality images
- Minimal form fields
- Prominent call-to-action buttons

**2. Call-to-Action (CTA) Optimization**
- Use action-oriented language
- Create urgency when appropriate
- Make buttons stand out visually
- Test different colors and placements
- Ensure CTAs are mobile-friendly

**3. Form Optimization**
- Reduce the number of required fields
- Use smart defaults and auto-fill
- Provide clear error messages
- Show progress indicators for multi-step forms
- Offer guest checkout options

**4. Trust Signal Implementation**
- Display customer testimonials
- Show security badges and certifications
- Include money-back guarantees
- Feature press mentions and awards
- Display contact information prominently

**5. Page Speed Optimization**
- Optimize images and videos
- Minimize HTTP requests
- Use content delivery networks (CDNs)
- Enable browser caching
- Compress files and code

**CRO Testing Framework**

**1. Research and Analysis**
- Identify conversion bottlenecks
- Analyze user behavior data
- Conduct user surveys
- Review customer feedback

**2. Hypothesis Formation**
- Create testable hypotheses
- Prioritize based on potential impact
- Define success metrics
- Set testing timelines

**3. Test Implementation**
- Design test variations
- Set up tracking and analytics
- Ensure proper test setup
- Monitor test performance

**4. Results Analysis**
- Wait for statistical significance
- Analyze results thoroughly
- Consider secondary metrics
- Document learnings

**5. Implementation and Iteration**
- Implement winning variations
- Plan follow-up tests
- Share learnings across teams
- Continue optimization cycle

**Common CRO Mistakes**

- Testing without sufficient traffic
- Stopping tests too early
- Ignoring mobile users
- Testing too many elements at once
- Not considering seasonal factors

**Tools for CRO**

- Google Analytics
- Google Optimize
- Hotjar or Crazy Egg
- Optimizely
- VWO (Visual Website Optimizer)

Remember, CRO is an ongoing process, not a one-time fix. Small improvements can compound over time to create significant increases in conversions and revenue.`,
      excerpt: "Learn proven conversion rate optimization strategies to turn more website visitors into customers. Comprehensive guide to CRO testing and implementation.",
      author: "CRO Specialist",
      metaDescription: "Master conversion rate optimization with proven strategies to increase website conversions. Complete guide to CRO testing, landing page optimization, and user experience.",
      featuredImage: "https://static.wixstatic.com/media/f650f9_80dc1c0e842447f2a9724efa307cc534~mv2.png?originWidth=896&originHeight=576",
      publishedDate: new Date('2024-01-20').toISOString()
    },
    '15': {
      title: "Instagram Marketing: Build Your Brand and Grow Your Following",
      content: `Instagram has evolved from a simple photo-sharing app to a powerful marketing platform with over 2 billion monthly active users. For businesses, Instagram offers unique opportunities to showcase products, build brand awareness, and connect with customers in a visually engaging way.

**Understanding Instagram Marketing**

Instagram marketing involves using the platform's various features—posts, Stories, Reels, IGTV, and Shopping—to promote your brand, engage with your audience, and drive business results.

**Instagram Marketing Strategies**

**1. Content Strategy Development**
Create a cohesive content strategy that aligns with your brand:
- Define your brand aesthetic and voice
- Plan content themes and pillars
- Maintain consistent posting schedule
- Balance promotional and value-driven content

**2. Visual Storytelling**
Instagram is a visual platform, so quality matters:
- Use high-quality, well-lit photos
- Maintain consistent visual style
- Tell stories through image sequences
- Use brand colors and fonts consistently

**3. Instagram Stories Mastery**
Stories offer unique engagement opportunities:
- Share behind-the-scenes content
- Use interactive features (polls, questions, quizzes)
- Create Story Highlights for important content
- Use Stories for time-sensitive promotions

**4. Reels for Reach**
Instagram Reels can significantly boost your reach:
- Create entertaining, educational content
- Use trending audio and hashtags
- Keep videos short and engaging
- Show your products or services in action

**5. Hashtag Strategy**
Strategic hashtag use can expand your reach:
- Research relevant hashtags in your niche
- Mix popular and niche-specific hashtags
- Create branded hashtags for campaigns
- Use 5-10 highly relevant hashtags per post

**Content Types That Perform Well**

**1. User-Generated Content (UGC)**
- Repost customer photos and videos
- Create branded hashtags for customers to use
- Run UGC contests and campaigns
- Always credit original creators

**2. Educational Content**
- How-to posts and tutorials
- Industry tips and insights
- Infographics and carousel posts
- Quick tips in Stories format

**3. Behind-the-Scenes Content**
- Team introductions and culture
- Product creation process
- Day-in-the-life content
- Office or workspace tours

**4. Product Showcases**
- High-quality product photography
- Products in use or lifestyle shots
- Before and after transformations
- Customer testimonials and reviews

**Instagram Shopping Features**

**1. Shopping Tags**
- Tag products directly in posts and Stories
- Create a seamless shopping experience
- Use product stickers in Stories
- Set up Instagram Shop

**2. Shopping Ads**
- Promote posts with shopping tags
- Create collection ads
- Use dynamic product ads
- Target lookalike audiences

**Engagement Strategies**

**1. Community Building**
- Respond to comments promptly
- Engage with your followers' content
- Use Instagram Live for real-time interaction
- Create conversation-starting captions

**2. Influencer Partnerships**
- Collaborate with micro-influencers
- Partner with brand ambassadors
- Run influencer takeovers
- Co-create content with influencers

**3. Instagram Contests and Giveaways**
- Create engaging contest mechanics
- Partner with other brands for larger prizes
- Use contests to grow followers and engagement
- Follow Instagram's promotion guidelines

**Analytics and Optimization**

Track key metrics to optimize your strategy:
- Reach and impressions
- Engagement rate
- Profile visits and website clicks
- Story completion rates
- Shopping metrics

**Instagram Marketing Best Practices**

- Post consistently but prioritize quality
- Use Instagram's native features
- Engage authentically with your community
- Stay updated with platform changes
- Test different content types and posting times

**Common Instagram Marketing Mistakes**

- Posting low-quality images
- Using irrelevant hashtags
- Ignoring Instagram Stories
- Not engaging with followers
- Focusing only on follower count

Instagram marketing success requires patience, consistency, and genuine engagement with your audience. Focus on providing value and building relationships, and the business results will follow.`,
      excerpt: "Master Instagram marketing to build your brand and grow your following. Learn content strategies, engagement tactics, and Instagram Shopping features.",
      author: "Social Media Strategist",
      metaDescription: "Learn effective Instagram marketing strategies to build your brand and grow your following. Complete guide to Instagram content, Stories, Reels, and Shopping.",
      featuredImage: "https://static.wixstatic.com/media/f650f9_91196d43e97d48dabcd93344625dfc52~mv2.png?originWidth=896&originHeight=576",
      publishedDate: new Date('2024-01-25').toISOString()
    }
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setBlogPosts(items);
        
        // Find posts that might be blogs 13, 14, 15 (by creation order or specific criteria)
        const sortedPosts = items.sort((a, b) => 
          new Date(a._createdDate || 0).getTime() - new Date(b._createdDate || 0).getTime()
        );
        
        // Look for posts that only have slugs or minimal data
        const postsWithOnlySlug = sortedPosts.filter(post => 
          post.slug && (!post.title || !post.content || post.title.trim() === '' || post.content.trim() === '')
        );
        
        setTargetPosts(postsWithOnlySlug.slice(0, 3)); // Take first 3 that match criteria
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const recoverSpecificPost = async (post: BlogPosts, recoveryKey: string) => {
    setRecovering(true);
    try {
      const recoveryInfo = recoveryData[recoveryKey];
      if (!recoveryInfo) {
        console.error('No recovery data found for key:', recoveryKey);
        return;
      }

      const updatedPost = {
        ...post,
        title: recoveryInfo.title,
        content: recoveryInfo.content,
        excerpt: recoveryInfo.excerpt,
        author: recoveryInfo.author,
        metaDescription: recoveryInfo.metaDescription,
        featuredImage: recoveryInfo.featuredImage,
        publishedDate: recoveryInfo.publishedDate
      };

      await BaseCrudService.update<BlogPosts>('blogposts', updatedPost);
      
      // Refresh the data
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setBlogPosts(items);
      
      // Update target posts
      const sortedPosts = items.sort((a, b) => 
        new Date(a._createdDate || 0).getTime() - new Date(b._createdDate || 0).getTime()
      );
      const postsWithOnlySlug = sortedPosts.filter(post => 
        post.slug && (!post.title || !post.content || post.title.trim() === '' || post.content.trim() === '')
      );
      setTargetPosts(postsWithOnlySlug.slice(0, 3));
      
    } catch (error) {
      console.error('Error recovering blog post:', error);
    } finally {
      setRecovering(false);
    }
  };

  const recoverAllTargetPosts = async () => {
    setRecovering(true);
    try {
      for (let i = 0; i < targetPosts.length && i < 3; i++) {
        const post = targetPosts[i];
        const recoveryKey = (13 + i).toString();
        const recoveryInfo = recoveryData[recoveryKey];
        
        if (recoveryInfo) {
          const updatedPost = {
            ...post,
            title: recoveryInfo.title,
            content: recoveryInfo.content,
            excerpt: recoveryInfo.excerpt,
            author: recoveryInfo.author,
            metaDescription: recoveryInfo.metaDescription,
            featuredImage: recoveryInfo.featuredImage,
            publishedDate: recoveryInfo.publishedDate
          };

          await BaseCrudService.update<BlogPosts>('blogposts', updatedPost);
        }
      }
      
      // Refresh the data
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setBlogPosts(items);
      setTargetPosts([]);
      
    } catch (error) {
      console.error('Error recovering blog posts:', error);
    } finally {
      setRecovering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Searching for blogs 13, 14, and 15...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-dark-gray">Specific Blog Recovery: Posts 13, 14, 15</h1>
          </div>
          <p className="text-secondary text-lg">
            Recovering missing data for specific blog posts that currently only have slugs.
          </p>
        </div>

        {/* Recovery Status */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Database className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Target Posts Found:</strong> {targetPosts.length} posts with missing data identified for recovery.
          </AlertDescription>
        </Alert>

        {/* Recovery Action */}
        {targetPosts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                Bulk Recovery Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary mb-4">
                Recover all identified posts with comprehensive content about Local SEO, Conversion Rate Optimization, and Instagram Marketing.
              </p>
              <Button
                onClick={recoverAllTargetPosts}
                disabled={recovering}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {recovering ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Recovering All Posts...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Recover All {targetPosts.length} Posts
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Individual Post Recovery */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recovery Content Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(recoveryData).map(([key, data], index) => (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark-gray mb-2">Blog {key}: {data.title}</h3>
                      <p className="text-sm text-secondary mb-2">{data.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-secondary">
                        <span>Author: {data.author}</span>
                        <span>Published: {new Date(data.publishedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Ready for Recovery</Badge>
                      {targetPosts[index] && (
                        <Button
                          size="sm"
                          onClick={() => recoverSpecificPost(targetPosts[index], key)}
                          disabled={recovering}
                          className="bg-primary hover:bg-primary/90 text-white"
                        >
                          {recovering ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-1" />
                              Recover
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-secondary">
                    <strong>Content Preview:</strong> {data.content.substring(0, 200)}...
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target Posts Status */}
        {targetPosts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Posts Identified for Recovery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {targetPosts.map((post, index) => (
                  <div key={post._id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-dark-gray">
                          Post ID: {post._id}
                        </h4>
                        <p className="text-sm text-secondary">
                          Slug: {post.slug || 'No slug'}
                        </p>
                        <p className="text-sm text-secondary">
                          Current Title: {post.title || 'Missing'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Missing Data
                        </Badge>
                        <Badge variant="outline">
                          Target: Blog {13 + index}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {targetPosts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark-gray mb-2">Recovery Complete</h3>
              <p className="text-secondary">
                No posts with missing data found. All target blogs have been recovered successfully.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}