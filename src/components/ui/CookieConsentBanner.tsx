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
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {!showDetails ? (
              // Main Banner
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-1">
                      Cookie Consent
                    </h3>
                    <p className="font-paragraph text-xs sm:text-sm text-secondary leading-relaxed">
                      We use cookies to enhance your experience, analyze site traffic, and serve personalized content. 
                      By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or 
                      learn more by reading our{' '}
                      <Link to="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(true)}
                    className="text-xs sm:text-sm h-9 sm:h-10 border-gray-300 text-foreground hover:bg-light-gray"
                  >
                    Customize
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="text-xs sm:text-sm h-9 sm:h-10 border-gray-300 text-foreground hover:bg-light-gray"
                  >
                    Reject All
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="text-xs sm:text-sm h-9 sm:h-10 bg-primary hover:bg-primary/90 text-white"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            ) : (
              // Detailed Preferences
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-secondary hover:text-foreground transition-colors"
                    aria-label="Close preferences"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="font-paragraph text-sm text-secondary mb-6 leading-relaxed">
                  We use different types of cookies to improve your browsing experience. Choose which cookies you'd like to allow:
                </p>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="flex items-start gap-3 p-3 bg-light-gray rounded-lg border border-gray-200">
                    <input
                      type="checkbox"
                      id="necessary"
                      checked={true}
                      disabled
                      className="mt-1 h-4 w-4 text-primary bg-white border-gray-300 rounded cursor-not-allowed"
                    />
                    <div className="flex-1">
                      <label htmlFor="necessary" className="font-heading text-sm font-semibold text-foreground block mb-1">
                        Necessary Cookies
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Essential for the website to function properly. These cookies enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as they are required for the site to work.
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        Always Active
                      </span>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                    <input
                      type="checkbox"
                      id="analytics"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="mt-1 h-4 w-4 text-primary bg-white border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <label htmlFor="analytics" className="font-heading text-sm font-semibold text-foreground block mb-1 cursor-pointer">
                        Analytics Cookies
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Help us understand how visitors use our website. We use Google Analytics to collect anonymous data about page views, user interactions, and traffic sources. This helps us improve our content and user experience.
                      </p>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="mt-1 h-4 w-4 text-primary bg-white border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <label htmlFor="marketing" className="font-heading text-sm font-semibold text-foreground block mb-1 cursor-pointer">
                        Marketing Cookies
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Used to track visitors across websites and display personalized advertisements. These cookies help us show you relevant content and offers based on your interests and browsing behavior.
                      </p>
                    </div>
                  </div>

                  {/* Preference Cookies */}
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                    <input
                      type="checkbox"
                      id="preferences"
                      checked={preferences.preferences}
                      onChange={() => togglePreference('preferences')}
                      className="mt-1 h-4 w-4 text-primary bg-white border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <label htmlFor="preferences" className="font-heading text-sm font-semibold text-foreground block mb-1 cursor-pointer">
                        Preference Cookies
                      </label>
                      <p className="font-paragraph text-xs text-secondary">
                        Remember your preferences and choices to provide a personalized experience. These cookies store information about your language preferences, theme selection, and other customizations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="text-sm h-10 border-gray-300 text-foreground hover:bg-light-gray"
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="text-sm h-10 border-gray-300 text-foreground hover:bg-light-gray"
                  >
                    Reject All
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="text-sm h-10 bg-primary hover:bg-primary/90 text-white"
                  >
                    Save Preferences
                  </Button>
                </div>

                <p className="font-paragraph text-xs text-secondary mt-4 text-center">
                  You can change your cookie preferences at any time by visiting our{' '}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
