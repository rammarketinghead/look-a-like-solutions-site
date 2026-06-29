import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      const savedPreferences = localStorage.getItem('cookiePreferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveCookiePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveCookiePreferences(minimalConsent);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    
    // Apply preferences to tracking scripts
    applyTrackingPreferences(prefs);
    
    setIsVisible(false);
    setShowDetails(false);
  };

  const applyTrackingPreferences = (prefs: CookiePreferences) => {
    // Analytics (Google Analytics)
    if (prefs.analytics) {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
      });
    } else {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      gtag('consent', 'update', {
        'analytics_storage': 'denied',
      });
    }

    // Marketing cookies
    if (prefs.marketing) {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      gtag('consent', 'update', {
        'ad_storage': 'granted',
      });
    } else {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      gtag('consent', 'update', {
        'ad_storage': 'denied',
      });
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl max-h-[30vh] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
            {!showDetails ? (
              // Main Banner - Compact Mobile Version
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-xs sm:text-sm font-semibold text-foreground mb-1">
                      Cookie Consent
                    </h3>
                    <p className="font-paragraph text-xs text-secondary leading-tight">
                      We use cookies to enhance your experience and analyze traffic. 
                      <Link to="/privacy" className="text-primary hover:underline font-medium ml-1">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(true)}
                    className="text-xs h-8 sm:h-9 border-gray-300 text-foreground hover:bg-light-gray px-2 sm:px-3"
                    aria-label="Customize cookie preferences"
                  >
                    Customize
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="text-xs h-8 sm:h-9 border-gray-300 text-foreground hover:bg-light-gray px-2 sm:px-3"
                    aria-label="Reject all cookies"
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="text-xs h-8 sm:h-9 bg-primary hover:bg-primary/90 text-white px-2 sm:px-3"
                    aria-label="Accept all cookies"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            ) : (
              // Detailed Preferences - Compact Mobile
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-secondary hover:text-foreground transition-colors flex-shrink-0"
                    aria-label="Close preferences"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="font-paragraph text-xs text-secondary mb-3 leading-tight">
                  Choose which cookies you'd like to allow:
                </p>

                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                  {/* Necessary Cookies */}
                  <div className="flex items-start gap-2 p-2 bg-light-gray rounded border border-gray-200">
                    <input
                      type="checkbox"
                      id="necessary"
                      checked={true}
                      disabled
                      className="mt-0.5 h-3 w-3 text-primary bg-white border-gray-300 rounded cursor-not-allowed flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor="necessary" className="font-heading text-xs font-semibold text-foreground block mb-0.5">
                        Necessary
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Essential for website function.
                      </p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                        Always Active
                      </span>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200 hover:border-primary/30 transition-colors">
                    <input
                      type="checkbox"
                      id="analytics"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="mt-0.5 h-3 w-3 text-primary bg-white border-gray-300 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor="analytics" className="font-heading text-xs font-semibold text-foreground block mb-0.5 cursor-pointer">
                        Analytics
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Help us understand site usage.
                      </p>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200 hover:border-primary/30 transition-colors">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="mt-0.5 h-3 w-3 text-primary bg-white border-gray-300 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor="marketing" className="font-heading text-xs font-semibold text-foreground block mb-0.5 cursor-pointer">
                        Marketing
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Personalized ads and content.
                      </p>
                    </div>
                  </div>

                  {/* Preference Cookies */}
                  <div className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200 hover:border-primary/30 transition-colors">
                    <input
                      type="checkbox"
                      id="preferences"
                      checked={preferences.preferences}
                      onChange={() => togglePreference('preferences')}
                      className="mt-0.5 h-3 w-3 text-primary bg-white border-gray-300 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor="preferences" className="font-heading text-xs font-semibold text-foreground block mb-0.5 cursor-pointer">
                        Preferences
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Remember your choices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="text-xs h-8 border-gray-300 text-foreground hover:bg-light-gray px-2"
                    aria-label="Back to main banner"
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="text-xs h-8 border-gray-300 text-foreground hover:bg-light-gray px-2"
                    aria-label="Reject all cookies"
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="text-xs h-8 bg-primary hover:bg-primary/90 text-white px-2"
                    aria-label="Save cookie preferences"
                  >
                    Save
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
