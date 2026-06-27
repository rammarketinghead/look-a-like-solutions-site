import type { APIRoute } from 'astro';
import { SitemapService } from '@/services/sitemapService';

export const GET: APIRoute = async () => {
  try {
    // Generate the sitemap XML
    const xml = await SitemapService.generateSitemapXML();

    // Return raw XML with proper Content-Type header
    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return error XML
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new Response(errorXml, {
      status: 500,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
      },
    });
  }
};
