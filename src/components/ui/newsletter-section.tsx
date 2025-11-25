import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Mail, Check } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  return (
    <>
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 md:p-12 shadow-lg">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-3xl md:text-4xl text-dark-gray">Stay Updated</h2>
              </div>

              <p className="font-paragraph text-lg text-secondary mb-8">
                Get the latest digital marketing insights and tips delivered to your inbox.
              </p>

              {/* Form */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-light-gray text-dark-gray placeholder-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50"
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
        </div>
      </section>

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
    </>
  );
}
