import { SitemapService } from '@/services/sitemapService';

/**
 * Content Watcher utility to monitor and trigger sitemap updates
 * This module provides functions to be called when content is created or updated
 */
export class ContentWatcher {
  private static isEnabled = true;

  /**
   * Enable or disable automatic sitemap updates
   */
  static setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    console.log(`🗺️ Sitemap auto-updates ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Call this function whenever a new blog post is created
   */
  static async onBlogPostCreated(blogPost?: { title?: string; slug?: string }) {
    if (!this.isEnabled) return;

    try {
      console.log('📝 New blog post created:', blogPost?.title || 'Unknown');
      await SitemapService.onBlogPostCreated();
      console.log('✅ Sitemap updated for new blog post');
    } catch (error) {
      console.error('❌ Failed to update sitemap after blog post creation:', error);
    }
  }

  /**
   * Call this function whenever a blog post is updated
   */
  static async onBlogPostUpdated(blogPost?: { title?: string; slug?: string }) {
    if (!this.isEnabled) return;

    try {
      console.log('📝 Blog post updated:', blogPost?.title || 'Unknown');
      await SitemapService.onContentUpdated();
      console.log('✅ Sitemap updated for blog post update');
    } catch (error) {
      console.error('❌ Failed to update sitemap after blog post update:', error);
    }
  }

  /**
   * Call this function whenever a new case study is created
   */
  static async onCaseStudyCreated(caseStudy?: { projectName?: string; clientName?: string }) {
    if (!this.isEnabled) return;

    try {
      console.log('📊 New case study created:', caseStudy?.projectName || 'Unknown');
      await SitemapService.onCaseStudyCreated();
      console.log('✅ Sitemap updated for new case study');
    } catch (error) {
      console.error('❌ Failed to update sitemap after case study creation:', error);
    }
  }

  /**
   * Call this function whenever a case study is updated
   */
  static async onCaseStudyUpdated(caseStudy?: { projectName?: string; clientName?: string }) {
    if (!this.isEnabled) return;

    try {
      console.log('📊 Case study updated:', caseStudy?.projectName || 'Unknown');
      await SitemapService.onContentUpdated();
      console.log('✅ Sitemap updated for case study update');
    } catch (error) {
      console.error('❌ Failed to update sitemap after case study update:', error);
    }
  }

  /**
   * Call this function whenever any content is created
   */
  static async onContentCreated(contentType: string, content?: any) {
    if (!this.isEnabled) return;

    try {
      console.log(`📄 New ${contentType} created:`, content?.title || content?.name || 'Unknown');
      await SitemapService.onContentUpdated();
      console.log(`✅ Sitemap updated for new ${contentType}`);
    } catch (error) {
      console.error(`❌ Failed to update sitemap after ${contentType} creation:`, error);
    }
  }

  /**
   * Call this function whenever any content is updated
   */
  static async onContentUpdated(contentType: string, content?: any) {
    if (!this.isEnabled) return;

    try {
      console.log(`📄 ${contentType} updated:`, content?.title || content?.name || 'Unknown');
      await SitemapService.onContentUpdated();
      console.log(`✅ Sitemap updated for ${contentType} update`);
    } catch (error) {
      console.error(`❌ Failed to update sitemap after ${contentType} update:`, error);
    }
  }

  /**
   * Call this function whenever content is deleted
   */
  static async onContentDeleted(contentType: string, content?: any) {
    if (!this.isEnabled) return;

    try {
      console.log(`🗑️ ${contentType} deleted:`, content?.title || content?.name || 'Unknown');
      await SitemapService.refreshSitemap();
      console.log(`✅ Sitemap updated for ${contentType} deletion`);
    } catch (error) {
      console.error(`❌ Failed to update sitemap after ${contentType} deletion:`, error);
    }
  }

  /**
   * Manually trigger a sitemap refresh
   */
  static async refreshSitemap() {
    try {
      console.log('🔄 Manually refreshing sitemap...');
      await SitemapService.refreshSitemap();
      console.log('✅ Sitemap manually refreshed');
    } catch (error) {
      console.error('❌ Failed to manually refresh sitemap:', error);
    }
  }

  /**
   * Get the current sitemap status
   */
  static async getSitemapStatus() {
    try {
      const cached = SitemapService.getCachedSitemap();
      const isValid = SitemapService.isCacheValid();
      
      return {
        hasCachedSitemap: !!cached,
        lastUpdated: cached?.lastUpdated || null,
        isCacheValid: isValid,
        autoUpdatesEnabled: this.isEnabled
      };
    } catch (error) {
      console.error('❌ Failed to get sitemap status:', error);
      return {
        hasCachedSitemap: false,
        lastUpdated: null,
        isCacheValid: false,
        autoUpdatesEnabled: this.isEnabled
      };
    }
  }
}