import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Mail, 
  Tag, 
  TrendingUp, 
  Star,
  Users,
  BookOpen,
  Bell
} from 'lucide-react';
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
    <div className="mobile-space-y-lg">
      {/* Enhanced Newsletter Signup */}
      <Card className="mobile-card border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="mobile-card-compact">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="mobile-h4 text-dark-gray">
                Stay Updated
              </CardTitle>
              <p className="mobile-body-sm text-secondary">
                Weekly insights & tips
              </p>
            </div>
          </div>
          <p className="mobile-body-sm text-secondary">
            Get the latest digital marketing insights delivered to your inbox. Join 5,000+ marketers who trust our content.
          </p>
        </CardHeader>
        <CardContent className="mobile-card-compact pt-0">
          <form onSubmit={handleNewsletterSubmit} className="mobile-space-y-sm">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mobile-input border-primary/30 focus:border-primary"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing || !email.trim()}
              className="mobile-btn-primary w-full"
            >
              {isSubscribing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Subscribing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Subscribe Free
                </div>
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-primary/20">
            <div className="flex items-center gap-1 mobile-body-sm text-secondary">
              <Users className="h-3 w-3" />
              5K+ subscribers
            </div>
            <div className="flex items-center gap-1 mobile-body-sm text-secondary">
              <Star className="h-3 w-3 text-yellow-500" />
              4.9/5 rating
            </div>
          </div>
          <p className="mobile-caption text-gray-500 mt-2 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>

      {/* Enhanced Related Posts */}
      {filteredRelatedPosts.length > 0 && (
        <Card className="mobile-card">
          <CardHeader className="mobile-card-compact">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="mobile-h4 text-dark-gray">
                Related Articles
              </CardTitle>
            </div>
            <p className="mobile-body-sm text-secondary">
              Continue your learning journey
            </p>
          </CardHeader>
          <CardContent className="mobile-card-compact pt-0">
            <div className="mobile-space-y">
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
                            className="w-20 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="mobile-h4 text-dark-gray group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h4>
                        <p className="mobile-body-sm text-secondary line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 mobile-caption text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.publishedDate || new Date())}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>5 min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link to="/blog">
                <Button className="mobile-btn-secondary w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Posts
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Categories */}
      <Card className="mobile-card">
        <CardHeader className="mobile-card-compact">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            <CardTitle className="mobile-h4 text-dark-gray">
              Categories
            </CardTitle>
          </div>
          <p className="mobile-body-sm text-secondary">
            Explore topics by category
          </p>
        </CardHeader>
        <CardContent className="mobile-card-compact pt-0">
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
                    className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer mobile-body-sm py-1.5 px-3"
                  >
                    {category}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Popular Topics */}
      <Card className="mobile-card bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <CardHeader className="mobile-card-compact">
          <CardTitle className="mobile-h4 text-dark-gray">
            Popular Topics
          </CardTitle>
          <p className="mobile-body-sm text-secondary">
            Most read content this month
          </p>
        </CardHeader>
        <CardContent className="mobile-card-compact pt-0">
          <div className="mobile-space-y-sm">
            {[
              { topic: 'SEO Optimization', count: 24, trend: '+12%' },
              { topic: 'Social Media Strategy', count: 18, trend: '+8%' },
              { topic: 'Content Marketing', count: 15, trend: '+15%' },
              { topic: 'PPC Advertising', count: 12, trend: '+5%' },
              { topic: 'Email Campaigns', count: 9, trend: '+20%' }
            ].map((item, index) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/blog?topic=${encodeURIComponent(item.topic)}`}
                  className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-white hover:shadow-sm transition-all group"
                >
                  <div className="flex-1">
                    <span className="mobile-body text-dark-gray group-hover:text-primary font-medium">
                      {item.topic}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="mobile-caption">
                        {item.count} posts
                      </Badge>
                      <span className="mobile-caption text-green-600 font-medium">
                        {item.trend}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Call to Action */}
      <Card className="mobile-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="mobile-card-padding text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mobile-h4 text-dark-gray mb-3">
            Need Marketing Help?
          </h3>
          <p className="mobile-body-sm text-secondary mb-6">
            Get a free consultation and discover how we can help grow your business with proven digital marketing strategies.
          </p>
          <Link to="/contact">
            <Button className="mobile-btn-primary w-full">
              Get Free Consultation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-primary/20">
            <div className="text-center">
              <div className="mobile-body-sm font-bold text-primary">500+</div>
              <div className="mobile-caption text-secondary">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="mobile-body-sm font-bold text-primary">98%</div>
              <div className="mobile-caption text-secondary">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="mobile-body-sm font-bold text-primary">5★</div>
              <div className="mobile-caption text-secondary">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}