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
      <section className="relative h-96 overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/f650f9_a19761649238486fa7792dc7db8ba1c4~mv2.png?originWidth=1600&originHeight=384"
          alt="Digital marketing excellence"
          width={1600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-gray/60 flex items-center justify-center">
          <div className="text-center text-background">
            <h2 className="text-4xl font-heading mb-4">Transform Your Digital Presence</h2>
            <p className="text-xl font-paragraph">Data-driven strategies that deliver real results</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-32 bg-background">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-[120rem] mx-auto px-8"
        >
          <motion.h1
            variants={fadeInVariants}
            className="text-7xl font-heading text-dark-gray mb-8"
          >
            Look A Like Solutions
          </motion.h1>
          <motion.p
            variants={fadeInVariants}
            className="text-xl font-paragraph text-secondary mt-4 mb-12"
          >
            Digital Marketing Agency
          </motion.p>
          <motion.div
            variants={fadeInVariants}
            className="flex gap-6 justify-center"
          >
            <Link to="/services">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Comprehensive Digital Marketing Solutions
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              From SEO to social media, we deliver results-driven strategies that help your business grow in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'SEO Optimization', description: 'Boost your search rankings and organic traffic' },
              { title: 'Social Media Marketing', description: 'Engage your audience across all platforms' },
              { title: 'Paid Advertising', description: 'Maximize ROI with targeted campaigns' },
              { title: 'Web Development', description: 'Build responsive, high-converting websites' },
              { title: 'Influencer Marketing', description: 'Connect with your audience through trusted voices' },
              { title: 'Content Marketing', description: 'Create compelling content that converts' },
              { title: 'Data Analytics', description: 'Make informed decisions with actionable insights' },
              { title: 'Conversion Optimization', description: 'Turn more visitors into customers' }
            ].map((service, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{service.title}</h3>
                  <p className="font-paragraph text-secondary">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/services">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section - Inspired by attached image */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Our Simple 4-Step Process
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              A proven roadmap to take you from unseen to unstoppable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery & Strategy',
                description: 'We listen to your goals and create a tailored strategy.'
              },
              {
                step: '02',
                title: 'Implementation',
                description: 'Our experts execute the plan with precision.'
              },
              {
                step: '03',
                title: 'Optimization',
                description: 'We continuously monitor and refine for better results.'
              },
              {
                step: '04',
                title: 'Reporting',
                description: 'You get clear, actionable insights into your performance.'
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

          <div className="text-center mt-16">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Start Your Project Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Inspired by attached image */}
      <section className="py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading text-dark-gray mb-4">
              Trusted By Businesses in Bangalore
            </h2>
            <p className="font-paragraph text-secondary">
              We're proud to have worked with industry leaders and ambitious startups alike.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[
              'HearFon', 'SAYA', 'UPSTEP', 'MANDANA', 'AUDIOFIN', 'BLUE TRIBE'
            ].map((company, index) => (
              <div key={index} className="text-center">
                <div className="h-12 flex items-center justify-center">
                  <span className="text-lg font-heading text-secondary">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section - Inspired by attached image */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"></div>
        <div className="max-w-[100rem] mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading mb-6">
              Measurable Results We Deliver
            </h2>
            <p className="text-lg font-paragraph opacity-90 max-w-3xl mx-auto">
              We focus on metrics that matter, translating marketing efforts into real business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '150%', label: 'Average Traffic Increase' },
              { number: '3X', label: 'Higher Conversion Rates' },
              { number: '98%', label: 'Client Retention' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-heading mb-4">{stat.number}</div>
                <div className="text-lg font-paragraph opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-primary px-8 py-4">
                View Our Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Real stories of business growth and success from our valued clients across Bengaluru and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <span className="text-primary font-heading text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading text-dark-gray">{testimonial.name}</h3>
                        <p className="text-sm font-paragraph text-secondary">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="font-paragraph text-secondary mb-4 italic">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <span className="text-primary font-heading text-sm">
                        Key Result: {testimonial.result}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/case-studies">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Read More Success Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Why Choose Look A Like Solutions?
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We combine creativity with data-driven strategies to deliver exceptional results for businesses in Bengaluru and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                <p className="font-paragraph text-secondary">{item.description}</p>
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
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Let's discuss how we can help your business achieve its digital marketing goals. Get in touch for a free consultation.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}