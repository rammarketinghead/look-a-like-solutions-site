import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: 'default' | 'dark' | 'light';
  className?: string;
}

export function CTASection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
  className = ''
}: CTASectionProps) {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const bgClass = {
    default: 'bg-gradient-to-br from-primary/5 via-light-gray to-background',
    dark: 'bg-dark-gray text-white',
    light: 'bg-light-gray'
  }[variant];

  const titleClass = variant === 'dark' ? 'text-white' : 'text-dark-gray';

  const renderButton = (cta: typeof primaryCTA, isPrimary: boolean) => {
    const ButtonContent = (
      <>
        {cta.label}
        <ArrowRight className="ml-2 h-5 w-5" />
      </>
    );

    if (cta.href) {
      return (
        <Link to={cta.href}>
          <Button
            className={isPrimary ? 'mobile-btn-primary' : 'mobile-btn-secondary'}
          >
            {ButtonContent}
          </Button>
        </Link>
      );
    }

    return (
      <Button
        onClick={cta.onClick}
        className={isPrimary ? 'mobile-btn-primary' : 'mobile-btn-secondary'}
      >
        {ButtonContent}
      </Button>
    );
  };

  return (
    <section className={`py-16 md:py-24 ${bgClass} ${className}`}>
      <div className="mobile-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {subtitle && (
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
              {subtitle}
            </span>
          )}

          <h2 className={`mobile-h2 ${titleClass} mb-6`}>
            {title}
          </h2>

          {description && (
            <p className={`mobile-body-lg ${variant === 'dark' ? 'text-gray-300' : 'text-secondary'} mb-8`}>
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {renderButton(primaryCTA, true)}
            {secondaryCTA && renderButton(secondaryCTA, false)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
