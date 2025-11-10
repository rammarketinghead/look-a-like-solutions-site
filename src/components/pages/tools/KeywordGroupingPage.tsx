import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, Download, RefreshCw, Target, Zap, CheckCircle, TrendingUp, Settings, Lightbulb } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface KeywordGroup {
  groupName: string;
  keywords: string[];
  theme: string;
  suggestedAdGroup: string;
}

export default function KeywordGroupingPage() {
  const [keywordList, setKeywordList] = useState('');
  const [isGrouping, setIsGrouping] = useState(false);
  const [groups, setGroups] = useState<KeywordGroup[]>([]);
  const [hasGrouped, setHasGrouped] = useState(false);

  const groupKeywords = async () => {
    if (!keywordList.trim()) return;
    
    setIsGrouping(true);
    setHasGrouped(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Parse keywords
    const keywords = keywordList
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    
    // Mock grouping logic - in real implementation, this would use semantic analysis
    const mockGroups: KeywordGroup[] = [];
    
    // Group 1: Service-related keywords
    const serviceKeywords = keywords.filter(k => 
      k.toLowerCase().includes('service') || 
      k.toLowerCase().includes('agency') || 
      k.toLowerCase().includes('company') ||
      k.toLowerCase().includes('consultant')
    );
    
    if (serviceKeywords.length > 0) {
      mockGroups.push({
        groupName: 'Service Providers',
        keywords: serviceKeywords,
        theme: 'Business services and agencies',
        suggestedAdGroup: 'Service Provider Keywords'
      });
    }
    
    // Group 2: Solution-focused keywords
    const solutionKeywords = keywords.filter(k => 
      k.toLowerCase().includes('solution') || 
      k.toLowerCase().includes('tool') || 
      k.toLowerCase().includes('software') ||
      k.toLowerCase().includes('platform')
    );
    
    if (solutionKeywords.length > 0) {
      mockGroups.push({
        groupName: 'Solutions & Tools',
        keywords: solutionKeywords,
        theme: 'Software and solution-based searches',
        suggestedAdGroup: 'Solution Keywords'
      });
    }
    
    // Group 3: How-to and informational keywords
    const howToKeywords = keywords.filter(k => 
      k.toLowerCase().includes('how to') || 
      k.toLowerCase().includes('what is') || 
      k.toLowerCase().includes('guide') ||
      k.toLowerCase().includes('tips') ||
      k.toLowerCase().includes('best')
    );
    
    if (howToKeywords.length > 0) {
      mockGroups.push({
        groupName: 'Informational Queries',
        keywords: howToKeywords,
        theme: 'Educational and how-to content',
        suggestedAdGroup: 'Informational Keywords'
      });
    }
    
    // Group 4: Cost/pricing keywords
    const costKeywords = keywords.filter(k => 
      k.toLowerCase().includes('cost') || 
      k.toLowerCase().includes('price') || 
      k.toLowerCase().includes('cheap') ||
      k.toLowerCase().includes('affordable') ||
      k.toLowerCase().includes('budget')
    );
    
    if (costKeywords.length > 0) {
      mockGroups.push({
        groupName: 'Price-Conscious',
        keywords: costKeywords,
        theme: 'Cost and pricing related searches',
        suggestedAdGroup: 'Price Keywords'
      });
    }
    
    // Group 5: Location-based keywords
    const locationKeywords = keywords.filter(k => 
      k.toLowerCase().includes('near me') || 
      k.toLowerCase().includes('local') || 
      k.toLowerCase().includes('city') ||
      /\b(in|near|around)\b/.test(k.toLowerCase())
    );
    
    if (locationKeywords.length > 0) {
      mockGroups.push({
        groupName: 'Local Searches',
        keywords: locationKeywords,
        theme: 'Location-based searches',
        suggestedAdGroup: 'Local Keywords'
      });
    }
    
    // Group 6: Remaining keywords (general)
    const groupedKeywords = mockGroups.flatMap(g => g.keywords);
    const remainingKeywords = keywords.filter(k => !groupedKeywords.includes(k));
    
    if (remainingKeywords.length > 0) {
      // Further sub-group remaining keywords by common words
      const commonWords = ['digital', 'marketing', 'seo', 'social', 'media', 'content', 'email', 'ppc', 'ads'];
      
      commonWords.forEach(word => {
        const wordKeywords = remainingKeywords.filter(k => 
          k.toLowerCase().includes(word) && !groupedKeywords.includes(k)
        );
        
        if (wordKeywords.length > 0) {
          mockGroups.push({
            groupName: `${word.charAt(0).toUpperCase() + word.slice(1)} Related`,
            keywords: wordKeywords,
            theme: `Keywords related to ${word}`,
            suggestedAdGroup: `${word.charAt(0).toUpperCase() + word.slice(1)} Keywords`
          });
          groupedKeywords.push(...wordKeywords);
        }
      });
      
      // Any truly remaining keywords go to a general group
      const finalRemaining = remainingKeywords.filter(k => !groupedKeywords.includes(k));
      if (finalRemaining.length > 0) {
        mockGroups.push({
          groupName: 'General Keywords',
          keywords: finalRemaining,
          theme: 'Miscellaneous keywords',
          suggestedAdGroup: 'General Keywords'
        });
      }
    }
    
    setGroups(mockGroups);
    setIsGrouping(false);
  };

  const exportGroups = () => {
    let csvContent = 'Group Name,Keyword,Theme,Suggested Ad Group\n';
    
    groups.forEach(group => {
      group.keywords.forEach(keyword => {
        csvContent += `"${group.groupName}","${keyword}","${group.theme}","${group.suggestedAdGroup}"\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-groups.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalKeywords = groups.reduce((sum, group) => sum + group.keywords.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-6">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  Keyword Grouping Tool
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Organize keywords into logical groups for better campaign structure
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
              <div className="space-y-4">
                <div>
                  <Textarea
                    placeholder={`Enter your keywords, one per line:

digital marketing services
seo optimization
social media marketing
ppc advertising
content marketing strategy
email marketing tools
local seo services
how to improve seo
best digital marketing agency
affordable seo services`}
                    value={keywordList}
                    onChange={(e) => setKeywordList(e.target.value)}
                    className="min-h-[200px] text-sm font-mono"
                  />
                  <div className="flex justify-between text-sm text-secondary mt-2">
                    <span>
                      Keywords: {keywordList.split('\n').filter(k => k.trim().length > 0).length}
                    </span>
                    <span>
                      Lines: {keywordList.split('\n').length}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={groupKeywords}
                  disabled={isGrouping || !keywordList.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isGrouping ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Grouping Keywords...
                    </div>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Group Keywords
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm font-paragraph text-secondary mt-3 text-center">
                Our AI will analyze your keywords and group them by semantic similarity and search intent
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {hasGrouped && (
        <section className="py-12 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-8">
            {isGrouping ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-heading text-dark-gray mb-2">Analyzing Keywords...</h3>
                <p className="font-paragraph text-secondary">Grouping by semantic similarity and search intent</p>
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
                      Keyword Groups
                    </h2>
                    <p className="font-paragraph text-secondary">
                      {groups.length} groups created from {totalKeywords} keywords
                    </p>
                  </div>
                  {groups.length > 0 && (
                    <div className="flex gap-3">
                      <Button
                        onClick={exportGroups}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                      <Button
                        onClick={groupKeywords}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Re-group
                      </Button>
                    </div>
                  )}
                </div>

                <Tabs defaultValue="groups" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="groups">Group View</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>

                  <TabsContent value="groups" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {groups.map((group, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg font-heading text-dark-gray mb-2">
                                  {group.groupName}
                                </CardTitle>
                                <p className="text-sm font-paragraph text-secondary mb-2">
                                  {group.theme}
                                </p>
                                <Badge variant="outline" className="text-primary border-primary">
                                  {group.keywords.length} keywords
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-sm font-paragraph text-dark-gray font-medium mb-2">
                                  Suggested Ad Group: {group.suggestedAdGroup}
                                </h4>
                              </div>
                              <div>
                                <h4 className="text-sm font-paragraph text-dark-gray font-medium mb-2">
                                  Keywords:
                                </h4>
                                <div className="max-h-40 overflow-y-auto">
                                  <div className="space-y-1">
                                    {group.keywords.map((keyword, keywordIndex) => (
                                      <div
                                        key={keywordIndex}
                                        className="text-sm font-paragraph text-secondary bg-gray-50 px-3 py-1 rounded"
                                      >
                                        {keyword}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="summary" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-dark-gray">
                          Grouping Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="text-center">
                            <div className="text-3xl font-heading text-primary mb-2">{groups.length}</div>
                            <div className="text-sm font-paragraph text-secondary">Total Groups</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-heading text-primary mb-2">{totalKeywords}</div>
                            <div className="text-sm font-paragraph text-secondary">Total Keywords</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-heading text-primary mb-2">
                              {Math.round(totalKeywords / groups.length)}
                            </div>
                            <div className="text-sm font-paragraph text-secondary">Avg per Group</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-heading text-dark-gray">Group Breakdown:</h4>
                          {groups.map((group, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                              <div>
                                <span className="font-paragraph text-dark-gray font-medium">{group.groupName}</span>
                                <span className="text-sm font-paragraph text-secondary ml-2">({group.theme})</span>
                              </div>
                              <Badge variant="outline">
                                {group.keywords.length} keywords
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
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
                Keyword Grouping Best Practices
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Optimize your campaign structure with these expert tips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Group by Intent</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Group keywords based on user search intent - informational, navigational, commercial, or transactional.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Keep Groups Focused</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Aim for 10-20 closely related keywords per group to maintain relevance and improve Quality Score.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Settings className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Match Ad Copy</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Create specific ad copy for each group to improve relevance and click-through rates.
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
                      <h3 className="font-heading text-dark-gray mb-2">Monitor Performance</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Regularly review group performance and reorganize keywords based on actual data.
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
            Need Help with Campaign Structure?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our PPC experts can help you build optimized campaign structures that drive better results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get Campaign Audit
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