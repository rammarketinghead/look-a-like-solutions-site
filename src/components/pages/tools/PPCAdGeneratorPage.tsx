import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { PenTool, ArrowLeft, Copy, RefreshCw, Target, Zap, CheckCircle, TrendingUp, DollarSign, Users } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface AdCopy {
  headline1: string;
  headline2: string;
  description: string;
  cta: string;
  characterCounts: {
    headline1: number;
    headline2: number;
    description: number;
  };
}

export default function PPCAdGeneratorPage() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [uniqueValue, setUniqueValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [adCopies, setAdCopies] = useState<AdCopy[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const industries = [
    'Digital Marketing',
    'E-commerce',
    'Healthcare',
    'Real Estate',
    'Education',
    'Technology',
    'Finance',
    'Fitness',
    'Food & Restaurant',
    'Travel',
    'Automotive',
    'Legal Services',
    'Home Services',
    'Beauty & Wellness',
    'Consulting'
  ];

  const ctaOptions = [
    'Get Started Today',
    'Learn More',
    'Get Free Quote',
    'Book Now',
    'Shop Now',
    'Download Free',
    'Call Today',
    'Get Consultation',
    'Try Free Trial',
    'Contact Us',
    'Sign Up Free',
    'Get Discount',
    'Schedule Demo',
    'Order Online',
    'Get Info'
  ];

  const generateAdCopies = async () => {
    if (!businessName.trim() || !industry || !targetKeyword.trim()) return;
    
    setIsGenerating(true);
    setHasGenerated(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate multiple ad variations
    const variations: AdCopy[] = [];
    
    // Variation 1 - Direct approach
    const headline1_v1 = `${businessName} - ${targetKeyword}`;
    const headline2_v1 = `Professional ${industry} Services`;
    const description_v1 = `${uniqueValue || 'Get expert results'} with our proven ${industry.toLowerCase()} solutions. Trusted by thousands of customers.`;
    const cta_v1 = ctaOptions[Math.floor(Math.random() * ctaOptions.length)];
    
    variations.push({
      headline1: headline1_v1.substring(0, 30),
      headline2: headline2_v1.substring(0, 30),
      description: description_v1.substring(0, 90),
      cta: cta_v1,
      characterCounts: {
        headline1: Math.min(headline1_v1.length, 30),
        headline2: Math.min(headline2_v1.length, 30),
        description: Math.min(description_v1.length, 90)
      }
    });
    
    // Variation 2 - Benefit-focused
    const headline1_v2 = `Best ${targetKeyword} Solutions`;
    const headline2_v2 = `${businessName} - Trusted Choice`;
    const description_v2 = `Transform your business with our ${industry.toLowerCase()} expertise. ${uniqueValue || 'Fast results, competitive prices'}.`;
    const cta_v2 = ctaOptions[Math.floor(Math.random() * ctaOptions.length)];
    
    variations.push({
      headline1: headline1_v2.substring(0, 30),
      headline2: headline2_v2.substring(0, 30),
      description: description_v2.substring(0, 90),
      cta: cta_v2,
      characterCounts: {
        headline1: Math.min(headline1_v2.length, 30),
        headline2: Math.min(headline2_v2.length, 30),
        description: Math.min(description_v2.length, 90)
      }
    });
    
    // Variation 3 - Question-based
    const headline1_v3 = `Need ${targetKeyword}?`;
    const headline2_v3 = `${businessName} Has Solutions`;
    const description_v3 = `Looking for reliable ${industry.toLowerCase()}? ${uniqueValue || 'We deliver results'} that exceed expectations.`;
    const cta_v3 = ctaOptions[Math.floor(Math.random() * ctaOptions.length)];
    
    variations.push({
      headline1: headline1_v3.substring(0, 30),
      headline2: headline2_v3.substring(0, 30),
      description: description_v3.substring(0, 90),
      cta: cta_v3,
      characterCounts: {
        headline1: Math.min(headline1_v3.length, 30),
        headline2: Math.min(headline2_v3.length, 30),
        description: Math.min(description_v3.length, 90)
      }
    });
    
    // Variation 4 - Urgency-based
    const headline1_v4 = `${targetKeyword} - Limited Time`;
    const headline2_v4 = `${businessName} Special Offer`;
    const description_v4 = `Don't miss out! ${uniqueValue || 'Premium service'} at unbeatable prices. Contact us today for details.`;
    const cta_v4 = 'Get Offer Now';
    
    variations.push({
      headline1: headline1_v4.substring(0, 30),
      headline2: headline2_v4.substring(0, 30),
      description: description_v4.substring(0, 90),
      cta: cta_v4,
      characterCounts: {
        headline1: Math.min(headline1_v4.length, 30),
        headline2: Math.min(headline2_v4.length, 30),
        description: Math.min(description_v4.length, 90)
      }
    });
    
    setAdCopies(variations);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getCharacterColor = (count: number, limit: number) => {
    const percentage = (count / limit) * 100;
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-purple-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-6">
                <PenTool className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  PPC Ad Copy Generator
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Create compelling ad copy that converts
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input Form */}
      <section className="py-12 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center font-heading text-dark-gray">
                Tell Us About Your Business
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Business Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Look A Like Solutions"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Industry *
                  </label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Target Keyword *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., digital marketing services"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Unique Value Proposition
                  </label>
                  <Textarea
                    placeholder="e.g., 10+ years experience, 24/7 support, money-back guarantee"
                    value={uniqueValue}
                    onChange={(e) => setUniqueValue(e.target.value)}
                    className="min-h-[80px] resize-none"
                    maxLength={100}
                  />
                  <div className="text-sm text-secondary mt-1">
                    {uniqueValue.length}/100 characters
                  </div>
                </div>

                <Button 
                  onClick={generateAdCopies}
                  disabled={isGenerating || !businessName.trim() || !industry || !targetKeyword.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating Ad Copies...
                    </div>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate Ad Copies
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
                <h3 className="text-xl font-heading text-dark-gray mb-2">Creating Ad Variations...</h3>
                <p className="font-paragraph text-secondary">Generating multiple high-converting ad copies</p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading text-dark-gray mb-2">
                    Generated Ad Copies
                  </h2>
                  <p className="font-paragraph text-secondary">
                    {adCopies.length} variations ready for testing
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {adCopies.map((adCopy, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="font-heading text-dark-gray">Variation {index + 1}</span>
                          <Badge variant="outline" className="text-primary border-primary">
                            Google Ads Format
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Headline 1 */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-paragraph text-secondary">Headline 1</label>
                              <span className={`text-xs ${getCharacterColor(adCopy.characterCounts.headline1, 30)}`}>
                                {adCopy.characterCounts.headline1}/30
                              </span>
                            </div>
                            <div className="relative">
                              <Input
                                value={adCopy.headline1}
                                readOnly
                                className="pr-10 bg-gray-50"
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-1 top-1 h-8 w-8 p-0"
                                onClick={() => copyToClipboard(adCopy.headline1)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Headline 2 */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-paragraph text-secondary">Headline 2</label>
                              <span className={`text-xs ${getCharacterColor(adCopy.characterCounts.headline2, 30)}`}>
                                {adCopy.characterCounts.headline2}/30
                              </span>
                            </div>
                            <div className="relative">
                              <Input
                                value={adCopy.headline2}
                                readOnly
                                className="pr-10 bg-gray-50"
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-1 top-1 h-8 w-8 p-0"
                                onClick={() => copyToClipboard(adCopy.headline2)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-paragraph text-secondary">Description</label>
                              <span className={`text-xs ${getCharacterColor(adCopy.characterCounts.description, 90)}`}>
                                {adCopy.characterCounts.description}/90
                              </span>
                            </div>
                            <div className="relative">
                              <Textarea
                                value={adCopy.description}
                                readOnly
                                className="pr-10 bg-gray-50 min-h-[80px] resize-none"
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-1 top-1 h-8 w-8 p-0"
                                onClick={() => copyToClipboard(adCopy.description)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* CTA */}
                          <div>
                            <label className="text-sm font-paragraph text-secondary mb-2 block">Call to Action</label>
                            <div className="relative">
                              <Input
                                value={adCopy.cta}
                                readOnly
                                className="pr-10 bg-gray-50"
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-1 top-1 h-8 w-8 p-0"
                                onClick={() => copyToClipboard(adCopy.cta)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Copy All Button */}
                          <Button
                            variant="outline"
                            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            onClick={() => copyToClipboard(
                              `Headline 1: ${adCopy.headline1}\nHeadline 2: ${adCopy.headline2}\nDescription: ${adCopy.description}\nCTA: ${adCopy.cta}`
                            )}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy All Text
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Generate More Button */}
                <div className="text-center mt-8">
                  <Button
                    onClick={generateAdCopies}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New Variations
                  </Button>
                </div>
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
                PPC Ad Copy Best Practices
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Follow these guidelines to create high-converting ad copy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Include Keywords</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use your target keywords in headlines and descriptions to improve relevance and Quality Score.
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
                      <h3 className="font-heading text-dark-gray mb-2">Clear Value Proposition</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Clearly communicate what makes your business unique and why users should choose you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <TrendingUp className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Strong Call-to-Action</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use action-oriented CTAs that tell users exactly what to do next.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Test Multiple Variations</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Always test different ad variations to find what resonates best with your audience.
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
            Need Professional PPC Management?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our PPC experts can help you create, optimize, and manage high-performing ad campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get PPC Consultation
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