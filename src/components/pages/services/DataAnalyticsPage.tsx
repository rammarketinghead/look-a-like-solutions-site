import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Target, CheckCircle, Clock, DollarSign, Users, Award, Zap, Settings, PieChart, TrendingUp as LineChart, Database } from 'lucide-react';

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

export default function DataAnalyticsPage() {

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
                <BarChart3 className="h-4 w-4 mr-2" />
                Data Analytics & Reporting Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Make Data-Driven Decisions with 
                <span className="text-primary block">Advanced Analytics</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Transform raw data into actionable insights that drive business growth. Our analytics experts help you understand your customers, optimize campaigns, and make informed decisions based on real data.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free Analytics Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Sample Reports
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '100TB+', label: 'Data Analyzed' },
                  { number: '95%', label: 'Accuracy Rate' },
                  { number: '500+', label: 'Reports Generated' }
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
                  src="https://static.wixstatic.com/media/f650f9_cf70c5dffeac482891cfa19f31e908bb~mv2.png?originWidth=576&originHeight=448"
                  alt="Data Analytics Dashboard"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-indigo-600 mb-1">↗ 85%</div>
                    <div className="text-sm font-paragraph text-indigo-700">Decision Accuracy</div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-emerald-600 mb-1">40%</div>
                    <div className="text-sm font-paragraph text-emerald-700">Cost Reduction</div>
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
                Turn Data Into Strategic Advantage
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our data analytics experts help you collect, analyze, and interpret data to make informed business decisions. We provide comprehensive reporting and insights that drive growth and optimize performance across all your marketing channels.
              </p>
              <div className="space-y-4">
                {[
                  'Advanced analytics setup and configuration',
                  'Custom dashboard creation and visualization',
                  'Performance tracking and KPI monitoring',
                  'Predictive analytics and forecasting',
                  'Actionable insights and recommendations'
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
                src="https://static.wixstatic.com/media/f650f9_99e6f0a3916e448fa0cf978f55b543c1~mv2.png?originWidth=576&originHeight=448"
                alt="Data visualization and reporting process"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Analytics Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive data analytics solutions to help you understand and optimize your business performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Web Analytics',
                description: 'Comprehensive website performance tracking, user behavior analysis, and conversion optimization.'
              },
              {
                icon: PieChart,
                title: 'Marketing Analytics',
                description: 'Track and analyze all marketing channels to understand ROI and optimize campaign performance.'
              },
              {
                icon: LineChart,
                title: 'Custom Dashboards',
                description: 'Create personalized dashboards with real-time data visualization and key performance indicators.'
              },
              {
                icon: Target,
                title: 'Conversion Tracking',
                description: 'Set up and monitor conversion goals to measure the effectiveness of your marketing efforts.'
              },
              {
                icon: Database,
                title: 'Data Integration',
                description: 'Integrate data from multiple sources for a unified view of your business performance.'
              },
              {
                icon: TrendingUp,
                title: 'Predictive Analytics',
                description: 'Use historical data to predict future trends and make proactive business decisions.'
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Analytics & Reporting Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Professional analytics solutions to help you make data-driven decisions and optimize performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic Analytics',
                price: '₹15,000',
                period: '/month',
                description: 'Essential analytics setup and reporting for small businesses',
                features: [
                  'Google Analytics setup',
                  'Basic conversion tracking',
                  'Monthly performance reports',
                  'Key metrics dashboard',
                  'Email support',
                  'Up to 2 websites'
                ],
                popular: false
              },
              {
                name: 'Advanced Analytics',
                price: '₹35,000',
                period: '/month',
                description: 'Comprehensive analytics solution for growing businesses',
                features: [
                  'Multi-platform analytics setup',
                  'Custom dashboard creation',
                  'Advanced conversion tracking',
                  'Bi-weekly detailed reports',
                  'Data visualization',
                  'Performance optimization insights',
                  'Phone & email support',
                  'Up to 5 websites'
                ],
                popular: true
              },
              {
                name: 'Enterprise Analytics',
                price: '₹75,000',
                period: '/month',
                description: 'Complete analytics solution with predictive insights',
                features: [
                  'Enterprise analytics platform',
                  'Custom data integration',
                  'Predictive analytics',
                  'Real-time dashboards',
                  'Weekly strategy sessions',
                  'Advanced reporting suite',
                  'Dedicated analytics manager',
                  'Unlimited websites',
                  'API access'
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
              Need custom analytics solutions? We create tailored packages for enterprise-level requirements.
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Analytics ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our data analytics services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="Data Analytics" />
        </div>
      </section>



      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Data Analytics & Reporting"
          serviceDescription="Let's discuss how our analytics expertise can help your business make data-driven decisions and optimize performance."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Unlock Your Data's Potential?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free analytics audit and discover how we can help your business make smarter decisions with comprehensive data insights.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Analytics Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Analytics Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}