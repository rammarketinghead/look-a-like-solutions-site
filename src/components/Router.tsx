import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ServicesPage from '@/components/pages/ServicesPage';
import CaseStudiesPage from '@/components/pages/CaseStudiesPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogPostPage from '@/components/pages/BlogPostPage';
import ContactPage from '@/components/pages/ContactPage';
import ToolsPage from '@/components/pages/ToolsPage';
import SEOPage from '@/components/pages/services/SEOPage';
import SocialMediaPage from '@/components/pages/services/SocialMediaPage';
import PaidAdsPage from '@/components/pages/services/PaidAdsPage';
import WebDevelopmentPage from '@/components/pages/services/WebDevelopmentPage';
import InfluencerMarketingPage from '@/components/pages/services/InfluencerMarketingPage';
import ContentMarketingPage from '@/components/pages/services/ContentMarketingPage';
import DataAnalyticsPage from '@/components/pages/services/DataAnalyticsPage';
import ConversionOptimizationPage from '@/components/pages/services/ConversionOptimizationPage';
import EmailMarketingPage from '@/components/pages/services/EmailMarketingPage';
import YouTubeGrowthPage from '@/components/pages/services/YouTubeGrowthPage';
import DigitalAuditPage from '@/components/pages/services/DigitalAuditPage';
import DigitalTrainingPage from '@/components/pages/services/DigitalTrainingPage';
import SEOKeywordResearchPage from '@/components/pages/tools/SEOKeywordResearchPage';
import EmailSubjectTesterPage from '@/components/pages/tools/EmailSubjectTesterPage';
import PPCAdGeneratorPage from '@/components/pages/tools/PPCAdGeneratorPage';
import KeywordGroupingPage from '@/components/pages/tools/KeywordGroupingPage';
import KeywordMatchTypesPage from '@/components/pages/tools/KeywordMatchTypesPage';
import MetaTitleDescriptionGeneratorPage from '@/components/pages/tools/MetaTitleDescriptionGeneratorPage';
import SERPSnippetPreviewPage from '@/components/pages/tools/SERPSnippetPreviewPage';
import BacklinkCheckerPage from '@/components/pages/tools/BacklinkCheckerPage';
import UTMLinkBuilderPage from '@/components/pages/tools/UTMLinkBuilderPage';
import WebsiteSpeedTestPage from '@/components/pages/tools/WebsiteSpeedTestPage';
import SocialMediaPostGeneratorPage from '@/components/pages/tools/SocialMediaPostGeneratorPage';
import AIHumanizerPage from '@/components/pages/tools/AIHumanizerPage';
import OpenGraphTagGeneratorPage from '@/components/pages/tools/OpenGraphTagGeneratorPage';
import FaviconGeneratorPage from '@/components/pages/tools/FaviconGeneratorPage';
import XMLSitemapGeneratorPage from '@/components/pages/tools/XMLSitemapGeneratorPage';
import RobotsTxtGeneratorPage from '@/components/pages/tools/RobotsTxtGeneratorPage';
import HashtagGeneratorPage from '@/components/pages/tools/HashtagGeneratorPage';
import ContentReadabilityCheckerPage from '@/components/pages/tools/ContentReadabilityCheckerPage';
import GoogleAdsHeadlineGeneratorPage from '@/components/pages/tools/GoogleAdsHeadlineGeneratorPage';
import BlogTopicGeneratorPage from '@/components/pages/tools/BlogTopicGeneratorPage';
import ImageAltTextGeneratorPage from '@/components/pages/tools/ImageAltTextGeneratorPage';
import SitemapPage from '@/components/pages/SitemapPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/components/pages/TermsOfServicePage';
import CaseStudyDetailPage from '@/components/pages/CaseStudyDetailPage';
import BlogSlugFixPage from '@/components/pages/BlogSlugFixPage';
import BlogDataProtectionPage from '@/components/pages/BlogDataProtectionPage';
import BlogDataRecoveryPage from '@/components/pages/BlogDataRecoveryPage';
import SpecificBlogRecoveryPage from '@/components/pages/SpecificBlogRecoveryPage';
import BlogAnalysisPage from '@/components/pages/BlogAnalysisPage';
import SitemapAdminPage from '@/components/pages/SitemapAdminPage';
import SitemapHtmlPage from '@/components/pages/SitemapHtmlPage';
import SearchAnalyticsPage from '@/components/pages/SearchAnalyticsPage';
import SearchAnalyticsDiagnosticsPage from '@/components/pages/SearchAnalyticsDiagnosticsPage';
import SearchResultsPage from '@/components/pages/SearchResultsPage';
import GoogleAdsTrainingPage from '@/components/pages/GoogleAdsTrainingPage';
import ThankYouPage from '@/components/pages/ThankYouPage';
import SEOLeadGenerationPage from '@/components/pages/SEOLeadGenerationPage';
import LawyerLeadGenerationPage from '@/components/pages/LawyerLeadGenerationPage';
import DoctorLeadGenerationPage from '@/components/pages/DoctorLeadGenerationPage';
import RealEstateLeadGenerationPage from '@/components/pages/RealEstateLeadGenerationPage';
import EducationLeadGenerationPage from '@/components/pages/EducationLeadGenerationPage';
import RestaurantHotelLeadGenerationPage from '@/components/pages/RestaurantHotelLeadGenerationPage';

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
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "tools",
        element: <ToolsPage />,
      },
      {
        path: "tools/seo-keyword-research",
        element: <SEOKeywordResearchPage />,
      },
      {
        path: "tools/email-subject-tester",
        element: <EmailSubjectTesterPage />,
      },
      {
        path: "tools/ppc-ad-generator",
        element: <PPCAdGeneratorPage />,
      },
      {
        path: "tools/keyword-grouping",
        element: <KeywordGroupingPage />,
      },
      {
        path: "tools/keyword-match-types",
        element: <KeywordMatchTypesPage />,
      },
      {
        path: "tools/meta-title-description-generator",
        element: <MetaTitleDescriptionGeneratorPage />,
      },
      {
        path: "tools/serp-snippet-preview",
        element: <SERPSnippetPreviewPage />,
      },
      {
        path: "tools/backlink-checker",
        element: <BacklinkCheckerPage />,
      },
      {
        path: "tools/utm-link-builder",
        element: <UTMLinkBuilderPage />,
      },
      {
        path: "tools/website-speed-test",
        element: <WebsiteSpeedTestPage />,
      },
      {
        path: "tools/social-media-post-generator",
        element: <SocialMediaPostGeneratorPage />,
      },
      {
        path: "tools/ai-humanizer",
        element: <AIHumanizerPage />,
      },
      {
        path: "tools/open-graph-tag-generator",
        element: <OpenGraphTagGeneratorPage />,
      },
      {
        path: "tools/favicon-generator",
        element: <FaviconGeneratorPage />,
      },
      {
        path: "tools/xml-sitemap-generator",
        element: <XMLSitemapGeneratorPage />,
      },
      {
        path: "tools/robots-txt-generator",
        element: <RobotsTxtGeneratorPage />,
      },
      {
        path: "tools/hashtag-generator",
        element: <HashtagGeneratorPage />,
      },
      {
        path: "tools/content-readability-checker",
        element: <ContentReadabilityCheckerPage />,
      },
      {
        path: "tools/google-ads-headline-generator",
        element: <GoogleAdsHeadlineGeneratorPage />,
      },
      {
        path: "tools/blog-topic-generator",
        element: <BlogTopicGeneratorPage />,
      },
      {
        path: "tools/image-alt-text-generator",
        element: <ImageAltTextGeneratorPage />,
      },
      {
        path: "services/seo",
        element: <SEOPage />,
      },
      {
        path: "services/social-media",
        element: <SocialMediaPage />,
      },
      {
        path: "services/paid-ads",
        element: <PaidAdsPage />,
      },
      {
        path: "services/web-development",
        element: <WebDevelopmentPage />,
      },
      {
        path: "services/influencer-marketing",
        element: <InfluencerMarketingPage />,
      },
      {
        path: "services/content-marketing",
        element: <ContentMarketingPage />,
      },
      {
        path: "services/data-analytics",
        element: <DataAnalyticsPage />,
      },
      {
        path: "services/conversion-optimization",
        element: <ConversionOptimizationPage />,
      },
      {
        path: "services/email-marketing",
        element: <EmailMarketingPage />,
      },
      {
        path: "services/youtube-growth",
        element: <YouTubeGrowthPage />,
      },
      {
        path: "services/digital-audit",
        element: <DigitalAuditPage />,
      },
      {
        path: "services/digital-training",
        element: <DigitalTrainingPage />,
      },
      {
        path: "case-studies",
        element: <CaseStudiesPage />,
      },
      {
        path: "case-studies/:id",
        element: <CaseStudyDetailPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogPostPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "search",
        element: <SearchResultsPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms",
        element: <TermsOfServicePage />,
      },
      {
        path: "sitemap.xml",
        element: <SitemapPage />,
      },
      {
        path: "sitemap",
        element: <SitemapHtmlPage />,
      },
      {
        path: "admin/blog-slug-fix",
        element: <BlogSlugFixPage />,
      },
      {
        path: "admin/blog-data-protection",
        element: <BlogDataProtectionPage />,
      },
      {
        path: "admin/blog-data-recovery",
        element: <BlogDataRecoveryPage />,
      },
      {
        path: "admin/specific-blog-recovery",
        element: <SpecificBlogRecoveryPage />,
      },
      {
        path: "admin/blog-analysis",
        element: <BlogAnalysisPage />,
      },
      {
        path: "admin/sitemap",
        element: <SitemapAdminPage />,
      },
      {
        path: "admin/search-analytics",
        element: <SearchAnalyticsPage />,
      },
      {
        path: "admin/search-analytics-diagnostics",
        element: <SearchAnalyticsDiagnosticsPage />,
      },
      {
        path: "google-ads-training",
        element: <GoogleAdsTrainingPage />,
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
      },
      {
        path: "seo-lead-generation",
        element: <SEOLeadGenerationPage />,
      },
      {
        path: "lawyer-lead-generation",
        element: <LawyerLeadGenerationPage />,
      },
      {
        path: "doctor-lead-generation",
        element: <DoctorLeadGenerationPage />,
      },
      {
        path: "real-estate-lead-generation",
        element: <RealEstateLeadGenerationPage />,
      },
      {
        path: "education-lead-generation",
        element: <EducationLeadGenerationPage />,
      },
      {
        path: "restaurant-hotel-lead-generation",
        element: <RestaurantHotelLeadGenerationPage />,
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
