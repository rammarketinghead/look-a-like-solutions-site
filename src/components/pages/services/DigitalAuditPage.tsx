import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings, FileText, Eye, Shield } from 'lucide-react';

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
  const auditFAQs = [
    {
      question: "What does a digital marketing audit include?",
      answer: "Our comprehensive audit covers website performance, SEO analysis, social media presence, content quality, paid advertising effectiveness, email marketing performance, conversion optimization opportunities, competitor analysis, and technical infrastructure. You'll receive a detailed report with actionable recommendations."
    },
    {
      question: "How long does a digital marketing audit take?",
      answer: "A complete digital marketing audit typically takes 7-14 business days, depending on the complexity of your digital presence. We'll provide you with a timeline during our initial consultation and keep you updated throughout the process."
    },
    {
      question: "What will I receive after the audit is complete?",
      answer: "You'll receive a comprehensive 30-50 page report with detailed findings, prioritized recommendations, implementation roadmap, competitive analysis, and a 60-minute strategy session to discuss the results and next steps. All findings include specific action items and expected outcomes."
    },
    {
      question: "Do you provide implementation services after the audit?",
      answer: "Yes! While the audit provides the roadmap, we offer full implementation services to execute the recommendations. We can handle everything from technical fixes to complete digital marketing strategy implementation, or work with your existing team."
    },
    {
      question: "How often should I get a digital marketing audit?",
      answer: "We recommend annual comprehensive audits for most businesses, with quarterly mini-audits for rapidly growing companies or those in competitive markets. Major website changes, new product launches, or significant business pivots also warrant fresh audits."
    },
    {
      question: "What makes your audit different from free online tools?",
      answer: "Our audits combine advanced tools with human expertise and industry experience. We provide context, prioritization, and actionable strategies that automated tools can't offer. Our recommendations are tailored to your specific business goals and market conditions."
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
              <div className="space-y-4">
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
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive analysis of all your digital marketing channels and performance metrics.
            </p>
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
                icon: Shield,
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

      {/* FAQ Section */}
      <FAQSection 
        faqs={auditFAQs}
        title="Digital Marketing Audit FAQ"
        description="Get answers to common questions about our digital marketing audit services."
      />

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