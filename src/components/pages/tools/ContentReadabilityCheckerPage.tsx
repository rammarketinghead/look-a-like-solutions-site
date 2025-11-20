import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Copy, Download, ArrowLeft, BarChart3 } from 'lucide-react';
import { SEOHead } from '@/components/ui/seo-head';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface ReadabilityMetrics {
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  paragraphCount: number;
  avgWordsPerSentence: number;
  avgCharsPerWord: number;
  readingTimeMinutes: number;
  fleschKincaidGrade: number;
  readabilityScore: string;
}

export default function ContentReadabilityCheckerPage() {
  const [content, setContent] = useState('');
  const [metrics, setMetrics] = useState<ReadabilityMetrics | null>(null);

  const calculateReadability = () => {
    if (!content.trim()) return;

    const words = content.trim().split(/\s+/).filter(w => w);
    const chars = content.replace(/\s/g, '');
    const sentences = content.split(/[.!?]+/).filter(s => s.trim());
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim());

    const wordCount = words.length;
    const charCount = chars.length;
    const sentenceCount = sentences.length || 1;
    const paragraphCount = paragraphs.length || 1;
    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgCharsPerWord = charCount / wordCount;

    // Flesch-Kincaid Grade Level
    const fleschKincaid = 0.39 * avgWordsPerSentence + 11.8 * (charCount / wordCount / 5) - 15.59;
    const grade = Math.max(0, Math.round(fleschKincaid * 10) / 10);

    // Reading time (average 200 words per minute)
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    // Readability score
    let readabilityScore = '';
    if (grade < 6) readabilityScore = 'Very Easy';
    else if (grade < 9) readabilityScore = 'Easy';
    else if (grade < 12) readabilityScore = 'Standard';
    else if (grade < 14) readabilityScore = 'Fairly Difficult';
    else if (grade < 16) readabilityScore = 'Difficult';
    else readabilityScore = 'Very Difficult';

    setMetrics({
      wordCount,
      charCount,
      sentenceCount,
      paragraphCount,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgCharsPerWord: Math.round(avgCharsPerWord * 10) / 10,
      readingTimeMinutes,
      fleschKincaidGrade: grade,
      readabilityScore
    });
  };

  const copyMetrics = () => {
    if (!metrics) return;
    const text = `
Readability Analysis:
- Word Count: ${metrics.wordCount}
- Character Count: ${metrics.charCount}
- Sentence Count: ${metrics.sentenceCount}
- Paragraph Count: ${metrics.paragraphCount}
- Avg Words per Sentence: ${metrics.avgWordsPerSentence}
- Avg Characters per Word: ${metrics.avgCharsPerWord}
- Reading Time: ${metrics.readingTimeMinutes} minutes
- Flesch-Kincaid Grade: ${metrics.fleschKincaidGrade}
- Readability: ${metrics.readabilityScore}
    `.trim();
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Content Readability Checker - Analyze Text Readability"
        description="Check your content readability with detailed metrics. Get Flesch-Kincaid grade level, reading time, and more."
        keywords="readability checker, content analysis, flesch kincaid, reading level, text analysis"
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
              Content Readability Checker
            </h1>
            <p className="text-lg font-paragraph text-secondary max-w-2xl">
              Analyze your content's readability with detailed metrics including Flesch-Kincaid grade level and reading time.
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
                  <CardTitle className="text-2xl font-heading">Paste Your Content</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Textarea
                    placeholder="Paste your content here to analyze readability..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 min-h-[400px] resize-none font-paragraph text-base border-0 focus:ring-2 focus:ring-primary"
                  />
                  <div className="mt-4 flex items-center justify-between text-sm font-paragraph text-secondary">
                    <span>{content.length} characters</span>
                    {content.length > 0 && (
                      <span>{content.split(/\s+/).filter(w => w).length} words</span>
                    )}
                  </div>
                  <Button
                    onClick={calculateReadability}
                    disabled={!content.trim()}
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-heading"
                  >
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Analyze Readability
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm font-heading text-blue-900">What is Readability?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-paragraph text-blue-800">
                    Readability measures how easy your content is to understand. The Flesch-Kincaid grade level indicates the U.S. school grade needed to understand your text.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Metrics Section */}
          {metrics && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-paragraph text-secondary mb-2">Word Count</p>
                      <p className="text-3xl font-heading text-primary">{metrics.wordCount}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-paragraph text-secondary mb-2">Reading Time</p>
                      <p className="text-3xl font-heading text-primary">{metrics.readingTimeMinutes}m</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-paragraph text-secondary mb-2">Grade Level</p>
                      <p className="text-3xl font-heading text-primary">{metrics.fleschKincaidGrade}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-paragraph text-secondary mb-2">Readability</p>
                      <p className="text-lg font-heading text-primary">{metrics.readabilityScore}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Detailed Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-paragraph text-secondary mb-1">Sentences</p>
                      <p className="text-2xl font-heading text-dark-gray">{metrics.sentenceCount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-paragraph text-secondary mb-1">Paragraphs</p>
                      <p className="text-2xl font-heading text-dark-gray">{metrics.paragraphCount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-paragraph text-secondary mb-1">Characters</p>
                      <p className="text-2xl font-heading text-dark-gray">{metrics.charCount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-paragraph text-secondary mb-1">Avg Words/Sentence</p>
                      <p className="text-2xl font-heading text-dark-gray">{metrics.avgWordsPerSentence}</p>
                    </div>
                    <div>
                      <p className="text-sm font-paragraph text-secondary mb-1">Avg Chars/Word</p>
                      <p className="text-2xl font-heading text-dark-gray">{metrics.avgCharsPerWord}</p>
                    </div>
                  </div>
                  <Button
                    onClick={copyMetrics}
                    variant="outline"
                    className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Metrics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
