# PepExact — website MVP

The independent calculator that makes the number trustworthy and easy to draw.
Educational measurement utility only: no medical advice, no dosing suggestions, no peptide sales.

**Brand:** PepExact · **Domain:** [pepexact.com](https://pepexact.com) · **Handle:** @pepexact  
Technical/package names use lowercase `pepexact`.

## Structure

```
pepexact/
├── packages/engine/   # @pepexact/engine — shared TypeScript calc engine
│   ├── src/index.ts   # calculateDraw, calculateDiluent, conversions, show-the-math steps
│   └── test/          # assertion test suite (npm test)
└── apps/web/          # @pepexact/web — Next.js 15 (App Router, SSG), Tailwind CSS v4
```

The engine is a pure, dependency-free TypeScript package. The iOS app must consume
this same package (e.g. via React Native, or as the reference spec for a Swift port
verified against `test/engine.test.ts`) so web and app always produce identical results.

## Pages (launch set)

| Route | Role |
|---|---|
| `/peptide-calculator` | Flagship money page: vial + water + dose → units, syringe render, show-the-math, shareable URL, app CTA |
| `/reconstitution-calculator` | Works backwards: target draw → water to add, with round-number options |
| `/mg-to-mcg-converter` | Bidirectional converter + reference table |
| `/syringe-units-calculator` | Units ⇄ mL + rendered syringe + table |
| `/guides/mg-vs-mcg` | Trust/edu cluster |
| `/guides/how-to-read-an-insulin-syringe` | Trust/edu cluster |

SEO: per-page metadata + canonicals, WebApplication / BreadcrumbList / FAQPage / Article
JSON-LD, `sitemap.xml`, `robots.txt`. All routes prerender static (CWV-friendly, ~106 kB
first load). No login. Calculators hydrate client-side on top of indexable SSG copy.

## Run

```bash
npm install
npm test        # engine test suite
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
```

## Config

- `NEXT_PUBLIC_SITE_URL` — defaults to `https://pepexact.com` (used in canonical
  URLs, JSON-LD, sitemap). Override only if needed for staging. Set this in the
  Vercel project env for Production.
- `NEXT_PUBLIC_WAITLIST_URL` — URL for the “Join waitlist” CTA on calculator
  results (`AppCta`, `data-cta="web-to-app"`). Use a Google Form, Typeform, or
  similar. If unset, the CTA falls back to
  `mailto:hello@pepexact.com?subject=PepExact%20iOS%20waitlist`.
  For http(s) URLs, `AppCta` appends UTM params:
  `utm_source=pepexact&utm_medium=web&utm_campaign=waitlist&utm_content=[route]`
  (route = pathname without leading slash).
- Analytics is deployed through Google Tag Manager container
  `GTM-NQRJ9KN4`. Keep Google Analytics configuration in GTM so the site does
  not load duplicate Google tags.

  Example (Vercel → Project → Settings → Environment Variables):

  ```
  NEXT_PUBLIC_SITE_URL=https://pepexact.com
  NEXT_PUBLIC_WAITLIST_URL=https://forms.gle/your-form-id
  ```

  After changing `NEXT_PUBLIC_*` vars, redeploy so the client bundle picks them up.

## Shareable results

The flagship calculator mirrors its inputs into the query string
(`?vial=5&water=2&dose=250&unit=mcg&syringe=100`) and seeds state from it on load,
so any result URL reproduces the result.

## Compliance guardrails (do not remove)

- Every calculator page and the footer carry the educational-measurement disclaimer.
- The engine and all copy do arithmetic only — nothing suggests what or how much to take.
- Never publish: sourcing/vendor content, protocols, "how much should I take",
  import workarounds. Verify any AU/TGA or US/FDA legal-status copy against primary
  sources before publish (fast-follow `/au/are-peptides-legal`).

## Next (per brief, not blocking)

Reconstitution optimizer (web-lite + Pro) · per-compound preset pages
(`/calculator/retatrutide` etc.) · AU/US localised disclaimer variants ·
printable syringe chart link asset · iOS MVP on the same engine.
