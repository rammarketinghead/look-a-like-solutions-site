import React, { Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Layout from '@/components/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load all pages
const HomePage = React.lazy(() => import('@/components/pages/HomePage'));
const AboutPage = React.lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = React.lazy(() => import('@/components/pages/ServicesPage'));
const CaseStudiesPage = React.lazy(() => import('@/components/pages/CaseStudiesPage'));
const BlogPage = React.lazy(() => import('@/components/pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('@/components/pages/BlogPostPage'));
const ContactPage = React.lazy(() => import('@/components/pages/ContactPage'));
const ToolsPage = React.lazy(() => import('@/components/pages/ToolsPage'));
const SEOPage = React.lazy(() => import('@/components/pages/services/SEOPage'));
const SocialMediaPage = React.lazy(() => import('@/components/pages/services/SocialMediaPage'));
const PaidAdsPage = React.lazy(() => import('@/components/pages/services/PaidAdsPage'));
const WebDevelopmentPage = React.lazy(() => import('@/components/pages/services/WebDevelopmentPage'));
const InfluencerMarketingPage = React.lazy(() => import('@/components/pages/services/InfluencerMarketingPage'));
const ContentMarketingPage = React.lazy(() => import('@/components/pages/services/ContentMarketingPage'));
const DataAnalyticsPage = React.lazy(() => import('@/components/pages/services/DataAnalyticsPage'));
const ConversionOptimizationPage = React.lazy(() => import('@/components/pages/services/ConversionOptimizationPage'));
const EmailMarketingPage = React.lazy(() => import('@/components/pages/services/EmailMarketingPage'));
const YouTubeGrowthPage = React.lazy(() => import('@/components/pages/services/YouTubeGrowthPage'));
const DigitalAuditPage = React.lazy(() => import('@/components/pages/services/DigitalAuditPage'));
const DigitalTrainingPage = React.lazy(() => import('@/components/pages/services/DigitalTrainingPage'));
const LookALikeSolutionsPage = React.lazy(() => import('@/components/pages/services/LookALikeSolutionsPage'));
const SEOKeywordResearchPage = React.lazy(() => import('@/components/pages/tools/SEOKeywordResearchPage'));
const EmailSubjectTesterPage = React.lazy(() => import('@/components/pages/tools/EmailSubjectTesterPage'));
const PPCAdGeneratorPage = React.lazy(() => import('@/components/pages/tools/PPCAdGeneratorPage'));
const KeywordGroupingPage = React.lazy(() => import('@/components/pages/tools/KeywordGroupingPage'));
const KeywordMatchTypesPage = React.lazy(() => import('@/components/pages/tools/KeywordMatchTypesPage'));
const MetaTitleDescriptionGeneratorPage = React.lazy(() => import('@/components/pages/tools/MetaTitleDescriptionGeneratorPage'));
const SERPSnippetPreviewPage = React.lazy(() => import('@/components/pages/tools/SERPSnippetPreviewPage'));
const BacklinkCheckerPage = React.lazy(() => import('@/components/pages/tools/BacklinkCheckerPage'));
const UTMLinkBuilderPage = React.lazy(() => import('@/components/pages/tools/UTMLinkBuilderPage'));
const WebsiteSpeedTestPage = React.lazy(() => import('@/components/pages/tools/WebsiteSpeedTestPage'));
const SocialMediaPostGeneratorPage = React.lazy(() => import('@/components/pages/tools/SocialMediaPostGeneratorPage'));
const AIHumanizerPage = React.lazy(() => import('@/components/pages/tools/AIHumanizerPage'));
const OpenGraphTagGeneratorPage = React.lazy(() => import('@/components/pages/tools/OpenGraphTagGeneratorPage'));
const FaviconGeneratorPage = React.lazy(() => import('@/components/pages/tools/FaviconGeneratorPage'));
const XMLSitemapGeneratorPage = React.lazy(() => import('@/components/pages/tools/XMLSitemapGeneratorPage'));
const RobotsTxtGeneratorPage = React.lazy(() => import('@/components/pages/tools/RobotsTxtGeneratorPage'));
const HashtagGeneratorPage = React.lazy(() => import('@/components/pages/tools/HashtagGeneratorPage'));
const ContentReadabilityCheckerPage = React.lazy(() => import('@/components/pages/tools/ContentReadabilityCheckerPage'));
const GoogleAdsHeadlineGeneratorPage = React.lazy(() => import('@/components/pages/tools/GoogleAdsHeadlineGeneratorPage'));
const BlogTopicGeneratorPage = React.lazy(() => import('@/components/pages/tools/BlogTopicGeneratorPage'));
const ImageAltTextGeneratorPage = React.lazy(() => import('@/components/pages/tools/ImageAltTextGeneratorPage'));
const SitemapPage = React.lazy(() => import('@/components/pages/SitemapPage'));
const PrivacyPolicyPage = React.lazy(() => import('@/components/pages/PrivacyPolicyPage'));
const TermsOfServicePage = React.lazy(() => import('@/components/pages/TermsOfServicePage'));
const CaseStudyDetailPage = React.lazy(() => import('@/components/pages/CaseStudyDetailPage'));
const BlogSlugFixPage = React.lazy(() => import('@/components/pages/BlogSlugFixPage'));
const BlogDataProtectionPage = React.lazy(() => import('@/components/pages/BlogDataProtectionPage'));
const BlogDataRecoveryPage = React.lazy(() => import('@/components/pages/BlogDataRecoveryPage'));
const SpecificBlogRecoveryPage = React.lazy(() => import('@/components/pages/SpecificBlogRecoveryPage'));
const BlogAnalysisPage = React.lazy(() => import('@/components/pages/BlogAnalysisPage'));
const SitemapAdminPage = React.lazy(() => import('@/components/pages/SitemapAdminPage'));
const SitemapHtmlPage = React.lazy(() => import('@/components/pages/SitemapHtmlPage'));
const SearchAnalyticsPage = React.lazy(() => import('@/components/pages/SearchAnalyticsPage'));
const SearchAnalyticsDiagnosticsPage = React.lazy(() => import('@/components/pages/SearchAnalyticsDiagnosticsPage'));
const SearchResultsPage = React.lazy(() => import('@/components/pages/SearchResultsPage'));
const GoogleAdsTrainingPage = React.lazy(() => import('@/components/pages/GoogleAdsTrainingPage'));
const ThankYouPage = React.lazy(() => import('@/components/pages/ThankYouPage'));
const SEOLeadGenerationPage = React.lazy(() => import('@/components/pages/SEOLeadGenerationPage'));
const LawyerLeadGenerationPage = React.lazy(() => import('@/components/pages/LawyerLeadGenerationPage'));
const DoctorLeadGenerationPage = React.lazy(() => import('@/components/pages/DoctorLeadGenerationPage'));
const RealEstateLeadGenerationPage = React.lazy(() => import('@/components/pages/RealEstateLeadGenerationPage'));
const EducationLeadGenerationPage = React.lazy(() => import('@/components/pages/EducationLeadGenerationPage'));
const RestaurantHotelLeadGenerationPage = React.lazy(() => import('@/components/pages/RestaurantHotelLeadGenerationPage'));

// Loading fallback component
function PageLoader() {
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense>,
      },
      {
        path: "about",
        element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense>,
      },
      {
        path: "services",
        element: <Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>,
      },
      {
        path: "tools",
        element: <Suspense fallback={<PageLoader />}><ToolsPage /></Suspense>,
      },
      {
        path: "tools/seo-keyword-research",
        element: <Suspense fallback={<PageLoader />}><SEOKeywordResearchPage /></Suspense>,
      },
      {
        path: "tools/email-subject-tester",
        element: <Suspense fallback={<PageLoader />}><EmailSubjectTesterPage /></Suspense>,
      },
      {
        path: "tools/ppc-ad-generator",
        element: <Suspense fallback={<PageLoader />}><PPCAdGeneratorPage /></Suspense>,
      },
      {
        path: "tools/keyword-grouping",
        element: <Suspense fallback={<PageLoader />}><KeywordGroupingPage /></Suspense>,
      },
      {
        path: "tools/keyword-match-types",
        element: <Suspense fallback={<PageLoader />}><KeywordMatchTypesPage /></Suspense>,
      },
      {
        path: "tools/meta-title-description-generator",
        element: <Suspense fallback={<PageLoader />}><MetaTitleDescriptionGeneratorPage /></Suspense>,
      },
      {
        path: "tools/serp-snippet-preview",
        element: <Suspense fallback={<PageLoader />}><SERPSnippetPreviewPage /></Suspense>,
      },
      {
        path: "tools/backlink-checker",
        element: <Suspense fallback={<PageLoader />}><BacklinkCheckerPage /></Suspense>,
      },
      {
        path: "tools/utm-link-builder",
        element: <Suspense fallback={<PageLoader />}><UTMLinkBuilderPage /></Suspense>,
      },
      {
        path: "tools/website-speed-test",
        element: <Suspense fallback={<PageLoader />}><WebsiteSpeedTestPage /></Suspense>,
      },
      {
        path: "tools/social-media-post-generator",
        element: <Suspense fallback={<PageLoader />}><SocialMediaPostGeneratorPage /></Suspense>,
      },
      {
        path: "tools/ai-humanizer",
        element: <Suspense fallback={<PageLoader />}><AIHumanizerPage /></Suspense>,
      },
      {
        path: "tools/open-graph-tag-generator",
        element: <Suspense fallback={<PageLoader />}><OpenGraphTagGeneratorPage /></Suspense>,
      },
      {
        path: "tools/favicon-generator",
        element: <Suspense fallback={<PageLoader />}><FaviconGeneratorPage /></Suspense>,
      },
      {
        path: "tools/xml-sitemap-generator",
        element: <Suspense fallback={<PageLoader />}><XMLSitemapGeneratorPage /></Suspense>,
      },
      {
        path: "tools/robots-txt-generator",
        element: <Suspense fallback={<PageLoader />}><RobotsTxtGeneratorPage /></Suspense>,
      },
      {
        path: "tools/hashtag-generator",
        element: <Suspense fallback={<PageLoader />}><HashtagGeneratorPage /></Suspense>,
      },
      {
        path: "tools/content-readability-checker",
        element: <Suspense fallback={<PageLoader />}><ContentReadabilityCheckerPage /></Suspense>,
      },
      {
        path: "tools/google-ads-headline-generator",
        element: <Suspense fallback={<PageLoader />}><GoogleAdsHeadlineGeneratorPage /></Suspense>,
      },
      {
        path: "tools/blog-topic-generator",
        element: <Suspense fallback={<PageLoader />}><BlogTopicGeneratorPage /></Suspense>,
      },
      {
        path: "tools/image-alt-text-generator",
        element: <Suspense fallback={<PageLoader />}><ImageAltTextGeneratorPage /></Suspense>,
      },
      {
        path: "services/seo",
        element: <Suspense fallback={<PageLoader />}><SEOPage /></Suspense>,
      },
      {
        path: "services/social-media",
        element: <Suspense fallback={<PageLoader />}><SocialMediaPage /></Suspense>,
      },
      {
        path: "services/paid-ads",
        element: <Suspense fallback={<PageLoader />}><PaidAdsPage /></Suspense>,
      },
      {
        path: "services/web-development",
        element: <Suspense fallback={<PageLoader />}><WebDevelopmentPage /></Suspense>,
      },
      {
        path: "services/influencer-marketing",
        element: <Suspense fallback={<PageLoader />}><InfluencerMarketingPage /></Suspense>,
      },
      {
        path: "services/content-marketing",
        element: <Suspense fallback={<PageLoader />}><ContentMarketingPage /></Suspense>,
      },
      {
        path: "services/data-analytics",
        element: <Suspense fallback={<PageLoader />}><DataAnalyticsPage /></Suspense>,
      },
      {
        path: "services/conversion-optimization",
        element: <Suspense fallback={<PageLoader />}><ConversionOptimizationPage /></Suspense>,
      },
      {
        path: "services/email-marketing",
        element: <Suspense fallback={<PageLoader />}><EmailMarketingPage /></Suspense>,
      },
      {
        path: "services/youtube-growth",
        element: <Suspense fallback={<PageLoader />}><YouTubeGrowthPage /></Suspense>,
      },
      {
        path: "services/digital-audit",
        element: <Suspense fallback={<PageLoader />}><DigitalAuditPage /></Suspense>,
      },
      {
        path: "services/digital-training",
        element: <Suspense fallback={<PageLoader />}><DigitalTrainingPage /></Suspense>,
      },
      {
        path: "services/look-a-like-solutions",
        element: <Suspense fallback={<PageLoader />}><LookALikeSolutionsPage /></Suspense>,
      },
      {
        path: "case-studies",
        element: <Suspense fallback={<PageLoader />}><CaseStudiesPage /></Suspense>,
      },
      {
        path: "case-studies/:id",
        element: <Suspense fallback={<PageLoader />}><CaseStudyDetailPage /></Suspense>,
      },
      {
        path: "blog",
        element: <Suspense fallback={<PageLoader />}><BlogPage /></Suspense>,
      },
      {
        path: "blog/:slug",
        element: <Suspense fallback={<PageLoader />}><BlogPostPage /></Suspense>,
      },
      {
        path: "contact",
        element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense>,
      },
      {
        path: "search",
        element: <Suspense fallback={<PageLoader />}><SearchResultsPage /></Suspense>,
      },
      {
        path: "privacy",
        element: <Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense>,
      },
      {
        path: "terms",
        element: <Suspense fallback={<PageLoader />}><TermsOfServicePage /></Suspense>,
      },
      {
        path: "sitemap.xml",
        element: <Suspense fallback={<PageLoader />}><SitemapPage /></Suspense>,
      },
      {
        path: "sitemap",
        element: <Suspense fallback={<PageLoader />}><SitemapHtmlPage /></Suspense>,
      },
      {
        path: "admin/blog-slug-fix",
        element: <Suspense fallback={<PageLoader />}><BlogSlugFixPage /></Suspense>,
      },
      {
        path: "admin/blog-data-protection",
        element: <Suspense fallback={<PageLoader />}><BlogDataProtectionPage /></Suspense>,
      },
      {
        path: "admin/blog-data-recovery",
        element: <Suspense fallback={<PageLoader />}><BlogDataRecoveryPage /></Suspense>,
      },
      {
        path: "admin/specific-blog-recovery",
        element: <Suspense fallback={<PageLoader />}><SpecificBlogRecoveryPage /></Suspense>,
      },
      {
        path: "admin/blog-analysis",
        element: <Suspense fallback={<PageLoader />}><BlogAnalysisPage /></Suspense>,
      },
      {
        path: "admin/sitemap",
        element: <Suspense fallback={<PageLoader />}><SitemapAdminPage /></Suspense>,
      },
      {
        path: "admin/search-analytics",
        element: <Suspense fallback={<PageLoader />}><SearchAnalyticsPage /></Suspense>,
      },
      {
        path: "admin/search-analytics-diagnostics",
        element: <Suspense fallback={<PageLoader />}><SearchAnalyticsDiagnosticsPage /></Suspense>,
      },
      {
        path: "google-ads-training",
        element: <Suspense fallback={<PageLoader />}><GoogleAdsTrainingPage /></Suspense>,
      },
      {
        path: "thank-you",
        element: <Suspense fallback={<PageLoader />}><ThankYouPage /></Suspense>,
      },
      {
        path: "seo-lead-generation",
        element: <Suspense fallback={<PageLoader />}><SEOLeadGenerationPage /></Suspense>,
      },
      {
        path: "lawyer-lead-generation",
        element: <Suspense fallback={<PageLoader />}><LawyerLeadGenerationPage /></Suspense>,
      },
      {
        path: "doctor-lead-generation",
        element: <Suspense fallback={<PageLoader />}><DoctorLeadGenerationPage /></Suspense>,
      },
      {
        path: "real-estate-lead-generation",
        element: <Suspense fallback={<PageLoader />}><RealEstateLeadGenerationPage /></Suspense>,
      },
      {
        path: "education-lead-generation",
        element: <Suspense fallback={<PageLoader />}><EducationLeadGenerationPage /></Suspense>,
      },
      {
        path: "restaurant-hotel-lead-generation",
        element: <Suspense fallback={<PageLoader />}><RestaurantHotelLeadGenerationPage /></Suspense>,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
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
