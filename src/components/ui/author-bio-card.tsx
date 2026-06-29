import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Mail, Globe } from 'lucide-react';

interface AuthorBioCardProps {
  author: {
    id: string;
    name: string;
    role: string;
    bio: string;
    photo?: string;
    expertise?: string[];
    credentials?: string[];
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      email?: string;
      website?: string;
    };
  };
  showFullBio?: boolean;
  variant?: 'compact' | 'expanded';
}

export function AuthorBioCard({ 
  author, 
  showFullBio = false,
  variant = 'compact'
}: AuthorBioCardProps) {
  const bioText = showFullBio ? author.bio : author.bio?.substring(0, 150) + (author.bio?.length > 150 ? '...' : '');

  return (
    <Card className="border-0 shadow-sm bg-light-gray">
      <CardContent className={`p-6 md:p-8 ${variant === 'expanded' ? '' : ''}`}>
        <div className={variant === 'expanded' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'flex gap-6'}>
          {/* Author Photo */}
          {author.photo && (
            <div className={variant === 'expanded' ? 'md:col-span-1' : 'flex-shrink-0'}>
              <Image
                src={author.photo}
                alt={author.name}
                width={variant === 'expanded' ? 200 : 80}
                className={`rounded-lg object-cover ${
                  variant === 'expanded' 
                    ? 'w-full h-auto' 
                    : 'w-20 h-20'
                }`}
              />
            </div>
          )}

          {/* Author Info */}
          <div className={variant === 'expanded' ? 'md:col-span-2' : 'flex-1'}>
            <div className="mb-3">
              <h4 className="mobile-h4 text-dark-gray font-bold mb-1">
                {author.name}
              </h4>
              <p className="text-primary mobile-body-sm font-medium">
                {author.role}
              </p>
            </div>

            {/* Credentials */}
            {author.credentials && author.credentials.length > 0 && (
              <div className="mb-3">
                <p className="mobile-body-sm text-secondary font-medium mb-1">
                  Credentials:
                </p>
                <div className="flex flex-wrap gap-2">
                  {author.credentials.map((credential, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Expertise */}
            {author.expertise && author.expertise.length > 0 && (
              <div className="mb-3">
                <p className="mobile-body-sm text-secondary font-medium mb-1">
                  Expertise:
                </p>
                <p className="mobile-body-sm text-secondary">
                  {author.expertise.join(', ')}
                </p>
              </div>
            )}

            {/* Bio */}
            {author.bio && (
              <p className="mobile-body-sm text-secondary mb-4 line-clamp-3">
                {bioText}
              </p>
            )}

            {/* Social Links */}
            {author.socialLinks && (
              <div className="flex items-center gap-3">
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-primary" />
                  </a>
                )}
                {author.socialLinks.email && (
                  <a
                    href={`mailto:${author.socialLinks.email}`}
                    className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                  </a>
                )}
                {author.socialLinks.website && (
                  <a
                    href={author.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="h-4 w-4 text-primary" />
                  </a>
                )}
              </div>
            )}

            {/* View Profile Link */}
            {variant === 'expanded' && (
              <Link
                to={`/author/${author.id}`}
                className="inline-block mt-4 text-primary hover:text-primary/80 font-medium mobile-body-sm transition-colors"
              >
                View Full Profile →
              </Link>
            )}
          </div>
        </div>

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': author.name,
            'jobTitle': author.role,
            'description': author.bio,
            ...(author.photo && { 'image': author.photo }),
            ...(author.socialLinks?.linkedin && { 'sameAs': [author.socialLinks.linkedin] }),
            ...(author.expertise && { 'knowsAbout': author.expertise })
          })}
        </script>
      </CardContent>
    </Card>
  );
}
