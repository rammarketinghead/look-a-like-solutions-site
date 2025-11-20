import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, Hash } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    if (!topic.trim()) return;

    const words = topic.toLowerCase().split(/\s+/).filter(w => w);
    const generated: string[] = [];

    // Generate hashtags from topic words
    words.forEach(word => {
      generated.push(`#${word}`);
    });

    // Generate combination hashtags
    if (words.length > 1) {
      generated.push(`#${words.join('')}`);
      generated.push(`#${words.slice(0, 2).join('')}`);
    }

    // Generate related hashtags based on common patterns
    const relatedPatterns = [
      `#${topic.replace(/\s+/g, '')}Tips`,
      `#${topic.replace(/\s+/g, '')}Guide`,
      `#${topic.replace(/\s+/g, '')}Ideas`,
      `#${topic.replace(/\s+/g, '')}Trends`,
      `#${topic.replace(/\s+/g, '')}Hacks`,
      '#SocialMedia',
      '#Content',
      '#Marketing',
      '#Digital',
      '#Trending'
    ];

    generated.push(...relatedPatterns);

    // Remove duplicates and limit to 30
    const unique = Array.from(new Set(generated)).slice(0, 30);
    setHashtags(unique);
  };

  const copyToClipboard = () => {
    const text = hashtags.join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHashtags = () => {
    const text = hashtags.join('\n');
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'hashtags.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Hashtag Generator - Create Social Media Hashtags"
        description="Generate relevant hashtags for your social media posts. Create trending hashtags for Instagram, Twitter, TikTok and more."
        keywords="hashtag generator, social media hashtags, instagram hashtags, twitter hashtags, trending hashtags"
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
              Hashtag Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Generate relevant hashtags for your social media content. Boost engagement and reach on Instagram, Twitter, TikTok, and more.
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
                  <CardTitle className="text-2xl font-heading">Enter Your Topic</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Topic or Keywords *</label>
                    <Textarea
                      placeholder="e.g., digital marketing, social media tips, fitness motivation..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="border-light-gray min-h-[120px]"
                    />
                  </div>
                  <Button
                    onClick={generateHashtags}
                    disabled={!topic.trim()}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                  >
                    <Hash className="h-5 w-5 mr-2" />
                    Generate Hashtags
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm font-heading text-blue-900">Pro Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-xs font-paragraph text-blue-800">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Mix popular and niche hashtags</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Use 10-30 hashtags per post</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Research trending hashtags</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Create branded hashtags</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Output Section */}
          {hashtags.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Generated Hashtags ({hashtags.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {hashtags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-light-gray rounded-lg p-3 text-center cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(tag);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        }}
                      >
                        <p className="text-sm font-heading text-primary">{tag}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy All'}
                    </Button>
                    <Button
                      onClick={downloadHashtags}
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
