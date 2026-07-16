import type { Metadata } from "next";
import Link from "next/link";
import PeptideCalculator from "@/components/PeptideCalculator";
import CompoundLinks from "@/components/CompoundLinks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, webAppJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peptide Calculator — mg to syringe units, instantly",
  description:
    "Free peptide dose calculator. Enter vial size, water, and dose to get exact syringe units, concentration, and doses per vial — with the math shown. No login, no sales.",
  alternates: { canonical: "/peptide-calculator" },
};

const faqs = [
  {
    q: "How does a peptide calculator work?",
    a: "It is three steps of arithmetic. First, concentration: the mg in the vial divided by the mL of water added. Second, volume: your dose divided by that concentration. Third, syringe units: volume in mL multiplied by 100, because a U-100 insulin syringe holds 100 units per mL.",
  },
  {
    q: "How many units is my dose?",
    a: "It depends entirely on how much water was added to the vial. Example: a 5 mg vial reconstituted with 2 mL of water is 2.5 mg/mL. A 250 mcg dose is then 0.1 mL, which is 10 units on a U-100 syringe. The same dose from the same vial with 1 mL of water would be 5 units.",
  },
  {
    q: "What syringe do the units refer to?",
    a: "U-100 insulin syringes, the most common type. U-100 means 100 units per mL, so 1 unit is always 0.01 mL — whether the syringe is a 0.3 mL, 0.5 mL, or 1.0 mL size.",
  },
  {
    q: "Why do different peptide calculators give different answers?",
    a: "Usually rounding, unit confusion (mg vs mcg), or assumptions about syringe type. PepExact shows every step of the working so you can verify the number rather than trust it blindly.",
  },
];

export default function Page() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={webAppJsonLd({
          name: "PepExact Peptide Calculator",
          path: "/peptide-calculator",
          description:
            "Free peptide dose calculator: vial mg, water mL, and dose in — exact U-100 syringe units out, with the math shown.",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Peptide Calculator", path: "/peptide-calculator" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Peptide calculator
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Enter what&apos;s in the vial, the water you added, and your dose.
          PepExact gives you the exact units on the syringe — and shows the
          math.
        </p>
      </header>

      <PeptideCalculator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How the calculation works</h2>
        <p className="text-ink-soft">
          Every peptide dose calculation is the same three steps of arithmetic,
          whatever the compound:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-ink-soft">
          <li>
            <strong className="text-ink">Concentration</strong> — vial contents
            (mg) ÷ water added (mL) = mg per mL.
          </li>
          <li>
            <strong className="text-ink">Volume</strong> — your dose ÷
            concentration = mL to draw.
          </li>
          <li>
            <strong className="text-ink">Units</strong> — mL × 100 = marks on a
            U-100 insulin syringe.
          </li>
        </ol>
        <p className="text-ink-soft">
          The most common error is a units mix-up: 1 mg is 1,000 mcg, so
          confusing the two shifts a dose by a factor of a thousand. PepExact
          keeps mg and mcg explicit at every step. If another calculator gave
          you a different number, here is{" "}
          <Link
            href="/guides/why-calculators-disagree"
            className="text-accent hover:underline"
          >
            why two calculators disagree
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-line bg-surface px-4 py-3"
            >
              <summary className="cursor-pointer select-none font-medium">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Compound calculators</h2>
        <p className="text-ink-soft">
          Prefer to start from a specific compound name? These open the same
          calculator, on the same engine — the math is identical, only the
          heading changes.
        </p>
        <CompoundLinks />
      </section>

      <p className="text-xs text-ink-soft">
        PepExact is a measurement tool, not medical advice. It never suggests
        what or how much to take — it only does the arithmetic on numbers you
        already have.
      </p>
    </div>
  );
}
