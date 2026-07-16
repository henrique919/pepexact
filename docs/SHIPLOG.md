# PepExact — Ship log

Append-only record of completed execution-plan tasks.  
Agents: after each task, add one row (newest at the bottom).

**Format:** `YYYY-MM-DD | TASK-00N short title | commit | notes`

| Date | Task | Commit | Notes |
|---|---|---|---|
| 2026-07-17 | TASK-001 Compound page template | cc30807 | Shared `CompoundCalculatorPage` template + `PeptideCalculator` initial-value props. No route shipped yet (kept unlisted per acceptance); TASK-002 is the first consumer. |
| 2026-07-17 | TASK-002 /calculator/retatrutide | _pending merge_ | Dynamic SSG `[slug]` route + `compounds.ts` data map (retatrutide). Unique meta/H1/FAQ JSON-LD, generic labelled example, one calm sourced status line (ClinicalTrials.gov, verified 34 studies). Human expanded compound scope to 7 pages + set an "about" content policy (see plan §4); FDA-specific facts NOT excluded — all pages cite reputable primary sources, none omitted for being unfavourable. |
