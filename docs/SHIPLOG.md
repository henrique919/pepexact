# PepExact — Ship log

Append-only record of completed execution-plan tasks.  
Agents: after each task, add one row (newest at the bottom).

**Format:** `YYYY-MM-DD | TASK-00N short title | commit | notes`

| Date | Task | Commit | Notes |
|---|---|---|---|
| 2026-07-17 | TASK-001 Compound page template | cc30807 | Shared `CompoundCalculatorPage` template + `PeptideCalculator` initial-value props. No route shipped yet (kept unlisted per acceptance); TASK-002 is the first consumer. |
| 2026-07-17 | TASK-002 /calculator/retatrutide | 28447d3 | Dynamic SSG `[slug]` route + `compounds.ts` data map (retatrutide). Unique meta/H1/FAQ JSON-LD, generic labelled example, one calm sourced status line (ClinicalTrials.gov, verified 34 studies). Human expanded compound scope to 7 pages + set an "about" content policy (see plan §4); FDA-specific facts NOT excluded — all pages cite reputable primary sources, none omitted for being unfavourable. |
| 2026-07-17 | TASK-003 /calculator/bpc-157 | 86676d6 | `bpc-157` data entry: synthetic-peptide identity + measurement notes, PubMed source pointer, no recovery/healing/protocol copy. SSG via shared `[slug]` route; sitemap via compoundRoutes. |
| 2026-07-17 | TASK-004 /calculator/tb-500 + /calculator/ghk-cu | bdf2ea7 | Two data entries. tb-500: thymosin-beta-4-fragment identity, no stacks. ghk-cu: copper-tripeptide/cosmetic identity, route-neutral (no topical-vs-injectable advice). Both PubMed-sourced, measurement-only, SSG, sitemap. |
| 2026-07-17 | TASK-004B melanotan-2 + mots-c + aod-9604 | 4028a37 | Human-directed added scope. melanotan-2 (α-MSH-analog identity, no tanning/efficacy), mots-c (mitochondrial-derived-peptide, minimal), aod-9604 (hGH-fragment, no fat-loss/efficacy). All PubMed-sourced, measurement-only, SSG, sitemap. |
| 2026-07-17 | TASK-005 Homepage / nav IA | (see main) | Shared `CompoundLinks` chip component; compound cluster on homepage + hub; footer "Compounds" column. Hub↔spoke internal linking complete. No card spam; header left minimal. |
| 2026-07-17 | TASK-006 Link magnet | (see main) | Chose `/guides/why-calculators-disagree` (measurement/rounding explainer) over the printable syringe chart. Article+Breadcrumb+FAQ schema; CTAs to peptide + syringe-units calculators; linked from homepage/footer/money page; sitemap. §5-clean. |
| 2026-07-17 | TASK-007 AU legal facts hub | (see main) | `/au/are-peptides-legal`, facts-only. NO substance-specific legal claim. Points to primary regulators, ALL verified in-session (TGA via browser; FDA + FDA drug-approval + ClinicalTrials via HTTP 200). TODO(human) left in-code for optional deeper AU scheduling detail — omitted, not invented, per §5/§9. Human verification still recommended before treating AU regulatory framing as final. |
| 2026-07-17 | TASK-008 Money-page polish | 4766c6b | Tool-first hero + text-only trust strip (no CLS/JS); stronger "Related tools & guides" closing block. Calculator + engine untouched, so shareable query URLs and math preserved; still SSG. Original 8-task queue complete. |
| 2026-07-17 | v2 plan reconciliation | ea7333c | Henry supplied a fuller 17-task v2 plan. Mapped each v2 task against reality (§11 of EXECUTION-PLAN.md): v2-001..005/008/012/013/014 already shipped under old numbering; v2-006/007 (semaglutide/tirzepatide) confirmed BLOCKED — no HV-1 approval recorded here; v2-009/010/011/015/016/017 genuinely new. Added `docs/ROUTES.md` (route audit); found homepage had no canonical/schema. |
| 2026-07-17 | TASK-V2-008 patch | 8da03a1 | Fixed the homepage defect found above: `alternates.canonical` + Organization/WebSite JSON-LD (new helpers in `site.ts`). Closed v2-008's nav gap: header gains a "Compounds" link to a new `#compounds` anchor on the hub. |
| 2026-07-17 | TASK-V2-009 typed route registry | 4e99415 | `routes.ts` single source of truth; shared `Breadcrumbs` + `RelatedTools`; sitemap/footer/CompoundLinks/compound template + all tool/guide/AU pages retrofit. Build: 21 static routes. Merged PR #12 → `6c015f6`; prod SSG confirmed. |
| 2026-07-17 | TASK-V2-010 sitemap + metadata audit | 33da22d | `npm run audit:routes` static guard; prod 16/16 HTTP 200 + self-canonical + SSG; ROUTES.md refreshed. Merged PR #13 → `2d83545`. |
| 2026-07-17 | TASK-V2-011 printable syringe chart | _pending_ | `/guides/syringe-units-chart` — U-100 units→mL tables, print CSS, schema, §5-clean. |
