import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FAQSection } from '@/components/ui/faq-section';
import { Image } from '@/components/ui/image';
import { NewsletterSection } from '@/components/ui/newsletter-section';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { SEOHead } from '@/components/ui/seo-head';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, Eye, MessageCircle, Share2, Target, TrendingUp, Users, Zap, Heart, Megaphone } from 'lucide-react';
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

export default function SocialMediaPage() {
  const socialMediaFAQs = [
    {
      question: "How can social media marketing help my Bengaluru business?",
      answer: "Social media marketing helps you reach your target audience, build brand awareness, increase engagement, drive website traffic, and generate leads. We create strategies tailored to your business goals. In Bengaluru's competitive market, a strong social presence is essential for visibility and customer acquisition."
    },
    {
      question: "Which social media platforms should I focus on?",
      answer: "It depends on your audience. Instagram and Facebook are great for B2C businesses, LinkedIn for B2B, TikTok for younger audiences, and YouTube for video content. We recommend a multi-platform approach for maximum reach and engagement across different customer segments."
    },
    {
      question: "How often should we post on social media?",
      answer: "Posting frequency varies by platform. We recommend 3-5 posts per week on Instagram, 1-2 daily on Facebook, 2-3 times daily on Twitter, and 1-2 times weekly on LinkedIn. Consistency is more important than frequency—maintaining a regular schedule builds audience trust and algorithm favor."
    },
    {
      question: "What results can I expect from social media marketing?",
      answer: "Results vary by industry and starting point, but typically you can expect 20-50% follower growth monthly, 2-5x engagement increase, 10-30% website traffic boost, and 15-40% lead generation increase within 3-6 months of strategic management."
    },
    {
      question: "How much does social media marketing cost?",
      answer: "Our pricing ranges from ₹15,000/month for starter packages to ₹75,000+/month for enterprise solutions. Costs depend on platform count, content volume, advertising budget, and service level. We offer custom packages tailored to your budget and business goals."
    },
    {
      question: "How do you measure social media marketing success?",
      answer: "We track metrics including follower growth rate, engagement rate (likes, comments, shares), click-through rate, website traffic from social, lead generation, conversion rate, and ROI on paid social campaigns. Monthly reports provide detailed insights into performance and optimization opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Social Media Marketing Services Bengaluru - Expert Strategy & Management"
        description="Expert social media marketing in Bengaluru. Grow followers, increase engagement, build brand awareness. Instagram, Facebook, LinkedIn strategies. 500K+ followers generated. Free audit."
        keywords="social media marketing Bengaluru, Instagram marketing, Facebook marketing, LinkedIn marketing, social media management, content creation, influencer marketing, social media agency Bengaluru, social media strategy"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "Social Media Marketing Services",
            description: "Comprehensive social media marketing including content creation, community management, paid social advertising, influencer partnerships, and analytics across Instagram, Facebook, LinkedIn, Twitter, YouTube, and TikTok. We help Bengaluru businesses build engaged communities and drive conversions.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        faqs={socialMediaFAQs}
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
            author: "Priya Sharma",
            rating: 5,
            reviewBody: "Their Instagram strategy transformed our business. We went from 500 followers to 15,000 in 4 months, and our online sales tripled. The team's expertise in Bengaluru market dynamics was invaluable.",
            datePublished: "2024-09-20"
          },
          {
            author: "Rajesh Kumar",
            rating: 5,
            reviewBody: "Excellent social media management. They increased our LinkedIn engagement by 350% and generated 50+ qualified leads in 3 months. Professional, responsive, and results-driven.",
            datePublished: "2024-10-15"
          }
        ]}
      />

      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-primary/5 via-background to-light-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50\"></div>
        <div className="max-w-[100rem] mx-auto px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-paragraph mb-6">
                <Megaphone className="h-4 w-4 mr-2" />
                Social Media Marketing Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Social Media Marketing in Bengaluru -
                <span className="text-primary block">Grow Your Brand Online</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Transform your social presence with strategic content, community engagement, and data-driven campaigns. We help Bengaluru businesses build loyal audiences, increase conversions, and dominate their industry on Instagram, Facebook, LinkedIn, and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free Social Strategy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Success Stories
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '500K+', label: 'Followers Generated' },
                  { number: '350%', label: 'Avg Engagement Boost' },
                  { number: '100+', label: 'Brands Managed' }
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
                  alt="Social Media Analytics Dashboard showing engagement metrics"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-pink-600 mb-1">↗ 350%</div>
                    <div className="text-sm font-paragraph text-pink-700">Avg Engagement Rate</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-purple-600 mb-1">25K+</div>
                    <div className="text-sm font-paragraph text-purple-700">Avg New Followers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading text-dark-gray mb-8">
                What is Social Media Marketing and Why It Matters
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
                Social media marketing is the strategic use of social platforms to build brand awareness, engage audiences, and drive business results. In Bengaluru's competitive digital landscape, where over 85% of businesses compete online, a strong social presence is no longer optional—it's essential.
              </p>
              <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
                With over 500 million social media users in India and Bengaluru being a tech-savvy hub, businesses that master social platforms gain significant competitive advantages. Social media allows you to reach customers where they spend their time, build authentic relationships, and convert followers into loyal customers.
              </p>
              <p className="text-lg font-paragraph text-secondary mb-8 leading-relaxed">
                Our social media marketing services combine strategic planning, creative content, community management, and data-driven optimization to help your Bengaluru business achieve measurable growth across all major platforms.
              </p>
              <Button
                onClick={scrollToContact}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base"
              >
                Start Your Social Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_f3146b0c6b22430cbf1c2de861144b61~mv2.png?originWidth=576&originHeight=384"
                alt="Social media content creation and strategy planning"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Common Social Media Challenges Bengaluru Businesses Face
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Many businesses struggle with social media despite recognizing its importance. Here are the most common challenges we solve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Inconsistent Content & Low Engagement",
                description: "Posting sporadically without strategy leads to low engagement rates. Most businesses don't understand what content resonates with their audience, resulting in wasted time and minimal ROI."
              },
              {
                title: "Lack of Community Management",
                description: "Ignoring comments, messages, and audience interactions damages brand reputation. Customers expect timely responses, but many businesses lack dedicated resources for community engagement."
              },
              {
                title: "No Clear Social Strategy",
                description: "Without a defined strategy, social media efforts are scattered and ineffective. Businesses post randomly without understanding their target audience, platform algorithms, or business objectives."
              },
              {
                title: "Difficulty Measuring ROI",
                description: "Many businesses can't connect social media activities to actual business results. Without proper tracking and analytics, it's impossible to know if your social efforts are generating leads or sales."
              },
              {
                title: "Competing with Larger Brands",
                description: "In Bengaluru's crowded market, small and medium businesses struggle to stand out against well-funded competitors with large marketing budgets and established followings."
              },
              {
                title: "Staying Current with Algorithm Changes",
                description: "Social media algorithms change constantly. What worked last month may not work today. Most businesses lack the expertise to adapt quickly and maintain visibility."
              }
            ].map((problem, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{problem.title}</h3>
                  <p className="font-paragraph text-secondary">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              How We Solve Your Social Media Challenges
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our proven approach transforms your social media from a time sink into a revenue-generating asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "Strategic Content Planning",
                description: "We develop comprehensive content calendars aligned with your business goals. Each post is strategically planned to maximize engagement and drive specific outcomes."
              },
              {
                icon: MessageCircle,
                title: "Active Community Management",
                description: "Our team responds to comments, messages, and mentions within hours. We build genuine relationships with your audience, turning followers into brand advocates."
              },
              {
                icon: BarChart3,
                title: "Data-Driven Optimization",
                description: "We analyze performance metrics continuously, identifying what works and what doesn't. Regular A/B testing ensures your content strategy improves every month."
              },
              {
                icon: Zap,
                title: "Paid Social Campaigns",
                description: "We create and manage targeted ad campaigns across Facebook, Instagram, LinkedIn, and TikTok. Our campaigns are optimized for conversions, not just clicks."
              },
              {
                icon: Heart,
                title: "Authentic Brand Voice",
                description: "We develop a consistent brand voice that resonates with your target audience. Your content tells your story in a way that builds trust and loyalty."
              },
              {
                icon: Users,
                title: "Influencer Partnerships",
                description: "We identify and collaborate with relevant influencers in your industry. These partnerships amplify your reach and add credibility to your brand."
              }
            ].map((solution, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{solution.title}</h3>
                  <p className="font-paragraph text-secondary">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Our Step-by-Step Social Media Process
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We follow a proven methodology to ensure consistent growth and measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Audit & Strategy",
                description: "We analyze your current social presence, competitor landscape, and target audience. This informs our comprehensive strategy."
              },
              {
                step: "2",
                title: "Content Creation",
                description: "Our creative team develops engaging content—posts, videos, graphics—optimized for each platform and your audience."
              },
              {
                step: "3",
                title: "Community Management",
                description: "We actively manage your accounts, responding to comments, messages, and building genuine relationships with your followers."
              },
              {
                step: "4",
                title: "Analytics & Optimization",
                description: "We track performance metrics, analyze results, and continuously optimize your strategy for better outcomes each month."
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-heading">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                  <p className="font-paragraph text-secondary">{item.description}</p>
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We have expertise across diverse industries and understand the unique social media challenges each sector faces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "E-commerce & Retail",
              "Real Estate & Property",
              "Healthcare & Wellness",
              "Hospitality & Restaurants",
              "Education & Training",
              "Technology & SaaS",
              "Finance & Banking",
              "Fashion & Beauty",
              "Food & Beverage",
              "Professional Services",
              "Manufacturing & B2B",
              "Travel & Tourism"
            ].map((industry, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-4 flex-shrink-0" />
                  <span className="font-paragraph text-secondary">{industry}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              What You'll Receive
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our comprehensive social media packages include everything you need to succeed online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                category: "Content Creation",
                items: ["Custom graphics & designs", "Video content production", "Copywriting & captions", "Content calendar planning"]
              },
              {
                category: "Community Management",
                items: ["Daily engagement & responses", "Comment moderation", "Reputation monitoring", "Crisis management"]
              },
              {
                category: "Paid Advertising",
                items: ["Campaign strategy & setup", "Audience targeting", "Ad creative optimization", "Budget management"]
              },
              {
                category: "Analytics & Reporting",
                items: ["Monthly performance reports", "Growth metrics tracking", "ROI analysis", "Competitor benchmarking"]
              }
            ].map((deliverable, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-6">{deliverable.category}</h3>
                  <ul className="space-y-3">
                    {deliverable.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
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
      <section className="py-32 bg-light-gray">
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

      {/* Why Choose Us Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Why Choose Look A Like Solutions for Social Media Marketing
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We're not just another social media agency. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Bengaluru Market Expertise",
                description: "We understand the Bengaluru market deeply. We know your competitors, your audience, and what works in this tech-savvy city."
              },
              {
                title: "Proven Track Record",
                description: "We've generated 500K+ followers, managed 100+ brands, and achieved 350% average engagement increases. Our results speak for themselves."
              },
              {
                title: "Data-Driven Approach",
                description: "Every decision is backed by data. We track metrics, analyze performance, and continuously optimize for better results."
              },
              {
                title: "Transparent Communication",
                description: "You'll receive monthly reports showing exactly what we did, what worked, and what we're optimizing. No black boxes, no surprises."
              },
              {
                title: "Creative Excellence",
                description: "Our team includes designers, videographers, and copywriters who create content that stands out and drives engagement."
              },
              {
                title: "Dedicated Support",
                description: "You get a dedicated account manager who understands your business, your goals, and your industry. We're your partner, not just a vendor."
              }
            ].map((reason, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{reason.title}</h3>
                  <p className="font-paragraph text-secondary">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={socialMediaFAQs}
        title="Social Media Marketing FAQ"
        description="Get answers to common questions about our social media marketing services."
      />

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
          <div className="flex gap-6 justify-center flex-wrap">
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

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
