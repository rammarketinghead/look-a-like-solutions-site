import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Link2, ArrowLeft, Copy, Download, RefreshCw, Zap, CheckCircle, Info, BarChart3, Target } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface UTMLink {
  originalUrl: string;
  utmUrl: string;
  parameters: {
    source: string;
    medium: string;
    campaign: string;
    term?: string;
    content?: string;
  };
}

export default function UTMLinkBuilderPage() {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState<UTMLink[]>([]);

  const mediumOptions = [
    'email', 'social', 'cpc', 'banner', 'affiliate', 'referral', 
    'direct', 'organic', 'display', 'video', 'audio', 'sms'
  ];

  const sourceOptions = [
    'google', 'facebook', 'twitter', 'linkedin', 'instagram', 'youtube',
    'newsletter', 'blog', 'website', 'partner', 'influencer'
  ];

  const generateUTMLink = () => {
    if (!url.trim() || !source.trim() || !medium.trim() || !campaign.trim()) return;

    const baseUrl = url.includes('?') ? url : url + '?';
    const separator = url.includes('?') ? '&' : '';
    
    let utmParams = `${separator}utm_source=${encodeURIComponent(source)}`;
    utmParams += `&utm_medium=${encodeURIComponent(medium)}`;
    utmParams += `&utm_campaign=${encodeURIComponent(campaign)}`;
    
    if (term.trim()) {
      utmParams += `&utm_term=${encodeURIComponent(term)}`;
    }
    
    if (content.trim()) {
      utmParams += `&utm_content=${encodeURIComponent(content)}`;
    }

    const utmUrl = baseUrl + utmParams;

    const newLink: UTMLink = {
      originalUrl: url,
      utmUrl,
      parameters: {
        source,
        medium,
        campaign,
        term: term || undefined,
        content: content || undefined
      }
    };

    setGeneratedLinks([newLink, ...generatedLinks]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearForm = () => {
    setUrl('');
    setSource('');
    setMedium('');
    setCampaign('');
    setTerm('');
    setContent('');
  };

  const exportLinks = () => {
    if (generatedLinks.length === 0) return;

    const csvContent = [
      ['Original URL', 'UTM URL', 'Source', 'Medium', 'Campaign', 'Term', 'Content'],
      ...generatedLinks.map(link => [
        link.originalUrl,
        link.utmUrl,
        link.parameters.source,
        link.parameters.medium,
        link.parameters.campaign,
        link.parameters.term || '',
        link.parameters.content || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'utm-links.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-pink-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-6">
                <Link2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  UTM Link Builder
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Create trackable UTM links for your marketing campaigns
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-dark-gray">
                  Build Your UTM Link
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Website URL *
                    </label>
                    <Input
                      type="url"
                      placeholder="https://example.com/page"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Campaign Source * <span className="text-secondary">(utm_source)</span>
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="e.g., google, facebook, newsletter"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="h-12 flex-1"
                      />
                      <Select value={source} onValueChange={setSource}>
                        <SelectTrigger className="w-32 h-12">
                          <SelectValue placeholder="Quick" />
                        </SelectTrigger>
                        <SelectContent>
                          {sourceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Campaign Medium * <span className="text-secondary">(utm_medium)</span>
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="e.g., email, social, cpc"
                        value={medium}
                        onChange={(e) => setMedium(e.target.value)}
                        className="h-12 flex-1"
                      />
                      <Select value={medium} onValueChange={setMedium}>
                        <SelectTrigger className="w-32 h-12">
                          <SelectValue placeholder="Quick" />
                        </SelectTrigger>
                        <SelectContent>
                          {mediumOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Campaign Name * <span className="text-secondary">(utm_campaign)</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., summer_sale, product_launch"
                      value={campaign}
                      onChange={(e) => setCampaign(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Campaign Term <span className="text-secondary">(utm_term) - Optional</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., digital+marketing"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Campaign Content <span className="text-secondary">(utm_content) - Optional</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., header_link, sidebar_ad"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={generateUTMLink}
                      disabled={!url.trim() || !source.trim() || !medium.trim() || !campaign.trim()}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Generate UTM Link
                    </Button>
                    <Button 
                      onClick={clearForm}
                      variant="outline"
                      className="h-12"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview and Info */}
            <div className="space-y-6">
              {/* Live Preview */}
              {(url || source || medium || campaign) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-dark-gray">
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-paragraph text-secondary mb-2">Generated URL:</p>
                      <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                        {url && source && medium && campaign ? (
                          <>
                            {url}{url.includes('?') ? '&' : '?'}utm_source={encodeURIComponent(source)}&utm_medium={encodeURIComponent(medium)}&utm_campaign={encodeURIComponent(campaign)}
                            {term && `&utm_term=${encodeURIComponent(term)}`}
                            {content && `&utm_content=${encodeURIComponent(content)}`}
                          </>
                        ) : (
                          <span className="text-gray-400">Fill in required fields to see preview</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* UTM Parameters Guide */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-dark-gray">
                    UTM Parameters Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-paragraph text-dark-gray font-medium mb-1">Source (Required)</h4>
                      <p className="text-sm font-paragraph text-secondary">
                        Identifies where the traffic comes from (e.g., google, facebook, newsletter)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-paragraph text-dark-gray font-medium mb-1">Medium (Required)</h4>
                      <p className="text-sm font-paragraph text-secondary">
                        Identifies the marketing medium (e.g., email, social, cpc, banner)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-paragraph text-dark-gray font-medium mb-1">Campaign (Required)</h4>
                      <p className="text-sm font-paragraph text-secondary">
                        Identifies the specific campaign (e.g., summer_sale, product_launch)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-paragraph text-dark-gray font-medium mb-1">Term (Optional)</h4>
                      <p className="text-sm font-paragraph text-secondary">
                        Identifies paid search keywords (mainly for Google Ads)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-paragraph text-dark-gray font-medium mb-1">Content (Optional)</h4>
                      <p className="text-sm font-paragraph text-secondary">
                        Differentiates similar content or links (e.g., header_link, footer_link)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Generated Links */}
      {generatedLinks.length > 0 && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-heading text-dark-gray mb-2">
                    Generated UTM Links
                  </h2>
                  <p className="font-paragraph text-secondary">
                    {generatedLinks.length} link{generatedLinks.length !== 1 ? 's' : ''} ready for tracking
                  </p>
                </div>
                <Button
                  onClick={exportLinks}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              <div className="space-y-4">
                {generatedLinks.map((link, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-heading text-dark-gray mb-2">
                              Campaign: {link.parameters.campaign}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline">
                                Source: {link.parameters.source}
                              </Badge>
                              <Badge variant="outline">
                                Medium: {link.parameters.medium}
                              </Badge>
                              {link.parameters.term && (
                                <Badge variant="outline">
                                  Term: {link.parameters.term}
                                </Badge>
                              )}
                              {link.parameters.content && (
                                <Badge variant="outline">
                                  Content: {link.parameters.content}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(link.utmUrl)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-paragraph text-secondary mb-2">UTM Link:</p>
                          <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                            {link.utmUrl}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Best Practices */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading text-dark-gray mb-4">
                UTM Tracking Best Practices
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Follow these guidelines for effective campaign tracking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Be Consistent</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use consistent naming conventions across all campaigns. Create a style guide for your team.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Use Lowercase</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Always use lowercase letters to avoid duplicate entries in analytics reports.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <BarChart3 className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Track Everything</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Add UTM parameters to all external links: social media, email campaigns, ads, and partnerships.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Info className="h-6 w-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Keep It Simple</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use clear, descriptive names that your team can easily understand and remember.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-3xl font-heading text-background mb-4">
            Need Help with Campaign Tracking?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our analytics experts can help you set up comprehensive tracking and reporting for all your marketing campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get Analytics Setup
              </Button>
            </Link>
            <Link to="/services/data-analytics">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4"
              >
                View Analytics Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}