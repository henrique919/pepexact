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

**Last audited against prod:** 2026-07-17 (post TASK-V2-009 deploy `6c015f6`).
All 16 routes HTTP 200, self-canonical present, `X-Nextjs-Prerender: 1` (SSG).
BreadcrumbList JSON-LD on every non-home page; homepage has Organization +
WebSite only (intentional — no one-item "Home" crumb). Sitemap.xml lists all
16 URLs. Hub shows visible breadcrumbs + "Related tools & guides".

| Route | Role | Title | Canonical | Schema types | Notes |
|---|---|---|---|---|---|
| `/` | Home | PepExact — the independent peptide calculator | self | Organization, WebSite | Canonical + schema shipped in TASK-V2-008 patch. |
| `/peptide-calculator` | Hub / money page | Peptide Calculator — mg to syringe units, instantly | self | WebApplication, BreadcrumbList, FAQPage | Flagship. Do not move this URL. |
| `/reconstitution-calculator` | Converter (target draw → water) | Reconstitution Calculator — how much water to add | self | WebApplication, BreadcrumbList | |
| `/mg-to-mcg-converter` | Converter | mg to mcg Converter — milligrams to micrograms | self | WebApplication, BreadcrumbList | Live path differs from v2 plan's example `/mg-to-mcg` — this is the real one; never renamed. |
| `/syringe-units-calculator` | Converter | Syringe Units Calculator — U-100 units to mL | self | WebApplication, BreadcrumbList | Live path differs from v2 plan's example `/syringe-units` — this is the real one; never renamed. |
| `/calculator/retatrutide` | Compound preset | Retatrutide calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Sourced: ClinicalTrials.gov. |
| `/calculator/bpc-157` | Compound preset | BPC-157 calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Sourced: PubMed. |
| `/calculator/tb-500` | Compound preset | TB-500 calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Sourced: PubMed. |
| `/calculator/ghk-cu` | Compound preset | GHK-Cu calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Sourced: PubMed. |
| `/calculator/melanotan-2` | Compound preset | Melanotan II calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Added under human directive 2026-07-17; not in v2's §4 table but in scope. Sourced: PubMed. |
| `/calculator/mots-c` | Compound preset | MOTS-c calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Same as above. Kept minimal (§4 policy: little clean popular fact). Sourced: PubMed. |
| `/calculator/aod-9604` | Compound preset | AOD-9604 calculator — vial, water, dose → syringe units | self | WebApplication, BreadcrumbList, FAQPage | Same as above. Sourced: PubMed. |
| `/guides/mg-vs-mcg` | Guide | mg vs mcg — the 1,000× difference, explained | self | Article, BreadcrumbList | |
| `/guides/how-to-read-an-insulin-syringe` | Guide | How to read an insulin syringe — U-100, units, and tick marks | self | Article, BreadcrumbList | |
| `/guides/why-calculators-disagree` | Guide / link magnet | Why two peptide calculators give different answers | self | Article, BreadcrumbList, FAQPage | Chosen over the printable-chart option in old TASK-006. Printable chart is now separately queued as TASK-V2-011. |
| `/au/are-peptides-legal` | AU facts hub | Are peptides legal in Australia? What PepExact can and can't tell you | self | Article, BreadcrumbList, FAQPage | Makes no substance-specific legal claim (§5-safe cite-or-omit). `TODO(human)` left in code for verified expansion. |

**Not yet built (v2 §3 IA):**
- `/calculator/semaglutide`, `/calculator/tirzepatide` — 🔒 blocked on HV-1 (not recorded in `docs/SHIPLOG.md`)
- `/guides/syringe-units-chart` (printable chart) — queued as TASK-V2-011
- `/guides/peptides-us-regulations` — backlog per v2 §7 Q6 (only after AU hub proves pattern/demand)

**Sitemap:** `apps/web/src/app/sitemap.ts` maps `routePaths` 1:1, `lastModified: new Date()`, priority 1 for `/peptide-calculator`, 0.7 elsewhere. Verified 16/16 URLs present at `/sitemap.xml` on 2026-07-17 (post V2-009). `robots.txt` references the sitemap (`apps/web/src/app/robots.ts`).

**Alias domains** (`.com.au` / `.online` / `.au`): not verified in this audit — needs DNS-level check, out of scope for an agent session (v2 §7 Q3, human-owned).
