import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Award, Trophy, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  logo?: string;
  verificationUrl?: string;
  expiryDate?: string;
  verificationStatus?: 'verified' | 'pending' | 'unverified';
}

interface AwardItem {
  id: string;
  name: string;
  issuer: string;
  year: number;
  logo?: string;
  description?: string;
  verificationStatus?: 'verified' | 'pending' | 'unverified';
}

interface CertificationAwardsSectionProps {
  certifications?: Certification[];
  awards?: AwardItem[];
  showVerificationStatus?: boolean;
}

export function CertificationAwardsSection({
  certifications = [],
  awards = [],
  showVerificationStatus = true
}: CertificationAwardsSectionProps) {
  if (certifications.length === 0 && awards.length === 0) {
    return (
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mobile-h4 text-dark-gray mb-2">
              Certifications & Awards
            </h3>
            <p className="mobile-body text-secondary">
              Verified certifications and awards coming soon. Check back later!
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

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <section className="mobile-section bg-background">
      <div className="mobile-container">
        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="mobile-h2 text-dark-gray">Certifications</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                >
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-light-gray">
                    <CardContent className="p-6 md:p-8 flex flex-col h-full">
                      {/* Verification Badge */}
                      {showVerificationStatus && (
                        <div className="mb-4">
                          {cert.verificationStatus === 'verified' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          ) : cert.verificationStatus === 'pending' ? (
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

                      {/* Logo */}
                      {cert.logo && (
                        <div className="mb-4">
                          <Image
                            src={cert.logo}
                            alt={cert.name}
                            width={100}
                            className="h-16 w-auto object-contain"
                          />
                        </div>
                      )}

                      {/* Certification Name */}
                      <h3 className="mobile-h5 text-dark-gray font-bold mb-2">
                        {cert.name}
                      </h3>

                      {/* Issuer */}
                      <p className="mobile-body-sm text-secondary mb-4">
                        Issued by: <span className="font-medium">{cert.issuer}</span>
                      </p>

                      {/* Expiry Date */}
                      {cert.expiryDate && (
                        <p className={`mobile-body-sm mb-4 ${
                          isExpired(cert.expiryDate)
                            ? 'text-red-600'
                            : 'text-secondary'
                        }`}>
                          Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                          {isExpired(cert.expiryDate) && (
                            <span className="ml-2 font-bold">EXPIRED</span>
                          )}
                        </p>
                      )}

                      {/* Verification Link */}
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mobile-body-sm transition-colors mt-auto pt-4 border-t border-gray-200"
                        >
                          Verify
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="h-8 w-8 text-primary" />
              <h2 className="mobile-h2 text-dark-gray">Awards & Recognition</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {awards.map((award) => (
                <motion.div
                  key={award.id}
                  variants={itemVariants}
                >
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-light-gray">
                    <CardContent className="p-6 md:p-8 flex flex-col h-full">
                      {/* Verification Badge */}
                      {showVerificationStatus && (
                        <div className="mb-4">
                          {award.verificationStatus === 'verified' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          ) : award.verificationStatus === 'pending' ? (
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

                      {/* Logo */}
                      {award.logo && (
                        <div className="mb-4">
                          <Image
                            src={award.logo}
                            alt={award.name}
                            width={100}
                            className="h-16 w-auto object-contain"
                          />
                        </div>
                      )}

                      {/* Award Icon */}
                      {!award.logo && (
                        <Trophy className="h-12 w-12 text-primary/20 mb-4" />
                      )}

                      {/* Award Name */}
                      <h3 className="mobile-h5 text-dark-gray font-bold mb-2">
                        {award.name}
                      </h3>

                      {/* Year */}
                      <p className="mobile-body-sm text-primary font-medium mb-2">
                        {award.year}
                      </p>

                      {/* Issuer */}
                      <p className="mobile-body-sm text-secondary mb-4">
                        {award.issuer}
                      </p>

                      {/* Description */}
                      {award.description && (
                        <p className="mobile-body-sm text-secondary flex-grow">
                          {award.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'award': awards.map(a => ({
              '@type': 'Award',
              'name': a.name,
              'awardedBy': a.issuer,
              'dateAwarded': `${a.year}`
            }))
          })}
        </script>
      </div>
    </section>
  );
}
