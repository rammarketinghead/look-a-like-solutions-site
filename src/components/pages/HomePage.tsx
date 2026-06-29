import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { SEOHead } from '@/components/ui/seo-head';
import { TrustedBusinessesCarousel } from '@/components/ui/trusted-businesses-carousel';
import { NewsletterSection } from '@/components/ui/newsletter-section';
import { ProofChips } from '@/components/ui/proof-chips';
import { CTASection } from '@/components/ui/cta-section';
import { AIImageSlot } from '@/components/ui/ai-image-slot';
import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';

import { ArrowRight, Target, TrendingUp, Users, Award, Play, Star, CheckCircle, Calendar, Clock, Zap } from 'lucide-react';

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

// Blog Section Component
function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setError(null);
        setLoading(true);
        
        const result = await BaseCrudService.getAll<BlogPosts>('blogposts');
        
        if (!result || !result.items || result.items.length === 0) {
          setBlogPosts([]);
          setLoading(false);
          return;
        }

        const { items } = result;
        
        // Filter and sort posts
        const validPosts = items
          .filter(post => post && post.title && post.content && post.slug)
          .sort((a, b) => {
            const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
            const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 3); // Get only the 3 most recent posts
        
        setBlogPosts(validPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setBlogPosts([]);
        setError(null); // Don't show error to user, just hide the section
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Recently';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateReadTime = (content: string | undefined) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Don't render if still loading or no posts - return null silently
  if (loading) {
    return null;
  }
  
  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="mobile-section bg-light-gray">
      <div className="mobile-container">
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mobile-h2 text-dark-gray mb-6">
              Latest Insights from Our Blog
            </h2>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              Stay updated with the latest digital marketing trends, tips, and strategies to grow your business.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mobile-grid-1 lg:grid-cols-3"
        >
          {blogPosts.map((post) => {
            // Safety check for required fields
            if (!post._id || !post.slug || !post.title) return null;
            
            return (
              <motion.div key={post._id} variants={scaleInVariants}>
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <Card className="mobile-card group hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.title || 'Blog post'}
                          width={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="mobile-card-padding">
                      <div className="flex items-center gap-4 mb-3 mobile-body-sm text-secondary">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(post.publishedDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {calculateReadTime(post.content)}
                        </div>
                      </div>
                      <h3 className="mobile-h4 text-dark-gray mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mobile-body text-secondary line-clamp-3 mb-4">
                        {post.excerpt || post.content?.substring(0, 150) + '...'}
                      </p>
                      <div className="flex items-center text-primary mobile-body-sm font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button className="mobile-btn-primary shadow-lg hover:shadow-xl">
              View All Blog Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const homeFAQs = [
    {
      question: "What digital marketing services do you offer?",
      answer: "We offer comprehensive digital marketing services including SEO optimization, social media marketing, paid advertising (Google Ads, Facebook Ads), web development, content marketing, influencer marketing, data analytics, and conversion optimization. Our goal is to provide end-to-end solutions for your digital presence."
    },
    {
      question: "How long does it take to see results from digital marketing?",
      answer: "Results vary depending on the service and your current digital presence. SEO typically shows results in 3-6 months, while paid advertising can generate immediate traffic. Social media growth usually takes 2-4 months to build momentum. We provide regular reports to track progress and adjust strategies as needed."
    },
    {
      question: "Do you work with businesses outside Bengaluru?",
      answer: "Yes, while we're based in Bengaluru, we work with clients across India and internationally. Our digital marketing strategies are designed to work for businesses regardless of location, and we conduct most of our client interactions remotely for convenience."
    },
    {
      question: "What makes Look A Like Solutions different from other agencies?",
      answer: "We focus on data-driven strategies, transparent reporting, and measurable results. Our team combines creativity with analytical thinking to deliver campaigns that not only look great but also drive real business growth. We also provide dedicated account management and regular strategy consultations."
    },
    {
      question: "How do you measure the success of digital marketing campaigns?",
      answer: "We track key performance indicators (KPIs) relevant to your business goals, including website traffic, conversion rates, lead generation, return on ad spend (ROAS), search rankings, social media engagement, and ultimately, revenue growth. We provide detailed monthly reports with actionable insights."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing varies based on the services you need and the scope of your project. We offer both project-based pricing and monthly retainer options. We provide transparent quotes with no hidden fees and can customize packages to fit your budget and goals. Contact us for a free consultation and quote."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Digital Marketing for Bengaluru Businesses - Get Found, Trusted & Chosen"
        description="Marketing that helps Bengaluru businesses get found, trusted, and chosen. Proven digital strategies for local growth. SEO, Paid Ads, Social Media & more. Free strategy session available."
        keywords="digital marketing agency Bengaluru, SEO services Bengaluru, local marketing Bengaluru, social media marketing, paid advertising, web development, content marketing, digital marketing company India, Google Ads, Facebook Ads, Instagram marketing, Bengaluru businesses"
        type="website"
        schemaType="LocalBusiness"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 500
        }}
        services={[
          {
            name: "SEO Optimization",
            description: "Get found by Bengaluru customers searching for your services. Rank #1 on Google with comprehensive SEO including keyword research, on-page optimization, and local link building.",
            areaServed: "Bengaluru, India",
            priceRange: "$"
          },
          {
            name: "Social Media Marketing",
            description: "Build trust and community with Bengaluru audiences. Turn followers into paying customers with engaging content and targeted social media campaigns.",
            areaServed: "Bengaluru, India",
            priceRange: "$"
          },
          {
            name: "Paid Advertising (Google & Facebook Ads)",
            description: "Get chosen by high-intent customers. Expertly managed Google Ads and Facebook Ads campaigns that drive qualified leads and sales.",
            areaServed: "Bengaluru, India",
            priceRange: "$"
          },
          {
            name: "Web Development",
            description: "Fast, mobile-friendly websites that convert Bengaluru visitors into customers. Custom web design and development services.",
            areaServed: "Bengaluru, India",
            priceRange: "$"
          }
        ]}
        reviews={[
          {
            author: "Rajesh Kumar",
            rating: 5,
            reviewBody: "Within 6 months, our website traffic increased by 300% and we're now getting 50+ qualified leads every month. The ROI has been incredible.",
            datePublished: "2024-10-15"
          },
          {
            author: "Priya Sharma",
            rating: 5,
            reviewBody: "Their Instagram strategy transformed our business. We went from 500 followers to 15,000 in 4 months, and our online sales tripled.",
            datePublished: "2024-09-20"
          },
          {
            author: "Amit Patel",
            rating: 5,
            reviewBody: "We achieved a 5x return on our ad spend in the first quarter. Their data-driven approach and constant optimization made all the difference.",
            datePublished: "2024-11-01"
          }
        ]}
      />
      {/* CRO-Optimized Hero Section */}
      <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-light-gray"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 bg-background"></div>

        {/* Hero Content */}
        <div className="relative z-10 mobile-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium">
                ✓ Trusted by 500+ Businesses
              </span>
            </motion.div>

            {/* Sharp Headline */}
            <h1 className="mobile-h1 text-dark-gray mb-6 font-bold leading-tight">Marketing That Helps Bengaluru Businesses Get Found, Trusted, and Chosen</h1>

            {/* Benefit-Driven Subheading */}
            <p className="mobile-body-lg text-secondary max-w-2xl mx-auto mb-8">
              Proven digital marketing strategies designed for Bengaluru businesses. Get discovered by your ideal customers, build trust through authentic engagement, and become their first choice. See measurable results in 90 days.
            </p>

            {/* Proof Chips */}
            <ProofChips
              chips={[
                { icon: 'trending', value: '300%', label: 'Avg Growth' },
                { icon: 'users', value: '50+', label: 'Leads/Month' },
                { icon: 'star', value: '4.9★', label: 'Rating' }
              ]}
              className="mb-10"
            />

            {/* Primary CTA - High Contrast */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full mb-8">
              <Link to="/contact">
                <Button className="mobile-btn-primary shadow-lg hover:shadow-xl h-12 px-8 text-base">
                  Get Free Strategy Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button className="mobile-btn-secondary shadow-lg hover:shadow-xl h-12 px-8 text-base">
                  View Case Studies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Trust Copy */}
            <p className="mobile-body-sm text-secondary">
              No credit card required • 30-min consultation • Personalized roadmap
            </p>
          </motion.div>
        </div>

        {/* Hero Dashboard Image */}
        <div className="absolute inset-0 z-0 opacity-0 sm:opacity-100">
          <AIImageSlot
            src="https://static.wixstatic.com/media/f650f9_a153d83e6b714abd85209431c3edd563~mv2.png"
            alt="Digital marketing analytics dashboard showing SEO, ads, and conversion growth planning"
            aspectRatio="16:9"
            loading="eager"
            className="opacity-30"
          />
        </div>

      </section>
      {/* Trust Proof Section */}
      <section className="bg-background">
        <TrustedBusinessesCarousel 
          className="max-w-[120rem] mx-auto px-6"
          showTitle={true}
          title="Trusted by Businesses in Bengaluru"
          speed={25}
        />
      </section>
      {/* Services Section - Scannable Cards */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
                Our Services
              </span>
              <h2 className="mobile-h2 text-dark-gray mb-6">
                Proven Results Across All Services
              </h2>
              <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
                Each service is designed to deliver measurable outcomes and drive real business growth.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mobile-grid-2 lg:grid-cols-3"
          >
            {[
              { title: 'SEO Optimization', outcome: '300% traffic growth', icon: '🔍', color: 'bg-blue-50 text-blue-600', link: '/services/seo' },
              { title: 'Social Media Marketing', outcome: '15K followers in 4 months', icon: '📱', color: 'bg-purple-50 text-purple-600', link: '/services/social-media' },
              { title: 'Paid Advertising', outcome: '5x return on ad spend', icon: '🎯', color: 'bg-green-50 text-green-600', link: '/services/paid-ads' },
              { title: 'Web Development', outcome: 'High-converting websites', icon: '💻', color: 'bg-orange-50 text-orange-600', link: '/services/web-development' },
              { title: 'Content Marketing', outcome: 'Attract qualified leads', icon: '✍️', color: 'bg-pink-50 text-pink-600', link: '/services/content-marketing' },
              { title: 'Data Analytics', outcome: 'Data-driven decisions', icon: '📊', color: 'bg-indigo-50 text-indigo-600', link: '/services/data-analytics' }
            ].map((service, index) => (
              <motion.div key={index} variants={scaleInVariants}>
                <Link to={service.link} className="block h-full">
                  <Card className="mobile-card group hover:shadow-xl transition-all duration-300 h-full border-0 cursor-pointer">
                    <CardContent className="mobile-card-padding h-full flex flex-col">
                      <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      <h3 className="mobile-h4 text-dark-gray mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mobile-body-sm text-primary font-semibold mb-3">
                        ✓ {service.outcome}
                      </p>
                      <div className="mt-auto flex items-center text-primary mobile-body-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="mobile-btn-primary shadow-lg hover:shadow-xl">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Real Client Success Story - Featured Case Study */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mobile-h2 text-dark-gray mb-6">
                Real Client. Real Results.
              </h2>
              <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
                See how we helped a local Bengaluru business triple their revenue in just 6 months.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
          >
            <Card className="mobile-card border-2 border-primary/20 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto bg-gradient-to-br from-primary/10 to-primary/5 bg-cover bg-center" style={{backgroundImage: 'url(https://static.wixstatic.com/media/f650f9_831f2455fb774fbe9d2aa062cd7ddc74~mv2.png?id=homepage-growth-bg)'}}>
                  <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/20"><div className="relative w-full max-w-md mx-auto p-6 bg-background/90 backdrop-blur-md rounded-3xl shadow-2xl border border-primary/20"><div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg"><TrendingUp className="h-10 w-10 text-primary-foreground" /></div><div className="text-center pt-10"><h3 className="text-2xl font-heading text-dark-gray mb-6">Key Performance Indicators</h3><div className="grid grid-cols-2 gap-4"><div className="bg-light-gray/70 rounded-xl p-4 shadow-inner"><div className="text-4xl font-heading text-primary mb-1">+285%</div><div className="mobile-body-sm text-secondary">Revenue Growth</div></div><div className="bg-light-gray/70 rounded-xl p-4 shadow-inner"><div className="text-4xl font-heading text-primary mb-1">+420%</div><div className="mobile-body-sm text-secondary">Website Traffic</div></div></div></div></div></div>
                </div>

                {/* Content Side */}
                <CardContent className="mobile-card-padding lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full mobile-body-sm font-medium">
                      Success Story
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full mobile-body-sm font-medium">
                      E-commerce
                    </div>
                  </div>

                  <h3 className="mobile-h3 text-dark-gray mb-4">
                    How TechGear India Tripled Revenue with SEO & Paid Ads
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="mobile-h4 text-dark-gray mb-2 flex items-center">
                        <Target className="h-5 w-5 text-primary mr-2" />
                        The Challenge
                      </h4>
                      <p className="mobile-body text-secondary">
                        TechGear India, a Bengaluru-based electronics retailer, was struggling with low online visibility and high customer acquisition costs. Their website received only 500 visitors per month, and sales were stagnant.
                      </p>
                    </div>

                    <div>
                      <h4 className="mobile-h4 text-dark-gray mb-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        Our Solution
                      </h4>
                      <p className="mobile-body text-secondary mb-3">
                        We implemented a comprehensive digital marketing strategy combining SEO optimization, Google Ads, and conversion rate optimization.
                      </p>
                      <ul className="space-y-2">
                        {[
                          'Optimized 50+ product pages for high-intent keywords',
                          'Launched targeted Google Shopping campaigns',
                          'Redesigned checkout flow to reduce cart abandonment',
                          'Created content strategy to attract organic traffic'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start mobile-body text-secondary">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mobile-h4 text-dark-gray mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 text-primary mr-2" />
                        The Results (6 Months)
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { metric: '+285%', label: 'Revenue Increase' },
                          { metric: '+420%', label: 'Organic Traffic' },
                          { metric: '4.8x', label: 'Return on Ad Spend' },
                          { metric: '-45%', label: 'Cost Per Acquisition' }
                        ].map((result, index) => (
                          <div key={index} className="bg-light-gray rounded-lg p-4 text-center">
                            <div className="text-2xl font-heading text-primary mb-1">{result.metric}</div>
                            <div className="mobile-body-sm text-secondary">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link to="/case-studies">
                    <Button className="mobile-btn-primary w-full sm:w-auto">
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          <div className="text-center mt-12">
            <p className="mobile-body text-secondary mb-4">
              Want results like these for your business?
            </p>
            <Link to="/contact">
              <Button className="mobile-btn-secondary">
                Get Your Free Strategy Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mobile-h2 text-dark-gray mb-6">
                How We Deliver Results in 90 Days
              </h2>
              <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
                Our proven 4-step process turns your marketing investment into measurable business growth.
              </p>
            </motion.div>
          </div>

          <div className="mobile-grid-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Audit & Strategy',
                description: 'We analyze your current performance and identify quick wins to drive immediate results.',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Launch & Execute',
                description: 'Our team implements proven tactics that start generating leads and sales within weeks.',
                icon: '⚡'
              },
              {
                step: '03',
                title: 'Test & Optimize',
                description: 'We continuously improve campaigns based on real data to maximize your ROI.',
                icon: '📈'
              },
              {
                step: '04',
                title: 'Scale & Grow',
                description: 'Once we find what works, we scale it to multiply your results month after month.',
                icon: '📊'
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ delay: index * 0.1 }}
                className="text-center relative group"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="mobile-body-sm font-bold text-primary-foreground">{item.step}</span>
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
                  )}
                </div>
                <h3 className="mobile-h4 text-dark-gray mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="mobile-body text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button className="mobile-btn-primary shadow-lg hover:shadow-xl">
                Start Getting Results Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section - Conversion Focused */}
      <CTASection
        title="Ready to Transform Your Digital Presence?"
        subtitle="Limited Spots Available"
        description="Get a personalized strategy from our experts. No credit card required."
        primaryCTA={{
          label: "Get Free Strategy Session",
          href: "/contact"
        }}
        secondaryCTA={{
          label: "View Case Studies",
          href: "/case-studies"
        }}
        variant="light"
      />
      {/* Trusted By Section */}
      {/* Results Section */}
      <section className="mobile-section bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="mobile-container relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mobile-h2 mb-6">
                Numbers That Prove We Deliver
              </h2>
              <p className="mobile-body-lg opacity-90 max-w-3xl mx-auto">
                These aren't vanity metrics. They're real business outcomes that impact your bottom line.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mobile-grid-2 lg:grid-cols-4"
          >
            {[
              { number: '150+', label: 'Projects Completed', icon: '😊' },
              { number: '285%', label: 'Average Revenue Growth', icon: '📈' },
              { number: '4.8x', label: 'Average ROI', icon: '🎯' },
              { number: '98%', label: 'Client Retention Rate', icon: '🤝' }
            ].map((stat, index) => (
              <motion.div key={index} variants={scaleInVariants} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl mobile-card-padding group-hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl mb-4">{stat.icon}</div>
                  <div className="mobile-h2 mb-4 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                  <div className="mobile-body opacity-90">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/case-studies">
              <Button className="mobile-btn-secondary border-2 border-background text-background hover:bg-background hover:text-primary shadow-lg hover:shadow-xl">
                See Detailed Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <h2 className="mobile-h2 text-dark-gray mb-6">
              Success Stories from Real Clients
            </h2>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              Don't just take our word for it. Here's what business owners say about working with us.
            </p>
          </div>

          <div className="mobile-grid-1 lg:grid-cols-2 xl:grid-cols-3">
            {[
              {
                name: 'Rajesh Kumar',
                company: 'TechStart Solutions',
                role: 'CEO',
                testimonial: 'Within 6 months, our website traffic increased by 300% and we\'re now getting 50+ qualified leads every month. The ROI has been incredible.',
                result: '300% traffic, 50+ leads/month'
              },
              {
                name: 'Priya Sharma',
                company: 'Bangalore Boutique',
                role: 'Founder',
                testimonial: 'Their Instagram strategy transformed our business. We went from 500 followers to 15,000 in 4 months, and our online sales tripled.',
                result: '15K followers, 3x sales'
              },
              {
                name: 'Amit Patel',
                company: 'Digital Dynamics',
                role: 'Marketing Director',
                testimonial: 'We achieved a 5x return on our ad spend in the first quarter. Their data-driven approach and constant optimization made all the difference.',
                result: '5x ROAS in 90 days'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="mobile-card hover:shadow-lg transition-shadow h-full">
                  <CardContent className="mobile-card-padding">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary font-heading mobile-body">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="mobile-h4 text-dark-gray">{testimonial.name}</h3>
                        <p className="mobile-body-sm text-secondary">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="mobile-body text-secondary mb-4 italic">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <span className="text-green-700 font-heading mobile-body-sm flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {testimonial.result}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/case-studies">
              <Button className="mobile-btn-primary shadow-lg hover:shadow-xl">
                Read More Success Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <h2 className="mobile-h2 text-dark-gray mb-6">
              Why Businesses Choose Us Over Other Agencies
            </h2>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              We don't just run campaigns. We become your growth partner focused on one thing: increasing your revenue.
            </p>
          </div>

          <div className="mobile-grid-2 lg:grid-cols-4">
            {[
              {
                icon: Target,
                title: 'Revenue-Focused',
                description: 'Every strategy is designed to bring you more customers and increase sales, not just vanity metrics'
              },
              {
                icon: TrendingUp,
                title: 'Fast Results',
                description: 'See measurable improvements within 90 days or we keep working until you do'
              },
              {
                icon: Users,
                title: 'Dedicated Team',
                description: 'You get a dedicated account manager and direct access to our expert team'
              },
              {
                icon: Award,
                title: 'Transparent Reporting',
                description: 'Clear monthly reports showing exactly where your money goes and what results you\'re getting'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mobile-h4 text-dark-gray mb-4">{item.title}</h3>
                <p className="mobile-body text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Blog Section */}
      <BlogSection />
      {/* Newsletter Subscription Section */}
      <NewsletterSection />
      {/* CTA Section */}
      <section className="mobile-section bg-dark-gray">
        <div className="mobile-container text-center">
          <h2 className="mobile-h2 text-background mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="mobile-body-lg text-light-gray mb-8 max-w-2xl mx-auto">
            Get a free strategy session where we'll analyze your current marketing and show you exactly how to get more customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="mobile-btn-primary w-full sm:w-auto">
                Get Free Strategy Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button className="mobile-btn-secondary border-background text-background hover:bg-background hover:text-dark-gray w-full sm:w-auto">
                See Our Results
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ... keep existing code (BlogSection component) ...