import type { Metadata } from "next";
import Link from "next/link";
import PeptideCalculator from "@/components/PeptideCalculator";
import CompoundLinks from "@/components/CompoundLinks";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import { faqJsonLd, siteName, webAppJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peptide Calculator — Reconstitution & Syringe Units",
  description:
    "Enter vial size, water volume and a user-supplied target amount to calculate concentration, draw volume and U-100 syringe units, with every step shown. No dosing advice.",
  alternates: { canonical: "/peptide-calculator" },
  openGraph: {
    title: "Peptide Calculator — Reconstitution & Syringe Units",
    description:
      "Enter vial size, water volume and a user-supplied target amount to calculate concentration, draw volume and U-100 syringe units, with every step shown.",
    url: "/peptide-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Calculator — Reconstitution & Syringe Units",
    description:
      "Vial, water, and a user-supplied amount → concentration, draw volume, and U-100 syringe units, with the math shown.",
  },
};

const faqs = [
  {
    q: "How does a peptide calculator work?",
    a: "It is three steps of arithmetic. First, concentration: the mg in the vial divided by the mL of water added. Second, volume: your dose divided by that concentration. Third, syringe units: volume in mL multiplied by 100, because a U-100 insulin syringe holds 100 units per mL.",
  },
  {
    q: "How many units is my dose?",
    a: "It depends entirely on how much water was added to the vial. Example: a 5 mg vial reconstituted with 2 mL of water is 2.5 mg/mL. A 250 mcg dose is then 0.1 mL, which is 10 units on a U-100 syringe. The same dose from the same vial with 1 mL of water would be 5 units. PepExact does not recommend that example amount — it only illustrates the arithmetic.",
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
    <article className="space-y-10">
      <JsonLd
        data={webAppJsonLd({
          name: "PepExact Peptide Calculator",
          path: "/peptide-calculator",
          description:
            "Free peptide measurement and reconstitution calculator: vial mg, water mL, and a user-supplied dose in — concentration, draw volume, and U-100 syringe units out, with the math shown.",
        })}
      />
      <JsonLd data={faqJsonLd(faqs, "/peptide-calculator")} />
      <Breadcrumbs path="/peptide-calculator" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Peptide Calculator — reconstitution &amp; syringe units
        </h1>
        <p className="max-w-xl text-ink-soft">
          {siteName} converts vial size, water volume, and a{" "}
          <strong className="font-medium text-ink">user-supplied</strong> target
          amount into concentration, draw volume, and U-100 syringe units — with
          every step shown. It does not choose a dose or recommend a peptide.
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-ink-soft">
          <li>Free · no login</li>
          <li>Every step shown</li>
          <li>Nothing to sell you</li>
        </ul>
      </header>

      <section aria-labelledby="calc-title" className="space-y-3">
        <h2 id="calc-title" className="sr-only">
          Calculate peptide measurements
        </h2>
        <PeptideCalculator />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What this peptide calculator calculates</h2>
        <p className="text-ink-soft">
          A peptide reconstitution calculator applies the same unit-conversion
          formula regardless of the compound name. Enter values from an
          authorized product label, validated laboratory protocol, pharmacist, or
          licensed healthcare professional. {siteName} does not select or
          recommend a target amount.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-ink-soft">
          <li>
            <strong className="text-ink">Concentration</strong> — vial contents
            (mg) ÷ water added (mL) = mg per mL (also shown in mcg/mL).
          </li>
          <li>
            <strong className="text-ink">Draw volume</strong> — your target amount
            ÷ concentration = mL to draw.
          </li>
          <li>
            <strong className="text-ink">U-100 syringe units</strong> — mL × 100,
            because a U-100 syringe holds 100 units per mL.
          </li>
        </ol>
        <p className="rounded-xl bg-accent-soft/60 px-4 py-3 font-medium text-sm">
          (target mcg ÷ concentration in mcg/mL) × 100 = U-100 syringe units
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">mg vs mcg and common input errors</h2>
        <p className="text-ink-soft">
          Milligrams and micrograms differ by a factor of 1,000:{" "}
          <strong className="text-ink">1 mg = 1,000 mcg</strong>. Mixing them up
          is the most common arithmetic slip. Keep the dose-field unit switch set
          to whatever your number is actually written in. See the{" "}
          <Link href="/guides/mg-vs-mcg" className="text-accent hover:underline">
            mg vs mcg guide
          </Link>{" "}
          and the{" "}
          <Link
            href="/mg-to-mcg-converter"
            className="text-accent hover:underline"
          >
            mg to mcg converter
          </Link>
          .
        </p>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Assuming a water volume instead of entering the volume you used</li>
          <li>Using a non–U-100 syringe scale without converting</li>
          <li>Comparing results that used different rounding rules</li>
        </ul>
        <p className="text-ink-soft">
          If another tool disagreed with yours, read{" "}
          <Link
            href="/guides/why-calculators-disagree"
            className="text-accent hover:underline"
          >
            why calculators disagree
          </Link>
          . To solve for water from a target draw, use the{" "}
          <Link
            href="/reconstitution-calculator"
            className="text-accent hover:underline"
          >
            reconstitution calculator
          </Link>
          . For unit marks alone, see the{" "}
          <Link
            href="/syringe-units-calculator"
            className="text-accent hover:underline"
          >
            syringe units calculator
          </Link>{" "}
          or the{" "}
          <Link
            href="/guides/how-to-read-an-insulin-syringe"
            className="text-accent hover:underline"
          >
            insulin syringe guide
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Popular compound calculators</h2>
        <p className="text-ink-soft">
          Need compound-specific context? These pages use the same engine — only
          the educational copy changes:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>
            <Link
              href="/calculator/bpc-157"
              className="text-accent hover:underline"
            >
              BPC-157 calculator
            </Link>{" "}
            — reconstitution &amp; syringe units for BPC 157 measurement math
          </li>
          <li>
            <Link
              href="/calculator/retatrutide"
              className="text-accent hover:underline"
            >
              Retatrutide calculator
            </Link>{" "}
            — also searched as reta peptide / peptide retatrutide
          </li>
        </ul>
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

      <section id="compounds" className="scroll-mt-20 space-y-3">
        <h2 className="text-xl font-semibold">All compound calculators</h2>
        <p className="text-ink-soft">
          Same calculator, same engine — the math is identical; only the heading
          and context change.
        </p>
        <CompoundLinks />
      </section>

      <RelatedTools path="/peptide-calculator" heading="Related tools & guides" />

      <p className="text-xs text-ink-soft">
        {siteName} is a measurement tool, not medical advice. It never suggests
        what or how much to take — it only does the arithmetic on numbers you
        already have. It does not verify identity, purity, sterility, legality,
        or approval. See{" "}
        <Link href="/methodology" className="text-accent hover:underline">
          methodology
        </Link>{" "}
        and{" "}
        <Link href="/editorial-policy" className="text-accent hover:underline">
          editorial policy
        </Link>
        .
      </p>
    </article>
  );
}
