import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';

/**
 * Bridge service for blog post management
 * Reads from CMS blogposts collection
 * 
 * NOTE: Wix Blog app (95 posts) is separate from CMS blogposts collection (currently 5 posts)
 * To migrate all 95 Wix Blog posts, see PHASE6_WIX_BLOG_TO_CMS_MIGRATION.md
 */
export class BlogMigrationService {
  /**
   * Get all blog posts from CMS with optional pagination
   * Filters valid posts (title, content, slug required)
   * Sorts by published date (newest first)
   */
  static async getAllBlogPosts(options?: { limit?: number; skip?: number }) {
    try {
      const { items, hasNext, nextSkip, totalCount } = await BaseCrudService.getAll<BlogPosts>(
        'blogposts',
        [],
        options
      );

      // Filter valid posts (must have title, content, and slug)
      const validPosts = items.filter(post => 
        post.title?.trim() && 
        post.content?.trim() && 
        post.slug?.trim()
      );

      // Sort by published date (newest first)
      validPosts.sort((a, b) => {
        const dateA = new Date(a.publishedDate || a._createdDate || 0).getTime();
        const dateB = new Date(b.publishedDate || b._createdDate || 0).getTime();
        return dateB - dateA;
      });

      return {
        items: validPosts,
        hasNext,
        nextSkip,
        totalCount: validPosts.length,
        originalCount: totalCount
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return {
        items: [],
        hasNext: false,
        nextSkip: null,
        totalCount: 0,
        originalCount: 0
      };
    }
  }

  /**
   * Get single blog post by slug
   * Tries exact match first, then case-insensitive fallback
   */
  static async getBlogPostBySlug(slug: string) {
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      
      // Exact match
      let post = items.find(p => p.slug === slug);
      
      // Fallback: case-insensitive match
      if (!post) {
        post = items.find(p => p.slug?.toLowerCase() === slug.toLowerCase());
      }
      
      // Fallback: partial match
      if (!post && slug) {
        post = items.find(p => {
          if (!p.slug) return false;
          const postSlug = p.slug.toLowerCase();
          return postSlug === slug || p.slug.includes(slug) || slug.includes(postSlug);
        });
      }
      
      return post || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  /**
   * Search blog posts by query
   * Searches in title, excerpt, content, and author
   */
  static async searchBlogPosts(query: string) {
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      
      const lowerQuery = query.toLowerCase();
      return items.filter(post =>
        post.title?.toLowerCase().includes(lowerQuery) ||
        post.excerpt?.toLowerCase().includes(lowerQuery) ||
        post.content?.toLowerCase().includes(lowerQuery) ||
        post.author?.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }
  }

  /**
   * Get related posts (excluding current post)
   */
  static async getRelatedPosts(currentPostId: string, limit: number = 3) {
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      
      const validPosts = items.filter(p => 
        p._id !== currentPostId &&
        p.title?.trim() &&
        p.content?.trim()
      );

      // Sort by published date
      validPosts.sort((a, b) => {
        const dateA = new Date(a.publishedDate || a._createdDate || 0).getTime();
        const dateB = new Date(b.publishedDate || b._createdDate || 0).getTime();
        return dateB - dateA;
      });

      return validPosts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  }

  /**
   * Get latest blog posts
   * Useful for homepage and other sections
   */
  static async getLatestPosts(limit: number = 3) {
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      
      const validPosts = items.filter(post => 
        post.title?.trim() && 
        post.content?.trim() &&
        post.slug?.trim()
      );

      // Sort by published date (newest first)
      validPosts.sort((a, b) => {
        const dateA = new Date(a.publishedDate || a._createdDate || 0).getTime();
        const dateB = new Date(b.publishedDate || b._createdDate || 0).getTime();
        return dateB - dateA;
      });

      return validPosts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      return [];
    }
  }

  /**
   * Get blog posts by category/tag
   * Searches in arraystring field (tags)
   */
  static async getPostsByTag(tag: string) {
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      
      const lowerTag = tag.toLowerCase();
      return items.filter(post =>
        post.arraystring?.some(t => t?.toLowerCase().includes(lowerTag))
      );
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      return [];
    }
  }

  /**
   * Get total blog post count
   * Useful for pagination and analytics
   */
  static async getBlogPostCount() {
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      
      const validPosts = items.filter(post => 
        post.title?.trim() && 
        post.content?.trim()
      );

      return validPosts.length;
    } catch (error) {
      console.error('Error getting blog post count:', error);
      return 0;
    }
  }

  /**
   * Get blog posts for sitemap
   * Returns all valid posts with slug and lastmod
   */
  static async getBlogPostsForSitemap() {
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      
      return items
        .filter(post => post.slug?.trim() && post.title?.trim())
        .map(post => ({
          slug: post.slug,
          lastmod: post._updatedDate || post._createdDate,
          priority: '0.6',
          changefreq: 'monthly'
        }));
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error);
      return [];
    }
  }
}
