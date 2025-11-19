import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SEOHead } from '@/components/ui/seo-head';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { Link } from 'react-router-dom';
import { ArrowRight, Share2, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings, Heart, MessageCircle, Eye } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const scrollToContact = () => {
  const contactSection = document.getElementById('contact-form');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function SocialMediaPage() {

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Social Media Marketing Services Bengaluru - Grow Your Following & Sales"
        description="Expert social media marketing in Bengaluru. Grow your Instagram, Facebook, LinkedIn & Twitter following. Increase engagement, build brand awareness, and drive sales. Free social media audit."
        keywords="social media marketing Bengaluru, Instagram marketing, Facebook marketing, LinkedIn marketing, social media management, content creation, influencer marketing, social media agency Bengaluru"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "Social Media Marketing Services",
            description: "Comprehensive social media marketing including content creation, community management, paid social advertising, influencer partnerships, and analytics across Instagram, Facebook, LinkedIn, Twitter, and more.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        reviews={[
          {
            author: "Priya Sharma",
            rating: 5,
            reviewBody: "Their Instagram strategy transformed our business. We went from 500 followers to 15,000 in 4 months, and our online sales tripled.",
            datePublished: "2024-09-20"
          }
        ]}
      />
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-primary/5 via-background to-light-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="max-w-[100rem] mx-auto px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-paragraph mb-6">
                <Share2 className="h-4 w-4 mr-2" />
                Social Media Marketing Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Build Your Brand with 
                <span className="text-primary block">Social Media Excellence</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Engage your audience, build brand loyalty, and drive conversions with our strategic social media marketing. From content creation to community management, we help you dominate social platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free Strategy Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Our Portfolio
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '500K+', label: 'Followers Generated' },
                  { number: '250%', label: 'Avg Engagement Boost' },
                  { number: '50+', label: 'Brands Managed' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-heading text-primary mb-2">{stat.number}</div>
                    <div className="text-sm font-paragraph text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-light-gray">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <Image
                  src="https://static.wixstatic.com/media/f650f9_9c76196bd2a54f80b6c23a34f26f110f~mv2.png?originWidth=576&originHeight=384"
                  alt="Social Media Analytics Dashboard"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-pink-600 mb-1">↗ 350%</div>
                    <div className="text-sm font-paragraph text-pink-700">Engagement Rate</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-purple-600 mb-1">25K+</div>
                    <div className="text-sm font-paragraph text-purple-700">New Followers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading text-dark-gray mb-8">
                Transform Your Social Presence
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our social media experts create engaging content, build communities, and drive meaningful interactions that convert followers into customers. We manage your entire social media presence across all major platforms.
              </p>
              <div className="space-y-4">
                {[
                  'Strategic content planning and creation',
                  'Community management and engagement',
                  'Influencer partnerships and collaborations',
                  'Social media advertising campaigns',
                  'Analytics and performance optimization'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-paragraph text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_f3146b0c6b22430cbf1c2de861144b61~mv2.png?originWidth=576&originHeight=384"
                alt="Social media content creation process"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Social Media Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive social media solutions to build your brand and engage your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Share2,
                title: 'Content Strategy',
                description: 'Develop compelling content strategies that resonate with your target audience and drive engagement.'
              },
              {
                icon: MessageCircle,
                title: 'Community Management',
                description: 'Build and nurture online communities with timely responses and meaningful interactions.'
              },
              {
                icon: Target,
                title: 'Social Advertising',
                description: 'Create and manage targeted ad campaigns across Facebook, Instagram, LinkedIn, and more.'
              },
              {
                icon: BarChart3,
                title: 'Analytics & Reporting',
                description: 'Track performance metrics and provide detailed insights to optimize your social strategy.'
              },
              {
                icon: Users,
                title: 'Influencer Marketing',
                description: 'Connect with relevant influencers to expand your reach and build authentic brand partnerships.'
              },
              {
                icon: Eye,
                title: 'Brand Monitoring',
                description: 'Monitor brand mentions and sentiment across social platforms to protect your reputation.'
              }
            ].map((service, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{service.title}</h3>
                  <p className="font-paragraph text-secondary">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Social Media Pricing Plans</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Choose the perfect plan to elevate your social media presence and engage your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '₹15,000',
                period: '/month',
                description: 'Perfect for small businesses starting their social journey',
                features: [
                  '2 social media platforms',
                  '12 posts per month',
                  'Basic graphic design',
                  'Community management',
                  'Monthly analytics report',
                  'Content calendar'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹35,000',
                period: '/month',
                description: 'Ideal for growing businesses seeking comprehensive social presence',
                features: [
                  '4 social media platforms',
                  '20 posts per month',
                  'Custom graphic design',
                  'Video content creation',
                  'Advanced community management',
                  'Influencer outreach',
                  'Bi-weekly reporting',
                  'Social media advertising'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹75,000',
                period: '/month',
                description: 'Complete social media solution for established brands',
                features: [
                  'All major platforms',
                  '40+ posts per month',
                  'Premium content creation',
                  'Video production',
                  '24/7 community management',
                  'Influencer partnerships',
                  'Weekly reporting',
                  'Advanced advertising campaigns',
                  'Brand monitoring'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-heading">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-heading text-dark-gray mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl font-heading text-primary">{plan.price}</span>
                      <span className="text-secondary font-paragraph ml-1">{plan.period}</span>
                    </div>
                    <p className="font-paragraph text-secondary">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="font-paragraph text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={scrollToContact}
                    className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-background text-primary border border-primary hover:bg-primary hover:text-primary-foreground'}`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="font-paragraph text-secondary mb-4">
              Need a custom solution? We create tailored social media strategies for unique business needs.
            </p>
            <Button 
              onClick={scrollToContact}
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Social Media ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our social media marketing services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="Social Media Marketing" />
        </div>
      </section>



      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Social Media Marketing"
          serviceDescription="Let's discuss how our social media expertise can help your business build a strong online presence and engage with your target audience."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Transform Your Social Media Presence?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free social media audit and discover how we can help your business engage with your audience and drive real results.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Social Media Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Social Media Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}