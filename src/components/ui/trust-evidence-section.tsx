import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Star, Quote, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  clientRole: string;
  testimonial: string;
  rating?: number;
  clientPhoto?: string;
  verificationStatus?: 'verified' | 'pending' | 'unverified';
}

interface TrustEvidenceSectionProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  showVerificationStatus?: boolean;
}

export function TrustEvidenceSection({
  testimonials = [],
  title = 'What Our Clients Say',
  subtitle = 'Real feedback from businesses we\'ve helped grow',
  showVerificationStatus = true
}: TrustEvidenceSectionProps) {
  if (testimonials.length === 0) {
    return (
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mobile-h4 text-dark-gray mb-2">
              Testimonials Coming Soon
            </h3>
            <p className="mobile-body text-secondary">
              We're collecting verified client testimonials. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="mobile-section bg-light-gray">
      <div className="mobile-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mobile-h2 text-dark-gray mb-4">{title}</h2>
          <p className="mobile-body text-secondary max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
            >
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-background">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  {/* Verification Badge */}
                  {showVerificationStatus && (
                    <div className="mb-4">
                      {testimonial.verificationStatus === 'verified' ? (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          ✓ Verified
                        </span>
                      ) : testimonial.verificationStatus === 'pending' ? (
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                          ⏳ Pending
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          ⚠️ Unverified
                        </span>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  {testimonial.rating && (
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  {/* Testimonial Text */}
                  <p className="mobile-body text-secondary mb-6 flex-grow italic">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    {testimonial.clientPhoto && (
                      <Image
                        src={testimonial.clientPhoto}
                        alt={testimonial.clientName}
                        width={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="mobile-body-sm text-dark-gray font-bold">
                        {testimonial.clientName}
                      </p>
                      <p className="mobile-body-sm text-secondary">
                        {testimonial.clientRole}
                      </p>
                      <p className="mobile-body-sm text-secondary">
                        {testimonial.clientCompany}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AggregateRating',
            'ratingValue': testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length,
            'reviewCount': testimonials.length,
            'reviews': testimonials.map(t => ({
              '@type': 'Review',
              'author': {
                '@type': 'Person',
                'name': t.clientName
              },
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': t.rating || 5
              },
              'reviewBody': t.testimonial
            }))
          })}
        </script>
      </div>
    </section>
  );
}
