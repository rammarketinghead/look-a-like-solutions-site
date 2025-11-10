import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { Calendar, Clock, ArrowRight, Mail, Tag, TrendingUp } from 'lucide-react';
import { BlogPosts } from '@/entities';

interface BlogSidebarProps {
  relatedPosts?: BlogPosts[];
  categories?: string[];
  currentPostId?: string;
}

export function BlogSidebar({ relatedPosts = [], categories = [], currentPostId }: BlogSidebarProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Mock data for demonstration - in real app, this would come from props or API
  const mockRelatedPosts: BlogPosts[] = relatedPosts.length > 0 ? relatedPosts : [
    {
      _id: '1',
      title: '10 SEO Strategies That Actually Work in 2024',
      slug: '10-seo-strategies-2024',
      excerpt: 'Discover the latest SEO techniques that are driving real results for businesses this year.',
      featuredImage: 'https://static.wixstatic.com/media/f650f9_2fba726c8ed148b88ce871dbc0489061~mv2.png?originWidth=128&originHeight=128',
      publishedDate: '2024-01-15',
      author: 'Sarah Johnson'
    },
    {
      _id: '2',
      title: 'Social Media Marketing Trends to Watch',
      slug: 'social-media-trends-2024',
      excerpt: 'Stay ahead of the curve with these emerging social media marketing trends.',
      featuredImage: 'https://static.wixstatic.com/media/f650f9_936ce6ef11d245e8b19243031ddf9db6~mv2.png?originWidth=128&originHeight=128',
      publishedDate: '2024-01-12',
      author: 'Mike Chen'
    },
    {
      _id: '3',
      title: 'Email Marketing Best Practices for 2024',
      slug: 'email-marketing-best-practices',
      excerpt: 'Learn how to create email campaigns that convert and build lasting relationships.',
      featuredImage: 'https://static.wixstatic.com/media/f650f9_2f5b2329e9804d829cd2164ba80b9756~mv2.png?originWidth=128&originHeight=128',
      publishedDate: '2024-01-10',
      author: 'Lisa Rodriguez'
    }
  ];

  const mockCategories = categories.length > 0 ? categories : [
    'SEO & Search Marketing',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Paid Advertising',
    'Web Development',
    'Analytics & Data',
    'Digital Strategy'
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter out current post from related posts
  const filteredRelatedPosts = mockRelatedPosts.filter(post => post._id !== currentPostId);

  return (
    <div className="space-y-8">
      {/* Newsletter Signup */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-heading text-foreground">
              Stay Updated
            </CardTitle>
          </div>
          <p className="text-sm font-paragraph text-secondary">
            Get the latest digital marketing insights delivered to your inbox weekly.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-primary/30 focus:border-primary"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing || !email.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubscribing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Subscribing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>

      {/* Related Posts */}
      {filteredRelatedPosts.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-heading text-foreground">
                Related Posts
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {filteredRelatedPosts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
                  >
                    <div className="flex gap-3">
                      {post.featuredImage && (
                        <div className="flex-shrink-0">
                          <Image
                            src={post.featuredImage}
                            alt={post.title || 'Blog post'}
                            width={80}
                            className="w-20 h-16 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-secondary line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.publishedDate || new Date())}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/blog">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Posts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-heading text-foreground">
              Categories
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {mockCategories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/blog?category=${encodeURIComponent(category)}`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer text-xs py-1 px-2"
                  >
                    {category}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-heading text-foreground">
            Popular Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {[
              { topic: 'SEO Optimization', count: 24 },
              { topic: 'Social Media Strategy', count: 18 },
              { topic: 'Content Marketing', count: 15 },
              { topic: 'PPC Advertising', count: 12 },
              { topic: 'Email Campaigns', count: 9 }
            ].map((item, index) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/blog?topic=${encodeURIComponent(item.topic)}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white hover:shadow-sm transition-all group"
                >
                  <span className="text-sm font-paragraph text-foreground group-hover:text-primary">
                    {item.topic}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {item.count}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-heading text-lg text-foreground mb-2">
            Need Help with Your Marketing?
          </h3>
          <p className="text-sm font-paragraph text-secondary mb-4">
            Get a free consultation and discover how we can help grow your business.
          </p>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Free Consultation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}