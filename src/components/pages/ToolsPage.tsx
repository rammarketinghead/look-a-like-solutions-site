import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/ui/seo-head';
import { Link } from 'react-router-dom';
import { 
  Search, Mail, PenTool, Layers, Target, ArrowRight, Zap, CheckCircle, Users, TrendingUp,
  FileText, Eye, Link2, Gauge, Share2, ImageIcon, Lightbulb, Megaphone, BookOpen,
  Hash, Settings, Palette, Globe, Network, Wand2
} from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ToolsPage() {
  const tools = [
    {
      id: 'seo-keyword-research',
      title: 'SEO Keyword Research Tool',
      description: 'Discover high-value keywords for your SEO strategy. Find search volume, competition, and related keywords to boost your rankings.',
      icon: Search,
      href: '/tools/seo-keyword-research',
      features: ['Search Volume Data', 'Competition Analysis', 'Related Keywords', 'Long-tail Suggestions'],
      color: 'from-blue-500 to-blue-600',
      category: 'SEO'
    },
    {
      id: 'email-subject-tester',
      title: 'Email Subject Line Tester',
      description: 'Test and optimize your email subject lines for better open rates. Get spam score analysis and engagement predictions.',
      icon: Mail,
      href: '/tools/email-subject-tester',
      features: ['Spam Score Analysis', 'Open Rate Prediction', 'A/B Testing', 'Best Practice Tips'],
      color: 'from-green-500 to-green-600',
      category: 'Email Marketing'
    },
    {
      id: 'ppc-ad-generator',
      title: 'PPC Ad Copy Generator',
      description: 'Generate compelling ad copy for your PPC campaigns. Create headlines, descriptions, and CTAs that convert.',
      icon: PenTool,
      href: '/tools/ppc-ad-generator',
      features: ['Multiple Variations', 'Character Limits', 'CTA Suggestions', 'Industry Templates'],
      color: 'from-purple-500 to-purple-600',
      category: 'PPC'
    },
    {
      id: 'keyword-grouping',
      title: 'Keyword Grouping Tool',
      description: 'Organize your keywords into logical groups for better campaign structure and improved Quality Score.',
      icon: Layers,
      href: '/tools/keyword-grouping',
      features: ['Auto Grouping', 'Manual Organization', 'Export Options', 'Campaign Structure'],
      color: 'from-orange-500 to-orange-600',
      category: 'SEO'
    },
    {
      id: 'keyword-match-types',
      title: 'Keyword Match Types Generator',
      description: 'Generate all keyword match types for your PPC campaigns. Broad, phrase, exact, and negative match variations.',
      icon: Target,
      href: '/tools/keyword-match-types',
      features: ['All Match Types', 'Bulk Generation', 'Negative Keywords', 'Export Ready'],
      color: 'from-red-500 to-red-600',
      category: 'PPC'
    },
    {
      id: 'meta-title-description-generator',
      title: 'Meta Title & Description Generator',
      description: 'Create SEO-optimized meta titles and descriptions that improve click-through rates and search rankings.',
      icon: FileText,
      href: '/tools/meta-title-description-generator',
      features: ['Character Count', 'SEO Optimization', 'Multiple Variations', 'Best Practices'],
      color: 'from-indigo-500 to-indigo-600',
      category: 'SEO'
    },
    {
      id: 'serp-snippet-preview',
      title: 'SERP Snippet Preview Tool',
      description: 'Preview how your pages will appear in Google search results. Test titles, descriptions, and URLs.',
      icon: Eye,
      href: '/tools/serp-snippet-preview',
      features: ['Real-time Preview', 'Mobile & Desktop', 'Character Limits', 'Click-through Optimization'],
      color: 'from-cyan-500 to-cyan-600',
      category: 'SEO'
    },
    {
      id: 'backlink-checker',
      title: 'Backlink Checker (Basic)',
      description: 'Analyze your website\'s backlink profile. Check domain authority, anchor text, and link quality.',
      icon: Link2,
      href: '/tools/backlink-checker',
      features: ['Domain Analysis', 'Link Quality', 'Anchor Text', 'Competitor Comparison'],
      color: 'from-teal-500 to-teal-600',
      category: 'SEO'
    },
    {
      id: 'utm-link-builder',
      title: 'UTM Link Builder',
      description: 'Create trackable UTM links for your marketing campaigns. Monitor traffic sources and campaign performance.',
      icon: Link2,
      href: '/tools/utm-link-builder',
      features: ['Campaign Tracking', 'URL Shortening', 'Bulk Generation', 'Analytics Ready'],
      color: 'from-pink-500 to-pink-600',
      category: 'Analytics'
    },
    {
      id: 'website-speed-test',
      title: 'Website Speed Test (Basic)',
      description: 'Test your website\'s loading speed and get optimization recommendations for better user experience.',
      icon: Gauge,
      href: '/tools/website-speed-test',
      features: ['Performance Metrics', 'Optimization Tips', 'Mobile Testing', 'Core Web Vitals'],
      color: 'from-yellow-500 to-yellow-600',
      category: 'Technical SEO'
    },
    {
      id: 'social-media-post-generator',
      title: 'Social Media Post Idea Generator',
      description: 'Generate engaging social media post ideas for all platforms. Never run out of content ideas again.',
      icon: Share2,
      href: '/tools/social-media-post-generator',
      features: ['Platform Specific', 'Trending Topics', 'Hashtag Suggestions', 'Content Calendar'],
      color: 'from-violet-500 to-violet-600',
      category: 'Social Media'
    },
    {
      id: 'image-alt-text-generator',
      title: 'Image Alt Text Generator',
      description: 'Generate SEO-friendly alt text for your images. Improve accessibility and search engine visibility.',
      icon: ImageIcon,
      href: '/tools/image-alt-text-generator',
      features: ['AI-Powered', 'SEO Optimized', 'Accessibility Focus', 'Bulk Processing'],
      color: 'from-emerald-500 to-emerald-600',
      category: 'SEO'
    },
    {
      id: 'blog-topic-generator',
      title: 'Blog Topic Generator',
      description: 'Generate compelling blog post topics and titles. Get endless content ideas for your blog strategy.',
      icon: Lightbulb,
      href: '/tools/blog-topic-generator',
      features: ['Trending Topics', 'SEO Keywords', 'Multiple Niches', 'Content Planning'],
      color: 'from-amber-500 to-amber-600',
      category: 'Content Marketing'
    },
    {
      id: 'google-ads-generator',
      title: 'Google Ads Headline/Description Generator',
      description: 'Create high-converting Google Ads headlines and descriptions. Optimize for better click-through rates.',
      icon: Megaphone,
      href: '/tools/google-ads-headline-generator',
      features: ['Character Limits', 'A/B Variations', 'Industry Templates', 'Performance Tips'],
      color: 'from-rose-500 to-rose-600',
      category: 'PPC'
    },
    {
      id: 'content-readability-checker',
      title: 'Content Readability Checker',
      description: 'Analyze your content\'s readability score. Ensure your content is easy to read and understand.',
      icon: BookOpen,
      href: '/tools/content-readability-checker',
      features: ['Flesch Score', 'Grade Level', 'Improvement Tips', 'SEO Benefits'],
      color: 'from-lime-500 to-lime-600',
      category: 'Content Marketing'
    },
    {
      id: 'hashtag-generator',
      title: 'Hashtag Generator',
      description: 'Generate relevant hashtags for your social media posts. Increase reach and engagement across platforms.',
      icon: Hash,
      href: '/tools/hashtag-generator',
      features: ['Platform Specific', 'Trending Tags', 'Niche Targeting', 'Performance Tracking'],
      color: 'from-sky-500 to-sky-600',
      category: 'Social Media'
    },
    {
      id: 'robots-txt-generator',
      title: 'Robots.txt Generator',
      description: 'Generate a proper robots.txt file for your website. Control how search engines crawl your site.',
      icon: Settings,
      href: '/tools/robots-txt-generator',
      features: ['Custom Rules', 'Sitemap Integration', 'Validation', 'Best Practices'],
      color: 'from-slate-500 to-slate-600',
      category: 'Technical SEO'
    },
    {
      id: 'xml-sitemap-generator',
      title: 'XML Sitemap Generator (Basic)',
      description: 'Generate XML sitemaps for your website. Help search engines discover and index your content.',
      icon: Network,
      href: '/tools/xml-sitemap-generator',
      features: ['Auto Discovery', 'Priority Settings', 'Change Frequency', 'Validation'],
      color: 'from-stone-500 to-stone-600',
      category: 'Technical SEO'
    },
    {
      id: 'favicon-generator',
      title: 'Favicon Generator',
      description: 'Generate favicons in all required sizes and formats. Ensure your brand appears correctly across all devices.',
      icon: Palette,
      href: '/tools/favicon-generator',
      features: ['Multiple Sizes', 'All Formats', 'Preview', 'Download Package'],
      color: 'from-fuchsia-500 to-fuchsia-600',
      category: 'Web Development'
    },
    {
      id: 'open-graph-generator',
      title: 'Open Graph Tag Generator',
      description: 'Generate Open Graph meta tags for better social media sharing. Control how your content appears when shared.',
      icon: Globe,
      href: '/tools/open-graph-tag-generator',
      features: ['Social Preview', 'Multiple Platforms', 'Image Optimization', 'Validation'],
      color: 'from-neutral-500 to-neutral-600',
      category: 'Social Media'
    },
    {
      id: 'ai-humanizer',
      title: 'AI Humanizer',
      description: 'Transform AI-generated content into natural, warm, human-sounding text. Remove robotic tone and add genuine personality.',
      icon: Wand2,
      href: '/tools/ai-humanizer',
      features: ['Remove Robotic Tone', 'Natural Flow', 'Multiple Tones', 'Preserve Meaning'],
      color: 'from-purple-500 to-purple-600',
      category: 'Content Marketing'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Save Time',
      description: 'Automate repetitive tasks and focus on strategy'
    },
    {
      icon: TrendingUp,
      title: 'Improve Performance',
      description: 'Data-driven insights for better campaign results'
    },
    {
      icon: CheckCircle,
      title: 'Free to Use',
      description: 'All tools are completely free with no hidden costs'
    },
    {
      icon: Users,
      title: 'Expert Built',
      description: 'Created by digital marketing professionals'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Free Digital Marketing Tools - SEO, PPC & Social Media Tools"
        description="Access our collection of free digital marketing tools including SEO keyword research, PPC ad generator, email subject tester, meta title generator, and more. Boost your marketing efforts with professional tools."
        keywords="free digital marketing tools, SEO tools, keyword research tool, PPC ad generator, email subject tester, meta title generator, SERP preview tool, UTM builder, social media tools"
        type="website"
      />
      
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-heading text-dark-gray mb-6">
              Free Digital Marketing
              <span className="text-primary block">Tools & Resources</span>
            </h1>
            <p className="text-xl font-paragraph text-secondary mb-8 max-w-3xl mx-auto">
              Boost your marketing performance with our collection of free, professional-grade tools. 
              Built by experts, designed for results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
                >
                  Get Expert Help
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={fadeInVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-heading text-dark-gray mb-2">{benefit.title}</h3>
                <p className="font-paragraph text-secondary text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-grid" className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Choose Your Tool
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-2xl mx-auto">
              Each tool is designed to solve specific marketing challenges and help you achieve better results.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={fadeInVariants}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-3`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg font-heading text-dark-gray leading-tight">
                        {tool.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    <p className="font-paragraph text-secondary text-sm leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      {tool.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          <span className="font-paragraph text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={tool.href}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group-hover:bg-primary/90 text-sm">
                        Use Tool
                        <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h2 className="text-4xl font-heading text-background mb-6">
              Need More Advanced Solutions?
            </h2>
            <p className="text-lg font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              While our free tools are powerful, sometimes you need custom strategies and expert guidance. 
              Let's discuss how we can help scale your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                  Get Expert Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
