import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, ExternalLink } from 'lucide-react';

// CONFIGURE THIS WITH YOUR CALENDLY URL
const CALENDLY_URL = 'https://calendly.com/your-username/meeting';

interface CalendlyBookingProps {
  title?: string;
  subtitle?: string;
  showFallback?: boolean;
  onBookingClick?: () => void;
}

export function CalendlyBooking({
  title = 'Schedule Your Strategy Session',
  subtitle = 'Book a free 30-minute consultation with our team',
  showFallback = true,
  onBookingClick
}: CalendlyBookingProps) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if Calendly URL is configured (not the default placeholder)
    const isConfiguredUrl = CALENDLY_URL !== 'https://calendly.com/your-username/meeting';
    setIsConfigured(isConfiguredUrl);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBookingClick = () => {
    onBookingClick?.();
    if (isConfigured) {
      window.open(CALENDLY_URL, '_blank');
    }
  };

  // If not configured and fallback is disabled, don't render
  if (!isConfigured && !showFallback) {
    return null;
  }

  // If not configured, show configuration notice
  if (!isConfigured) {
    return (
      <Card className="w-full border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-heading font-bold text-yellow-900 mb-2">
                Calendly Integration Not Configured
              </h3>
              <p className="font-paragraph text-yellow-800 text-sm mb-3">
                To enable booking functionality, update the <code className="bg-yellow-100 px-2 py-1 rounded text-xs">CALENDLY_URL</code> constant in <code className="bg-yellow-100 px-2 py-1 rounded text-xs">/src/components/ui/calendly-booking.tsx</code> with your Calendly URL.
              </p>
              <p className="font-paragraph text-yellow-700 text-xs">
                Example: <code className="bg-yellow-100 px-2 py-1 rounded">https://calendly.com/your-username/meeting</code>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Configured - show booking widget
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="w-full border-0 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium opacity-90">Schedule a Meeting</span>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-1">{title}</h3>
            <p className="text-lg opacity-95">{subtitle}</p>
          </div>

          {/* Calendly Embed or Fallback */}
          <div className="p-6">
            {isMobile ? (
              // Mobile: Show button instead of embed
              <div className="text-center space-y-4">
                <p className="font-paragraph text-secondary">
                  Click the button below to open our booking calendar
                </p>
                <Button
                  onClick={handleBookingClick}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Open Booking Calendar
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-xs font-paragraph text-gray-500">
                  You'll be redirected to our booking page in a new window
                </p>
              </div>
            ) : (
              // Desktop: Show embedded iframe
              <div className="space-y-4">
                <iframe
                  src={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_block=1`}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule a meeting with us"
                  className="rounded-lg"
                />
                <p className="text-xs font-paragraph text-gray-500 text-center">
                  Select a time that works best for you. All times are in your local timezone.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-light-gray px-6 py-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm font-heading font-bold text-primary mb-1">30 Minutes</div>
                <p className="text-xs font-paragraph text-secondary">Session Duration</p>
              </div>
              <div className="text-center">
                <div className="text-sm font-heading font-bold text-primary mb-1">100% Free</div>
                <p className="text-xs font-paragraph text-secondary">No Credit Card Required</p>
              </div>
              <div className="text-center">
                <div className="text-sm font-heading font-bold text-primary mb-1">Expert Team</div>
                <p className="text-xs font-paragraph text-secondary">Personalized Consultation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
