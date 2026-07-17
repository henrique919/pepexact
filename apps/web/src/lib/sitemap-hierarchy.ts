import type { MetadataRoute } from "next";
import { allRoutes, type RouteEntry, type RouteKind } from "./routes";
import { siteUrl } from "./site";
import { peptideProfiles } from "./peptides";

/**
 * Hierarchical sitemap segments. `/sitemap.xml` becomes an index that points
 * at `/sitemap/{id}.xml` when generateSitemaps is used (Next.js App Router).
 *
 * Order and priority mirror IA: money pages first, evidence next, then
 * compound calculators, guides, and supporting info.
 */
export type SitemapSegmentId =
  | "core"
  | "evidence"
  | "calculators"
  | "guides"
  | "info";

export const SITEMAP_SEGMENTS: {
  id: SitemapSegmentId;
  label: string;
}[] = [
  { id: "core", label: "Home, hub and converters" },
  { id: "evidence", label: "Peptide evidence guides" },
  { id: "calculators", label: "Compound calculators" },
  { id: "guides", label: "Measurement and regulatory guides" },
  { id: "info", label: "About, policy and legal" },
];

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface KindMeta {
  segment: SitemapSegmentId;
  priority: number;
  changeFrequency: Freq;
  /** Default lastmod when no page-specific override exists. */
  lastModified: string;
}

/**
 * Content ship dates (ISO). Bump only when that segment’s indexable copy
 * meaningfully changes — never `new Date()` on every deploy.
 */
const SHIP = {
  postLaunch: "2026-07-17T18:00:00.000Z",
  seoSprint: "2026-07-17T14:00:00.000Z",
  evidence: "2026-07-17T12:00:00.000Z",
  brandAndCompounds: "2026-07-17T10:00:00.000Z",
  guidesBaseline: "2026-07-10T12:00:00.000Z",
} as const;

const KIND_META: Record<RouteKind, KindMeta> = {
  home: {
    segment: "core",
    priority: 1.0,
    changeFrequency: "weekly",
    lastModified: SHIP.postLaunch,
  },
  hub: {
    segment: "core",
    priority: 0.95,
    changeFrequency: "weekly",
    lastModified: SHIP.seoSprint,
  },
  converter: {
    segment: "core",
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: SHIP.seoSprint,
  },
  peptide: {
    segment: "evidence",
    priority: 0.92,
    changeFrequency: "weekly",
    lastModified: SHIP.evidence,
  },
  compound: {
    segment: "calculators",
    priority: 0.75,
    changeFrequency: "monthly",
    lastModified: SHIP.brandAndCompounds,
  },
  guide: {
    segment: "guides",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: SHIP.guidesBaseline,
  },
  regulatory: {
    segment: "guides",
    priority: 0.65,
    changeFrequency: "monthly",
    lastModified: SHIP.guidesBaseline,
  },
  info: {
    segment: "info",
    priority: 0.45,
    changeFrequency: "yearly",
    lastModified: SHIP.guidesBaseline,
  },
};

/** Featured compound calculators get a slight priority boost. */
const FEATURED_COMPOUND_PATHS = new Set([
  "/calculator/bpc-157",
  "/calculator/retatrutide",
]);

/** Page-specific lastmod / priority overrides. */
const PATH_OVERRIDES: Partial<
  Record<
    string,
    Partial<{
      priority: number;
      changeFrequency: Freq;
      lastModified: string;
    }>
  >
> = {
  "/": { priority: 1.0, lastModified: SHIP.postLaunch, changeFrequency: "weekly" },
  "/peptide-calculator": {
    priority: 0.95,
    lastModified: SHIP.seoSprint,
    changeFrequency: "weekly",
  },
  "/reconstitution-calculator": {
    priority: 0.9,
    lastModified: SHIP.seoSprint,
    changeFrequency: "monthly",
  },
  "/mg-to-mcg-converter": {
    priority: 0.85,
    lastModified: SHIP.seoSprint,
  },
  "/syringe-units-calculator": {
    priority: 0.85,
    lastModified: SHIP.seoSprint,
  },
  "/peptides": {
    priority: 0.93,
    lastModified: SHIP.evidence,
    changeFrequency: "weekly",
  },
  "/peptides/bpc-157": {
    priority: 0.94,
    lastModified: SHIP.postLaunch,
    changeFrequency: "weekly",
  },
  "/peptides/retatrutide": {
    priority: 0.94,
    lastModified: SHIP.postLaunch,
    changeFrequency: "weekly",
  },
  "/calculator/bpc-157": {
    priority: 0.88,
    lastModified: SHIP.seoSprint,
  },
  "/calculator/retatrutide": {
    priority: 0.88,
    lastModified: SHIP.seoSprint,
  },
  "/methodology": {
    priority: 0.6,
    lastModified: SHIP.seoSprint,
    changeFrequency: "monthly",
  },
  "/editorial-policy": {
    priority: 0.55,
    lastModified: SHIP.guidesBaseline,
    changeFrequency: "yearly",
  },
  "/contact": {
    priority: 0.5,
    lastModified: SHIP.postLaunch,
    changeFrequency: "yearly",
  },
  "/about": {
    priority: 0.5,
    lastModified: SHIP.guidesBaseline,
  },
  "/privacy": {
    priority: 0.3,
    lastModified: SHIP.seoSprint,
    changeFrequency: "yearly",
  },
  "/terms": {
    priority: 0.3,
    lastModified: SHIP.guidesBaseline,
    changeFrequency: "yearly",
  },
};

function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

function entryFor(route: RouteEntry): MetadataRoute.Sitemap[number] {
  const base = KIND_META[route.kind];
  const override = PATH_OVERRIDES[route.path] ?? {};

  let priority = override.priority ?? base.priority;
  if (route.kind === "compound" && FEATURED_COMPOUND_PATHS.has(route.path)) {
    priority = override.priority ?? 0.88;
  }

  // Prefer evidence profile dateModified when present.
  let lastModified = override.lastModified ?? base.lastModified;
  if (route.kind === "peptide" && route.path !== "/peptides") {
    const profile = peptideProfiles.find((p) => p.path === route.path);
    if (profile?.dateModified) {
      lastModified = `${profile.dateModified}T12:00:00.000Z`;
    }
  }

  return {
    url: absoluteUrl(route.path),
    lastModified: new Date(lastModified),
    changeFrequency: override.changeFrequency ?? base.changeFrequency,
    priority,
  };
}

function segmentFor(route: RouteEntry): SitemapSegmentId {
  return KIND_META[route.kind].segment;
}

/** All sitemap entries, sorted by segment order then priority (desc). */
export function allSitemapEntries(): MetadataRoute.Sitemap {
  const segmentOrder = new Map(
    SITEMAP_SEGMENTS.map((s, i) => [s.id, i] as const),
  );

  return [...allRoutes]
    .map((route) => ({ route, entry: entryFor(route) }))
    .sort((a, b) => {
      const sa = segmentOrder.get(segmentFor(a.route)) ?? 99;
      const sb = segmentOrder.get(segmentFor(b.route)) ?? 99;
      if (sa !== sb) return sa - sb;
      return (b.entry.priority ?? 0) - (a.entry.priority ?? 0);
    })
    .map(({ entry }) => entry);
}

export function sitemapEntriesFor(
  segmentId: SitemapSegmentId,
): MetadataRoute.Sitemap {
  return allRoutes
    .filter((r) => segmentFor(r) === segmentId)
    .map((r) => entryFor(r))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

/** Ensure every registered route appears in exactly one segment. */
export function assertSitemapCoverage(): void {
  const covered = new Set(
    SITEMAP_SEGMENTS.flatMap((s) =>
      sitemapEntriesFor(s.id).map((e) => e.url),
    ),
  );
  for (const route of allRoutes) {
    const url = absoluteUrl(route.path);
    if (!covered.has(url)) {
      throw new Error(`sitemap hierarchy missing route: ${route.path}`);
    }
  }
}
