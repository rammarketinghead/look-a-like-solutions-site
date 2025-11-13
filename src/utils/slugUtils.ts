/**
 * Utility functions for handling blog post slugs
 */

/**
 * Validates if a slug contains a protocol (http://, https://, heep://, etc.)
 */
export function hasProtocol(slug: string | undefined): boolean {
  if (!slug) return false;
  return /^[a-z]+:\/\//i.test(slug);
}

/**
 * Extracts a clean slug from a URL or malformed slug
 */
export function extractSlugFromUrl(urlOrSlug: string): string {
  if (!urlOrSlug) return '';
  
  // If it doesn't contain a protocol, return as-is (after cleaning)
  if (!hasProtocol(urlOrSlug)) {
    return cleanSlug(urlOrSlug);
  }
  
  try {
    // Handle the 'heep://' typo by replacing it with 'http://'
    const correctedUrl = urlOrSlug.startsWith('heep://') 
      ? urlOrSlug.replace('heep://', 'http://') 
      : urlOrSlug;
    
    const url = new URL(correctedUrl);
    let pathname = url.pathname;
    
    // Remove leading slash
    pathname = pathname.replace(/^\//, '');
    
    // If it's a blog path, extract just the slug part
    if (pathname.startsWith('blog/')) {
      pathname = pathname.replace('blog/', '');
    }
    
    return cleanSlug(pathname);
  } catch (error) {
    // If URL parsing fails, try manual extraction
    let extracted = urlOrSlug.replace(/^[a-z]+:\/\/[^\/]+\/?/i, '');
    
    if (extracted.startsWith('blog/')) {
      extracted = extracted.replace('blog/', '');
    }
    
    return cleanSlug(extracted);
  }
}

/**
 * Cleans a slug to ensure it's URL-friendly
 */
export function cleanSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9-]/g, '-')
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-|-$/g, '');
}

/**
 * Validates if a slug is properly formatted
 */
export function isValidSlug(slug: string | undefined): boolean {
  if (!slug) return false;
  
  // Check if it has protocol
  if (hasProtocol(slug)) return false;
  
  // Check if it matches clean slug format
  const cleanedSlug = cleanSlug(slug);
  return slug === cleanedSlug && slug.length > 0;
}

/**
 * Generates a slug from a title
 */
export function generateSlugFromTitle(title: string): string {
  return cleanSlug(title);
}

/**
 * Fixes a malformed slug
 */
export function fixSlug(slug: string | undefined): string {
  if (!slug) return '';
  
  if (hasProtocol(slug)) {
    return extractSlugFromUrl(slug);
  }
  
  return cleanSlug(slug);
}