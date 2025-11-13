import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { SEOHead } from '@/components/ui/seo-head';
import { fixSlug, isValidSlug } from '@/utils/slugUtils';

import { BlogSidebar } from '@/components/ui/blog-sidebar';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy,
  Heart,
  MessageCircle,
  Bookmark,
  Eye,
  ThumbsUp,
  Send
} from 'lucide-react';
import { format } from 'date-fns';

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPosts | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Rajesh Kumar',
      avatar: 'RK',
      content: 'Great insights! This really helped me understand the latest SEO trends.',
      date: '2024-01-15',
      likes: 5
    },
    {
      id: 2,
      author: 'Priya Sharma',
      avatar: 'PS',
      content: 'Very comprehensive guide. Looking forward to implementing these strategies.',
      date: '2024-01-14',
      likes: 3
    }
  ]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        
        // First try to find by exact slug match
        let foundPost = items.find(p => p.slug === slug);
        
        // If not found and slug looks like it might be malformed, try to find by fixed slug
        if (!foundPost && slug) {
          const fixedSlug = fixSlug(slug);
          foundPost = items.find(p => fixSlug(p.slug || '') === fixedSlug);
        }
        
        // If still not found, try partial matching for URLs that might contain the slug
        if (!foundPost && slug) {
          foundPost = items.find(p => {
            if (!p.slug) return false;
            const postSlug = fixSlug(p.slug);
            return postSlug === slug || p.slug.includes(slug) || slug.includes(postSlug);
          });
        }
        
        if (foundPost) {
          setPost(foundPost);
          
          // Auto-fix the slug if it's malformed
          if (foundPost.slug && !isValidSlug(foundPost.slug)) {
            const correctedSlug = fixSlug(foundPost.slug);
            if (correctedSlug && correctedSlug !== foundPost.slug) {
              try {
                await BaseCrudService.update<BlogPosts>('blogposts', {
                  _id: foundPost._id,
                  slug: correctedSlug
                });
                console.log(`Auto-fixed slug for post ${foundPost._id}: ${foundPost.slug} → ${correctedSlug}`);
              } catch (error) {
                console.error('Error auto-fixing slug:', error);
              }
            }
          }
          
          // Get related posts (excluding current post)
          const related = items.filter(p => p.slug !== slug && p._id !== foundPost._id).slice(0, 3);
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

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${fixSlug(post?.slug || '')}` : '';

  const handleShare = async (platform: string) => {
    const title = post?.title || '';
    const url = shareUrl;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
    setShareCount(prev => prev + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: 'You',
      avatar: 'Y',
      content: comment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

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
          <p className="mobile-body text-secondary">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center mobile-container">
          <h1 className="mobile-h1 text-dark-gray mb-6">Post Not Found</h1>
          <p className="mobile-body-lg text-secondary mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="mobile-btn-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content || '');

  return (
    <div className="min-h-screen bg-background">
      {post && (
        <SEOHead 
          title={post.title || 'Blog Post'}
          description={post.metaDescription || post.excerpt || 'Read our latest insights on digital marketing, SEO, and business growth strategies.'}
          keywords={`${post.title}, digital marketing, SEO, social media marketing, content marketing, online marketing`}
          image={post.featuredImage}
          type="article"
          author={post.author}
          publishedTime={post.publishedDate ? new Date(post.publishedDate).toISOString() : undefined}
          modifiedTime={post._updatedDate ? new Date(post._updatedDate).toISOString() : undefined}
        />
      )}
      
      {/* Modern Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-light-gray"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        {/* Featured Image Background */}
        {post.featuredImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={post.featuredImage}
              alt={post.title || 'Blog post image'}
              width={1600}
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 mobile-container text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            {/* Back Link */}
            <motion.div variants={fadeInVariants} className="mb-6">
              <Link 
                to="/blog" 
                className="inline-flex items-center mobile-body text-secondary hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Category Badge */}
            <motion.div variants={fadeInVariants} className="mb-6">
              <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm text-primary px-4 py-2 rounded-full mobile-body-sm font-medium">
                Digital Marketing
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeInVariants} className="mobile-h1 text-dark-gray mb-6">
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            {post.excerpt && (
              <motion.p variants={fadeInVariants} className="mobile-body-lg text-secondary mb-8 max-w-2xl mx-auto">
                {post.excerpt}
              </motion.p>
            )}

            {/* Meta Information */}
            <motion.div variants={fadeInVariants} className="flex flex-wrap justify-center items-center gap-6 mobile-body-sm text-secondary mb-8">
              {post.author && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                    <span className="text-primary font-heading text-sm">{post.author.charAt(0)}</span>
                  </div>
                  <span>By {post.author}</span>
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
                {readingTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                1,234 views
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeInVariants} className="flex flex-wrap justify-center items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`${isLiked ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`${isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('copy')}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Image */}
              {post.featuredImage && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleInVariants}
                  className="mb-8"
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={post.featuredImage}
                      alt={post.title || 'Blog post image'}
                      width={800}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              )}

              {/* Article Content */}
              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                className="prose prose-lg max-w-none"
              >
                {post.content && (
                  <div 
                    className="mobile-body-lg text-secondary leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.replace(/\n/g, '<br />') 
                    }}
                  />
                )}
              </motion.article>

              {/* Social Share Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="mobile-h4 text-dark-gray mb-2">Share this article</h3>
                    <p className="mobile-body-sm text-secondary">Help others discover this content</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('copy')}
                      className="hover:bg-gray-50"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Author Bio */}
              {post.author && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  className="mt-12"
                >
                  <Card className="mobile-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="mobile-card-padding">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-heading mobile-h4">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="mobile-h4 text-dark-gray mb-2">About {post.author}</h4>
                          <p className="mobile-body text-secondary mb-4">
                            Digital marketing expert with over 8 years of experience helping businesses grow their online presence. 
                            Passionate about SEO, content marketing, and data-driven strategies that deliver real results.
                          </p>
                          <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">
                              <User className="h-4 w-4 mr-2" />
                              View Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              Follow
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Comments Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                className="mt-12"
              >
                <Card className="mobile-card">
                  <CardContent className="mobile-card-padding">
                    <div className="flex items-center gap-2 mb-6">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <h3 className="mobile-h3 text-dark-gray">Comments ({comments.length})</h3>
                    </div>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-heading mobile-body-sm">Y</span>
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="mobile-textarea w-full resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end mt-3">
                            <Button type="submit" disabled={!comment.trim()} className="mobile-btn-primary">
                              <Send className="h-4 w-4 mr-2" />
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-heading mobile-body-sm">
                              {comment.avatar}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="mobile-h4 text-dark-gray">{comment.author}</h4>
                              <span className="mobile-body-sm text-secondary">
                                {format(new Date(comment.date), 'MMM dd, yyyy')}
                              </span>
                            </div>
                            <p className="mobile-body text-secondary mb-2">{comment.content}</p>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <BlogSidebar 
                  relatedPosts={relatedPosts}
                  currentPostId={post._id}
                  categories={['SEO & Search Marketing', 'Content Marketing', 'Digital Strategy']}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="mobile-section bg-light-gray">
          <div className="mobile-container">
            <div className="text-center mb-12">
              <h2 className="mobile-h2 text-dark-gray mb-6">You Might Also Like</h2>
              <p className="mobile-body-lg text-secondary">Discover more insights and strategies</p>
            </div>

            <div className="mobile-grid-1 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((relatedPost, index) => (
                <motion.div
                  key={relatedPost._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="mobile-card group hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="mobile-card-padding">
                      {relatedPost.featuredImage && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title || 'Related post'}
                            width={400}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h3 className="mobile-h4 text-dark-gray mb-3 group-hover:text-primary transition-colors">
                        <Link to={`/blog/${fixSlug(relatedPost.slug || '')}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="mobile-body text-secondary mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center mobile-body-sm text-secondary">
                          <Calendar className="h-4 w-4 mr-1" />
                          {relatedPost.publishedDate && format(new Date(relatedPost.publishedDate), 'MMM dd')}
                        </div>
                        <Link to={`/blog/${fixSlug(relatedPost.slug || '')}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* CTA Section */}
      <section className="mobile-section bg-dark-gray">
        <div className="mobile-container text-center">
          <h2 className="mobile-h2 text-background mb-6">
            Ready to Boost Your Digital Presence?
          </h2>
          <p className="mobile-body-lg text-light-gray mb-8 max-w-2xl mx-auto">
            Let's create a content strategy that drives traffic, engages your audience, and grows your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="mobile-btn-primary w-full sm:w-auto">
                Start Your Project
              </Button>
            </Link>
            <Link to="/blog">
              <Button className="mobile-btn-secondary border-background text-background hover:bg-background hover:text-dark-gray w-full sm:w-auto">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}