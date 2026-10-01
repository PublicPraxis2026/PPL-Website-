export const prerender = true;

export function GET() {
  const site = import.meta.env.SITE;
  const sitemap = site ? `\nSitemap: ${new URL('/sitemap.xml', site).toString()}` : '';

  return new Response(`User-agent: *\nAllow: /${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
