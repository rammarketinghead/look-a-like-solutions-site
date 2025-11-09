import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Target, CheckCircle, BarChart3 } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SEOPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-heading text-dark-gray mb-8">
              SEO Optimization Services
            </h1>
            <p className="text-xl font-paragraph text-secondary max-w-4xl mx-auto mb-12">
              Boost your search rankings and drive organic traffic with our comprehensive SEO strategies. We help businesses in Bengaluru and beyond achieve top search engine visibility.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Get SEO Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading text-dark-gray mb-8">
                Dominate Search Results
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our SEO experts use proven strategies to improve your website's visibility, drive qualified traffic, and increase conversions. We focus on sustainable, white-hat techniques that deliver long-term results.
              </p>
              <div className="space-y-4">
                {[
                  'Comprehensive keyword research and strategy',
                  'On-page and technical SEO optimization',
                  'High-quality link building campaigns',
                  'Local SEO for Bengaluru businesses',
                  'Regular performance monitoring and reporting'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-paragraph text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_7275d7e20d244b0aad1c899962f3bcf0~mv2.png?originWidth=576&originHeight=448"
                alt="SEO optimization process"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Services */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our SEO Services</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive SEO solutions tailored to your business needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Keyword Research',
                description: 'In-depth analysis to identify high-value keywords that drive qualified traffic to your website.'
              },
              {
                icon: Target,
                title: 'On-Page SEO',
                description: 'Optimize your website content, meta tags, and structure for better search engine visibility.'
              },
              {
                icon: TrendingUp,
                title: 'Technical SEO',
                description: 'Improve site speed, mobile responsiveness, and technical factors that impact rankings.'
              },
              {
                icon: BarChart3,
                title: 'Link Building',
                description: 'Build high-quality backlinks from authoritative websites to boost your domain authority.'
              },
              {
                icon: Target,
                title: 'Local SEO',
                description: 'Optimize your business for local searches and Google My Business listings in Bengaluru.'
              },
              {
                icon: TrendingUp,
                title: 'SEO Analytics',
                description: 'Track rankings, traffic, and conversions with detailed reporting and insights.'
              }
            ].map((service, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{service.title}</h3>
                  <p className="font-paragraph text-secondary">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">SEO Results That Matter</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our SEO strategies deliver measurable improvements in search visibility and organic traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '300%', label: 'Average Traffic Increase' },
              { number: '85%', label: 'First Page Rankings' },
              { number: '150%', label: 'Lead Generation Boost' },
              { number: '6 Months', label: 'Average Time to Results' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading text-primary mb-2">{stat.number}</div>
                <div className="font-paragraph text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Improve Your Search Rankings?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free SEO audit and discover how we can help your business rank higher in search results.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Get Free SEO Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View SEO Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}