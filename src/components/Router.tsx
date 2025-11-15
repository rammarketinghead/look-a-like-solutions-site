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
import SitemapPage from '@/components/pages/SitemapPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/components/pages/TermsOfServicePage';
import CaseStudyDetailPage from '@/components/pages/CaseStudyDetailPage';
import BlogSlugFixPage from '@/components/pages/BlogSlugFixPage';
import BlogDataProtectionPage from '@/components/pages/BlogDataProtectionPage';
import BlogDataRecoveryPage from '@/components/pages/BlogDataRecoveryPage';
import SpecificBlogRecoveryPage from '@/components/pages/SpecificBlogRecoveryPage';
import BlogAnalysisPage from '@/components/pages/BlogAnalysisPage';

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
