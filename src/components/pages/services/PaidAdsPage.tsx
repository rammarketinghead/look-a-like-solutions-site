import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { SEOHead } from '@/components/ui/seo-head';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, Target, TrendingUp, Users, Wallet, Zap, AlertCircle, Lightbulb } from 'lucide-react';
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

export default function PaidAdsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Google Ads Services Bengaluru - Expert PPC Management | Look A Like Solutions"
        description="Expert Google Ads and PPC management in Bengaluru. 5.2X average ROAS, instant results, expert optimization. Search, Display, Shopping, YouTube ads. Free audit."
        keywords="Google Ads Bengaluru, PPC services Bengaluru, Google Ads expert, paid search advertising, search engine marketing, SEM, Google Ads agency, PPC management"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "Google Ads & PPC Services",
            description: "Comprehensive Google Ads and PPC management including Search Ads, Display Ads, Shopping Ads, YouTube Ads, and Remarketing. We optimize campaigns for maximum ROI and conversions.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        faqs={[
          {
            question: "How quickly will I see results from Google Ads in Bengaluru?",
            answer: "Google Ads can generate results within 24-48 hours. However, optimization typically takes 2-4 weeks to achieve peak performance. We provide daily monitoring and adjustments."
          },
          {
            question: "What is a good ROAS (Return on Ad Spend) for Google Ads?",
            answer: "A good ROAS varies by industry, but typically 3:1 to 5:1 is considered excellent. Our average ROAS is 5.2X, meaning for every rupee spent, clients earn ₹5.20 in revenue."
          },
          {
            question: "Which Google Ads campaign types should I use?",
            answer: "Search Ads for high-intent keywords, Display Ads for awareness, Shopping Ads for e-commerce, YouTube Ads for video, and Remarketing for past visitors. We recommend a multi-campaign approach."
          },
          {
            question: "How much should I budget for Google Ads?",
            answer: "Google Ads budgets vary widely. We recommend starting with ₹15,000-50,000/month and scaling based on performance. We optimize every rupee to maximize your ROI."
          },
          {
            question: "What makes Google Ads different from other advertising platforms?",
            answer: "Google Ads reaches people actively searching for your products/services (high intent). Unlike social media ads, Google Ads target search queries, making them highly effective for lead generation and sales."
          },
          {
            question: "Do you manage all Google Ads campaign types?",
            answer: "Yes! We manage Search, Display, Shopping, YouTube, App, and Remarketing campaigns. We create a comprehensive strategy using the right mix of campaign types for your goals."
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
            author: "Amit Patel",
            rating: 5,
            reviewBody: "Their Google Ads campaigns generated 300+ qualified leads in the first month. The ROI was incredible, and their team was very responsive to our needs.",
            datePublished: "2024-10-01"
          },
          {
            author: "Deepak Singh",
            rating: 5,
            reviewBody: "Best Google Ads agency in Bengaluru. They optimized our campaigns and reduced our cost per lead by 60% while increasing volume. Highly recommended!",
            datePublished: "2024-09-25"
          }
        ]}
      />

      {/* Introduction Section */}
      <section className="py-20 bg-background border-b border-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-6">Google Ads: Reach Customers Actively Searching for Your Business</h2>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Google Ads is the most powerful advertising platform for businesses in Bengaluru. Every day, billions of searches happen on Google. When someone searches for "plumber near me," "best restaurant in Indiranagar," or "web development services," your Google Ads can appear right at that moment—when they're actively looking for what you offer.
            </p>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Unlike social media advertising where you interrupt people's scrolling, Google Ads reach people with high purchase intent. They're not just browsing—they're searching for solutions. This makes Google Ads incredibly effective for lead generation, sales, and business growth. Studies show that 75% of clicks go to the top 3 paid search results, making Google Ads essential for visibility.
            </p>
            <p className="text-lg font-paragraph text-secondary leading-relaxed">
              At Look A Like Solutions, we've managed 200+ Google Ads campaigns for Bengaluru businesses, generating over ₹50 crores in revenue. Our average ROAS is 5.2X, meaning our clients earn ₹5.20 for every rupee they spend on Google Ads. We combine technical expertise with strategic thinking to maximize your ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-12">Common Google Ads Mistakes</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Poor Keyword Selection",
                  description: "Bidding on irrelevant keywords that don't match your business. This wastes budget on clicks from people who will never convert."
                },
                {
                  title: "Weak Ad Copy",
                  description: "Your ads don't stand out or clearly communicate your value proposition. Poor copy leads to low click-through rates and wasted budget."
                },
                {
                  title: "No Landing Page Optimization",
                  description: "Your ads send traffic to generic pages instead of targeted landing pages. Misaligned landing pages destroy conversion rates."
                },
                {
                  title: "Incorrect Bid Strategy",
                  description: "You're using the wrong bidding strategy for your goals. Manual bidding when you should use automated, or vice versa."
                },
                {
                  title: "No Negative Keywords",
                  description: "You're not excluding irrelevant searches. This means your ads show for searches that will never convert, wasting budget."
                },
                {
                  title: "Poor Quality Score",
                  description: "Your ads have low Quality Scores, meaning higher costs and lower positions. Quality Score depends on relevance, landing page, and click-through rate."
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
            <h2 className="text-3xl font-heading text-dark-gray mb-12">How We Maximize Your Google Ads ROI</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Strategic Keyword Research",
                  description: "We identify high-intent keywords that your customers are actually searching for. We focus on keywords with commercial intent—the ones that convert into leads and sales."
                },
                {
                  title: "Compelling Ad Copy",
                  description: "We write ad copy that stands out, clearly communicates your value, and compels people to click. We test multiple variations to find what works best."
                },
                {
                  title: "Landing Page Optimization",
                  description: "We create or optimize landing pages that match your ad messaging. Aligned landing pages dramatically improve conversion rates."
                },
                {
                  title: "Quality Score Optimization",
                  description: "We improve your Quality Score through better keyword relevance, ad copy, and landing page experience. Higher Quality Scores mean lower costs and better positions."
                },
                {
                  title: "Negative Keyword Strategy",
                  description: "We build comprehensive negative keyword lists to exclude irrelevant searches. This prevents wasted budget on clicks that won't convert."
                },
                {
                  title: "Smart Bid Management",
                  description: "We use the right bidding strategy for your goals: Target CPA for lead generation, Target ROAS for sales, or manual bidding for specific control."
                },
                {
                  title: "Continuous Optimization",
                  description: "We monitor campaigns daily, testing new keywords, ad variations, and landing pages. We continuously improve performance based on data."
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

      {/* Campaign Types Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Google Ads Campaign Types We Manage</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We manage all Google Ads campaign types to maximize your reach and ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Search Ads',
                description: 'Reach customers actively searching for your products/services. Highest intent, best for lead generation and sales.',
                icon: Target
              },
              {
                title: 'Display Ads',
                description: 'Build brand awareness with visual ads across millions of websites. Great for retargeting and reaching new audiences.',
                icon: BarChart3
              },
              {
                title: 'Shopping Ads',
                description: 'Perfect for e-commerce. Show product images, prices, and ratings directly in search results.',
                icon: Wallet
              },
              {
                title: 'YouTube Ads',
                description: 'Reach millions on YouTube with video ads. Great for brand awareness and engagement.',
                icon: TrendingUp
              },
              {
                title: 'Remarketing',
                description: 'Re-engage website visitors who didn\'t convert. Remarketing has 3-5X better ROI than cold traffic.',
                icon: Users
              },
              {
                title: 'App Promotion',
                description: 'Drive app installs and in-app actions. Reach users across Google\'s network.',
                icon: Zap
              }
            ].map((campaign, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <campaign.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-3">{campaign.title}</h3>
                  <p className="font-paragraph text-secondary">{campaign.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Industries We Serve</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We've successfully managed Google Ads campaigns across diverse industries in Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'E-commerce & Retail',
              'Real Estate',
              'Healthcare & Wellness',
              'Education & Training',
              'Professional Services',
              'Technology & SaaS',
              'Hospitality & Tourism',
              'Automotive',
              'Financial Services',
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
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Why Choose Look A Like Solutions for Google Ads?</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              What sets us apart in Google Ads management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Bengaluru Market Expertise',
                description: 'We understand local competition, customer behavior, and market dynamics. Our strategies are tailored to Bengaluru businesses.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Results',
                description: '200+ campaigns managed, 5.2X average ROAS, ₹50+ crores in revenue generated for clients.'
              },
              {
                icon: BarChart3,
                title: 'Data-Driven Approach',
                description: 'Every decision is backed by data. We test, measure, and optimize continuously for better results.'
              },
              {
                icon: Users,
                title: 'Dedicated Account Management',
                description: 'You get a dedicated Google Ads specialist who understands your business and goals.'
              },
              {
                icon: Zap,
                title: 'Continuous Optimization',
                description: 'We monitor campaigns daily, testing new keywords, ad variations, and strategies.'
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
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Google Ads Pricing</h2>
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
                description: 'Perfect for small businesses testing Google Ads',
                features: [
                  'Account setup & optimization',
                  '2-3 ad campaigns',
                  'Keyword research & selection',
                  '3-5 ad variations',
                  'Weekly performance monitoring',
                  'Monthly reporting'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹40,000',
                period: '/month',
                description: 'Ideal for growing businesses scaling campaigns',
                features: [
                  'Multiple campaigns (5-10)',
                  'Advanced keyword research',
                  'Landing page optimization',
                  '10-15 ad variations',
                  'A/B testing framework',
                  'Negative keyword strategy',
                  'Bi-weekly optimization calls',
                  'Detailed monthly reports'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹80,000',
                period: '/month',
                description: 'Comprehensive solution for large-scale campaigns',
                features: [
                  'Unlimited campaigns',
                  'Advanced audience research',
                  'Multi-campaign strategy',
                  'Custom landing pages',
                  'Advanced analytics & attribution',
                  'Conversion rate optimization',
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
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Google Ads ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our Google Ads services.
            </p>
          </div>
          <ROICalculator serviceName="Google Ads" />
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact-form">
        <ServiceContactForm
          serviceName="Google Ads Management"
          serviceDescription="Let's discuss how our Google Ads expertise can help you reach customers actively searching for your business and drive profitable growth."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Dominate Google Search Results?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free Google Ads audit. We'll analyze your current campaigns and show you how to improve your ROAS and reduce costs.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Google Ads Audit
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
