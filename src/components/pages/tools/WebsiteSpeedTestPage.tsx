import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/ui/seo-head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Gauge, ArrowLeft, Smartphone, Monitor, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp, Settings } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface SpeedTestResult {
  url: string;
  desktop: {
    score: number;
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
  };
  mobile: {
    score: number;
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
  };
  recommendations: string[];
}

export default function WebsiteSpeedTestPage() {
  const [url, setUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [results, setResults] = useState<SpeedTestResult | null>(null);
  const [hasTested, setHasTested] = useState(false);

  const runSpeedTest = async () => {
    if (!url.trim()) return;
    
    setIsTesting(true);
    setHasTested(true);
    
    // Simulate speed test
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Generate mock results
    const mockResults: SpeedTestResult = {
      url: url,
      desktop: {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        loadTime: Math.random() * 2 + 1, // 1-3 seconds
        firstContentfulPaint: Math.random() * 1.5 + 0.5, // 0.5-2 seconds
        largestContentfulPaint: Math.random() * 2 + 1.5, // 1.5-3.5 seconds
        cumulativeLayoutShift: Math.random() * 0.2, // 0-0.2
        firstInputDelay: Math.random() * 50 + 10 // 10-60ms
      },
      mobile: {
        score: Math.floor(Math.random() * 40) + 50, // 50-90
        loadTime: Math.random() * 3 + 2, // 2-5 seconds
        firstContentfulPaint: Math.random() * 2 + 1, // 1-3 seconds
        largestContentfulPaint: Math.random() * 3 + 2, // 2-5 seconds
        cumulativeLayoutShift: Math.random() * 0.3, // 0-0.3
        firstInputDelay: Math.random() * 100 + 50 // 50-150ms
      },
      recommendations: [
        'Optimize images by compressing and using modern formats (WebP, AVIF)',
        'Minify CSS, JavaScript, and HTML files',
        'Enable browser caching with proper cache headers',
        'Use a Content Delivery Network (CDN) for faster content delivery',
        'Reduce server response time by optimizing backend code',
        'Eliminate render-blocking resources in the critical rendering path',
        'Preload critical resources and lazy load non-critical content',
        'Remove unused CSS and JavaScript code'
      ]
    };
    
    setResults(mockResults);
    setIsTesting(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Good', color: 'bg-green-100 text-green-800' };
    if (score >= 70) return { text: 'Needs Improvement', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Poor', color: 'bg-red-100 text-red-800' };
  };

  const getMetricStatus = (value: number, thresholds: { good: number; poor: number }, isLower = true) => {
    if (isLower) {
      if (value <= thresholds.good) return 'good';
      if (value <= thresholds.poor) return 'needs-improvement';
      return 'poor';
    } else {
      if (value >= thresholds.good) return 'good';
      if (value >= thresholds.poor) return 'needs-improvement';
      return 'poor';
    }
  };

  const formatTime = (seconds: number) => {
    return seconds < 1 ? `${Math.round(seconds * 1000)}ms` : `${seconds.toFixed(2)}s`;
  };

  const SpeedMetrics = ({ data, device }: { data: any; device: string }) => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className={`text-4xl font-heading mb-2 ${getScoreColor(data.score)}`}>
          {data.score}
        </div>
        <Badge className={getScoreBadge(data.score).color}>
          {getScoreBadge(data.score).text}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-paragraph text-secondary">Load Time</span>
            <span className={`font-medium ${getScoreColor(data.loadTime > 3 ? 30 : data.loadTime > 1.5 ? 70 : 95)}`}>
              {formatTime(data.loadTime)}
            </span>
          </div>
          <Progress 
            value={Math.max(0, 100 - (data.loadTime / 5) * 100)} 
            className="h-2" 
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-paragraph text-secondary">First Contentful Paint</span>
            <span className={`font-medium ${getScoreColor(data.firstContentfulPaint > 2 ? 30 : data.firstContentfulPaint > 1 ? 70 : 95)}`}>
              {formatTime(data.firstContentfulPaint)}
            </span>
          </div>
          <Progress 
            value={Math.max(0, 100 - (data.firstContentfulPaint / 3) * 100)} 
            className="h-2" 
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-paragraph text-secondary">Largest Contentful Paint</span>
            <span className={`font-medium ${getScoreColor(data.largestContentfulPaint > 4 ? 30 : data.largestContentfulPaint > 2.5 ? 70 : 95)}`}>
              {formatTime(data.largestContentfulPaint)}
            </span>
          </div>
          <Progress 
            value={Math.max(0, 100 - (data.largestContentfulPaint / 5) * 100)} 
            className="h-2" 
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-paragraph text-secondary">Cumulative Layout Shift</span>
            <span className={`font-medium ${getScoreColor(data.cumulativeLayoutShift > 0.25 ? 30 : data.cumulativeLayoutShift > 0.1 ? 70 : 95)}`}>
              {data.cumulativeLayoutShift.toFixed(3)}
            </span>
          </div>
          <Progress 
            value={Math.max(0, 100 - (data.cumulativeLayoutShift / 0.5) * 100)} 
            className="h-2" 
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Speed Test A Site Fast & Improve Website Performance"
        description="Speed Test A Site To Analyze Load Time, Fix Issues, And Boost SEO Rankings. Get Accurate Insights, Improve Core Web Vitals, And Deliver Faster User Experience Today."
        ogTitle="Speed Test A Site Fast & Improve Website Performance"
        ogDescription="Speed Test A Site To Analyze Load Time, Fix Issues, And Boost SEO Rankings. Get Accurate Insights, Improve Core Web Vitals, And Deliver Faster User Experience Today."
      />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mr-6">
                <Gauge className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  Speed Test A Site To Improve Performance, SEO, And User Experience.
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Test your website's loading speed and get optimization recommendations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input Section */}
      <section className="py-12 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center font-heading text-dark-gray">
                Enter Website URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <p className="text-sm font-paragraph text-secondary mt-2">
                    Enter a complete URL including https:// to test website speed
                  </p>
                </div>
                <Button 
                  onClick={runSpeedTest}
                  disabled={isTesting || !url.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isTesting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Testing Speed...
                    </div>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Run Speed Test
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {hasTested && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            {isTesting ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-heading text-dark-gray mb-2">Analyzing Website Speed...</h3>
                <p className="font-paragraph text-secondary">Testing desktop and mobile performance</p>
              </div>
            ) : results && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading text-dark-gray mb-2">
                    Speed Test Results
                  </h2>
                  <p className="font-paragraph text-secondary">
                    Performance analysis for {results.url}
                  </p>
                </div>

                <Tabs defaultValue="desktop" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                    <TabsTrigger value="desktop" className="flex items-center">
                      <Monitor className="mr-2 h-4 w-4" />
                      Desktop
                    </TabsTrigger>
                    <TabsTrigger value="mobile" className="flex items-center">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Mobile
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="desktop" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-dark-gray flex items-center">
                          <Monitor className="mr-2 h-5 w-5" />
                          Desktop Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SpeedMetrics data={results.desktop} device="desktop" />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="mobile" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-dark-gray flex items-center">
                          <Smartphone className="mr-2 h-5 w-5" />
                          Mobile Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SpeedMetrics data={results.mobile} device="mobile" />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Recommendations */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="font-heading text-dark-gray flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Optimization Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-paragraph text-dark-gray">
                            {recommendation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Core Web Vitals Info */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="font-heading text-dark-gray">
                      Core Web Vitals Explained
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="font-paragraph text-dark-gray font-medium mb-2">First Contentful Paint</h4>
                        <p className="text-sm font-paragraph text-secondary">
                          Time until the first text or image is painted
                        </p>
                        <div className="mt-2 text-xs">
                          <span className="text-green-600">Good: &lt; 1.8s</span><br />
                          <span className="text-red-600">Poor: &gt; 3.0s</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-paragraph text-dark-gray font-medium mb-2">Largest Contentful Paint</h4>
                        <p className="text-sm font-paragraph text-secondary">
                          Time until the largest text or image is painted
                        </p>
                        <div className="mt-2 text-xs">
                          <span className="text-green-600">Good: &lt; 2.5s</span><br />
                          <span className="text-red-600">Poor: &gt; 4.0s</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-paragraph text-dark-gray font-medium mb-2">Cumulative Layout Shift</h4>
                        <p className="text-sm font-paragraph text-secondary">
                          Measures visual stability of the page
                        </p>
                        <div className="mt-2 text-xs">
                          <span className="text-green-600">Good: &lt; 0.1</span><br />
                          <span className="text-red-600">Poor: &gt; 0.25</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-paragraph text-dark-gray font-medium mb-2">First Input Delay</h4>
                        <p className="text-sm font-paragraph text-secondary">
                          Time from first interaction to browser response
                        </p>
                        <div className="mt-2 text-xs">
                          <span className="text-green-600">Good: &lt; 100ms</span><br />
                          <span className="text-red-600">Poor: &gt; 300ms</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="py-8 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-dark-gray mb-2">Basic Speed Test Disclaimer</h3>
                  <p className="font-paragraph text-secondary text-sm">
                    This is a basic speed test tool that provides simulated performance data for demonstration purposes. 
                    For accurate website performance analysis, use professional tools like Google PageSpeed Insights, GTmetrix, or WebPageTest.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                When You Speed Test A Site, You're Not Just Checking Load Time. You're Understanding How Your Website Feels To Real Users. A Slow Site Doesn't Just Frustrate Visitors, It Quietly Pushes Them Away.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                Search Engines Like Google Consider Page Speed As A Ranking Factor. If Your Website Is Slow, It Can Struggle To Rank Even With Good Content. Speed Plays A Bigger Role Than Most People Realize.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                Running A Speed Test Helps You See What's Really Happening Behind The Scenes. Tools Like Google PageSpeed Insights And GTmetrix Show Metrics Like Load Time, Interactivity, And Performance Scores.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                Most Websites Slow Down Due To Common Issues. Heavy Images, Too Many Scripts, Weak Hosting, And Missing Caching All Add Up. Individually They Seem Small, But Together They Create A Poor Experience.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                Improving Speed Doesn't Always Mean Big Changes. Compressing Images, Reducing Code Size, And Using A CDN Can Make A Noticeable Difference. Even Small Fixes Can Improve Performance Quickly.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                With Updates Like Core Web Vitals, Speed Directly Impacts SEO. Faster Websites Get Better Visibility, Lower Bounce Rates, And Higher Engagement.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                There's Also A Business Impact. Faster Websites Keep Users Longer And Increase Conversions. People Trust And Interact More With Sites That Feel Instant.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                Make It A Habit To Speed Test A Site Regularly. Websites Evolve, And So Do Performance Issues. Staying Consistent Helps You Stay Ahead.
              </p>
              <p className="font-paragraph text-dark-gray text-base leading-relaxed">
                In The End, Speed Is Not Just A Metric. It's The Experience Your Visitors Remember.
              </p>
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
                Website Speed Optimization Tips
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Improve your website performance with these proven strategies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Zap className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Optimize Images</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Compress images, use modern formats (WebP, AVIF), and implement lazy loading for better performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Settings className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Minify Resources</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Minify CSS, JavaScript, and HTML files to reduce file sizes and improve load times.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Enable Caching</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Implement browser caching and use CDNs to serve content faster to users worldwide.
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
                      <h3 className="font-heading text-dark-gray mb-2">Monitor Regularly</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Regularly test your website speed and monitor Core Web Vitals for consistent performance.
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
            Need Professional Speed Optimization?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our web development experts can optimize your website for lightning-fast performance and better user experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get Speed Optimization
              </Button>
            </Link>
            <Link to="/services/web-development">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4"
              >
                View Web Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}