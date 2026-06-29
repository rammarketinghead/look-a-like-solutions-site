import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Layout from '@/components/Layout';

// Lazy load all page components
const ErrorPage = lazy(() => import('@/components/pages/ErrorPage'));
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const IndustrySolutionsPage = lazy(() => import('@/components/pages/IndustrySolutionsPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const CaseStudiesPage = lazy(() => import('@/components/pages/CaseStudiesPage'));
const BlogPage = lazy(() => import('@/components/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/components/pages/BlogPostPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const ToolsPage = lazy(() => import('@/components/pages/ToolsPage'));
const SEOPage = lazy(() => import('@/components/pages/services/SEOPage'));
const SocialMediaPage = lazy(() => import('@/components/pages/services/SocialMediaPage'));
const PaidAdsPage = lazy(() => import('@/components/pages/services/PaidAdsPage'));
const WebDevelopmentPage = lazy(() => import('@/components/pages/services/WebDevelopmentPage'));
const InfluencerMarketingPage = lazy(() => import('@/components/pages/services/InfluencerMarketingPage'));
const ContentMarketingPage = lazy(() => import('@/components/pages/services/ContentMarketingPage'));
const DataAnalyticsPage = lazy(() => import('@/components/pages/services/DataAnalyticsPage'));
const ConversionOptimizationPage = lazy(() => import('@/components/pages/services/ConversionOptimizationPage'));
const EmailMarketingPage = lazy(() => import('@/components/pages/services/EmailMarketingPage'));
const YouTubeGrowthPage = lazy(() => import('@/components/pages/services/YouTubeGrowthPage'));
const DigitalAuditPage = lazy(() => import('@/components/pages/services/DigitalAuditPage'));
const DigitalTrainingPage = lazy(() => import('@/components/pages/services/DigitalTrainingPage'));
const LookALikeSolutionsPage = lazy(() => import('@/components/pages/services/LookALikeSolutionsPage'));
const SEOKeywordResearchPage = lazy(() => import('@/components/pages/tools/SEOKeywordResearchPage'));
const EmailSubjectTesterPage = lazy(() => import('@/components/pages/tools/EmailSubjectTesterPage'));
const PPCAdGeneratorPage = lazy(() => import('@/components/pages/tools/PPCAdGeneratorPage'));
const KeywordGroupingPage = lazy(() => import('@/components/pages/tools/KeywordGroupingPage'));
const KeywordMatchTypesPage = lazy(() => import('@/components/pages/tools/KeywordMatchTypesPage'));
const MetaTitleDescriptionGeneratorPage = lazy(() => import('@/components/pages/tools/MetaTitleDescriptionGeneratorPage'));
const SERPSnippetPreviewPage = lazy(() => import('@/components/pages/tools/SERPSnippetPreviewPage'));
const BacklinkCheckerPage = lazy(() => import('@/components/pages/tools/BacklinkCheckerPage'));
const UTMLinkBuilderPage = lazy(() => import('@/components/pages/tools/UTMLinkBuilderPage'));
const WebsiteSpeedTestPage = lazy(() => import('@/components/pages/tools/WebsiteSpeedTestPage'));
const SocialMediaPostGeneratorPage = lazy(() => import('@/components/pages/tools/SocialMediaPostGeneratorPage'));
const AIHumanizerPage = lazy(() => import('@/components/pages/tools/AIHumanizerPage'));
const OpenGraphTagGeneratorPage = lazy(() => import('@/components/pages/tools/OpenGraphTagGeneratorPage'));
const FaviconGeneratorPage = lazy(() => import('@/components/pages/tools/FaviconGeneratorPage'));
const XMLSitemapGeneratorPage = lazy(() => import('@/components/pages/tools/XMLSitemapGeneratorPage'));
const RobotsTxtGeneratorPage = lazy(() => import('@/components/pages/tools/RobotsTxtGeneratorPage'));
const HashtagGeneratorPage = lazy(() => import('@/components/pages/tools/HashtagGeneratorPage'));
const ContentReadabilityCheckerPage = lazy(() => import('@/components/pages/tools/ContentReadabilityCheckerPage'));
const GoogleAdsHeadlineGeneratorPage = lazy(() => import('@/components/pages/tools/GoogleAdsHeadlineGeneratorPage'));
const BlogTopicGeneratorPage = lazy(() => import('@/components/pages/tools/BlogTopicGeneratorPage'));
const ImageAltTextGeneratorPage = lazy(() => import('@/components/pages/tools/ImageAltTextGeneratorPage'));
const MarketingFunnelROICalculatorPage = lazy(() => import('@/components/pages/tools/MarketingFunnelROICalculatorPage'));
const SitemapPage = lazy(() => import('@/components/pages/SitemapPage'));
const PrivacyPolicyPage = lazy(() => import('@/components/pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('@/components/pages/TermsOfServicePage'));
const CaseStudyDetailPage = lazy(() => import('@/components/pages/CaseStudyDetailPage'));
const BlogSlugFixPage = lazy(() => import('@/components/pages/BlogSlugFixPage'));
const BlogDataProtectionPage = lazy(() => import('@/components/pages/BlogDataProtectionPage'));
const BlogDataRecoveryPage = lazy(() => import('@/components/pages/BlogDataRecoveryPage'));
const SpecificBlogRecoveryPage = lazy(() => import('@/components/pages/SpecificBlogRecoveryPage'));
const BlogAnalysisPage = lazy(() => import('@/components/pages/BlogAnalysisPage'));
const SitemapAdminPage = lazy(() => import('@/components/pages/SitemapAdminPage'));
const SitemapHtmlPage = lazy(() => import('@/components/pages/SitemapHtmlPage'));
const SearchAnalyticsPage = lazy(() => import('@/components/pages/SearchAnalyticsPage'));
const SearchAnalyticsDiagnosticsPage = lazy(() => import('@/components/pages/SearchAnalyticsDiagnosticsPage'));
const SearchResultsPage = lazy(() => import('@/components/pages/SearchResultsPage'));
const GoogleAdsTrainingPage = lazy(() => import('@/components/pages/GoogleAdsTrainingPage'));
const ThankYouPage = lazy(() => import('@/components/pages/ThankYouPage'));
const SEOLeadGenerationPage = lazy(() => import('@/components/pages/SEOLeadGenerationPage'));
const LawyerLeadGenerationPage = lazy(() => import('@/components/pages/LawyerLeadGenerationPage'));
const DoctorLeadGenerationPage = lazy(() => import('@/components/pages/DoctorLeadGenerationPage'));
const RealEstateLeadGenerationPage = lazy(() => import('@/components/pages/RealEstateLeadGenerationPage'));
const EducationLeadGenerationPage = lazy(() => import('@/components/pages/EducationLeadGenerationPage'));
const RestaurantHotelLeadGenerationPage = lazy(() => import('@/components/pages/RestaurantHotelLeadGenerationPage'));
const MetaAdsPage = lazy(() => import('@/components/pages/services/MetaAdsPage'));
const LocalSEOPage = lazy(() => import('@/components/pages/services/LocalSEOPage'));
const PerformanceMarketingPage = lazy(() => import('@/components/pages/services/PerformanceMarketingPage'));
const BlogMigrationAdminPage = lazy(() => import('@/components/pages/BlogMigrationAdminPage'));
const BlogContentAuditPage = lazy(() => import('@/components/pages/BlogContentAuditPage'));

// Fallback component for lazy loading
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}

// Layout wrapper that includes ScrollToTop
function LayoutWithScrollToTop() {
  return (
    <>
      <ScrollToTop />
      <Layout />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithScrollToTop />,
    errorElement: (
      <Suspense fallback={<PageFallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<PageFallback />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: "tools",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ToolsPage />
          </Suspense>
        ),
      },
      {
        path: "tools/seo-keyword-research",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SEOKeywordResearchPage />
          </Suspense>
        ),
      },
      {
        path: "tools/email-subject-tester",
        element: (
          <Suspense fallback={<PageFallback />}>
            <EmailSubjectTesterPage />
          </Suspense>
        ),
      },
      {
        path: "tools/ppc-ad-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <PPCAdGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/keyword-grouping",
        element: (
          <Suspense fallback={<PageFallback />}>
            <KeywordGroupingPage />
          </Suspense>
        ),
      },
      {
        path: "tools/keyword-match-types",
        element: (
          <Suspense fallback={<PageFallback />}>
            <KeywordMatchTypesPage />
          </Suspense>
        ),
      },
      {
        path: "tools/meta-title-description-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <MetaTitleDescriptionGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/serp-snippet-preview",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SERPSnippetPreviewPage />
          </Suspense>
        ),
      },
      {
        path: "tools/backlink-checker",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BacklinkCheckerPage />
          </Suspense>
        ),
      },
      {
        path: "tools/utm-link-builder",
        element: (
          <Suspense fallback={<PageFallback />}>
            <UTMLinkBuilderPage />
          </Suspense>
        ),
      },
      {
        path: "tools/website-speed-test",
        element: (
          <Suspense fallback={<PageFallback />}>
            <WebsiteSpeedTestPage />
          </Suspense>
        ),
      },
      {
        path: "tools/social-media-post-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SocialMediaPostGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/ai-humanizer",
        element: (
          <Suspense fallback={<PageFallback />}>
            <AIHumanizerPage />
          </Suspense>
        ),
      },
      {
        path: "tools/open-graph-tag-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <OpenGraphTagGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/favicon-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <FaviconGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/xml-sitemap-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <XMLSitemapGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/robots-txt-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <RobotsTxtGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/hashtag-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <HashtagGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/content-readability-checker",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ContentReadabilityCheckerPage />
          </Suspense>
        ),
      },
      {
        path: "tools/google-ads-headline-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <GoogleAdsHeadlineGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/blog-topic-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogTopicGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/image-alt-text-generator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ImageAltTextGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "tools/marketing-funnel-roi-calculator",
        element: (
          <Suspense fallback={<PageFallback />}>
            <MarketingFunnelROICalculatorPage />
          </Suspense>
        ),
      },
      {
        path: "services/seo",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SEOPage />
          </Suspense>
        ),
      },
      {
        path: "services/social-media",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SocialMediaPage />
          </Suspense>
        ),
      },
      {
        path: "services/paid-ads",
        element: (
          <Suspense fallback={<PageFallback />}>
            <PaidAdsPage />
          </Suspense>
        ),
      },
      {
        path: "services/web-development",
        element: (
          <Suspense fallback={<PageFallback />}>
            <WebDevelopmentPage />
          </Suspense>
        ),
      },
      {
        path: "services/influencer-marketing",
        element: (
          <Suspense fallback={<PageFallback />}>
            <InfluencerMarketingPage />
          </Suspense>
        ),
      },
      {
        path: "services/content-marketing",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ContentMarketingPage />
          </Suspense>
        ),
      },
      {
        path: "services/data-analytics",
        element: (
          <Suspense fallback={<PageFallback />}>
            <DataAnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: "services/conversion-optimization",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ConversionOptimizationPage />
          </Suspense>
        ),
      },
      {
        path: "services/email-marketing",
        element: (
          <Suspense fallback={<PageFallback />}>
            <EmailMarketingPage />
          </Suspense>
        ),
      },
      {
        path: "services/youtube-growth",
        element: (
          <Suspense fallback={<PageFallback />}>
            <YouTubeGrowthPage />
          </Suspense>
        ),
      },
      {
        path: "services/digital-audit",
        element: (
          <Suspense fallback={<PageFallback />}>
            <DigitalAuditPage />
          </Suspense>
        ),
      },
      {
        path: "services/digital-training",
        element: (
          <Suspense fallback={<PageFallback />}>
            <DigitalTrainingPage />
          </Suspense>
        ),
      },
      {
        path: "services/look-a-like-solutions",
        element: (
          <Suspense fallback={<PageFallback />}>
            <LookALikeSolutionsPage />
          </Suspense>
        ),
      },
      {
        path: "services/meta-ads",
        element: (
          <Suspense fallback={<PageFallback />}>
            <MetaAdsPage />
          </Suspense>
        ),
      },
      {
        path: "services/local-seo",
        element: (
          <Suspense fallback={<PageFallback />}>
            <LocalSEOPage />
          </Suspense>
        ),
      },
      {
        path: "services/performance-marketing",
        element: (
          <Suspense fallback={<PageFallback />}>
            <PerformanceMarketingPage />
          </Suspense>
        ),
      },
      {
        path: "case-studies",
        element: (
          <Suspense fallback={<PageFallback />}>
            <CaseStudiesPage />
          </Suspense>
        ),
      },
      {
        path: "case-studies/:id",
        element: (
          <Suspense fallback={<PageFallback />}>
            <CaseStudyDetailPage />
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: "blog/:slug",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogPostPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SearchResultsPage />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<PageFallback />}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
      {
        path: "terms",
        element: (
          <Suspense fallback={<PageFallback />}>
            <TermsOfServicePage />
          </Suspense>
        ),
      },
      {
        path: "sitemap",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SitemapHtmlPage />
          </Suspense>
        ),
      },
      {
        path: "admin/blog-slug-fix",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogSlugFixPage />
          </Suspense>
        ),
      },
      {
        path: "admin/blog-data-protection",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogDataProtectionPage />
          </Suspense>
        ),
      },
      {
        path: "admin/blog-data-recovery",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogDataRecoveryPage />
          </Suspense>
        ),
      },
      {
        path: "admin/specific-blog-recovery",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SpecificBlogRecoveryPage />
          </Suspense>
        ),
      },
      {
        path: "admin/blog-analysis",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogAnalysisPage />
          </Suspense>
        ),
      },
      {
        path: "admin/sitemap",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SitemapAdminPage />
          </Suspense>
        ),
      },
      {
        path: "admin/search-analytics",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SearchAnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: "admin/search-analytics-diagnostics",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SearchAnalyticsDiagnosticsPage />
          </Suspense>
        ),
      },
      {
        path: "google-ads-training",
        element: (
          <Suspense fallback={<PageFallback />}>
            <GoogleAdsTrainingPage />
          </Suspense>
        ),
      },
      {
        path: "thank-you",
        element: (
          <Suspense fallback={<PageFallback />}>
            <ThankYouPage />
          </Suspense>
        ),
      },
      {
        path: "seo-lead-generation",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SEOLeadGenerationPage />
          </Suspense>
        ),
      },
      {
        path: "lawyer-lead-generation",
        element: (
          <Suspense fallback={<PageFallback />}>
            <LawyerLeadGenerationPage />
          </Suspense>
        ),
      },
      {
        path: "doctor-lead-generation",
        element: (
          <Suspense fallback={<PageFallback />}>
            <DoctorLeadGenerationPage />
          </Suspense>
        ),
      },
      {
        path: "real-estate-lead-generation",
        element: (
          <Suspense fallback={<PageFallback />}>
            <RealEstateLeadGenerationPage />
          </Suspense>
        ),
      },
      {
        path: "education-lead-generation",
        element: (
          <Suspense fallback={<PageFallback />}>
            <EducationLeadGenerationPage />
          </Suspense>
        ),
      },
      {
        path: "restaurant-hotel-lead-generation",
        element: (
          <Suspense fallback={<PageFallback />}>
            <RestaurantHotelLeadGenerationPage />
          </Suspense>
        ),
      },
      {
        path: "industry-solutions",
        element: (
          <Suspense fallback={<PageFallback />}>
            <IndustrySolutionsPage />
          </Suspense>
        ),
      },
      {
        path: "admin/blog-migration",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogMigrationAdminPage />
          </Suspense>
        ),
      },
      {
        path: "admin/blog-content-audit",
        element: (
          <Suspense fallback={<PageFallback />}>
            <BlogContentAuditPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
