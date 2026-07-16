# PepExact iOS MVP — product spec

**Status:** Spec only (TASK-V2-017). No app code in this task.  
**Brand:** PepExact · **Domain:** https://pepexact.com · **Handle:** @pepexact  
**Shared math:** `@pepexact/engine` (TypeScript, pure, deterministic)

This document defines the smallest useful iPhone app that continues the web
calculator experience: save a vial, see the draw on a syringe, count doses left,
work offline. It does **not** authorize implementation.

---

## 1. Goal

Ship an educational **measurement** utility on iOS that produces **identical
arithmetic** to pepexact.com for the same inputs, with a calm UI matching the
web brand (warm paper, deep teal). Category: dose confidence / get the draw
right — not a clinic product, not a dosing advisor, not a marketplace.

**MVP success:** A user who calculated a draw on the web can open the app,
enter the same vial / water / dose numbers (or restore a saved vial), see the
same units and math steps, and use the result offline.

---

## 2. Non-goals (MVP)

- Dosing recommendations, protocols, cycles, stacks, or “typical dose” tables
- Vendor, sourcing, affiliate, or where-to-buy content
- Compound “about” essays or regulatory claims inside the app (link out to web
  facts hubs if needed later)
- Accounts, sync, or multi-device cloud (local persistence only for MVP)
- Android, watchOS, widgets (post-MVP)
- Pro / paid features, reconstitution optimizer, push notifications
- Changing `@pepexact/engine` outputs for platform convenience

---

## 3. Screens (MVP)

Keep the first viewport calm: brand, one job, no dashboard chrome.

| # | Screen | Purpose | Primary content |
|---|---|---|---|
| 1 | **Home / Vials** | List saved vials; empty state → New vial | PepExact wordmark; list of vial nicknames + last units; “New vial” CTA |
| 2 | **Vial editor** | Enter measurement inputs | Fields: vial mg, water mL, dose (+ mg/mcg), syringe capacity (30/50/100). Label example inputs as examples for the calculator, never as recommendations. |
| 3 | **Result** | Show the draw | Large units readout; U-100 syringe visualization; concentration / volume / doses left; warnings; expandable “Show the math” steps; soft disclaimer |
| 4 | **Converters (optional tab)** | Parity with web converters | (A) mg ⇄ mcg, (B) units ⇄ mL — thin screens reusing engine helpers. Can ship in MVP-b if needed to cut scope. |
| 5 | **About / Disclaimer** | Compliance surface | Measurement tool only; not medical advice; no dosing recommendations; link to pepexact.com |

**Navigation:** Simple tab or stack — Vials → Editor → Result. Avoid card spam and medical-dashboard patterns.

**Continuity with web waitlist CTA:** App store listing and onboarding may echo web continuity copy (“same measurement math as pepexact.com”) without health promises.

---

## 4. Engine contract

### 4.1 Source of truth

| Item | Contract |
|---|---|
| Package | `@pepexact/engine` in `packages/engine` |
| Runtime on iOS | Prefer embedding the **same TypeScript** via a small JS context, **or** a line-faithful port that is locked by shared fixtures (see §5). Prefer one codebase long-term. |
| Purity | No I/O, no clocks, no locale-dependent math (display `fmt` uses `en-US`) |
| Framing | Measurement math only — comments and API docs already forbid dosing advice |

### 4.2 Public API (MVP must call)

| Export | Role |
|---|---|
| `calculateDraw(DrawInput) → DrawOutcome` | Flagship: vial + diluent + dose → units, volume, steps, warnings |
| `calculateDiluent(DiluentInput) → DiluentOutcome` | Target units → water volume (reconstitution helper) |
| `mgToMcg` / `mcgToMg` | Converter screens |
| `unitsToMl` / `mlToUnits` | U-100 converter screens |
| `SYRINGES`, `U100_UNITS_PER_ML` | Syringe capacity UI |
| `roundTo`, `fmt` | Display parity with web |

### 4.3 Input / output shapes (draw)

**Input (`DrawInput`):**

- `vialMg: number` — peptide mass on the vial label (mg)
- `diluentMl: number` — water added (mL)
- `doseValue: number` + `doseUnit: "mg" \| "mcg"`
- `syringeCapacityUnits?: 30 \| 50 \| 100` — default `100`

**Success (`DrawResult`, `ok: true`):**

- `concentrationMgPerMl`, `concentrationMcgPerMl`
- `doseMcg`, `volumeMl`, `units`, `dosesPerVial`
- `steps: { label, expression, result }[]` — show in UI
- `warnings: string[]` — show calmly; do not turn into scare copy

**Failure (`CalcError`, `ok: false`):**

- `errors: string[]` — invalid / non-positive inputs

**Invariant:** For the same numeric inputs, iOS and web must produce equal
rounded fields and the same warning/error strings (fixture-locked).

### 4.4 Persistence (app layer, not engine)

Local-only MVP model (suggested):

```
Vial {
  id, nickname?,
  vialMg, diluentMl, doseValue, doseUnit, syringeCapacityUnits,
  updatedAt
}
```

Engine stays stateless; the app stores inputs and re-runs `calculateDraw` on
open. Do not persist “recommended” doses as guidance — only user-entered
measurement inputs.

---

## 5. Parity fixtures

### 5.1 Existing lockfile

`packages/engine/test/engine.test.ts` is the **canonical fixture suite** today
(15 groups), including:

| Fixture | Inputs (summary) | Locked expectations |
|---|---|---|
| Canonical draw | 5 mg, 2 mL, 250 mcg | 2.5 mg/mL, 10 units, 0.1 mL, 20 doses, 0 warnings, 4 steps |
| mg dose | 10 mg, 1 mL, 1 mg | 10 units, 10 doses |
| Non-round thirds | 5 mg, 3 mL, 300 mcg | 0.18 mL, 18 units, 16 doses |
| Warn: dose > vial | 1 mg, 1 mL, 2 mg | warning contains “larger than the total” |
| Warn: over syringe | 5 mg, 5 mL, 2 mg, 100-unit | warning contains “100-unit syringe” |
| Warn: tiny draw | 10 mg, 1 mL, 100 mcg | 1 unit; “under 2 units” |
| Reject bad input | 0 / -1 / NaN | 3 errors |
| Canonical diluent | 5 mg, 250 mcg → 10 units | 2 mL water |
| Diluent warn > 3 mL | 10 mg, 250 mcg → 10 units | 4 mL + vial capacity warning |
| Round-trip | diluent then draw | units === target |

### 5.2 iOS requirement

Before App Store review of any calc UI:

1. Run the **same cases** on-device (or in CI against the iOS engine binding).
2. Assert numeric fields and warning/error **substrings** match the Node suite.
3. When engine math changes, update fixtures in `packages/engine/test` first;
   iOS must not diverge.

Optional later: extract JSON fixtures from the Node tests for dual runners
(Node + Swift). Not required to start MVP if the TS engine is embedded.

---

## 6. Compliance (§5 absolute)

These rules override convenience. Violating them fails the MVP.

1. **Educational measurement only** — arithmetic and unit explanation.
2. **No dosing recommendations** — never imply what someone “should” take.
3. **No protocols / cycles / stacks** — example inputs labelled as calculator
   examples only.
4. **No vendor / sourcing / affiliate** content or links.
5. **No invented medical or legal claims** — omit or cite primary sources on
   the website; the app should stay arithmetic-first.
6. **Disclaimer required** — measurement tool, not medical advice, no dosing
   recommendations (About screen + first-run or result footer).
7. **Tone** — clear, calm, precise; show the math; prefer “verify the number.”
8. **Brand** — display **PepExact**; technical ids may stay `pepexact`.

App Store review notes should state: utility for unit conversion / syringe
mark calculation; not a medical device; not providing treatment advice.

---

## 7. Visual / UX constraints

- Match web tokens: paper `#f7f5f1`, accent `#0e6e5c`, ink `#1c2321`.
- Syringe visualization should read as the same mental model as the web
  `Syringe` component (fill by U-100 units).
- Offline-first: calculation must work with no network.
- Accessibility: Dynamic Type, VoiceOver labels on fields and result units.
- No purple-glow “AI medical” aesthetics; no emoji-led UI.

---

## 8. Suggested MVP milestones (implementation later)

| Milestone | Deliverable |
|---|---|
| M0 | Engine binding + parity fixtures green on-device |
| M1 | Vial editor + result + syringe + math steps + disclaimer |
| M2 | Local vial list / persistence |
| M3 | App Store assets, privacy nutrition labels (no tracking in MVP), review |

Out of scope until a later brief: accounts, sync, widgets, Pro, compound
content, HV-1 compounds (semaglutide / tirzepatide) as special cases.

---

## 9. Open decisions (human)

Not blocking this spec doc; resolve before build:

1. Embed TypeScript engine vs Swift port + shared JSON fixtures?
2. Ship converters in MVP or MVP-b?
3. Waitlist / TestFlight URL already used by web `NEXT_PUBLIC_WAITLIST_URL` —
   keep UTM `utm_campaign=waitlist` for web; use a separate campaign for App
   Store / TestFlight analytics if needed.

---

## 10. References

- Engine: `packages/engine/src/index.ts`
- Fixtures: `packages/engine/test/engine.test.ts`
- Web flagship: `/peptide-calculator` + `PeptideCalculator` / `AppCta`
- Copy & compliance: `docs/EXECUTION-PLAN.md` §5
- Brand assets: `apps/web/src/app/icon.svg`, `apps/web/src/lib/og.tsx`
