import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StickyCTABarProps {
  onCall?: () => void;
  onWhatsApp?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  showOnMobileOnly?: boolean;
}

export function StickyCTABar({
  onCall,
  onWhatsApp,
  onAction,
  actionLabel = 'Get Session',
  showOnMobileOnly = true
}: StickyCTABarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (showOnMobileOnly && !isMobile) return null;

  const handleCall = () => {
    if (onCall) {
      onCall();
    } else {
      window.location.href = 'tel:+919731588244';
    }
  };

  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp();
    } else {
      window.open('https://wa.me/919731588244?text=Hi%20I%20am%20interested%20in%20your%20services', '_blank');
    }
  };

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 md:hidden"
        >
          <div className="flex gap-2 p-3 max-w-full">
            <Button
              onClick={handleCall}
              variant="outline"
              size="sm"
              className="flex-1 h-12 text-xs font-medium"
            >
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              size="sm"
              className="flex-1 h-12 text-xs font-medium"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={handleAction}
              size="sm"
              className="flex-1 h-12 text-xs font-medium bg-primary hover:bg-primary/90"
            >
              <Zap className="h-4 w-4 mr-1" />
              {actionLabel}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
