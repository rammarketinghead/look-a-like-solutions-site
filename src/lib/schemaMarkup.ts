/**
 * Schema Markup Helpers for Enhanced SEO
 * Provides reusable schema markup generators for different page types
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate BreadcrumbList schema markup
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
 */
export function generateFAQSchema(faqs: FAQItem[]) {
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
 * Generate Service schema markup
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  areaServed: string = "Bengaluru, India",
  priceRange: string = "$"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Look A Like Solutions",
      "url": "https://www.lookalikesolutions.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": areaServed
    },
    "serviceType": serviceName,
    "priceRange": priceRange
  };
}

/**
 * Generate LocalBusiness schema markup
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Look A Like Solutions",
    "image": "https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png",
    "url": "https://www.lookalikesolutions.com",
    "telephone": "+91-9731588244",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560001",
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
    "priceRange": "$"
  };
}

/**
 * Generate WebApplication schema markup for tools
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
      "url": "https://www.lookalikesolutions.com"
    }
  };
}

/**
 * Generate BlogPosting schema markup
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
    "url": `https://www.lookalikesolutions.com${url}`
  };
}

/**
 * Generate Organization schema markup
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
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/lookalikesolutions",
      "https://www.instagram.com/lookalikesolutions/",
      "https://www.linkedin.com/company/lookalikesolutions/",
      "https://www.youtube.com/@thelookalikesolutions"
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
