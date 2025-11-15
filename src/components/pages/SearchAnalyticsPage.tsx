import { SearchAnalyticsDashboard } from '@/components/ui/search-analytics-dashboard';
import { SEOHead } from '@/components/ui/seo-head';

export default function SearchAnalyticsPage() {
  return (
    <div className="min-h-screen bg-light-gray">
      <SEOHead 
        title="Search Analytics - Lookalike Solutions"
        description="Analyze user search behavior and trends on the website"
        noIndex={true}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-[100rem]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-dark-gray mb-4">
            Search Analytics
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            Understand what your users are searching for and optimize your content strategy based on real search data.
          </p>
        </div>

        {/* Dashboard */}
        <SearchAnalyticsDashboard />
      </div>
    </div>
  );
}