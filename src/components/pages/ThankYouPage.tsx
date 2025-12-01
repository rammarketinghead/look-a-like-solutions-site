import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp, Sparkles, Heart, Lightbulb, Target, Rocket, Award, Mail, Check } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { NewsletterSubscribers } from '@/entities';

export default function ThankYouPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      await BaseCrudService.create('NewsletterSubscribers', {
        _id: crypto.randomUUID(),
        emailAddress: email.trim(),
        subscriptionDate: new Date(),
        isActive: true,
      });
      setShowSuccessMessage(true);
      setEmail('');
      setTimeout(() => setShowSuccessMessage(false), 4000);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

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
  } as const;

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      {/* Hero Section */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-20 md:py-32 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="text-center space-y-8">
          {/* Checkmark Icon with animation */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl"
              />
              <CheckCircle2 className="w-24 h-24 text-green-500 relative z-10" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thank You!
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-secondary max-w-2xl mx-auto leading-relaxed">
              We've received your message and we're genuinely excited to connect with you.
            </p>
          </motion.div>

          {/* Subtext with warmth */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="font-paragraph text-lg text-secondary max-w-xl mx-auto leading-relaxed">
              Our team is already reviewing your inquiry. We'll be in touch within 24 hours with next steps and how we can help transform your digital presence.
            </p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center justify-center gap-2 text-primary"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-paragraph text-sm font-semibold">We're looking forward to working with you</span>
              <Heart className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* What Happens Next - Enhanced */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            What Happens Next
          </h2>
          <p className="font-paragraph text-lg text-secondary max-w-2xl mx-auto">
            Here's exactly how we'll work together to bring your vision to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: '1',
              title: 'We Review',
              description: 'Our team carefully reviews your inquiry to understand your goals, challenges, and vision.',
              icon: Lightbulb,
              color: 'from-blue-500 to-blue-600',
            },
            {
              number: '2',
              title: 'We Connect',
              description: 'We reach out with personalized insights, strategic recommendations, and a clear roadmap.',
              icon: Target,
              color: 'from-purple-500 to-purple-600',
            },
            {
              number: '3',
              title: 'We Deliver',
              description: 'Together, we create measurable results and transform your digital presence into a growth engine.',
              icon: Rocket,
              color: 'from-green-500 to-green-600',
            },
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                <motion.div
                  animate={hoveredCard === index ? { y: -8 } : { y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-8 bg-white rounded-xl border border-light-gray hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    animate={hoveredCard === index ? { opacity: 0.05 } : { opacity: 0 }}
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-300`}
                  />

                  {/* Step number badge */}
                  <motion.div
                    animate={hoveredCard === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    className={`absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br ${step.color} text-white rounded-full flex items-center justify-center font-heading text-lg shadow-lg`}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    animate={hoveredCard === index ? { scale: 1.1 } : { scale: 1 }}
                    className="mb-4 mt-2"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-heading text-xl text-foreground mb-3 relative z-10">{step.title}</h3>
                  <p className="font-paragraph text-secondary text-sm leading-relaxed relative z-10">{step.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Personal Anecdote Section */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Personal Story */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-purple-500" />
              <span className="font-heading text-sm uppercase tracking-widest text-primary">Our Story</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              Why We're Passionate About Your Success
            </h2>
            <p className="font-paragraph text-lg text-secondary leading-relaxed">
              We didn't start as a big agency with all the answers. We started as a small team frustrated with the lack of genuine partnership in the digital marketing world. We saw businesses struggling to grow because they were getting cookie-cutter solutions instead of personalized strategies.
            </p>
            <p className="font-paragraph text-lg text-secondary leading-relaxed">
              That's why we built our agency differently. We believe in rolling up our sleeves, understanding your business deeply, and creating strategies that actually work. Every client success story fuels us to do better.
            </p>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-primary pt-4"
            >
              <span className="font-paragraph font-semibold">Your success is our mission</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* Right - Testimonial-style card */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              animate={floatingVariants}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-2xl border border-blue-200 shadow-xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-2xl text-foreground">A Real Transformation</h3>
              </div>
              <p className="font-paragraph text-secondary mb-6 leading-relaxed">
                "We were stuck in the middle of the market, invisible to our ideal customers. Within 6 months of working with this team, we went from struggling to get leads to having a pipeline of qualified prospects. They didn't just execute—they educated us every step of the way."
              </p>
              <div className="space-y-3 pt-6 border-t border-blue-200">
                <p className="font-heading text-sm text-foreground">Sarah Chen, CEO</p>
                <p className="font-paragraph text-xs text-secondary">B2B SaaS Company • 3x Revenue Growth</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Subscription Section */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-10 md:p-12 shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">Stay Updated</h2>
            </div>

            <p className="font-paragraph text-lg text-secondary mb-8">
              Get the latest digital marketing insights and tips delivered to your inbox.
            </p>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="rammarketinghead@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-light-gray text-foreground placeholder-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50"
                required
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="px-8 py-3 bg-primary hover:bg-blue-700 text-white font-heading font-semibold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>

            <p className="font-paragraph text-xs text-secondary mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Success Toast Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 left-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 font-heading font-semibold"
          >
            <Check className="w-5 h-5" />
            <span>Thank you for subscribing with us.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ... keep existing code (Key Services Highlight section and beyond) ... */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-primary" />
            <span className="font-heading text-sm uppercase tracking-widest text-primary">Our Expertise</span>
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            How We Help Businesses Thrive
          </h2>
          <p className="font-paragraph text-lg text-secondary max-w-2xl mx-auto">
            Whether you need SEO, paid ads, content strategy, or a complete digital transformation, we have the expertise and passion to deliver results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'SEO & Organic Growth',
              description: 'Dominate search results and attract qualified traffic that converts into customers.',
              color: 'from-yellow-500 to-orange-500',
              stats: '3x avg traffic increase',
            },
            {
              icon: TrendingUp,
              title: 'Paid Advertising',
              description: 'Strategic campaigns that maximize ROI across Google, Meta, LinkedIn, and beyond.',
              color: 'from-blue-500 to-cyan-500',
              stats: '2.5x avg ROAS',
            },
            {
              icon: Users,
              title: 'Content & Strategy',
              description: 'Compelling stories that resonate with your audience and drive meaningful action.',
              color: 'from-purple-500 to-pink-500',
              stats: '5x engagement lift',
            },
            {
              icon: Rocket,
              title: 'Web Development',
              description: 'Beautiful, fast, and conversion-optimized websites that work hard for your business.',
              color: 'from-green-500 to-emerald-500',
              stats: '40% faster load times',
            },
            {
              icon: Target,
              title: 'Data Analytics',
              description: 'Deep insights into what works so you can make smarter, data-driven decisions.',
              color: 'from-indigo-500 to-blue-500',
              stats: '100% data transparency',
            },
            {
              icon: Heart,
              title: 'Email Marketing',
              description: 'Build relationships and nurture leads with targeted, personalized email campaigns.',
              color: 'from-red-500 to-rose-500',
              stats: '35% avg open rate',
            },
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(index + 3)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <motion.div
                  animate={hoveredCard === index + 3 ? { y: -8 } : { y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full p-8 bg-white border border-light-gray rounded-xl hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden"
                >
                  {/* Gradient accent on hover */}
                  <motion.div
                    animate={hoveredCard === index + 3 ? { opacity: 0.08 } : { opacity: 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${service.color}`}
                  />

                  {/* Icon with gradient background */}
                  <motion.div
                    animate={hoveredCard === index + 3 ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-heading text-lg text-foreground mb-3 relative z-10">{service.title}</h3>
                  <p className="font-paragraph text-secondary text-sm leading-relaxed mb-4 relative z-10">{service.description}</p>

                  {/* Stats badge */}
                  <motion.div
                    animate={hoveredCard === index + 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 pt-4 border-t border-light-gray"
                  >
                    <p className="font-heading text-xs text-primary font-semibold">{service.stats}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Explore More Section - Interactive */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            Explore What We Can Do For You
          </h2>
          <p className="font-paragraph text-lg text-secondary max-w-2xl mx-auto">
            While we're reviewing your inquiry, take a look at our services and see how we've helped businesses like yours achieve remarkable growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Our Services',
              description: 'Discover our full range of digital marketing and development services.',
              link: '/services',
              icon: Zap,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              title: 'Case Studies',
              description: 'See real results from real clients and how we transformed their businesses.',
              link: '/case-studies',
              icon: TrendingUp,
              color: 'from-purple-500 to-pink-500',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(10 + index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Link to={item.link} className="block h-full">
                  <motion.div
                    animate={hoveredCard === 10 + index ? { y: -8 } : { y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full p-10 bg-gradient-to-br from-white to-light-gray border border-light-gray rounded-2xl hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden group cursor-pointer"
                  >
                    {/* Gradient background */}
                    <motion.div
                      animate={hoveredCard === 10 + index ? { opacity: 0.1 } : { opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${item.color}`}
                    />

                    {/* Icon */}
                    <motion.div
                      animate={hoveredCard === 10 + index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-heading text-2xl text-foreground mb-3 relative z-10">{item.title}</h3>
                    <p className="font-paragraph text-secondary mb-6 relative z-10">{item.description}</p>

                    {/* CTA */}
                    <motion.div
                      animate={hoveredCard === 10 + index ? { x: 4 } : { x: 0 }}
                      className="flex items-center gap-2 text-primary font-heading font-semibold relative z-10"
                    >
                      <span>Explore Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Footer Message - Enhanced */}
      <motion.section
        className="w-full max-w-[100rem] mx-auto px-6 py-16 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <p className="font-paragraph text-secondary text-base leading-relaxed">
            Have questions while you wait? We're here to help. Reach out anytime—we love talking about digital strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a
              href="mailto:info@lookalikesolutions.com"
              className="flex items-center gap-2 text-primary hover:text-blue-700 font-heading font-semibold transition-colors"
            >
              <span>info@lookalikesolutions.com</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="hidden sm:block w-1 h-6 bg-light-gray" />
            <a
              href="tel:+91-9845214099"
              className="flex items-center gap-2 text-primary hover:text-blue-700 font-heading font-semibold transition-colors"
            >
              <span>+91-9845214099</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-light-gray"
        >
          <p className="font-paragraph text-xs text-secondary uppercase tracking-widest">
            We typically respond within 2 hours during business hours
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
