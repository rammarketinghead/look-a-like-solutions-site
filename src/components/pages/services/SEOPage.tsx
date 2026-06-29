import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { SEOHead } from '@/components/ui/seo-head';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { ServiceHero } from '@/components/ui/service-hero';
import { BenefitsSection } from '@/components/ui/benefits-section';
import { ProcessSteps } from '@/components/ui/process-steps';
import { CTASection } from '@/components/ui/cta-section';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, Clock, Search, Settings, Target, TrendingUp, Zap, AlertCircle, Lightbulb, Users } from 'lucide-react';
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

export default function SEOPage() {

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="SEO Services in Bengaluru - Rank #1 on Google | Look A Like Solutions"
        description="Professional SEO services in Bengaluru helping businesses rank #1 on Google. 300%+ organic traffic growth, proven white-hat strategies, free SEO audit. Expert team with 10+ years experience."
        keywords="SEO services Bengaluru, SEO company Bengaluru, search engine optimization, Google ranking, organic traffic, local SEO, SEO expert Bengaluru, SEO agency India, technical SEO, link building"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "SEO Optimization Services",
            description: "Comprehensive SEO services including keyword research, on-page optimization, technical SEO, link building, content strategy, and local SEO to help your business rank #1 on Google and drive qualified organic traffic.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        faqs={[
          {
            question: "How long does it take to see SEO results in Bengaluru?",
            answer: "Most businesses see initial results within 3-6 months. Significant improvements typically occur within 6-12 months depending on competition and current website state. We provide monthly reporting to track progress."
          },
          {
            question: "What is included in your SEO services?",
            answer: "Our SEO services include keyword research, on-page optimization, technical SEO, content strategy, link building, local SEO optimization, and monthly performance reporting."
          },
          {
            question: "Do you guarantee first page rankings?",
            answer: "We don't guarantee specific rankings as no one can. However, our proven strategies have achieved first-page rankings for 85% of our clients within 6-12 months."
          },
          {
            question: "How much does SEO cost in Bengaluru?",
            answer: "Our SEO packages start at ₹25,000/month for startups and go up to ₹1,00,000+/month for enterprise solutions. We offer custom packages based on your specific needs."
          },
          {
            question: "What is the difference between SEO and SEM?",
            answer: "SEO (Search Engine Optimization) focuses on organic rankings through content, technical optimization, and link building. SEM (Search Engine Marketing) includes paid ads like Google Ads. We recommend a combined approach for maximum visibility."
          },
          {
            question: "Why should I choose Look A Like Solutions for SEO?",
            answer: "We combine technical expertise with strategic thinking. Our team has 10+ years of SEO experience, we use white-hat techniques, provide transparent reporting, and focus on sustainable growth rather than quick fixes."
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
            author: "Rajesh Kumar",
            rating: 5,
            reviewBody: "Our website traffic increased by 300% in just 6 months with their SEO services. We now rank #1 for our main keywords and get 50+ quality leads monthly.",
            datePublished: "2024-10-15"
          },
          {
            author: "Priya Sharma",
            rating: 5,
            reviewBody: "Excellent SEO team. They understood our business, conducted thorough research, and delivered results beyond expectations. Highly recommended for Bengaluru businesses.",
            datePublished: "2024-09-20"
          }
        ]}
      />
      {/* Introduction Section */}
      <section className="py-20 bg-background border-b border-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-6">What is SEO and Why It Matters for Your Business</h2>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Search Engine Optimization (SEO) is the practice of optimizing your website to rank higher in organic search results on Google, Bing, and other search engines. In Bengaluru's competitive digital landscape, SEO is no longer optional—it's essential for business survival. When potential customers search for products or services you offer, appearing on the first page of Google can mean the difference between thriving and struggling.
            </p>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Unlike paid advertising, which stops working the moment you stop paying, SEO builds sustainable, long-term visibility. Studies show that 68% of online experiences begin with a search engine, and 75% of users never scroll past the first page of search results. This means if you're not ranking on page one for your target keywords, you're losing potential customers to competitors.
            </p>
            <p className="text-lg font-paragraph text-secondary leading-relaxed">
              At Look A Like Solutions, we've helped 150+ Bengaluru-based businesses achieve first-page rankings, driving an average of 300% increase in organic traffic within 6-12 months. Our white-hat SEO strategies focus on sustainable growth, not quick fixes or risky tactics that could harm your site.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-12">Common SEO Problems Bengaluru Businesses Face</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Poor Search Visibility",
                  description: "Your website exists, but nobody can find it. You're buried on page 5-10 of Google for keywords your customers are searching for. This means lost leads, lost revenue, and competitors capturing your market share."
                },
                {
                  title: "Technical SEO Issues",
                  description: "Slow page load times, broken links, poor mobile optimization, and crawl errors prevent Google from properly indexing your site. These technical problems directly impact your rankings and user experience."
                },
                {
                  title: "Weak Content Strategy",
                  description: "Your website lacks quality, keyword-optimized content that answers customer questions. Without strategic content, you can't rank for valuable keywords or establish authority in your industry."
                },
                {
                  title: "No Local SEO Optimization",
                  description: "For Bengaluru businesses, local SEO is critical. If your Google My Business profile isn't optimized and you're not ranking in local search results, you're missing customers searching for services 'near me'."
                },
                {
                  title: "Poor Link Profile",
                  description: "Without quality backlinks from authoritative websites, Google doesn't see your site as trustworthy. Low domain authority means lower rankings, even for less competitive keywords."
                },
                {
                  title: "Outdated or No SEO Strategy",
                  description: "SEO changes constantly. If you haven't updated your strategy in 2+ years, you're likely using outdated tactics that no longer work—or worse, tactics that could penalize your site."
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
            <h2 className="text-3xl font-heading text-dark-gray mb-12">How Look A Like Solutions Solves Your SEO Challenges</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Comprehensive SEO Audit",
                  description: "We conduct a thorough analysis of your current SEO performance, identifying technical issues, content gaps, and competitive opportunities. This audit reveals exactly what's holding you back and what needs to change."
                },
                {
                  title: "Strategic Keyword Research",
                  description: "We identify high-value keywords that your target customers are actually searching for. We focus on keywords with commercial intent—the ones that convert into leads and sales, not just traffic."
                },
                {
                  title: "Technical SEO Excellence",
                  description: "We fix crawl errors, improve page speed, optimize for mobile, implement structured data, and ensure your site architecture is search-engine friendly. A technically sound website is the foundation of SEO success."
                },
                {
                  title: "Content Strategy & Creation",
                  description: "We develop a content strategy that targets your audience's pain points and questions. Our team creates optimized, engaging content that ranks well and converts visitors into customers."
                },
                {
                  title: "Local SEO Optimization",
                  description: "For Bengaluru businesses, we optimize your Google My Business profile, build local citations, and implement location-based schema markup. This helps you dominate local search results."
                },
                {
                  title: "Authority Building Through Link Building",
                  description: "We build high-quality backlinks from relevant, authoritative websites in your industry. This increases your domain authority and signals to Google that your site is trustworthy and valuable."
                },
                {
                  title: "Continuous Monitoring & Optimization",
                  description: "SEO isn't a one-time project. We continuously monitor your rankings, traffic, and conversions, making data-driven adjustments to improve performance month after month."
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
                SEO Optimization Service
              </div>
              <h1 className="font-heading text-dark-gray mb-8 text-6xl">
                SEO Services in Bengaluru -
                <span className="text-primary block">Rank #1 on Google</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Boost your organic visibility, drive qualified traffic, and increase conversions with our data-driven SEO strategies. Get found by customers actively searching for your services.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free SEO Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Pricing Plans
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '150+', label: 'Websites Optimized' },
                  { number: '85%', label: 'First Page Rankings' },
                  { number: '300%', label: 'Average Traffic Increase' }
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
                  src="https://static.wixstatic.com/media/f650f9_63037167c6fb4af29e81d6e8faa7770a~mv2.png?originWidth=576&originHeight=384"
                  alt="SEO Analytics Dashboard"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-green-600 mb-1">↗ 450%</div>
                    <div className="text-sm font-paragraph text-green-700">Organic Traffic</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-blue-600 mb-1">#1-3</div>
                    <div className="text-sm font-paragraph text-blue-700">Keyword Rankings</div>
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
                Dominate Search Results
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our SEO experts use proven strategies to improve your website's visibility, drive qualified traffic, and increase conversions. We focus on sustainable, white-hat techniques that deliver long-term results.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Comprehensive keyword research and strategy',
                  'On-page and technical SEO optimization',
                  'High-quality link building campaigns',
                  'Local SEO for Bengaluru businesses',
                  'Regular performance monitoring and reporting'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-paragraph text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={scrollToContact}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base"
              >
                Learn More About Our Approach
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_7275d7e20d244b0aad1c899962f3bcf0~mv2.png?originWidth=576&originHeight=448"
                alt="SEO optimization process"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* SEO Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our SEO Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive SEO solutions tailored to your business needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Search,
                title: 'Keyword Research',
                description: 'In-depth analysis to identify high-value keywords that drive qualified traffic to your website.'
              },
              {
                icon: Target,
                title: 'On-Page SEO',
                description: 'Optimize your website content, meta tags, and structure for better search engine visibility.'
              },
              {
                icon: TrendingUp,
                title: 'Technical SEO',
                description: 'Improve site speed, mobile responsiveness, and technical factors that impact rankings.'
              },
              {
                icon: BarChart3,
                title: 'Link Building',
                description: 'Build high-quality backlinks from authoritative websites to boost your domain authority.'
              },
              {
                icon: Target,
                title: 'Local SEO',
                description: 'Optimize your business for local searches and Google My Business listings in Bengaluru.'
              },
              {
                icon: TrendingUp,
                title: 'SEO Analytics',
                description: 'Track rankings, traffic, and conversions with detailed reporting and insights.'
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
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3"
            >
              Explore All SEO Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* Our Process Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our SEO Process</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              A systematic approach to improve your search rankings and drive sustainable organic growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                step: '01',
                title: 'SEO Audit & Analysis',
                description: 'Comprehensive analysis of your current SEO performance, technical issues, and opportunities.',
                icon: Search
              },
              {
                step: '02',
                title: 'Strategy Development',
                description: 'Custom SEO strategy based on your goals, target audience, and competitive landscape.',
                icon: Target
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Execute on-page optimization, technical fixes, content creation, and link building.',
                icon: Settings
              },
              {
                step: '04',
                title: 'Monitor & Optimize',
                description: 'Continuous monitoring, reporting, and optimization to improve performance.',
                icon: TrendingUp
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <item.icon className="h-8 w-8 text-primary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-heading text-primary-foreground">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-light-gray transform -translate-y-1/2 ml-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                <p className="font-paragraph text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base"
            >
              Start Your SEO Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* Our Pricing Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">SEO Pricing Plans</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Choose the plan that fits your business needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '₹25,000',
                period: '/month',
                description: 'Perfect for small businesses starting their SEO journey',
                features: [
                  'Up to 10 target keywords',
                  'On-page optimization',
                  'Technical SEO audit',
                  'Monthly reporting',
                  'Google My Business optimization',
                  'Basic link building'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹50,000',
                period: '/month',
                description: 'Ideal for growing businesses seeking comprehensive SEO',
                features: [
                  'Up to 25 target keywords',
                  'Advanced on-page optimization',
                  'Technical SEO implementation',
                  'Content strategy & creation',
                  'Competitive analysis',
                  'Quality link building',
                  'Bi-weekly reporting',
                  'Local SEO optimization'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹1,00,000',
                period: '/month',
                description: 'Comprehensive SEO solution for large businesses',
                features: [
                  'Unlimited target keywords',
                  'Full-scale SEO implementation',
                  'Advanced technical SEO',
                  'Content marketing strategy',
                  'Authority link building',
                  'Weekly reporting',
                  'Dedicated account manager',
                  'Multi-location SEO',
                  'Custom strategy development'
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
              Need a custom solution? We offer tailored SEO packages for unique business requirements.
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
      {/* Tools & Technologies Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Tools & Technologies We Use</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We leverage industry-leading tools and technologies to deliver exceptional SEO results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                category: 'SEO Analysis',
                tools: ['SEMrush', 'Ahrefs', 'Moz Pro', 'Screaming Frog']
              },
              {
                category: 'Technical SEO',
                tools: ['Google Search Console', 'Google PageSpeed Insights', 'GTmetrix', 'Lighthouse']
              },
              {
                category: 'Keyword Research',
                tools: ['Google Keyword Planner', 'Ubersuggest', 'Answer The Public', 'Keywords Everywhere']
              },
              {
                category: 'Analytics & Reporting',
                tools: ['Google Analytics', 'Google Data Studio', 'Rank Tracker', 'Search Console']
              }
            ].map((category, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading text-dark-gray mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.tools.map((tool, toolIndex) => (
                      <li key={toolIndex} className="flex items-center">
                        <Zap className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="font-paragraph text-secondary text-sm">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <p className="font-paragraph text-secondary mb-6">
              We use industry-leading tools to ensure your SEO success and deliver measurable results.
            </p>
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3"
            >
              See How We Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* Client Success Story Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Client Success Story</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See how our SEO strategies helped a Bengaluru-based e-commerce business achieve remarkable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-primary/5 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-heading text-dark-gray mb-4">TechGear India</h3>
                <p className="font-paragraph text-secondary mb-4">
                  <strong>Industry:</strong> E-commerce Electronics<br />
                  <strong>Challenge:</strong> Low organic visibility, high bounce rate, poor conversion rates<br />
                  <strong>Duration:</strong> 8 months
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-heading text-dark-gray mb-3">The Challenge</h4>
                  <p className="font-paragraph text-secondary">
                    TechGear India was struggling with poor search visibility despite having quality products. Their website wasn't ranking for relevant keywords, and organic traffic was minimal, forcing them to rely heavily on paid advertising.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-heading text-dark-gray mb-3">Our Solution</h4>
                  <ul className="space-y-2">
                    {[
                      'Comprehensive technical SEO audit and fixes',
                      'Keyword research targeting high-intent buyers',
                      'Product page optimization for better conversions',
                      'Content marketing strategy with buying guides',
                      'Strategic link building from tech publications'
                    ].map((solution, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-paragraph text-secondary">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { metric: '450%', label: 'Organic Traffic Increase', icon: TrendingUp },
                  { metric: '280%', label: 'Keyword Rankings', icon: Target },
                  { metric: '65%', label: 'Conversion Rate Boost', icon: BarChart3 },
                  { metric: '8 Months', label: 'Time to Results', icon: Clock }
                ].map((stat, index) => (
                  <div key={index} className="text-center bg-background rounded-lg p-6 shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-heading text-primary mb-2">{stat.metric}</div>
                    <div className="font-paragraph text-secondary text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-background rounded-lg p-8 shadow-sm mb-8">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary font-heading text-lg">R</span>
                  </div>
                  <div>
                    <h4 className="font-heading text-dark-gray">Rajesh Kumar</h4>
                    <p className="text-sm font-paragraph text-secondary">Founder, TechGear India</p>
                  </div>
                </div>
                <p className="font-paragraph text-secondary italic">
                  "Look A Like Solutions transformed our online presence completely. We went from page 3 to ranking #1 for our main keywords. Our organic sales increased by 280% in just 8 months. Their team's expertise and dedication are unmatched."
                </p>
              </div>

              <Button
                onClick={scrollToContact}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3"
              >
                Get Similar Results for Your Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* ROI Calculator Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your SEO ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our SEO services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="SEO" />
        </div>
      </section>

      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm
          serviceName="SEO Optimization"
          serviceDescription="Let's discuss how our SEO expertise can help your business rank higher in search results and drive more organic traffic."
        />
      </div>
      {/* Results Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">SEO Results That Matter</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our SEO strategies deliver measurable improvements in search visibility and organic traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              { number: '300%', label: 'Average Traffic Increase' },
              { number: '85%', label: 'First Page Rankings' },
              { number: '150%', label: 'Lead Generation Boost' },
              { number: '6 Months', label: 'Average Time to Results' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading text-primary mb-2">{stat.number}</div>
                <div className="font-paragraph text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base"
            >
              Achieve These Results for Your Business
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Improve Your Search Rankings?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free SEO audit and discover how we can help your business rank higher in search results.
          </p>
          <div className="flex gap-6 justify-center">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free SEO Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View SEO Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
