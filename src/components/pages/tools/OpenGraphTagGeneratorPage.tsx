import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, Share2 } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function OpenGraphTagGeneratorPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    imageUrl: '',
    type: 'website',
    author: ''
  });
  const [generatedTags, setGeneratedTags] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    const tags = `<!-- Open Graph Tags -->
<meta property="og:title" content="${formData.title || 'Your Page Title'}" />
<meta property="og:description" content="${formData.description || 'Your page description'}" />
<meta property="og:url" content="${formData.url || 'https://example.com'}" />
<meta property="og:type" content="${formData.type}" />
${formData.imageUrl ? `<meta property="og:image" content="${formData.imageUrl}" />` : ''}
${formData.author ? `<meta property="og:author" content="${formData.author}" />` : ''}
<meta property="og:site_name" content="Your Site Name" />`;
    setGeneratedTags(tags);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTags = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedTags], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'og-tags.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Open Graph Tag Generator - Create OG Meta Tags"
        description="Generate Open Graph meta tags for better social media sharing. Create custom OG tags for Facebook, Twitter, LinkedIn and more."
        keywords="open graph generator, og tags, meta tags, social sharing, facebook tags"
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
              Open Graph Tag Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Create Open Graph meta tags to control how your content appears when shared on social media platforms.
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
                  <CardTitle className="text-2xl font-heading">Enter Your Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Page Title *</label>
                    <Input
                      placeholder="Your Page Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="border-light-gray"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Page description (50-160 characters recommended)"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="border-light-gray min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Page URL *</label>
                    <Input
                      placeholder="https://example.com/page"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="border-light-gray"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Image URL</label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="border-light-gray"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Content Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-light-gray rounded-md text-sm font-paragraph"
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="blog">Blog</option>
                      <option value="product">Product</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Author</label>
                    <Input
                      placeholder="Author name"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="border-light-gray"
                    />
                  </div>
                  <Button
                    onClick={generateTags}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Generate OG Tags
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm font-heading text-blue-900">What are OG Tags?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-paragraph text-blue-800">
                    Open Graph tags control how your content appears when shared on social media. They define the title, description, image, and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Output Section */}
          {generatedTags && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Generated OG Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-light-gray rounded-lg p-6 font-mono text-sm text-dark-gray overflow-x-auto">
                    <pre>{generatedTags}</pre>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </Button>
                    <Button
                      onClick={downloadTags}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
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
