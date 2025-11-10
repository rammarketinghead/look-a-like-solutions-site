import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { Search, Mail, PenTool, Layers, Target, ArrowRight, Zap, CheckCircle, Users, TrendingUp } from 'lucide-react';

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
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'email-subject-tester',
      title: 'Email Subject Line Tester',
      description: 'Test and optimize your email subject lines for better open rates. Get spam score analysis and engagement predictions.',
      icon: Mail,
      href: '/tools/email-subject-tester',
      features: ['Spam Score Analysis', 'Open Rate Prediction', 'A/B Testing', 'Best Practice Tips'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'ppc-ad-generator',
      title: 'PPC Ad Copy Generator',
      description: 'Generate compelling ad copy for your PPC campaigns. Create headlines, descriptions, and CTAs that convert.',
      icon: PenTool,
      href: '/tools/ppc-ad-generator',
      features: ['Multiple Variations', 'Character Limits', 'CTA Suggestions', 'Industry Templates'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'keyword-grouping',
      title: 'Keyword Grouping Tool',
      description: 'Organize your keywords into logical groups for better campaign structure and improved Quality Score.',
      icon: Layers,
      href: '/tools/keyword-grouping',
      features: ['Auto Grouping', 'Manual Organization', 'Export Options', 'Campaign Structure'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'keyword-match-types',
      title: 'Keyword Match Types Generator',
      description: 'Generate all keyword match types for your PPC campaigns. Broad, phrase, exact, and negative match variations.',
      icon: Target,
      href: '/tools/keyword-match-types',
      features: ['All Match Types', 'Bulk Generation', 'Negative Keywords', 'Export Ready'],
      color: 'from-red-500 to-red-600'
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={fadeInVariants}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mb-4`}>
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-heading text-dark-gray mb-2">
                      {tool.title}
                    </CardTitle>
                    <p className="font-paragraph text-secondary text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="font-paragraph text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={tool.href}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group-hover:bg-primary/90">
                        Use Tool
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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