import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/ui/seo-head';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchAnalytics } from '@/hooks/useSearchAnalytics';
import { BaseCrudService } from '@/integrations';
import { BlogPosts, CaseStudies, Services } from '@/entities';
import { fixSlug } from '@/utils/slugUtils';
import { Search, FileText, Briefcase, Settings, Wrench, Home, Users, Phone, ArrowRight, Clock, Filter, TrendingUp, X } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'blog' | 'case-study' | 'service' | 'page' | 'tool';
  icon: React.ReactNode;
  relevanceScore: number;
  lastModified?: string;
}

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const { recordSearch } = useSearchAnalytics();

  // Enhanced static pages and tools for search
  const staticContent: SearchResult[] = [
    // Main pages
    {
      id: 'home',
      title: 'Home',
      description: 'Welcome to Lookalike Solutions - Your Digital Marketing Partner in Bengaluru',
      url: '/',
      type: 'page',
      icon: <Home className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'about',
      title: 'About Us',
      description: 'Learn about our team, mission, and digital marketing expertise',
      url: '/about',
      type: 'page',
      icon: <Users className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with our digital marketing experts for a free consultation',
      url: '/contact',
      type: 'page',
      icon: <Phone className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'services',
      title: 'All Services',
      description: 'Comprehensive digital marketing services including SEO, social media, PPC, and more',
      url: '/services',
      type: 'page',
      icon: <Settings className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'tools',
      title: 'Free Marketing Tools',
      description: 'Free digital marketing tools and utilities for SEO, PPC, and content marketing',
      url: '/tools',
      type: 'page',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: 'Success stories and client results from our digital marketing campaigns',
      url: '/case-studies',
      type: 'page',
      icon: <Briefcase className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Latest insights, tips, and trends in digital marketing',
      url: '/blog',
      type: 'page',
      icon: <FileText className="w-5 h-5" />,
      relevanceScore: 0
    },
    // Tools
    {
      id: 'seo-keyword-research',
      title: 'SEO Keyword Research Tool',
      description: 'Find the best keywords for your content and SEO strategy',
      url: '/tools/seo-keyword-research',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'email-subject-tester',
      title: 'Email Subject Line Tester',
      description: 'Test and optimize your email subject lines for better open rates',
      url: '/tools/email-subject-tester',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'ppc-ad-generator',
      title: 'PPC Ad Generator',
      description: 'Generate effective PPC ad copy for Google Ads and Facebook Ads',
      url: '/tools/ppc-ad-generator',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'keyword-grouping',
      title: 'Keyword Grouping Tool',
      description: 'Organize keywords into logical groups for better campaign structure',
      url: '/tools/keyword-grouping',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'keyword-match-types',
      title: 'Keyword Match Types Guide',
      description: 'Understand different keyword match types for PPC campaigns',
      url: '/tools/keyword-match-types',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'meta-title-description-generator',
      title: 'Meta Title & Description Generator',
      description: 'Create SEO-optimized meta titles and descriptions',
      url: '/tools/meta-title-description-generator',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'serp-snippet-preview',
      title: 'SERP Snippet Preview',
      description: 'Preview how your page appears in Google search results',
      url: '/tools/serp-snippet-preview',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'backlink-checker',
      title: 'Backlink Checker',
      description: 'Analyze backlinks for any website and improve SEO strategy',
      url: '/tools/backlink-checker',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'utm-link-builder',
      title: 'UTM Link Builder',
      description: 'Create trackable UTM links for campaign tracking and analytics',
      url: '/tools/utm-link-builder',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'website-speed-test',
      title: 'Website Speed Test',
      description: 'Test your website loading speed and get optimization recommendations',
      url: '/tools/website-speed-test',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    },
    {
      id: 'social-media-post-generator',
      title: 'Social Media Post Generator',
      description: 'Generate engaging social media content for various platforms',
      url: '/tools/social-media-post-generator',
      type: 'tool',
      icon: <Wrench className="w-5 h-5" />,
      relevanceScore: 0
    }
  ];

  // Calculate relevance score based on query match
  const calculateRelevanceScore = (item: any, searchTerm: string, type: string): number => {
    let score = 0;
    const term = searchTerm.toLowerCase();
    
    // Title match (highest priority)
    const title = (item.title || item.serviceName || item.projectName || '').toLowerCase();
    if (title.includes(term)) {
      score += title.startsWith(term) ? 100 : 80;
    }
    
    // Exact word matches in title
    const titleWords = title.split(' ');
    const searchWords = term.split(' ');
    searchWords.forEach(word => {
      if (titleWords.some(titleWord => titleWord === word)) {
        score += 20;
      }
    });
    
    // Description/content match
    const description = (item.description || item.excerpt || item.content || item.challenge || item.solution || '').toLowerCase();
    if (description.includes(term)) {
      score += 40;
    }
    
    // Type-specific scoring
    switch (type) {
      case 'service':
        if ((item.keyBenefits || '').toLowerCase().includes(term)) score += 30;
        break;
      case 'blog':
        if ((item.author || '').toLowerCase().includes(term)) score += 10;
        break;
      case 'case-study':
        if ((item.clientName || '').toLowerCase().includes(term)) score += 25;
        break;
    }
    
    // Boost score for exact matches
    if (title === term) score += 200;
    
    return score;
  };

  // Perform search
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const searchTerm = searchQuery.toLowerCase().trim();
    
    try {
      const searchPromises = [
        // Search blog posts
        BaseCrudService.getAll<BlogPosts>('blogposts').then(({ items }) => 
          items
            .map(post => ({
              ...post,
              relevanceScore: calculateRelevanceScore(post, searchTerm, 'blog')
            }))
            .filter(post => post.relevanceScore > 0)
            .map(post => ({
              id: post._id,
              title: post.title || 'Untitled Post',
              description: post.excerpt || (post.content ? post.content.substring(0, 200) + '...' : 'No description available'),
              url: `/blog/${fixSlug(post.slug || '')}`,
              type: 'blog' as const,
              icon: <FileText className="w-5 h-5" />,
              relevanceScore: post.relevanceScore,
              lastModified: post._updatedDate ? new Date(post._updatedDate).toLocaleDateString() : undefined
            }))
        ),
        
        // Search case studies
        BaseCrudService.getAll<CaseStudies>('casestudies').then(({ items }) =>
          items
            .map(study => ({
              ...study,
              relevanceScore: calculateRelevanceScore(study, searchTerm, 'case-study')
            }))
            .filter(study => study.relevanceScore > 0)
            .map(study => ({
              id: study._id,
              title: study.projectName || 'Untitled Case Study',
              description: study.challenge ? study.challenge.substring(0, 200) + '...' : 'No description available',
              url: `/case-studies/${study._id}`,
              type: 'case-study' as const,
              icon: <Briefcase className="w-5 h-5" />,
              relevanceScore: study.relevanceScore,
              lastModified: study._updatedDate ? new Date(study._updatedDate).toLocaleDateString() : undefined
            }))
        ),
        
        // Search services
        BaseCrudService.getAll<Services>('services').then(({ items }) =>
          items
            .map(service => ({
              ...service,
              relevanceScore: calculateRelevanceScore(service, searchTerm, 'service')
            }))
            .filter(service => service.relevanceScore > 0)
            .map(service => ({
              id: service._id,
              title: service.serviceName || 'Untitled Service',
              description: service.description ? service.description.substring(0, 200) + '...' : 'No description available',
              url: `/services/${service.seoSlug || ''}`,
              type: 'service' as const,
              icon: <Settings className="w-5 h-5" />,
              relevanceScore: service.relevanceScore
            }))
        )
      ];

      const [blogResults, caseStudyResults, serviceResults] = await Promise.all(searchPromises);

      // Search static content
      const staticResults = staticContent
        .map(item => ({
          ...item,
          relevanceScore: calculateRelevanceScore(item, searchTerm, item.type)
        }))
        .filter(item => item.relevanceScore > 0);

      // Combine and sort by relevance
      const allResults = [
        ...blogResults,
        ...caseStudyResults,
        ...serviceResults,
        ...staticResults
      ].sort((a, b) => b.relevanceScore - a.relevanceScore);

      setResults(allResults);
      await recordSearch(searchQuery, allResults.length > 0);

    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      await recordSearch(searchQuery, false);
    } finally {
      setIsSearching(false);
    }
  };

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'case-study':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'service':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'tool':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'page':
        return 'bg-gray-50 text-gray-700 border border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'case-study':
        return 'Case Study';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const filters = [
    { id: 'all', label: 'All Results', count: results.length },
    { id: 'blog', label: 'Blog Posts', count: results.filter(r => r.type === 'blog').length },
    { id: 'service', label: 'Services', count: results.filter(r => r.type === 'service').length },
    { id: 'case-study', label: 'Case Studies', count: results.filter(r => r.type === 'case-study').length },
    { id: 'tool', label: 'Tools', count: results.filter(r => r.type === 'tool').length },
    { id: 'page', label: 'Pages', count: results.filter(r => r.type === 'page').length },
  ];

  const filteredResults = selectedFilter === 'all' 
    ? results 
    : results.filter(r => r.type === selectedFilter);

  const clearSearch = () => {
    setSearchParams({});
    setResults([]);
  };

  return (
    <>
      <SEOHead 
        title={query ? `Search Results for "${query}"` : 'Search'}
        description={query ? `Search results for ${query} on Look A Like Solutions` : 'Search our website for digital marketing services, blog posts, tools, and more'}
      />

      <div className="min-h-screen bg-light-gray">
        {/* Search Header */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-12 md:py-16">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {query ? `Search Results` : 'Search Our Website'}
              </h1>
              {query && (
                <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                  <p className="text-lg md:text-xl text-white/90">
                    Showing results for:
                  </p>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-lg md:text-xl font-medium">"{query}"</span>
                    <button
                      onClick={clearSearch}
                      className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              <p className="text-white/80 text-base md:text-lg">
                {isSearching ? 'Searching...' : `Found ${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-3">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Filter className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-heading font-bold text-dark-gray">Filter Results</h2>
                    </div>
                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          disabled={filter.count === 0}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                            selectedFilter === filter.id
                              ? 'bg-primary text-white shadow-md'
                              : filter.count > 0
                              ? 'bg-white hover:bg-light-gray text-dark-gray border border-gray-200'
                              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <span className="font-medium">{filter.label}</span>
                          <Badge 
                            className={`${
                              selectedFilter === filter.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {filter.count}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </aside>

              {/* Results List */}
              <div className="lg:col-span-9">
                {isSearching ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                            <div className="flex-1 space-y-3">
                              <Skeleton className="h-6 w-3/4" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-2/3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredResults.length > 0 ? (
                  <div className="space-y-4">
                    {filteredResults.map((result, index) => (
                      <Card 
                        key={result.id} 
                        className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30"
                      >
                        <CardContent className="p-6">
                          <Link to={result.url} className="block">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                {result.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <h3 className="text-xl font-heading font-bold text-dark-gray group-hover:text-primary transition-colors line-clamp-2">
                                    {result.title}
                                  </h3>
                                  <Badge className={`flex-shrink-0 ${getTypeColor(result.type)}`}>
                                    {getTypeLabel(result.type)}
                                  </Badge>
                                </div>
                                <p className="text-secondary text-base leading-relaxed mb-3 line-clamp-3">
                                  {result.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-secondary">
                                  {result.lastModified && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      <span>Updated {result.lastModified}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : query ? (
                  <Card className="text-center py-16">
                    <CardContent>
                      <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-dark-gray mb-3">
                          No Results Found
                        </h3>
                        <p className="text-secondary text-lg mb-6">
                          We couldn't find anything matching "{query}". Try different keywords or check your spelling.
                        </p>
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-dark-gray">Suggestions:</p>
                          <ul className="text-sm text-secondary space-y-2 text-left max-w-xs mx-auto">
                            <li>• Try more general keywords</li>
                            <li>• Check your spelling</li>
                            <li>• Use fewer keywords</li>
                            <li>• Browse our services or blog instead</li>
                          </ul>
                        </div>
                        <div className="flex gap-3 justify-center mt-8">
                          <Link to="/services">
                            <Button variant="outline">Browse Services</Button>
                          </Link>
                          <Link to="/blog">
                            <Button variant="outline">Read Blog</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="text-center py-16">
                    <CardContent>
                      <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Search className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-dark-gray mb-3">
                          Start Your Search
                        </h3>
                        <p className="text-secondary text-lg mb-6">
                          Enter a search term in the header to find blog posts, services, tools, and more.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Link to="/services">
                            <Button>Explore Services</Button>
                          </Link>
                          <Link to="/tools">
                            <Button variant="outline">Try Our Tools</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Searches Section */}
        {!query && (
          <section className="py-12 bg-white">
            <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark-gray">
                    Popular Searches
                  </h2>
                </div>
                <p className="text-secondary text-lg">
                  Quick links to our most searched content
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                {['SEO', 'Social Media Marketing', 'PPC Ads', 'Content Marketing', 'Web Development', 'Email Marketing', 'Analytics', 'Keyword Research'].map((term) => (
                  <Link
                    key={term}
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="px-4 py-2 bg-light-gray hover:bg-primary hover:text-white text-dark-gray rounded-full transition-all duration-200 border border-gray-200 hover:border-primary font-medium"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
