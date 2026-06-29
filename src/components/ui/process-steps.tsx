import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ProcessSteps({
  steps,
  title,
  subtitle,
  className = ''
}: ProcessStepsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="mobile-container">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="mobile-h2 text-dark-gray">
                {title}
              </h2>
            )}
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-8 md:space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative"
            >
              <div className="flex gap-6 md:gap-8">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="mobile-h4 text-dark-gray font-semibold">
                      {step.title}
                    </h3>
                    {step.duration && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="mobile-body text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 h-8 w-0.5 bg-gradient-to-b from-primary to-primary/20 md:h-12"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
