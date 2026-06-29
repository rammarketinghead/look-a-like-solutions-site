/**
 * SEO Metadata Configuration for All Routes
 * Provides unique, optimized metadata for every page to ensure proper indexing and search visibility
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'service';
  noIndex?: boolean;
  schemaType?: 'Organization' | 'LocalBusiness' | 'Service' | 'Article' | 'Product' | 'WebApplication';
  faqs?: Array<{ question: string; answer: string }>;
}

export const SEO_METADATA: Record<string, PageMetadata> = {
  // Homepage
  '/': {
    title: 'Digital Marketing Agency in Bengaluru | Look A Like Solutions',
    description: 'Leading digital marketing agency in Bengaluru. Expert SEO, social media marketing, paid ads, web development, and data-driven strategies to grow your business online.',
    keywords: 'digital marketing agency Bengaluru, SEO services, social media marketing, paid advertising, web development',
    type: 'website',
    schemaType: 'Organization',
  },

  // About
  '/about': {
    title: 'About Look A Like Solutions | Digital Marketing Experts',
    description: 'Learn about Look A Like Solutions, a Bengaluru-based digital marketing agency with proven expertise in SEO, social media, paid ads, and web development.',
    keywords: 'about us, digital marketing team, Bengaluru agency, marketing experts',
    type: 'website',
  },

  // Services Hub
  '/services': {
    title: 'Digital Marketing Services | Look A Like Solutions',
    description: 'Comprehensive digital marketing services including SEO, social media marketing, paid advertising, web development, content marketing, and more.',
    keywords: 'digital marketing services, SEO, social media marketing, paid ads, web development, content marketing',
    type: 'website',
    schemaType: 'Service',
  },

  // Individual Services
  '/services/seo': {
    title: 'SEO Services in Bengaluru | Search Engine Optimization',
    description: 'Professional SEO services to improve your website ranking on Google. On-page, off-page, and technical SEO optimization for sustainable growth.',
    keywords: 'SEO services, search engine optimization, Google ranking, on-page SEO, technical SEO',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/social-media': {
    title: 'Social Media Marketing Services | Bengaluru',
    description: 'Strategic social media marketing services for Facebook, Instagram, LinkedIn, and YouTube. Grow your audience and engagement with data-driven campaigns.',
    keywords: 'social media marketing, Facebook marketing, Instagram marketing, LinkedIn marketing, YouTube marketing',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/paid-ads': {
    title: 'Paid Advertising Services | Google Ads & Facebook Ads',
    description: 'Expert paid advertising management for Google Ads, Facebook Ads, and Instagram Ads. Maximize ROI with targeted campaigns and continuous optimization.',
    keywords: 'paid advertising, Google Ads, Facebook Ads, Instagram Ads, PPC marketing, paid search',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/web-development': {
    title: 'Web Development Services | Custom Website Design',
    description: 'Professional web development services for responsive, fast-loading websites. Custom design, e-commerce solutions, and ongoing maintenance.',
    keywords: 'web development, website design, custom websites, e-commerce, responsive design',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/influencer-marketing': {
    title: 'Influencer Marketing Services | Brand Collaborations',
    description: 'Connect with relevant influencers to amplify your brand message. Strategic influencer partnerships for authentic audience engagement.',
    keywords: 'influencer marketing, brand collaborations, social media influencers, influencer partnerships',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/content-marketing': {
    title: 'Content Marketing Services | Blog & SEO Content',
    description: 'Strategic content marketing to attract and engage your target audience. Blog writing, whitepapers, case studies, and SEO-optimized content.',
    keywords: 'content marketing, blog writing, SEO content, copywriting, content strategy',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/data-analytics': {
    title: 'Data Analytics Services | Marketing Analytics & Reporting',
    description: 'Comprehensive data analytics and reporting to measure marketing performance. Track KPIs, ROI, and customer behavior with actionable insights.',
    keywords: 'data analytics, marketing analytics, Google Analytics, reporting, KPI tracking',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/conversion-optimization': {
    title: 'Conversion Rate Optimization | CRO Services',
    description: 'Improve your website conversion rates through A/B testing, UX optimization, and data-driven improvements. Maximize revenue from existing traffic.',
    keywords: 'conversion optimization, CRO, A/B testing, landing page optimization, UX improvement',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/email-marketing': {
    title: 'Email Marketing Services | Campaign Management',
    description: 'Strategic email marketing campaigns to nurture leads and retain customers. Segmentation, automation, and performance optimization.',
    keywords: 'email marketing, email campaigns, email automation, newsletter marketing, lead nurturing',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/youtube-growth': {
    title: 'YouTube Growth Services | Channel Optimization',
    description: 'Grow your YouTube channel with strategic optimization, content planning, and audience engagement strategies. Increase subscribers and views.',
    keywords: 'YouTube growth, channel optimization, video marketing, YouTube SEO, subscriber growth',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/digital-audit': {
    title: 'Digital Audit Services | Website & Marketing Audit',
    description: 'Comprehensive digital audit of your website and marketing efforts. Identify gaps, opportunities, and actionable recommendations for improvement.',
    keywords: 'digital audit, website audit, SEO audit, marketing audit, competitive analysis',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/digital-training': {
    title: 'Digital Marketing Training | Workshops & Courses',
    description: 'Professional digital marketing training for teams. Learn SEO, social media, paid ads, analytics, and content marketing best practices.',
    keywords: 'digital marketing training, SEO training, social media training, marketing courses, workshops',
    type: 'website',
    schemaType: 'Service',
  },

  '/services/look-a-like-solutions': {
    title: 'Look-A-Like Solutions | Audience Targeting',
    description: 'Advanced audience targeting using look-a-like solutions. Find and reach customers similar to your best customers across platforms.',
    keywords: 'look-a-like audiences, audience targeting, customer acquisition, lookalike targeting',
    type: 'website',
    schemaType: 'Service',
  },

  // Tools Hub
  '/tools': {
    title: 'Free Digital Marketing Tools | Look A Like Solutions',
    description: 'Collection of free digital marketing tools including SEO keyword research, SERP preview, backlink checker, UTM builder, and more.',
    keywords: 'free marketing tools, SEO tools, keyword research, SERP checker, backlink checker',
    type: 'website',
    schemaType: 'WebApplication',
  },

  // Individual Tools
  '/tools/seo-keyword-research': {
    title: 'Free SEO Keyword Research Tool | Find High-Value Keywords',
    description: 'Discover high-value keywords for your SEO strategy. Analyze search volume, competition, and keyword difficulty to optimize your content.',
    keywords: 'keyword research tool, SEO keywords, search volume, keyword difficulty, keyword analysis',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/email-subject-tester': {
    title: 'Email Subject Line Tester | Improve Open Rates',
    description: 'Test and optimize your email subject lines for better open rates. Get AI-powered suggestions to improve email marketing performance.',
    keywords: 'email subject tester, email open rates, subject line optimization, email marketing',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/ppc-ad-generator': {
    title: 'PPC Ad Generator | Create Google Ads Copy',
    description: 'Generate compelling PPC ad copy for Google Ads and Facebook Ads. AI-powered tool to create high-converting ad headlines and descriptions.',
    keywords: 'PPC ad generator, Google Ads copy, ad copywriting, Facebook ads, ad creation',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/keyword-grouping': {
    title: 'Keyword Grouping Tool | Organize Keywords for PPC',
    description: 'Organize and group keywords for efficient PPC campaign management. Improve ad group structure and relevance scores.',
    keywords: 'keyword grouping, PPC keywords, ad groups, keyword organization, campaign structure',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/keyword-match-types': {
    title: 'Keyword Match Types Guide | PPC Keyword Matching',
    description: 'Understand Google Ads keyword match types: broad, phrase, exact, and broad match modifier. Optimize your PPC campaigns.',
    keywords: 'keyword match types, Google Ads, PPC keywords, broad match, phrase match, exact match',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/meta-title-description-generator': {
    title: 'Meta Title & Description Generator | SEO Tool',
    description: 'Generate optimized meta titles and descriptions for better click-through rates in search results. SEO-friendly meta tag creation.',
    keywords: 'meta title generator, meta description, SEO meta tags, SERP optimization, title tag',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/serp-snippet-preview': {
    title: 'SERP Snippet Preview Tool | See Your Search Results',
    description: 'Preview how your website appears in Google search results. Optimize meta titles and descriptions for better CTR.',
    keywords: 'SERP preview, search results preview, meta tags preview, Google search results',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/backlink-checker': {
    title: 'Backlink Checker Tool | Analyze Your Backlinks',
    description: 'Check and analyze your website backlinks. Monitor link quality, anchor text, and domain authority of linking sites.',
    keywords: 'backlink checker, backlink analysis, link building, domain authority, SEO links',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/utm-link-builder': {
    title: 'UTM Link Builder | Campaign Tracking URLs',
    description: 'Create UTM parameters for tracking marketing campaigns in Google Analytics. Monitor campaign performance across channels.',
    keywords: 'UTM builder, campaign tracking, Google Analytics, UTM parameters, link tracking',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/website-speed-test': {
    title: 'Website Speed Test Tool | Page Load Performance',
    description: 'Test your website speed and performance. Get recommendations to improve page load time and user experience.',
    keywords: 'website speed test, page speed, performance testing, Core Web Vitals, site speed',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/social-media-post-generator': {
    title: 'Social Media Post Generator | Create Content Ideas',
    description: 'Generate engaging social media post ideas and copy for Facebook, Instagram, LinkedIn, and Twitter.',
    keywords: 'social media post generator, content ideas, social media copy, post creation, content calendar',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/ai-humanizer': {
    title: 'AI Text Humanizer | Make AI Content More Natural',
    description: 'Convert AI-generated content into natural, human-like text. Improve readability and engagement of AI-written content.',
    keywords: 'AI humanizer, text humanizer, AI content, natural language, content improvement',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/open-graph-tag-generator': {
    title: 'Open Graph Tag Generator | Social Media Preview',
    description: 'Generate Open Graph meta tags for better social media sharing. Control how your content appears on Facebook, LinkedIn, and Twitter.',
    keywords: 'Open Graph tags, social media preview, meta tags, Facebook sharing, social sharing',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/favicon-generator': {
    title: 'Favicon Generator | Create Website Favicon',
    description: 'Generate custom favicons for your website. Create professional favicon images in multiple formats.',
    keywords: 'favicon generator, favicon creator, website icon, browser tab icon, favicon design',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/xml-sitemap-generator': {
    title: 'XML Sitemap Generator | SEO Sitemap Tool',
    description: 'Generate XML sitemaps for your website. Help search engines crawl and index your pages more efficiently.',
    keywords: 'XML sitemap generator, sitemap creator, SEO sitemap, search engine indexing',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/robots-txt-generator': {
    title: 'Robots.txt Generator | Control Search Engine Crawling',
    description: 'Generate robots.txt file to control how search engines crawl your website. Manage crawl budget and block unwanted pages.',
    keywords: 'robots.txt generator, search engine crawling, crawl control, SEO robots file',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/hashtag-generator': {
    title: 'Hashtag Generator | Social Media Hashtags',
    description: 'Generate relevant hashtags for your social media posts. Increase visibility and reach on Instagram, Twitter, and TikTok.',
    keywords: 'hashtag generator, social media hashtags, Instagram hashtags, Twitter hashtags, hashtag research',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/content-readability-checker': {
    title: 'Content Readability Checker | Improve Readability Score',
    description: 'Analyze and improve your content readability. Get suggestions to make your writing clearer and more engaging.',
    keywords: 'readability checker, content analysis, writing quality, readability score, content optimization',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/google-ads-headline-generator': {
    title: 'Google Ads Headline Generator | Create Ad Headlines',
    description: 'Generate compelling headlines for Google Ads. Create high-converting ad copy with AI assistance.',
    keywords: 'Google Ads headlines, ad headline generator, PPC headlines, ad copywriting, Google Ads copy',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/blog-topic-generator': {
    title: 'Blog Topic Generator | Content Ideas for Blogging',
    description: 'Generate blog topic ideas based on your keywords. Get content ideas to improve your blog strategy and SEO.',
    keywords: 'blog topic generator, content ideas, blog topics, content calendar, blogging ideas',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/image-alt-text-generator': {
    title: 'Image Alt Text Generator | SEO Image Descriptions',
    description: 'Generate SEO-friendly alt text for images. Improve image SEO and accessibility with descriptive alt tags.',
    keywords: 'alt text generator, image alt text, image SEO, accessibility, alt tags',
    type: 'website',
    schemaType: 'WebApplication',
  },

  '/tools/marketing-funnel-roi-calculator': {
    title: 'Marketing Funnel ROI Calculator | Calculate Marketing ROI',
    description: 'Calculate your marketing ROI and funnel performance. Analyze conversion rates and revenue impact of your campaigns.',
    keywords: 'ROI calculator, marketing ROI, funnel analysis, conversion rate, revenue tracking',
    type: 'website',
    schemaType: 'WebApplication',
  },

  // Industry Solutions
  '/industry-solutions': {
    title: 'Industry-Specific Digital Marketing Solutions',
    description: 'Tailored digital marketing solutions for lawyers, doctors, real estate agents, restaurants, hotels, and educational institutions.',
    keywords: 'industry solutions, vertical marketing, niche marketing, professional services marketing',
    type: 'website',
  },

  '/seo-lead-generation': {
    title: 'SEO Lead Generation Services | Organic Growth Strategy',
    description: 'Generate qualified leads through SEO. Attract high-intent customers searching for your services with organic search optimization.',
    keywords: 'SEO lead generation, organic leads, lead generation strategy, qualified leads, search engine leads',
    type: 'website',
    schemaType: 'Service',
  },

  '/lawyer-lead-generation': {
    title: 'Lawyer Lead Generation | Legal Services Marketing',
    description: 'Specialized lead generation for law firms. Attract qualified clients through SEO, paid ads, and content marketing.',
    keywords: 'lawyer lead generation, legal marketing, law firm marketing, attorney leads, legal services',
    type: 'website',
    schemaType: 'Service',
  },

  '/doctor-lead-generation': {
    title: 'Doctor Lead Generation | Medical Practice Marketing',
    description: 'Lead generation for medical practices and healthcare professionals. Attract new patients through targeted digital marketing.',
    keywords: 'doctor lead generation, medical marketing, healthcare marketing, patient acquisition, medical practice',
    type: 'website',
    schemaType: 'Service',
  },

  '/real-estate-lead-generation': {
    title: 'Real Estate Lead Generation | Property Marketing',
    description: 'Generate qualified leads for real estate agents and brokers. Attract buyers and sellers through targeted campaigns.',
    keywords: 'real estate lead generation, property marketing, real estate marketing, buyer leads, seller leads',
    type: 'website',
    schemaType: 'Service',
  },

  '/education-lead-generation': {
    title: 'Education Lead Generation | Student Recruitment',
    description: 'Lead generation for educational institutions. Attract qualified students through targeted digital marketing campaigns.',
    keywords: 'education lead generation, student recruitment, school marketing, college marketing, enrollment',
    type: 'website',
    schemaType: 'Service',
  },

  '/restaurant-hotel-lead-generation': {
    title: 'Restaurant & Hotel Lead Generation | Hospitality Marketing',
    description: 'Lead generation for restaurants and hotels. Attract customers and increase bookings through digital marketing.',
    keywords: 'restaurant marketing, hotel marketing, hospitality marketing, customer acquisition, booking generation',
    type: 'website',
    schemaType: 'Service',
  },

  '/google-ads-training': {
    title: 'Google Ads Training | PPC Certification Course',
    description: 'Comprehensive Google Ads training for beginners and advanced users. Learn PPC marketing, campaign management, and optimization.',
    keywords: 'Google Ads training, PPC training, Google Ads course, paid search training, certification',
    type: 'website',
    schemaType: 'Service',
  },

  // Content Pages
  '/blog': {
    title: 'Digital Marketing Blog | SEO & Marketing Tips',
    description: 'Read latest articles on SEO, social media marketing, paid advertising, web development, and digital marketing strategies.',
    keywords: 'digital marketing blog, SEO blog, marketing articles, marketing tips, industry insights',
    type: 'website',
  },

  '/case-studies': {
    title: 'Case Studies | Digital Marketing Success Stories',
    description: 'Explore our case studies showcasing successful digital marketing campaigns and measurable results for our clients.',
    keywords: 'case studies, success stories, marketing results, client testimonials, project portfolio',
    type: 'website',
  },

  '/contact': {
    title: 'Contact Us | Get Your Free Digital Marketing Consultation',
    description: 'Contact Look A Like Solutions for a free consultation. Discuss your digital marketing needs with our experts.',
    keywords: 'contact us, consultation, digital marketing services, get quote, contact information',
    type: 'website',
    schemaType: 'LocalBusiness',
  },

  '/privacy': {
    title: 'Privacy Policy | Look A Like Solutions',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, personal information, privacy',
    type: 'website',
    noIndex: false,
  },

  '/terms': {
    title: 'Terms of Service | Look A Like Solutions',
    description: 'Review our terms of service and conditions for using Look A Like Solutions website and services.',
    keywords: 'terms of service, terms and conditions, legal terms, service agreement',
    type: 'website',
    noIndex: false,
  },

  '/sitemap': {
    title: 'Sitemap | Look A Like Solutions',
    description: 'Browse the complete sitemap of Look A Like Solutions website. Find all pages and services.',
    keywords: 'sitemap, site map, website navigation, page directory',
    type: 'website',
    noIndex: false,
  },

  '/thank-you': {
    title: 'Thank You | Look A Like Solutions',
    description: 'Thank you for contacting Look A Like Solutions. We will get back to you soon.',
    keywords: 'thank you, confirmation, contact confirmation',
    type: 'website',
    noIndex: true,
  },
};

/**
 * Get SEO metadata for a given path
 * Falls back to default if specific path not found
 */
export function getSEOMetadata(pathname: string): PageMetadata {
  // Normalize pathname
  const normalizedPath = pathname.toLowerCase().replace(/\/$/, '') || '/';

  // Check for exact match
  if (SEO_METADATA[normalizedPath]) {
    return SEO_METADATA[normalizedPath];
  }

  // Check for blog post pattern
  if (normalizedPath.startsWith('/blog/')) {
    return {
      title: 'Blog Post | Look A Like Solutions',
      description: 'Read our latest digital marketing insights and strategies.',
      type: 'article',
      schemaType: 'Article',
    };
  }

  // Check for case study pattern
  if (normalizedPath.startsWith('/case-studies/')) {
    return {
      title: 'Case Study | Look A Like Solutions',
      description: 'Explore our successful digital marketing case study and results.',
      type: 'website',
    };
  }

  // Default fallback
  return {
    title: 'Look A Like Solutions - Digital Marketing Agency in Bengaluru',
    description: 'Leading digital marketing agency in Bengaluru offering SEO, social media marketing, paid ads, web development, and more.',
    type: 'website',
  };
}
