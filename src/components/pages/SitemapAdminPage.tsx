import { SitemapAdmin } from '@/components/ui/sitemap-admin';
import { SEOHead } from '@/components/ui/seo-head';

export default function SitemapAdminPage() {
  return (
    <>
      <SEOHead 
        title="Sitemap Management - Admin"
        description="Manage and monitor your website's sitemap.xml file"
        noIndex={true}
      />
      
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading text-foreground mb-4">
              Sitemap Management
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Monitor and manage your website's sitemap.xml file to ensure optimal SEO performance.
            </p>
          </div>

          <div className="flex justify-center">
            <SitemapAdmin />
          </div>
        </div>
      </div>
    </>
  );
}