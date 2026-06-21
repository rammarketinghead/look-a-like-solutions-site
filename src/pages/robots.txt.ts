import type { APIRoute } from 'astro';

const getRobotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', 'https://www.lookalikesolutions.com').href}

# Allow AI crawlers to access llms.txt
User-agent: GPTBot
Allow: /llms.txt

User-agent: CCBot
Allow: /llms.txt

User-agent: anthropic-ai
Allow: /llms.txt

User-agent: Claude-Web
Allow: /llms.txt

User-agent: Perplexity
Allow: /llms.txt
`;

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
