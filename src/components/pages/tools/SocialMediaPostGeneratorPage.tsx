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
import { Share2, ArrowLeft, Copy, RefreshCw, Zap, Hash, TrendingUp, Users, Lightbulb, Target } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface PostIdea {
  platform: string;
  content: string;
  hashtags: string[];
  postType: string;
  engagement: string;
}

export default function SocialMediaPostGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [platform, setPlatform] = useState('');
  const [tone, setTone] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [postIdeas, setPostIdeas] = useState<PostIdea[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const industries = [
    'Digital Marketing', 'E-commerce', 'Healthcare', 'Real Estate', 'Education',
    'Technology', 'Finance', 'Fitness', 'Food & Restaurant', 'Travel',
    'Fashion', 'Beauty', 'Automotive', 'Legal', 'Consulting'
  ];

  const platforms = [
    'All Platforms', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn', 
    'TikTok', 'YouTube', 'Pinterest'
  ];

  const tones = [
    'Professional', 'Casual', 'Inspirational', 'Educational', 'Humorous',
    'Motivational', 'Conversational', 'Authoritative'
  ];

  const generatePosts = async () => {
    if (!topic.trim() || !industry || !tone) return;
    
    setIsGenerating(true);
    setHasGenerated(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate post ideas based on inputs
    const platformsToGenerate = platform === 'All Platforms' 
      ? ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok']
      : [platform];

    const ideas: PostIdea[] = [];

    platformsToGenerate.forEach(plt => {
      // Generate 2-3 ideas per platform
      const postCount = Math.floor(Math.random() * 2) + 2;
      
      for (let i = 0; i < postCount; i++) {
        const postTypes = {
          Facebook: ['Question', 'Tips', 'Behind the Scenes', 'User Generated Content'],
          Instagram: ['Story', 'Carousel', 'Reel', 'Quote'],
          Twitter: ['Thread', 'Poll', 'Quote Tweet', 'Tip'],
          LinkedIn: ['Article', 'Industry Insight', 'Professional Tip', 'Company Update'],
          TikTok: ['Tutorial', 'Trend', 'Behind the Scenes', 'Challenge']
        };

        const postType = postTypes[plt as keyof typeof postTypes][Math.floor(Math.random() * 4)];
        
        let content = '';
        let hashtags: string[] = [];

        // Generate content based on platform and topic
        switch (plt) {
          case 'Facebook':
            content = generateFacebookPost(topic, industry, tone, postType);
            hashtags = generateHashtags(topic, industry, 3);
            break;
          case 'Instagram':
            content = generateInstagramPost(topic, industry, tone, postType);
            hashtags = generateHashtags(topic, industry, 8);
            break;
          case 'Twitter':
            content = generateTwitterPost(topic, industry, tone, postType);
            hashtags = generateHashtags(topic, industry, 3);
            break;
          case 'LinkedIn':
            content = generateLinkedInPost(topic, industry, tone, postType);
            hashtags = generateHashtags(topic, industry, 5);
            break;
          case 'TikTok':
            content = generateTikTokPost(topic, industry, tone, postType);
            hashtags = generateHashtags(topic, industry, 5);
            break;
        }

        ideas.push({
          platform: plt,
          content,
          hashtags,
          postType,
          engagement: ['High', 'Medium', 'High'][Math.floor(Math.random() * 3)]
        });
      }
    });

    setPostIdeas(ideas);
    setIsGenerating(false);
  };

  const generateFacebookPost = (topic: string, industry: string, tone: string, postType: string) => {
    const templates = {
      Question: `What's your biggest challenge with ${topic.toLowerCase()}? Share your experience in the comments! 💬`,
      Tips: `5 essential tips for ${topic.toLowerCase()} in ${industry.toLowerCase()}:\n\n1. Start with clear goals\n2. Know your audience\n3. Measure everything\n4. Stay consistent\n5. Adapt and improve\n\nWhich tip resonates most with you?`,
      'Behind the Scenes': `Take a peek behind the scenes of our ${topic.toLowerCase()} process! Here's how we help ${industry.toLowerCase()} businesses succeed... 🎬`,
      'User Generated Content': `Amazing results from our client! They improved their ${topic.toLowerCase()} by 150% in just 3 months. What's your success story? 🌟`
    };
    return templates[postType as keyof typeof templates] || `Discover the power of ${topic.toLowerCase()} for your ${industry.toLowerCase()} business!`;
  };

  const generateInstagramPost = (topic: string, industry: string, tone: string, postType: string) => {
    const templates = {
      Story: `Swipe to see how ${topic.toLowerCase()} transformed this ${industry.toLowerCase()} business! ➡️`,
      Carousel: `Slide 1/5: The ultimate guide to ${topic.toLowerCase()} 📚\n\nSwipe to discover actionable strategies that work! ➡️`,
      Reel: `POV: You finally understand ${topic.toLowerCase()} 🤯\n\nSave this for later! 📌`,
      Quote: `"Success in ${topic.toLowerCase()} isn't about perfection, it's about progress." 💫\n\nDouble tap if you agree! ❤️`
    };
    return templates[postType as keyof typeof templates] || `Transform your ${industry.toLowerCase()} business with ${topic.toLowerCase()}! ✨`;
  };

  const generateTwitterPost = (topic: string, industry: string, tone: string, postType: string) => {
    const templates = {
      Thread: `🧵 Thread: Everything you need to know about ${topic.toLowerCase()} in ${industry.toLowerCase()}\n\n1/ Let's start with the basics...`,
      Poll: `Quick poll for ${industry.toLowerCase()} professionals:\n\nWhat's your biggest ${topic.toLowerCase()} challenge?\n\n🔄 RT for reach!`,
      'Quote Tweet': `This! 👆 ${topic.toLowerCase()} is crucial for ${industry.toLowerCase()} success. Here's why...`,
      Tip: `💡 Pro tip: The secret to ${topic.toLowerCase()} success? Start small, measure everything, and scale what works.\n\n#${industry.replace(/\s+/g, '')}Tips`
    };
    return templates[postType as keyof typeof templates] || `Master ${topic.toLowerCase()} for your ${industry.toLowerCase()} business 🚀`;
  };

  const generateLinkedInPost = (topic: string, industry: string, tone: string, postType: string) => {
    const templates = {
      Article: `The future of ${topic.toLowerCase()} in ${industry.toLowerCase()}: What you need to know\n\nAfter working with 100+ ${industry.toLowerCase()} companies, here are the key trends I'm seeing...`,
      'Industry Insight': `Insight from the ${industry.toLowerCase()} industry: ${topic.toLowerCase()} is no longer optional—it's essential.\n\nHere's what successful companies are doing differently...`,
      'Professional Tip': `Professional insight: The most successful ${industry.toLowerCase()} leaders I know have one thing in common—they've mastered ${topic.toLowerCase()}.\n\nHere's their playbook...`,
      'Company Update': `Exciting update: We just helped another ${industry.toLowerCase()} client achieve remarkable results with ${topic.toLowerCase()}!\n\nThe results speak for themselves...`
    };
    return templates[postType as keyof typeof templates] || `Elevate your ${industry.toLowerCase()} strategy with effective ${topic.toLowerCase()}.`;
  };

  const generateTikTokPost = (topic: string, industry: string, tone: string, postType: string) => {
    const templates = {
      Tutorial: `How to master ${topic.toLowerCase()} in 60 seconds ⏰\n\nStep 1: Start here...\nStep 2: Then do this...\nStep 3: Finally...\n\nSave for later! 📌`,
      Trend: `Using this trending sound to explain ${topic.toLowerCase()} 🎵\n\nIt's giving ${industry.toLowerCase()} energy ✨`,
      'Behind the Scenes': `POV: You're watching me create a ${topic.toLowerCase()} strategy 👀\n\nThe process is everything! 🔥`,
      Challenge: `Try this ${topic.toLowerCase()} challenge! 🚀\n\nTag a friend who needs to see this 👇`
    };
    return templates[postType as keyof typeof templates] || `${topic.toLowerCase()} tips that actually work! 💯`;
  };

  const generateHashtags = (topic: string, industry: string, count: number) => {
    const baseHashtags = [
      `#${topic.replace(/\s+/g, '')}`,
      `#${industry.replace(/\s+/g, '')}`,
      '#DigitalMarketing',
      '#BusinessGrowth',
      '#Marketing',
      '#Success',
      '#Tips',
      '#Strategy',
      '#Growth',
      '#Business',
      '#Entrepreneur',
      '#SmallBusiness',
      '#OnlineMarketing',
      '#SocialMedia',
      '#ContentMarketing'
    ];
    
    return baseHashtags.slice(0, count);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      Facebook: 'bg-blue-100 text-blue-800',
      Instagram: 'bg-pink-100 text-pink-800',
      Twitter: 'bg-sky-100 text-sky-800',
      LinkedIn: 'bg-indigo-100 text-indigo-800',
      TikTok: 'bg-purple-100 text-purple-800'
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-violet-50 to-violet-100">
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
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl flex items-center justify-center mr-6">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-dark-gray mb-2">
                  Social Media Post Idea Generator
                </h1>
                <p className="text-lg font-paragraph text-secondary">
                  Generate engaging social media post ideas for all platforms
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
                Tell Us About Your Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Topic/Theme *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., digital marketing, productivity, wellness"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
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
                    Platform
                  </label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select platform (or all)" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((plt) => (
                        <SelectItem key={plt} value={plt}>
                          {plt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-paragraph text-dark-gray mb-2">
                    Tone *
                  </label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select tone of voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generatePosts}
                  disabled={isGenerating || !topic.trim() || !industry || !tone}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating Ideas...
                    </div>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate Post Ideas
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
                <h3 className="text-xl font-heading text-dark-gray mb-2">Creating Post Ideas...</h3>
                <p className="font-paragraph text-secondary">Generating engaging content for your audience</p>
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
                      Generated Post Ideas
                    </h2>
                    <p className="font-paragraph text-secondary">
                      {postIdeas.length} creative ideas ready to engage your audience
                    </p>
                  </div>
                  <Button
                    onClick={generatePosts}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New Ideas
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {postIdeas.map((idea, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Badge className={getPlatformColor(idea.platform)}>
                              {idea.platform}
                            </Badge>
                            <Badge variant="outline">
                              {idea.postType}
                            </Badge>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {idea.engagement} Engagement
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(idea.content + '\n\n' + idea.hashtags.join(' '))}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-paragraph text-dark-gray whitespace-pre-line">
                              {idea.content}
                            </p>
                          </div>
                          
                          {idea.hashtags.length > 0 && (
                            <div>
                              <h4 className="text-sm font-paragraph text-secondary mb-2 flex items-center">
                                <Hash className="h-4 w-4 mr-1" />
                                Suggested Hashtags:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {idea.hashtags.map((hashtag, hashIndex) => (
                                  <span
                                    key={hashIndex}
                                    className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded"
                                  >
                                    {hashtag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                Social Media Best Practices
              </h2>
              <p className="text-lg font-paragraph text-secondary">
                Maximize engagement with these proven strategies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Know Your Audience</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Create content that resonates with your specific audience's interests, pain points, and preferences.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <TrendingUp className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Post Consistently</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Maintain a regular posting schedule to keep your audience engaged and build brand awareness.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Engage Authentically</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Respond to comments, ask questions, and create conversations to build genuine relationships.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Lightbulb className="h-6 w-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-dark-gray mb-2">Mix Content Types</h3>
                      <p className="font-paragraph text-secondary text-sm">
                        Use a variety of content formats: images, videos, stories, polls, and user-generated content.
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
            Need a Complete Social Media Strategy?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
            Our social media experts can create a comprehensive strategy that drives engagement and grows your following.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                Get Social Media Strategy
              </Button>
            </Link>
            <Link to="/services/social-media">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4"
              >
                View Social Media Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}