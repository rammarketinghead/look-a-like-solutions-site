import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { TrustedBusinesses } from '@/entities';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

interface TrustedBusinessesCarouselProps {
  className?: string;
  showTitle?: boolean;
  title?: string;
  speed?: number; // Animation duration in seconds for one complete cycle
}

export function TrustedBusinessesCarousel({ 
  className = '', 
  showTitle = true,
  title = "Trusted by Businesses in Bengaluru",
  speed = 30
}: TrustedBusinessesCarouselProps) {
  const [businesses, setBusinesses] = useState<TrustedBusinesses[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { items } = await BaseCrudService.getAll<TrustedBusinesses>('trustedbusinesses');
        // Sort by display order
        const sortedBusinesses = items
          .filter(business => business.brandLogo && business.brandName)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setBusinesses(sortedBusinesses);
      } catch (error) {
        console.error('Error fetching trusted businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return (
      <div className={`py-12 ${className}`}>
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading text-dark-gray mb-4">
              {title}
            </h2>
          </div>
        )}
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-32 h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className={`py-12 ${className}`}>
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading text-dark-gray mb-4">
              {title}
            </h2>
          </div>
        )}
        <div className="text-center text-secondary">
          <p>No trusted businesses to display yet.</p>
        </div>
      </div>
    );
  }

  // Triple the array for truly seamless infinite scroll
  const tripleBusinesses = [...businesses, ...businesses, ...businesses];

  return (
    <div className={`py-12 overflow-hidden ${className}`}>
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading text-dark-gray mb-4">
            {title}
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            We're proud to partner with leading businesses across Bengaluru, helping them achieve their digital marketing goals.
          </p>
        </div>
      )}
      
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8 lg:gap-12 items-center"
            animate={{
              x: [0, -(businesses.length * (120 + 32))] // 120px logo width + 32px gap (8*4)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: speed,
                ease: "linear",
              },
            }}
            style={{
              minWidth: 'max-content'
            }}
          >
            {tripleBusinesses.map((business, index) => (
              <div
                key={`${business._id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-[120px] h-16 md:h-20"
              >
                {business.websiteUrl ? (
                  <a
                    href={business.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-all duration-300 hover:scale-110 hover:opacity-80 w-full h-full flex items-center justify-center"
                    title={business.brandName}
                  >
                    <Image
                      src={business.brandLogo || ''}
                      alt={`${business.brandName} logo`}
                      width={120}
                      className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                ) : (
                  <div className="transition-all duration-300 hover:scale-110 w-full h-full flex items-center justify-center">
                    <Image
                      src={business.brandLogo || ''}
                      alt={`${business.brandName} logo`}
                      width={120}
                      className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Enhanced gradient overlays for smooth fade effect */}
        <div className="absolute top-0 left-0 w-16 md:w-24 h-full bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-16 md:w-24 h-full bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>
      </div>
      
      {/* Optional business count indicator */}
      <div className="text-center mt-6">
        <p className="text-sm text-secondary">
          Trusted by {businesses.length}+ businesses in Bengaluru
        </p>
      </div>
    </div>
  );
}

export default TrustedBusinessesCarousel;