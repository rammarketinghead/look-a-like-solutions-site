import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SEOPage() {
  const seoFAQs = [
    {
      question: "How long does it take to see SEO results?",
      answer: "SEO is a long-term strategy that typically shows initial improvements in 3-4 months, with significant results visible in 6-12 months. The timeline depends on your website's current state, competition level, and the keywords you're targeting. We provide monthly progress reports to track improvements."
    },
    {
      question: "What's included in your SEO audit?",
      answer: "Our comprehensive SEO audit includes technical SEO analysis, on-page optimization review, keyword research, competitor analysis, backlink profile assessment, site speed evaluation, mobile-friendliness check, and content gap analysis. You'll receive a detailed report with actionable recommendations."
    },
    {
      question: "Do you guarantee first page rankings?",
      answer: "While we can't guarantee specific rankings due to Google's algorithm changes, we focus on sustainable, white-hat techniques that improve your overall search visibility. Our track record shows 85% of our clients achieve first-page rankings for their target keywords within 6-12 months."
    },
    {
      question: "How do you choose keywords for my business?",
      answer: "We conduct thorough keyword research using industry tools, analyzing search volume, competition level, user intent, and relevance to your business. We focus on a mix of high-volume competitive keywords and long-tail keywords with higher conversion potential."
    },
    {
      question: "What's the difference between on-page and off-page SEO?",
      answer: "On-page SEO involves optimizing elements on your website like content, meta tags, headers, and site structure. Off-page SEO focuses on external factors like backlinks, social signals, and online reputation. Both are crucial for comprehensive SEO success."
    },
    {
      question: "How do you measure SEO success?",
      answer: "We track multiple metrics including organic traffic growth, keyword rankings, click-through rates, conversion rates, bounce rate, page load speed, and ultimately, leads and sales generated from organic search. Monthly reports show progress across all these metrics."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-heading text-dark-gray mb-8">
              SEO Optimization Services
            </h1>
            <p className="text-xl font-paragraph text-secondary max-w-4xl mx-auto mb-12">
              Boost your search rankings and drive organic traffic with our comprehensive SEO strategies. We help businesses in Bengaluru and beyond achieve top search engine visibility.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Get SEO Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
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
              <div className="space-y-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <Button className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-background text-primary border border-primary hover:bg-primary hover:text-primary-foreground'}`}>
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
            <Link to="/contact">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Request Custom Quote
              </Button>
            </Link>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

              <div className="bg-background rounded-lg p-8 shadow-sm">
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
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={seoFAQs}
        title="SEO Frequently Asked Questions"
        description="Get answers to common questions about our SEO services and how we can help improve your search rankings."
      />

      {/* Contact Form Section */}
      <ServiceContactForm 
        serviceName="SEO Optimization"
        serviceDescription="Let's discuss how our SEO expertise can help your business rank higher in search results and drive more organic traffic."
      />

      {/* Results Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">SEO Results That Matter</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our SEO strategies deliver measurable improvements in search visibility and organic traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Get Free SEO Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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