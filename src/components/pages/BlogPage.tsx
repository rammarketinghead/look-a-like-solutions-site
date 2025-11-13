import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/ui/seo-head';
import { fixSlug } from '@/utils/slugUtils';

import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar, User, Clock, Tag } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const blogFAQs = [
    {
      question: "How often do you publish new blog content?",
      answer: "We publish new digital marketing insights and tips regularly, typically 2-3 times per week. Our content covers the latest trends, strategies, and best practices in SEO, social media marketing, paid advertising, and more."
    },
    {
      question: "Can I suggest topics for your blog?",
      answer: "Absolutely! We welcome topic suggestions from our readers. If there's a specific digital marketing challenge you're facing or a topic you'd like us to cover, please reach out to us through our contact form."
    },
    {
      question: "Do you offer guest posting opportunities?",
      answer: "Yes, we occasionally accept high-quality guest posts from industry experts. Guest posts should provide valuable insights and align with our content standards. Please contact us with your proposal and writing samples."
    },
    {
      question: "How can I stay updated with your latest posts?",
      answer: "You can subscribe to our newsletter to receive our latest blog posts directly in your inbox. We also share our content on our social media channels - Facebook, Instagram, and YouTube."
    }
  ];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        // Sort by published date (newest first)
        const sortedPosts = items.sort((a, b) => {
          const dateA = new Date(a.publishedDate || a._createdDate || 0);
          const dateB = new Date(b.publishedDate || b._createdDate || 0);
          return dateB.getTime() - dateA.getTime();
        });
        setBlogPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, blogPosts]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string | undefined) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Digital Marketing Blog & Insights"
        description="Stay updated with the latest digital marketing trends, SEO tips, social media strategies, and industry insights from Look A Like Solutions. Expert advice to grow your business online."
        keywords="digital marketing blog, SEO tips, social media marketing, content marketing, digital marketing insights, online marketing strategies, Bengaluru digital marketing"
        type="website"
      />
      
      {/* Hero Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-heading text-dark-gray mb-8">
              Digital Marketing Blog
            </h1>
            <p className="text-xl font-paragraph text-secondary max-w-4xl mx-auto mb-12">
              Stay updated with the latest trends, insights, and strategies in digital marketing. Our expert team shares valuable knowledge to help your business grow.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg border-0 shadow-sm focus:shadow-md transition-shadow"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'SEO Tips',
              'Social Media',
              'Content Marketing',
              'Paid Advertising',
              'Analytics',
              'Web Development',
              'Digital Strategy'
            ].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSearchTerm(category)}
              >
                <Tag className="h-4 w-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm overflow-hidden">
                  <div className="h-48 bg-light-gray animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-light-gray rounded mb-3 animate-pulse"></div>
                    <div className="h-6 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="h-16 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-light-gray rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-light-gray rounded w-16 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post._id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title || 'Blog post'}
                        width={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-primary/10 flex items-center justify-center">
                        <div className="text-primary text-4xl font-heading">
                          {post.title?.charAt(0) || 'B'}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-paragraph">
                      Digital Marketing
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center text-secondary text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-paragraph">
                        {formatDate(post.publishedDate || post._createdDate)}
                      </span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-paragraph">
                        {getReadingTime(post.content)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-heading text-dark-gray mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="font-paragraph text-secondary mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {post.author && (
                        <div className="flex items-center text-secondary">
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-paragraph text-sm">{post.author}</span>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80 p-0 h-auto"
                        asChild
                      >
                        <Link to={`/blog/${fixSlug(post.slug || post._id)}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              {searchTerm ? (
                <>
                  <h3 className="text-2xl font-heading text-dark-gray mb-4">
                    No articles found for "{searchTerm}"
                  </h3>
                  <p className="text-lg font-paragraph text-secondary mb-8">
                    Try searching with different keywords or browse all articles.
                  </p>
                  <Button
                    onClick={() => setSearchTerm('')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    View All Articles
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-heading text-dark-gray mb-4">
                    Blog Posts Coming Soon
                  </h3>
                  <p className="text-lg font-paragraph text-secondary mb-8">
                    We're working on creating valuable content for you. Stay tuned for insights, tips, and strategies to grow your business.
                  </p>
                  <Link to="/contact">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Subscribe for Updates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="bg-light-gray rounded-2xl p-16 text-center">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Stay Updated with Digital Marketing Insights
            </h2>
            <p className="text-lg font-paragraph text-secondary mb-12 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest digital marketing tips, strategies, and industry insights delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 py-4 border-0 shadow-sm focus:shadow-md transition-shadow"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Subscribe
              </Button>
            </div>
            <p className="font-paragraph text-secondary text-sm mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Need Expert Digital Marketing Help?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            While you're learning from our blog, let our experts handle your digital marketing strategy and execution.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Get Expert Help
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}