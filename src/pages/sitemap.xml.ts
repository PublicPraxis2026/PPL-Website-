import { getCollection } from 'astro:content';

export const prerender = true;

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET() {
  const site = import.meta.env.SITE;
  const pages = await getCollection('pages');
  const paths = ['/', ...pages.map((page) => `/${page.id}/`)];
  const urls = site
    ? paths.map((path) => `  <url><loc>${escapeXml(new URL(path, site).toString())}</loc></url>`).join('\n')
    : '';
  const notice = site ? '' : '\n  <!-- Set SITE_URL to the public origin before production deployment. -->';

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${notice}${urls ? `\n${urls}\n` : '\n'}</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
