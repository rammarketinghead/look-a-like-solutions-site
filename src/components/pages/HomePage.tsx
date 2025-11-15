import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { SEOHead } from '@/components/ui/seo-head';
import { TrustedBusinessesCarousel } from '@/components/ui/trusted-businesses-carousel';

import { ArrowRight, Target, TrendingUp, Users, Award, Play, Star, CheckCircle } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
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
      <SEOHead 
        title="Look A Like Solutions - Digital Marketing Agency in Bengaluru"
        description="Leading digital marketing agency in Bengaluru offering SEO, social media marketing, paid ads, web development, and more. Grow your business with data-driven strategies and proven results."
        keywords="digital marketing agency Bengaluru, SEO services, social media marketing, paid advertising, web development, content marketing, digital marketing company India"
        type="website"
      />
      
      {/* Mobile-First Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-light-gray"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/f650f9_a19761649238486fa7792dc7db8ba1c4~mv2.png?originWidth=1600&originHeight=384"
            alt="Digital marketing excellence"
            width={1600}
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mobile-container text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInVariants} className="mb-6">
              <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm text-primary px-4 py-2 rounded-full mobile-body-sm font-medium">
                <Target className="h-4 w-4 mr-2" />
                #1 Digital Marketing Agency in Bengaluru
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={fadeInVariants} className="mobile-h1 text-dark-gray mb-6">
              Transform Your Digital Presence with 
              <span className="text-primary block sm:inline sm:ml-2">Data-Driven Results</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeInVariants} className="mobile-body-lg text-secondary mb-8 max-w-2xl mx-auto">
              We help businesses in Bengaluru and beyond achieve measurable growth through strategic digital marketing that actually works.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/contact">
                <Button className="mobile-btn-primary shadow-lg hover:shadow-xl w-full sm:w-auto">
                  Get Free Strategy Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button className="mobile-btn-secondary w-full sm:w-auto">
                  <Play className="mr-2 h-5 w-5" />
                  View Success Stories
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeInVariants} className="flex flex-wrap justify-center items-center gap-6 text-secondary mobile-body-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center">
                <Target className="h-4 w-4 text-primary mr-1" />
                <span>150% Avg Growth</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mobile-h2 text-dark-gray mb-6">
                Complete Digital Marketing Solutions
              </h2>
              <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
                From strategy to execution, we deliver results-driven digital marketing that grows your business.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mobile-grid-3 xl:grid-cols-4"
          >
            {[
              { title: 'SEO Optimization', description: 'Dominate search results and drive organic traffic', icon: '🔍', color: 'bg-blue-50 text-blue-600' },
              { title: 'Social Media Marketing', description: 'Build engaged communities across all platforms', icon: '📱', color: 'bg-purple-50 text-purple-600' },
              { title: 'Paid Advertising', description: 'Maximize ROI with targeted ad campaigns', icon: '🎯', color: 'bg-green-50 text-green-600' },
              { title: 'Web Development', description: 'Create high-converting, mobile-first websites', icon: '💻', color: 'bg-orange-50 text-orange-600' },
              { title: 'Content Marketing', description: 'Engage audiences with compelling content', icon: '✍️', color: 'bg-pink-50 text-pink-600' },
              { title: 'Data Analytics', description: 'Make informed decisions with actionable insights', icon: '📊', color: 'bg-indigo-50 text-indigo-600' },
              { title: 'Email Marketing', description: 'Nurture leads with personalized campaigns', icon: '📧', color: 'bg-red-50 text-red-600' },
              { title: 'Conversion Optimization', description: 'Turn more visitors into paying customers', icon: '⚡', color: 'bg-yellow-50 text-yellow-600' }
            ].map((service, index) => (
              <motion.div key={index} variants={scaleInVariants}>
                <Card className="mobile-card group hover:shadow-xl transition-all duration-300 h-full border-0">
                  <CardContent className="mobile-card-padding text-center h-full flex flex-col">
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <h3 className="mobile-h4 text-dark-gray mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="mobile-body text-secondary flex-grow">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="mobile-btn-primary shadow-lg hover:shadow-xl">
                Explore All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mobile-h2 text-dark-gray mb-6">
                Our Proven 4-Step Process
              </h2>
              <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
                A systematic approach that takes your business from invisible to unstoppable.
              </p>
            </motion.div>
          </div>

          <div className="mobile-grid-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Discovery & Strategy',
                description: 'We analyze your business, competitors, and market to create a winning strategy.',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Implementation',
                description: 'Our expert team executes the strategy with precision and attention to detail.',
                icon: '⚡'
              },
              {
                step: '03',
                title: 'Optimization',
                description: 'We continuously monitor, test, and refine for maximum performance.',
                icon: '📈'
              },
              {
                step: '04',
                title: 'Reporting & Growth',
                description: 'You receive detailed insights and recommendations for sustained growth.',
                icon: '📊'
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ delay: index * 0.1 }}
                className="text-center relative group"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="mobile-body-sm font-bold text-primary-foreground">{item.step}</span>
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
                  )}
                </div>
                <h3 className="mobile-h4 text-dark-gray mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="mobile-body text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button className="mobile-btn-primary shadow-lg hover:shadow-xl">
                Start Your Growth Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-background">
        <TrustedBusinessesCarousel 
          className="max-w-[120rem] mx-auto px-6"
          showTitle={true}
          title="Trusted by Businesses in Bengaluru"
          speed={25}
        />
      </section>

      {/* Results Section */}
      <section className="mobile-section bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="mobile-container relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mobile-h2 mb-6">
                Measurable Results We Deliver
              </h2>
              <p className="mobile-body-lg opacity-90 max-w-3xl mx-auto">
                We focus on metrics that matter, translating marketing efforts into real business growth.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mobile-grid-2 lg:grid-cols-4"
          >
            {[
              { number: '500+', label: 'Happy Clients', icon: '😊' },
              { number: '150%', label: 'Average Traffic Increase', icon: '📈' },
              { number: '3X', label: 'Higher Conversion Rates', icon: '🎯' },
              { number: '98%', label: 'Client Retention', icon: '🤝' }
            ].map((stat, index) => (
              <motion.div key={index} variants={scaleInVariants} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl mobile-card-padding group-hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl mb-4">{stat.icon}</div>
                  <div className="mobile-h2 mb-4 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                  <div className="mobile-body opacity-90">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/case-studies">
              <Button className="mobile-btn-secondary border-2 border-background text-background hover:bg-background hover:text-primary shadow-lg hover:shadow-xl">
                View Our Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <h2 className="mobile-h2 text-dark-gray mb-6">
              What Our Clients Say
            </h2>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              Real stories of business growth and success from our valued clients across Bengaluru and beyond.
            </p>
          </div>

          <div className="mobile-grid-1 lg:grid-cols-2 xl:grid-cols-3">
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
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="mobile-card hover:shadow-lg transition-shadow h-full">
                  <CardContent className="mobile-card-padding">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary font-heading mobile-body">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="mobile-h4 text-dark-gray">{testimonial.name}</h3>
                        <p className="mobile-body-sm text-secondary">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="mobile-body text-secondary mb-4 italic">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="bg-primary/5 rounded-lg p-3">
                      <span className="text-primary font-heading mobile-body-sm">
                        Key Result: {testimonial.result}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/case-studies">
              <Button className="mobile-btn-primary shadow-lg hover:shadow-xl">
                Read More Success Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <h2 className="mobile-h2 text-dark-gray mb-6">
              Why Choose Look A Like Solutions?
            </h2>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              We combine creativity with data-driven strategies to deliver exceptional results for businesses in Bengaluru and beyond.
            </p>
          </div>

          <div className="mobile-grid-2 lg:grid-cols-4">
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
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mobile-h4 text-dark-gray mb-4">{item.title}</h3>
                <p className="mobile-body text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="mobile-section bg-dark-gray">
        <div className="mobile-container text-center">
          <h2 className="mobile-h2 text-background mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="mobile-body-lg text-light-gray mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your business achieve its digital marketing goals. Get in touch for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="mobile-btn-primary w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button className="mobile-btn-secondary border-background text-background hover:bg-background hover:text-dark-gray w-full sm:w-auto">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}