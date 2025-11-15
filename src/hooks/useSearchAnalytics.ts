import { useState, useEffect } from 'react';
import { SearchAnalyticsService } from '@/services/searchAnalyticsService';
import { SearchAnalytics } from '@/entities';

/**
 * Hook for recording search queries and managing search analytics
 */
export const useSearchAnalytics = () => {
  const [isRecording, setIsRecording] = useState(false);

  /**
   * Record a search query
   */
  const recordSearch = async (queryString: string, hasResults: boolean = false) => {
    if (isRecording) return; // Prevent duplicate recordings
    
    setIsRecording(true);
    try {
      await SearchAnalyticsService.recordSearch(queryString, hasResults);
    } catch (error) {
      console.error('Failed to record search:', error);
    } finally {
      setIsRecording(false);
    }
  };

  return {
    recordSearch,
    isRecording
  };
};

/**
 * Hook for fetching and managing search analytics data
 */
export const useSearchAnalyticsData = (autoRefresh: boolean = false) => {
  const [analytics, setAnalytics] = useState<SearchAnalytics[]>([]);
  const [trends, setTrends] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = async (options?: Parameters<typeof SearchAnalyticsService.getSearchAnalytics>[0]) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await SearchAnalyticsService.getSearchAnalytics(options);
      setAnalytics(data);
    } catch (err) {
      setError('Failed to load search analytics');
      console.error('Failed to load search analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrends = async () => {
    try {
      const trendsData = await SearchAnalyticsService.getSearchTrends();
      setTrends(trendsData);
    } catch (err) {
      console.error('Failed to load search trends:', err);
    }
  };

  const loadAnalyticsByPeriod = async (period: 'day' | 'week' | 'month' | 'year') => {
    try {
      return await SearchAnalyticsService.getSearchAnalyticsByPeriod(period);
    } catch (err) {
      console.error('Failed to load analytics by period:', err);
      return { labels: [], data: [] };
    }
  };

  useEffect(() => {
    loadAnalytics();
    loadTrends();

    if (autoRefresh) {
      const interval = setInterval(() => {
        loadAnalytics();
        loadTrends();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return {
    analytics,
    trends,
    isLoading,
    error,
    loadAnalytics,
    loadTrends,
    loadAnalyticsByPeriod,
    refresh: () => {
      loadAnalytics();
      loadTrends();
    }
  };
};