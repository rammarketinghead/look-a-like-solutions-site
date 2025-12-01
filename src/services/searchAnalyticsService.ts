import { BaseCrudService } from '@/integrations';
import { SearchAnalytics } from '@/entities';

export class SearchAnalyticsService {
  /**
   * Record a search query or increment its count if it already exists
   */
  static async recordSearch(queryString: string, hasResults: boolean = false): Promise<void> {
    try {
      if (!queryString || queryString.trim().length === 0) {
        return; // Don't record empty searches
      }

      const trimmedQuery = queryString.trim().toLowerCase();
      const userAgent = navigator.userAgent;
      const now = new Date();

      // Check if this query already exists
      const { items: existingQueries } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
      const existingQuery = existingQueries.find(q => q.queryString?.toLowerCase() === trimmedQuery);

      if (existingQuery) {
        // Update existing query
        await BaseCrudService.update<SearchAnalytics>('searchanalytics', {
          _id: existingQuery._id,
          searchCount: (existingQuery.searchCount || 0) + 1,
          lastSearchedAt: now,
          hasResults: hasResults,
          lastSearchUserAgent: userAgent
        });
        console.log(`[SearchAnalytics] Updated search query: "${trimmedQuery}" (count: ${(existingQuery.searchCount || 0) + 1})`);
      } else {
        // Create new query record
        await BaseCrudService.create('searchanalytics', {
          _id: crypto.randomUUID(),
          queryString: trimmedQuery,
          searchCount: 1,
          firstSearchedAt: now,
          lastSearchedAt: now,
          hasResults: hasResults,
          lastSearchUserAgent: userAgent
        });
        console.log(`[SearchAnalytics] Recorded new search query: "${trimmedQuery}"`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('[SearchAnalytics] Failed to record search query:', {
        query: queryString,
        error: errorMessage,
        timestamp: new Date().toISOString()
      });
      // Check for permission errors
      if (errorMessage.includes('permission') || errorMessage.includes('Permission')) {
        console.error('[SearchAnalytics] ⚠️ PERMISSION ERROR: Check CMS collection permissions for "searchanalytics"');
        console.error('[SearchAnalytics] Required permissions: Read=ANYONE, Update=ANYONE, Insert=ANYONE');
      }
      // Don't throw error to avoid breaking search functionality
    }
  }

  /**
   * Get search analytics data with sorting and filtering options
   */
  static async getSearchAnalytics(options: {
    sortBy?: 'searchCount' | 'lastSearchedAt' | 'firstSearchedAt' | 'queryString';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    minSearchCount?: number;
    dateFrom?: Date;
    dateTo?: Date;
  } = {}): Promise<SearchAnalytics[]> {
    try {
      const { items } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
      
      let filteredItems = items;

      // Apply filters
      if (options.minSearchCount) {
        filteredItems = filteredItems.filter(item => (item.searchCount || 0) >= options.minSearchCount);
      }

      if (options.dateFrom) {
        filteredItems = filteredItems.filter(item => {
          const lastSearched = item.lastSearchedAt ? new Date(item.lastSearchedAt) : null;
          return lastSearched && lastSearched >= options.dateFrom!;
        });
      }

      if (options.dateTo) {
        filteredItems = filteredItems.filter(item => {
          const lastSearched = item.lastSearchedAt ? new Date(item.lastSearchedAt) : null;
          return lastSearched && lastSearched <= options.dateTo!;
        });
      }

      // Apply sorting
      const sortBy = options.sortBy || 'searchCount';
      const sortOrder = options.sortOrder || 'desc';

      filteredItems.sort((a, b) => {
        let aValue: any = a[sortBy];
        let bValue: any = b[sortBy];

        // Handle date fields
        if (sortBy === 'lastSearchedAt' || sortBy === 'firstSearchedAt') {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        }

        // Handle string fields
        if (sortBy === 'queryString') {
          aValue = (aValue || '').toLowerCase();
          bValue = (bValue || '').toLowerCase();
        }

        // Handle numeric fields
        if (sortBy === 'searchCount') {
          aValue = aValue || 0;
          bValue = bValue || 0;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });

      // Apply limit
      if (options.limit) {
        filteredItems = filteredItems.slice(0, options.limit);
      }

      return filteredItems;
    } catch (error) {
      console.error('Failed to get search analytics:', error);
      return [];
    }
  }

  /**
   * Get search trends and statistics
   */
  static async getSearchTrends(): Promise<{
    totalSearches: number;
    uniqueQueries: number;
    topQueries: SearchAnalytics[];
    recentQueries: SearchAnalytics[];
    noResultQueries: SearchAnalytics[];
    searchesThisWeek: number;
    searchesThisMonth: number;
  }> {
    try {
      const { items } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
      
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const totalSearches = items.reduce((sum, item) => sum + (item.searchCount || 0), 0);
      const uniqueQueries = items.length;

      // Top queries by search count
      const topQueries = items
        .sort((a, b) => (b.searchCount || 0) - (a.searchCount || 0))
        .slice(0, 10);

      // Recent queries
      const recentQueries = items
        .filter(item => item.lastSearchedAt)
        .sort((a, b) => {
          const aDate = new Date(a.lastSearchedAt!).getTime();
          const bDate = new Date(b.lastSearchedAt!).getTime();
          return bDate - aDate;
        })
        .slice(0, 10);

      // Queries with no results
      const noResultQueries = items
        .filter(item => item.hasResults === false)
        .sort((a, b) => (b.searchCount || 0) - (a.searchCount || 0))
        .slice(0, 10);

      // Searches this week
      const searchesThisWeek = items
        .filter(item => {
          const lastSearched = item.lastSearchedAt ? new Date(item.lastSearchedAt) : null;
          return lastSearched && lastSearched >= oneWeekAgo;
        })
        .reduce((sum, item) => {
          const lastSearched = item.lastSearchedAt ? new Date(item.lastSearchedAt) : null;
          if (lastSearched && lastSearched >= oneWeekAgo) {
            return sum + (item.searchCount || 0);
          }
          return sum;
        }, 0);

      // Searches this month
      const searchesThisMonth = items
        .filter(item => {
          const lastSearched = item.lastSearchedAt ? new Date(item.lastSearchedAt) : null;
          return lastSearched && lastSearched >= oneMonthAgo;
        })
        .reduce((sum, item) => {
          const lastSearched = item.lastSearchedAt ? new Date(item.lastSearchedAt) : null;
          if (lastSearched && lastSearched >= oneMonthAgo) {
            return sum + (item.searchCount || 0);
          }
          return sum;
        }, 0);

      return {
        totalSearches,
        uniqueQueries,
        topQueries,
        recentQueries,
        noResultQueries,
        searchesThisWeek,
        searchesThisMonth
      };
    } catch (error) {
      console.error('Failed to get search trends:', error);
      return {
        totalSearches: 0,
        uniqueQueries: 0,
        topQueries: [],
        recentQueries: [],
        noResultQueries: [],
        searchesThisWeek: 0,
        searchesThisMonth: 0
      };
    }
  }

  /**
   * Get search analytics for a specific time period
   */
  static async getSearchAnalyticsByPeriod(period: 'day' | 'week' | 'month' | 'year'): Promise<{
    labels: string[];
    data: number[];
  }> {
    try {
      const { items } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
      const now = new Date();
      
      let startDate: Date;
      let dateFormat: (date: Date) => string;
      let periods: string[] = [];

      switch (period) {
        case 'day':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
          dateFormat = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short' });
          for (let i = 6; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            periods.push(dateFormat(date));
          }
          break;
        case 'week':
          startDate = new Date(now.getTime() - 4 * 7 * 24 * 60 * 60 * 1000); // Last 4 weeks
          dateFormat = (date: Date) => `Week ${Math.ceil(date.getDate() / 7)}`;
          for (let i = 3; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
            periods.push(dateFormat(date));
          }
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1); // Last 6 months
          dateFormat = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });
          for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            periods.push(dateFormat(date));
          }
          break;
        case 'year':
          startDate = new Date(now.getFullYear() - 2, 0, 1); // Last 3 years
          dateFormat = (date: Date) => date.getFullYear().toString();
          for (let i = 2; i >= 0; i--) {
            const date = new Date(now.getFullYear() - i, 0, 1);
            periods.push(dateFormat(date));
          }
          break;
      }

      const data = periods.map(() => 0);

      items.forEach(item => {
        if (item.lastSearchedAt) {
          const searchDate = new Date(item.lastSearchedAt);
          if (searchDate >= startDate) {
            const periodIndex = periods.findIndex(p => {
              return dateFormat(searchDate) === p;
            });
            if (periodIndex >= 0) {
              data[periodIndex] += item.searchCount || 0;
            }
          }
        }
      });

      return {
        labels: periods,
        data
      };
    } catch (error) {
      console.error('Failed to get search analytics by period:', error);
      return {
        labels: [],
        data: []
      };
    }
  }

  /**
   * Delete old search records (for data cleanup)
   */
  static async cleanupOldSearches(olderThanDays: number = 365): Promise<number> {
    try {
      const { items } = await BaseCrudService.getAll<SearchAnalytics>('searchanalytics');
      const cutoffDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
      
      const itemsToDelete = items.filter(item => {
        const lastSearched = item.lastSearchedAt ? new Date(item.lastSearchedAt) : null;
        return lastSearched && lastSearched < cutoffDate;
      });

      for (const item of itemsToDelete) {
        await BaseCrudService.delete('searchanalytics', item._id);
      }

      return itemsToDelete.length;
    } catch (error) {
      console.error('Failed to cleanup old searches:', error);
      return 0;
    }
  }
}