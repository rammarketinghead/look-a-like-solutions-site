import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Settings, MousePointer, FlaskConical, Eye } from 'lucide-react';

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

export default function ConversionOptimizationPage() {
  const croFAQs = [
    {
      question: "What is conversion rate optimization (CRO)?",
      answer: "CRO is the systematic process of increasing the percentage of website visitors who complete desired actions (conversions). This includes purchases, form submissions, newsletter signups, or any other goal. We use data analysis, user feedback, and A/B testing to improve conversion rates."
    },
    {
      question: "How long does it take to see results from CRO?",
      answer: "Initial improvements can often be seen within 2-4 weeks of implementing changes. However, meaningful CRO results typically develop over 2-3 months as we gather sufficient data, run multiple tests, and implement optimizations. Long-term CRO is an ongoing process."
    },
    {
      question: "What tools do you use for conversion optimization?",
      answer: "We use tools like Google Optimize, Hotjar, Crazy Egg, Optimizely, VWO, Google Analytics, and heat mapping software. We also conduct user surveys, usability testing, and analyze user behavior to identify optimization opportunities."
    },
    {
      question: "How do you determine what to test first?",
      answer: "We start with a comprehensive audit of your website, analyzing user behavior data, conversion funnels, and identifying the biggest opportunities for improvement. We prioritize tests based on potential impact, traffic volume, and ease of implementation."
    },
    {
      question: "What types of elements do you typically test?",
      answer: "We test headlines, call-to-action buttons, forms, page layouts, images, pricing displays, navigation, checkout processes, landing page designs, and overall user experience elements. Every element that could impact conversions is a potential test candidate."
    },
    {
      question: "How do you measure the success of CRO efforts?",
      answer: "We track conversion rates, revenue per visitor, average order value, form completion rates, bounce rates, and other relevant KPIs. We provide detailed reports showing the impact of each optimization and the overall improvement in your conversion performance."
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
                <Zap className="h-4 w-4 mr-2" />
                Conversion Rate Optimization Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Turn More Visitors into 
                <span className="text-primary block">Paying Customers</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Maximize your website's potential with data-driven conversion optimization. We use advanced testing and analytics to increase your conversion rates, boost revenue, and improve user experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free CRO Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Test Results
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '150%', label: 'Avg Conversion Increase' },
                  { number: '500+', label: 'A/B Tests Conducted' },
                  { number: '95%', label: 'Statistical Confidence' }
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
                  src="https://static.wixstatic.com/media/f650f9_a4e8d33a77d54e55b54040474fc2bcc0~mv2.png?originWidth=576&originHeight=384"
                  alt="Conversion Rate Optimization Testing Results"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-green-600 mb-1">↗ 180%</div>
                    <div className="text-sm font-paragraph text-green-700">Conversion Rate</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-blue-600 mb-1">+₹2.5L</div>
                    <div className="text-sm font-paragraph text-blue-700">Monthly Revenue</div>
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
                Scientific Approach to Conversion Growth
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our conversion optimization experts use data-driven methodologies to identify and eliminate barriers to conversion. We conduct systematic testing to improve every element of your user experience and maximize revenue from existing traffic.
              </p>
              <div className="space-y-4">
                {[
                  'Comprehensive conversion audit and analysis',
                  'A/B and multivariate testing implementation',
                  'User behavior analysis and heat mapping',
                  'Landing page optimization and redesign',
                  'Continuous testing and performance monitoring'
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
                src="https://static.wixstatic.com/media/f650f9_c4016dd01c61410eb6f9f117c498e7d8~mv2.png?originWidth=576&originHeight=384"
                alt="Conversion optimization process and methodology"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CRO Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our CRO Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive conversion optimization solutions to maximize your website's performance and revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FlaskConical,
                title: 'A/B Testing',
                description: 'Systematic testing of different page elements to identify the highest-converting variations.'
              },
              {
                icon: Eye,
                title: 'User Behavior Analysis',
                description: 'Heat maps, session recordings, and user journey analysis to understand visitor behavior.'
              },
              {
                icon: Target,
                title: 'Landing Page Optimization',
                description: 'Optimize landing pages for maximum conversion rates and improved user experience.'
              },
              {
                icon: MousePointer,
                title: 'Form Optimization',
                description: 'Reduce form abandonment and increase completion rates through strategic optimization.'
              },
              {
                icon: BarChart3,
                title: 'Conversion Funnel Analysis',
                description: 'Identify and fix bottlenecks in your conversion funnel to improve overall performance.'
              },
              {
                icon: Settings,
                title: 'Technical Optimization',
                description: 'Improve page speed, mobile experience, and technical factors affecting conversions.'
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">CRO Service Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Professional conversion optimization services to maximize your website's revenue potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'CRO Starter',
                price: '₹40,000',
                period: '/month',
                description: 'Essential conversion optimization for small to medium websites',
                features: [
                  'Conversion audit & analysis',
                  '2 A/B tests per month',
                  'Basic heat map analysis',
                  'Landing page recommendations',
                  'Monthly performance report',
                  'Email support'
                ],
                popular: false
              },
              {
                name: 'CRO Professional',
                price: '₹80,000',
                period: '/month',
                description: 'Comprehensive CRO solution for growing businesses',
                features: [
                  'Advanced conversion audit',
                  '4 A/B tests per month',
                  'User behavior analysis',
                  'Form optimization',
                  'Funnel analysis & optimization',
                  'Bi-weekly strategy calls',
                  'Detailed testing reports',
                  'Priority support'
                ],
                popular: true
              },
              {
                name: 'CRO Enterprise',
                price: '₹1,50,000',
                period: '/month',
                description: 'Advanced CRO solution for high-traffic websites',
                features: [
                  'Comprehensive CRO strategy',
                  'Unlimited A/B tests',
                  'Multivariate testing',
                  'Advanced user research',
                  'Custom analytics setup',
                  'Weekly optimization calls',
                  'Real-time testing dashboard',
                  'Dedicated CRO specialist',
                  'Quarterly strategy reviews'
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
              Need a custom CRO solution? We create tailored optimization strategies for unique business needs.
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
        faqs={croFAQs}
        title="Conversion Optimization FAQ"
        description="Get answers to common questions about our conversion rate optimization services."
      />

      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Conversion Rate Optimization"
          serviceDescription="Let's discuss how our CRO expertise can help your business maximize conversions and increase revenue from existing traffic."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Boost Your Conversion Rates?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free conversion audit and discover how we can help your website convert more visitors into customers.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free CRO Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View CRO Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}