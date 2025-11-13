import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SEOHead } from '@/components/ui/seo-head';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Share2, Target, Code, Users, PenTool, BarChart3, TrendingUp } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const serviceIcons = {
  'SEO': Search,
  'Social Media': Share2,
  'Paid Advertising': Target,
  'Web Development': Code,
  'Influencer Marketing': Users,
  'Content Marketing': PenTool,
  'Data Analytics': BarChart3,
  'Conversion Optimization': TrendingUp
};

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

  const getServiceIcon = (serviceName: string) => {
    const iconKey = Object.keys(serviceIcons).find(key => 
      serviceName?.toLowerCase().includes(key.toLowerCase())
    );
    return iconKey ? serviceIcons[iconKey as keyof typeof serviceIcons] : Target;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Digital Marketing Services - SEO, Social Media & More"
        description="Comprehensive digital marketing services including SEO optimization, social media marketing, paid advertising, web development, content marketing, and data analytics. Grow your business with proven strategies."
        keywords="digital marketing services, SEO services, social media marketing, paid advertising, web development, content marketing, data analytics, conversion optimization, email marketing"
        type="website"
      />
      
      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-6 sm:mb-8">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl font-paragraph text-secondary max-w-4xl mx-auto">
              Comprehensive digital marketing solutions designed to drive growth, enhance your online presence, and deliver measurable results for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-light-gray rounded-full mb-4 sm:mb-6 animate-pulse"></div>
                    <div className="h-5 sm:h-6 bg-light-gray rounded mb-3 sm:mb-4 animate-pulse"></div>
                    <div className="h-4 bg-light-gray rounded mb-2 animate-pulse"></div>
                    <div className="h-16 sm:h-20 bg-light-gray rounded mb-4 sm:mb-6 animate-pulse"></div>
                    <div className="h-8 sm:h-10 bg-light-gray rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => {
                const IconComponent = getServiceIcon(service.serviceName || '');
                return (
                  <Card key={service._id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      </div>
                      
                      {service.serviceImage && (
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Service'}
                          width={400}
                          className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6"
                        />
                      )}
                      
                      <h3 className="text-xl sm:text-2xl font-heading text-dark-gray mb-3 sm:mb-4">
                        {service.serviceName}
                      </h3>
                      
                      {service.tagline && (
                        <p className="text-primary font-paragraph mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                          {service.tagline}
                        </p>
                      )}
                      
                      {service.description && (
                        <p className="font-paragraph text-secondary mb-4 sm:mb-6 flex-grow text-sm sm:text-base">
                          {service.description}
                        </p>
                      )}
                      
                      {service.keyBenefits && (
                        <div className="mb-4 sm:mb-6">
                          <h4 className="font-heading text-dark-gray mb-2 sm:mb-3 text-sm sm:text-base">Key Benefits:</h4>
                          <ul className="space-y-1 sm:space-y-2">
                            {service.keyBenefits.split('\n').filter(benefit => benefit.trim()).map((benefit, index) => (
                              <li key={index} className="font-paragraph text-secondary text-xs sm:text-sm flex items-start">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                                {benefit.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <Link to="/contact" className="mt-auto">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group-hover:shadow-md transition-all py-2 sm:py-3 text-sm sm:text-base">
                          {service.callToActionText || 'Get Started'}
                          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-heading text-dark-gray mb-4">
                Services Coming Soon
              </h3>
              <p className="text-lg font-paragraph text-secondary mb-8">
                We're currently updating our services information. Please contact us directly to learn about our offerings.
              </p>
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Process</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We follow a proven methodology to ensure every project delivers exceptional results and exceeds your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We analyze your business, goals, and target audience to create a tailored strategy.'
              },
              {
                step: '02',
                title: 'Strategy',
                description: 'Develop a comprehensive plan with clear objectives and measurable KPIs.'
              },
              {
                step: '03',
                title: 'Execution',
                description: 'Implement the strategy with precision, creativity, and attention to detail.'
              },
              {
                step: '04',
                title: 'Optimization',
                description: 'Monitor performance and continuously optimize for better results.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-heading">
                  {item.step}
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                <p className="font-paragraph text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading text-dark-gray mb-8">
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
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-dark-gray mb-2">{item.title}</h3>
                      <p className="font-paragraph text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_ea933df3cd384594a3eb1bc28f0ea03c~mv2.png?originWidth=576&originHeight=448"
                alt="Why choose our services"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Let's discuss how our services can help your business achieve its digital marketing goals. Get a free consultation today.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}