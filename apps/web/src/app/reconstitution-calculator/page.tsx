import type { Metadata } from "next";
import { calculateDiluent, fmt } from "@pepexact/engine";
import ReconstitutionCalculator from "@/components/ReconstitutionCalculator";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import { faqJsonLd, webAppJsonLd, webPageJsonLd } from "@/lib/site";

const TITLE = "Peptide Reconstitution Calculator | PepExact";
const DESCRIPTION =
  "Calculate how much bacteriostatic water to add from a supplied target amount and U-100 syringe mark. See concentration, draw volume and every formula used. No dosing advice.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/reconstitution-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/reconstitution-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** Matches default inputs in ReconstitutionCalculator. */
const EXAMPLE = {
  vialMg: 5,
  doseValue: 250,
  doseUnit: "mcg" as const,
  targetUnits: 10,
};

const exampleResult = calculateDiluent(EXAMPLE);

const faqs = [
  {
    q: "How much bacteriostatic water should I add?",
    a: "That is exactly what this calculator solves for. Enter the vial amount, a target amount supplied by an authorised source, and the U-100 syringe mark you want one draw to reach; it returns the millilitres of bacteriostatic water (BAC water) that produce that result, and shows every step. PepExact does not recommend a water volume — it only does the arithmetic on the numbers you provide, and physical vial capacity and product instructions must be considered separately.",
  },
  {
    q: "What does a peptide reconstitution calculator calculate?",
    a: "It calculates concentration and measurement values from the vial amount, water volume and user-supplied target amount. This reverse calculator can instead solve for water volume from a selected U-100 syringe mark.",
  },
  {
    q: "Why does water volume change the syringe units?",
    a: "Changing the water volume changes the concentration. A different concentration means the same user-supplied amount occupies a different liquid volume and therefore reaches a different U-100 syringe mark.",
  },
  {
    q: "Does PepExact recommend how much water to add?",
    a: "No. PepExact performs arithmetic using the values entered. It does not select a water volume, target amount or protocol.",
  },
  {
    q: "Why can two reconstitution calculators give different results?",
    a: "Results can differ when the calculators use different vial amounts, water volumes, mg-to-mcg conversions, syringe scales or rounding rules. Compare every input and intermediate calculation before comparing the final unit number.",
  },
  {
    q: "What does U-100 mean?",
    a: "U-100 means the syringe scale represents 100 units per millilitre. On that scale, 1 unit represents 0.01 mL.",
  },
];

export default function Page() {
  if (!exampleResult.ok) {
    throw new Error("Reconstitution example inputs failed engine validation");
  }

  const volumePerDoseMl = EXAMPLE.targetUnits / 100;
  const doseMcg = EXAMPLE.doseValue; // mcg
  const vialMcg = EXAMPLE.vialMg * 1000;

  return (
    <div className="space-y-10">
      <JsonLd
        data={webPageJsonLd({
          name: TITLE,
          path: "/reconstitution-calculator",
          description: DESCRIPTION,
        })}
      />
      <JsonLd
        data={webAppJsonLd({
          name: TITLE,
          path: "/reconstitution-calculator",
          description: DESCRIPTION,
        })}
      />
      <JsonLd data={faqJsonLd(faqs, "/reconstitution-calculator")} />
      <Breadcrumbs path="/reconstitution-calculator" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Peptide Reconstitution Calculator: Water &amp; Syringe Units
        </h1>
        <p className="max-w-xl text-ink-soft">
          Enter the vial amount and a target amount supplied by an authorised
          source, then choose the U-100 syringe mark you want the arithmetic to
          reach. PepExact calculates the corresponding volume of bacteriostatic
          water (BAC water) and the resulting concentration, with every formula
          shown.
        </p>
        <p className="max-w-xl text-ink-soft">
          This calculator works backwards from values you provide. It does not
          choose a target amount, recommend a reconstitution protocol or
          determine whether a compound is appropriate.
        </p>
      </header>

      <ReconstitutionCalculator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          How reverse reconstitution math works
        </h2>
        <p className="max-w-xl text-ink-soft">
          The tool solves for water volume from three inputs: the total amount
          in the vial, a user-supplied target amount, and the selected U-100
          syringe mark. The shared engine uses these steps (identical to the
          “Show the math” output):
        </p>
        <ol className="max-w-xl list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            Volume for one draw:{" "}
            <code className="text-ink">target units ÷ 100 units/mL</code>
          </li>
          <li>
            Required concentration:{" "}
            <code className="text-ink">
              target amount (mcg) ÷ volume per draw (mL)
            </code>
          </li>
          <li>
            Water to add:{" "}
            <code className="text-ink">
              vial amount (mcg) ÷ concentration (mcg/mL)
            </code>
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          How water volume changes concentration
        </h2>
        <p className="max-w-xl text-ink-soft">
          The volume of water changes the concentration, not the total amount
          contained in the vial. More water produces a lower concentration and a
          larger liquid volume for the same user-supplied amount. Less water
          produces a higher concentration and a smaller liquid volume.
        </p>
        <p className="max-w-xl text-ink-soft">
          PepExact calculates the arithmetic only. It does not recommend a water
          volume. Product instructions, physical vial capacity and authorised
          protocols must be considered separately.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Illustrative reverse-reconstitution calculation
        </h2>
        <p className="text-sm font-medium text-ink">
          Illustrative arithmetic only—not a recommended amount or protocol.
        </p>
        <p className="max-w-xl text-sm text-ink-soft">
          Using the same default values preloaded in the calculator above (
          {fmt(EXAMPLE.vialMg, 0)} mg vial, {fmt(EXAMPLE.doseValue, 0)}{" "}
          {EXAMPLE.doseUnit} target amount, {fmt(EXAMPLE.targetUnits, 0)} U-100
          units):
        </p>
        <ul className="max-w-xl space-y-2 font-mono text-sm text-ink-soft">
          <li>
            Volume for one draw = {fmt(EXAMPLE.targetUnits, 1)} ÷ 100 ={" "}
            {fmt(volumePerDoseMl, 3)} mL
          </li>
          <li>
            Concentration = {fmt(doseMcg)} mcg ÷ {fmt(volumePerDoseMl, 3)} mL ={" "}
            {fmt(exampleResult.concentrationMcgPerMl)} mcg/mL (
            {fmt(exampleResult.concentrationMgPerMl, 3)} mg/mL)
          </li>
          <li>
            Water to add = {fmt(vialMcg)} mcg ÷{" "}
            {fmt(exampleResult.concentrationMcgPerMl)} mcg/mL ={" "}
            {fmt(exampleResult.diluentMl, 2)} mL
          </li>
          <li>
            Corresponding U-100 mark = {fmt(EXAMPLE.targetUnits, 0)} units (
            {fmt(volumePerDoseMl, 3)} mL)
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Reconstitution calculator questions
        </h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-line bg-surface px-4 py-3"
            >
              <summary className="cursor-pointer select-none text-sm font-medium text-ink">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools path="/reconstitution-calculator" />

      <p className="text-xs text-ink-soft">
        PepExact is a measurement tool, not medical advice. It calculates
        volumes and concentrations from numbers you provide — it never suggests
        a dose.
      </p>
    </div>
  );
}
