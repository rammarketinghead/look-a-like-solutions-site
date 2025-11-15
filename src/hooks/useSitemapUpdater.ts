import { useEffect } from 'react';
import { ContentWatcher } from '@/utils/contentWatcher';

/**
 * Hook to automatically trigger sitemap updates when content changes
 * This should be used in components that create or update content
 */
export const useSitemapUpdater = () => {
  useEffect(() => {
    // Enable automatic sitemap updates when component mounts
    ContentWatcher.setEnabled(true);
    
    return () => {
      // Keep enabled when component unmounts (global setting)
      // ContentWatcher.setEnabled(false);
    };
  }, []);

  return {
    // Manually trigger sitemap refresh
    refreshSitemap: ContentWatcher.refreshSitemap,
    
    // Content event handlers to call when content is modified
    onBlogPostCreated: ContentWatcher.onBlogPostCreated,
    onBlogPostUpdated: ContentWatcher.onBlogPostUpdated,
    onCaseStudyCreated: ContentWatcher.onCaseStudyCreated,
    onCaseStudyUpdated: ContentWatcher.onCaseStudyUpdated,
    onContentCreated: ContentWatcher.onContentCreated,
    onContentUpdated: ContentWatcher.onContentUpdated,
    onContentDeleted: ContentWatcher.onContentDeleted,
    
    // Get current sitemap status
    getSitemapStatus: ContentWatcher.getSitemapStatus,
  };
};