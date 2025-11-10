import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Target, Download, ArrowLeft, BarChart3, Eye, DollarSign, Lightbulb } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface KeywordResult {
  keyword: string;
  searchVolume: number;
  competition: 'Low' | 'Medium' | 'High';
  cpc: number;
  difficulty: number;
  trend: 'up' | 'down' | 'stable';
}

export default function SEOKeywordResearchPage() {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock data for demonstration
  const mockResults: KeywordResult[] = [
    { keyword: 'digital marketing', searchVolume: 49500, competition: 'High', cpc: 2.45, difficulty: 78, trend: 'up' },
    { keyword: 'digital marketing services', searchVolume: 8100, competition: 'Medium', cpc: 3.20, difficulty: 65, trend: 'up' },
    { keyword: 'digital marketing agency', searchVolume: 12100, competition: 'High', cpc: 4.15, difficulty: 82, trend: 'stable' },
    { keyword: 'digital marketing strategy', searchVolume: 3600, competition: 'Medium', cpc: 2.80, difficulty: 58, trend: 'up' },
    { keyword: 'digital marketing consultant', searchVolume: 1900, competition: 'Low', cpc: 3.50, difficulty: 45, trend: 'up' },
    { keyword: 'digital marketing course', searchVolume: 14800, competition: 'Medium', cpc: 1.95, difficulty: 52, trend: 'down' },
    { keyword: 'digital marketing tools', searchVolume: 5400, competition: 'Medium', cpc: 2.10, difficulty: 48, trend: 'stable' },
    { keyword: 'digital marketing trends', searchVolume: 2400, competition: 'Low', cpc: 1.75, difficulty: 35, trend: 'up' },
  ];

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter mock results based on keyword
    const filteredResults = mockResults.filter(result => 
      result.keyword.toLowerCase().includes(keyword.toLowerCase())
    );
    
    setResults(filteredResults.length > 0 ? filteredResults : mockResults);
    setIsLoading(false);
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600';
    if (difficulty < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const exportResults = () => {
    const csvContent = [
      ['Keyword', 'Search Volume', 'Competition', 'CPC', 'Difficulty', 'Trend'],
      ...results.map(result => [
        result.keyword,
        result.searchVolume.toString(),
        result.competition,
        `$${result.cpc}`,
        result.difficulty.toString(),
        result.trend
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-research-results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  SEO Keyword Research Tool
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Discover high-value keywords to boost your search rankings
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center font-heading text-dark-gray">
                Enter Your Seed Keyword
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="e.g., digital marketing"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 h-12 text-lg"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading || !keyword.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Searching...
                    </div>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Research
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm font-paragraph text-secondary mt-3 text-center">
                Enter a keyword or phrase to discover related keywords and their metrics
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-heading text-dark-gray mb-2">Analyzing Keywords...</h3>
                <p className="font-paragraph text-secondary">This may take a few moments</p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-heading text-dark-gray mb-2">
                      Keyword Research Results
                    </h2>
                    <p className="font-paragraph text-secondary">
                      Found {results.length} keyword opportunities for "{keyword}"
                    </p>
                  </div>
                  {results.length > 0 && (
                    <Button 
                      onClick={exportResults}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  )}
                </div>

                <Tabs defaultValue="table" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="cards">Card View</TabsTrigger>
                  </TabsList>

                  <TabsContent value="table" className="mt-6">
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-4 text-left text-sm font-heading text-dark-gray">Keyword</th>
                                <th className="px-6 py-4 text-left text-sm font-heading text-dark-gray">Volume</th>
                                <th className="px-6 py-4 text-left text-sm font-heading text-dark-gray">Competition</th>
                                <th className="px-6 py-4 text-left text-sm font-heading text-dark-gray">CPC</th>
                                <th className="px-6 py-4 text-left text-sm font-heading text-dark-gray">Difficulty</th>
                                <th className="px-6 py-4 text-left text-sm font-heading text-dark-gray">Trend</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {results.map((result, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 font-paragraph text-dark-gray font-medium">
                                    {result.keyword}
                                  </td>
                                  <td className="px-6 py-4 font-paragraph text-secondary">
                                    {result.searchVolume.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-4">
                                    <Badge className={getCompetitionColor(result.competition)}>
                                      {result.competition}
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4 font-paragraph text-secondary">
                                    ${result.cpc.toFixed(2)}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`font-paragraph font-medium ${getDifficultyColor(result.difficulty)}`}>
                                      {result.difficulty}%
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center">
                                      {result.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                                      {result.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                                      {result.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="cards" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.map((result, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-heading text-dark-gray">
                              {result.keyword}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-paragraph text-secondary">Search Volume</span>
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 text-primary mr-1" />
                                  <span className="font-paragraph text-dark-gray font-medium">
                                    {result.searchVolume.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-paragraph text-secondary">Competition</span>
                                <Badge className={getCompetitionColor(result.competition)}>
                                  {result.competition}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-paragraph text-secondary">CPC</span>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                                  <span className="font-paragraph text-dark-gray font-medium">
                                    ${result.cpc.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-paragraph text-secondary">Difficulty</span>
                                <div className="flex items-center">
                                  <BarChart3 className="h-4 w-4 text-primary mr-1" />
                                  <span className={`font-paragraph font-medium ${getDifficultyColor(result.difficulty)}`}>
                                    {result.difficulty}%
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-paragraph text-secondary">Trend</span>
                                <div className="flex items-center">
                                  {result.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                                  {result.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                                  {result.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full" />}
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

      {/* Tips Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading text-dark-gray mb-4">
                Keyword Research Tips
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Make the most of your keyword research with these expert tips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Focus on Intent</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Look for keywords that match your audience's search intent. Commercial keywords often convert better than informational ones.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Long-tail Keywords</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Target longer, more specific phrases. They have lower competition and higher conversion rates.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <BarChart3 className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Check Competition</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Balance search volume with competition. Sometimes lower volume keywords with less competition are better targets.
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
                      <h3 className="font-heading text-dark-gray mb-2">Monitor Trends</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Keep an eye on keyword trends. Growing keywords can be great opportunities for early adoption.
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
            Need Professional SEO Help?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our SEO experts can help you develop a comprehensive keyword strategy and implement it effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get SEO Consultation
              </Button>
            </Link>
            <Link to="/services/seo">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4"
              >
                View SEO Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}