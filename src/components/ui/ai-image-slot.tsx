import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AIImageSlotProps {
  src?: string;
  alt: string;
  title?: string;
  description?: string;
  aspectRatio?: 'square' | '4:3' | '16:9' | '1:1';
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  fallback?: ReactNode;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * AIImageSlot Component
 * 
 * Reusable component for displaying AI-generated images with:
 * - Responsive design
 * - Lazy loading support
 * - Proper aspect ratio maintenance
 * - Animation support
 * - Fallback content
 * - SEO-friendly alt text
 * 
 * Usage:
 * <AIImageSlot
 *   src="https://static.wixstatic.com/media/..."
 *   alt="Descriptive alt text for SEO"
 *   aspectRatio="16:9"
 *   loading="lazy"
 *   animate={true}
 * />
 */
export function AIImageSlot({
  src,
  alt,
  title,
  description,
  aspectRatio = '16:9',
  loading = 'lazy',
  width,
  height,
  className = '',
  containerClassName = '',
  animate = false,
  fallback,
  priority = 'medium'
}: AIImageSlotProps) {
  // Aspect ratio CSS classes
  const aspectRatioClasses = {
    'square': 'aspect-square',
    '4:3': 'aspect-video',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square'
  };

  // Default dimensions based on aspect ratio
  const defaultDimensions = {
    'square': { width: 600, height: 600 },
    '4:3': { width: 1200, height: 900 },
    '16:9': { width: 1600, height: 900 },
    '1:1': { width: 600, height: 600 }
  };

  const dims = defaultDimensions[aspectRatio];
  const finalWidth = width || dims.width;
  const finalHeight = height || dims.height;

  // Determine loading strategy based on priority
  const loadingStrategy = priority === 'high' ? 'eager' : loading;

  const imageElement = (
    <div className={`w-full h-full overflow-hidden rounded-lg ${containerClassName}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          loading={loadingStrategy}
          className={`w-full h-full object-cover ${className}`}
        />
      ) : (
        <div className={`w-full h-full bg-light-gray flex items-center justify-center ${className}`}>
          {fallback || (
            <div className="text-center text-secondary">
              <div className="text-sm font-paragraph">Image placeholder</div>
              <div className="text-xs text-secondary/70 mt-1">{alt}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Wrap with animation if enabled
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${aspectRatioClasses[aspectRatio]} w-full`}
      >
        {imageElement}
        {(title || description) && (
          <div className="mt-4">
            {title && <h3 className="font-heading text-lg text-dark-gray mb-2">{title}</h3>}
            {description && <p className="font-paragraph text-sm text-secondary">{description}</p>}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className={`${aspectRatioClasses[aspectRatio]} w-full`}>
      {imageElement}
      {(title || description) && (
        <div className="mt-4">
          {title && <h3 className="font-heading text-lg text-dark-gray mb-2">{title}</h3>}
          {description && <p className="font-paragraph text-sm text-secondary">{description}</p>}
        </div>
      )}
    </div>
  );
}

export default AIImageSlot;
