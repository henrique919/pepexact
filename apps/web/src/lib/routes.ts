import { compounds } from "./compounds";
import { peptideProfiles } from "./peptides";

/**
 * Single source of truth for every route: nav, footer, breadcrumbs,
 * related-tools, and the sitemap all read from this file. Add a page here
 * once and it is discoverable everywhere — no hand-maintained link lists
 * to drift out of sync (TASK-V2-009, docs/EXECUTION-PLAN.md §11).
 */
export type RouteKind =
  | "home"
  | "hub"
  | "converter"
  | "compound"
  | "guide"
  | "peptide"
  | "regulatory"
  | "info";

export interface RouteEntry {
  path: string;
  label: string;
  kind: RouteKind;
}

const HOME: RouteEntry = { path: "/", label: "Home", kind: "home" };
const HUB: RouteEntry = {
  path: "/peptide-calculator",
  label: "Peptide calculator",
  kind: "hub",
};

const CONVERTERS: RouteEntry[] = [
  {
    path: "/reconstitution-calculator",
    label: "Reconstitution calculator",
    kind: "converter",
  },
  {
    path: "/mg-to-mcg-converter",
    label: "mg to mcg converter",
    kind: "converter",
  },
  {
    path: "/syringe-units-calculator",
    label: "Syringe units calculator",
    kind: "converter",
  },
];

const GUIDES: RouteEntry[] = [
  { path: "/guides/mg-vs-mcg", label: "mg vs mcg, explained", kind: "guide" },
  {
    path: "/guides/how-to-read-an-insulin-syringe",
    label: "How to read an insulin syringe",
    kind: "guide",
  },
  {
    path: "/guides/why-calculators-disagree",
    label: "Why calculators disagree",
    kind: "guide",
  },
  {
    path: "/guides/syringe-units-chart",
    label: "Printable U-100 syringe units chart",
    kind: "guide",
  },
  {
    path: "/guides/peptide-regulators",
    label: "Peptide regulators (FDA, MHRA, TGA)",
    kind: "guide",
  },
];

const PEPTIDES_HUB: RouteEntry = {
  path: "/peptides",
  label: "Peptide evidence",
  kind: "peptide",
};

// Paths must be string literals so scripts/audit-routes.mjs can discover them.
const PEPTIDE_PROFILES: RouteEntry[] = [
  { path: "/peptides/bpc-157", label: "BPC-157 evidence", kind: "peptide" },
  {
    path: "/peptides/retatrutide",
    label: "Retatrutide evidence",
    kind: "peptide",
  },
];

// Keep content registry in lockstep with the static routes above.
if (
  peptideProfiles.length !== PEPTIDE_PROFILES.length ||
  peptideProfiles.some(
    (p, i) => p.path !== PEPTIDE_PROFILES[i]?.path,
  )
) {
  throw new Error(
    "routes.ts: peptideProfiles paths must match PEPTIDE_PROFILES literals",
  );
}

const REGULATORY: RouteEntry[] = [
  {
    path: "/au/are-peptides-legal",
    label: "Are peptides legal? (AU)",
    kind: "regulatory",
  },
];

const INFO: RouteEntry[] = [
  { path: "/about", label: "About PepExact", kind: "info" },
  { path: "/methodology", label: "Methodology", kind: "info" },
  { path: "/editorial-policy", label: "Editorial policy", kind: "info" },
  { path: "/contact", label: "Contact", kind: "info" },
  { path: "/privacy", label: "Privacy", kind: "info" },
  { path: "/terms", label: "Terms", kind: "info" },
];

const COMPOUND_ROUTES: RouteEntry[] = compounds.map((c) => ({
  path: `/calculator/${c.slug}`,
  label: `${c.name} calculator`,
  kind: "compound" as const,
}));

export const allRoutes: RouteEntry[] = [
  HOME,
  HUB,
  ...CONVERTERS,
  ...COMPOUND_ROUTES,
  ...GUIDES,
  PEPTIDES_HUB,
  ...PEPTIDE_PROFILES,
  ...REGULATORY,
  ...INFO,
];

/** Flat path list, consumed by the sitemap. */
export const routePaths = allRoutes.map((r) => r.path);

function findRoute(path: string): RouteEntry {
  const r = allRoutes.find((x) => x.path === path);
  if (!r) throw new Error(`routes.ts: unknown route "${path}"`);
  return r;
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Every trail is unique-path (no crumb repeats another crumb's path) so
 * BreadcrumbList JSON-LD never has two items pointing at the same URL.
 */
export function breadcrumbTrail(path: string): BreadcrumbItem[] {
  const entry = findRoute(path);
  if (entry.kind === "home") return [{ name: "Home", path: "/" }];
  if (entry.kind === "compound") {
    return [
      { name: "Home", path: "/" },
      { name: HUB.label, path: HUB.path },
      { name: entry.label, path: entry.path },
    ];
  }
  if (entry.kind === "peptide") {
    if (path === PEPTIDES_HUB.path) {
      return [
        { name: "Home", path: "/" },
        { name: "Peptides", path: PEPTIDES_HUB.path },
      ];
    }
    const profile = peptideProfiles.find((p) => p.path === path);
    return [
      { name: "Home", path: "/" },
      { name: "Peptides", path: PEPTIDES_HUB.path },
      {
        name: profile?.breadcrumbLabel ?? entry.label,
        path: entry.path,
      },
    ];
  }
  return [
    { name: "Home", path: "/" },
    { name: entry.label, path: entry.path },
  ];
}

/* ------------------------------------------------------------------ */
/* Related tools                                                       */
/* ------------------------------------------------------------------ */

export interface RelatedLinks {
  tools: RouteEntry[];
  guides: RouteEntry[];
}

/** Each converter's single most relevant guide. */
const CONVERTER_GUIDE: Record<string, RouteEntry> = {
  "/reconstitution-calculator": GUIDES[2], // why calculators disagree
  "/mg-to-mcg-converter": GUIDES[0], // mg vs mcg
  "/syringe-units-calculator": GUIDES[3], // printable units chart
};

/** Each guide/regulatory/info page links the tools it actually references. */
const REFERENCED_TOOLS: Record<string, RouteEntry[]> = {
  "/guides/mg-vs-mcg": [HUB, CONVERTERS[1]],
  "/guides/how-to-read-an-insulin-syringe": [HUB, CONVERTERS[2]],
  "/guides/why-calculators-disagree": [HUB, CONVERTERS[2]],
  "/guides/syringe-units-chart": [HUB, CONVERTERS[2]],
  "/guides/peptide-regulators": [HUB],
  "/au/are-peptides-legal": [HUB],
  "/about": [HUB],
  "/methodology": [HUB],
  "/editorial-policy": [HUB],
  "/contact": [HUB],
  "/privacy": [HUB],
  "/terms": [HUB],
  "/peptides": [HUB],
  "/peptides/bpc-157": [
    COMPOUND_ROUTES.find((c) => c.path === "/calculator/bpc-157")!,
    HUB,
  ],
  "/peptides/retatrutide": [
    COMPOUND_ROUTES.find((c) => c.path === "/calculator/retatrutide")!,
    HUB,
  ],
};

/**
 * compound → hub + 2 rotating siblings + 1 converter (+ the most measurement
 * -relevant guide); converter → hub + 1 guide; guide/regulatory/info → the
 * tools it references; hub → every converter + every guide.
 */
export function relatedFor(path: string): RelatedLinks {
  const entry = findRoute(path);

  if (entry.kind === "compound") {
    const i = COMPOUND_ROUTES.findIndex((c) => c.path === path);
    const n = COMPOUND_ROUTES.length;
    const sibling1 = COMPOUND_ROUTES[(i + 1) % n];
    const sibling2 = COMPOUND_ROUTES[(i + 2) % n];
    return {
      tools: [HUB, sibling1, sibling2, CONVERTERS[0]],
      guides: [GUIDES[0]],
    };
  }

  if (entry.kind === "converter") {
    return { tools: [HUB], guides: [CONVERTER_GUIDE[path]] };
  }

  if (entry.kind === "peptide") {
    return {
      tools: REFERENCED_TOOLS[path] ?? [HUB],
      guides: [GUIDES[4], PEPTIDES_HUB].filter(
        (g, i, arr) => arr.findIndex((x) => x.path === g.path) === i,
      ),
    };
  }

  if (
    entry.kind === "guide" ||
    entry.kind === "regulatory" ||
    entry.kind === "info"
  ) {
    return { tools: REFERENCED_TOOLS[path] ?? [HUB], guides: [] };
  }

  if (entry.kind === "hub") {
    return {
      tools: [...CONVERTERS],
      guides: [...GUIDES, PEPTIDES_HUB, ...PEPTIDE_PROFILES],
    };
  }

  return { tools: [], guides: [] };
}
