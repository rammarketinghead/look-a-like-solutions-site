import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { ServiceHero } from '@/components/ui/service-hero';
import { BenefitsSection } from '@/components/ui/benefits-section';
import { ProcessSteps } from '@/components/ui/process-steps';
import { CTASection } from '@/components/ui/cta-section';
import { ProofChips } from '@/components/ui/proof-chips';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings, Video, Eye, Heart } from 'lucide-react';

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

export default function YouTubeGrowthPage() {
  const youtubeFAQs = [
    {
      question: "How long does it take to see results from YouTube growth services?",
      answer: "Initial improvements in video optimization and channel setup can be seen within 2-4 weeks. Significant subscriber and view growth typically occurs within 2-3 months of consistent content creation and optimization. Long-term growth and monetization usually develop over 6-12 months."
    },
    {
      question: "Do you help with YouTube monetization and revenue generation?",
      answer: "Yes! We help you qualify for YouTube Partner Program, optimize for ad revenue, develop sponsorship opportunities, create merchandise strategies, and explore other monetization methods like channel memberships and Super Chat. We focus on building sustainable revenue streams."
    },
    {
      question: "What type of content performs best on YouTube?",
      answer: "High-performing content varies by niche, but generally includes educational tutorials, entertaining content, behind-the-scenes videos, and content that solves specific problems. We analyze your audience and competitors to develop a content strategy that resonates with your target viewers."
    },
    {
      question: "How do you optimize videos for YouTube's algorithm?",
      answer: "We optimize through strategic keyword research, compelling titles and thumbnails, proper tags and descriptions, engaging introductions, optimal video length, and encouraging viewer engagement. We also focus on watch time, click-through rates, and audience retention metrics."
    },
    {
      question: "Can you help with video production and editing?",
      answer: "Absolutely! Our services include full video production from concept to final edit, including scripting, filming, professional editing, graphics, animations, and thumbnail design. We can work with your existing content or create everything from scratch."
    },
    {
      question: "How do you measure YouTube channel success?",
      answer: "We track key metrics including subscriber growth, view counts, watch time, engagement rates (likes, comments, shares), click-through rates, audience retention, and revenue generation. Our monthly reports show progress and identify opportunities for improvement."
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
                <Play className="h-4 w-4 mr-2" />
                YouTube Channel Growth Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Grow Your YouTube Channel with 
                <span className="text-primary block">Strategic Content</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Build a thriving YouTube presence that drives business growth. Our YouTube experts help you create engaging content, optimize for the algorithm, and build a loyal subscriber base that converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Channel Audit
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
                  { number: '10M+', label: 'Views Generated' },
                  { number: '500%', label: 'Avg Subscriber Growth' },
                  { number: '50+', label: 'Channels Managed' }
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
                  src="https://static.wixstatic.com/media/f650f9_d11743c222624642b92efb37b7168e3a~mv2.png?originWidth=576&originHeight=384"
                  alt="YouTube Channel Growth Analytics"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-red-600 mb-1">↗ 850%</div>
                    <div className="text-sm font-paragraph text-red-700">Subscriber Growth</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-orange-600 mb-1">2.5M</div>
                    <div className="text-sm font-paragraph text-orange-700">Monthly Views</div>
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
                Strategic YouTube Growth
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our YouTube specialists help you build a channel that drives real business results. From content strategy to optimization, we handle everything needed to grow your subscriber base, increase engagement, and generate revenue.
              </p>
              <div className="space-y-4">
                {[
                  'Comprehensive channel strategy and optimization',
                  'Content planning and video production',
                  'YouTube SEO and algorithm optimization',
                  'Thumbnail design and title optimization',
                  'Analytics tracking and performance optimization'
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
                src="https://static.wixstatic.com/media/f650f9_8e03dcad5018496bab62860162109a21~mv2.png?originWidth=576&originHeight=384"
                alt="YouTube content creation and optimization process"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our YouTube Growth Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive YouTube solutions to build your channel and drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: 'Content Strategy',
                description: 'Develop comprehensive content strategies that engage your audience and drive growth.'
              },
              {
                icon: Target,
                title: 'Channel Optimization',
                description: 'Optimize your channel for maximum discoverability and subscriber conversion.'
              },
              {
                icon: Eye,
                title: 'Video Production',
                description: 'Professional video creation, editing, and post-production services.'
              },
              {
                icon: BarChart3,
                title: 'YouTube SEO',
                description: 'Optimize videos for YouTube search and suggested video algorithms.'
              },
              {
                icon: Heart,
                title: 'Engagement Growth',
                description: 'Strategies to increase likes, comments, shares, and overall engagement.'
              },
              {
                icon: DollarSign,
                title: 'Monetization',
                description: 'Help you qualify for and maximize YouTube monetization opportunities.'
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">YouTube Growth Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Professional YouTube growth services to build your channel and drive business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Channel Starter',
                price: '₹20,000',
                period: '/month',
                description: 'Perfect for new channels starting their YouTube journey',
                features: [
                  'Channel setup & optimization',
                  '2 videos per month',
                  'Basic video editing',
                  'Thumbnail design',
                  'YouTube SEO optimization',
                  'Monthly analytics report'
                ],
                popular: false
              },
              {
                name: 'Growth Accelerator',
                price: '₹45,000',
                period: '/month',
                description: 'Ideal for channels seeking rapid growth and engagement',
                features: [
                  'Advanced channel optimization',
                  '4 videos per month',
                  'Professional video production',
                  'Custom thumbnail design',
                  'Advanced YouTube SEO',
                  'Content strategy development',
                  'Bi-weekly performance reviews',
                  'Community management'
                ],
                popular: true
              },
              {
                name: 'YouTube Mastery',
                price: '₹85,000',
                period: '/month',
                description: 'Complete YouTube solution for serious content creators',
                features: [
                  'Comprehensive channel strategy',
                  '8 videos per month',
                  'Premium video production',
                  'Advanced graphics & animation',
                  'Multi-platform optimization',
                  'Monetization strategy',
                  'Weekly strategy sessions',
                  'Dedicated channel manager',
                  'Brand partnership opportunities'
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
              Need custom YouTube solutions? We create tailored packages for unique channel requirements.
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
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your YouTube ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our YouTube growth services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="YouTube Growth" />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={youtubeFAQs}
        title="YouTube Growth FAQ"
        description="Get answers to common questions about our YouTube channel growth services."
      />

      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="YouTube Channel Growth"
          serviceDescription="Let's discuss how our YouTube expertise can help your business build a thriving channel that drives growth and engagement."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Grow Your YouTube Channel?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free YouTube channel audit and discover how we can help your business build a thriving presence on the world's largest video platform.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Channel Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View YouTube Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}