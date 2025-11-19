import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSearchAnalytics } from '@/hooks/useSearchAnalytics';
import { BaseCrudService } from '@/integrations';
import { BlogPosts, CaseStudies, Services } from '@/entities';
import { fixSlug } from '@/utils/slugUtils';
import { Search, X, FileText, Briefcase, Settings, Wrench, Home, Users, Phone, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface SearchBarProps {
  placeholder?: string;
  showResults?: boolean;
  onSearch?: (query: string) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'full';
}

export function SearchBar({ 
  placeholder = "Search pages, blog posts, tools, services...", 
  showResults = true, 
  onSearch,
  className = "",
  variant = 'default'
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { recordSearch } = useSearchAnalytics();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Enhanced static pages and tools for search
  const staticContent: SearchResult[] = [
    // Main pages
    {
      id: 'home',
      title: 'Home',
      description: 'Welcome to Lookalike Solutions - Your Digital Marketing Partner in Bengaluru',
      url: '/',
      type: 'page',
      icon: <Home className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'about',
      title: 'About Us',
      description: 'Learn about our team, mission, and digital marketing expertise',
      url: '/about',
      type: 'page',
      icon: <Users className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with our digital marketing experts for a free consultation',
      url: '/contact',
      type: 'page',
      icon: <Phone className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'services',
      title: 'All Services',
      description: 'Comprehensive digital marketing services including SEO, social media, PPC, and more',
      url: '/services',
      type: 'page',
      icon: <Settings className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'tools',
      title: 'Free Marketing Tools',
      description: 'Free digital marketing tools and utilities for SEO, PPC, and content marketing',
      url: '/tools',
      type: 'page',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: 'Success stories and client results from our digital marketing campaigns',
      url: '/case-studies',
      type: 'page',
      icon: <Briefcase className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Latest insights, tips, and trends in digital marketing',
      url: '/blog',
      type: 'page',
      icon: <FileText className="w-4 h-4" />,
      relevanceScore: 0
    },
    // Tools
    {
      id: 'seo-keyword-research',
      title: 'SEO Keyword Research Tool',
      description: 'Find the best keywords for your content and SEO strategy',
      url: '/tools/seo-keyword-research',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'email-subject-tester',
      title: 'Email Subject Line Tester',
      description: 'Test and optimize your email subject lines for better open rates',
      url: '/tools/email-subject-tester',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'ppc-ad-generator',
      title: 'PPC Ad Generator',
      description: 'Generate effective PPC ad copy for Google Ads and Facebook Ads',
      url: '/tools/ppc-ad-generator',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'keyword-grouping',
      title: 'Keyword Grouping Tool',
      description: 'Organize keywords into logical groups for better campaign structure',
      url: '/tools/keyword-grouping',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'keyword-match-types',
      title: 'Keyword Match Types Guide',
      description: 'Understand different keyword match types for PPC campaigns',
      url: '/tools/keyword-match-types',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'meta-title-description-generator',
      title: 'Meta Title & Description Generator',
      description: 'Create SEO-optimized meta titles and descriptions',
      url: '/tools/meta-title-description-generator',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'serp-snippet-preview',
      title: 'SERP Snippet Preview',
      description: 'Preview how your page appears in Google search results',
      url: '/tools/serp-snippet-preview',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'backlink-checker',
      title: 'Backlink Checker',
      description: 'Analyze backlinks for any website and improve SEO strategy',
      url: '/tools/backlink-checker',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'utm-link-builder',
      title: 'UTM Link Builder',
      description: 'Create trackable UTM links for campaign tracking and analytics',
      url: '/tools/utm-link-builder',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'website-speed-test',
      title: 'Website Speed Test',
      description: 'Test your website loading speed and get optimization recommendations',
      url: '/tools/website-speed-test',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    },
    {
      id: 'social-media-post-generator',
      title: 'Social Media Post Generator',
      description: 'Generate engaging social media content for various platforms',
      url: '/tools/social-media-post-generator',
      type: 'tool',
      icon: <Wrench className="w-4 h-4" />,
      relevanceScore: 0
    }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) return;

    setRecentSearches(prev => {
      const updated = [trimmed, ...prev.filter(s => s !== trimmed)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

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

  // Enhanced search function with better relevance and performance
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
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
              description: post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'No description available'),
              url: `/blog/${fixSlug(post.slug || '')}`,
              type: 'blog' as const,
              icon: <FileText className="w-4 h-4" />,
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
              description: study.challenge ? study.challenge.substring(0, 150) + '...' : 'No description available',
              url: `/case-studies/${study._id}`,
              type: 'case-study' as const,
              icon: <Briefcase className="w-4 h-4" />,
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
              description: service.description ? service.description.substring(0, 150) + '...' : 'No description available',
              url: `/services/${service.seoSlug || ''}`,
              type: 'service' as const,
              icon: <Settings className="w-4 h-4" />,
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
      ]
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 12); // Show top 12 results

      setResults(allResults);
      setShowDropdown(showResults && allResults.length > 0);

      // Save to recent searches and record analytics
      saveRecentSearch(searchQuery);
      await recordSearch(searchQuery, allResults.length > 0);

      // Call onSearch callback if provided (navigate to search results page)
      if (onSearch) {
        onSearch(searchQuery);
      }

    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setShowDropdown(false);
      await recordSearch(searchQuery, false);
    } finally {
      setIsSearching(false);
    }
  }, [recordSearch, onSearch, saveRecentSearch, showResults]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Set new timeout for debounced search
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        performSearch(value);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 250); // Reduced debounce time for faster response
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setShowDropdown(false);
    if (variant !== 'full') {
      setQuery('');
    }
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    performSearch(searchTerm);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'case-study':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'service':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'tool':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'page':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  // Determine input size based on variant
  const getInputClasses = () => {
    const base = "pl-10 pr-10 transition-all duration-200";
    switch (variant) {
      case 'compact':
        return `${base} h-9 text-sm`;
      case 'full':
        return `${base} h-12 text-base`;
      default:
        return `${base} h-10`;
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-4 h-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if (results.length > 0 || (!query && recentSearches.length > 0)) {
                setShowDropdown(true);
              }
            }}
            className={getInputClasses()}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-dark-gray transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showDropdown && showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-hidden shadow-lg border-2">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-4 h-4 animate-pulse text-primary" />
                  <span className="text-secondary">Searching...</span>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      to={result.url}
                      onClick={handleResultClick}
                      className="block p-4 hover:bg-light-gray transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 text-secondary group-hover:text-primary transition-colors">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-dark-gray truncate group-hover:text-primary transition-colors">
                              {result.title}
                            </h4>
                            <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                              {getTypeLabel(result.type)}
                            </Badge>
                          </div>
                          <p className="text-sm text-secondary line-clamp-2 mb-1">
                            {result.description}
                          </p>
                          {result.lastModified && (
                            <div className="flex items-center gap-1 text-xs text-secondary">
                              <Clock className="w-3 h-3" />
                              <span>Updated {result.lastModified}</span>
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : query.trim() && !isSearching ? (
              <div className="p-6 text-center">
                <Search className="w-8 h-8 mx-auto mb-3 text-secondary opacity-50" />
                <p className="text-secondary font-medium mb-1">No results found for "{query}"</p>
                <p className="text-xs text-secondary">Try different keywords or check spelling</p>
              </div>
            ) : !query && recentSearches.length > 0 ? (
              <div className="p-4">
                <h4 className="text-sm font-medium text-secondary mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h4>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full text-left px-3 py-2 text-sm text-secondary hover:text-dark-gray hover:bg-light-gray rounded transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}