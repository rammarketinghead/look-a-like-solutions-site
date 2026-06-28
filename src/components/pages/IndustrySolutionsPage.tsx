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
import { ArrowRight, Briefcase, Building2, Stethoscope, GraduationCap, Home, UtensilsCrossed, Gavel, TrendingUp, Users, Target, CheckCircle2, Award, Zap, BarChart3 } from 'lucide-react';

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

// All industry verticals with their details and routes
const allIndustries = [
  {
    id: 'seo-lead-generation',
    name: 'SEO & Digital Marketing Agencies',
    href: '/seo-lead-generation',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    description: 'Specialized lead generation and digital marketing solutions for agencies looking to grow their client base and revenue.'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    href: '/real-estate-lead-generation',
    icon: Home,
    color: 'from-amber-500 to-amber-600',
    description: 'Generate qualified leads for real estate agents and brokers with targeted digital marketing strategies.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    href: '/doctor-lead-generation',
    icon: Stethoscope,
    color: 'from-red-500 to-red-600',
    description: 'Patient acquisition and practice growth solutions for doctors, clinics, and healthcare providers.'
  },
  {
    id: 'legal',
    name: 'Legal Services',
    href: '/lawyer-lead-generation',
    icon: Gavel,
    color: 'from-slate-600 to-slate-700',
    description: 'Client acquisition and practice development strategies tailored for law firms and legal professionals.'
  },
  {
    id: 'education',
    name: 'Education & Training',
    href: '/education-lead-generation',
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600',
    description: 'Student recruitment and enrollment growth solutions for schools, universities, and training centers.'
  },
  {
    id: 'hospitality',
    name: 'Restaurants & Hotels',
    href: '/restaurant-hotel-lead-generation',
    icon: UtensilsCrossed,
    color: 'from-orange-500 to-orange-600',
    description: 'Customer acquisition and booking strategies for restaurants, hotels, and hospitality businesses.'
  }
];

export default function IndustrySolutionsPage() {
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
        title="Industry Solutions - Vertical-Specific Digital Marketing"
        description="Tailored digital marketing solutions for specific industries including real estate, healthcare, legal, education, hospitality, and more. Get industry-specific strategies that drive results."
        keywords="industry solutions, real estate marketing, healthcare marketing, legal marketing, education marketing, hospitality marketing, vertical-specific strategies"
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
              Industry-Specific Solutions
            </h1>
            <p className="text-lg sm:text-xl font-paragraph text-secondary max-w-4xl mx-auto mb-8">
              Tailored digital marketing strategies designed for your industry's unique challenges and opportunities. We understand your market and deliver results.
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

      {/* Industries Grid - All 6 Industries with Alternating Layout */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16 sm:space-y-20 lg:space-y-24"
          >
            {allIndustries.map((industry, index) => {
              const IconComponent = industry.icon;
              const cmsService = services.find(s => 
                s.serviceName?.toLowerCase() === industry.name.toLowerCase()
              );
              
              const isEven = index % 2 === 0;
              
              return (
                <motion.div key={industry.id} variants={itemVariants}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Content Section */}
                    <div className={isEven ? 'lg:col-start-1' : 'lg:col-start-2'}>
                      {/* Icon */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${industry.color} rounded-lg flex items-center justify-center mb-6`}>
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      
                      {/* Industry Name */}
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-dark-gray mb-4 sm:mb-6">
                        {industry.name}
                      </h2>
                      
                      {/* Tagline from CMS if available */}
                      {cmsService?.tagline && (
                        <p className="text-primary font-paragraph mb-6 sm:mb-8 font-medium text-base sm:text-lg">
                          {cmsService.tagline}
                        </p>
                      )}
                      
                      {/* Description */}
                      <p className="font-paragraph text-secondary mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed">
                        {cmsService?.description || industry.description}
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
                      <Link to={industry.href}>
                        <Button className={`bg-gradient-to-r ${industry.color} text-white hover:opacity-90 hover:shadow-lg transition-all py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-medium`}>
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
                            alt={industry.name}
                            width={600}
                            className="w-full h-auto rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : (
                        <div className={`w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br ${industry.color} rounded-xl shadow-lg flex items-center justify-center`}>
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
              Success Stories Across Industries
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Real results from real businesses across different industries. See how we've helped companies like yours achieve their goals.
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
                name: 'John Martinez',
                company: 'Premium Real Estate Group',
                role: 'Broker',
                testimonial: 'Their real estate marketing strategy generated 150+ qualified leads in 3 months. Our sales team has never been busier!',
                rating: 5,
                industry: 'Real Estate'
              },
              {
                name: 'Dr. Sarah Williams',
                company: 'Advanced Medical Clinic',
                role: 'Practice Owner',
                testimonial: 'Patient acquisition increased by 200% within 6 months. The healthcare-specific approach really made the difference.',
                rating: 5,
                industry: 'Healthcare'
              },
              {
                name: 'Robert Chen',
                company: 'Chen & Associates Law Firm',
                role: 'Managing Partner',
                testimonial: 'We went from 5 to 25 new client cases per month. Their legal marketing expertise is unmatched.',
                rating: 5,
                industry: 'Legal'
              },
              {
                name: 'Emma Thompson',
                company: 'Global Education Institute',
                role: 'Enrollment Director',
                testimonial: 'Student enrollment grew by 180% year-over-year. Their education marketing strategy is exceptional.',
                rating: 5,
                industry: 'Education'
              },
              {
                name: 'Marco Rossi',
                company: 'Bella Italia Restaurant Group',
                role: 'Owner',
                testimonial: 'Reservations increased by 120% and online orders tripled. Best investment we made for our business.',
                rating: 5,
                industry: 'Hospitality'
              },
              {
                name: 'Lisa Anderson',
                company: 'Digital Growth Agency',
                role: 'CEO',
                testimonial: 'Their agency-focused approach helped us land 15 new high-value clients. Highly recommend!',
                rating: 5,
                industry: 'Agencies'
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all h-full bg-light-gray">
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
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
                      <p className="font-paragraph text-primary text-xs sm:text-sm font-medium mt-1">
                        {testimonial.industry}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Statistics Section */}
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
              Proven Results Across Industries
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our industry-specific expertise delivers measurable results for businesses of all sizes.
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
                number: '150+',
                label: 'Industries Served',
                description: 'Expertise across diverse business verticals and markets'
              },
              {
                number: '1000+',
                label: 'Successful Campaigns',
                description: 'Industry-specific strategies that deliver results'
              },
              {
                number: '280%',
                label: 'Average Lead Growth',
                description: 'Lead generation increase for industry clients'
              },
              {
                number: '95%',
                label: 'Client Retention',
                description: 'Long-term partnerships with satisfied clients'
              }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all h-full bg-background">
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

      {/* Why Industry-Specific Solutions Section */}
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
              Why Industry-Specific Solutions?
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              One-size-fits-all marketing doesn't work. We understand your industry's unique challenges and opportunities.
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
                icon: Target,
                title: 'Targeted Strategies',
                description: 'Customized approaches designed specifically for your industry\'s unique market dynamics and customer behavior.'
              },
              {
                icon: Users,
                title: 'Industry Expertise',
                description: 'Deep understanding of your sector\'s challenges, regulations, and best practices.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Methodologies',
                description: 'Strategies that have been tested and refined across multiple businesses in your industry.'
              },
              {
                icon: BarChart3,
                title: 'Better ROI',
                description: 'Industry-specific tactics deliver higher conversion rates and better return on investment.'
              },
              {
                icon: CheckCircle2,
                title: 'Compliance Ready',
                description: 'All strategies comply with industry regulations and best practices specific to your sector.'
              },
              {
                icon: Award,
                title: 'Competitive Advantage',
                description: 'Stay ahead of competitors with strategies tailored to your specific market landscape.'
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all h-full">
                    <CardContent className="p-6 sm:p-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-heading text-dark-gray mb-3">{item.title}</h3>
                      <p className="font-paragraph text-secondary text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
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
              Our Industry-Focused Process
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              A systematic approach tailored to your industry's specific needs and opportunities.
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
                title: 'Industry Analysis',
                description: 'Deep dive into your industry, competitors, market trends, and customer behavior patterns.'
              },
              {
                step: '02',
                title: 'Custom Strategy',
                description: 'Develop a tailored strategy that addresses your industry\'s unique challenges and opportunities.'
              },
              {
                step: '03',
                title: 'Targeted Execution',
                description: 'Implement industry-specific tactics across all relevant channels and touchpoints.'
              },
              {
                step: '04',
                title: 'Continuous Optimization',
                description: 'Monitor performance and refine strategies based on industry benchmarks and results.'
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

      {/* Industries Overview Section */}
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
              Quick Industry Overview
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Find the industry solution that matches your business needs.
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
                {allIndustries.map((industry, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Link to={industry.href}>
                      <div className="bg-light-gray hover:bg-primary/5 p-4 sm:p-6 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-primary">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-grow">
                            <div className={`w-10 h-10 bg-gradient-to-br ${industry.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                              <industry.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg font-heading text-dark-gray mb-1">{industry.name}</h3>
                              <p className="font-paragraph text-secondary text-sm">{industry.description}</p>
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
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg font-paragraph text-light-gray mb-8 sm:mb-12 max-w-3xl mx-auto">
              Let's discuss how our industry-specific solutions can help your business achieve its goals. Get a free consultation with our experts today.
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
