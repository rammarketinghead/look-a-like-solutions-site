import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Newspaper, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MediaMention {
  id: string;
  publicationName: string;
  articleTitle: string;
  articleUrl: string;
  publishDate: string;
  publicationLogo?: string;
  excerpt?: string;
  verificationStatus?: 'verified' | 'pending' | 'unverified';
}

interface MediaMentionsSectionProps {
  mentions?: MediaMention[];
  title?: string;
  subtitle?: string;
  showVerificationStatus?: boolean;
}

export function MediaMentionsSection({
  mentions = [],
  title = 'Featured In',
  subtitle = 'See what media outlets are saying about us',
  showVerificationStatus = true
}: MediaMentionsSectionProps) {
  if (mentions.length === 0) {
    return (
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mobile-h4 text-dark-gray mb-2">
              Media Coverage Coming Soon
            </h3>
            <p className="mobile-body text-secondary">
              We're collecting verified media mentions. Check back soon!
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <h2 className="mobile-h2 text-dark-gray">{title}</h2>
          </div>
          <p className="mobile-body text-secondary max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Media Mentions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {mentions.map((mention) => (
            <motion.div
              key={mention.id}
              variants={itemVariants}
            >
              <a
                href={mention.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-background hover:translate-y-[-4px]">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Verification Badge */}
                    {showVerificationStatus && (
                      <div className="mb-4">
                        {mention.verificationStatus === 'verified' ? (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            ✓ Verified
                          </span>
                        ) : mention.verificationStatus === 'pending' ? (
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

                    {/* Publication Logo */}
                    {mention.publicationLogo && (
                      <div className="mb-4">
                        <Image
                          src={mention.publicationLogo}
                          alt={mention.publicationName}
                          width={120}
                          className="h-10 w-auto object-contain"
                        />
                      </div>
                    )}

                    {/* Publication Name */}
                    {!mention.publicationLogo && (
                      <p className="mobile-body-sm text-primary font-bold mb-4">
                        {mention.publicationName}
                      </p>
                    )}

                    {/* Article Title */}
                    <h3 className="mobile-h5 text-dark-gray font-bold mb-3 line-clamp-2">
                      {mention.articleTitle}
                    </h3>

                    {/* Excerpt */}
                    {mention.excerpt && (
                      <p className="mobile-body-sm text-secondary mb-4 flex-grow line-clamp-3">
                        {mention.excerpt}
                      </p>
                    )}

                    {/* Publish Date */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <p className="mobile-body-sm text-secondary">
                        {new Date(mention.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <ExternalLink className="h-4 w-4 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'mentions': mentions.map(m => ({
              '@type': 'NewsArticle',
              'headline': m.articleTitle,
              'url': m.articleUrl,
              'datePublished': m.publishDate,
              'publication': {
                '@type': 'Organization',
                'name': m.publicationName
              }
            }))
          })}
        </script>
      </div>
    </section>
  );
}
