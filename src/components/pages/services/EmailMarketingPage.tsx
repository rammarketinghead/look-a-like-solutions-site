import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings, Send, Heart, Plus } from 'lucide-react';

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

export default function EmailMarketingPage() {
  const emailFAQs = [
    {
      question: "What email marketing platforms do you work with?",
      answer: "We work with all major email platforms including Mailchimp, Constant Contact, SendinBlue, ConvertKit, ActiveCampaign, HubSpot, and custom solutions. We'll recommend the best platform based on your needs, budget, and technical requirements."
    },
    {
      question: "How do you ensure emails don't go to spam?",
      answer: "We follow email best practices including proper authentication (SPF, DKIM, DMARC), maintaining clean lists, using reputable sending platforms, crafting compliant content, and monitoring sender reputation. We also conduct deliverability tests before major campaigns."
    },
    {
      question: "What kind of open and click rates can I expect?",
      answer: "Average open rates vary by industry but typically range from 15-25%. Click rates usually range from 2-5%. Our optimized campaigns often achieve above-average rates through targeted segmentation, compelling subject lines, and relevant content."
    },
    {
      question: "Do you help with email list building?",
      answer: "Yes! We create lead magnets, design opt-in forms, set up landing pages, and implement strategies to grow your email list organically. We focus on quality subscribers who are genuinely interested in your business rather than just quantity."
    },
    {
      question: "How often should we send emails to our subscribers?",
      answer: "Email frequency depends on your audience and content type. Generally, we recommend weekly newsletters for most businesses, with additional promotional emails as needed. We test different frequencies to find the optimal balance for your audience."
    },
    {
      question: "Can you create automated email sequences?",
      answer: "Absolutely! We specialize in creating automated email sequences including welcome series, abandoned cart recovery, post-purchase follow-ups, re-engagement campaigns, and nurture sequences. Automation helps maintain consistent communication while saving time."
    }
  ];

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
                <Mail className="h-4 w-4 mr-2" />
                Email Marketing Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Build Relationships with 
                <span className="text-primary block">Strategic Email Marketing</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Nurture leads, retain customers, and drive sales with personalized email campaigns. Our email marketing strategies deliver exceptional ROI through targeted messaging and automated sequences.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Email Strategy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Campaign Examples
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '42X', label: 'Average ROI' },
                  { number: '35%', label: 'Open Rate Average' },
                  { number: '1M+', label: 'Emails Sent Monthly' }
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
                  src="https://static.wixstatic.com/media/f650f9_d0a8278795ef4e88b066077dc6312f38~mv2.png?originWidth=576&originHeight=384"
                  alt="Email Marketing Campaign Performance"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-purple-600 mb-1">↗ 4200%</div>
                    <div className="text-sm font-paragraph text-purple-700">ROI Achieved</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-green-600 mb-1">85%</div>
                    <div className="text-sm font-paragraph text-green-700">Deliverability Rate</div>
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
                Personalized Email Experiences
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our email marketing experts create targeted campaigns that resonate with your audience. From welcome sequences to promotional campaigns, we help you build lasting relationships and drive consistent revenue through strategic email marketing.
              </p>
              <div className="space-y-4">
                {[
                  'Strategic email campaign planning and execution',
                  'Automated email sequences and workflows',
                  'List building and segmentation strategies',
                  'A/B testing for optimal performance',
                  'Detailed analytics and performance tracking'
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
                src="https://static.wixstatic.com/media/f650f9_c877c266f84341cc8d6c2ec6ededaf30~mv2.png?originWidth=576&originHeight=384"
                alt="Email marketing automation and workflows"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Email Marketing Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Email Marketing Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive email marketing solutions to nurture leads and drive customer loyalty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Send,
                title: 'Campaign Management',
                description: 'Strategic email campaigns designed to engage subscribers and drive conversions.'
              },
              {
                icon: Zap,
                title: 'Email Automation',
                description: 'Automated sequences that nurture leads and customers throughout their journey.'
              },
              {
                icon: Plus,
                title: 'List Building',
                description: 'Strategies and tools to grow your email list with qualified, engaged subscribers.'
              },
              {
                icon: Target,
                title: 'Segmentation',
                description: 'Advanced audience segmentation for personalized and relevant messaging.'
              },
              {
                icon: BarChart3,
                title: 'Performance Analytics',
                description: 'Detailed reporting and insights to optimize email performance and ROI.'
              },
              {
                icon: Heart,
                title: 'Retention Campaigns',
                description: 'Specialized campaigns to re-engage inactive subscribers and reduce churn.'
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Email Marketing Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Professional email marketing services to build relationships and drive revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '₹12,000',
                period: '/month',
                description: 'Perfect for small businesses starting with email marketing',
                features: [
                  'Up to 2,500 subscribers',
                  '4 campaigns per month',
                  'Basic templates',
                  'List management',
                  'Basic analytics',
                  'Email support'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹25,000',
                period: '/month',
                description: 'Ideal for growing businesses with advanced email needs',
                features: [
                  'Up to 10,000 subscribers',
                  '8 campaigns per month',
                  'Custom email design',
                  'Automation sequences',
                  'A/B testing',
                  'Advanced segmentation',
                  'Detailed analytics',
                  'Priority support'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹50,000',
                period: '/month',
                description: 'Complete email marketing solution for large businesses',
                features: [
                  'Unlimited subscribers',
                  'Unlimited campaigns',
                  'Advanced automation',
                  'Custom integrations',
                  'Dedicated IP',
                  'Advanced analytics',
                  'Dedicated account manager',
                  'Phone support',
                  'Monthly strategy calls'
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
              Need custom email marketing solutions? We create tailored packages for unique business requirements.
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Email Marketing ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our email marketing services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="Email Marketing" />
        </div>
      </section>



      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Email Marketing"
          serviceDescription="Let's discuss how our email marketing expertise can help your business build relationships and drive consistent revenue through strategic campaigns."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Build Customer Relationships?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free email marketing strategy session and discover how we can help your business nurture leads and drive sales through email.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Email Strategy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Email Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}