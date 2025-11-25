import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SEOHead } from '@/components/ui/seo-head';
import { NewsletterSection } from '@/components/ui/newsletter-section';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Share2, Target, Code, Users, PenTool, BarChart3, TrendingUp, Mail, Eye, BookOpen, Star, Award, CheckCircle2, Zap } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// All services with their details and routes
const allServices = [
  {
    id: 'seo',
    name: 'SEO Optimization',
    href: '/services/seo',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    description: 'Improve your search engine rankings and drive organic traffic with our comprehensive SEO strategies.'
  },
  {
    id: 'social-media',
    name: 'Social Media Marketing',
    href: '/services/social-media',
    icon: Share2,
    color: 'from-pink-500 to-pink-600',
    description: 'Build your brand presence and engage your audience across all major social media platforms.'
  },
  {
    id: 'paid-ads',
    name: 'Paid Advertising',
    href: '/services/paid-ads',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    description: 'Maximize your ROI with targeted paid advertising campaigns across Google, Facebook, and more.'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    href: '/services/web-development',
    icon: Code,
    color: 'from-green-500 to-green-600',
    description: 'Create stunning, high-performance websites that convert visitors into customers.'
  },
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing',
    href: '/services/influencer-marketing',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    description: 'Leverage influencer partnerships to amplify your brand message and reach new audiences.'
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    href: '/services/content-marketing',
    icon: PenTool,
    color: 'from-red-500 to-red-600',
    description: 'Create compelling content that attracts, engages, and converts your target audience.'
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    href: '/services/data-analytics',
    icon: BarChart3,
    color: 'from-cyan-500 to-cyan-600',
    description: 'Gain actionable insights from your data to make informed business decisions.'
  },
  {
    id: 'conversion-optimization',
    name: 'Conversion Optimization',
    href: '/services/conversion-optimization',
    icon: TrendingUp,
    color: 'from-yellow-500 to-yellow-600',
    description: 'Optimize your website and campaigns to increase conversion rates and revenue.'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    href: '/services/email-marketing',
    icon: Mail,
    color: 'from-indigo-500 to-indigo-600',
    description: 'Build lasting customer relationships through targeted email marketing campaigns.'
  },
  {
    id: 'youtube-growth',
    name: 'YouTube Growth',
    href: '/services/youtube-growth',
    icon: Eye,
    color: 'from-red-600 to-red-700',
    description: 'Grow your YouTube channel with proven strategies for views, subscribers, and engagement.'
  },
  {
    id: 'digital-audit',
    name: 'Digital Audit',
    href: '/services/digital-audit',
    icon: Search,
    color: 'from-slate-500 to-slate-600',
    description: 'Get a comprehensive analysis of your digital presence and identify growth opportunities.'
  },
  {
    id: 'digital-training',
    name: 'Digital Training',
    href: '/services/digital-training',
    icon: BookOpen,
    color: 'from-teal-500 to-teal-600',
    description: 'Upskill your team with hands-on training in the latest digital marketing strategies.'
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Services>('services');
        setServices(items);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Digital Marketing Services - SEO, Social Media & More"
        description="Comprehensive digital marketing services including SEO optimization, social media marketing, paid advertising, web development, content marketing, data analytics, and more. Grow your business with proven strategies."
        keywords="digital marketing services, SEO services, social media marketing, paid advertising, web development, content marketing, data analytics, conversion optimization, email marketing, YouTube growth"
        type="website"
      />
      
      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-dark-gray mb-6 sm:mb-8">
              Our Digital Marketing Services
            </h1>
            <p className="text-lg sm:text-xl font-paragraph text-secondary max-w-4xl mx-auto mb-8">
              Comprehensive solutions designed to drive growth, enhance your online presence, and deliver measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-base">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - All 12 Services with Alternating Layout */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16 sm:space-y-20 lg:space-y-24"
          >
            {allServices.map((service, index) => {
              const IconComponent = service.icon;
              const cmsService = services.find(s => 
                s.serviceName?.toLowerCase() === service.name.toLowerCase()
              );
              
              const isEven = index % 2 === 0;
              
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Content Section */}
                    <div className={isEven ? 'lg:col-start-1' : 'lg:col-start-2'}>
                      {/* Icon */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      
                      {/* Service Name */}
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-dark-gray mb-4 sm:mb-6">
                        {service.name}
                      </h2>
                      
                      {/* Tagline from CMS if available */}
                      {cmsService?.tagline && (
                        <p className="text-primary font-paragraph mb-6 sm:mb-8 font-medium text-base sm:text-lg">
                          {cmsService.tagline}
                        </p>
                      )}
                      
                      {/* Description */}
                      <p className="font-paragraph text-secondary mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed">
                        {cmsService?.description || service.description}
                      </p>
                      
                      {/* Key Benefits from CMS if available */}
                      {cmsService?.keyBenefits && (
                        <div className="mb-10 sm:mb-12">
                          <h3 className="font-heading text-dark-gray mb-4 sm:mb-6 text-base sm:text-lg font-semibold">Key Benefits:</h3>
                          <ul className="space-y-3 sm:space-y-4">
                            {cmsService.keyBenefits.split('\n').filter(benefit => benefit.trim()).slice(0, 4).map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="font-paragraph text-secondary text-sm sm:text-base flex items-start">
                                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></span>
                                <span>{benefit.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* CTA Button */}
                      <Link to={service.href}>
                        <Button className={`bg-gradient-to-r ${service.color} text-white hover:opacity-90 hover:shadow-lg transition-all py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-medium`}>
                          {cmsService?.callToActionText || 'Learn More'}
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </Link>
                    </div>
                    
                    {/* Image Section */}
                    <div className={isEven ? 'lg:col-start-2' : 'lg:col-start-1'}>
                      {cmsService?.serviceImage ? (
                        <div className="relative group">
                          <Image
                            src={cmsService.serviceImage}
                            alt={service.name}
                            width={600}
                            className="w-full h-auto rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : (
                        <div className={`w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br ${service.color} rounded-xl shadow-lg flex items-center justify-center`}>
                          <IconComponent className="h-24 w-24 sm:h-32 sm:w-32 text-white/30" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-4 sm:mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Real results from real businesses. See how we've helped companies like yours achieve their digital marketing goals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Sarah Johnson',
                company: 'Tech Startup Inc.',
                role: 'Marketing Director',
                testimonial: 'Their SEO strategy increased our organic traffic by 250% in just 6 months. The team is professional, responsive, and truly invested in our success.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                company: 'E-commerce Solutions',
                role: 'CEO',
                testimonial: 'The paid advertising campaigns delivered a 320% ROI. We\'ve never seen results like this before. Highly recommend their services!',
                rating: 5
              },
              {
                name: 'Emma Rodriguez',
                company: 'Digital Agency Partners',
                role: 'Business Owner',
                testimonial: 'Their content marketing strategy transformed our brand presence. We went from 0 to 50K followers in 8 months with engaged, loyal customers.',
                rating: 5
              },
              {
                name: 'David Thompson',
                company: 'B2B Services Ltd.',
                role: 'Operations Manager',
                testimonial: 'The conversion optimization work increased our sales by 180%. Their data-driven approach and transparent reporting are exceptional.',
                rating: 5
              },
              {
                name: 'Lisa Anderson',
                company: 'Fashion & Lifestyle',
                role: 'Brand Manager',
                testimonial: 'Influencer marketing campaigns exceeded all expectations. Our brand awareness skyrocketed and sales followed. Outstanding partnership!',
                rating: 5
              },
              {
                name: 'James Wilson',
                company: 'SaaS Platform Co.',
                role: 'Growth Lead',
                testimonial: 'Their email marketing strategy generated 45% of our new customer acquisitions. Professional, creative, and results-driven team.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all h-full bg-light-gray">
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="font-paragraph text-secondary mb-6 flex-grow text-sm sm:text-base leading-relaxed">
                      "{testimonial.testimonial}"
                    </p>
                    
                    {/* Author Info */}
                    <div className="border-t border-primary/10 pt-4">
                      <p className="font-heading text-dark-gray font-semibold text-sm sm:text-base">
                        {testimonial.name}
                      </p>
                      <p className="font-paragraph text-secondary text-xs sm:text-sm">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-4 sm:mb-6">
              Awards & Recognition
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Industry-leading expertise recognized by top organizations and publications.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Award,
                title: 'Best Digital Agency',
                subtitle: '2024 Marketing Excellence Awards',
                description: 'Recognized for outstanding digital marketing services and client results.'
              },
              {
                icon: Zap,
                title: 'Top 10 SEO Agencies',
                subtitle: 'Digital Marketing Institute',
                description: 'Ranked among the top SEO agencies for innovative strategies and measurable results.'
              },
              {
                icon: TrendingUp,
                title: 'Excellence in ROI',
                subtitle: '2024 Performance Awards',
                description: 'Awarded for delivering exceptional return on investment for clients.'
              },
              {
                icon: CheckCircle2,
                title: 'Certified Partners',
                subtitle: 'Google, Facebook, HubSpot',
                description: 'Official certified partners with major platforms and marketing tools.'
              }
            ].map((award, index) => {
              const IconComponent = award.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all h-full">
                    <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-heading text-dark-gray mb-2">{award.title}</h3>
                      <p className="text-primary font-paragraph text-sm font-medium mb-3">{award.subtitle}</p>
                      <p className="font-paragraph text-secondary text-sm flex-grow">{award.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-4 sm:mb-6">
              Proven Results by the Numbers
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our track record speaks for itself. Here's what we've accomplished for our clients.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              {
                number: '500+',
                label: 'Successful Campaigns',
                description: 'Delivered across diverse industries and business sizes'
              },
              {
                number: '250%',
                label: 'Average Traffic Growth',
                description: 'Organic traffic increase for SEO clients in first year'
              },
              {
                number: '320%',
                label: 'Average ROI',
                description: 'Return on investment from paid advertising campaigns'
              },
              {
                number: '98%',
                label: 'Client Satisfaction',
                description: 'Retention rate and positive client feedback score'
              }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all h-full bg-light-gray">
                  <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                    <div className="text-4xl sm:text-5xl font-heading text-primary mb-3">
                      {stat.number}
                    </div>
                    <h3 className="text-lg font-heading text-dark-gray mb-2">{stat.label}</h3>
                    <p className="font-paragraph text-secondary text-sm flex-grow">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-4 sm:mb-6">
              Service Categories
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our services are organized into key areas to help you find exactly what you need.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Search & Discovery',
                services: ['SEO Optimization', 'Digital Audit'],
                icon: Search
              },
              {
                title: 'Social & Engagement',
                services: ['Social Media Marketing', 'Influencer Marketing', 'YouTube Growth'],
                icon: Share2
              },
              {
                title: 'Paid Campaigns',
                services: ['Paid Advertising', 'Email Marketing'],
                icon: Target
              },
              {
                title: 'Content & Strategy',
                services: ['Content Marketing', 'Digital Training'],
                icon: PenTool
              },
              {
                title: 'Technical & Development',
                services: ['Web Development', 'Conversion Optimization'],
                icon: Code
              },
              {
                title: 'Analytics & Insights',
                services: ['Data Analytics'],
                icon: BarChart3
              }
            ].map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading text-dark-gray mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.services.map((serviceName, idx) => {
                        const serviceRoute = allServices.find(s => s.name === serviceName)?.href || '/contact';
                        return (
                          <li key={idx}>
                            <Link to={serviceRoute} className="text-secondary hover:text-primary font-paragraph text-sm transition-colors flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {serviceName}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-4 sm:mb-6">
              Our Proven Process
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We follow a systematic approach to ensure every project delivers exceptional results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              {
                step: '01',
                title: 'Discovery & Analysis',
                description: 'We analyze your business, goals, target audience, and current digital presence.'
              },
              {
                step: '02',
                title: 'Strategy Development',
                description: 'Create a comprehensive plan with clear objectives, KPIs, and measurable goals.'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Execute the strategy with precision, creativity, and attention to detail.'
              },
              {
                step: '04',
                title: 'Optimization & Growth',
                description: 'Monitor performance, analyze data, and continuously optimize for better results.'
              }
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-heading">
                  {item.step}
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-3">{item.title}</h3>
                <p className="font-paragraph text-secondary text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-8">
                Why Choose Our Services?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Data-Driven Approach',
                    description: 'Every decision is backed by comprehensive analytics and market research.'
                  },
                  {
                    title: 'Customized Solutions',
                    description: 'Tailored strategies that align with your unique business goals and challenges.'
                  },
                  {
                    title: 'Transparent Reporting',
                    description: 'Regular updates and detailed reports on campaign performance and ROI.'
                  },
                  {
                    title: 'Expert Team',
                    description: 'Certified professionals with years of experience across all digital channels.'
                  },
                  {
                    title: 'Proven Results',
                    description: 'Track record of helping businesses achieve significant growth and success.'
                  }
                ].map((item, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-dark-gray mb-2">{item.title}</h3>
                      <p className="font-paragraph text-secondary text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://static.wixstatic.com/media/f650f9_ea933df3cd384594a3eb1bc28f0ea03c~mv2.png?originWidth=576&originHeight=448"
                alt="Why choose our services"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Comparison Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-4 sm:mb-6">
              Quick Service Overview
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Find the right service for your business needs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-x-auto"
          >
            <div className="min-w-full">
              <div className="grid grid-cols-1 gap-4">
                {allServices.map((service, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Link to={service.href}>
                      <div className="bg-light-gray hover:bg-primary/5 p-4 sm:p-6 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-primary">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-grow">
                            <div className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                              <service.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg font-heading text-dark-gray mb-1">{service.name}</h3>
                              <p className="font-paragraph text-secondary text-sm">{service.description}</p>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 ml-4 mt-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-dark-gray to-foreground">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-4 sm:mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-lg font-paragraph text-light-gray mb-8 sm:mb-12 max-w-3xl mx-auto">
              Let's discuss how our services can help your business achieve its digital marketing goals. Get a free consultation with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base w-full sm:w-auto">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dark-gray px-8 py-3 text-base w-full sm:w-auto">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
