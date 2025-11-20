import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, RefreshCw } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function FaviconGeneratorPage() {
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState('#007BFF');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [faviconCode, setFaviconCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateFavicon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 64, 64);
      
      // Draw text
      ctx.fillStyle = textColor;
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text.charAt(0).toUpperCase(), 32, 32);
      
      const dataUrl = canvas.toDataURL('image/png');
      const code = `<!-- Favicon -->
<link rel="icon" type="image/png" href="${dataUrl}" />
<link rel="shortcut icon" href="${dataUrl}" />`;
      setFaviconCode(code);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(faviconCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFavicon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = textColor;
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text.charAt(0).toUpperCase(), 32, 32);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'favicon.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Favicon Generator - Create Custom Website Icons"
        description="Generate custom favicons for your website. Create beautiful favicon icons with text, colors, and download as PNG."
        keywords="favicon generator, website icon, favicon creator, custom favicon"
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
              Favicon Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Create a custom favicon for your website. Design a unique icon that represents your brand in browser tabs.
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
                  <CardTitle className="text-2xl font-heading">Customize Your Favicon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Text (First Letter Used) *</label>
                    <Input
                      placeholder="Enter text (e.g., your brand initial)"
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, 1))}
                      maxLength={1}
                      className="border-light-gray text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Background Color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <Input
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="border-light-gray flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Text Color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <Input
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="border-light-gray flex-1"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={generateFavicon}
                    disabled={!text}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Generate Favicon
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-heading">Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  {text ? (
                    <div
                      style={{
                        width: '128px',
                        height: '128px',
                        backgroundColor: bgColor,
                        color: textColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '64px',
                        fontWeight: 'bold',
                        borderRadius: '8px'
                      }}
                    >
                      {text.toUpperCase()}
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-light-gray rounded-lg flex items-center justify-center text-secondary">
                      Preview
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Output Section */}
          {faviconCode && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Generated Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-light-gray rounded-lg p-6 font-mono text-sm text-dark-gray overflow-x-auto">
                    <pre>{faviconCode}</pre>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                    <Button
                      onClick={downloadFavicon}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
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
