import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { routePaths } from "@/lib/routes";

/**
 * Stable lastmod for the whole sitemap. Update this ISO date only when
 * indexable content meaningfully ships — never `new Date()` on every deploy
 * (Google treats constantly-bumped lastmod as noise).
 */
const SITEMAP_LASTMOD = new Date("2026-07-17T14:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return routePaths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: SITEMAP_LASTMOD,
  }));
}
