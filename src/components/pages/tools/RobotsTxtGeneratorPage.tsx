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

interface RobotRule {
  id: string;
  userAgent: string;
  disallow: string[];
  allow: string[];
}

export default function RobotsTxtGeneratorPage() {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [rules, setRules] = useState<RobotRule[]>([
    { id: '1', userAgent: '*', disallow: [], allow: [] }
  ]);
  const [robotsTxt, setRobotsTxt] = useState('');
  const [copied, setCopied] = useState(false);

  const addRule = () => {
    setRules([...rules, { id: Date.now().toString(), userAgent: '*', disallow: [], allow: [] }]);
  };

  const removeRule = (id: string) => {
    if (rules.length > 1) {
      setRules(rules.filter(r => r.id !== id));
    }
  };

  const updateRule = (id: string, field: string, value: any) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addDisallow = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, disallow: [...r.disallow, ''] } : r));
  };

  const removeDisallow = (id: string, index: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, disallow: r.disallow.filter((_, i) => i !== index) } : r));
  };

  const updateDisallow = (id: string, index: number, value: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, disallow: r.disallow.map((d, i) => i === index ? value : d) } : r));
  };

  const generateRobotsTxt = () => {
    let txt = '';
    
    rules.forEach(rule => {
      txt += `User-agent: ${rule.userAgent}\n`;
      rule.disallow.forEach(path => {
        if (path.trim()) txt += `Disallow: ${path}\n`;
      });
      rule.allow.forEach(path => {
        if (path.trim()) txt += `Allow: ${path}\n`;
      });
      txt += '\n';
    });

    if (sitemapUrl.trim()) {
      txt += `Sitemap: ${sitemapUrl}\n`;
    }

    setRobotsTxt(txt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(robotsTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadRobotsTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([robotsTxt], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'robots.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Robots.txt Generator - Create SEO Robots File"
        description="Generate a robots.txt file to control how search engines crawl your website. Easy-to-use generator with disallow and allow rules."
        keywords="robots.txt generator, robots file, seo robots, search engine crawler"
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
              Robots.txt Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Create a robots.txt file to tell search engines which pages to crawl and which to ignore.
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
                <CardTitle className="text-2xl font-heading">Configure Your Robots.txt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-heading text-dark-gray mb-2 block">Sitemap URL (Optional)</label>
                  <Input
                    placeholder="https://example.com/sitemap.xml"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    className="border-light-gray"
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-heading text-dark-gray mb-4">Crawler Rules</h3>
                  <div className="space-y-6 max-h-[600px] overflow-y-auto">
                    {rules.map((rule, ruleIndex) => (
                      <div key={rule.id} className="p-4 border border-light-gray rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-heading text-secondary">Rule {ruleIndex + 1}</span>
                          {rules.length > 1 && (
                            <button
                              onClick={() => removeRule(rule.id)}
                              className="text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-heading text-secondary mb-1 block">User-Agent</label>
                          <Input
                            placeholder="* (for all bots) or specific bot name"
                            value={rule.userAgent}
                            onChange={(e) => updateRule(rule.id, 'userAgent', e.target.value)}
                            className="border-light-gray"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-heading text-secondary">Disallow Paths</label>
                            <button
                              onClick={() => addDisallow(rule.id)}
                              className="text-primary hover:text-primary/80 transition-colors text-xs font-heading"
                            >
                              + Add Path
                            </button>
                          </div>
                          <div className="space-y-2">
                            {rule.disallow.map((path, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  placeholder="/admin, /private, etc."
                                  value={path}
                                  onChange={(e) => updateDisallow(rule.id, index, e.target.value)}
                                  className="border-light-gray flex-1"
                                />
                                <button
                                  onClick={() => removeDisallow(rule.id, index)}
                                  className="text-destructive hover:text-destructive/80 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={addRule}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Rule
                </Button>
                <Button
                  onClick={generateRobotsTxt}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                >
                  Generate Robots.txt
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          {robotsTxt && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Generated Robots.txt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-light-gray rounded-lg p-6 font-mono text-sm text-dark-gray overflow-x-auto max-h-[400px] overflow-y-auto">
                    <pre>{robotsTxt}</pre>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy Text'}
                    </Button>
                    <Button
                      onClick={downloadRobotsTxt}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download robots.txt
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
