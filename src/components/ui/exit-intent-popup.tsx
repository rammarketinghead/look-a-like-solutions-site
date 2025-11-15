import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface ExitIntentPopupProps {
  title?: string;
  subtitle?: string;
  offer?: string;
  buttonText?: string;
  onClose?: () => void;
  onSubmit?: (email: string) => void;
}

export function ExitIntentPopup({
  title = "Wait! Don't Leave Yet!",
  subtitle = "Get a FREE Digital Marketing Audit",
  offer = "Discover hidden opportunities to grow your business with our comprehensive digital marketing analysis - absolutely free!",
  buttonText = "Get My Free Audit",
  onClose,
  onSubmit
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canShowPopup, setCanShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('exitIntentShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    // Set a 60-second delay before the popup can be shown
    const delayTimer = setTimeout(() => {
      setCanShowPopup(true);
    }, 60000); // 60 seconds

    let timeoutId: NodeJS.Timeout;
    let isExiting = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page and delay has passed
      if (e.clientY <= 0 && !hasShown && !isExiting && canShowPopup) {
        isExiting = true;
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    const handleScroll = () => {
      // Show popup if user scrolls down 70% of the page, hasn't seen it, and delay has passed
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 70 && !hasShown && !isExiting && canShowPopup) {
        timeoutId = setTimeout(() => {
          if (!hasShown) {
            setIsVisible(true);
            setHasShown(true);
            sessionStorage.setItem('exitIntentShown', 'true');
          }
        }, 2000);
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [hasShown, canShowPopup]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the email to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit?.(email);
      
      // Show success message or redirect
      alert('Thank you! We\'ll send your free audit report soon.');
      handleClose();
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-0 relative overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close popup"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>

              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-6 w-6" />
                  <span className="text-sm font-medium opacity-90">Limited Time Offer</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">{title}</h3>
                <p className="text-lg font-medium opacity-95">{subtitle}</p>
              </div>

              <CardContent className="p-6 pt-4">
                <p className="text-secondary mb-6 font-paragraph leading-relaxed">
                  {offer}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-primary"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {buttonText}
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>No Spam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Instant Access</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-3">
                  By submitting, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}