import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 - Page Not Found"
        description="The page you are looking for does not exist. Return to the homepage or explore our services."
        noIndex={true}
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </div>

          <h1 className="text-6xl font-heading font-bold text-foreground mb-2">
            404
          </h1>

          <p className="text-lg text-secondary mb-2">
            Page Not Found
          </p>

          <p className="text-sm text-secondary mb-8">
            We're sorry, but the page you are looking for does not exist. It may have been moved or deleted.
          </p>

          <div className="flex flex-col gap-3">
            <Link to="/">
              <Button className="w-full mobile-btn-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <Link to="/services">
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-foreground hover:bg-light-gray transition-colors">
                Explore Services
              </button>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-secondary mb-4">
              Need help? Contact us:
            </p>
            <div className="space-y-2">
              <a
                href="tel:+919731588244"
                className="block text-sm text-primary hover:underline"
              >
                +91-9731588244
              </a>
              <a
                href="mailto:info@lookalikesolutions.com"
                className="block text-sm text-primary hover:underline"
              >
                info@lookalikesolutions.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
