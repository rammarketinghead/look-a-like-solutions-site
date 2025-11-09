import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Award, Zap, Settings, Heart, Star, Image as ImageIcon } from 'lucide-react';

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

export default function InfluencerMarketingPage() {
  const influencerFAQs = [
    {
      question: "How do you find the right influencers for my brand?",
      answer: "We use advanced tools and our extensive network to identify influencers who align with your brand values, target audience, and campaign goals. We analyze engagement rates, audience demographics, content quality, and brand safety to ensure the perfect match."
    },
    {
      question: "What's the typical ROI for influencer marketing campaigns?",
      answer: "Our influencer campaigns typically generate 4-6x ROI, with some campaigns achieving even higher returns. ROI varies based on campaign objectives, influencer tier, and industry. We track metrics like engagement, reach, website traffic, and conversions to measure success."
    },
    {
      question: "Do you work with micro-influencers or only major influencers?",
      answer: "We work with influencers across all tiers - from nano-influencers (1K-10K followers) to mega-influencers (1M+ followers). Often, micro-influencers provide better engagement rates and more authentic connections with niche audiences, making them highly effective for many campaigns."
    },
    {
      question: "How do you ensure content quality and brand alignment?",
      answer: "We provide detailed briefs, review content before publication, and maintain ongoing communication with influencers. Our team ensures all content meets brand guidelines while allowing influencers creative freedom to maintain authenticity with their audience."
    },
    {
      question: "What platforms do you focus on for influencer marketing?",
      answer: "We manage influencer campaigns across Instagram, YouTube, Facebook, LinkedIn, Twitter, and emerging platforms like TikTok. Platform selection depends on your target audience, campaign objectives, and where your potential customers are most active."
    },
    {
      question: "How long does it take to see results from influencer campaigns?",
      answer: "Initial engagement and brand awareness can be seen immediately during campaign launch. Meaningful metrics like website traffic and conversions typically show within 1-2 weeks. Long-term brand building and follower growth develop over 1-3 months of consistent campaigns."
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
                <Users className="h-4 w-4 mr-2" />
                Influencer Marketing Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Amplify Your Brand with 
                <span className="text-primary block">Authentic Influencers</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Connect with your target audience through trusted voices. Our influencer marketing campaigns build authentic relationships, increase brand awareness, and drive meaningful engagement that converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Find Perfect Influencers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Campaign Results
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '1000+', label: 'Influencers Network' },
                  { number: '6X', label: 'Average ROI' },
                  { number: '50M+', label: 'Total Reach Generated' }
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
                  src="https://static.wixstatic.com/media/f650f9_fb09056189954d9b9ee4589df2d80808~mv2.png?originWidth=576&originHeight=384"
                  alt="Influencer Marketing Campaign Results"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-purple-600 mb-1">↗ 650%</div>
                    <div className="text-sm font-paragraph text-purple-700">Brand Awareness</div>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-pink-600 mb-1">25M+</div>
                    <div className="text-sm font-paragraph text-pink-700">Impressions</div>
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
                Strategic Influencer Partnerships
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our influencer marketing experts connect your brand with the right creators to build authentic relationships with your target audience. We manage everything from influencer discovery to campaign execution and performance tracking.
              </p>
              <div className="space-y-4">
                {[
                  'Strategic influencer identification and vetting',
                  'Campaign planning and creative development',
                  'Contract negotiation and relationship management',
                  'Content creation oversight and approval',
                  'Performance tracking and ROI measurement'
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
                src="https://static.wixstatic.com/media/f650f9_0cc8e2f873bb4e6db82236c844a69170~mv2.png?originWidth=576&originHeight=384"
                alt="Influencer marketing network and partnerships"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Influencer Marketing Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Influencer Marketing Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive influencer marketing solutions to amplify your brand reach and engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Influencer Discovery',
                description: 'Find and vet the perfect influencers who align with your brand values and target audience.'
              },
              {
                icon: Target,
                title: 'Campaign Strategy',
                description: 'Develop comprehensive campaign strategies that maximize reach and engagement.'
              },
              {
                icon: ImageIcon,
                title: 'Content Creation',
                description: 'Collaborate with influencers to create authentic, engaging content that resonates.'
              },
              {
                icon: BarChart3,
                title: 'Performance Analytics',
                description: 'Track campaign performance with detailed analytics and ROI measurement.'
              },
              {
                icon: Star,
                title: 'Relationship Management',
                description: 'Build and maintain long-term relationships with key influencers for your brand.'
              },
              {
                icon: Heart,
                title: 'Brand Advocacy',
                description: 'Transform influencers into genuine brand advocates for sustained growth.'
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Influencer Marketing Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Flexible pricing options for influencer marketing campaigns of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Micro Campaign',
                price: '₹30,000',
                period: '/campaign',
                description: 'Perfect for small businesses testing influencer marketing',
                features: [
                  '3-5 micro-influencers',
                  'Campaign strategy development',
                  'Influencer outreach & negotiation',
                  'Content brief creation',
                  'Campaign monitoring',
                  'Basic performance report',
                  '1 month campaign duration'
                ],
                popular: false
              },
              {
                name: 'Growth Campaign',
                price: '₹75,000',
                period: '/campaign',
                description: 'Ideal for brands seeking significant reach and engagement',
                features: [
                  '8-12 influencers (micro & macro)',
                  'Multi-platform campaigns',
                  'Advanced targeting strategy',
                  'Content creation oversight',
                  'Real-time campaign optimization',
                  'Detailed analytics report',
                  '2 month campaign duration',
                  'Influencer relationship management'
                ],
                popular: true
              },
              {
                name: 'Premium Campaign',
                price: '₹1,50,000',
                period: '/campaign',
                description: 'Comprehensive campaigns with top-tier influencers',
                features: [
                  '15+ influencers (all tiers)',
                  'Celebrity influencer partnerships',
                  'Multi-channel campaign strategy',
                  'Professional content production',
                  'Advanced performance tracking',
                  'Custom analytics dashboard',
                  '3 month campaign duration',
                  'Dedicated campaign manager',
                  'Long-term partnership development'
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
              Need ongoing influencer marketing? We offer monthly retainer packages for continuous campaigns.
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
        faqs={influencerFAQs}
        title="Influencer Marketing FAQ"
        description="Get answers to common questions about our influencer marketing services and how we can help amplify your brand."
      />

      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Influencer Marketing"
          serviceDescription="Let's discuss how our influencer marketing expertise can help your brand connect with your target audience through authentic partnerships."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Amplify Your Brand with Influencers?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free influencer marketing strategy session and discover how we can help your brand reach new audiences through authentic partnerships.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Strategy Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Campaign Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}