import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, Lightbulb, RefreshCw } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function BlogTopicGeneratorPage() {
  const [niche, setNiche] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateTopics = () => {
    if (!niche.trim()) return;

    const topicTemplates = [
      `The Complete Guide to ${niche}`,
      `${niche}: Everything You Need to Know`,
      `10 Essential Tips for ${niche}`,
      `How to Get Started with ${niche}`,
      `Common Mistakes in ${niche} (And How to Avoid Them)`,
      `${niche} Trends to Watch in 2024`,
      `The Beginner's Guide to ${niche}`,
      `Advanced Strategies for ${niche}`,
      `${niche}: Best Practices and Tools`,
      `Why ${niche} Matters More Than Ever`,
      `${niche} Case Studies: Real Results`,
      `The Future of ${niche}`,
      `${niche} vs. Alternatives: A Comparison`,
      `How to Master ${niche} in 30 Days`,
      `${niche} Tools and Resources You Need`,
      `Common Questions About ${niche} Answered`,
      `${niche} for Beginners: Step-by-Step`,
      `The Ultimate ${niche} Checklist`,
      `${niche} Success Stories and Lessons`,
      `How to Avoid ${niche} Pitfalls`
    ];

    setTopics(topicTemplates);
  };

  const copyToClipboard = () => {
    const text = topics.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTopics = () => {
    const text = `Blog Topics for: ${niche}\n\n${topics.join('\n')}`;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'blog-topics.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog Topic Generator - Generate Blog Post Ideas"
        description="Generate blog topic ideas for your niche. Get 20+ unique blog post ideas to boost your content calendar."
        keywords="blog topic generator, blog ideas, content ideas, blog post ideas, topic generator"
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
              Blog Topic Generator
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Generate unique blog post ideas for your niche. Never run out of content ideas again with our AI-powered topic generator.
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
                  <CardTitle className="text-2xl font-heading">Enter Your Niche</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-heading text-dark-gray mb-2 block">Your Niche or Topic *</label>
                    <Input
                      placeholder="e.g., digital marketing, fitness, personal finance, web design..."
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="border-light-gray"
                    />
                  </div>
                  <Button
                    onClick={generateTopics}
                    disabled={!niche.trim()}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                  >
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Generate Topics
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
                      <span>Be specific with your niche</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Mix beginner and advanced topics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Research keyword volume</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Plan your content calendar</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Output Section */}
          {topics.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Generated Blog Topics ({topics.length})</CardTitle>
                  <p className="text-sm font-paragraph text-secondary mt-2">For: {niche}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {topics.map((topic, index) => (
                      <div
                        key={index}
                        className="p-4 bg-light-gray rounded-lg flex justify-between items-start hover:bg-primary/5 transition-colors cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(topic);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        }}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-paragraph text-secondary mb-1">Topic {index + 1}</p>
                          <p className="text-base font-heading text-dark-gray">{topic}</p>
                        </div>
                        <button className="ml-4 text-primary hover:text-primary/80 transition-colors">
                          <Copy className="h-4 w-4" />
                        </button>
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
                      onClick={downloadTopics}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      onClick={() => {
                        setTopics([]);
                        setNiche('');
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Start Over
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
