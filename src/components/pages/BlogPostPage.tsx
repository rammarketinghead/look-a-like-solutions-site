import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { BlogSidebar } from '@/components/ui/blog-sidebar';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPosts | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        const foundPost = items.find(p => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
          // Get related posts (excluding current post)
          const related = items.filter(p => p.slug !== slug).slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const blogFAQs = [
    {
      question: "How often should I publish blog content for SEO?",
      answer: "For optimal SEO results, aim to publish high-quality blog content consistently. Small businesses should target 1-2 posts per week, while larger companies can benefit from daily publishing. Quality and consistency matter more than frequency."
    },
    {
      question: "What makes a blog post SEO-friendly?",
      answer: "SEO-friendly blog posts include target keywords naturally, have compelling titles, use proper heading structure (H1, H2, H3), include internal and external links, have meta descriptions, and provide valuable, original content that answers user questions."
    },
    {
      question: "How long should blog posts be for better rankings?",
      answer: "While there's no magic number, comprehensive posts of 1,500-2,500 words tend to perform better in search results. However, focus on providing complete, valuable information rather than hitting a specific word count."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-dark-gray mb-4">Post Not Found</h1>
          <p className="font-paragraph text-secondary mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/blog" className="inline-flex items-center font-paragraph text-secondary hover:text-primary transition-colors mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <h1 className="text-5xl font-heading text-dark-gray mb-6">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl font-paragraph text-secondary mb-8">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-paragraph text-secondary mb-8">
              {post.author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
              )}
              {post.publishedDate && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(post.publishedDate), 'MMMM dd, yyyy')}
                </div>
              )}
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                5 min read
              </div>
            </div>

            {post.featuredImage && (
              <div className="rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.featuredImage}
                  alt={post.title || 'Blog post image'}
                  width={800}
                  className="w-full h-auto"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="max-w-none">
                <div className="prose prose-lg max-w-none">
                  {post.content && (
                    <div 
                      className="font-paragraph text-secondary leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ 
                        __html: post.content.replace(/\n/g, '<br />') 
                      }}
                    />
                  )}
                </div>

                {/* Share Section */}
                <div className="mt-16 pt-8 border-t border-light-gray">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-heading text-dark-gray">Share this post</h3>
                    <div className="flex space-x-4">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Author Info - Mobile */}
                <div className="lg:hidden mt-12">
                  {post.author && (
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <h4 className="font-heading text-dark-gray mb-4">About the Author</h4>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                            <span className="text-primary font-heading text-lg">
                              {post.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-heading text-dark-gray">{post.author}</h5>
                            <p className="text-sm font-paragraph text-secondary">Digital Marketing Expert</p>
                          </div>
                        </div>
                        <p className="font-paragraph text-secondary text-sm">
                          Passionate about helping businesses grow through effective digital marketing strategies.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Desktop */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-32">
                <BlogSidebar 
                  relatedPosts={relatedPosts}
                  currentPostId={post._id}
                  categories={['SEO & Search Marketing', 'Content Marketing', 'Digital Strategy']}
                />
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Content */}
          <div className="lg:hidden mt-12">
            <BlogSidebar 
              relatedPosts={relatedPosts}
              currentPostId={post._id}
              categories={['SEO & Search Marketing', 'Content Marketing', 'Digital Strategy']}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={blogFAQs}
        title="Blogging & Content Marketing FAQs"
        description="Common questions about content marketing and blogging for business growth."
      />

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Boost Your Digital Presence?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Let's create a content strategy that drives traffic, engages your audience, and grows your business.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Start Your Project
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}