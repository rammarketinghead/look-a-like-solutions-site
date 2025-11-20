import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface AltTextResult {
  shortAlt: string;
  mediumAlt: string;
  longAlt: string;
  htmlCode: string;
}

export default function ImageAltTextGeneratorPage() {
  const [imageDescription, setImageDescription] = useState('');
  const [context, setContext] = useState('');
  const [altText, setAltText] = useState<AltTextResult | null>(null);
  const [copied, setCopied] = useState(false);

  const generateAltText = () => {
    if (!imageDescription.trim()) return;

    const desc = imageDescription.trim();
    const ctx = context.trim();

    // Generate different lengths of alt text
    const shortAlt = desc.length > 50 ? desc.substring(0, 50) + '...' : desc;
    const mediumAlt = `${desc}${ctx ? ` - ${ctx}` : ''}`;
    const longAlt = `${desc}. ${ctx ? `Context: ${ctx}. ` : ''}This image is relevant to the page content and helps users understand the topic better.`;

    const htmlCode = `<img src="image.jpg" alt="${mediumAlt}" title="${desc}" />`;

    setAltText({
      shortAlt,
      mediumAlt,
      longAlt,
      htmlCode
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAltText = () => {
    if (!altText) return;
    const text = `Image Alt Text Variations\n\nShort Alt Text:\n${altText.shortAlt}\n\nMedium Alt Text:\n${altText.mediumAlt}\n\nLong Alt Text:\n${altText.longAlt}\n\nHTML Code:\n${altText.htmlCode}`;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'alt-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Image Alt Text Generator - Create SEO Alt Text"
        description="Generate SEO-friendly alt text for your images. Create accessible alt text that improves SEO and user experience."
        keywords="alt text generator, image alt text, alt text seo, accessibility, image description"
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
              Image Alt Text Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Generate SEO-friendly alt text for your images. Improve accessibility and search engine rankings with descriptive alt text.
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
                  <CardTitle className="text-2xl font-heading">Describe Your Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Image Description *</label>
                    <Textarea
                      placeholder="Describe what you see in the image. Be specific and descriptive..."
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      className="border-light-gray min-h-[120px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Page Context (Optional)</label>
                    <Input
                      placeholder="e.g., 'for a blog post about digital marketing' or 'product image for e-commerce'"
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      className="border-light-gray"
                    />
                  </div>
                  <Button
                    onClick={generateAltText}
                    disabled={!imageDescription.trim()}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Generate Alt Text
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm font-heading text-blue-900">Alt Text Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-xs font-paragraph text-blue-800">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Be descriptive and specific</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Keep it under 125 characters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Include relevant keywords</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Don't start with "image of"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Output Section */}
          {altText && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <div className="space-y-6">
                {/* Alt Text Variations */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading">Alt Text Variations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-light-gray rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-heading text-secondary mb-1">Short Alt Text</p>
                          <p className="text-base font-heading text-dark-gray">{altText.shortAlt}</p>
                          <p className="text-xs font-paragraph text-secondary mt-1">{altText.shortAlt.length} characters</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(altText.shortAlt)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-light-gray rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-heading text-secondary mb-1">Medium Alt Text (Recommended)</p>
                          <p className="text-base font-heading text-dark-gray">{altText.mediumAlt}</p>
                          <p className="text-xs font-paragraph text-secondary mt-1">{altText.mediumAlt.length} characters</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(altText.mediumAlt)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-light-gray rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-heading text-secondary mb-1">Long Alt Text</p>
                          <p className="text-base font-heading text-dark-gray">{altText.longAlt}</p>
                          <p className="text-xs font-paragraph text-secondary mt-1">{altText.longAlt.length} characters</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(altText.longAlt)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* HTML Code */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading">HTML Code</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-light-gray rounded-lg p-6 font-mono text-sm text-dark-gray overflow-x-auto">
                      <pre>{altText.htmlCode}</pre>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(altText.htmlCode)}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy HTML Code'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={downloadAltText}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                  <Button
                    onClick={() => {
                      setAltText(null);
                      setImageDescription('');
                      setContext('');
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
