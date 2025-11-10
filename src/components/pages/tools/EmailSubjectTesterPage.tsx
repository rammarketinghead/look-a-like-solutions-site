import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, AlertTriangle, CheckCircle, TrendingUp, Eye, Zap, Target, Lightbulb } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface TestResult {
  score: number;
  openRatePrediction: number;
  spamScore: number;
  characterCount: number;
  wordCount: number;
  issues: string[];
  suggestions: string[];
  strengths: string[];
}

export default function EmailSubjectTesterPage() {
  const [subjectLine, setSubjectLine] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const analyzeSubjectLine = async () => {
    if (!subjectLine.trim()) return;
    
    setIsAnalyzing(true);
    setHasAnalyzed(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis logic
    const characterCount = subjectLine.length;
    const wordCount = subjectLine.split(' ').length;
    const hasNumbers = /\d/.test(subjectLine);
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(subjectLine);
    const hasUrgency = /urgent|limited|hurry|now|today|deadline/i.test(subjectLine);
    const hasPersonalization = /you|your/i.test(subjectLine);
    const hasSpamWords = /free|guarantee|money|cash|winner|congratulations/i.test(subjectLine);
    const hasAllCaps = /[A-Z]{3,}/.test(subjectLine);
    const hasExclamation = /!/.test(subjectLine);
    
    let score = 50; // Base score
    let spamScore = 0;
    const issues: string[] = [];
    const suggestions: string[] = [];
    const strengths: string[] = [];
    
    // Character count analysis
    if (characterCount < 30) {
      score += 10;
      strengths.push('Good length for mobile preview');
    } else if (characterCount > 50) {
      score -= 15;
      issues.push('Subject line may be truncated on mobile devices');
      suggestions.push('Keep subject lines under 50 characters for better mobile visibility');
    }
    
    // Word count analysis
    if (wordCount >= 3 && wordCount <= 7) {
      score += 10;
      strengths.push('Optimal word count');
    } else if (wordCount > 10) {
      score -= 10;
      issues.push('Too many words may reduce clarity');
    }
    
    // Numbers
    if (hasNumbers) {
      score += 5;
      strengths.push('Numbers can increase open rates');
    }
    
    // Personalization
    if (hasPersonalization) {
      score += 10;
      strengths.push('Personalized language detected');
    } else {
      suggestions.push('Consider adding personalization like "your" or "you"');
    }
    
    // Urgency
    if (hasUrgency) {
      score += 5;
      strengths.push('Creates sense of urgency');
    }
    
    // Spam indicators
    if (hasSpamWords) {
      score -= 20;
      spamScore += 30;
      issues.push('Contains potential spam trigger words');
      suggestions.push('Avoid words like "free", "guarantee", or "money"');
    }
    
    if (hasAllCaps) {
      score -= 15;
      spamScore += 25;
      issues.push('Excessive capitalization detected');
      suggestions.push('Avoid using ALL CAPS as it appears spammy');
    }
    
    if (hasExclamation) {
      const exclamationCount = (subjectLine.match(/!/g) || []).length;
      if (exclamationCount > 1) {
        score -= 10;
        spamScore += 15;
        issues.push('Multiple exclamation marks detected');
        suggestions.push('Limit exclamation marks to one or none');
      }
    }
    
    // Emojis
    if (hasEmojis) {
      score += 5;
      strengths.push('Emojis can increase engagement');
    }
    
    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));
    spamScore = Math.max(0, Math.min(100, spamScore));
    
    // Calculate open rate prediction based on score
    const openRatePrediction = Math.max(5, Math.min(35, (score / 100) * 30 + 10));
    
    const mockResult: TestResult = {
      score,
      openRatePrediction,
      spamScore,
      characterCount,
      wordCount,
      issues,
      suggestions,
      strengths
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    if (score >= 40) return { text: 'Fair', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Poor', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  Email Subject Line Tester
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Optimize your email subject lines for better open rates
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input Section */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center font-heading text-dark-gray">
                Enter Your Subject Line
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Textarea
                    placeholder="e.g., Don't miss out on our exclusive 50% off sale!"
                    value={subjectLine}
                    onChange={(e) => setSubjectLine(e.target.value)}
                    className="min-h-[100px] text-lg resize-none"
                    maxLength={200}
                  />
                  <div className="flex justify-between text-sm text-secondary mt-2">
                    <span>Characters: {subjectLine.length}/200</span>
                    <span>Words: {subjectLine.split(' ').filter(word => word.length > 0).length}</span>
                  </div>
                </div>
                <Button 
                  onClick={analyzeSubjectLine}
                  disabled={isAnalyzing || !subjectLine.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing...
                    </div>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Analyze Subject Line
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm font-paragraph text-secondary mt-3 text-center">
                Get instant feedback on spam score, open rate prediction, and optimization tips
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {hasAnalyzed && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            {isAnalyzing ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-heading text-dark-gray mb-2">Analyzing Subject Line...</h3>
                <p className="font-paragraph text-secondary">Checking for spam triggers and optimization opportunities</p>
              </div>
            ) : result && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading text-dark-gray mb-2">
                    Analysis Results
                  </h2>
                  <p className="font-paragraph text-secondary">
                    Here's how your subject line performs
                  </p>
                </div>

                {/* Score Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-dark-gray mb-2">Overall Score</h3>
                      <div className={`text-3xl font-heading mb-2 ${getScoreColor(result.score)}`}>
                        {result.score}/100
                      </div>
                      <Badge className={getScoreBadge(result.score).color}>
                        {getScoreBadge(result.score).text}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-heading text-dark-gray mb-2">Open Rate Prediction</h3>
                      <div className="text-3xl font-heading text-green-600 mb-2">
                        {result.openRatePrediction.toFixed(1)}%
                      </div>
                      <p className="text-sm font-paragraph text-secondary">
                        Estimated open rate
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="font-heading text-dark-gray mb-2">Spam Risk</h3>
                      <div className="text-3xl font-heading text-red-600 mb-2">
                        {result.spamScore}%
                      </div>
                      <Progress value={result.spamScore} className="w-full" />
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Strengths */}
                  {result.strengths.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-600">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="font-paragraph text-secondary text-sm">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Issues */}
                  {result.issues.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-600">
                          <AlertTriangle className="mr-2 h-5 w-5" />
                          Issues Found
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.issues.map((issue, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="font-paragraph text-secondary text-sm">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Suggestions */}
                  {result.suggestions.length > 0 && (
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center text-blue-600">
                          <Lightbulb className="mr-2 h-5 w-5" />
                          Optimization Suggestions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <Lightbulb className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="font-paragraph text-secondary text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Quick Stats */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="font-heading text-dark-gray">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-heading text-primary mb-1">{result.characterCount}</div>
                        <div className="text-sm font-paragraph text-secondary">Characters</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-heading text-primary mb-1">{result.wordCount}</div>
                        <div className="text-sm font-paragraph text-secondary">Words</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-heading text-primary mb-1">
                          {result.characterCount <= 50 ? '✓' : '✗'}
                        </div>
                        <div className="text-sm font-paragraph text-secondary">Mobile Friendly</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-heading text-primary mb-1">
                          {result.spamScore < 30 ? '✓' : '✗'}
                        </div>
                        <div className="text-sm font-paragraph text-secondary">Spam Safe</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                Email Subject Line Best Practices
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Follow these guidelines to create compelling subject lines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Keep It Short</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Aim for 30-50 characters to ensure your subject line displays fully on mobile devices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Be Specific</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Clear, specific subject lines perform better than vague ones. Tell recipients exactly what to expect.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <TrendingUp className="h-6 w-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Create Urgency</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use time-sensitive language when appropriate, but don't overdo it or it becomes spammy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Avoid Spam Triggers</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Stay away from words like "FREE", excessive punctuation, and ALL CAPS to avoid spam filters.
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
            Need Help with Email Marketing?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our email marketing experts can help you create campaigns that engage and convert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get Email Marketing Help
              </Button>
            </Link>
            <Link to="/services/email-marketing">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4"
              >
                View Email Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}