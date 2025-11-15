import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { BlogPosts, CaseStudies } from '@/entities';
import { fixSlug } from '@/utils/slugUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SEOHead } from '@/components/ui/seo-head';
import { Calendar, ExternalLink, FileText, Folder, Home, Settings, Wrench, Users } from 'lucide-react';

interface SitemapSection {
  title: string;
  icon: React.ReactNode;
  pages: SitemapPage[];
}

interface SitemapPage {
  title: string;
  url: string;
  description?: string;
  lastModified?: string;
  priority: 'high' | 'medium' | 'low';
}

export default function SitemapHtmlPage() {
  const [sections, setSections] = useState<SitemapSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    loadSitemapData();
  }, []);

  const loadSitemapData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch dynamic content
      const { items: blogPosts } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const { items: caseStudies } = await BaseCrudService.getAll<CaseStudies>('casestudies');

      const currentDate = new Date().toLocaleDateString();
      setLastUpdated(currentDate);

      // Define static sections
      const staticSections: SitemapSection[] = [
        {
          title: 'Main Pages',
          icon: <Home className="w-5 h-5" />,
          pages: [
            {
              title: 'Home',
              url: '/',
              description: 'Welcome to Lookalike Solutions - Your Digital Marketing Partner',
              priority: 'high'
            },
            {
              title: 'About Us',
              url: '/about',
              description: 'Learn about our team and mission',
              priority: 'high'
            },
            {
              title: 'Contact',
              url: '/contact',
              description: 'Get in touch with our team',
              priority: 'medium'
            }
          ]
        },
        {
          title: 'Services',
          icon: <Settings className="w-5 h-5" />,
          pages: [
            {
              title: 'All Services',
              url: '/services',
              description: 'Comprehensive digital marketing services',
              priority: 'high'
            },
            {
              title: 'SEO Services',
              url: '/services/seo',
              description: 'Search Engine Optimization to boost your rankings',
              priority: 'high'
            },
            {
              title: 'Social Media Marketing',
              url: '/services/social-media',
              description: 'Grow your brand on social platforms',
              priority: 'high'
            },
            {
              title: 'Paid Advertising',
              url: '/services/paid-ads',
              description: 'Strategic PPC and paid advertising campaigns',
              priority: 'high'
            },
            {
              title: 'Web Development',
              url: '/services/web-development',
              description: 'Custom website development and design',
              priority: 'high'
            },
            {
              title: 'Influencer Marketing',
              url: '/services/influencer-marketing',
              description: 'Connect with influencers to expand your reach',
              priority: 'medium'
            },
            {
              title: 'Content Marketing',
              url: '/services/content-marketing',
              description: 'Strategic content creation and distribution',
              priority: 'high'
            },
            {
              title: 'Data Analytics',
              url: '/services/data-analytics',
              description: 'Data-driven insights for better decisions',
              priority: 'medium'
            },
            {
              title: 'Conversion Optimization',
              url: '/services/conversion-optimization',
              description: 'Optimize your website for better conversions',
              priority: 'medium'
            },
            {
              title: 'Email Marketing',
              url: '/services/email-marketing',
              description: 'Effective email campaigns that convert',
              priority: 'medium'
            },
            {
              title: 'YouTube Growth',
              url: '/services/youtube-growth',
              description: 'Grow your YouTube channel and audience',
              priority: 'medium'
            },
            {
              title: 'Digital Audit',
              url: '/services/digital-audit',
              description: 'Comprehensive analysis of your digital presence',
              priority: 'medium'
            },
            {
              title: 'Digital Training',
              url: '/services/digital-training',
              description: 'Learn digital marketing skills from experts',
              priority: 'medium'
            }
          ]
        },
        {
          title: 'Free Tools',
          icon: <Wrench className="w-5 h-5" />,
          pages: [
            {
              title: 'All Tools',
              url: '/tools',
              description: 'Free digital marketing tools and utilities',
              priority: 'medium'
            },
            {
              title: 'SEO Keyword Research',
              url: '/tools/seo-keyword-research',
              description: 'Find the best keywords for your content',
              priority: 'medium'
            },
            {
              title: 'Email Subject Tester',
              url: '/tools/email-subject-tester',
              description: 'Test and optimize your email subject lines',
              priority: 'low'
            },
            {
              title: 'PPC Ad Generator',
              url: '/tools/ppc-ad-generator',
              description: 'Generate effective PPC ad copy',
              priority: 'low'
            },
            {
              title: 'Keyword Grouping',
              url: '/tools/keyword-grouping',
              description: 'Organize keywords into logical groups',
              priority: 'low'
            },
            {
              title: 'Keyword Match Types',
              url: '/tools/keyword-match-types',
              description: 'Understand different keyword match types',
              priority: 'low'
            },
            {
              title: 'Meta Title & Description Generator',
              url: '/tools/meta-title-description-generator',
              description: 'Create SEO-optimized meta tags',
              priority: 'medium'
            },
            {
              title: 'SERP Snippet Preview',
              url: '/tools/serp-snippet-preview',
              description: 'Preview how your page appears in search results',
              priority: 'medium'
            },
            {
              title: 'Backlink Checker',
              url: '/tools/backlink-checker',
              description: 'Analyze backlinks for any website',
              priority: 'medium'
            },
            {
              title: 'UTM Link Builder',
              url: '/tools/utm-link-builder',
              description: 'Create trackable UTM links for campaigns',
              priority: 'low'
            },
            {
              title: 'Website Speed Test',
              url: '/tools/website-speed-test',
              description: 'Test your website loading speed',
              priority: 'medium'
            },
            {
              title: 'Social Media Post Generator',
              url: '/tools/social-media-post-generator',
              description: 'Generate engaging social media content',
              priority: 'low'
            }
          ]
        },
        {
          title: 'Case Studies',
          icon: <Users className="w-5 h-5" />,
          pages: [
            {
              title: 'All Case Studies',
              url: '/case-studies',
              description: 'Success stories and client results',
              priority: 'medium'
            }
          ]
        },
        {
          title: 'Blog',
          icon: <FileText className="w-5 h-5" />,
          pages: [
            {
              title: 'All Blog Posts',
              url: '/blog',
              description: 'Latest insights and digital marketing tips',
              priority: 'medium'
            }
          ]
        },
        {
          title: 'Legal',
          icon: <Folder className="w-5 h-5" />,
          pages: [
            {
              title: 'Privacy Policy',
              url: '/privacy',
              description: 'How we protect your privacy',
              priority: 'low'
            },
            {
              title: 'Terms of Service',
              url: '/terms',
              description: 'Terms and conditions of use',
              priority: 'low'
            }
          ]
        }
      ];

      // Add dynamic case studies
      const caseStudyPages: SitemapPage[] = caseStudies.map(caseStudy => ({
        title: caseStudy.projectName || 'Untitled Case Study',
        url: `/case-studies/${caseStudy._id}`,
        description: caseStudy.challenge ? `${caseStudy.challenge.substring(0, 100)}...` : 'View this case study',
        lastModified: caseStudy._updatedDate ? new Date(caseStudy._updatedDate).toLocaleDateString() : undefined,
        priority: 'medium' as const
      }));

      // Add dynamic blog posts
      const blogPostPages: SitemapPage[] = blogPosts
        .filter(post => post.slug)
        .map(post => ({
          title: post.title || 'Untitled Post',
          url: `/blog/${fixSlug(post.slug || '')}`,
          description: post.excerpt || (post.content ? `${post.content.substring(0, 150)}...` : 'Read this blog post'),
          lastModified: post._updatedDate ? new Date(post._updatedDate).toLocaleDateString() : undefined,
          priority: 'medium' as const
        }));

      // Update sections with dynamic content
      const updatedSections = staticSections.map(section => {
        if (section.title === 'Case Studies') {
          return {
            ...section,
            pages: [...section.pages, ...caseStudyPages]
          };
        }
        if (section.title === 'Blog') {
          return {
            ...section,
            pages: [...section.pages, ...blogPostPages]
          };
        }
        return section;
      });

      setSections(updatedSections);
    } catch (error) {
      console.error('Error loading sitemap data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalPages = sections.reduce((total, section) => total + section.pages.length, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-gray">
        <SEOHead 
          title="Sitemap - Lookalike Solutions"
          description="Complete sitemap of all pages on Lookalike Solutions website"
        />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <SEOHead 
        title="Sitemap - Lookalike Solutions"
        description="Complete sitemap of all pages on Lookalike Solutions website including services, tools, blog posts, and case studies."
        keywords="sitemap, site map, website structure, navigation, lookalike solutions"
      />
      
      <div className="container mx-auto px-4 py-16 max-w-[100rem]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-dark-gray mb-4">
            Website Sitemap
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto mb-6">
            Complete overview of all pages and content on our website. Find exactly what you're looking for with our organized site structure.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-secondary">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{totalPages} total pages</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <Link to="/sitemap.xml" className="text-primary hover:underline">
                View XML Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Priority Legend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-heading text-xl">Priority Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor('high')}>High</Badge>
                <span className="text-sm text-secondary">Most important pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor('medium')}>Medium</Badge>
                <span className="text-sm text-secondary">Regular content pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor('low')}>Low</Badge>
                <span className="text-sm text-secondary">Utility and legal pages</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sitemap Sections */}
        <div className="grid gap-8">
          {sections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="font-heading text-2xl flex items-center gap-3">
                  {section.icon}
                  {section.title}
                  <Badge variant="secondary" className="ml-auto">
                    {section.pages.length} pages
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {section.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Link 
                              to={page.url}
                              className="font-heading text-lg text-dark-gray hover:text-primary transition-colors"
                            >
                              {page.title}
                            </Link>
                            <Badge className={getPriorityColor(page.priority)}>
                              {page.priority}
                            </Badge>
                          </div>
                          {page.description && (
                            <p className="font-paragraph text-secondary mb-2">
                              {page.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-secondary">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                              {page.url}
                            </span>
                            {page.lastModified && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Updated: {page.lastModified}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link 
                          to={page.url}
                          className="flex-shrink-0 p-2 text-secondary hover:text-primary transition-colors"
                          title={`Visit ${page.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Separator className="mb-6" />
          <p className="font-paragraph text-secondary">
            This sitemap is automatically updated whenever new content is published. 
            For technical sitemap information, visit our{' '}
            <Link to="/sitemap.xml" className="text-primary hover:underline">
              XML sitemap
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}