import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Mail, Globe, Award, Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface FounderProfileProps {
  founder: {
    name: string;
    title: string;
    bio: string;
    photo: string;
    credentials?: string[];
    yearsOfExperience?: number;
    expertise?: string[];
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      email?: string;
      website?: string;
    };
    verificationStatus?: 'verified' | 'pending' | 'unverified';
  };
  showVerificationBadge?: boolean;
}

export function FounderProfileTemplate({ 
  founder,
  showVerificationBadge = true
}: FounderProfileProps) {
  const isVerified = founder.verificationStatus === 'verified';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-lg bg-background overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Founder Photo */}
            <div className="md:col-span-1 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-8 md:p-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform scale-105"></div>
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  width={300}
                  className="w-full h-auto rounded-2xl object-cover relative z-10 ring-4 ring-white"
                />
                {showVerificationBadge && isVerified && (
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white rounded-full p-2 ring-4 ring-white">
                    <Award className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>

            {/* Founder Info */}
            <div className="md:col-span-2 p-8 md:p-12">
              {/* Verification Badge */}
              {showVerificationBadge && (
                <div className="mb-4">
                  {isVerified ? (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      ✓ Verified Founder
                    </span>
                  ) : founder.verificationStatus === 'pending' ? (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      ⏳ Verification Pending
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      ⚠️ Verification Required
                    </span>
                  )}
                </div>
              )}

              {/* Name and Title */}
              <div className="mb-6">
                <h2 className="mobile-h2 text-dark-gray font-bold mb-2">
                  {founder.name}
                </h2>
                <p className="text-primary mobile-h4 font-medium">
                  {founder.title}
                </p>
              </div>

              {/* Experience and Credentials */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                {founder.yearsOfExperience && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="mobile-body-sm text-secondary font-medium">Experience</p>
                      <p className="mobile-body text-dark-gray font-bold">
                        {founder.yearsOfExperience}+ Years
                      </p>
                    </div>
                  </div>
                )}
                {founder.credentials && founder.credentials.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="mobile-body-sm text-secondary font-medium">Credentials</p>
                      <p className="mobile-body text-dark-gray font-bold">
                        {founder.credentials.length} Verified
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="mobile-h5 text-dark-gray font-bold mb-3">About</h3>
                <p className="mobile-body text-secondary leading-relaxed">
                  {founder.bio}
                </p>
              </div>

              {/* Expertise */}
              {founder.expertise && founder.expertise.length > 0 && (
                <div className="mb-6">
                  <h3 className="mobile-h5 text-dark-gray font-bold mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {founder.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Credentials List */}
              {founder.credentials && founder.credentials.length > 0 && (
                <div className="mb-6">
                  <h3 className="mobile-h5 text-dark-gray font-bold mb-3">Certifications</h3>
                  <ul className="space-y-2">
                    {founder.credentials.map((credential, index) => (
                      <li key={index} className="flex items-center gap-2 mobile-body text-secondary">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {credential}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Links */}
              {founder.socialLinks && (
                <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                  {founder.socialLinks.linkedin && (
                    <a
                      href={founder.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                    </a>
                  )}
                  {founder.socialLinks.twitter && (
                    <a
                      href={founder.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5 text-primary" />
                    </a>
                  )}
                  {founder.socialLinks.email && (
                    <a
                      href={`mailto:${founder.socialLinks.email}`}
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                    </a>
                  )}
                  {founder.socialLinks.website && (
                    <a
                      href={founder.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label="Website"
                    >
                      <Globe className="h-5 w-5 text-primary" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          'name': founder.name,
          'jobTitle': founder.title,
          'description': founder.bio,
          'image': founder.photo,
          ...(founder.socialLinks?.linkedin && { 'sameAs': [founder.socialLinks.linkedin] }),
          ...(founder.expertise && { 'knowsAbout': founder.expertise }),
          ...(founder.yearsOfExperience && { 'yearsOfExperience': founder.yearsOfExperience })
        })}
      </script>
    </motion.div>
  );
}
