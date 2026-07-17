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

/** Optional extra H2 blocks (identity / research context). Must stay §5-safe. */
export interface CompoundSection {
  heading: string;
  paragraphs: string[];
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
  /** Visible H1; defaults to "{name} calculator" if omitted. */
  h1?: string;
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
  /** Extra sourced identity / research-context sections (no efficacy claims). */
  sections?: CompoundSection[];
  /** Primary-source links backing any status/fact claim above. */
  sources?: CompoundSource[];
  faqs?: CompoundFaq[];
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
    title: "Retatrutide Reconstitution Calculator | PepExact",
    h1: "Retatrutide calculator — reconstitution & syringe units",
    metaDescription:
      "Retatrutide reconstitution calculator for vial mg, water mL and a supplied amount. Calculate concentration, draw volume and U-100 syringe units.",
    intro:
      "Use this retatrutide measurement calculator when you already have a vial size, a water volume, and a target amount from an authorized source. PepExact returns concentration, draw volume, and U-100 syringe units — and shows the arithmetic. It does not choose a dose or protocol.",
    summary:
      "Retatrutide reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutHeading: "What this retatrutide calculator does",
    aboutParagraphs: [
      "The compound name does not change the arithmetic. Retatrutide reconstitution math is the same three steps as any other peptide on PepExact: concentration from vial ÷ water, draw volume from dose ÷ concentration, then U-100 units from volume × 100.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sections: [
      {
        heading: "What retatrutide is (identity, not advice)",
        paragraphs: [
          "Retatrutide (also written LY3437943, and often searched as “reta peptide” or “peptide retatrutide”) is an investigational peptide developed by Eli Lilly. Public trial records describe it as an agonist that acts on GIP, GLP-1, and glucagon receptors.",
          "It is studied in registered clinical trials; it is not presented here as a marketed medicine, and PepExact does not assess whether it is appropriate for anyone. For trial listings, use the ClinicalTrials.gov search linked below.",
          "Popular interest in “reta peptide” math usually means converting a labelled vial mass and a chosen water volume into readable syringe marks. That conversion is what this page calculates — nothing more.",
        ],
      },
      {
        heading: "Research context (primary sources only)",
        paragraphs: [
          "Clinical trial registrations for retatrutide list study designs that measure outcomes related to body weight and glycemic markers, among other endpoints. That is a description of what trials record — not a claim that PepExact endorses use, predicts results, or recommends any amount.",
          "If you need regulatory or medical status for a specific product or country, consult the relevant authority (for example FDA, MHRA, or TGA) and a licensed professional. PepExact does not provide that determination.",
        ],
      },
    ],
    sources: [
      {
        label: "ClinicalTrials.gov — retatrutide studies",
        url: "https://clinicaltrials.gov/search?term=retatrutide",
      },
      {
        label: "PubMed — retatrutide literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=retatrutide",
      },
    ],
    faqs: [
      {
        q: "How do I work out retatrutide (reta peptide) syringe units?",
        a: "Three steps of arithmetic. Concentration: vial milligrams ÷ water millilitres. Volume: your dose ÷ that concentration. Units: volume in mL × 100, because a U-100 syringe holds 100 units per mL. PepExact does all three and shows the working.",
      },
      {
        q: "Does the name retatrutide change the calculation?",
        a: "No. PepExact uses the same engine for every compound page. Only the heading and educational context change; the formulas stay identical.",
      },
      {
        q: "How much water do I add to a retatrutide vial?",
        a: "That is your choice, and it changes the concentration rather than the amount of peptide in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator works backwards from the units you want to a water volume. PepExact does not recommend a water volume.",
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
    title: "BPC-157 Calculator: Reconstitution & Syringe Units | PepExact",
    h1: "BPC-157 calculator — reconstitution & syringe units",
    metaDescription:
      "BPC-157 calculator for vial, water and supplied-amount conversions. See concentration, draw volume and U-100 syringe units. No dosing advice.",
    intro:
      "Use this BPC-157 (BPC 157) measurement calculator when you already have a vial size, a water volume, and a target amount from an authorized source. PepExact returns concentration, draw volume, and U-100 syringe units — with the math shown. It does not choose a dose or protocol.",
    summary:
      "BPC-157 reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutHeading: "What this BPC-157 calculator does",
    aboutParagraphs: [
      "The compound name does not change the arithmetic. BPC-157 reconstitution math is the same three steps as any other peptide on PepExact: concentration from vial ÷ water, draw volume from dose ÷ concentration, then U-100 units from volume × 100.",
      "BPC-157 vials are commonly labelled in milligrams — for example 5 mg or 10 mg — while individual amounts are often discussed in micrograms. Enter whatever your vial and dose labels actually say; keep mg and mcg distinct (1 mg = 1,000 mcg).",
      MEASUREMENT_PARAGRAPH,
    ],
    sections: [
      {
        heading: "What BPC-157 is (identity, not advice)",
        paragraphs: [
          "BPC-157 (also written BPC 157, sometimes expanded as “Body Protection Compound-157”) is a synthetic peptide sequence that appears in laboratory and animal research literature indexed on PubMed.",
          "PepExact does not claim that BPC-157 treats, cures, or prevents any condition. This page exists so measurement arithmetic — vial, water, and a user-supplied amount — can be checked transparently.",
          "Searches for a “BPC 157 calculator” usually mean converting labelled milligrams and a chosen water volume into U-100 syringe marks. That conversion is what this tool calculates.",
        ],
      },
      {
        heading: "Research context (primary sources only)",
        paragraphs: [
          "Published preclinical papers discuss BPC-157 in a range of experimental models. Those papers are not dosing instructions, and this site does not summarise them as medical guidance. Use the PubMed search below to read primary literature.",
          "Regulatory status varies by country and presentation. PepExact does not determine legality or approval. See the FDA, MHRA, and TGA links on the peptide regulators guide when you need an authoritative government source.",
        ],
      },
    ],
    sources: [
      {
        label: "PubMed — BPC-157 research literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC+157",
      },
    ],
    faqs: [
      {
        q: "How do I calculate BPC 157 syringe units after reconstitution?",
        a: "Concentration is vial milligrams ÷ water millilitres; volume is your dose ÷ that concentration; units are volume in mL × 100 on a U-100 insulin syringe. PepExact runs all three steps and shows the working so you can check it.",
      },
      {
        q: "Does the name BPC-157 change the calculation?",
        a: "No. PepExact uses the same engine for every compound page. Only the heading and educational context change; the formulas stay identical.",
      },
      {
        q: "Why does BPC-157 math mix mg and mcg?",
        a: "Vials are usually labelled in mg; many target amounts are written in mcg. 1 mg equals 1,000 mcg. If those units are swapped, the result is off by a thousand. PepExact keeps both units visible in the working.",
      },
      {
        q: "How much water should I use to reconstitute BPC-157?",
        a: "The water volume is your choice and only changes the concentration, not how much peptide is in the vial. More water gives larger, easier-to-read draws; less water gives smaller ones. The reconstitution calculator solves for the water volume that lands a dose on a round number of units. PepExact does not recommend a water volume.",
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
  {
    slug: "tb-500",
    name: "TB-500",
    title: "TB-500 calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free TB-500 measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your TB-500 vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "TB-500 reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "TB-500 is a synthetic peptide related to a fragment of thymosin beta-4, a protein that occurs naturally in the body. It has been examined in laboratory research.",
      "TB-500 vials are commonly labelled in milligrams — for example 2 mg, 5 mg, or 10 mg. Enter whatever your vial actually says and the calculator handles the rest.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "PubMed — thymosin beta-4 research literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+beta-4",
      },
    ],
    faqs: [
      {
        q: "How do I calculate TB-500 syringe units?",
        a: "Concentration is vial milligrams ÷ water millilitres; volume is your dose ÷ that concentration; units are volume in mL × 100 on a U-100 insulin syringe. PepExact runs all three steps and shows the working.",
      },
      {
        q: "How much water should I use to reconstitute TB-500?",
        a: "The water volume is your choice and changes only the concentration, not how much peptide is in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator solves for the water volume that lands a dose on a round number of units.",
      },
      {
        q: "Why do TB-500 unit counts differ between calculators?",
        a: "Usually a different water volume, a different syringe type, or a mix-up between mg and mcg. Because PepExact shows every step, you can see which number produced the result instead of trusting it blindly.",
      },
      {
        q: "Does PepExact recommend a TB-500 dose?",
        a: "No. It is a measurement calculator only. It converts a vial, a water volume, and a dose you already have into syringe units, and never suggests a dose.",
      },
    ],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    title: "GHK-Cu calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free GHK-Cu measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your GHK-Cu vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "GHK-Cu reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "GHK-Cu (copper tripeptide-1) is a copper-binding peptide best known as an ingredient in cosmetic skincare. It has also been studied in laboratory research.",
      "GHK-Cu vials are commonly labelled in milligrams. Enter whatever your vial actually says, along with the water you added and the dose you are measuring, and the calculator does the rest.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "PubMed — GHK-Cu / copper peptide research literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+copper+peptide",
      },
    ],
    faqs: [
      {
        q: "How do I calculate GHK-Cu syringe units?",
        a: "Concentration is vial milligrams ÷ water millilitres; volume is your dose ÷ that concentration; units are volume in mL × 100 on a U-100 insulin syringe. PepExact runs all three steps and shows the working.",
      },
      {
        q: "How much water should I use to reconstitute GHK-Cu?",
        a: "The water volume is your choice and changes only the concentration, not how much peptide is in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator solves for the water volume that lands a dose on a round number of units.",
      },
      {
        q: "Why do GHK-Cu unit counts differ between calculators?",
        a: "Usually a different water volume, a different syringe type, or a mix-up between mg and mcg. Because PepExact shows every step, you can see which number produced the result instead of trusting it blindly.",
      },
      {
        q: "Does PepExact recommend how to use GHK-Cu?",
        a: "No. It is a measurement calculator only. It converts a vial, a water volume, and a dose you already have into syringe units, and never suggests a dose or a way to use anything.",
      },
    ],
  },
  {
    slug: "melanotan-2",
    name: "Melanotan II",
    title: "Melanotan II calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free Melanotan II (MT2) measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your Melanotan II vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "Melanotan II reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "Melanotan II (also written Melanotan 2 or MT2) is a synthetic peptide analog of alpha-melanocyte-stimulating hormone (α-MSH), a naturally occurring hormone.",
      "Melanotan II vials are commonly labelled in milligrams — often 10 mg. Enter whatever your vial actually says, along with the water you added and the dose you are measuring.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "PubMed — melanotan II research literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=melanotan+II",
      },
    ],
    faqs: [
      {
        q: "How do I calculate Melanotan II syringe units?",
        a: "Concentration is vial milligrams ÷ water millilitres; volume is your dose ÷ that concentration; units are volume in mL × 100 on a U-100 insulin syringe. PepExact runs all three steps and shows the working.",
      },
      {
        q: "How much water should I use to reconstitute a Melanotan II vial?",
        a: "The water volume is your choice and changes only the concentration, not how much peptide is in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator solves for the water volume that lands a dose on a round number of units.",
      },
      {
        q: "Why do Melanotan II unit counts differ between calculators?",
        a: "Usually a different water volume, a different syringe type, or a mix-up between mg and mcg. Because PepExact shows every step, you can see which number produced the result instead of trusting it blindly.",
      },
      {
        q: "Does PepExact recommend a Melanotan II dose?",
        a: "No. It is a measurement calculator only. It converts a vial, a water volume, and a dose you already have into syringe units, and never suggests a dose.",
      },
    ],
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    title: "MOTS-c calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free MOTS-c measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your MOTS-c vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "MOTS-c reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "MOTS-c is a mitochondrial-derived peptide — a short peptide linked to mitochondrial DNA — that has been examined in laboratory research.",
      "MOTS-c vials are commonly labelled in milligrams. Enter whatever your vial actually says, along with your water and dose, and the calculator does the rest.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "PubMed — MOTS-c research literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=MOTS-c",
      },
    ],
    faqs: [
      {
        q: "How do I calculate MOTS-c syringe units?",
        a: "Concentration is vial milligrams ÷ water millilitres; volume is your dose ÷ that concentration; units are volume in mL × 100 on a U-100 insulin syringe. PepExact runs all three steps and shows the working.",
      },
      {
        q: "How much water should I use to reconstitute MOTS-c?",
        a: "The water volume is your choice and changes only the concentration, not how much peptide is in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator solves for the water volume that lands a dose on a round number of units.",
      },
      {
        q: "Does PepExact recommend a MOTS-c dose?",
        a: "No. It is a measurement calculator only. It converts a vial, a water volume, and a dose you already have into syringe units, and never suggests a dose.",
      },
    ],
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    title: "AOD-9604 calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free AOD-9604 measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your AOD-9604 vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "AOD-9604 reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "AOD-9604 is a synthetic peptide based on a fragment of human growth hormone (hGH), sometimes written as the hGH 176–191 fragment. It has been examined in laboratory and clinical research.",
      "AOD-9604 vials are commonly labelled in milligrams. Enter whatever your vial actually says, along with your water and dose, and the calculator does the rest.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "PubMed — AOD-9604 research literature",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=AOD9604",
      },
    ],
    faqs: [
      {
        q: "How do I calculate AOD-9604 syringe units?",
        a: "Concentration is vial milligrams ÷ water millilitres; volume is your dose ÷ that concentration; units are volume in mL × 100 on a U-100 insulin syringe. PepExact runs all three steps and shows the working.",
      },
      {
        q: "How much water should I use to reconstitute AOD-9604?",
        a: "The water volume is your choice and changes only the concentration, not how much peptide is in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator solves for the water volume that lands a dose on a round number of units.",
      },
      {
        q: "Why do AOD-9604 unit counts differ between calculators?",
        a: "Usually a different water volume, a different syringe type, or a mix-up between mg and mcg. Because PepExact shows every step, you can see which number produced the result instead of trusting it blindly.",
      },
      {
        q: "Does PepExact recommend an AOD-9604 dose?",
        a: "No. It is a measurement calculator only. It converts a vial, a water volume, and a dose you already have into syringe units, and never suggests a dose.",
      },
    ],
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    title: "Semaglutide calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free semaglutide measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your semaglutide vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "Semaglutide reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "Semaglutide is a synthetic peptide that acts as a glucagon-like peptide-1 (GLP-1) receptor agonist and has been studied extensively in clinical trials.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "ClinicalTrials.gov — semaglutide studies",
        url: "https://clinicaltrials.gov/search?term=semaglutide",
      },
    ],
    faqs: [
      {
        q: "How do I work out semaglutide syringe units?",
        a: "Three steps of arithmetic. Concentration: vial milligrams ÷ water millilitres. Volume: your dose ÷ that concentration. Units: volume in mL × 100, because a U-100 syringe holds 100 units per mL. PepExact does all three and shows the working.",
      },
      {
        q: "How much water do I add to a semaglutide vial?",
        a: "That is your choice, and it changes the concentration rather than the amount of peptide in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator works backwards from the units you want to a water volume.",
      },
      {
        q: "Why do two people get different units for the same semaglutide dose?",
        a: "Because units depend on concentration, which depends on how much water was added. The same dose from a vial mixed with 1 mL versus 2 mL of water lands on a different number of units. Always recalculate when the vial or water changes.",
      },
      {
        q: "Does PepExact recommend a semaglutide dose?",
        a: "No. PepExact is a measurement tool. It converts numbers you already have into syringe units and never suggests what or how much to take.",
      },
    ],
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    title: "Tirzepatide calculator — vial, water, dose → syringe units",
    metaDescription:
      "Free tirzepatide measurement calculator: enter vial size (mg), water (mL), and a dose to get exact U-100 syringe units and concentration, with the math shown. No dosing advice.",
    intro:
      "Enter your tirzepatide vial size, the water you added, and a dose. PepExact returns the exact units on a U-100 insulin syringe — and shows the arithmetic behind it.",
    summary:
      "Tirzepatide reconstitution and syringe-unit calculator: vial mg, water mL, and dose in — exact U-100 units out, with the math shown.",
    example: GENERIC_EXAMPLE,
    aboutParagraphs: [
      "Tirzepatide is a synthetic peptide that acts on both glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors and has been studied extensively in clinical trials.",
      MEASUREMENT_PARAGRAPH,
      MG_MCG_PARAGRAPH,
    ],
    sources: [
      {
        label: "ClinicalTrials.gov — tirzepatide studies",
        url: "https://clinicaltrials.gov/search?term=tirzepatide",
      },
    ],
    faqs: [
      {
        q: "How do I work out tirzepatide syringe units?",
        a: "Three steps of arithmetic. Concentration: vial milligrams ÷ water millilitres. Volume: your dose ÷ that concentration. Units: volume in mL × 100, because a U-100 syringe holds 100 units per mL. PepExact does all three and shows the working.",
      },
      {
        q: "How much water do I add to a tirzepatide vial?",
        a: "That is your choice, and it changes the concentration rather than the amount of peptide in the vial. More water makes each draw larger and easier to read; less water makes it smaller. The reconstitution calculator works backwards from the units you want to a water volume.",
      },
      {
        q: "Why do two people get different units for the same tirzepatide dose?",
        a: "Because units depend on concentration, which depends on how much water was added. The same dose from a vial mixed with 1 mL versus 2 mL of water lands on a different number of units. Always recalculate when the vial or water changes.",
      },
      {
        q: "Does PepExact recommend a tirzepatide dose?",
        a: "No. PepExact is a measurement tool. It converts numbers you already have into syringe units and never suggests what or how much to take.",
      },
    ],
  },
];

export const compoundBySlug = new Map(compounds.map((c) => [c.slug, c]));
