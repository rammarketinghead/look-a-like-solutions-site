import { BaseCrudService } from '@/integrations';
import { BlogPosts, CaseStudies } from '@/entities';
import { fixSlug } from '@/utils/slugUtils';

export class SitemapService {
  private static baseUrl = 'https://lookalikesolutions.com';
  
  /**
   * Generate complete sitemap XML content
   */
  static async generateSitemapXML(): Promise<string> {
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
      { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
      { url: '/terms', priority: '0.5', changefreq: 'yearly' },
      { url: '/sitemap', priority: '0.6', changefreq: 'weekly' }, // HTML sitemap
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
      { url: '/tools/ai-humanizer', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/open-graph-tag-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/favicon-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/xml-sitemap-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/robots-txt-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/hashtag-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/content-readability-checker', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/google-ads-headline-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/blog-topic-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/image-alt-text-generator', priority: '0.7', changefreq: 'monthly' },
      { url: '/tools/marketing-funnel-roi-calculator', priority: '0.7', changefreq: 'monthly' },
    ];

    // Industry Solutions pages
    const industrySolutionPages: SitemapPage[] = [
      { url: '/seo-lead-generation', priority: '0.8', changefreq: 'weekly' },
      { url: '/lawyer-lead-generation', priority: '0.8', changefreq: 'weekly' },
      { url: '/doctor-lead-generation', priority: '0.8', changefreq: 'weekly' },
      { url: '/real-estate-lead-generation', priority: '0.8', changefreq: 'weekly' },
      { url: '/education-lead-generation', priority: '0.8', changefreq: 'weekly' },
      { url: '/restaurant-hotel-lead-generation', priority: '0.8', changefreq: 'weekly' },
    ];

    // Additional pages
    const additionalPages: SitemapPage[] = [
      { url: '/google-ads-training', priority: '0.7', changefreq: 'monthly' },
      { url: '/thank-you', priority: '0.5', changefreq: 'yearly' },
    ];

    try {
      // Fetch dynamic content from CMS
      const { items: blogPosts } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const { items: caseStudies } = await BaseCrudService.getAll<CaseStudies>('casestudies');

      // Generate blog post URLs
      const blogPostPages = blogPosts
        .filter(post => post.slug) // Only include posts with slugs
        .map(post => ({
          url: `/blog/${fixSlug(post.slug || '')}`,
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
        ...industrySolutionPages,
        ...additionalPages,
        ...blogPostPages,
        ...caseStudyPages
      ];

      // Generate XML
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      allPages.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${this.baseUrl}${page.url}</loc>\n`;
        xml += `    <lastmod>${page.lastmod || currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      });

      xml += '</urlset>';

      return xml;
    } catch (error) {
      console.error('Error generating sitemap:', error);
      // Generate sitemap with static pages only if CMS fetch fails
      const staticOnlyPages = [...staticPages, ...servicePages, ...toolPages, ...industrySolutionPages, ...additionalPages];
      
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      staticOnlyPages.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${this.baseUrl}${page.url}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      });

      xml += '</urlset>';
      return xml;
    }
  }

  /**
   * Store sitemap in localStorage for caching
   */
  static storeSitemap(xml: string): void {
    try {
      localStorage.setItem('sitemap_xml', xml);
      localStorage.setItem('sitemap_last_updated', new Date().toISOString());
    } catch (error) {
      console.warn('Could not store sitemap in localStorage:', error);
    }
  }

  /**
   * Get cached sitemap from localStorage
   */
  static getCachedSitemap(): { xml: string; lastUpdated: string } | null {
    try {
      const xml = localStorage.getItem('sitemap_xml');
      const lastUpdated = localStorage.getItem('sitemap_last_updated');
      
      if (xml && lastUpdated) {
        return { xml, lastUpdated };
      }
    } catch (error) {
      console.warn('Could not retrieve cached sitemap:', error);
    }
    return null;
  }

  /**
   * Check if cached sitemap is still valid (less than 1 hour old)
   */
  static isCacheValid(): boolean {
    const cached = this.getCachedSitemap();
    if (!cached) return false;

    const lastUpdated = new Date(cached.lastUpdated);
    const now = new Date();
    const hourInMs = 60 * 60 * 1000;
    
    return (now.getTime() - lastUpdated.getTime()) < hourInMs;
  }

  /**
   * Generate and cache sitemap
   */
  static async updateSitemap(): Promise<string> {
    console.log('🗺️ Generating fresh sitemap...');
    const xml = await this.generateSitemapXML();
    this.storeSitemap(xml);
    console.log('✅ Sitemap updated and cached');
    return xml;
  }

  /**
   * Get sitemap (from cache if valid, otherwise generate fresh)
   */
  static async getSitemap(): Promise<string> {
    if (this.isCacheValid()) {
      console.log('📋 Using cached sitemap');
      const cached = this.getCachedSitemap();
      return cached!.xml;
    }
    
    return await this.updateSitemap();
  }

  /**
   * Force sitemap regeneration (useful when new content is added)
   */
  static async refreshSitemap(): Promise<string> {
    console.log('🔄 Force refreshing sitemap...');
    return await this.updateSitemap();
  }

  /**
   * Trigger sitemap update when new blog post is created
   */
  static async onBlogPostCreated(): Promise<void> {
    console.log('📝 New blog post detected, updating sitemap...');
    await this.refreshSitemap();
  }

  /**
   * Trigger sitemap update when new case study is created
   */
  static async onCaseStudyCreated(): Promise<void> {
    console.log('📊 New case study detected, updating sitemap...');
    await this.refreshSitemap();
  }

  /**
   * Trigger sitemap update when any content is updated
   */
  static async onContentUpdated(): Promise<void> {
    console.log('📝 Content updated, refreshing sitemap...');
    await this.refreshSitemap();
  }
}