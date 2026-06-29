/**
 * AI Image Placements Configuration
 * 
 * Centralized configuration for all AI-generated image placements across the website.
 * This file defines image slots, prompts, alt text, and metadata for easy management.
 * 
 * Structure:
 * - Page-based organization
 * - Priority levels (high, medium, low)
 * - Aspect ratio specifications
 * - SEO-friendly alt text
 * - Image generation prompts
 * - Loading strategies
 */

export interface AIImagePlacement {
  id: string;
  page: string;
  section: string;
  type: 'hero' | 'process' | 'results' | 'icon' | 'fallback' | 'accent' | 'background';
  aspectRatio: '1:1' | '4:3' | '16:9';
  width: number;
  height: number;
  alt: string;
  title?: string;
  description?: string;
  prompt: string;
  loading: 'lazy' | 'eager';
  priority: 'high' | 'medium' | 'low';
  status: 'ready' | 'generated' | 'pending' | 'not_started';
  imagePath?: string;
  notes?: string;
}

export const aiImagePlacements: AIImagePlacement[] = [
  // ============================================
  // HOMEPAGE
  // ============================================
  {
    id: 'homepage-hero-dashboard',
    page: 'HomePage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Digital marketing analytics dashboard showing key performance metrics and data visualization',
    title: 'Analytics Dashboard',
    prompt: 'Modern digital marketing analytics dashboard with colorful charts, metrics, and KPI widgets. Clean interface with blue and white color scheme. Professional workspace aesthetic. No people.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Above fold - critical for homepage impact'
  },
  {
    id: 'homepage-proof-funnel',
    page: 'HomePage',
    section: 'Proof/Stats',
    type: 'process',
    aspectRatio: '4:3',
    width: 1200,
    height: 900,
    alt: 'Digital marketing conversion funnel showing customer journey stages',
    title: 'Conversion Funnel',
    prompt: 'Digital marketing funnel visualization showing stages: awareness, consideration, conversion. Clean infographic style with arrows and icons. Blue, white, and accent colors. Minimal, professional.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Below fold - supports proof section'
  },
  {
    id: 'homepage-blog-hero',
    page: 'HomePage',
    section: 'Blog Preview',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Content creation and blog writing workspace with analytics dashboard',
    title: 'Blog Content Creation',
    prompt: 'Content creation and blogging workspace. Shows laptop with blog editor, research materials, analytics dashboard, and content calendar. Clean, professional desk setup. Blue and white. No people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Blog section accent'
  },

  // ============================================
  // SERVICE PAGES - HERO SECTIONS
  // ============================================
  {
    id: 'seo-service-hero',
    page: 'SEOPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'SEO optimization process workflow showing keyword research, on-page optimization, and ranking improvement stages',
    title: 'SEO Optimization Process',
    prompt: 'SEO optimization workflow visualization. Shows keyword research, on-page optimization, link building, and ranking improvement. Clean infographic with icons and arrows. Blue and white theme. Professional, no people.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Service page hero - above fold'
  },
  {
    id: 'google-ads-service-hero',
    page: 'PaidAdsPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Google Ads campaign management interface showing keyword bidding and performance metrics',
    title: 'Google Ads Campaign Setup',
    prompt: 'Google Ads campaign setup interface mockup. Shows keyword bidding, ad copy, landing page, and performance metrics. Clean dashboard style. Blue and white. Professional, no people.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Google Ads service hero'
  },
  {
    id: 'meta-ads-service-hero',
    page: 'MetaAdsPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Meta Ads campaign builder showing audience targeting and creative options',
    title: 'Meta Ads Campaign Builder',
    prompt: 'Meta Ads (Facebook/Instagram) audience targeting and campaign builder interface. Shows audience segmentation, creative options, and performance analytics. Clean dashboard style. Blue and white theme. No people.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Meta Ads service hero'
  },
  {
    id: 'paid-ads-service-hero',
    page: 'PaidAdsPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Multi-channel paid advertising dashboard showing performance across Google Ads and Meta Ads',
    title: 'Multi-Channel Advertising',
    prompt: 'Multi-channel paid advertising dashboard showing Google Ads, Meta Ads, and other platforms. Unified performance metrics and ROI tracking. Clean interface. Blue and white. Professional.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Paid Ads overview hero'
  },
  {
    id: 'social-media-service-hero',
    page: 'SocialMediaPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Social media content calendar and engagement analytics dashboard',
    title: 'Social Media Strategy',
    prompt: 'Social media content calendar and engagement analytics dashboard. Shows scheduled posts, engagement metrics, audience growth. Clean interface. Blue and white. Professional, no people.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Social Media service hero'
  },
  {
    id: 'web-development-service-hero',
    page: 'WebDevelopmentPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Responsive website design mockup showing desktop, tablet, and mobile layouts',
    title: 'Responsive Web Design',
    prompt: 'Modern website design mockup showing responsive design across desktop, tablet, and mobile. Clean, professional interface. Blue and white color scheme. No people.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Web Development service hero'
  },
  {
    id: 'local-seo-service-hero',
    page: 'LocalSEOPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Local SEO dashboard showing Google My Business optimization and local search rankings',
    title: 'Local SEO Optimization',
    prompt: 'Local SEO dashboard showing Google My Business optimization, local citations, map rankings, and review management. Clean interface with map visualization. Blue and white. Professional.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Local SEO service hero'
  },
  {
    id: 'performance-marketing-service-hero',
    page: 'PerformanceMarketingPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Performance marketing ROI dashboard showing conversion tracking and revenue attribution',
    title: 'Performance Marketing ROI',
    prompt: 'Performance marketing ROI dashboard showing conversion tracking, cost per acquisition, revenue attribution, and campaign performance metrics. Clean analytics interface. Blue and white.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Performance Marketing service hero'
  },

  // ============================================
  // SERVICE PAGES - PROCESS SECTIONS
  // ============================================
  {
    id: 'seo-service-process',
    page: 'SEOPage',
    section: 'Process',
    type: 'process',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'SEO optimization step-by-step process visualization',
    prompt: 'SEO optimization step-by-step process visualization. Shows research, strategy, implementation, and optimization phases. Clean infographic with numbered steps and icons. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Service process section'
  },
  {
    id: 'google-ads-service-process',
    page: 'PaidAdsPage',
    section: 'Process',
    type: 'process',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Google Ads campaign setup and optimization process',
    prompt: 'Google Ads campaign setup and optimization process. Shows account setup, keyword research, ad creation, bidding strategy, and performance monitoring. Clean infographic. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Google Ads process section'
  },
  {
    id: 'meta-ads-service-process',
    page: 'MetaAdsPage',
    section: 'Process',
    type: 'process',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Meta Ads campaign creation and audience targeting process',
    prompt: 'Meta Ads campaign creation and audience targeting process. Shows audience research, creative development, targeting setup, and performance optimization. Clean infographic. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Meta Ads process section'
  },
  {
    id: 'social-media-service-process',
    page: 'SocialMediaPage',
    section: 'Process',
    type: 'process',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Social media strategy and content planning process',
    prompt: 'Social media strategy and content planning process. Shows audience analysis, content calendar creation, posting schedule, engagement monitoring, and analytics review. Clean infographic. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Social Media process section'
  },
  {
    id: 'web-development-service-process',
    page: 'WebDevelopmentPage',
    section: 'Process',
    type: 'process',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Website development and design process workflow',
    prompt: 'Website development and design process workflow. Shows discovery, design, development, testing, and deployment phases. Clean infographic with numbered steps. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Web Development process section'
  },
  {
    id: 'local-seo-service-process',
    page: 'LocalSEOPage',
    section: 'Process',
    type: 'process',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Local SEO optimization and local business visibility process',
    prompt: 'Local SEO optimization and local business visibility process. Shows Google My Business setup, local citations, review management, and local ranking improvement. Clean infographic. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Local SEO process section'
  },
  {
    id: 'performance-marketing-service-process',
    page: 'PerformanceMarketingPage',
    section: 'Process',
    type: 'process',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Performance marketing campaign setup and optimization process',
    prompt: 'Performance marketing campaign setup and optimization process. Shows goal setting, audience targeting, campaign launch, tracking setup, and ROI optimization. Clean infographic. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Performance Marketing process section'
  },

  // ============================================
  // SERVICE PAGES - RESULTS SECTIONS
  // ============================================
  {
    id: 'seo-service-results',
    page: 'SEOPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'SEO results dashboard showing improved traffic and rankings',
    prompt: 'SEO results dashboard showing improved metrics: increased organic traffic, higher rankings, more leads. Green indicators for positive results. Clean interface. Blue and white. Professional.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Results section accent'
  },
  {
    id: 'google-ads-service-results',
    page: 'PaidAdsPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Google Ads results dashboard showing improved conversions and ROI',
    prompt: 'Google Ads results dashboard showing improved metrics: increased conversions, lower cost per acquisition, higher ROI. Green indicators for positive results. Clean interface. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Results section accent'
  },
  {
    id: 'meta-ads-service-results',
    page: 'MetaAdsPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Meta Ads results dashboard showing improved engagement and conversions',
    prompt: 'Meta Ads results dashboard showing improved metrics: increased engagement, higher conversion rates, lower cost per result. Green indicators for positive results. Clean interface. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Results section accent'
  },
  {
    id: 'social-media-service-results',
    page: 'SocialMediaPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Social media results dashboard showing improved engagement and followers',
    prompt: 'Social media results dashboard showing improved metrics: increased followers, higher engagement rates, more leads. Green indicators for positive results. Clean interface. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Results section accent'
  },
  {
    id: 'web-development-service-results',
    page: 'WebDevelopmentPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Website performance dashboard showing improved speed and conversions',
    prompt: 'Website performance dashboard showing improved metrics: faster load times, higher conversion rates, better user experience. Green indicators for positive results. Clean interface. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Results section accent'
  },
  {
    id: 'local-seo-service-results',
    page: 'LocalSEOPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Local SEO results dashboard showing improved local rankings and leads',
    prompt: 'Local SEO results dashboard showing improved metrics: higher local rankings, more local leads, increased reviews. Green indicators for positive results. Clean interface. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Results section accent'
  },
  {
    id: 'performance-marketing-service-results',
    page: 'PerformanceMarketingPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Performance marketing results dashboard showing improved ROI and revenue',
    prompt: 'Performance marketing results dashboard showing improved metrics: higher ROI, increased revenue, lower customer acquisition cost. Green indicators for positive results. Clean interface. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Results section accent'
  },

  // ============================================
  // ABOUT PAGE
  // ============================================
  {
    id: 'about-hero-team',
    page: 'AboutPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Team collaboration in modern office environment working on digital marketing strategy',
    title: 'Team Collaboration',
    prompt: 'Generic team collaboration scene in modern office. Multiple people (silhouettes or generic figures) working together around a table with laptops and analytics dashboards. Clean, professional workspace. Blue and white color scheme. No specific faces or identifiable people.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'IMPORTANT: Use silhouettes or generic figures only - NO specific faces'
  },
  {
    id: 'about-mission-innovation',
    page: 'AboutPage',
    section: 'Mission/Values',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Innovation concept with lightbulb and digital elements',
    prompt: 'Minimalist icon representing innovation. Shows lightbulb with digital elements and upward trend. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Mission/Values section'
  },
  {
    id: 'about-mission-trust',
    page: 'AboutPage',
    section: 'Mission/Values',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Trust concept with shield and checkmark',
    prompt: 'Minimalist icon representing trust. Shows shield with checkmark and secure lock. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Mission/Values section'
  },
  {
    id: 'about-mission-results',
    page: 'AboutPage',
    section: 'Mission/Values',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Results concept with upward trending graph',
    prompt: 'Minimalist icon representing results. Shows upward trending graph with positive metrics. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Mission/Values section'
  },
  {
    id: 'about-mission-partnership',
    page: 'AboutPage',
    section: 'Mission/Values',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Partnership concept with connected nodes',
    prompt: 'Minimalist icon representing partnership. Shows connected nodes or collaborative elements. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Mission/Values section'
  },
  {
    id: 'about-workspace',
    page: 'AboutPage',
    section: 'Trust/Credentials',
    type: 'background',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Modern professional workspace with analytics dashboards and office environment',
    title: 'Professional Workspace',
    prompt: 'Modern professional workspace with clean desk, multiple monitors showing analytics dashboards, office plants, and professional decor. Bengaluru office aesthetic. Blue and white color scheme. No people visible.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Trust/Credentials section'
  },

  // ============================================
  // CONTACT PAGE
  // ============================================
  {
    id: 'contact-hero-consultation',
    page: 'ContactPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Professional strategy consultation session with digital marketing planning',
    title: 'Strategy Consultation',
    prompt: 'Professional strategy consultation scene. Generic figures (silhouettes or back-view) discussing digital marketing strategy with laptops, whiteboards with strategy notes, and analytics displays. Clean, collaborative workspace. Blue and white. No specific faces.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'IMPORTANT: Use silhouettes or back-view figures only - NO specific faces'
  },
  {
    id: 'contact-form-success',
    page: 'ContactPage',
    section: 'Form',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Digital marketing success and positive results visualization',
    title: 'Success Results',
    prompt: 'Digital marketing success visualization. Shows upward trending graphs, positive metrics, celebration elements (confetti, checkmarks), and achievement indicators. Clean, professional style. Blue and white. No people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Form section accent'
  },

  // ============================================
  // BLOG PAGE
  // ============================================
  {
    id: 'blog-hero-content',
    page: 'BlogPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Content creation and blog writing workspace with analytics dashboard',
    title: 'Blog & Content',
    prompt: 'Content creation and blogging workspace. Shows laptop with blog editor, research materials, analytics dashboard, and content calendar. Clean, professional desk setup. Blue and white. No people.',
    loading: 'eager',
    priority: 'medium',
    status: 'ready',
    notes: 'Blog page hero'
  },
  {
    id: 'blog-card-fallback',
    page: 'BlogPage',
    section: 'Blog Cards',
    type: 'fallback',
    aspectRatio: '16:9',
    width: 1200,
    height: 675,
    alt: 'Blog post topic concept illustration',
    prompt: 'Blog post concept illustration. Clean, professional, minimalist style. Blue and white color scheme. Relevant icons and visual elements. No people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Use as fallback for blog posts without featured images'
  },
  {
    id: 'blog-post-hero-fallback',
    page: 'BlogPostPage',
    section: 'Hero',
    type: 'fallback',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Blog post topic concept illustration',
    prompt: 'Blog post concept illustration. Professional, clean, minimalist. Blue and white. Relevant to content topic. No people.',
    loading: 'eager',
    priority: 'medium',
    status: 'ready',
    notes: 'Use as fallback for blog posts without featured images'
  },

  // ============================================
  // CASE STUDIES PAGE
  // ============================================
  {
    id: 'case-studies-hero-results',
    page: 'CaseStudiesPage',
    section: 'Hero',
    type: 'hero',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Case study results dashboard showing successful campaign metrics and ROI improvements',
    title: 'Success Stories',
    prompt: 'Case study results dashboard showing multiple successful campaigns with improved metrics, ROI growth, lead generation success, and conversion improvements. Clean analytics interface. Blue and white. Professional.',
    loading: 'eager',
    priority: 'high',
    status: 'ready',
    notes: 'Case studies page hero'
  },
  {
    id: 'case-study-card-fallback',
    page: 'CaseStudiesPage',
    section: 'Case Study Cards',
    type: 'fallback',
    aspectRatio: '4:3',
    width: 1200,
    height: 900,
    alt: 'Abstract digital marketing results visualization',
    prompt: 'Abstract digital marketing results visualization. Shows upward trending graphs, positive metrics, and success indicators. Clean, professional style. Blue and white. No fake client screenshots or deceptive visuals.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Use as fallback for case studies without project images'
  },
  {
    id: 'case-study-detail-results',
    page: 'CaseStudyDetailPage',
    section: 'Results',
    type: 'results',
    aspectRatio: '16:9',
    width: 1600,
    height: 900,
    alt: 'Abstract digital marketing results dashboard showing improved metrics',
    prompt: 'Abstract digital marketing results dashboard showing improved metrics. Green indicators for positive results. Clean interface. Blue and white.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Generate as needed for case study detail pages'
  },

  // ============================================
  // LEAD MAGNETS
  // ============================================
  {
    id: 'lead-magnet-seo-checklist',
    page: 'HomePage',
    section: 'Lead Magnets',
    type: 'icon',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
    alt: 'SEO checklist lead magnet cover',
    title: 'SEO Checklist',
    prompt: 'SEO checklist cover design. Shows checkmarks, SEO-related icons (magnifying glass, trending graph, keywords), and professional layout. Blue and white color scheme. Clean, modern design. No people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Lead magnet - SEO focused'
  },
  {
    id: 'lead-magnet-ad-audit',
    page: 'HomePage',
    section: 'Lead Magnets',
    type: 'icon',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
    alt: 'Ad audit checklist lead magnet cover',
    title: 'Ad Audit Checklist',
    prompt: 'Ad audit checklist cover design. Shows audit checkmarks, ad platform icons (Google Ads, Meta Ads), performance metrics, and professional layout. Blue and white. Clean, modern design. No people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Lead magnet - Paid Ads focused'
  },
  {
    id: 'lead-magnet-conversion-checklist',
    page: 'HomePage',
    section: 'Lead Magnets',
    type: 'icon',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
    alt: 'Website conversion checklist lead magnet cover',
    title: 'Conversion Checklist',
    prompt: 'Website conversion checklist cover design. Shows conversion funnel, checkmarks, website optimization elements, and professional layout. Blue and white. Clean, modern design. No people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Lead magnet - Web Development/CRO focused'
  },
  {
    id: 'lead-magnet-local-seo-checklist',
    page: 'HomePage',
    section: 'Lead Magnets',
    type: 'icon',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
    alt: 'Local SEO checklist lead magnet cover',
    title: 'Local SEO Checklist',
    prompt: 'Local SEO checklist cover design. Shows map pins, local business icons, Google My Business elements, and professional layout. Blue and white. Clean, modern design. No people.',
    loading: 'lazy',
    priority: 'medium',
    status: 'ready',
    notes: 'Lead magnet - Local SEO focused'
  },

  // ============================================
  // HOMEPAGE SERVICE PREVIEW ICONS
  // ============================================
  {
    id: 'homepage-service-seo-icon',
    page: 'HomePage',
    section: 'Services Preview',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'SEO optimization service icon',
    prompt: 'Minimalist icon representing SEO. Shows magnifying glass with upward trending graph. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'low',
    status: 'ready',
    notes: 'Service preview icon'
  },
  {
    id: 'homepage-service-ads-icon',
    page: 'HomePage',
    section: 'Services Preview',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Google Ads service icon',
    prompt: 'Minimalist icon representing Google Ads. Shows Google Ads interface with bidding strategy. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'low',
    status: 'ready',
    notes: 'Service preview icon'
  },
  {
    id: 'homepage-service-social-icon',
    page: 'HomePage',
    section: 'Services Preview',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Social media marketing service icon',
    prompt: 'Minimalist icon representing social media marketing. Shows social media engagement metrics. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'low',
    status: 'ready',
    notes: 'Service preview icon'
  },
  {
    id: 'homepage-service-web-icon',
    page: 'HomePage',
    section: 'Services Preview',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Web development service icon',
    prompt: 'Minimalist icon representing web development. Shows responsive website design. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'low',
    status: 'ready',
    notes: 'Service preview icon'
  },
  {
    id: 'homepage-service-local-seo-icon',
    page: 'HomePage',
    section: 'Services Preview',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Local SEO service icon',
    prompt: 'Minimalist icon representing local SEO. Shows map with location pins and local business visibility. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'low',
    status: 'ready',
    notes: 'Service preview icon'
  },
  {
    id: 'homepage-service-performance-icon',
    page: 'HomePage',
    section: 'Services Preview',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Performance marketing service icon',
    prompt: 'Minimalist icon representing performance marketing. Shows ROI and conversion metrics dashboard. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'low',
    status: 'ready',
    notes: 'Service preview icon'
  },
  {
    id: 'homepage-service-content-icon',
    page: 'HomePage',
    section: 'Services Preview',
    type: 'icon',
    aspectRatio: '1:1',
    width: 400,
    height: 400,
    alt: 'Content marketing service icon',
    prompt: 'Minimalist icon representing content marketing. Shows blog editor and content calendar. Clean line art style. Blue and white. Professional, modern, no people.',
    loading: 'lazy',
    priority: 'low',
    status: 'ready',
    notes: 'Service preview icon'
  },
];

/**
 * Helper function to get placements by page
 */
export function getPlacementsByPage(page: string): AIImagePlacement[] {
  return aiImagePlacements.filter(placement => placement.page === page);
}

/**
 * Helper function to get placements by priority
 */
export function getPlacementsByPriority(priority: 'high' | 'medium' | 'low'): AIImagePlacement[] {
  return aiImagePlacements.filter(placement => placement.priority === priority);
}

/**
 * Helper function to get all high-priority placements (first batch)
 */
export function getHighPriorityPlacements(): AIImagePlacement[] {
  return getPlacementsByPriority('high');
}

/**
 * Helper function to get all medium-priority placements (second batch)
 */
export function getMediumPriorityPlacements(): AIImagePlacement[] {
  return getPlacementsByPriority('medium');
}

/**
 * Helper function to count placements by status
 */
export function countPlacementsByStatus(status: string): number {
  return aiImagePlacements.filter(placement => placement.status === status).length;
}

export default aiImagePlacements;
