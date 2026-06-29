/**
 * SEO Configuration and Utilities
 * Centralized SEO settings and helper functions
 */

export const SEO_CONFIG = {
  // Site Information
  siteName: 'Look A Like Solutions',
  siteUrl: 'https://www.lookalikesolutions.com',
  siteDescription: 'Leading digital marketing agency in Bengaluru offering SEO, social media marketing, paid ads, web development, and comprehensive digital solutions.',
  
  // Contact Information
  contact: {
    phone: '+91-9731588244',
    email: 'info@lookalikesolutions.com',
    address: 'Bengaluru, Karnataka, India',
  },

  // Social Media
  social: {
    facebook: 'https://www.facebook.com/lookalikesolutions',
    instagram: 'https://www.instagram.com/lookalikesolutions/',
    youtube: 'https://www.youtube.com/@thelookalikesolutions',
    linkedin: 'https://www.linkedin.com/company/lookalikesolutions/',
    twitter: 'https://twitter.com/lookalikesol',
  },

  // Logo
  logo: 'https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png',

  // Default OG Image
  defaultOGImage: 'https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png',

  // Geo Information
  geo: {
    latitude: 12.9716,
    longitude: 77.5946,
    locality: 'Bengaluru',
    region: 'Karnataka',
    country: 'IN',
  },

  // Business Hours
  businessHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
}

/**
 * Generate full URL for social sharing
 */
export function getShareUrl(pathname: string): string {
  return getCanonicalUrl(pathname);
}

/**
 * Validate and sanitize meta description
 * Google typically displays 150-160 characters on desktop
 */
export function sanitizeDescription(description: string, maxLength: number = 160): string {
  if (!description) return '';
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.substring(0, maxLength - 3) + '...';
}

/**
 * Validate and sanitize meta title
 * Google typically displays 50-60 characters
 */
export function sanitizeTitle(title: string, maxLength: number = 60): string {
  if (!title) return '';
  const trimmed = title.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.substring(0, maxLength - 3) + '...';
}

/**
 * Generate keywords string from array
 */
export function generateKeywords(keywords: string[]): string {
  return keywords.filter(k => k && k.trim()).join(', ');
}

/**
 * Check if URL is valid and should be indexed
 */
export function shouldIndexUrl(pathname: string): boolean {
  // Don't index admin pages, thank you pages, etc.
  const noIndexPaths = [
    '/admin',
    '/thank-you',
    '/search',
    '/404',
  ];

  return !noIndexPaths.some(path => pathname.startsWith(path));
}

/**
 * Get robots meta content
 */
export function getRobotsContent(pathname: string): string {
  if (!shouldIndexUrl(pathname)) {
    return 'noindex, nofollow';
  }
  return 'index, follow';
}
