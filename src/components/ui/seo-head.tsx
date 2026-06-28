import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

interface Service {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  priceRange?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface LocalBusinessData {
  name?: string;
  telephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  // Schema markup props
  schemaType?: 'Organization' | 'LocalBusiness' | 'Service' | 'Article' | 'Product';
  reviews?: Review[];
  services?: Service[];
  faqs?: FAQ[];
  localBusiness?: LocalBusinessData;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  siteName = 'Look A Like Solutions',
  twitterCard = 'summary_large_image',
  noIndex = false,
  schemaType,
  reviews,
  services,
  faqs,
  localBusiness,
  aggregateRating
}: SEOHeadProps) {
  const location = useLocation();

  // Default values
  const defaultTitle = 'Look A Like Solutions - Digital Marketing Agency in Bengaluru';
  const defaultDescription = 'Leading digital marketing agency in Bengaluru offering SEO, social media marketing, paid ads, web development, and more. Grow your business with data-driven strategies.';
  const defaultImage = 'https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png';
  const baseUrl = 'https://www.lookalikesolutions.com';

  // Construct final values
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Function to update or create meta tag
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    if (author) {
      updateMetaTag('author', author);
    }

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:url', finalUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);

    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
    }
    if (author) {
      updateMetaTag('article:author', author, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:url', finalUrl);

    // Additional SEO tags
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

    // Remove existing JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Create schema markup based on type
    const schemas: any[] = [];

    // Organization schema (always include)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "url": baseUrl,
      "logo": defaultImage,
      "description": "Leading digital marketing agency in Bengaluru offering SEO, social media marketing, paid ads, web development, and comprehensive digital solutions.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "Customer Service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://www.facebook.com/lookalikesolutions",
        "https://www.linkedin.com/company/lookalikesolutions",
        "https://twitter.com/lookalikesol"
      ]
    };

    if (aggregateRating) {
      organizationSchema["aggregateRating"] = {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount
      };
    }

    schemas.push(organizationSchema);

    // Article schema
    if (type === 'article') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title || finalTitle,
        "description": finalDescription,
        "image": finalImage,
        "url": finalUrl,
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "author": {
          "@type": "Person",
          "name": author || "Look A Like Solutions"
        },
        "publisher": {
          "@type": "Organization",
          "name": siteName,
          "logo": {
            "@type": "ImageObject",
            "url": defaultImage
          }
        }
      });
    }

    // Service schema
    if (schemaType === 'Service' && services && services.length > 0) {
      services.forEach(service => {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "provider": {
            "@type": "Organization",
            "name": service.provider || siteName,
            "url": baseUrl
          },
          "areaServed": {
            "@type": "Place",
            "name": service.areaServed || "Bengaluru, India"
          },
          "serviceType": service.name,
          "priceRange": service.priceRange || "$"
        });
      });
    }

    // Review schema
    if (reviews && reviews.length > 0) {
      reviews.forEach(review => {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating,
            "bestRating": 5
          },
          "reviewBody": review.reviewBody,
          "datePublished": review.datePublished || new Date().toISOString(),
          "itemReviewed": {
            "@type": "Organization",
            "name": siteName
          }
        });
      });
    }

    // LocalBusiness schema for location-based pages
    if (schemaType === 'LocalBusiness' || localBusiness) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": localBusiness?.name || siteName,
        "image": defaultImage,
        "url": baseUrl,
        "telephone": localBusiness?.telephone || "+91-XXXXXXXXXX",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localBusiness?.streetAddress || "Your Street Address",
          "addressLocality": localBusiness?.addressLocality || "Bengaluru",
          "addressRegion": localBusiness?.addressRegion || "Karnataka",
          "postalCode": localBusiness?.postalCode || "560001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": localBusiness?.latitude || 12.9716,
          "longitude": localBusiness?.longitude || 77.5946
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "priceRange": "$"
      });
    }

    // FAQ schema
    if (faqs && faqs.length > 0) {
      schemas.push({
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
      });
    }

    // Insert all schemas
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

  }, [finalTitle, finalDescription, finalImage, finalUrl, type, author, publishedTime, modifiedTime, keywords, siteName, twitterCard, noIndex, schemaType, reviews, services, faqs, localBusiness, aggregateRating]);

  return null; // This component doesn't render anything
}

// Hook for easy SEO management
export function useSEO(seoProps: SEOHeadProps) {
  return <SEOHead {...seoProps} />;
}
