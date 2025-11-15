import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useSearchAnalyticsData } from '@/hooks/useSearchAnalytics';
import { SearchAnalytics } from '@/entities';
import { 
  Search, 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle,
  BarChart3,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function SearchAnalyticsDashboard() {
  const { analytics, trends, isLoading, error, loadAnalytics, loadAnalyticsByPeriod, refresh } = useSearchAnalyticsData();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
  const [sortBy, setSortBy] = useState<'searchCount' | 'lastSearchedAt' | 'queryString'>('searchCount');
  const [filterMinCount, setFilterMinCount] = useState<number>(1);

  useEffect(() => {
    loadPeriodData();
  }, [selectedPeriod]);

  useEffect(() => {
    loadAnalytics({
      sortBy,
      sortOrder: 'desc',
      minSearchCount: filterMinCount,
      limit: 50
    });
  }, [sortBy, filterMinCount]);

  const loadPeriodData = async () => {
    const data = await loadAnalyticsByPeriod(selectedPeriod);
    setChartData(data);
  };

  const formatChartData = () => {
    return chartData.labels.map((label, index) => ({
      name: label,
      searches: chartData.data[index] || 0
    }));
  };

  const exportData = () => {
    const csvContent = [
      ['Query', 'Search Count', 'First Searched', 'Last Searched', 'Has Results'].join(','),
      ...analytics.map(item => [
        `"${item.queryString || ''}"`,
        item.searchCount || 0,
        item.firstSearchedAt ? new Date(item.firstSearchedAt).toLocaleDateString() : '',
        item.lastSearchedAt ? new Date(item.lastSearchedAt).toLocaleDateString() : '',
        item.hasResults ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading && !trends) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-destructive">{error}</p>
            <Button onClick={refresh} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl text-dark-gray">Search Analytics</h2>
          <p className="text-secondary">Monitor and analyze user search behavior</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={refresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      {trends && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Total Searches</p>
                  <p className="text-2xl font-bold">{trends.totalSearches.toLocaleString()}</p>
                </div>
                <Search className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Unique Queries</p>
                  <p className="text-2xl font-bold">{trends.uniqueQueries.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">This Week</p>
                  <p className="text-2xl font-bold">{trends.searchesThisWeek.toLocaleString()}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">No Results</p>
                  <p className="text-2xl font-bold">{trends.noResultQueries.length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts and Data */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Search Trends</TabsTrigger>
          <TabsTrigger value="queries">Top Queries</TabsTrigger>
          <TabsTrigger value="recent">Recent Searches</TabsTrigger>
          <TabsTrigger value="no-results">No Results</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Search Volume Over Time
                </CardTitle>
                <Select value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 7 Days</SelectItem>
                    <SelectItem value="week">Last 4 Weeks</SelectItem>
                    <SelectItem value="month">Last 6 Months</SelectItem>
                    <SelectItem value="year">Last 3 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formatChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="searches" stroke="#007BFF" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Top Search Queries
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="searchCount">By Count</SelectItem>
                      <SelectItem value="lastSearchedAt">By Recent</SelectItem>
                      <SelectItem value="queryString">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterMinCount.toString()} onValueChange={(value) => setFilterMinCount(parseInt(value))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Min 1</SelectItem>
                      <SelectItem value="5">Min 5</SelectItem>
                      <SelectItem value="10">Min 10</SelectItem>
                      <SelectItem value="25">Min 25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.slice(0, 20).map((item, index) => (
                  <div key={item._id} className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{item.queryString}</p>
                        <p className="text-sm text-secondary">
                          Last searched: {item.lastSearchedAt ? new Date(item.lastSearchedAt).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{item.searchCount}</p>
                      <Badge variant={item.hasResults ? 'default' : 'destructive'} className="text-xs">
                        {item.hasResults ? 'Has Results' : 'No Results'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trends?.recentQueries.slice(0, 15).map((item: SearchAnalytics) => (
                  <div key={item._id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.queryString}</p>
                      <p className="text-sm text-secondary">
                        {item.lastSearchedAt ? new Date(item.lastSearchedAt).toLocaleString() : 'Unknown time'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.searchCount}x</Badge>
                      <Badge variant={item.hasResults ? 'default' : 'destructive'}>
                        {item.hasResults ? '✓' : '✗'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="no-results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Queries with No Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trends?.noResultQueries.map((item: SearchAnalytics) => (
                  <div key={item._id} className="flex items-center justify-between p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div>
                      <p className="font-medium">{item.queryString}</p>
                      <p className="text-sm text-secondary">
                        Last searched: {item.lastSearchedAt ? new Date(item.lastSearchedAt).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-destructive">{item.searchCount}x</p>
                      <p className="text-xs text-secondary">No results found</p>
                    </div>
                  </div>
                ))}
                {(!trends?.noResultQueries || trends.noResultQueries.length === 0) && (
                  <div className="text-center py-8 text-secondary">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No queries without results found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}