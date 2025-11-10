import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft, Smartphone, Monitor, RefreshCw, Zap, CheckCircle, AlertTriangle, Info, Lightbulb } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SERPSnippetPreviewPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [domain, setDomain] = useState('');

  const getCharacterColor = (count: number, limit: number) => {
    const percentage = (count / limit) * 100;
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const formatUrl = (inputUrl: string, inputDomain: string) => {
    if (inputUrl) return inputUrl;
    if (inputDomain) return `https://${inputDomain.replace(/^https?:\/\//, '')}`;
    return 'https://example.com';
  };

  const extractDomain = (inputUrl: string, inputDomain: string) => {
    if (inputDomain) return inputDomain.replace(/^https?:\/\//, '');
    if (inputUrl) {
      try {
        return new URL(inputUrl).hostname;
      } catch {
        return 'example.com';
      }
    }
    return 'example.com';
  };

  const SERPPreview = ({ isMobile = false }: { isMobile?: boolean }) => {
    const titleLimit = isMobile ? 50 : 60;
    const descLimit = isMobile ? 120 : 160;
    const displayTitle = title || 'Your Page Title Here - Brand Name';
    const displayDescription = description || 'Your meta description appears here. This is what users see in search results, so make it compelling and informative to encourage clicks.';
    const displayUrl = formatUrl(url, domain);
    const displayDomain = extractDomain(url, domain);

    return (
      <div className={`bg-white border rounded-lg p-4 ${isMobile ? 'max-w-sm' : 'max-w-2xl'}`}>
        <div className="space-y-1">
          {/* URL */}
          <div className="flex items-center text-sm">
            <div className="w-4 h-4 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
            <span className="text-green-700 truncate">{displayUrl}</span>
          </div>
          
          {/* Title */}
          <h3 className={`text-blue-600 hover:underline cursor-pointer font-medium leading-tight ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {truncateText(displayTitle, titleLimit)}
          </h3>
          
          {/* Description */}
          <p className={`text-gray-600 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
            {truncateText(displayDescription, descLimit)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-cyan-50 to-cyan-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mr-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  SERP Snippet Preview Tool
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Preview how your pages will appear in Google search results
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input and Preview Section */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-dark-gray">
                  Enter Your Page Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Page Title
                    </label>
                    <Textarea
                      placeholder="Enter your page title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="min-h-[80px] resize-none"
                      maxLength={70}
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span className={getCharacterColor(title.length, 60)}>
                        {title.length}/60 characters (optimal)
                      </span>
                      <span className="text-secondary">
                        {title.length}/70 max
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Meta Description
                    </label>
                    <Textarea
                      placeholder="Enter your meta description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px] resize-none"
                      maxLength={170}
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span className={getCharacterColor(description.length, 160)}>
                        {description.length}/160 characters (optimal)
                      </span>
                      <span className="text-secondary">
                        {description.length}/170 max
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-dark-gray mb-2">
                      Page URL
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
                      Domain (if URL not provided)
                    </label>
                    <Input
                      type="text"
                      placeholder="example.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-paragraph text-dark-gray font-medium mb-1">Preview Tips</h4>
                        <p className="text-sm font-paragraph text-secondary">
                          The preview updates in real-time as you type. Test different variations to see how they appear in search results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-dark-gray flex items-center">
                    <Monitor className="mr-2 h-5 w-5" />
                    Desktop Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <SERPPreview isMobile={false} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-dark-gray flex items-center">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Mobile Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-6 rounded-lg flex justify-center">
                    <SERPPreview isMobile={true} />
                  </div>
                </CardContent>
              </Card>

              {/* Character Count Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-dark-gray">
                    Optimization Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-secondary">Title Length</span>
                      <div className="flex items-center">
                        {title.length <= 60 ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        )}
                        <span className={getCharacterColor(title.length, 60)}>
                          {title.length}/60
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-secondary">Description Length</span>
                      <div className="flex items-center">
                        {description.length <= 160 ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        )}
                        <span className={getCharacterColor(description.length, 160)}>
                          {description.length}/160
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-secondary">URL Format</span>
                      <div className="flex items-center">
                        {(url || domain) ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        )}
                        <span className="font-paragraph text-secondary">
                          {(url || domain) ? 'Valid' : 'Add URL'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading text-dark-gray mb-4">
                SERP Snippet Optimization Tips
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Create compelling snippets that drive more clicks from search results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Write Compelling Titles</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Include your primary keyword and create curiosity. Use numbers, questions, or power words to stand out.
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
                      <h3 className="font-heading text-dark-gray mb-2">Include Call-to-Actions</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use action words in descriptions: "Learn", "Discover", "Get", "Start" to encourage clicks.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Eye className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Test Mobile View</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Mobile searches show fewer characters. Ensure your key message appears in the first 50 characters.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <RefreshCw className="h-6 w-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">A/B Test Variations</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Create multiple versions and test which ones get higher click-through rates in search results.
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
            Need Help Optimizing Your Search Presence?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our SEO experts can help you create compelling meta tags and improve your search rankings.
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