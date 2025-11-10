import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Copy, RefreshCw, Zap, CheckCircle, AlertTriangle, Info, Lightbulb, Target, TrendingUp } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface MetaResult {
  titles: string[];
  descriptions: string[];
}

export default function MetaTitleDescriptionGeneratorPage() {
  const [keyword, setKeyword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [pageType, setPageType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<MetaResult | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateMeta = async () => {
    if (!keyword.trim()) return;
    
    setIsGenerating(true);
    setHasGenerated(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate meta titles and descriptions
    const titles = [
      `${keyword} | ${businessName || 'Your Business'} - Expert Solutions`,
      `Best ${keyword} Services | ${businessName || 'Professional'} ${pageType || 'Solutions'}`,
      `${keyword} - ${businessName || 'Top'} ${pageType || 'Services'} & Solutions`,
      `Professional ${keyword} | ${businessName || 'Expert'} ${pageType || 'Services'}`,
      `${keyword} Solutions | ${businessName || 'Leading'} ${pageType || 'Provider'}`
    ];
    
    const descriptions = [
      `Get expert ${keyword.toLowerCase()} services from ${businessName || 'our professional team'}. ${pageType ? `Specialized ${pageType.toLowerCase()} solutions` : 'Proven results'} with competitive pricing. Contact us today for a free consultation.`,
      `Looking for reliable ${keyword.toLowerCase()}? ${businessName || 'We'} provide top-quality ${pageType ? pageType.toLowerCase() : 'services'} with guaranteed results. Get started with our expert team today.`,
      `Transform your business with our ${keyword.toLowerCase()} expertise. ${businessName || 'Our team'} delivers ${pageType ? `custom ${pageType.toLowerCase()} solutions` : 'exceptional results'} that drive growth and success.`,
      `Discover why ${businessName || 'thousands of clients'} trust us for ${keyword.toLowerCase()}. ${pageType ? `Professional ${pageType.toLowerCase()} services` : 'Expert solutions'} with proven track record and 24/7 support.`,
      `${keyword} made simple. ${businessName || 'Our experienced team'} offers ${pageType ? `comprehensive ${pageType.toLowerCase()} services` : 'complete solutions'} to help your business succeed. Get your free quote now.`
    ];
    
    setResults({
      titles: titles.map(title => title.substring(0, 60)),
      descriptions: descriptions.map(desc => desc.substring(0, 160))
    });
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCharacterColor = (count: number, limit: number) => {
    const percentage = (count / limit) * 100;
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-indigo-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  Meta Title & Description Generator
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Create SEO-optimized meta titles and descriptions that improve click-through rates
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input Form */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center font-heading text-dark-gray">
                Enter Your Page Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Primary Keyword *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., digital marketing services"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Business Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Look A Like Solutions"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Page Type
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Agency, Services, Products, Blog"
                    value={pageType}
                    onChange={(e) => setPageType(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button 
                  onClick={generateMeta}
                  disabled={isGenerating || !keyword.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </div>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate Meta Tags
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {hasGenerated && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            {isGenerating ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-heading text-dark-gray mb-2">Creating Meta Tags...</h3>
                <p className="font-paragraph text-secondary">Generating SEO-optimized titles and descriptions</p>
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
                    Generated Meta Tags
                  </h2>
                  <p className="font-paragraph text-secondary">
                    SEO-optimized titles and descriptions ready to use
                  </p>
                </div>

                <Tabs defaultValue="titles" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                    <TabsTrigger value="titles">Meta Titles</TabsTrigger>
                    <TabsTrigger value="descriptions">Meta Descriptions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="titles" className="mt-6">
                    <div className="max-w-4xl mx-auto">
                      <div className="mb-6">
                        <div className="flex items-center justify-center mb-4">
                          <Info className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-sm font-paragraph text-secondary">
                            Optimal length: 50-60 characters
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {results.titles.map((title, index) => (
                          <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-heading text-dark-gray">Title Option {index + 1}</h3>
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm ${getCharacterColor(title.length, 60)}`}>
                                    {title.length}/60
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyToClipboard(title)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded border-l-4 border-l-primary">
                                <p className="font-paragraph text-dark-gray text-lg">{title}</p>
                              </div>
                              {title.length > 60 && (
                                <div className="mt-2 flex items-center text-sm text-red-600">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Title may be truncated in search results
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="descriptions" className="mt-6">
                    <div className="max-w-4xl mx-auto">
                      <div className="mb-6">
                        <div className="flex items-center justify-center mb-4">
                          <Info className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-sm font-paragraph text-secondary">
                            Optimal length: 150-160 characters
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {results.descriptions.map((description, index) => (
                          <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-heading text-dark-gray">Description Option {index + 1}</h3>
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm ${getCharacterColor(description.length, 160)}`}>
                                    {description.length}/160
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyToClipboard(description)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded border-l-4 border-l-green-500">
                                <p className="font-paragraph text-dark-gray">{description}</p>
                              </div>
                              {description.length > 160 && (
                                <div className="mt-2 flex items-center text-sm text-red-600">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Description may be truncated in search results
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Generate More Button */}
                <div className="text-center mt-8">
                  <Button
                    onClick={generateMeta}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New Variations
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Best Practices */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading text-dark-gray mb-4">
                Meta Tag Best Practices
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Follow these guidelines to create effective meta tags
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Include Primary Keywords</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Place your main keyword near the beginning of both title and description for better SEO impact.
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
                      <h3 className="font-heading text-dark-gray mb-2">Write for Users</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Create compelling, readable meta tags that encourage clicks, not just keyword-stuffed text.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <TrendingUp className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Unique for Each Page</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Every page should have unique meta titles and descriptions that reflect the specific content.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Lightbulb className="h-6 w-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Include Call-to-Action</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use action words in descriptions to encourage clicks: "Get", "Discover", "Learn", "Start".
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
            Need Professional SEO Help?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our SEO experts can help you optimize your entire website for better search rankings and traffic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get SEO Consultation
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