import type { APIRoute } from 'astro';

const getRobotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', 'https://www.example.com').href}
`;

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
