import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
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
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="h-screen grid place-items-center bg-background">
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