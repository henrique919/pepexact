# PepExact — Execution Plan

Ship-oriented queue for pepexact.com. Agents execute one unlocked task at a time, then stop.

**Brand:** PepExact · **Domain:** https://pepexact.com · **Handle:** @pepexact  
**Packages:** `@pepexact/engine` · `@pepexact/web`  
**Repo:** github.com/henrique919/pepexact · **Vercel root:** `apps/web`

---

## 1. Overview

PepExact is an independent **educational measurement utility**: vial + water + dose → syringe units, with the math shown. Category: dose confidence / get the draw right.

**Not** a clinic product, content farm, marketplace, or dosing advisor. Monetisation (Pro) is out of scope for this queue.

### Already live (do not rebuild)

| Route | Role |
|---|---|
| `/peptide-calculator` | Flagship money page |
| `/reconstitution-calculator` | Target draw → water |
| `/mg-to-mcg-converter` | Bidirectional converter |
| `/syringe-units-calculator` | Units ⇄ mL + syringe |
| `/guides/mg-vs-mcg` | Trust / edu |
| `/guides/how-to-read-an-insulin-syringe` | Trust / edu |

Also shipped: shared engine + tests, sitemap/robots/JSON-LD/canonicals, waitlist CTA (`NEXT_PUBLIC_WAITLIST_URL`), Search Console + sitemap submitted.

### This queue’s outcome

Compound calculator presets under `/calculator/[slug]`, clearer IA, one link-magnet page, AU facts hub (primary sources only), money-page polish. Prefer ~12–25 excellent pages over thin volume.

---

## 2. Hard constraints

1. **Arithmetic / measurement framing only** — never recommend compounds, doses, stacks, frequencies, or sources.
2. **Per-compound pages** = calculator presets + factual measurement context + links to primary sources when making regulatory/study-status claims — **not** protocols.
3. **Never publish:** where-to-buy, discount codes, vendor/affiliate links, import workarounds, “how much should I take.”
4. **AU + US aware** — regulatory copy must cite primary sources (e.g. TGA, FDA) and stay factual. Mark unverified claims for human review.
5. **Engine parity** — web and future iOS share `@pepexact/engine`. Extend engine only when math changes; add tests.
6. **UI system** — calm premium (warm paper, deep teal). Improve layout; do not redesign into purple gradients, glow spam, or medical dashboards.
7. **Every new tool page:** SSG/indexable copy, metadata + canonical, schema, internal links to `/peptide-calculator`, soft App/waitlist CTA after result.
8. **Do not invent** medical claims, search volumes, or legal conclusions. Validate volumes separately; cite sources for legal status.

---

## 3. Information architecture

### Current

```
/                              # homepage
/peptide-calculator            # hub / money page
/reconstitution-calculator
/mg-to-mcg-converter
/syringe-units-calculator
/guides/mg-vs-mcg
/guides/how-to-read-an-insulin-syringe
```

### Target (this queue)

```
/calculator/[slug]             # compound presets (hub-and-spoke from money page)
/guides/...                    # existing + optional problem-based guides later
/au/are-peptides-legal         # facts hub, primary sources only
/guides/why-calculators-disagree  # OR printable syringe chart (link magnet — pick one in TASK-006)
```

**URL scheme (locked for compounds):** `/calculator/[slug]`  
Examples: `/calculator/retatrutide`, `/calculator/bpc-157`, `/calculator/tb-500`, `/calculator/ghk-cu`.

**Internal linking:** every compound page ↔ money page + converters + relevant guides. Homepage/nav expose tools clearly without card spam.

**Indexation workflow after each ship:** route in `routes` / sitemap → deploy → GSC URL inspection (human or noted in SHIPLOG).

---

## 4. Compound priority

| Priority | Slug | Target query themes (validate volumes) | Why | Compliance notes |
|---|---|---|---|---|
| 1 | `retatrutide` | retatrutide calculator / reconstitution / units | High demand compound preset fuel | Preset defaults are **example calculator inputs only**, not a recommended dose |
| 2 | `bpc-157` | bpc-157 calculator / reconstitution | Strong long-tail cluster | Same; no recovery/protocol copy |
| 3 | `tb-500` | tb-500 calculator / units | Adjacent research-peptide demand | Same; no stacks |
| 4 | `ghk-cu` | ghk-cu calculator / reconstitution | Adjacent demand | Same; no topical/injectable advice |
| 5 | `melanotan-2` | melanotan 2 / mt2 calculator / units | Added scope (human, 2026-07-17) | Same; no tanning/efficacy or scare copy |
| 6 | `mots-c` | mots-c calculator / reconstitution | Added scope (human, 2026-07-17) | Same; keep minimal — little clean popular fact |
| 7 | `aod-9604` | aod-9604 calculator / units | Added scope (human, 2026-07-17) | Same; no fat-loss/efficacy claims |
| Later | tirzepatide / semaglutide | only if demand warrants | Optional; not in this queue | Strictly measurement framing; no therapy claims |

Compound pages **preload** vial/water/dose defaults solely so the tool demos arithmetic. Label clearly as example inputs for the calculator.

### Compound "about" content policy (human-directed, 2026-07-17)

The three added compounds (melanotan-2, mots-c, aod-9604) ship as their own
`/calculator/[slug]` pages via the shared template, under these guardrails
(supersede any convenience, sit **inside** §5, do not relax it):

- Calculator-first. "About" is a short section under the tool, not an essay.
- Popular, high-level context only: 1–2 neutral sentences on what the compound
  is commonly called / what class of molecule it is, plus measurement-relevant
  notes (common vial label sizes, mg/mcg or IU confusion, reconstitution framing).
- Any status/fact claim must link a reputable **primary source** (ClinicalTrials.gov,
  PubMed, government body) inline — never invented. If it can't be said calmly in
  one neutral sentence with a source, **omit it**.
- **Still absolute:** no doses/protocols/stacks/cycles/"how much"; no
  buy/sourcing/vendor/affiliate; no before/after, hype, or efficacy promises;
  no scare-copy or doom framing; no fake citations.
- If a compound has almost no clean popular facts, keep its page **arithmetic-only**
  rather than padding.

Tracked as **TASK-004B** (after TASK-004). All seven compound pages honour this policy.

---

## 5. Global copy rules (absolute)

These rules override task convenience. Violating them is an automatic fail of the task.

1. **Educational measurement only.** PepExact performs arithmetic and explains units. It does not advise treatment.
2. **No dosing recommendations.** Never state or imply what amount someone “should” take, how often, or for what goal.
3. **No protocols, cycles, stacks, or “typical dose” tables** framed as guidance. Example inputs for math demos must be labelled as examples for the calculator, not recommendations.
4. **No vendor, sourcing, affiliate, or “where to buy” content.** No discount codes, brand comparisons for purchase, or import workarounds.
5. **No invented medical or legal claims.** If stating regulatory or study status, cite a primary source (TGA, FDA, ClinicalTrials.gov, PubMed) or omit the claim.
6. **Disclaimer required** on every calculator/compound page and retained in the site footer: measurement tool, not medical advice, no dosing recommendations.
7. **Tone:** clear, calm, precise. Show the math. Prefer “verify the number” over fear or hype.
8. **SEO without spam:** unique titles/H1s/FAQs per page; no keyword stuffing; no thin doorway pages.
9. **External links policy:** government / primary research registries only when supporting a factual claim; otherwise internal links only.
10. **Brand:** display **PepExact**; technical names stay lowercase `pepexact`.

---

## 6. Loop instructions (for executing agents)

Follow exactly every session.

1. **Read** this file (`docs/EXECUTION-PLAN.md`) and skim `docs/SHIPLOG.md` for recent context.
2. **Pick** the first unchecked task (`- [ ]`) whose dependencies are satisfied (prior tasks checked).
3. **Execute only that task.** Do not start the next task in the same session unless the human explicitly says so.
4. **Implement** against acceptance criteria and §5 copy rules. Reuse `@pepexact/engine` and existing UI patterns.
5. **Verify:** `npm test` and `npm run build` from repo root. Fix failures before marking done.
6. **Update routes/sitemap** when adding pages (`apps/web/src/lib/site.ts` `routes` array drives sitemap).
7. **Edit this file:** check the task box `- [x]`, note any follow-ups under the task if needed.
8. **Append** one line to `docs/SHIPLOG.md`: `YYYY-MM-DD | TASK-00N title | commit hash | short notes`.
9. **Commit** with a clear message focused on why (include docs updates in the same commit when they mark the task done).
10. **Stop.** Report what shipped and what the next unlocked task is. Wait for “next.”

**Stop conditions:** blocked on human decision (legal citation, asset design), failing tests/build, or §5 conflict — stop and ask; do not invent claims to unblock.

**Commit style:** concise, imperative, why-focused. Example: `Add retatrutide calculator preset page for compound SEO cluster.`

---

## 7. On-page SEO template (compound / tool pages)

Use on every new calculator page:

| Element | Pattern |
|---|---|
| Title | `{Compound} calculator — vial, water, dose → syringe units \| PepExact` (adapt length) |
| H1 | `{Compound} calculator` (or clear measurement phrasing) |
| Meta | Free measurement tool; mention units/math; no dosing promise |
| Canonical | `/calculator/{slug}` |
| Schema | WebApplication + BreadcrumbList + FAQPage (as appropriate) |
| Body | Tool above the fold → short support sentence → show-the-math → FAQ → related tools |
| Internal links | Hub `/peptide-calculator`, reconstitution, converters, 1–2 guides |
| External links | None unless citing primary sources for a factual claim |
| CTA | Soft waitlist/App CTA after result |

---

## 8. Task queue

Execute in order. Each task is one PR-sized unit.

---

### TASK-001 — ✅ Compound page template

- [x] **Status:** done

**Shipped:** `apps/web/src/components/CompoundCalculatorPage.tsx` is the shared
template (props: `slug`, `name`, `intro`, `summary`, `example`, `aboutHeading`,
`aboutBody`, `faqs`, `relatedTools`, `relatedGuides`). It renders JSON-LD
(WebApplication + Breadcrumb + FAQ), the `PeptideCalculator` (now accepting
optional `initialVial`/`initialWater`/`initialDose`/`initialDoseUnit` props),
a `Note` example-input callout when `example` is set, measurement-context
copy, FAQ accordion, related tools/guides, and the standing disclaimer.
Per-compound pages live at `apps/web/src/app/calculator/{slug}/page.tsx` and
just supply `metadata` + a `CompoundCalculatorPage` call — no route shipped
yet (kept unlisted per acceptance; TASK-002 is the first real consumer).

**Depends on:** none  

**Goal:** Add a reusable `/calculator/[slug]` (or shared template + first route scaffolding) that wraps the existing `PeptideCalculator` / engine with metadata, FAQ, disclaimer, breadcrumbs, and related-tools links — so compound pages are copy + defaults, not forked calculators.

**Files likely touched:**
- `apps/web/src/app/calculator/` (layout / shared components / dynamic or static slug structure)
- `apps/web/src/components/PeptideCalculator.tsx` (optional: accept initial vial/water/dose props)
- `apps/web/src/lib/site.ts` (helpers if needed)
- `apps/web/src/components/` (related-tools block if extracted)

**Acceptance:**
- One shared pattern for compound pages (components or conventions documented in code)
- Calculator still uses `@pepexact/engine`
- Disclaimer + §5-safe placeholder/example-input labelling supported
- Build passes; no thin empty public route without real content (either ship with TASK-002 or keep unlisted until first compound)

**Definition of done:** Template path clear; `npm test` + `npm run build` green; this task checked; SHIPLOG line appended.

**Unlocks:** TASK-002

---

### TASK-002 — ✅ `/calculator/retatrutide`

- [x] **Status:** done

**Shipped:** dynamic SSG route `apps/web/src/app/calculator/[slug]/page.tsx`
(`generateStaticParams` + `generateMetadata`, `dynamicParams = false`) driven by
a pure data map `apps/web/src/lib/compounds.ts`. First entry `retatrutide`:
unique title/H1/meta/canonical, FAQ JSON-LD, generic labelled example inputs, a
single calm sourced status line (ClinicalTrials.gov, 34 real studies), no
protocols/vendor/invented claims. `routes` in `site.ts` now spreads
`compoundRoutes`, so the slug is in the sitemap. Template `CompoundCalculatorPage`
refactored from raw-JSX props to the structured `Compound` record.

**Depends on:** TASK-001  

**Goal:** Ship retatrutide compound calculator page with unique SEO copy, example calculator defaults (labelled as examples), FAQs for measurement/reconstitution/units intent, schema, sitemap entry, internal links.

**Files likely touched:**
- `apps/web/src/app/calculator/retatrutide/page.tsx` (or slug data module)
- `apps/web/src/lib/site.ts` (`routes`)
- Shared compound components from TASK-001

**Acceptance:**
- Route live and prerendered (SSG)
- Unique title, H1, meta, canonical, FAQ JSON-LD
- Example inputs clearly not recommendations
- No protocols, vendor links, or invented medical claims
- Linked from related-tools / discoverable from hub where appropriate
- In sitemap via `routes`

**Definition of done:** Page ships §5-clean; tests + build green; task checked; SHIPLOG appended.

**Unlocks:** TASK-003

---

### TASK-003 — `/calculator/bpc-157`

- [ ] **Status:** pending

**Depends on:** TASK-002  

**Goal:** Same pattern as retatrutide for BPC-157 — unique copy and FAQs; measurement framing only.

**Files likely touched:**
- `apps/web/src/app/calculator/bpc-157/page.tsx` (or slug data)
- `apps/web/src/lib/site.ts`

**Acceptance:** Same checklist as TASK-002 adapted to `bpc-157`. No recovery/healing protocol language.

**Definition of done:** Page ships §5-clean; tests + build green; task checked; SHIPLOG appended.

**Unlocks:** TASK-004

---

### TASK-004 — `/calculator/tb-500` + `/calculator/ghk-cu`

- [ ] **Status:** pending

**Depends on:** TASK-003  

**Goal:** Ship TB-500 and GHK-Cu compound calculator pages using the shared template.

**Files likely touched:**
- `apps/web/src/app/calculator/tb-500/page.tsx`
- `apps/web/src/app/calculator/ghk-cu/page.tsx`
- `apps/web/src/lib/site.ts`

**Acceptance:**
- Both routes SSG with unique metadata/FAQs
- §5 copy rules held (no stacks, no topical vs injectable advice)
- Sitemap updated for both

**Definition of done:** Both pages live; tests + build green; task checked; SHIPLOG appended.

**Unlocks:** TASK-005

---

### TASK-005 — Homepage / nav IA + related-tools consistency

- [ ] **Status:** pending

**Depends on:** TASK-004  

**Goal:** Improve homepage, header, and footer so tools and compound calculators are findable; ensure related-tools / breadcrumbs are consistent across calculator pages. Brand PepExact remains clear; one job per section; no card spam.

**Files likely touched:**
- `apps/web/src/app/page.tsx`
- `apps/web/src/components/SiteHeader.tsx`
- `apps/web/src/components/SiteFooter.tsx`
- Related-tools component(s)
- Optionally money page cross-links

**Acceptance:**
- Nav/footer expose core tools + compound cluster without clutter
- Homepage states product job clearly and links to `/peptide-calculator` as primary CTA
- Internal linking graph updated (hub ↔ compounds ↔ converters/guides)
- Mobile-usable

**Definition of done:** IA pass shipped; build green; task checked; SHIPLOG appended.

**Unlocks:** TASK-006

---

### TASK-006 — Link magnet page

- [ ] **Status:** pending

**Depends on:** TASK-005  

**Goal:** Ship **one** linkable trust asset that earns bookmarks/backlinks and funnels to the calculator. Pick **either**:
- `/guides/why-calculators-disagree` (measurement/rounding/units explanation), **or**
- A printable syringe chart guide page (educational chart + link to units calculator)

Do not ship both in this task.

**Files likely touched:**
- New guide under `apps/web/src/app/guides/...`
- `apps/web/src/lib/site.ts`
- Cross-links from money page / syringe guide

**Acceptance:**
- Unique Article (or appropriate) schema + meta
- Explains measurement disagreement or syringe reading — no dosing advice
- Strong internal CTA to `/peptide-calculator` and `/syringe-units-calculator`
- Sitemap entry

**Definition of done:** One magnet live; build green; task checked; SHIPLOG notes which option shipped.

**Unlocks:** TASK-007

---

### TASK-007 — AU legal facts hub

- [ ] **Status:** pending

**Depends on:** TASK-006  

**Goal:** Add `/au/are-peptides-legal` as a **facts-only** hub: what PepExact is (measurement tool), and carefully sourced pointers to primary AU (and where relevant US) regulatory information. No shopping advice, no import tips, no “how to get peptides.”

**Files likely touched:**
- `apps/web/src/app/au/are-peptides-legal/page.tsx`
- `apps/web/src/lib/site.ts`
- Footer/nav link (AU-aware, not overstated)

**Acceptance:**
- Every regulatory statement cites a primary source URL or is omitted
- Explicit: PepExact does not sell peptides and does not provide legal advice
- §5 absolute — if a citation cannot be verified in-session, leave a `TODO(human): verify citation` and do not invent the claim
- Schema/meta appropriate (Article or WebPage); sitemap entry

**Definition of done:** Page ships without unsourced legal claims; build green; task checked; SHIPLOG appended (note any human verification TODOs).

**Unlocks:** TASK-008

---

### TASK-008 — Money-page layout polish

- [ ] **Status:** pending

**Depends on:** TASK-007  

**Goal:** Polish `/peptide-calculator` for tool-first layout, CWV-safe motion/structure, clearer hierarchy (calculator → math → FAQ → related compounds/tools → soft waitlist CTA). Preserve existing engine behaviour and shareable query URLs.

**Files likely touched:**
- `apps/web/src/app/peptide-calculator/page.tsx`
- `apps/web/src/components/PeptideCalculator.tsx`
- `apps/web/src/components/ui.tsx` / `Syringe.tsx` as needed
- Related-tools links to new compound pages

**Acceptance:**
- Calculator usable above the fold on mobile and desktop
- Related compounds/tools linked
- No layout regression that hurts LCP (keep SSG; avoid heavy client bloat)
- Disclaimer retained; §5 intact
- `npm test` + `npm run build` green

**Definition of done:** Polish shipped; task checked; SHIPLOG appended. Queue complete pending human “next” / new tasks.

**Unlocks:** none (queue end — await human for Pro/iOS/optimizer brief)

---

## 9. Open questions / human validations

| Item | Status / action |
|---|---|
| Keyword volumes (Ahrefs etc.) | Validate; do not invent in copy |
| `NEXT_PUBLIC_WAITLIST_URL` | Done (live) |
| Alias DNS (`.com.au` / `.online` / `.au`) | Confirm VentraIP → Vercel as needed |
| AU legal citations | Human verify before treating TASK-007 as permanently final |
| Link magnet choice | Agent picks one in TASK-006; note in SHIPLOG |
| Favicon / OG polish | Not blocking this queue; schedule separately if needed |

---

## 10. Out of scope (this queue)

- iOS app implementation
- Reconstitution optimizer (Pro)
- Vendor/affiliate programs
- Thin content farms / automated compound spam
- Invented efficacy or safety claims
