import { useEffect, useState } from 'react';
import { ContentWatcher } from '@/utils/contentWatcher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, CheckCircle, AlertCircle, Clock, Settings } from 'lucide-react';

interface SitemapStatus {
  hasCachedSitemap: boolean;
  lastUpdated: string | null;
  isCacheValid: boolean;
  autoUpdatesEnabled: boolean;
}

export function SitemapAutoUpdater() {
  const [status, setStatus] = useState<SitemapStatus | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStatus();
    
    // Refresh status every 30 seconds
    const interval = setInterval(loadStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStatus = async () => {
    try {
      const sitemapStatus = await ContentWatcher.getSitemapStatus();
      setStatus(sitemapStatus);
    } catch (error) {
      console.error('Failed to load sitemap status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await ContentWatcher.refreshSitemap();
      await loadStatus(); // Reload status after refresh
    } catch (error) {
      console.error('Failed to refresh sitemap:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleAutoUpdates = () => {
    if (status) {
      ContentWatcher.setEnabled(!status.autoUpdatesEnabled);
      setStatus({
        ...status,
        autoUpdatesEnabled: !status.autoUpdatesEnabled
      });
    }
  };

  const formatLastUpdated = (lastUpdated: string | null) => {
    if (!lastUpdated) return 'Never';
    
    const date = new Date(lastUpdated);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  const getStatusColor = () => {
    if (!status) return 'secondary';
    if (!status.hasCachedSitemap) return 'destructive';
    if (!status.isCacheValid) return 'secondary';
    return 'default';
  };

  const getStatusIcon = () => {
    if (!status) return <Clock className="w-4 h-4" />;
    if (!status.hasCachedSitemap) return <AlertCircle className="w-4 h-4" />;
    if (!status.isCacheValid) return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (!status) return 'Loading...';
    if (!status.hasCachedSitemap) return 'No sitemap generated';
    if (!status.isCacheValid) return 'Sitemap needs update';
    return 'Sitemap up to date';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Sitemap Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Loading sitemap status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-lg flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Sitemap Auto-Updater
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">{getStatusText()}</span>
          </div>
          <Badge variant={getStatusColor()}>
            {status?.isCacheValid ? 'Valid' : 'Stale'}
          </Badge>
        </div>

        <Separator />

        {/* Detailed Status */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary">Last Updated:</span>
            <span className="text-sm font-mono">
              {formatLastUpdated(status?.lastUpdated || null)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary">Auto Updates:</span>
            <Badge variant={status?.autoUpdatesEnabled ? 'default' : 'secondary'}>
              {status?.autoUpdatesEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary">Cache Status:</span>
            <Badge variant={status?.hasCachedSitemap ? 'default' : 'destructive'}>
              {status?.hasCachedSitemap ? 'Cached' : 'No Cache'}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            size="sm"
            className="flex-1"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
          </Button>
          
          <Button
            onClick={toggleAutoUpdates}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Settings className="w-4 h-4 mr-2" />
            {status?.autoUpdatesEnabled ? 'Disable Auto' : 'Enable Auto'}
          </Button>
        </div>

        {/* Info */}
        <div className="text-xs text-secondary bg-light-gray p-3 rounded">
          <p className="mb-1">
            <strong>Auto Updates:</strong> Automatically refreshes sitemaps when blog posts or case studies are created/updated.
          </p>
          <p>
            <strong>Cache:</strong> Sitemaps are cached for 1 hour to improve performance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}