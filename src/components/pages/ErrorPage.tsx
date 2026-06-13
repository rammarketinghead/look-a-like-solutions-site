import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Oops!
        </h1>
        
        <p className="text-lg text-secondary mb-2">
          Something went wrong
        </p>
        
        <p className="text-sm text-secondary mb-8">
          We're sorry, but something didn't load correctly on our end. Please try again or return to the home page.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button className="w-full mobile-btn-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-foreground hover:bg-light-gray transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
