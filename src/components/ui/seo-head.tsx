import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image';
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
  twitterCard = 'summary_large_image'
}: SEOHeadProps) {
  const location = useLocation();
  
  // Default values
  const defaultTitle = 'Look A Like Solutions - Digital Marketing Agency in Bengaluru';
  const defaultDescription = 'Leading digital marketing agency in Bengaluru offering SEO, social media marketing, paid ads, web development, and more. Grow your business with data-driven strategies.';
  const defaultImage = 'https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png';
  const baseUrl = 'https://lookalikesolutions.com';
  
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
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);
    
    // JSON-LD structured data for articles
    if (type === 'article') {
      const structuredData = {
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
      };
      
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
  }, [finalTitle, finalDescription, finalImage, finalUrl, type, author, publishedTime, modifiedTime, keywords, siteName, twitterCard]);
  
  return null; // This component doesn't render anything
}

// Hook for easy SEO management
export function useSEO(seoProps: SEOHeadProps) {
  return <SEOHead {...seoProps} />;
}