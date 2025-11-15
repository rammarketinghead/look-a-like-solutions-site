import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SitemapService } from '@/services/sitemapService';
import { ContentWatcher } from '@/utils/contentWatcher';
import { RefreshCw, CheckCircle, AlertCircle, Clock, Settings } from 'lucide-react';

interface SitemapStatus {
  hasCachedSitemap: boolean;
  lastUpdated: string | null;
  isCacheValid: boolean;
  autoUpdatesEnabled: boolean;
}

export function SitemapAdmin() {
  const [status, setStatus] = useState<SitemapStatus | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const sitemapStatus = await ContentWatcher.getSitemapStatus();
      setStatus(sitemapStatus);
    } catch (error) {
      console.error('Failed to load sitemap status:', error);
    }
  };

  const handleRefreshSitemap = async () => {
    setIsRefreshing(true);
    try {
      await ContentWatcher.refreshSitemap();
      setLastRefresh(new Date().toISOString());
      await loadStatus(); // Reload status after refresh
    } catch (error) {
      console.error('Failed to refresh sitemap:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleAutoUpdates = () => {
    if (status) {
      const newEnabled = !status.autoUpdatesEnabled;
      ContentWatcher.setEnabled(newEnabled);
      setStatus({ ...status, autoUpdatesEnabled: newEnabled });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = () => {
    if (!status) return 'secondary';
    if (status.isCacheValid) return 'default';
    return 'destructive';
  };

  const getStatusIcon = () => {
    if (!status) return <Clock className="h-4 w-4" />;
    if (status.isCacheValid) return <CheckCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (!status) return 'Loading...';
    if (status.isCacheValid) return 'Up to date';
    if (status.hasCachedSitemap) return 'Cache expired';
    return 'No cache';
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Sitemap Management
        </CardTitle>
        <CardDescription>
          Monitor and manage your website's sitemap.xml file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Overview */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <p className="font-medium">Sitemap Status</p>
              <p className="text-sm text-muted-foreground">
                Last updated: {formatDate(status?.lastUpdated || null)}
              </p>
            </div>
          </div>
          <Badge variant={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>

        {/* Auto Updates Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium">Automatic Updates</p>
            <p className="text-sm text-muted-foreground">
              Automatically regenerate sitemap when content changes
            </p>
          </div>
          <Button
            variant={status?.autoUpdatesEnabled ? "default" : "outline"}
            size="sm"
            onClick={toggleAutoUpdates}
          >
            {status?.autoUpdatesEnabled ? "Enabled" : "Disabled"}
          </Button>
        </div>

        {/* Manual Refresh */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium">Manual Refresh</p>
            <p className="text-sm text-muted-foreground">
              Force regenerate the sitemap with latest content
            </p>
            {lastRefresh && (
              <p className="text-xs text-muted-foreground mt-1">
                Last manual refresh: {formatDate(lastRefresh)}
              </p>
            )}
          </div>
          <Button
            onClick={handleRefreshSitemap}
            disabled={isRefreshing}
            size="sm"
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Now
              </>
            )}
          </Button>
        </div>

        {/* Sitemap Info */}
        <div className="space-y-2 p-4 bg-muted rounded-lg">
          <p className="font-medium">Sitemap Information</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Accessible at: <code>/sitemap.xml</code></p>
            <p>• Includes all static pages, services, tools, blog posts, and case studies</p>
            <p>• Updates automatically when new content is published</p>
            <p>• Cache expires after 1 hour for optimal performance</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('/sitemap.xml', '_blank')}
          >
            View Sitemap
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={loadStatus}
          >
            Refresh Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}