import { SITEMAP_SEGMENTS } from "@/lib/sitemap-hierarchy";
import { siteUrl } from "@/lib/site";

/**
 * Explicit sitemap index at /sitemap.xml.
 *
 * Next.js `generateSitemaps` only emits child files under /sitemap/{id}.xml —
 * it does not serve an index at /sitemap.xml (404). robots.txt and GSC expect
 * the conventional /sitemap.xml entry point.
 */
export function GET() {
  const lastmod = "2026-07-17T18:00:00.000Z";
  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...SITEMAP_SEGMENTS.map(
      (s) => `  <sitemap>
    <loc>${siteUrl}/sitemap/${s.id}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
    ),
    `</sitemapindex>`,
    ``,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate",
    },
  });
}
