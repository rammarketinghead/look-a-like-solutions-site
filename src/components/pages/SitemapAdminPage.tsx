import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SitemapAutoUpdater } from '@/components/ui/sitemap-auto-updater';
import { SitemapService } from '@/services/sitemapService';
import { ContentWatcher } from '@/utils/contentWatcher';
import { SEOHead } from '@/components/ui/seo-head';
import { 
  RefreshCw, 
  Download, 
  ExternalLink, 
  FileText, 
  Globe, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SitemapAdminPage() {
  const [xmlSitemap, setXmlSitemap] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadSitemap();
  }, []);

  const loadSitemap = async () => {
    try {
      setIsGenerating(true);
      setError('');
      
      const xml = await SitemapService.getSitemap();
      setXmlSitemap(xml);
      setLastGenerated(new Date().toLocaleString());
    } catch (err) {
      console.error('Error loading sitemap:', err);
      setError('Failed to load sitemap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const refreshSitemap = async () => {
    try {
      setIsGenerating(true);
      setError('');
      
      const xml = await SitemapService.refreshSitemap();
      setXmlSitemap(xml);
      setLastGenerated(new Date().toLocaleString());
    } catch (err) {
      console.error('Error refreshing sitemap:', err);
      setError('Failed to refresh sitemap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSitemap = () => {
    if (!xmlSitemap) return;
    
    const blob = new Blob([xmlSitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const countUrls = (xml: string): number => {
    const matches = xml.match(/<url>/g);
    return matches ? matches.length : 0;
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <SEOHead 
        title="Sitemap Administration - Lookalike Solutions"
        description="Manage and monitor website sitemaps for SEO optimization"
      />
      
      <div className="container mx-auto px-4 py-16 max-w-[100rem]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-dark-gray mb-4">
            Sitemap Administration
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            Monitor and manage your website's XML and HTML sitemaps for optimal SEO performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Auto-Updater Component */}
          <div>
            <SitemapAutoUpdater />
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Link to="/sitemap.xml" target="_blank">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View XML
                  </Button>
                </Link>
                
                <Link to="/sitemap">
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View HTML
                  </Button>
                </Link>
                
                <Button 
                  onClick={downloadSitemap}
                  disabled={!xmlSitemap}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                
                <Button 
                  onClick={refreshSitemap}
                  disabled={isGenerating}
                  className="w-full"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>

              <Separator />

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Total URLs:</span>
                  <Badge variant="secondary">
                    {xmlSitemap ? countUrls(xmlSitemap) : 0}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Last Generated:</span>
                  <span className="text-sm font-mono">
                    {lastGenerated || 'Never'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Status:</span>
                  <Badge variant={xmlSitemap ? 'default' : 'destructive'}>
                    {xmlSitemap ? 'Generated' : 'Not Generated'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mt-8 border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Error</span>
              </div>
              <p className="mt-2 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* XML Preview */}
        {xmlSitemap && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                XML Sitemap Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-dark-gray rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-white font-mono whitespace-pre-wrap">
                  {xmlSitemap.substring(0, 2000)}
                  {xmlSitemap.length > 2000 && '\n... (truncated)'}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Info className="w-5 h-5" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading text-base mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Automatic Updates
                </h3>
                <p className="text-sm text-secondary">
                  Sitemaps are automatically regenerated whenever new blog posts or case studies are created or updated.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-base mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Smart Caching
                </h3>
                <p className="text-sm text-secondary">
                  Sitemaps are cached for 1 hour to improve performance while ensuring fresh content is reflected.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-base mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  SEO Optimized
                </h3>
                <p className="text-sm text-secondary">
                  Both XML and HTML sitemaps are generated with proper priorities, change frequencies, and last modification dates.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-base mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-600" />
                  Dual Format
                </h3>
                <p className="text-sm text-secondary">
                  XML sitemap for search engines and HTML sitemap for users, both automatically synchronized.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}