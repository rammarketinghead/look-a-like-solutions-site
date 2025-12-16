import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { NewsletterSection } from '@/components/ui/newsletter-section';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings, FileText, Video, Headphones } from 'lucide-react';

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

export default function ContentMarketingPage() {
  const contentFAQs = [
    {
      question: "What types of content do you create?",
      answer: "We create diverse content including blog posts, articles, infographics, videos, podcasts, social media content, whitepapers, case studies, email newsletters, and interactive content. Our content is tailored to your audience and optimized for each platform and stage of the customer journey."
    },
    {
      question: "How do you ensure content aligns with our brand voice?",
      answer: "We start with a comprehensive brand discovery session to understand your voice, tone, values, and messaging. We create detailed brand guidelines and content style guides, then have our writers and creators follow these closely while maintaining authenticity and engagement."
    },
    {
      question: "How often should we publish new content?",
      answer: "Content frequency depends on your goals, audience, and resources. We typically recommend 2-3 blog posts per week, daily social media content, and weekly video content for optimal engagement. We'll create a content calendar that balances quality with consistency based on your specific needs."
    },
    {
      question: "How do you measure content marketing success?",
      answer: "We track multiple metrics including website traffic, engagement rates, time on page, social shares, lead generation, conversion rates, and brand awareness. Our monthly reports show how content contributes to your business goals and which pieces perform best."
    },
    {
      question: "Do you handle content distribution and promotion?",
      answer: "Yes! We don't just create content - we ensure it reaches your audience through strategic distribution across social media, email marketing, influencer partnerships, and paid promotion when needed. Content creation is only half the battle; promotion is equally important."
    },
    {
      question: "Can you repurpose existing content into different formats?",
      answer: "Absolutely! We excel at content repurposing - turning blog posts into videos, infographics into social media series, webinars into podcast episodes, and more. This maximizes your content ROI and ensures your message reaches audiences who prefer different content formats."
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
                <PenTool className="h-4 w-4 mr-2" />
                Content Marketing Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Engage Audiences with 
                <span className="text-primary block">Compelling Content</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Build trust, establish authority, and drive conversions with strategic content marketing. From blog posts to videos, we create content that educates, entertains, and converts your audience into loyal customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Content Strategy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Content Samples
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '1000+', label: 'Content Pieces Created' },
                  { number: '300%', label: 'Avg Traffic Increase' },
                  { number: '85%', label: 'Lead Quality Improvement' }
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
                  src="https://static.wixstatic.com/media/f650f9_144031bb14eb42409177580792509c1d~mv2.png?originWidth=576&originHeight=448"
                  alt="Content Marketing Performance Dashboard"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-orange-600 mb-1">↗ 400%</div>
                    <div className="text-sm font-paragraph text-orange-700">Organic Traffic</div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-teal-600 mb-1">75%</div>
                    <div className="text-sm font-paragraph text-teal-700">Lead Quality Score</div>
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
                Strategic Content That Converts
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our content marketing experts create valuable, relevant content that attracts and engages your target audience. We develop comprehensive content strategies that build brand authority, drive organic traffic, and generate qualified leads.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Comprehensive content strategy development',
                  'SEO-optimized blog posts and articles',
                  'Engaging video and multimedia content',
                  'Social media content creation and curation',
                  'Performance tracking and optimization'
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
                Develop Your Content Strategy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_e85a871468f4428e92393c7cfcf91fba~mv2.png?originWidth=576&originHeight=448"
                alt="Content creation and strategy process"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Marketing Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Content Marketing Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive content solutions to build your brand authority and drive meaningful engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'Blog & Article Writing',
                description: 'SEO-optimized blog posts and articles that educate your audience and drive organic traffic.'
              },
              {
                icon: Video,
                title: 'Video Content',
                description: 'Engaging video content including explainers, tutorials, and brand stories for all platforms.'
              },
              {
                icon: Target,
                title: 'Content Strategy',
                description: 'Comprehensive content strategies aligned with your business goals and audience needs.'
              },
              {
                icon: BarChart3,
                title: 'Content Analytics',
                description: 'Detailed performance tracking and optimization to maximize content ROI.'
              },
              {
                icon: Headphones,
                title: 'Podcast Production',
                description: 'End-to-end podcast creation from planning to distribution and promotion.'
              },
              {
                icon: Zap,
                title: 'Content Repurposing',
                description: 'Transform existing content into multiple formats to maximize reach and engagement.'
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Content Marketing Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Flexible content marketing solutions to meet your brand's unique needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Essential',
                price: '₹25,000',
                period: '/month',
                description: 'Perfect for small businesses starting their content journey',
                features: [
                  '4 blog posts per month',
                  'Social media content (12 posts)',
                  'Basic SEO optimization',
                  'Content calendar',
                  'Monthly performance report',
                  'Email support'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹55,000',
                period: '/month',
                description: 'Ideal for growing businesses seeking comprehensive content',
                features: [
                  '8 blog posts per month',
                  'Social media content (20 posts)',
                  'Video content (2 per month)',
                  'Advanced SEO optimization',
                  'Email newsletter content',
                  'Bi-weekly strategy calls',
                  'Detailed analytics reports',
                  'Content repurposing'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹1,20,000',
                period: '/month',
                description: 'Complete content solution for established brands',
                features: [
                  '16 blog posts per month',
                  'Social media content (40 posts)',
                  'Video content (4 per month)',
                  'Podcast production',
                  'Whitepapers & case studies',
                  'Weekly strategy sessions',
                  'Custom analytics dashboard',
                  'Dedicated content manager',
                  'Content distribution strategy'
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
              Need custom content solutions? We create tailored packages for unique business requirements.
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Content Marketing ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our content marketing services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="Content Marketing" />
        </div>
      </section>



      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Content Marketing"
          serviceDescription="Let's discuss how our content marketing expertise can help your business build authority, engage audiences, and drive meaningful results."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Build Your Content Authority?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free content strategy consultation and discover how we can help your business engage audiences and drive growth through compelling content.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Content Strategy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Content Success Stories
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