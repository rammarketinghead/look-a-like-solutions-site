import { useEffect, useState } from 'react';
import { SitemapService } from '@/services/sitemapService';

export default function SitemapPage() {
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSitemap();
  }, []);

  const loadSitemap = async () => {
    try {
      setIsLoading(true);
      const xml = await SitemapService.getSitemap();
      setSitemapXml(xml);
    } catch (error) {
      console.error('Error loading sitemap:', error);
      setSitemapXml('Error generating sitemap. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Set proper content type and display XML
  useEffect(() => {
    if (sitemapXml && !isLoading) {
      // Set the document content type to XML
      try {
        // Use meta tag to set content type since document.contentType is read-only
        const metaTag = document.createElement('meta');
        metaTag.httpEquiv = 'Content-Type';
        metaTag.content = 'application/xml; charset=UTF-8';
        document.head.appendChild(metaTag);
      } catch (e) {
        // Fallback for browsers that don't support setting contentType
        console.log('Content type setting not supported');
      }
    }
  }, [sitemapXml, isLoading]);

  // Return the XML content as plain text with proper formatting
  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      whiteSpace: 'pre-wrap', 
      margin: 0, 
      padding: 0,
      fontSize: '12px',
      lineHeight: '1.2'
    }}>
      {isLoading ? 'Generating sitemap...' : sitemapXml || 'Error loading sitemap'}
    </pre>
  );
}