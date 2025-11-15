import { useEffect, useRef } from 'react';
import { SitemapService } from '@/services/sitemapService';

/**
 * Custom hook to automatically update sitemap when content changes
 * This hook monitors for content updates and triggers sitemap regeneration
 */
export function useSitemapUpdater() {
  const lastUpdateRef = useRef<string | null>(null);

  useEffect(() => {
    // Check for content updates every 5 minutes
    const interval = setInterval(async () => {
      try {
        // Get the current timestamp of the last sitemap update
        const cached = SitemapService.getCachedSitemap();
        const currentUpdate = cached?.lastUpdated || null;

        // If this is the first check, just store the current timestamp
        if (!lastUpdateRef.current) {
          lastUpdateRef.current = currentUpdate;
          return;
        }

        // If the timestamp has changed, content might have been updated
        if (currentUpdate !== lastUpdateRef.current) {
          console.log('🔄 Content change detected, refreshing sitemap...');
          await SitemapService.refreshSitemap();
          lastUpdateRef.current = currentUpdate;
        }
      } catch (error) {
        console.warn('Error checking for sitemap updates:', error);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Return utility functions for manual sitemap updates
  return {
    /**
     * Manually trigger sitemap update
     */
    updateSitemap: async () => {
      try {
        await SitemapService.refreshSitemap();
        console.log('✅ Sitemap manually updated');
      } catch (error) {
        console.error('❌ Failed to update sitemap:', error);
      }
    },

    /**
     * Trigger sitemap update when new blog post is created
     */
    onBlogPostCreated: async () => {
      await SitemapService.onBlogPostCreated();
    },

    /**
     * Trigger sitemap update when new case study is created
     */
    onCaseStudyCreated: async () => {
      await SitemapService.onCaseStudyCreated();
    },

    /**
     * Trigger sitemap update when any content is updated
     */
    onContentUpdated: async () => {
      await SitemapService.onContentUpdated();
    }
  };
}