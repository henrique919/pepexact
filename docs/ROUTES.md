# PepExact — Routes

Single source of record for every live route: what it is, and its SEO/schema
state as last audited against production. Created for TASK-V2-001/010 (see
`docs/EXECUTION-PLAN.md` §11). Update this file whenever a route is added,
retired, or its metadata changes — never rename/move a live URL without a
301 redirect.

Route list is generated at build time from `apps/web/src/lib/routes.ts`
(`allRoutes` / `routePaths`, which includes compound paths derived from
`apps/web/src/lib/compounds.ts`) and consumed by `apps/web/src/app/sitemap.ts`,
footer, breadcrumbs, and related-tools (TASK-V2-009). This file documents what
that produces; it is not itself the source of truth for the sitemap.

**Static guard:** `npm run audit:routes` (`scripts/audit-routes.mjs`) asserts
every registry path has an App Router page and a self-canonical, and that every
`page.tsx` is registered (TASK-V2-010).

**Geo positioning:** Core tools are geo-neutral (US / UK / AU). Regulatory
deep-dive for Australia remains at `/au/are-peptides-legal`; global regulator
links live at `/guides/peptide-regulators` (FDA + MHRA + TGA).

| Route | Role | Title | Canonical | Schema types | Notes |
|---|---|---|---|---|---|
| `/` | Home | PepExact — the independent peptide calculator | self | Organization (+logo), WebSite | |
| `/peptide-calculator` | Hub / money page | Peptide Calculator — mg to syringe units, instantly | self | WebApplication, BreadcrumbList, FAQPage | Flagship. Measurement framing in meta. |
| `/reconstitution-calculator` | Converter | Reconstitution Calculator — how much water to add | self | WebApplication, BreadcrumbList | |
| `/mg-to-mcg-converter` | Converter | mg to mcg Converter — milligrams to micrograms | self | WebApplication, BreadcrumbList | |
| `/syringe-units-calculator` | Converter | Syringe Units Calculator — U-100 units to mL | self | WebApplication, BreadcrumbList | |
| `/calculator/retatrutide` | Compound preset | Retatrutide calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Aliases: reta peptide. ClinicalTrials.gov. |
| `/calculator/bpc-157` | Compound preset | BPC-157 calculator — reconstitution & syringe units | self | WebApplication, BreadcrumbList, FAQPage | BPC 157 intent. PubMed. |
| `/calculator/tb-500` | Compound preset | TB-500 calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | PubMed. |
| `/calculator/ghk-cu` | Compound preset | GHK-Cu calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | PubMed. |
| `/calculator/melanotan-2` | Compound preset | Melanotan II calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | PubMed. |
| `/calculator/mots-c` | Compound preset | MOTS-c calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | PubMed. |
| `/calculator/aod-9604` | Compound preset | AOD-9604 calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | PubMed. |
| `/calculator/semaglutide` | Compound preset | Semaglutide calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | HV-1. ClinicalTrials.gov. |
| `/calculator/tirzepatide` | Compound preset | Tirzepatide calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | HV-1. ClinicalTrials.gov. |
| `/guides/mg-vs-mcg` | Guide | mg vs mcg — the 1,000× difference, explained | self | Article, BreadcrumbList | |
| `/guides/how-to-read-an-insulin-syringe` | Guide | How to read an insulin syringe | self | Article, BreadcrumbList | |
| `/guides/why-calculators-disagree` | Guide | Why two peptide calculators give different answers | self | Article, BreadcrumbList, FAQPage | |
| `/guides/syringe-units-chart` | Guide | Printable U-100 syringe units chart | self | Article, BreadcrumbList, FAQPage | |
| `/guides/peptide-regulators` | Guide | Peptide regulators — FDA, MHRA, and TGA | self | Article, BreadcrumbList, FAQPage | Geo-neutral; no substance-specific claims. |
| `/au/are-peptides-legal` | AU facts hub | Are peptides legal in Australia? | self | Article, BreadcrumbList, FAQPage | Cross-links global regulators guide. |
| `/about` | Trust | About PepExact | self | BreadcrumbList | |
| `/methodology` | Trust | Calculation methodology | self | BreadcrumbList | |
| `/editorial-policy` | Trust | Editorial policy | self | BreadcrumbList | Sourcing rules; org-level authorship. |
| `/contact` | Trust | Contact PepExact | self | BreadcrumbList | X + mailto. |
| `/privacy` | Trust | Privacy | self | BreadcrumbList | |
| `/terms` | Trust | Terms of use | self | BreadcrumbList | |

> **Note (SEO sprint):** guide + AU Article JSON-LD now carries
> `datePublished`/`dateModified` mirrored by a visible "Reviewed" dateline
> (`ReviewedOn`); the reconstitution calculator owns the "bacteriostatic water"
> query. Some `Title` cells above pre-date the current `<title>` copy — treat
> `apps/web` source as canonical and resync this table in a follow-up.

**Sitemap (hierarchical):** `/sitemap.xml` is a sitemap *index* listing five
child files (priority / changefreq / stable lastmod — never `new Date()` on
every deploy). Source: `lib/sitemap-hierarchy.ts` + `app/sitemap.ts`
(`generateSitemaps`) + `app/sitemap.xml/route.ts` (index). Coverage is 1:1
with `routePaths`.

| Child | Contents | Priority band |
|---|---|---|
| `/sitemap/core.xml` | Home, hub, converters | 0.85–1.0 |
| `/sitemap/evidence.xml` | `/peptides` + evidence guides | 0.92–0.94 |
| `/sitemap/calculators.xml` | `/calculator/*` compound presets | 0.75–0.88 |
| `/sitemap/guides.xml` | Measurement guides + AU regulatory | 0.65–0.70 |
| `/sitemap/info.xml` | About, methodology, policy, legal | 0.30–0.60 |

`robots.txt` points at the index. After deploy, resubmit `/sitemap.xml` in GSC.

**Brand / social:** `/icon.svg`, `/apple-icon`, `/opengraph-image`, `/twitter-image`.
Organization JSON-LD includes `logo`.

**Human ops:** After deploy, submit sitemap in Google Search Console and request
indexing for `/`, `/peptide-calculator`, `/calculator/retatrutide`,
`/calculator/bpc-157`, `/guides/peptide-regulators`.

**Alias domains** (`.com.au` / `.online` / `.au`): human-owned DNS check.
