import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface URLEntry {
  id: string;
  url: string;
  priority: string;
  changefreq: string;
}

export default function XMLSitemapGeneratorPage() {
  const [urls, setUrls] = useState<URLEntry[]>([
    { id: '1', url: '', priority: '1.0', changefreq: 'weekly' }
  ]);
  const [sitemapXml, setSitemapXml] = useState('');
  const [copied, setCopied] = useState(false);

  const addUrl = () => {
    setUrls([...urls, { id: Date.now().toString(), url: '', priority: '0.8', changefreq: 'weekly' }]);
  };

  const removeUrl = (id: string) => {
    if (urls.length > 1) {
      setUrls(urls.filter(u => u.id !== id));
    }
  };

  const updateUrl = (id: string, field: string, value: string) => {
    setUrls(urls.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const generateSitemap = () => {
    const validUrls = urls.filter(u => u.url.trim());
    if (validUrls.length === 0) return;

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    validUrls.forEach(entry => {
      xml += '  <url>\n';
      xml += `    <loc>${entry.url}</loc>\n`;
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      xml += `    <priority>${entry.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    setSitemapXml(xml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSitemap = () => {
    const element = document.createElement('a');
    const file = new Blob([sitemapXml], { type: 'application/xml' });
    element.href = URL.createObjectURL(file);
    element.download = 'sitemap.xml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="XML Sitemap Generator - Create SEO Sitemaps"
        description="Generate XML sitemaps for your website. Add URLs, set priorities and change frequencies for better SEO."
        keywords="sitemap generator, xml sitemap, seo sitemap, sitemap creator"
        type="website"
      />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
          >
            <Link to="/tools" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
            <h1 className="text-4xl lg:text-5xl font-heading text-dark-gray mb-4">
              XML Sitemap Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Create an XML sitemap for your website to help search engines discover and index all your pages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Add Your URLs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {urls.map((entry, index) => (
                    <div key={entry.id} className="p-4 border border-light-gray rounded-lg space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-heading text-secondary">URL {index + 1}</span>
                        {urls.length > 1 && (
                          <button
                            onClick={() => removeUrl(entry.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <Input
                        placeholder="https://example.com/page"
                        value={entry.url}
                        onChange={(e) => updateUrl(entry.id, 'url', e.target.value)}
                        className="border-light-gray"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-heading text-secondary mb-1 block">Priority</label>
                          <select
                            value={entry.priority}
                            onChange={(e) => updateUrl(entry.id, 'priority', e.target.value)}
                            className="w-full px-3 py-2 border border-light-gray rounded-md text-sm font-paragraph"
                          >
                            <option value="1.0">1.0 (Highest)</option>
                            <option value="0.9">0.9</option>
                            <option value="0.8">0.8</option>
                            <option value="0.7">0.7</option>
                            <option value="0.6">0.6</option>
                            <option value="0.5">0.5 (Medium)</option>
                            <option value="0.4">0.4</option>
                            <option value="0.3">0.3</option>
                            <option value="0.2">0.2</option>
                            <option value="0.1">0.1 (Lowest)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-heading text-secondary mb-1 block">Change Frequency</label>
                          <select
                            value={entry.changefreq}
                            onChange={(e) => updateUrl(entry.id, 'changefreq', e.target.value)}
                            className="w-full px-3 py-2 border border-light-gray rounded-md text-sm font-paragraph"
                          >
                            <option value="always">Always</option>
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="never">Never</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={addUrl}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another URL
                </Button>
                <Button
                  onClick={generateSitemap}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                >
                  Generate Sitemap
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          {sitemapXml && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Generated Sitemap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-light-gray rounded-lg p-6 font-mono text-sm text-dark-gray overflow-x-auto max-h-[400px] overflow-y-auto">
                    <pre>{sitemapXml}</pre>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy XML'}
                    </Button>
                    <Button
                      onClick={downloadSitemap}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download sitemap.xml
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
