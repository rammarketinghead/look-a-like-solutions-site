import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Wand2, Copy, Download, ArrowLeft, Zap, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AIHumanizerPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<'conversational' | 'professional' | 'casual'>('conversational');

  const toneDescriptions = {
    conversational: 'Warm, friendly, and natural - like talking to a friend',
    professional: 'Polished yet personable - maintains professionalism with human warmth',
    casual: 'Relaxed and laid-back - informal and easy-going'
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setHasProcessed(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock humanization - in production, this would call an AI API
    const humanized = humanizeText(inputText, tone);
    setOutputText(humanized);
    setIsLoading(false);
  };

  const humanizeText = (text: string, selectedTone: string): string => {
    // This is a mock implementation
    // In production, you'd call an actual AI API
    let result = text;

    // Remove overly formal phrases
    result = result.replace(/Furthermore,/gi, 'Plus,');
    result = result.replace(/In conclusion,/gi, 'So,');
    result = result.replace(/It is important to note that/gi, 'Here\'s the thing:');
    result = result.replace(/The aforementioned/gi, 'That');
    result = result.replace(/utilize/gi, 'use');
    result = result.replace(/facilitate/gi, 'help with');
    result = result.replace(/implement/gi, 'put in place');
    result = result.replace(/leverage/gi, 'use');
    result = result.replace(/synergy/gi, 'teamwork');
    result = result.replace(/paradigm shift/gi, 'big change');
    result = result.replace(/at this point in time/gi, 'right now');
    result = result.replace(/due to the fact that/gi, 'because');
    result = result.replace(/in the event that/gi, 'if');

    // Add conversational elements based on tone
    if (selectedTone === 'conversational') {
      // Add some conversational markers
      const sentences = result.split(/(?<=[.!?])\s+/);
      result = sentences.map((sentence, index) => {
        if (index > 0 && Math.random() > 0.7) {
          const markers = ['You know,', 'Here\'s the thing,', 'Look,', 'Honestly,', 'Really,'];
          return markers[Math.floor(Math.random() * markers.length)] + ' ' + sentence;
        }
        return sentence;
      }).join(' ');
    } else if (selectedTone === 'casual') {
      result = result.replace(/very/gi, 'super');
      result = result.replace(/really/gi, 'totally');
      result = result.replace(/important/gi, 'crucial');
    }

    return result;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([outputText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'humanized-content.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setHasProcessed(false);
  };

  const exampleTexts = {
    conversational: 'The implementation of advanced marketing strategies facilitates the optimization of customer engagement metrics and drives significant improvements in conversion rates through the utilization of data-driven methodologies.',
    professional: 'Artificial intelligence systems have demonstrated remarkable capabilities in processing large datasets and generating actionable insights for business optimization.',
    casual: 'The aforementioned approach necessitates a comprehensive evaluation of existing infrastructure and the subsequent implementation of requisite modifications.'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Humanizer Tool - Make AI Writing Sound Natural"
        description="Transform AI-generated content into natural, human-sounding text. Remove robotic tone, add warmth and personality while keeping your message intact."
        keywords="AI humanizer, AI writing tool, humanize AI text, natural writing, content humanizer, AI to human text converter"
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
              AI Humanizer
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Transform AI-generated content into natural, warm, human-sounding text. Remove the robotic tone and add genuine personality while keeping your message intact.
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
              <Card className="border-0 shadow-lg h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Your AI-Generated Content</CardTitle>
                  <p className="text-sm font-paragraph text-secondary mt-2">
                    Paste your AI-generated text here. We'll smooth out the tone and add natural flow.
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Textarea
                    placeholder="Paste your AI-generated content here... The implementation of advanced strategies facilitates optimization..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 min-h-[400px] resize-none font-paragraph text-base border-0 focus:ring-2 focus:ring-primary"
                  />
                  <div className="mt-4 flex items-center justify-between text-sm font-paragraph text-secondary">
                    <span>{inputText.length} characters</span>
                    {inputText.length > 0 && (
                      <span>{inputText.split(/\s+/).filter(w => w).length} words</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Options Section */}
            <div className="space-y-6">
              {/* Tone Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-heading">Tone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(['conversational', 'professional', 'casual'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        tone === t
                          ? 'border-primary bg-primary/5'
                          : 'border-light-gray hover:border-primary/30'
                      }`}
                    >
                      <div className="font-heading text-sm capitalize text-dark-gray">{t}</div>
                      <div className="text-xs font-paragraph text-secondary mt-1">
                        {toneDescriptions[t]}
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button
                onClick={handleHumanize}
                disabled={!inputText.trim() || isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Humanize Content
                  </>
                )}
              </Button>

              {/* Quick Tips */}
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm font-heading flex items-center text-blue-900">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-xs font-paragraph text-blue-800">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Longer content works better - aim for at least 100 words</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Choose a tone that matches your brand voice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Review the output and make final edits as needed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Output Section */}
          {hasProcessed && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-heading">Humanized Content</CardTitle>
                    <p className="text-sm font-paragraph text-secondary mt-2">
                      Your content now sounds warm, natural, and genuinely human.
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Ready
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-light-gray rounded-lg p-6 min-h-[300px] font-paragraph text-base text-dark-gray leading-relaxed whitespace-pre-wrap">
                    {outputText}
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
                      onClick={downloadAsText}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      onClick={clearAll}
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

          {/* Examples Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-heading text-dark-gray mb-8">See It In Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['conversational', 'professional', 'casual'] as const).map((t) => (
                <Card key={t} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading capitalize">{t} Tone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-heading text-secondary uppercase mb-2">Before</p>
                      <p className="text-sm font-paragraph text-dark-gray bg-light-gray p-3 rounded line-clamp-3">
                        {exampleTexts[t]}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-heading text-secondary uppercase mb-2">After</p>
                      <p className="text-sm font-paragraph text-dark-gray bg-primary/5 p-3 rounded line-clamp-3">
                        {humanizeText(exampleTexts[t], t)}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setInputText(exampleTexts[t]);
                        setTone(t);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Try This Example
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading text-dark-gray mb-4">What This Tool Does</h2>
            <p className="text-lg font-paragraph text-secondary max-w-2xl mx-auto">
              Transform robotic AI text into genuine, warm, human-sounding content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Wand2,
                title: 'Removes Robotic Tone',
                description: 'Eliminates overly formal phrases and corporate jargon that make content sound like a machine wrote it.'
              },
              {
                icon: Zap,
                title: 'Adds Natural Flow',
                description: 'Restructures sentences to feel conversational and easy to read, like someone thinking out loud.'
              },
              {
                icon: CheckCircle,
                title: 'Preserves Meaning',
                description: 'Keeps your core message and facts intact while only changing the tone and delivery.'
              },
              {
                icon: AlertCircle,
                title: 'Multiple Tones',
                description: 'Choose between conversational, professional, or casual styles to match your brand voice.'
              },
              {
                icon: Copy,
                title: 'Easy to Use',
                description: 'Simply paste your AI text and click humanize. Get results in seconds, no signup required.'
              },
              {
                icon: Download,
                title: 'Export Options',
                description: 'Copy to clipboard or download your humanized content as a text file for easy integration.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading text-dark-gray mb-2">{feature.title}</h3>
                    <p className="font-paragraph text-secondary text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading text-background mb-4">
              Need Help With Content Strategy?
            </h2>
            <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              While this tool helps humanize AI content, our content marketing experts can help you create authentic, engaging content from the ground up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-base">
                  Get Expert Help
                </Button>
              </Link>
              <Link to="/services/content-marketing">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-base"
                >
                  View Content Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
