import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts, CaseStudies } from '@/entities';

export default function SitemapPage() {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = async () => {
    const baseUrl = 'https://lookalikesolutions.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Define the page type
    type SitemapPage = {
      url: string;
      priority: string;
      changefreq: string;
      lastmod?: string;
    };

    // Static pages with their priorities and change frequencies
    const staticPages: SitemapPage[] = [
      { url: '', priority: '1.0', changefreq: 'weekly' }, // Homepage
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/services', priority: '0.9', changefreq: 'weekly' },
      { url: '/tools', priority: '0.8', changefreq: 'weekly' },
      { url: '/case-studies', priority: '0.8', changefreq: 'weekly' },
      { url: '/blog', priority: '0.8', changefreq: 'daily' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    ];

    // Service pages
    const servicePages: SitemapPage[] = [
      { url: '/services/seo', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/social-media', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/paid-ads', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/web-development', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/influencer-marketing', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/content-marketing', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/data-analytics', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/conversion-optimization', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/email-marketing', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/youtube-growth', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/digital-audit', priority: '0.9', changefreq: 'weekly' },
      { url: '/services/digital-training', priority: '0.9', changefreq: 'weekly' },
    ];

    // Tool pages
    const toolPages: SitemapPage[] = [
      { url: '/tools/seo-keyword-research', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/email-subject-tester', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/ppc-ad-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/keyword-grouping', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/keyword-match-types', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/meta-title-description-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/serp-snippet-preview', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/backlink-checker', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/utm-link-builder', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/website-speed-test', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/social-media-post-generator', priority: '0.7', changefreq: 'monthly' },
    ];

    try {
      // Fetch dynamic content from CMS
      const { items: blogPosts } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const { items: caseStudies } = await BaseCrudService.getAll<CaseStudies>('casestudies');

      // Generate blog post URLs
      const blogPostPages = blogPosts
        .filter(post => post.slug) // Only include posts with slugs
        .map(post => ({
          url: `/blog/${post.slug}`,
          priority: '0.6',
          changefreq: 'monthly',
          lastmod: post._updatedDate ? new Date(post._updatedDate).toISOString().split('T')[0] : currentDate
        }));

      // Generate case study URLs (using _id since there's no slug field)
      const caseStudyPages = caseStudies.map(caseStudy => ({
        url: `/case-studies/${caseStudy._id}`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: caseStudy._updatedDate ? new Date(caseStudy._updatedDate).toISOString().split('T')[0] : currentDate
      }));

      // Combine all pages
      const allPages = [
        ...staticPages,
        ...servicePages,
        ...toolPages,
        ...blogPostPages,
        ...caseStudyPages
      ];

      // Generate XML
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      allPages.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
        xml += `    <lastmod>${page.lastmod || currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      });

      xml += '</urlset>';

      setSitemapXml(xml);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      // Generate sitemap with static pages only if CMS fetch fails
      const staticOnlyPages = [...staticPages, ...servicePages, ...toolPages];
      
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      staticOnlyPages.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      });

      xml += '</urlset>';
      setSitemapXml(xml);
    }
  };

  // Set proper content type and display XML
  useEffect(() => {
    if (sitemapXml) {
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
  }, [sitemapXml]);

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
      {sitemapXml || 'Generating sitemap...'}
    </pre>
  );
}