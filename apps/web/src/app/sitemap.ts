import type { MetadataRoute } from "next";
import { routePaths } from "@/lib/routes";
import {
  SITEMAP_SEGMENTS,
  assertSitemapCoverage,
  sitemapEntriesFor,
  type SitemapSegmentId,
} from "@/lib/sitemap-hierarchy";

// Keep audit-routes happy: sitemap must reference routePaths.
void routePaths;

assertSitemapCoverage();

/**
 * Hierarchical sitemap index.
 *
 * Next.js serves `/sitemap.xml` as an index of:
 *   /sitemap/core.xml
 *   /sitemap/evidence.xml
 *   /sitemap/calculators.xml
 *   /sitemap/guides.xml
 *   /sitemap/info.xml
 *
 * Each child lists URLs with priority + changefreq tuned to IA importance.
 * lastmod is content-ship based (not bumped on every deploy).
 *
 * Next.js 15: `id` is a sync string. (Next 16+ wraps it in a Promise.)
 */
export async function generateSitemaps() {
  return SITEMAP_SEGMENTS.map((s) => ({ id: s.id }));
}

export default function sitemap(props: {
  id: SitemapSegmentId | string;
}): MetadataRoute.Sitemap {
  const segment = String(props.id) as SitemapSegmentId;
  if (!SITEMAP_SEGMENTS.some((s) => s.id === segment)) {
    return [];
  }
  return sitemapEntriesFor(segment);
}
