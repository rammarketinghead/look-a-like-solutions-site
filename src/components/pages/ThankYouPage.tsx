import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp } from 'lucide-react';

export default function ThankYouPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-20 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="text-center space-y-8">
          {/* Checkmark Icon */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-500" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Thank You!
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-secondary max-w-2xl mx-auto">
              We've received your message and we're genuinely excited to connect with you.
            </p>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-paragraph text-lg text-secondary max-w-xl mx-auto leading-relaxed"
          >
            Our team is already reviewing your inquiry. We'll be in touch within 24 hours with next steps and how we can help transform your digital presence.
          </motion.p>
        </div>
      </motion.section>

      {/* What Happens Next */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: '1',
              title: 'We Review',
              description: 'Our team carefully reviews your inquiry to understand your goals and challenges.',
            },
            {
              number: '2',
              title: 'We Connect',
              description: 'We reach out with personalized insights and a clear roadmap for your success.',
            },
            {
              number: '3',
              title: 'We Deliver',
              description: 'Together, we create measurable results that transform your business.',
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-8 bg-white rounded-lg border border-light-gray hover:border-primary transition-colors"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-heading text-lg">
                {step.number}
              </div>
              <h3 className="font-heading text-xl text-foreground mt-4 mb-3">{step.title}</h3>
              <p className="font-paragraph text-secondary">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why We Do This */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24 bg-white rounded-2xl"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              What Drives Us
            </h2>
            <p className="font-paragraph text-lg text-secondary leading-relaxed">
              We're not just another digital agency. We're passionate about helping businesses like yours unlock their true potential in the digital world. Every strategy we create, every campaign we launch, and every insight we share is rooted in one simple belief: your success is our success.
            </p>
            <p className="font-paragraph text-lg text-secondary leading-relaxed">
              We've spent years perfecting our craft, and we've learned that the best results come from genuine partnerships where we truly understand your vision.
            </p>
          </motion.div>

          {/* Right - Real Impact Story */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-10 rounded-xl border border-blue-200"
          >
            <h3 className="font-heading text-2xl text-foreground mb-4">A Real Example</h3>
            <div className="space-y-4">
              <p className="font-paragraph text-secondary">
                We recently worked with a B2B SaaS company that was struggling to gain visibility in their market. They had a great product, but nobody knew about it.
              </p>
              <p className="font-paragraph text-secondary">
                Through a comprehensive SEO and content strategy, we helped them:
              </p>
              <ul className="space-y-3">
                {[
                  '3x increase in organic traffic within 6 months',
                  '47% improvement in qualified leads',
                  'Ranked #1 for 12+ high-value keywords',
                  'Generated $2.3M in attributed revenue',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-paragraph text-secondary pt-2">
                This is the kind of transformation we create every day. And it could be your story next.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Services Highlight */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            How We Help
          </h2>
          <p className="font-paragraph text-lg text-secondary max-w-2xl mx-auto">
            Whether you need SEO, paid ads, content strategy, or a complete digital overhaul, we have the expertise to deliver results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'SEO & Organic Growth',
              description: 'Dominate search results and attract qualified traffic that converts.',
            },
            {
              icon: TrendingUp,
              title: 'Paid Advertising',
              description: 'Strategic campaigns that maximize ROI across Google, Meta, and beyond.',
            },
            {
              icon: Users,
              title: 'Content & Strategy',
              description: 'Compelling stories that resonate with your audience and drive action.',
            },
            {
              icon: Zap,
              title: 'Web Development',
              description: 'Beautiful, fast, and conversion-optimized websites that work.',
            },
            {
              icon: TrendingUp,
              title: 'Data Analytics',
              description: 'Deep insights into what works so you can make smarter decisions.',
            },
            {
              icon: Users,
              title: 'Email Marketing',
              description: 'Build relationships and nurture leads with targeted email campaigns.',
            },
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-white border border-light-gray rounded-lg hover:shadow-lg transition-shadow"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-lg text-foreground mb-2">{service.title}</h3>
                <p className="font-paragraph text-secondary text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-12 md:p-16 text-center text-white"
        >
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-paragraph text-lg mb-8 max-w-2xl mx-auto opacity-95">
            While we're reviewing your inquiry, explore our services and see how we can help transform your digital presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-light-gray w-full sm:w-auto"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer Message */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.p
          variants={itemVariants}
          className="font-paragraph text-secondary text-sm"
        >
          Questions in the meantime? Feel free to reach out at{' '}
          <a href="mailto:hello@agency.com" className="text-primary hover:underline font-semibold">
            hello@agency.com
          </a>
          {' '}or call us at{' '}
          <a href="tel:+1234567890" className="text-primary hover:underline font-semibold">
            +1 (234) 567-890
          </a>
        </motion.p>
      </motion.section>
    </div>
  );
}
