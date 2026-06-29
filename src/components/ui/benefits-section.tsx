import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Benefit {
  title: string;
  description?: string;
}

interface BenefitsSectionProps {
  title: string;
  subtitle?: string;
  benefits: Benefit[];
  className?: string;
}

export function BenefitsSection({
  title,
  subtitle,
  benefits,
  className = ''
}: BenefitsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="mobile-container">
        <div className="text-center mb-12">
          {subtitle && (
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
              {subtitle}
            </span>
          )}
          <h2 className="mobile-h2 text-dark-gray">
            {title}
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="mobile-h4 text-dark-gray mb-2">
                  {benefit.title}
                </h3>
                {benefit.description && (
                  <p className="mobile-body text-secondary">
                    {benefit.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
