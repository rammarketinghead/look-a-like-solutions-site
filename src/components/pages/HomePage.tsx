import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { ArrowRight, Target, TrendingUp, Users, Award } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

export default function HomePage() {
  const homeFAQs = [
    {
      question: "What digital marketing services do you offer?",
      answer: "We offer comprehensive digital marketing services including SEO optimization, social media marketing, paid advertising (Google Ads, Facebook Ads), web development, content marketing, influencer marketing, data analytics, and conversion optimization. Our goal is to provide end-to-end solutions for your digital presence."
    },
    {
      question: "How long does it take to see results from digital marketing?",
      answer: "Results vary depending on the service and your current digital presence. SEO typically shows results in 3-6 months, while paid advertising can generate immediate traffic. Social media growth usually takes 2-4 months to build momentum. We provide regular reports to track progress and adjust strategies as needed."
    },
    {
      question: "Do you work with businesses outside Bengaluru?",
      answer: "Yes, while we're based in Bengaluru, we work with clients across India and internationally. Our digital marketing strategies are designed to work for businesses regardless of location, and we conduct most of our client interactions remotely for convenience."
    },
    {
      question: "What makes Look A Like Solutions different from other agencies?",
      answer: "We focus on data-driven strategies, transparent reporting, and measurable results. Our team combines creativity with analytical thinking to deliver campaigns that not only look great but also drive real business growth. We also provide dedicated account management and regular strategy consultations."
    },
    {
      question: "How do you measure the success of digital marketing campaigns?",
      answer: "We track key performance indicators (KPIs) relevant to your business goals, including website traffic, conversion rates, lead generation, return on ad spend (ROAS), search rankings, social media engagement, and ultimately, revenue growth. We provide detailed monthly reports with actionable insights."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing varies based on the services you need and the scope of your project. We offer both project-based pricing and monthly retainer options. We provide transparent quotes with no hidden fees and can customize packages to fit your budget and goals. Contact us for a free consultation and quote."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Image Section */}
      <section className="relative h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-light-gray"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <Image
          src="https://static.wixstatic.com/media/f650f9_a19761649238486fa7792dc7db8ba1c4~mv2.png?originWidth=1600&originHeight=384"
          alt="Digital marketing excellence"
          width={1600}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/80 to-primary/60 flex items-center justify-center">
          <div className="text-center text-background max-w-4xl mx-auto mobile-container-spacing">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-background/20 backdrop-blur-sm text-background px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mobile-text-small mb-3 sm:mb-4 lg:mb-6">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">#1 Digital Marketing Agency in Bengaluru</span>
                <span className="sm:hidden">#1 Agency in Bengaluru</span>
              </div>
              <h1 className="mobile-heading-primary mb-3 sm:mb-4 lg:mb-6 leading-tight">
                Transform Your Digital Presence
              </h1>
              <p className="mobile-text-body mb-4 sm:mb-6 lg:mb-8 opacity-90">
                Data-driven strategies that deliver real results for businesses in Bengaluru and beyond
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center">
                <Link to="/contact">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mobile-button-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="border-2 border-background text-background hover:bg-background hover:text-dark-gray mobile-button-primary transition-all duration-300 w-full sm:w-auto">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Hero Section */}

      {/* Services Overview */}
      <section className="mobile-section-spacing bg-background">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing">
          <div className="text-center mobile-margin-section">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mobile-heading-primary text-dark-gray mobile-margin-element">
                Comprehensive Digital Marketing Solutions
              </h2>
              <p className="mobile-text-body text-secondary max-w-4xl mx-auto">
                From SEO to social media, we deliver results-driven strategies that help your business grow in the digital landscape.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mobile-grid-responsive"
          >
            {[
              { title: 'SEO Optimization', description: 'Boost your search rankings and organic traffic', icon: '🔍' },
              { title: 'Social Media Marketing', description: 'Engage your audience across all platforms', icon: '📱' },
              { title: 'Paid Advertising', description: 'Maximize ROI with targeted campaigns', icon: '🎯' },
              { title: 'Web Development', description: 'Build responsive, high-converting websites', icon: '💻' },
              { title: 'Influencer Marketing', description: 'Connect with your audience through trusted voices', icon: '👥' },
              { title: 'Content Marketing', description: 'Create compelling content that converts', icon: '✍️' },
              { title: 'Data Analytics', description: 'Make informed decisions with actionable insights', icon: '📊' },
              { title: 'Conversion Optimization', description: 'Turn more visitors into customers', icon: '⚡' }
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInVariants}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <CardContent className="mobile-card-spacing text-center h-full flex flex-col">
                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="mobile-heading-tertiary text-dark-gray mb-2 sm:mb-3 lg:mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="mobile-text-body text-secondary flex-grow">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <Link to="/services">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mobile-button-primary shadow-lg hover:shadow-xl transition-all duration-300">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Process Section - Inspired by attached image */}
      <section className="mobile-section-spacing bg-light-gray">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing">
          <div className="text-center mobile-margin-section">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mobile-heading-primary text-dark-gray mobile-margin-element">
                Our Simple 4-Step Process
              </h2>
              <p className="mobile-text-body text-secondary max-w-4xl mx-auto">
                A proven roadmap to take you from unseen to unstoppable.
              </p>
            </motion.div>
          </div>

          <div className="mobile-grid-responsive">
            {[
              {
                step: '01',
                title: 'Discovery & Strategy',
                description: 'We listen to your goals and create a tailored strategy.',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Implementation',
                description: 'Our experts execute the plan with precision.',
                icon: '⚡'
              },
              {
                step: '03',
                title: 'Optimization',
                description: 'We continuously monitor and refine for better results.',
                icon: '📈'
              },
              {
                step: '04',
                title: 'Reporting',
                description: 'You get clear, actionable insights into your performance.',
                icon: '📊'
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 relative group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl mb-2">{item.icon}</div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs sm:text-xs lg:text-sm font-heading text-primary-foreground">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-12 xl:w-16 h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform -translate-y-1/2 ml-3 xl:ml-4"></div>
                  )}
                </div>
                <h3 className="mobile-heading-tertiary text-dark-gray mb-2 sm:mb-3 lg:mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="mobile-text-body text-secondary">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mobile-button-primary shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Project Today
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Trusted By Section - Inspired by attached image */}
      <section className="mobile-section-spacing bg-background">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing">
          <div className="text-center mobile-margin-element">
            <h2 className="mobile-heading-secondary text-dark-gray mb-2 sm:mb-3 lg:mb-4">
              Trusted By Businesses in Bangalore
            </h2>
            <p className="mobile-text-body text-secondary">
              We're proud to have worked with industry leaders and ambitious startups alike.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
            {[
              'HearFon', 'SAYA', 'UPSTEP', 'MANDANA', 'AUDIOFIN', 'BLUE TRIBE'
            ].map((company, index) => (
              <div key={index} className="text-center group">
                <div className="h-10 sm:h-12 lg:h-16 flex items-center justify-center bg-light-gray rounded-lg p-2 sm:p-3 lg:p-4 group-hover:bg-primary/5 transition-colors duration-300">
                  <span className="mobile-text-small sm:text-base lg:text-lg font-heading text-secondary group-hover:text-primary transition-colors">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Results Section - Inspired by attached image */}
      <section className="mobile-section-spacing bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-[100rem] mx-auto mobile-container-spacing relative z-10">
          <div className="text-center mobile-margin-element">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mobile-heading-primary mb-3 sm:mb-4 lg:mb-6">
                Measurable Results We Deliver
              </h2>
              <p className="mobile-text-body opacity-90 max-w-4xl mx-auto">
                We focus on metrics that matter, translating marketing efforts into real business growth.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mobile-grid-responsive"
          >
            {[
              { number: '500+', label: 'Happy Clients', icon: '😊' },
              { number: '150%', label: 'Average Traffic Increase', icon: '📈' },
              { number: '3X', label: 'Higher Conversion Rates', icon: '🎯' },
              { number: '98%', label: 'Client Retention', icon: '🤝' }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInVariants} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl mobile-card-spacing group-hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{stat.icon}</div>
                  <div className="mobile-heading-primary mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                  <div className="mobile-text-body opacity-90">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <Link to="/case-studies">
              <Button variant="outline" className="border-2 border-background text-background hover:bg-background hover:text-primary mobile-button-primary shadow-lg hover:shadow-xl transition-all duration-300">
                View Our Results
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* What Our Clients Say Section */}
      <section className="mobile-section-spacing bg-light-gray">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing">
          <div className="text-center mobile-margin-section">
            <h2 className="mobile-heading-primary text-dark-gray mobile-margin-element">
              What Our Clients Say
            </h2>
            <p className="mobile-text-body text-secondary max-w-3xl mx-auto">
              Real stories of business growth and success from our valued clients across Bengaluru and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                company: 'TechStart Solutions',
                role: 'CEO',
                testimonial: 'Look A Like Solutions transformed our online presence completely. Our website traffic increased by 300% in just 6 months, and we\'re getting quality leads daily.',
                result: '300% traffic increase'
              },
              {
                name: 'Priya Sharma',
                company: 'Bangalore Boutique',
                role: 'Founder',
                testimonial: 'Their social media marketing strategy helped us reach thousands of new customers. Our Instagram following grew from 500 to 15,000 in 4 months!',
                result: '15K+ new followers'
              },
              {
                name: 'Amit Patel',
                company: 'Digital Dynamics',
                role: 'Marketing Director',
                testimonial: 'The ROI from their paid advertising campaigns exceeded our expectations. We achieved a 5x return on our ad spend within the first quarter.',
                result: '5x ROAS achieved'
              },
              {
                name: 'Sneha Reddy',
                company: 'Wellness Hub',
                role: 'Owner',
                testimonial: 'Their SEO expertise got us ranking #1 for our main keywords. We went from page 3 to the top of Google search results.',
                result: '#1 Google rankings'
              },
              {
                name: 'Vikram Singh',
                company: 'Local Eats',
                role: 'Restaurant Owner',
                testimonial: 'Local SEO optimization brought us 40% more foot traffic. Our Google My Business listing now gets hundreds of views daily.',
                result: '40% more customers'
              },
              {
                name: 'Kavya Nair',
                company: 'Fashion Forward',
                role: 'E-commerce Manager',
                testimonial: 'Their conversion optimization strategies increased our online sales by 250%. The new website design is both beautiful and functional.',
                result: '250% sales boost'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="mobile-card-spacing">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-2 sm:mr-3 lg:mr-4">
                        <span className="text-primary font-heading mobile-text-small sm:text-base lg:text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading text-dark-gray mobile-text-small sm:text-base">{testimonial.name}</h3>
                        <p className="mobile-text-small text-secondary">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="mobile-text-body text-secondary mb-3 sm:mb-4 italic">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="bg-primary/5 rounded-lg p-2 sm:p-3 lg:p-4">
                      <span className="text-primary font-heading mobile-text-small">
                        Key Result: {testimonial.result}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <Link to="/case-studies">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mobile-button-primary">
                Read More Success Stories
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="mobile-section-spacing bg-background">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing">
          <div className="text-center mobile-margin-section">
            <h2 className="mobile-heading-primary text-dark-gray mobile-margin-element">
              Why Choose Look A Like Solutions?
            </h2>
            <p className="mobile-text-body text-secondary max-w-3xl mx-auto">
              We combine creativity with data-driven strategies to deliver exceptional results for businesses in Bengaluru and beyond.
            </p>
          </div>

          <div className="mobile-grid-responsive">
            {[
              {
                icon: Target,
                title: 'Results-Driven',
                description: 'Every strategy is designed to deliver measurable outcomes and ROI'
              },
              {
                icon: TrendingUp,
                title: 'Proven Growth',
                description: 'Track record of helping businesses scale their digital presence'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Experienced professionals with deep industry knowledge'
              },
              {
                icon: Award,
                title: 'Quality Focused',
                description: 'Committed to delivering excellence in every project'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <h3 className="mobile-heading-tertiary text-dark-gray mb-2 sm:mb-3 lg:mb-4">{item.title}</h3>
                <p className="mobile-text-body text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <FAQSection 
        faqs={homeFAQs}
        description="Get answers to common questions about our digital marketing services and how we can help grow your business."
      />
      {/* CTA Section */}
      <section className="mobile-section-spacing bg-dark-gray">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing text-center">
          <h2 className="mobile-heading-primary text-background mobile-margin-element">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="mobile-text-body text-light-gray mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto">
            Let's discuss how we can help your business achieve its digital marketing goals. Get in touch for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mobile-button-primary w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray mobile-button-primary w-full sm:w-auto">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}