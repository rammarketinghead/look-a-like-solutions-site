import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Link2, ArrowLeft, ExternalLink, TrendingUp, Shield, AlertTriangle, CheckCircle, BarChart3, Globe } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface BacklinkData {
  domain: string;
  domainAuthority: number;
  totalBacklinks: number;
  referringDomains: number;
  topBacklinks: Array<{
    url: string;
    domain: string;
    authority: number;
    anchorText: string;
    linkType: 'dofollow' | 'nofollow';
    firstSeen: string;
  }>;
  anchorTexts: Array<{
    text: string;
    count: number;
    percentage: number;
  }>;
  domainTypes: {
    dofollow: number;
    nofollow: number;
  };
}

export default function BacklinkCheckerPage() {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<BacklinkData | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const analyzeBacklinks = async () => {
    if (!domain.trim()) return;
    
    setIsAnalyzing(true);
    setHasAnalyzed(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock backlink data
    const mockData: BacklinkData = {
      domain: domain.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      domainAuthority: Math.floor(Math.random() * 40) + 30, // 30-70
      totalBacklinks: Math.floor(Math.random() * 5000) + 500,
      referringDomains: Math.floor(Math.random() * 200) + 50,
      topBacklinks: [
        {
          url: 'https://example-blog.com/digital-marketing-guide',
          domain: 'example-blog.com',
          authority: 65,
          anchorText: 'digital marketing services',
          linkType: 'dofollow',
          firstSeen: '2024-01-15'
        },
        {
          url: 'https://industry-news.com/top-agencies',
          domain: 'industry-news.com',
          authority: 58,
          anchorText: 'Look A Like Solutions',
          linkType: 'dofollow',
          firstSeen: '2024-02-03'
        },
        {
          url: 'https://business-directory.com/marketing',
          domain: 'business-directory.com',
          authority: 45,
          anchorText: 'click here',
          linkType: 'nofollow',
          firstSeen: '2024-01-28'
        },
        {
          url: 'https://marketing-forum.com/discussion',
          domain: 'marketing-forum.com',
          authority: 52,
          anchorText: 'SEO experts',
          linkType: 'dofollow',
          firstSeen: '2024-02-10'
        },
        {
          url: 'https://tech-review.com/tools',
          domain: 'tech-review.com',
          authority: 61,
          anchorText: domain.replace(/^https?:\/\//, '').replace(/\/$/, ''),
          linkType: 'dofollow',
          firstSeen: '2024-01-20'
        }
      ],
      anchorTexts: [
        { text: 'digital marketing services', count: 45, percentage: 25 },
        { text: domain.replace(/^https?:\/\//, '').replace(/\/$/, ''), count: 38, percentage: 21 },
        { text: 'Look A Like Solutions', count: 32, percentage: 18 },
        { text: 'click here', count: 28, percentage: 16 },
        { text: 'SEO experts', count: 22, percentage: 12 },
        { text: 'marketing agency', count: 15, percentage: 8 }
      ],
      domainTypes: {
        dofollow: 75,
        nofollow: 25
      }
    };
    
    setResults(mockData);
    setIsAnalyzing(false);
  };

  const getAuthorityColor = (authority: number) => {
    if (authority >= 60) return 'text-green-600';
    if (authority >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAuthorityBadge = (authority: number) => {
    if (authority >= 60) return { text: 'High', color: 'bg-green-100 text-green-800' };
    if (authority >= 40) return { text: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Low', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
          >
            <Link to="/tools" className="inline-flex items-center font-paragraph text-secondary hover:text-primary transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-6">
                <Link2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  Backlink Checker (Basic)
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Analyze your website's backlink profile and discover link opportunities
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input Section */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center font-heading text-dark-gray">
                Enter Domain to Analyze
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="e.g., example.com or https://example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <p className="text-sm font-paragraph text-secondary mt-2">
                    Enter a domain name or full URL to analyze its backlink profile
                  </p>
                </div>
                <Button 
                  onClick={analyzeBacklinks}
                  disabled={isAnalyzing || !domain.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing Backlinks...
                    </div>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analyze Backlinks
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {hasAnalyzed && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            {isAnalyzing ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-heading text-dark-gray mb-2">Analyzing Backlink Profile...</h3>
                <p className="font-paragraph text-secondary">This may take a few moments to complete</p>
              </div>
            ) : results && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading text-dark-gray mb-2">
                    Backlink Analysis for {results.domain}
                  </h2>
                  <p className="font-paragraph text-secondary">
                    Complete backlink profile overview and insights
                  </p>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-heading text-dark-gray mb-2">Domain Authority</h3>
                      <div className={`text-2xl font-heading mb-2 ${getAuthorityColor(results.domainAuthority)}`}>
                        {results.domainAuthority}
                      </div>
                      <Badge className={getAuthorityBadge(results.domainAuthority).color}>
                        {getAuthorityBadge(results.domainAuthority).text}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Link2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-heading text-dark-gray mb-2">Total Backlinks</h3>
                      <div className="text-2xl font-heading text-blue-600 mb-2">
                        {results.totalBacklinks.toLocaleString()}
                      </div>
                      <p className="text-sm font-paragraph text-secondary">
                        All inbound links
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Globe className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-heading text-dark-gray mb-2">Referring Domains</h3>
                      <div className="text-2xl font-heading text-green-600 mb-2">
                        {results.referringDomains.toLocaleString()}
                      </div>
                      <p className="text-sm font-paragraph text-secondary">
                        Unique domains
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-heading text-dark-gray mb-2">Link Quality</h3>
                      <div className="text-2xl font-heading text-purple-600 mb-2">
                        {results.domainTypes.dofollow}%
                      </div>
                      <p className="text-sm font-paragraph text-secondary">
                        Dofollow links
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="backlinks" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                    <TabsTrigger value="backlinks">Top Backlinks</TabsTrigger>
                    <TabsTrigger value="anchors">Anchor Texts</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  </TabsList>

                  <TabsContent value="backlinks" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-dark-gray">
                          Top Backlinks
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {results.topBacklinks.map((backlink, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <a 
                                      href={backlink.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline font-paragraph font-medium mr-2"
                                    >
                                      {backlink.domain}
                                    </a>
                                    <ExternalLink className="h-4 w-4 text-gray-400" />
                                  </div>
                                  <p className="text-sm font-paragraph text-secondary mb-2">
                                    Anchor: "{backlink.anchorText}"
                                  </p>
                                  <p className="text-xs font-paragraph text-secondary">
                                    First seen: {backlink.firstSeen}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className={`text-lg font-heading mb-1 ${getAuthorityColor(backlink.authority)}`}>
                                    {backlink.authority}
                                  </div>
                                  <Badge 
                                    variant={backlink.linkType === 'dofollow' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {backlink.linkType}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="anchors" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-dark-gray">
                          Anchor Text Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {results.anchorTexts.map((anchor, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-paragraph text-dark-gray font-medium">
                                  "{anchor.text}"
                                </span>
                                <div className="text-right">
                                  <span className="text-sm font-paragraph text-secondary">
                                    {anchor.count} links ({anchor.percentage}%)
                                  </span>
                                </div>
                              </div>
                              <Progress value={anchor.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analysis" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-heading text-dark-gray">
                            Link Quality Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-paragraph text-secondary">Dofollow Links</span>
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span className="font-paragraph text-dark-gray font-medium">
                                  {results.domainTypes.dofollow}%
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-paragraph text-secondary">Nofollow Links</span>
                              <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                                <span className="font-paragraph text-dark-gray font-medium">
                                  {results.domainTypes.nofollow}%
                                </span>
                              </div>
                            </div>
                            <div className="pt-4 border-t">
                              <h4 className="font-paragraph text-dark-gray font-medium mb-2">
                                Recommendations:
                              </h4>
                              <ul className="text-sm font-paragraph text-secondary space-y-1">
                                <li>• Focus on acquiring more high-authority backlinks</li>
                                <li>• Diversify anchor text distribution</li>
                                <li>• Monitor for toxic or spammy links</li>
                                <li>• Build relationships with quality domains</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="font-heading text-dark-gray">
                            Domain Authority Breakdown
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className={`text-4xl font-heading mb-2 ${getAuthorityColor(results.domainAuthority)}`}>
                                {results.domainAuthority}
                              </div>
                              <Badge className={getAuthorityBadge(results.domainAuthority).color}>
                                {getAuthorityBadge(results.domainAuthority).text} Authority
                              </Badge>
                            </div>
                            <div className="pt-4 border-t">
                              <h4 className="font-paragraph text-dark-gray font-medium mb-2">
                                Authority Scale:
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="font-paragraph text-secondary">0-30</span>
                                  <span className="text-red-600">Low Authority</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-paragraph text-secondary">31-59</span>
                                  <span className="text-yellow-600">Medium Authority</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-paragraph text-secondary">60-100</span>
                                  <span className="text-green-600">High Authority</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="py-8 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-dark-gray mb-2">Basic Analysis Disclaimer</h3>
                  <p className="font-paragraph text-secondary text-sm">
                    This is a basic backlink analysis tool that provides sample data for demonstration purposes. 
                    For comprehensive backlink analysis with real-time data, professional SEO tools and expert analysis are recommended.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-3xl font-heading text-background mb-4">
            Need Professional Backlink Analysis?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our SEO experts can provide comprehensive backlink audits and help you build high-quality link profiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get Professional Analysis
              </Button>
            </Link>
            <Link to="/services/seo">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4"
              >
                View SEO Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}