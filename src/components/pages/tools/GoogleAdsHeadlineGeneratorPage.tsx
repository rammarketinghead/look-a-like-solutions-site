import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, Zap, RefreshCw } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface AdCopy {
  headlines: string[];
  descriptions: string[];
}

export default function GoogleAdsHeadlineGeneratorPage() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [adCopy, setAdCopy] = useState<AdCopy | null>(null);
  const [copied, setCopied] = useState(false);

  const generateAdCopy = () => {
    if (!productName.trim()) return;

    const headlines = [
      `${productName} - Best Quality Online`,
      `Get ${productName} Today - Limited Offer`,
      `${productName} for Everyone - Shop Now`,
      `Premium ${productName} at Great Prices`,
      `${productName} - Trusted by Thousands`,
      `Save on ${productName} - Order Now`,
      `${productName} - Fast & Free Shipping`,
      `Discover ${productName} - Your Solution`,
      `${productName} - Quality You Can Trust`,
      `${productName} - Exclusive Deals Inside`,
      `Buy ${productName} - Best Prices Guaranteed`,
      `${productName} - Transform Your Experience`
    ];

    const descriptions = [
      `Explore our wide selection of ${productName}. High quality, affordable prices, and fast delivery. Shop now and save!`,
      `Looking for ${productName}? We offer the best selection with unbeatable prices. Free shipping on orders over $50.`,
      `Discover premium ${productName} designed for ${targetAudience || 'you'}. Quality guaranteed. Order today!`,
      `Get the best ${productName} online. Expert reviews, fast shipping, and 100% satisfaction guarantee.`,
      `Shop ${productName} with confidence. Trusted by customers worldwide. Special discounts available now.`,
      `Find the perfect ${productName} for your needs. Browse our collection and save up to 40% today.`,
      `${productName} made easy. Simple ordering, fast delivery, and excellent customer service. Shop now!`,
      `Upgrade to premium ${productName}. See why customers love us. Limited time offer - buy today!`
    ];

    setAdCopy({
      headlines: headlines.slice(0, 6),
      descriptions: descriptions.slice(0, 4)
    });
  };

  const copyToClipboard = () => {
    if (!adCopy) return;
    const text = `Headlines:\n${adCopy.headlines.join('\n')}\n\nDescriptions:\n${adCopy.descriptions.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAdCopy = () => {
    if (!adCopy) return;
    const text = `Google Ads Copy for: ${productName}\n\nHeadlines:\n${adCopy.headlines.join('\n')}\n\nDescriptions:\n${adCopy.descriptions.join('\n')}`;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'google-ads-copy.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Google Ads Headline & Description Generator"
        description="Generate compelling Google Ads headlines and descriptions. Create high-converting ad copy for your Google Ads campaigns."
        keywords="google ads generator, ad copy generator, headline generator, google ads headlines, ad description"
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
              Google Ads Headline & Description Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Generate compelling headlines and descriptions for your Google Ads campaigns. Create high-converting ad copy in seconds.
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Your Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Product/Service Name *</label>
                    <Input
                      placeholder="e.g., Premium Coffee Maker, Digital Marketing Course"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="border-light-gray"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Product Description</label>
                    <Textarea
                      placeholder="Describe your product or service briefly..."
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="border-light-gray min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Target Audience</label>
                    <Input
                      placeholder="e.g., busy professionals, students, home owners"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="border-light-gray"
                    />
                  </div>
                  <Button
                    onClick={generateAdCopy}
                    disabled={!productName.trim()}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Generate Ad Copy
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm font-heading text-blue-900">Google Ads Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-xs font-paragraph text-blue-800">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Headlines: Max 30 characters each</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Descriptions: Max 90 characters each</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Use action words and numbers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Test multiple variations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Output Section */}
          {adCopy && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <div className="space-y-8">
                {/* Headlines */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading">Headlines (6 variations)</CardTitle>
                    <p className="text-sm font-paragraph text-secondary mt-2">Max 30 characters each</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {adCopy.headlines.map((headline, index) => (
                        <div
                          key={index}
                          className="p-4 bg-light-gray rounded-lg flex justify-between items-start"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-paragraph text-secondary mb-1">Headline {index + 1}</p>
                            <p className="text-base font-heading text-dark-gray">{headline}</p>
                            <p className="text-xs font-paragraph text-secondary mt-1">{headline.length} characters</p>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(headline);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 1500);
                            }}
                            className="ml-4 text-primary hover:text-primary/80 transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Descriptions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading">Descriptions (4 variations)</CardTitle>
                    <p className="text-sm font-paragraph text-secondary mt-2">Max 90 characters each</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {adCopy.descriptions.map((description, index) => (
                        <div
                          key={index}
                          className="p-4 bg-light-gray rounded-lg flex justify-between items-start"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-paragraph text-secondary mb-1">Description {index + 1}</p>
                            <p className="text-base font-heading text-dark-gray">{description}</p>
                            <p className="text-xs font-paragraph text-secondary mt-1">{description.length} characters</p>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(description);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 1500);
                            }}
                            className="ml-4 text-primary hover:text-primary/80 transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? 'Copied!' : 'Copy All'}
                  </Button>
                  <Button
                    onClick={downloadAdCopy}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={() => {
                      setAdCopy(null);
                      setProductName('');
                      setProductDescription('');
                      setTargetAudience('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Start Over
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
