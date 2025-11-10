import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { Target, ArrowLeft, Download, Copy, RefreshCw, Zap, CheckCircle, AlertTriangle, Info, Lightbulb } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface MatchTypeResult {
  broad: string[];
  phrase: string[];
  exact: string[];
  negative: string[];
}

export default function KeywordMatchTypesPage() {
  const [keywordList, setKeywordList] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    broad: true,
    phrase: true,
    exact: true,
    negative: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<MatchTypeResult | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateMatchTypes = async () => {
    if (!keywordList.trim()) return;
    
    setIsGenerating(true);
    setHasGenerated(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Parse keywords
    const keywords = keywordList
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    
    const matchTypes: MatchTypeResult = {
      broad: [],
      phrase: [],
      exact: [],
      negative: []
    };
    
    keywords.forEach(keyword => {
      // Broad match (no modification needed)
      if (selectedTypes.broad) {
        matchTypes.broad.push(keyword);
      }
      
      // Phrase match (wrapped in quotes)
      if (selectedTypes.phrase) {
        matchTypes.phrase.push(`"${keyword}"`);
      }
      
      // Exact match (wrapped in brackets)
      if (selectedTypes.exact) {
        matchTypes.exact.push(`[${keyword}]`);
      }
      
      // Negative keywords (with minus sign)
      if (selectedTypes.negative) {
        matchTypes.negative.push(`-${keyword}`);
        // Also add phrase and exact negative variations
        matchTypes.negative.push(`-"${keyword}"`);
        matchTypes.negative.push(`-[${keyword}]`);
      }
    });
    
    setResults(matchTypes);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const copyAllMatchType = (matchType: keyof MatchTypeResult) => {
    if (!results) return;
    const text = results[matchType].join('\n');
    copyToClipboard(text);
  };

  const exportAllMatchTypes = () => {
    if (!results) return;
    
    let csvContent = 'Match Type,Keyword\n';
    
    results.broad.forEach(keyword => {
      csvContent += `Broad,"${keyword}"\n`;
    });
    
    results.phrase.forEach(keyword => {
      csvContent += `Phrase,"${keyword}"\n`;
    });
    
    results.exact.forEach(keyword => {
      csvContent += `Exact,"${keyword}"\n`;
    });
    
    results.negative.forEach(keyword => {
      csvContent += `Negative,"${keyword}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-match-types.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const matchTypeInfo = {
    broad: {
      description: 'Shows ads for searches that include your keywords in any order, plus related variations',
      example: 'Keyword: "digital marketing" → Matches: "marketing digital services", "online digital marketing"',
      color: 'bg-blue-100 text-blue-800',
      icon: '🌐'
    },
    phrase: {
      description: 'Shows ads for searches that include your exact phrase or close variations',
      example: 'Keyword: "digital marketing" → Matches: "best digital marketing", "digital marketing services"',
      color: 'bg-green-100 text-green-800',
      icon: '📝'
    },
    exact: {
      description: 'Shows ads only for searches that match your exact keyword or close variations',
      example: 'Keyword: "digital marketing" → Matches: "digital marketing", "digital marketng" (typo)',
      color: 'bg-purple-100 text-purple-800',
      icon: '🎯'
    },
    negative: {
      description: 'Prevents ads from showing for specific terms you want to exclude',
      example: 'Keyword: "-free" → Excludes: "free digital marketing", "digital marketing free"',
      color: 'bg-red-100 text-red-800',
      icon: '🚫'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  Keyword Match Types Generator
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Generate all keyword match types for your PPC campaigns
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
                Enter Your Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Textarea
                    placeholder={`Enter your keywords, one per line:

digital marketing
seo services
social media marketing
ppc advertising
content marketing
email marketing
web design
online advertising`}
                    value={keywordList}
                    onChange={(e) => setKeywordList(e.target.value)}
                    className="min-h-[150px] text-sm font-mono"
                  />
                  <div className="text-sm text-secondary mt-2">
                    Keywords: {keywordList.split('\n').filter(k => k.trim().length > 0).length}
                  </div>
                </div>

                {/* Match Type Selection */}
                <div>
                  <h3 className="text-sm font-paragraph text-dark-gray font-medium mb-3">
                    Select Match Types to Generate:
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="broad"
                        checked={selectedTypes.broad}
                        onCheckedChange={(checked) => 
                          setSelectedTypes(prev => ({ ...prev, broad: checked as boolean }))
                        }
                      />
                      <label htmlFor="broad" className="text-sm font-paragraph text-secondary">
                        Broad Match
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="phrase"
                        checked={selectedTypes.phrase}
                        onCheckedChange={(checked) => 
                          setSelectedTypes(prev => ({ ...prev, phrase: checked as boolean }))
                        }
                      />
                      <label htmlFor="phrase" className="text-sm font-paragraph text-secondary">
                        Phrase Match
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exact"
                        checked={selectedTypes.exact}
                        onCheckedChange={(checked) => 
                          setSelectedTypes(prev => ({ ...prev, exact: checked as boolean }))
                        }
                      />
                      <label htmlFor="exact" className="text-sm font-paragraph text-secondary">
                        Exact Match
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="negative"
                        checked={selectedTypes.negative}
                        onCheckedChange={(checked) => 
                          setSelectedTypes(prev => ({ ...prev, negative: checked as boolean }))
                        }
                      />
                      <label htmlFor="negative" className="text-sm font-paragraph text-secondary">
                        Negative Keywords
                      </label>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={generateMatchTypes}
                  disabled={isGenerating || !keywordList.trim() || !Object.values(selectedTypes).some(Boolean)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </div>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate Match Types
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {hasGenerated && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            {isGenerating ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-heading text-dark-gray mb-2">Generating Match Types...</h3>
                <p className="font-paragraph text-secondary">Creating all keyword variations</p>
              </div>
            ) : results && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-heading text-dark-gray mb-2">
                      Generated Match Types
                    </h2>
                    <p className="font-paragraph text-secondary">
                      Ready to copy and paste into your PPC campaigns
                    </p>
                  </div>
                  <Button
                    onClick={exportAllMatchTypes}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>

                <Tabs defaultValue="results" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="guide">Match Type Guide</TabsTrigger>
                  </TabsList>

                  <TabsContent value="results" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Broad Match */}
                      {selectedTypes.broad && results.broad.length > 0 && (
                        <Card>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-2xl mr-2">🌐</span>
                                <div>
                                  <CardTitle className="text-lg font-heading text-dark-gray">
                                    Broad Match
                                  </CardTitle>
                                  <p className="text-sm font-paragraph text-secondary">
                                    Maximum reach, lowest control
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">
                                {results.broad.length} keywords
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded">
                                {results.broad.map((keyword, index) => (
                                  <div key={index} className="text-sm font-mono text-dark-gray py-1">
                                    {keyword}
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => copyAllMatchType('broad')}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy All Broad Match
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Phrase Match */}
                      {selectedTypes.phrase && results.phrase.length > 0 && (
                        <Card>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-2xl mr-2">📝</span>
                                <div>
                                  <CardTitle className="text-lg font-heading text-dark-gray">
                                    Phrase Match
                                  </CardTitle>
                                  <p className="text-sm font-paragraph text-secondary">
                                    Moderate reach and control
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-800">
                                {results.phrase.length} keywords
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded">
                                {results.phrase.map((keyword, index) => (
                                  <div key={index} className="text-sm font-mono text-dark-gray py-1">
                                    {keyword}
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => copyAllMatchType('phrase')}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy All Phrase Match
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Exact Match */}
                      {selectedTypes.exact && results.exact.length > 0 && (
                        <Card>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-2xl mr-2">🎯</span>
                                <div>
                                  <CardTitle className="text-lg font-heading text-dark-gray">
                                    Exact Match
                                  </CardTitle>
                                  <p className="text-sm font-paragraph text-secondary">
                                    Lowest reach, highest control
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-purple-100 text-purple-800">
                                {results.exact.length} keywords
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded">
                                {results.exact.map((keyword, index) => (
                                  <div key={index} className="text-sm font-mono text-dark-gray py-1">
                                    {keyword}
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => copyAllMatchType('exact')}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy All Exact Match
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Negative Keywords */}
                      {selectedTypes.negative && results.negative.length > 0 && (
                        <Card>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-2xl mr-2">🚫</span>
                                <div>
                                  <CardTitle className="text-lg font-heading text-dark-gray">
                                    Negative Keywords
                                  </CardTitle>
                                  <p className="text-sm font-paragraph text-secondary">
                                    Exclude unwanted traffic
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-red-100 text-red-800">
                                {results.negative.length} keywords
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded">
                                {results.negative.map((keyword, index) => (
                                  <div key={index} className="text-sm font-mono text-dark-gray py-1">
                                    {keyword}
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => copyAllMatchType('negative')}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy All Negative
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="guide" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(matchTypeInfo).map(([type, info]) => (
                        <Card key={type} className="border-l-4 border-l-primary">
                          <CardContent className="p-6">
                            <div className="flex items-start">
                              <span className="text-2xl mr-3">{info.icon}</span>
                              <div>
                                <h3 className="font-heading text-dark-gray mb-2 capitalize">
                                  {type} Match
                                </h3>
                                <p className="font-paragraph text-secondary text-sm mb-3">
                                  {info.description}
                                </p>
                                <div className="bg-gray-50 p-3 rounded text-xs font-mono text-dark-gray">
                                  {info.example}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
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
                Match Type Best Practices
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Use these strategies to optimize your keyword targeting
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Start with Exact Match</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Begin with exact match keywords to maintain control and gather data, then expand to phrase and broad match.
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
                      <h3 className="font-heading text-dark-gray mb-2">Use Negative Keywords</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Always include negative keywords to prevent irrelevant clicks and improve campaign efficiency.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Info className="h-6 w-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Monitor Search Terms</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Regularly review search term reports to identify new keywords and negative keywords.
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
                      <h3 className="font-heading text-dark-gray mb-2">Test and Optimize</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Continuously test different match types and adjust based on performance data and ROI.
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
            Need Expert PPC Management?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our certified PPC specialists can help you optimize your keyword strategy and maximize ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get PPC Audit
              </Button>
            </Link>
            <Link to="/services/paid-ads">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4"
              >
                View PPC Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}