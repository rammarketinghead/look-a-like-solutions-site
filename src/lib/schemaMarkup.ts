/**
 * Schema Markup Helpers for Enhanced SEO
 * Provides reusable schema markup generators for different page types
 * Phase 7: AI Search Optimization - Comprehensive Schema Implementation
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PersonSchema {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
}

export interface ReviewItem {
  reviewRating: number;
  reviewBody: string;
  author: string;
  datePublished?: string;
}

/**
 * Generate BreadcrumbList schema markup
 * Used on all route pages for navigation context
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.lookalikesolutions.com${item.url}`
    }))
  };
}

/**
 * Generate FAQPage schema markup
 * Reusable for homepage, service pages, blog posts, contact page
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Person schema markup for authors and team members
 * Only for verified, visible team members - no fake credentials
 */
export function generatePersonSchema(person: PersonSchema) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name
  };

  if (person.jobTitle) schema.jobTitle = person.jobTitle;
  if (person.description) schema.description = person.description;
  if (person.image) schema.image = person.image;
  if (person.url) schema.url = person.url;
  if (person.sameAs && person.sameAs.length > 0) schema.sameAs = person.sameAs;

  return schema;
}

/**
 * Generate generic editorial author framework
 * Used when specific author is not verified
 */
export function generateEditorialAuthorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Look A Like Solutions Editorial Team",
    "jobTitle": "Digital Marketing Specialists",
    "description": "The editorial team at Look A Like Solutions creates data-driven content on digital marketing, SEO, paid advertising, and web development.",
    "url": "https://www.lookalikesolutions.com",
    "worksFor": {
      "@type": "Organization",
      "name": "Look A Like Solutions",
      "url": "https://www.lookalikesolutions.com"
    }
  };
}

/**
 * Generate Service schema markup
 * Used for individual service pages (SEO, Social Media, Paid Ads, etc.)
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  areaServed: string = "Bengaluru, India",
  priceRange: string = "$"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Look A Like Solutions",
      "url": "https://www.lookalikesolutions.com",
      "logo": "https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
    },
    "areaServed": {
      "@type": "Place",
      "name": areaServed
    },
    "serviceType": serviceName,
    "priceRange": priceRange,
    "telephone": "+91-9731588244",
    "email": "info@lookalikesolutions.com"
  };
}

/**
 * Generate LocalBusiness schema markup
 * Used on contact page and location-specific pages
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Look A Like Solutions",
    "image": "https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png",
    "url": "https://www.lookalikesolutions.com",
    "telephone": "+91-9731588244",
    "email": "info@lookalikesolutions.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$",
    "sameAs": [
      "https://www.facebook.com/lookalikesolutions",
      "https://www.instagram.com/lookalikesolutions/",
      "https://www.linkedin.com/company/lookalikesolutions/",
      "https://www.youtube.com/@thelookalikesolutions"
    ]
  };
}

/**
 * Generate WebApplication schema markup for tools
 * Used on tool pages (keyword research, SERP preview, etc.)
 */
export function generateWebApplicationSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": `https://www.lookalikesolutions.com${url}`,
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Look A Like Solutions",
      "url": "https://www.lookalikesolutions.com",
      "logo": "https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
    }
  };
}

/**
 * Generate BlogPosting schema markup
 * Used on blog post pages with Article/BlogPosting type
 */
export function generateBlogPostingSchema(
  title: string,
  description: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  authorName: string = "Look A Like Solutions",
  url: string = ""
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Look A Like Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.lookalikesolutions.com${url}`
    },
    "url": `https://www.lookalikesolutions.com${url}`
  };
}

/**
 * Generate Article schema markup
 * Used for general article/content pages
 */
export function generateArticleSchema(
  title: string,
  description: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  url: string = ""
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": generateEditorialAuthorSchema(),
    "publisher": {
      "@type": "Organization",
      "name": "Look A Like Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.lookalikesolutions.com${url}`
    },
    "url": `https://www.lookalikesolutions.com${url}`
  };
}

/**
 * Generate Organization schema markup
 * Comprehensive schema with all verified facts
 * Used on homepage and throughout site
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Look A Like Solutions",
    "url": "https://www.lookalikesolutions.com",
    "logo": "https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png",
    "description": "Leading digital marketing agency in Bengaluru offering SEO, social media marketing, paid ads, web development, and comprehensive digital solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9731588244",
      "contactType": "Customer Service",
      "email": "info@lookalikesolutions.com",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/lookalikesolutions",
      "https://www.instagram.com/lookalikesolutions/",
      "https://www.linkedin.com/company/lookalikesolutions/",
      "https://www.youtube.com/@thelookalikesolutions"
    ],
    "knowsAbout": [
      "Digital Marketing",
      "Search Engine Optimization",
      "Social Media Marketing",
      "Paid Advertising",
      "Web Development",
      "Content Marketing",
      "Data Analytics",
      "Conversion Rate Optimization",
      "Email Marketing",
      "YouTube Marketing",
      "Local SEO",
      "Performance Marketing"
    ],
    "areaServed": [
      {
        "@type": "Place",
        "name": "Bengaluru, Karnataka, India"
      },
      {
        "@type": "Place",
        "name": "India"
      }
    ]
  };
}

/**
 * Generate WebSite schema markup with search action
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Look A Like Solutions",
    "url": "https://www.lookalikesolutions.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.lookalikesolutions.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate ContactPage schema markup
 * Used on contact page
 */
export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Look A Like Solutions",
    "url": "https://www.lookalikesolutions.com/contact",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9731588244",
      "contactType": "Customer Service",
      "email": "info@lookalikesolutions.com",
      "areaServed": "IN"
    }
  };
}

/**
 * Generate safe testimonial/review framework
 * IMPORTANT: Only emits schema if real verified reviews exist in CMS
 * Does NOT emit fake ratings or reviews
 */
export function generateReviewSchema(reviews: ReviewItem[]) {
  if (!reviews || reviews.length === 0) {
    return null; // Do not emit fake review schema
  }

  const aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, r) => sum + r.reviewRating, 0) / reviews.length).toFixed(1),
    "ratingCount": reviews.length,
    "bestRating": "5",
    "worstRating": "1"
  };

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Look A Like Solutions",
    "url": "https://www.lookalikesolutions.com",
    "aggregateRating": aggregateRating,
    "review": reviews.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.reviewRating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished
    }))
  };
}
