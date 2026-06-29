import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
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
  icon?: string;
}

export function ServiceHero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  icon
}: ServiceHeroProps) {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-light-gray relative overflow-hidden">
      <div className="mobile-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {icon && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block text-5xl">{icon}</span>
            </motion.div>
          )}

          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-6">
            {subtitle}
          </span>

          <h1 className="mobile-h1 text-dark-gray mb-6">
            {title}
          </h1>

          <p className="mobile-body-lg text-secondary max-w-2xl mx-auto mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {renderButton(primaryCTA, true)}
            {secondaryCTA && renderButton(secondaryCTA, false)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
