import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { SEOHead } from '@/components/ui/seo-head';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, Target, TrendingUp, Users, AlertCircle, Lightbulb, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function PerformanceMarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Performance Marketing Services Bengaluru - Results-Driven Campaigns"
        description="Expert Performance Marketing in Bengaluru. Pay only for results: leads, sales, conversions. Multi-channel campaigns, ROI-focused strategies. Free consultation."
        keywords="performance marketing Bengaluru, results-based marketing, pay per performance, conversion marketing, digital marketing agency, ROI-focused marketing, lead generation"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "Performance Marketing Services",
            description: "Results-driven marketing campaigns where you pay only for actual conversions, leads, or sales. We manage Google Ads, Meta Ads, affiliate marketing, and other performance channels.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        faqs={[
          {
            question: "What is Performance Marketing?",
            answer: "Performance Marketing is a results-based approach where you pay only for actual conversions, leads, or sales. Unlike traditional advertising where you pay for impressions, Performance Marketing ensures every rupee drives measurable results."
          },
          {
            question: "How is Performance Marketing different from traditional advertising?",
            answer: "Traditional advertising charges for impressions or clicks. Performance Marketing charges only for results: leads, sales, or conversions. This makes it more accountable and ROI-focused."
          },
          {
            question: "What channels do you use for Performance Marketing?",
            answer: "We use Google Ads, Meta Ads, affiliate marketing, email marketing, and other channels. We choose the best mix based on your business goals and target audience."
          },
          {
            question: "How do you measure Performance Marketing success?",
            answer: "We track every conversion, lead, and sale. We measure ROAS (Return on Ad Spend), CPA (Cost Per Acquisition), and other metrics. You see exactly what you're paying for results."
          },
          {
            question: "What's the minimum budget for Performance Marketing?",
            answer: "We recommend starting with ₹20,000-50,000/month. This allows us to test different channels and audiences to find what works best for your business."
          },
          {
            question: "How quickly will I see results?",
            answer: "Performance Marketing can generate results within 24-48 hours. However, optimization typically takes 2-4 weeks to achieve peak performance and ROI."
          }
        ]}
        localBusiness={{
          name: "Look A Like Solutions",
          telephone: "+91-9731588244",
          streetAddress: "Bengaluru",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560001",
          latitude: 12.9716,
          longitude: 77.5946
        }}
        reviews={[
          {
            author: "Suresh Reddy",
            rating: 5,
            reviewBody: "Their Performance Marketing strategy transformed our business. We went from ₹2 per lead to ₹0.50 per lead while increasing volume 5X. Incredible ROI!",
            datePublished: "2024-10-12"
          }
        ]}
      />

      {/* Introduction Section */}
      <section className="py-20 bg-background border-b border-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-6">Performance Marketing: Pay Only for Results</h2>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Performance Marketing is a results-driven approach to digital marketing where you pay only for actual conversions, leads, or sales. Unlike traditional advertising where you pay for impressions or clicks regardless of results, Performance Marketing ensures every rupee is accountable and drives measurable business outcomes.
            </p>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              For Bengaluru businesses, Performance Marketing is ideal because it eliminates marketing waste. You're not paying for ads that don't convert. You're only paying when someone completes your desired action: filling a form, making a purchase, or calling your business. This makes Performance Marketing the most cost-effective marketing approach available.
            </p>
            <p className="text-lg font-paragraph text-secondary leading-relaxed">
              At Look A Like Solutions, we've managed Performance Marketing campaigns generating ₹100+ crores in revenue for our clients. Our average ROAS is 6.5X, meaning our clients earn ₹6.50 for every rupee they spend on Performance Marketing. We focus on optimization, testing, and scaling what works.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-12">Common Performance Marketing Challenges</h2>
            <div className="space-y-8">
              {[
                {
                  title: "High Cost Per Acquisition",
                  description: "Your cost per lead or sale is too high. You're spending ₹500 to acquire a customer worth ₹1000. This leaves no room for profit or scaling."
                },
                {
                  title: "Poor Conversion Tracking",
                  description: "You don't know which marketing channels are actually driving conversions. Without proper tracking, you can't optimize or make data-driven decisions."
                },
                {
                  title: "Wasted Ad Spend",
                  description: "You're spending money on channels that don't convert. Without testing and optimization, you're throwing money at the wall hoping something sticks."
                },
                {
                  title: "Inconsistent Results",
                  description: "Some months you get great results, other months nothing. Without a systematic approach, results are unpredictable and unreliable."
                },
                {
                  title: "No Multi-Channel Strategy",
                  description: "You're relying on one channel (like Google Ads). If that channel stops working, your entire marketing collapses. Diversification is critical."
                },
                {
                  title: "Lack of Optimization",
                  description: "You set up campaigns and forget about them. Without continuous testing, optimization, and refinement, you never achieve peak performance."
                }
              ].map((problem, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-destructive mt-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-dark-gray mb-2">{problem.title}</h3>
                    <p className="font-paragraph text-secondary">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Solve Section */}
      <section className="py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-12">How We Maximize Your Performance Marketing ROI</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Comprehensive Conversion Tracking",
                  description: "We implement proper conversion tracking across all channels. Every lead, sale, and customer action is tracked. This data guides all optimization decisions."
                },
                {
                  title: "Multi-Channel Strategy",
                  description: "We don't rely on one channel. We test Google Ads, Meta Ads, affiliate marketing, email, and other channels. We find the best mix for your business."
                },
                {
                  title: "Aggressive Cost Optimization",
                  description: "We focus on reducing your Cost Per Acquisition (CPA). Through testing, audience refinement, and creative optimization, we lower your CPA while maintaining quality."
                },
                {
                  title: "Continuous A/B Testing",
                  description: "We systematically test everything: audiences, creatives, landing pages, offers, and bidding strategies. Testing reveals what works and what doesn't."
                },
                {
                  title: "Data-Driven Decision Making",
                  description: "Every decision is backed by data. We don't guess or rely on intuition. We let the numbers guide our strategy and optimization."
                },
                {
                  title: "Scaling Winning Campaigns",
                  description: "Once we find what works, we scale it. We increase budgets to profitable campaigns, expanding reach while maintaining ROI."
                },
                {
                  title: "Transparent Reporting",
                  description: "You see exactly what you're paying for results. We report on conversions, CPA, ROAS, and other metrics. Complete transparency."
                }
              ].map((solution, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-primary mt-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-dark-gray mb-2">{solution.title}</h3>
                    <p className="font-paragraph text-secondary">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Performance Marketing Process</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              A systematic approach to maximize ROI and scale profitable campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Audit & Analysis',
                description: 'We analyze your current marketing, conversion tracking, and performance. We identify opportunities and inefficiencies.'
              },
              {
                step: '02',
                title: 'Strategy & Setup',
                description: 'We develop a Performance Marketing strategy, set up conversion tracking, and establish baseline metrics.'
              },
              {
                step: '03',
                title: 'Campaign Launch & Testing',
                description: 'We launch campaigns across multiple channels, test different audiences and creatives, and gather data.'
              },
              {
                step: '04',
                title: 'Optimization & Scaling',
                description: 'We optimize based on data, scale winning campaigns, and continuously improve ROI.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-2xl font-heading text-primary">{item.step}</span>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-light-gray transform -translate-y-1/2 ml-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                <p className="font-paragraph text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">What You'll Receive</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our Performance Marketing packages include comprehensive deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Strategy & Setup',
                items: ['Performance audit', 'Multi-channel strategy', 'Conversion tracking setup', 'Baseline metrics', 'Target CPA/ROAS definition']
              },
              {
                title: 'Campaign Management',
                items: ['Multi-channel campaigns', 'Daily optimization', 'Budget allocation', 'Audience testing', 'Creative testing']
              },
              {
                title: 'Testing & Optimization',
                items: ['A/B testing framework', 'Landing page optimization', 'Offer testing', 'Audience refinement', 'Continuous improvement']
              },
              {
                title: 'Reporting & Insights',
                items: ['Weekly performance updates', 'Conversion tracking reports', 'ROI analysis', 'CPA/ROAS tracking', 'Optimization recommendations']
              }
            ].map((section, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-paragraph text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Industries We Serve</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Performance Marketing works for any business focused on measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'E-commerce & Retail',
              'Real Estate',
              'Education & Training',
              'Healthcare & Wellness',
              'Financial Services',
              'Technology & SaaS',
              'Professional Services',
              'Hospitality & Tourism',
              'Automotive',
              'Home Services',
              'Legal Services',
              'Insurance'
            ].map((industry, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-paragraph text-secondary">{industry}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Why Choose Look A Like Solutions?</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              What sets us apart in Performance Marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Results-Focused Approach',
                description: 'We focus on one thing: maximizing your ROI. Every decision is made to improve conversions and reduce costs.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Track Record',
                description: '500+ campaigns managed, ₹100+ crores in revenue generated, 6.5X average ROAS.'
              },
              {
                icon: BarChart3,
                title: 'Data-Driven Optimization',
                description: 'We test everything and let data guide decisions. No guessing, no intuition—just results.'
              },
              {
                icon: Users,
                title: 'Multi-Channel Expertise',
                description: 'We manage Google Ads, Meta Ads, affiliate marketing, email, and other channels. We find the best mix for you.'
              },
              {
                icon: Zap,
                title: 'Continuous Improvement',
                description: 'We never stop optimizing. Every day we look for ways to improve your CPA and ROAS.'
              },
              {
                icon: CheckCircle,
                title: 'Transparent Reporting',
                description: 'You see exactly what you\'re paying for results. Complete transparency on conversions, CPA, and ROI.'
              }
            ].map((reason, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <reason.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-3">{reason.title}</h3>
                  <p className="font-paragraph text-secondary">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Performance Marketing Pricing</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Flexible pricing models aligned with your results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '₹20,000',
                period: '/month',
                description: 'Perfect for businesses starting with Performance Marketing',
                features: [
                  'Single channel setup (Google or Meta)',
                  'Conversion tracking implementation',
                  'Basic audience targeting',
                  'Weekly performance monitoring',
                  'Monthly optimization',
                  'Basic reporting'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹50,000',
                period: '/month',
                description: 'Ideal for growing businesses scaling campaigns',
                features: [
                  'Multi-channel campaigns (Google + Meta)',
                  'Advanced conversion tracking',
                  'Audience segmentation & testing',
                  'A/B testing framework',
                  'Daily optimization',
                  'Retargeting campaigns',
                  'Bi-weekly strategy calls',
                  'Detailed performance reports'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹1,00,000',
                period: '/month',
                description: 'Comprehensive solution for large-scale campaigns',
                features: [
                  'All channels (Google, Meta, Affiliate, Email)',
                  'Advanced analytics & attribution',
                  'Custom audience research',
                  'Aggressive A/B testing',
                  'Real-time optimization',
                  'Landing page optimization',
                  'Weekly strategy calls',
                  'Dedicated account manager',
                  'Custom reporting dashboard'
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
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Performance Marketing ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our Performance Marketing services.
            </p>
          </div>
          <ROICalculator serviceName="Performance Marketing" />
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact-form">
        <ServiceContactForm
          serviceName="Performance Marketing"
          serviceDescription="Let's discuss how our Performance Marketing expertise can help you maximize ROI and scale your business profitably."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Maximize Your Marketing ROI?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free Performance Marketing audit. We'll analyze your current campaigns and show you how to improve your ROI.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Performance Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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
