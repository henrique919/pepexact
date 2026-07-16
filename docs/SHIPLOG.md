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
| 2026-07-17 | TASK-007 AU legal facts hub | _pending merge_ | `/au/are-peptides-legal`, facts-only. NO substance-specific legal claim. Points to primary regulators, ALL verified in-session (TGA via browser; FDA + FDA drug-approval + ClinicalTrials via HTTP 200). TODO(human) left in-code for optional deeper AU scheduling detail — omitted, not invented, per §5/§9. Human verification still recommended before treating AU regulatory framing as final. |
