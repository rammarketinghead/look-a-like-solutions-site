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

export default function MetaAdsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Meta Ads Services Bengaluru - Facebook & Instagram Advertising"
        description="Expert Meta Ads management in Bengaluru. Facebook and Instagram advertising campaigns with 4.8X average ROAS. Audience targeting, creative optimization, conversion tracking. Free audit."
        keywords="Meta ads Bengaluru, Facebook ads, Instagram ads, Meta advertising, Facebook advertising agency, Instagram marketing, social media ads, paid social advertising"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "Meta Ads Services",
            description: "Comprehensive Meta Ads management including Facebook Ads, Instagram Ads, Audience Network, and Messenger Ads. We create targeted campaigns that drive awareness, engagement, and conversions.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        faqs={[
          {
            question: "What's the difference between Facebook Ads and Instagram Ads?",
            answer: "Facebook Ads are best for detailed targeting and conversion campaigns. Instagram Ads excel at visual storytelling and brand awareness. We use both together for maximum reach and impact."
          },
          {
            question: "How quickly will I see results from Meta Ads?",
            answer: "Meta Ads can generate results within 24-48 hours. However, optimization typically takes 2-4 weeks to achieve peak performance. We continuously test and refine for better results."
          },
          {
            question: "What's a good ROAS for Meta Ads campaigns?",
            answer: "A good ROAS is typically 3:1 to 5:1. Our average ROAS is 4.8X, meaning for every rupee spent, clients earn ₹4.80 in revenue."
          },
          {
            question: "How much should I budget for Meta Ads?",
            answer: "We recommend starting with ₹10,000-50,000/month. We optimize every rupee to maximize your ROI and can scale based on performance."
          },
          {
            question: "Can you help with audience targeting?",
            answer: "Yes! We create detailed audience segments based on demographics, interests, behaviors, and custom audiences. Precise targeting is key to campaign success."
          },
          {
            question: "Do you handle creative design for ads?",
            answer: "We work with talented designers to create compelling ad creatives. We also test multiple variations to find what resonates best with your audience."
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
            author: "Neha Desai",
            rating: 5,
            reviewBody: "Their Meta Ads campaigns generated 500+ qualified leads in 2 months. The targeting was precise, and the ROAS exceeded our expectations. Highly recommended!",
            datePublished: "2024-10-10"
          }
        ]}
      />

      {/* Introduction Section */}
      <section className="py-20 bg-background border-b border-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-6">Meta Ads: The Most Powerful Social Advertising Platform</h2>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Meta Ads (Facebook and Instagram advertising) reach over 3 billion people monthly across Facebook, Instagram, Messenger, and Audience Network. For Bengaluru businesses, Meta Ads offer unparalleled targeting precision, allowing you to reach your ideal customers based on demographics, interests, behaviors, and even purchase history.
            </p>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Unlike traditional advertising, Meta Ads let you start small, test different messages and audiences, and scale what works. You only pay for actual results—clicks, leads, or sales—not impressions. This makes Meta Ads ideal for businesses of all sizes, from startups to enterprises.
            </p>
            <p className="text-lg font-paragraph text-secondary leading-relaxed">
              At Look A Like Solutions, we've managed 500+ Meta Ads campaigns, generating over ₹50 crores in revenue for our clients. Our average ROAS is 4.8X, meaning our clients earn ₹4.80 for every rupee they spend on Meta Ads.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-12">Common Meta Ads Challenges</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Poor Audience Targeting",
                  description: "Your ads reach the wrong people. Without precise targeting, you waste budget on uninterested users. This leads to high cost-per-click, low conversion rates, and negative ROI."
                },
                {
                  title: "Weak Ad Creative",
                  description: "Your ads don't stand out in the crowded Meta feed. Poor visuals, weak copy, or unclear value propositions mean users scroll past without engaging."
                },
                {
                  title: "No A/B Testing",
                  description: "You're running one version of an ad and hoping it works. Without testing different headlines, images, and audiences, you never discover what actually resonates."
                },
                {
                  title: "Incorrect Campaign Objectives",
                  description: "You're optimizing for the wrong metric. Choosing 'Reach' when you need 'Conversions' means Meta's algorithm can't optimize for your actual business goal."
                },
                {
                  title: "Poor Conversion Tracking",
                  description: "You don't know which ads are actually driving sales. Without proper tracking, you can't measure ROI or make data-driven optimization decisions."
                },
                {
                  title: "Budget Misallocation",
                  description: "You're spreading budget too thin across too many campaigns, or spending on underperforming audiences. This prevents you from scaling what works."
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
            <h2 className="text-3xl font-heading text-dark-gray mb-12">How We Optimize Your Meta Ads Campaigns</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Advanced Audience Segmentation",
                  description: "We create detailed audience segments using lookalike audiences, custom audiences, interest targeting, and behavioral data. This ensures your ads reach people most likely to convert."
                },
                {
                  title: "Creative Excellence",
                  description: "Our designers create compelling ad visuals. We test multiple variations—different images, videos, headlines, and copy—to find what resonates best with each audience segment."
                },
                {
                  title: "Strategic Campaign Structure",
                  description: "We organize campaigns by objective (awareness, consideration, conversion) and audience segment. This allows Meta's algorithm to optimize effectively for your specific goals."
                },
                {
                  title: "Continuous A/B Testing",
                  description: "We systematically test different elements: audiences, creatives, copy, landing pages, and bidding strategies. This data-driven approach continuously improves performance."
                },
                {
                  title: "Conversion Tracking & Attribution",
                  description: "We implement proper conversion tracking using Meta Pixel, ensuring we can measure which ads drive actual sales. This data guides all optimization decisions."
                },
                {
                  title: "Budget Optimization",
                  description: "We allocate budget to top-performing audiences and campaigns, scaling what works and pausing what doesn't. This maximizes your ROI."
                },
                {
                  title: "Retargeting Strategies",
                  description: "We create retargeting campaigns for website visitors, cart abandoners, and past customers. Retargeting typically has 3-5X better ROI than cold traffic campaigns."
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Meta Ads Process</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              A systematic approach to build, test, and scale profitable Meta Ads campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Strategy & Planning',
                description: 'Define campaign objectives, target audience, budget, and success metrics. We align ads with your business goals.'
              },
              {
                step: '02',
                title: 'Creative Development',
                description: 'Design compelling ad creatives. We create multiple variations to test different messages and visuals.'
              },
              {
                step: '03',
                title: 'Campaign Setup & Launch',
                description: 'Set up campaigns with proper audience targeting, conversion tracking, and bidding strategies. We launch with daily monitoring.'
              },
              {
                step: '04',
                title: 'Optimization & Scaling',
                description: 'Continuously test, analyze, and optimize. We scale winning campaigns and pause underperformers.'
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
              Our Meta Ads packages include everything needed for campaign success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Campaign Strategy',
                items: ['Audience research & segmentation', 'Campaign structure planning', 'Budget allocation strategy', 'Conversion tracking setup', 'Competitor analysis']
              },
              {
                title: 'Creative & Copy',
                items: ['Ad creative design (5-10 variations)', 'Copywriting & headlines', 'Landing page optimization', 'A/B testing framework', 'Video production (if needed)']
              },
              {
                title: 'Campaign Management',
                items: ['Daily campaign monitoring', 'Real-time optimization', 'Audience adjustments', 'Budget management', 'Performance troubleshooting']
              },
              {
                title: 'Reporting & Insights',
                items: ['Weekly performance updates', 'Monthly detailed reports', 'ROI analysis', 'Recommendations for improvement', 'Quarterly strategy reviews']
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
              We've successfully managed Meta Ads campaigns across diverse industries in Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'E-commerce & Retail',
              'Real Estate',
              'Healthcare & Wellness',
              'Education & Training',
              'Hospitality & Tourism',
              'Professional Services',
              'Technology & SaaS',
              'Food & Beverage',
              'Automotive'
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
              What sets us apart in Meta Ads management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: 'Bengaluru Market Expertise',
                description: 'We understand local consumer behavior, preferences, and cultural nuances. Our campaigns resonate with Bengaluru audiences.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Results',
                description: '500+ campaigns managed, 4.8X average ROAS, ₹50+ crores in revenue generated for clients.'
              },
              {
                icon: Target,
                title: 'Advanced Targeting',
                description: 'We use lookalike audiences, custom audiences, and behavioral targeting to reach your ideal customers.'
              },
              {
                icon: BarChart3,
                title: 'Data-Driven Optimization',
                description: 'Every decision is backed by data. We test, measure, and optimize continuously for better results.'
              },
              {
                icon: Zap,
                title: 'Creative Excellence',
                description: 'Our in-house designers create compelling ad creatives that stop the scroll and drive engagement.'
              },
              {
                icon: CheckCircle,
                title: 'Transparent Reporting',
                description: 'Weekly updates and monthly reports show exactly what we\'ve done and the results achieved.'
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Meta Ads Pricing</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Choose the package that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '₹15,000',
                period: '/month',
                description: 'Perfect for small businesses testing Meta Ads',
                features: [
                  'Ad account setup & optimization',
                  '2-3 ad campaigns',
                  'Basic audience targeting',
                  '3-5 ad creative variations',
                  'Weekly performance updates',
                  'Monthly reporting'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹35,000',
                period: '/month',
                description: 'Ideal for growing businesses scaling campaigns',
                features: [
                  'Multiple ad campaigns (5-10)',
                  'Advanced audience segmentation',
                  '10-15 ad creative variations',
                  'A/B testing framework',
                  'Retargeting campaigns',
                  'Conversion tracking setup',
                  'Bi-weekly optimization calls',
                  'Detailed monthly reports'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹75,000',
                period: '/month',
                description: 'Comprehensive solution for large-scale campaigns',
                features: [
                  'Unlimited ad campaigns',
                  'Advanced audience research',
                  'Custom creative production',
                  'Video ad creation',
                  'Multi-platform campaigns',
                  'Advanced analytics & attribution',
                  'Weekly optimization calls',
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Meta Ads ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our Meta Ads services.
            </p>
          </div>
          <ROICalculator serviceName="Meta Ads" />
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact-form">
        <ServiceContactForm
          serviceName="Meta Ads Management"
          serviceDescription="Let's discuss how our Meta Ads expertise can help you reach your ideal customers and drive profitable growth."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Scale Your Business with Meta Ads?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free Meta Ads audit. We'll analyze your current performance and show you how to improve your ROAS.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Meta Ads Audit
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
