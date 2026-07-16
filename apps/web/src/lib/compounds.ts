import type { MassUnit } from "@pepexact/engine";

/**
 * Data for the /calculator/[slug] compound pages.
 *
 * These records are copy + measurement context only. Per docs/EXECUTION-PLAN.md
 * §5 they must never contain a dose recommendation, protocol, cycle, stack,
 * vendor/sourcing link, or efficacy/safety claim. Any status/fact claim in
 * `aboutParagraphs` must be backed by a `sources` entry pointing at a primary
 * registry (ClinicalTrials.gov, PubMed, or a government body) — never invented.
 * If a compound has no clean, calm, sourced fact, keep its `about` minimal and
 * arithmetic-focused rather than padding it.
 */
export interface CompoundExample {
  vial: string;
  water: string;
  dose: string;
  doseUnit: MassUnit;
}

export interface CompoundSource {
  label: string;
  url: string;
}

export interface CompoundFaq {
  q: string;
  a: string;
}

export interface CompoundLink {
  href: string;
  label: string;
}

export interface Compound {
  /** URL slug — page lives at /calculator/{slug}. */
  slug: string;
  /** Display name, e.g. "Retatrutide". */
  name: string;
  /**
   * <title> — the root layout appends "· PepExact", so do NOT add the brand
   * here (avoids double-branding). Pattern: "{Compound} calculator — …".
   */
  title: string;
  /** Meta description — measurement framing, no dosing promise. */
  metaDescription: string;
  /** One-paragraph intro under the H1. */
  intro: string;
  /** Short factual summary reused for JSON-LD WebApplication + FAQPage. */
  summary: string;
  /** Optional generic, clearly-labelled example inputs (not compound-specific advice). */
  example?: CompoundExample;
  aboutHeading?: string;
  /** Calm, popular, identity + measurement-relevance paragraphs. */
  aboutParagraphs: string[];
  /** Primary-source links backing any status/fact claim above. */
  sources?: CompoundSource[];
  faqs?: CompoundFaq[];
  relatedTools?: CompoundLink[];
  relatedGuides?: CompoundLink[];
}

/**
 * A neutral, generic example used across compound pages so the calculator
 * shows its working on load. Intentionally identical everywhere and labelled
 * as an example in the UI, so it can never read as a per-compound recommended
 * dose.
 */
const GENERIC_EXAMPLE: CompoundExample = {
  vial: "5",
  water: "2",
  dose: "250",
  doseUnit: "mcg",
};

/** Shared measurement paragraphs reused (with tweaks) across compound pages. */
const MEASUREMENT_PARAGRAPH =
  "Whatever the compound, this page only does arithmetic. It turns a vial size in milligrams, the water you add in millilitres, and a dose into the number of units on a U-100 insulin syringe — and shows every step. It does not know, store, or suggest what any dose should be.";

const MG_MCG_PARAGRAPH =
  "The most common measurement slip is milligrams versus micrograms: 1 mg is 1,000 mcg. Keep the unit switch on the dose field set to whatever your number is actually written in, and the arithmetic stays honest.";

export const compounds: Compound[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    title: "Retatrutide calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free retatrutide measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your retatrutide vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "Retatrutide reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "Retatrutide (also written LY3437943) is an investigational peptide developed by Eli Lilly and studied in clinical trials; it is not a marketed medicine.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "ClinicalTrials.gov — retatrutide studies",
        url: "https://clinicaltrials.gov/search?term=retatrutide",
      },
    ],
    faqs: [
      {
        q: "How do I work out retatrutide syringe units?",
        a: "Three steps of arithmetic. Concentration: vial milligrams ÷ water millilitres. Volume: your dose ÷ that concentration. Units: volume in mL × 100, because a U-100 syringe holds 100 units per mL. PepExact does all three and shows the working.",
      },
      {
        q: "How much water do I add to a retatrutide vial?",
        a: "That is your choice, and it changes the concentration rather than the amount of peptide in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator works backwards from the units you want to a water volume.",
      },
      {
        q: "Why do two people get different units for the same retatrutide dose?",
        a: "Because units depend on concentration, which depends on how much water was added. The same dose from a vial mixed with 1 mL versus 2 mL of water lands on a different number of units. Always recalculate when the vial or water changes.",
      },
      {
        q: "Does PepExact recommend a retatrutide dose?",
        a: "No. PepExact is a measurement tool. It converts numbers you already have into syringe units and never suggests what or how much to take.",
      },
    ],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    title: "BPC-157 calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free BPC-157 measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your BPC-157 vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "BPC-157 reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "BPC-157 (sometimes written as “Body Protection Compound-157”) is a synthetic peptide that has been examined in laboratory and animal research.",
      "BPC-157 vials are commonly labelled in milligrams — for example 5 mg or 10 mg. Enter whatever your vial actually says and the calculator handles the rest.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "PubMed — BPC-157 research literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC+157",
      },
    ],
    faqs: [
      {
        q: "How do I calculate BPC-157 syringe units?",
        a: "Concentration is vial milligrams ÷ water millilitres; volume is your dose ÷ that concentration; units are volume in mL × 100 on a U-100 insulin syringe. PepExact runs all three steps and shows the working so you can check it.",
      },
      {
        q: "How much water should I use to reconstitute BPC-157?",
        a: "The water volume is your choice and only changes the concentration, not how much peptide is in the vial. More water gives larger, easier-to-read draws; less water gives smaller ones. The reconstitution calculator solves for the water volume that lands a dose on a round number of units.",
      },
      {
        q: "Why do BPC-157 unit counts differ between calculators?",
        a: "Usually different assumptions about water volume, syringe type, or a mix-up between mg and mcg. Because PepExact shows every step, you can see exactly which number drove the result rather than trusting it blindly.",
      },
      {
        q: "Does PepExact tell me how much BPC-157 to take?",
        a: "No. It is a measurement calculator only. It converts a vial, a water volume, and a dose you already have into syringe units, and never recommends a dose.",
      },
    ],
  },
];

export const compoundBySlug = new Map(compounds.map((c) => [c.slug, c]));

export const compoundRoutes = compounds.map((c) => `/calculator/${c.slug}`);
