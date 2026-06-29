import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { NewsletterSubscribers } from '@/entities';
import { Download, Mail, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface LeadMagnetCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  onSubmit?: (email: string) => void;
}

interface LeadMagnetCardsProps {
  variant?: 'grid' | 'carousel';
  onSuccess?: () => void;
}

const magnets = [
  {
    id: 'seo-checklist',
    title: 'SEO Checklist',
    description: 'Complete checklist to optimize your website for search engines',
    icon: '✓',
    benefits: ['On-page optimization', 'Technical SEO', 'Link building strategy', 'Content optimization']
  },
  {
    id: 'ad-audit',
    title: 'Ad Audit Checklist',
    description: 'Identify gaps and opportunities in your paid advertising campaigns',
    icon: '🎯',
    benefits: ['Campaign analysis', 'Budget optimization', 'Audience targeting', 'Ad copy review']
  },
  {
    id: 'conversion-checklist',
    title: 'Website Conversion Checklist',
    description: 'Improve your website conversion rate with our proven framework',
    icon: '📈',
    benefits: ['CTA optimization', 'Form design', 'Trust signals', 'User experience']
  },
  {
    id: 'local-seo',
    title: 'Local SEO Checklist',
    description: 'Dominate local search results in your area',
    icon: '📍',
    benefits: ['Google My Business', 'Local citations', 'Reviews strategy', 'Local keywords']
  }
];

function LeadMagnetCard({ title, description, icon, benefits, onSubmit }: LeadMagnetCardProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const subscriberData: NewsletterSubscribers = {
        _id: crypto.randomUUID(),
        emailAddress: email.trim(),
        subscriptionDate: new Date(),
        isActive: true,
        sourceUrl: window.location.href
      };

      await BaseCrudService.create('NewsletterSubscribers', subscriberData);
      
      setSubmitStatus('success');
      setEmail('');
      onSubmit?.(email);

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting lead magnet:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Icon & Title */}
          <div className="mb-4">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-xl font-heading font-bold text-dark-gray mb-2">{title}</h3>
            <p className="text-sm font-paragraph text-secondary">{description}</p>
          </div>

          {/* Benefits List */}
          <div className="mb-6 flex-1">
            <p className="text-xs font-heading font-semibold text-dark-gray mb-3 uppercase tracking-wide">
              What You'll Get
            </p>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-paragraph text-secondary">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-heading font-bold text-green-600">
                  Check your email!
                </p>
                <p className="text-xs font-paragraph text-gray-500 mt-1">
                  Your checklist is on the way
                </p>
              </motion.div>
            ) : (
              <>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage('');
                    }}
                    className="pl-10 h-10 border-2 border-gray-200 focus:border-primary text-sm"
                    disabled={isSubmitting}
                  />
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded"
                  >
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <p className="text-xs font-paragraph text-red-700">{errorMessage}</p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Get Checklist
                    </>
                  )}
                </Button>

                <p className="text-xs font-paragraph text-gray-500 text-center">
                  100% free. No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function LeadMagnetCards({ variant = 'grid', onSuccess }: LeadMagnetCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={variant === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'flex gap-6 overflow-x-auto pb-4'}
    >
      {magnets.map((magnet) => (
        <div key={magnet.id} className={variant === 'carousel' ? 'flex-shrink-0 w-80' : ''}>
          <LeadMagnetCard
            title={magnet.title}
            description={magnet.description}
            icon={magnet.icon}
            benefits={magnet.benefits}
            onSubmit={onSuccess}
          />
        </div>
      ))}
    </motion.div>
  );
}

// Export individual card component for custom usage
export { LeadMagnetCard };
