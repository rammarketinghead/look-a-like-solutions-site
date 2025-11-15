import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { TrustedBusinessesCarousel } from '@/components/ui/trusted-businesses-carousel';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings, FileText, Eye, ShieldCheck, Star, Quote, Shield, Lightbulb, HeadphonesIcon } from 'lucide-react';

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

export default function DigitalAuditPage() {

  return (
    <div className="min-h-screen bg-background">
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
                <Search className="h-4 w-4 mr-2" />
                Digital Marketing Audit Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Discover Hidden Opportunities with 
                <span className="text-primary block">Comprehensive Audits</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Get a complete analysis of your digital marketing performance. Our expert audits identify gaps, opportunities, and provide actionable strategies to improve your ROI and accelerate growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free Audit Sample
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Sample Report
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '300+', label: 'Audits Completed' },
                  { number: '150%', label: 'Avg ROI Improvement' },
                  { number: '48hrs', label: 'Initial Findings' }
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
                  src="https://static.wixstatic.com/media/f650f9_a0ed4447b936460ca2884361defdaa13~mv2.png?originWidth=576&originHeight=384"
                  alt="Digital Marketing Audit Report"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-yellow-600 mb-1">47</div>
                    <div className="text-sm font-paragraph text-yellow-700">Issues Identified</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-green-600 mb-1">23</div>
                    <div className="text-sm font-paragraph text-green-700">Growth Opportunities</div>
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
                Comprehensive Digital Analysis
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our digital marketing audits provide deep insights into your current performance and identify opportunities for improvement. We analyze every aspect of your digital presence to create a roadmap for sustainable growth.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Complete website and technical SEO analysis',
                  'Social media performance evaluation',
                  'Paid advertising campaign assessment',
                  'Content marketing effectiveness review',
                  'Competitor analysis and benchmarking'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-paragraph text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Button for Comprehensive Digital Analysis */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Your Free Digital Marketing Audit Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={scrollToContact}
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 text-base transition-all duration-300"
                >
                  Start Your Analysis Today
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_0ec4615ce46c4b49b6d331b404978606~mv2.png?originWidth=576&originHeight=384"
                alt="Digital marketing audit process and methodology"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Audit Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">What We Audit</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto mb-8">
              Comprehensive analysis of all your digital marketing channels and performance metrics.
            </p>
            
            {/* CTA Button for What We Audit section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToContact}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Your Free Digital Marketing Audit Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={scrollToContact}
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 text-base transition-all duration-300"
              >
                Schedule Your Audit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'SEO & Website',
                description: 'Technical SEO, on-page optimization, site speed, mobile-friendliness, and user experience analysis.'
              },
              {
                icon: BarChart3,
                title: 'Analytics & Tracking',
                description: 'Google Analytics setup, conversion tracking, goal configuration, and data accuracy assessment.'
              },
              {
                icon: Target,
                title: 'Paid Advertising',
                description: 'Google Ads, Facebook Ads, and other paid campaign performance and optimization opportunities.'
              },
              {
                icon: Users,
                title: 'Social Media',
                description: 'Social media presence, engagement rates, content quality, and growth strategies.'
              },
              {
                icon: FileText,
                title: 'Content Marketing',
                description: 'Content quality, SEO optimization, engagement metrics, and content gap analysis.'
              },
              {
                icon: ShieldCheck,
                title: 'Competitive Analysis',
                description: 'Competitor benchmarking, market positioning, and opportunity identification.'
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

      {/* Trusted by Businesses Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <TrustedBusinessesCarousel 
            title="Trusted by Businesses in Bengaluru"
            showTitle={true}
            speed={25}
          />
        </div>
      </section>

      {/* Measurable Results Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Measurable Results We Deliver</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our digital audits don't just identify problems—they deliver measurable improvements that drive real business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                metric: '150%',
                label: 'Average ROI Increase',
                description: 'Clients see significant return on investment improvements within 3-6 months',
                icon: TrendingUp,
                color: 'text-green-600'
              },
              {
                metric: '85%',
                label: 'Traffic Growth',
                description: 'Average organic traffic increase after implementing our audit recommendations',
                icon: BarChart3,
                color: 'text-blue-600'
              },
              {
                metric: '67%',
                label: 'Conversion Rate Boost',
                description: 'Improvement in conversion rates through optimized user experience and funnels',
                icon: Target,
                color: 'text-purple-600'
              },
              {
                metric: '48hrs',
                label: 'Initial Findings',
                description: 'Quick turnaround for initial audit findings and priority recommendations',
                icon: Clock,
                color: 'text-orange-600'
              }
            ].map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`w-16 h-16 ${result.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <result.icon className={`h-8 w-8 ${result.color}`} />
                </div>
                <div className={`text-4xl font-heading ${result.color} mb-2`}>{result.metric}</div>
                <h3 className="text-xl font-heading text-dark-gray mb-3">{result.label}</h3>
                <p className="font-paragraph text-secondary text-sm">{result.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-heading text-dark-gray mb-6">Real Impact, Real Results</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Technical SEO Improvements',
                      description: 'Average 40% improvement in Core Web Vitals and site speed optimization',
                      percentage: '92%'
                    },
                    {
                      title: 'Content Performance',
                      description: 'Content optimization leads to 60% better engagement and search rankings',
                      percentage: '78%'
                    },
                    {
                      title: 'Paid Campaign Efficiency',
                      description: 'Reduced cost-per-acquisition while increasing conversion quality',
                      percentage: '85%'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-heading text-sm">{item.percentage}</span>
                      </div>
                      <div>
                        <h4 className="font-heading text-dark-gray mb-2">{item.title}</h4>
                        <p className="font-paragraph text-secondary text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-heading text-primary mb-2">300+</div>
                      <div className="text-sm font-paragraph text-secondary">Audits Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-heading text-primary mb-2">95%</div>
                      <div className="text-sm font-paragraph text-secondary">Client Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-heading text-primary mb-2">₹2.5Cr+</div>
                      <div className="text-sm font-paragraph text-secondary">Revenue Generated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-heading text-primary mb-2">24/7</div>
                      <div className="text-sm font-paragraph text-secondary">Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">What Our Clients Say</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Don't just take our word for it. Here's what businesses say about our digital audit services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                company: 'TechStart Solutions',
                role: 'CEO',
                testimonial: 'The digital audit from Look A Like Solutions was a game-changer. They identified critical issues we never knew existed and provided a clear roadmap that increased our online revenue by 180% in just 4 months.',
                rating: 5,
                image: 'https://static.wixstatic.com/media/f650f9_54af45e23e834c6a9ef6b181f6def5fa~mv2.png?originWidth=192&originHeight=192'
              },
              {
                name: 'Priya Sharma',
                company: 'Bangalore Fashion Hub',
                role: 'Marketing Director',
                testimonial: 'Their comprehensive audit revealed so many optimization opportunities. The detailed report and actionable recommendations helped us improve our conversion rate by 65% and reduce our ad spend by 30%.',
                rating: 5,
                image: 'https://static.wixstatic.com/media/f650f9_37a3d0a7c1c64db982736c50ccc0de50~mv2.png?originWidth=192&originHeight=192'
              },
              {
                name: 'Arjun Patel',
                company: 'HealthCare Plus',
                role: 'Founder',
                testimonial: 'The audit was incredibly thorough and professional. They found technical SEO issues that were hurting our rankings and provided solutions that boosted our organic traffic by 120% within 6 months.',
                rating: 5,
                image: 'https://static.wixstatic.com/media/f650f9_a9238347861043ac89955a64a1e3727b~mv2.png?originWidth=192&originHeight=192'
              },
              {
                name: 'Meera Reddy',
                company: 'Eco-Friendly Products',
                role: 'Co-founder',
                testimonial: 'Look A Like Solutions delivered beyond our expectations. Their audit uncovered hidden opportunities in our social media strategy that resulted in 200% growth in engagement and 85% increase in sales.',
                rating: 5,
                image: 'https://static.wixstatic.com/media/f650f9_13fc9afdcd88409cb78b5086be031d30~mv2.png?originWidth=192&originHeight=192'
              },
              {
                name: 'Vikram Singh',
                company: 'Real Estate Ventures',
                role: 'Marketing Head',
                testimonial: 'The detailed competitor analysis and market positioning insights were invaluable. We implemented their recommendations and saw a 150% increase in qualified leads within 3 months.',
                rating: 5,
                image: 'https://static.wixstatic.com/media/f650f9_2fe1b1edade24cba9efb5c2de2328805~mv2.png?originWidth=192&originHeight=192'
              },
              {
                name: 'Anita Joshi',
                company: 'Educational Services',
                role: 'Director',
                testimonial: 'Their audit process was systematic and insightful. The recommendations were practical and easy to implement. Our website performance improved dramatically, leading to 90% more student enrollments.',
                rating: 5,
                image: 'https://static.wixstatic.com/media/f650f9_1cf1b54f1fdf4976a269c525e30420c7~mv2.png?originWidth=192&originHeight=192'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-light-gray rounded-2xl p-8 relative hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Quote className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="font-paragraph text-secondary mb-6 italic">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-dark-gray">{testimonial.name}</h4>
                    <p className="text-sm font-paragraph text-secondary">{testimonial.role}</p>
                    <p className="text-sm font-paragraph text-primary">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Success Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Look A Like Solutions Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Why Choose Look A Like Solutions?</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We're not just another digital marketing agency. Here's what makes our audit services stand out from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-heading text-dark-gray mb-8">Our Unique Approach</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Data-Driven Methodology',
                    description: 'We use advanced analytics tools and proprietary frameworks to ensure every recommendation is backed by solid data and industry best practices.'
                  },
                  {
                    icon: Lightbulb,
                    title: 'Actionable Insights',
                    description: 'Our audits don\'t just identify problems—we provide clear, prioritized action plans with step-by-step implementation guides.'
                  },
                  {
                    icon: HeadphonesIcon,
                    title: 'Ongoing Support',
                    description: 'Unlike other agencies, we provide continued support and consultation to ensure successful implementation of our recommendations.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-heading text-dark-gray mb-2">{feature.title}</h4>
                      <p className="font-paragraph text-secondary">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-background rounded-2xl p-8 shadow-lg">
                <h4 className="text-2xl font-heading text-dark-gray mb-6 text-center">What Sets Us Apart</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Industry Experience', value: '8+ Years' },
                    { label: 'Certified Experts', value: '15+ Team Members' },
                    { label: 'Tools & Technologies', value: '25+ Premium Tools' },
                    { label: 'Average Project ROI', value: '150%+' },
                    { label: 'Client Retention Rate', value: '95%' },
                    { label: 'Response Time', value: '< 2 Hours' }
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-light-gray last:border-b-0">
                      <span className="font-paragraph text-secondary">{stat.label}</span>
                      <span className="font-heading text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Proven Track Record',
                description: 'Over 300 successful audits with measurable results and satisfied clients across various industries.'
              },
              {
                icon: Zap,
                title: 'Fast Turnaround',
                description: 'Quick delivery without compromising quality. Get initial findings within 48 hours of project start.'
              },
              {
                icon: Settings,
                title: 'Custom Solutions',
                description: 'Every audit is tailored to your specific business needs, industry requirements, and growth objectives.'
              },
              {
                icon: ShieldCheck,
                title: 'Quality Guarantee',
                description: 'We stand behind our work with a satisfaction guarantee and ongoing support for implementation.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-heading text-dark-gray mb-3">{value.title}</h3>
                <p className="font-paragraph text-secondary text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-background rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-heading text-dark-gray mb-4">Ready to Transform Your Digital Presence?</h3>
              <p className="font-paragraph text-secondary mb-6">
                Join hundreds of businesses that have already benefited from our comprehensive digital audits. 
                Get started today and discover the hidden opportunities in your digital marketing strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Your Free Audit Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/case-studies">
                  <Button 
                    variant="outline" 
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  >
                    View Our Success Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Digital Audit Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Professional digital marketing audits to identify opportunities and optimize performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Quick Audit',
                price: '₹15,000',
                period: 'one-time',
                description: 'Essential audit for small businesses and startups',
                features: [
                  'Website & SEO analysis',
                  'Basic competitor review',
                  'Google Analytics audit',
                  '15-page report',
                  '30-minute consultation',
                  '7-day delivery'
                ],
                popular: false
              },
              {
                name: 'Comprehensive Audit',
                price: '₹35,000',
                period: 'one-time',
                description: 'Complete digital marketing analysis for growing businesses',
                features: [
                  'Full website & technical SEO audit',
                  'Social media analysis',
                  'Paid advertising review',
                  'Content marketing assessment',
                  'Detailed competitor analysis',
                  '40-page detailed report',
                  '60-minute strategy session',
                  '14-day delivery'
                ],
                popular: true
              },
              {
                name: 'Enterprise Audit',
                price: '₹75,000',
                period: 'one-time',
                description: 'Advanced audit with implementation roadmap',
                features: [
                  'Complete digital ecosystem audit',
                  'Advanced analytics setup',
                  'Multi-channel campaign analysis',
                  'Custom dashboard creation',
                  'Implementation roadmap',
                  '60+ page comprehensive report',
                  'Multiple strategy sessions',
                  'Priority 10-day delivery',
                  '30-day follow-up support'
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
                      <span className="text-secondary font-paragraph ml-1">/{plan.period}</span>
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
              Need a custom audit scope? We create tailored audit packages for unique business requirements.
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
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Audit ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our digital audit services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="Digital Audit" />
        </div>
      </section>



      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Digital Marketing Audit"
          serviceDescription="Let's discuss how our comprehensive audit can help identify opportunities and optimize your digital marketing performance."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Discover Hidden Opportunities?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free audit sample and discover how our comprehensive analysis can help optimize your digital marketing performance.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Audit Sample
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Audit Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}