import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculation methodology — how PepExact does the arithmetic",
  description:
    "How PepExact converts vial mg, water mL, and a user-supplied dose into concentration, volume, and U-100 syringe units. Formulas, units, rounding, validation, and limitations — no dosing advice.",
  alternates: { canonical: "/methodology" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <Breadcrumbs path="/methodology" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Calculation methodology
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          {siteName} only does arithmetic on numbers you enter. It never chooses
          a dose, a water volume, or a protocol.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">The three steps</h2>
        <ol className="list-decimal space-y-2 pl-5 text-ink-soft">
          <li>
            <strong className="text-ink">Concentration</strong> — vial contents
            (mg) ÷ water added (mL) = mg per mL (shown with mcg equivalents).
          </li>
          <li>
            <strong className="text-ink">Volume</strong> — your dose ÷
            concentration = mL to draw.
          </li>
          <li>
            <strong className="text-ink">Units</strong> — mL × 100 = marks on a
            U-100 insulin syringe (100 units per mL).
          </li>
        </ol>
        <p className="rounded-xl bg-accent-soft/60 px-4 py-3 font-medium text-sm">
          (dose in mcg ÷ concentration in mcg/mL) × 100 = U-100 syringe units
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Supported units and assumptions</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Mass: milligrams (mg) and micrograms (mcg); 1 mg = 1,000 mcg</li>
          <li>Volume: millilitres (mL)</li>
          <li>
            Syringe scale: <strong className="text-ink">U-100</strong> — 100
            units per mL (1 unit = 0.01 mL), for 0.3 / 0.5 / 1.0 mL barrels
          </li>
        </ul>
        <p className="text-ink-soft">
          See{" "}
          <Link href="/guides/mg-vs-mcg" className="text-accent hover:underline">
            mg vs mcg
          </Link>{" "}
          and{" "}
          <Link
            href="/guides/how-to-read-an-insulin-syringe"
            className="text-accent hover:underline"
          >
            how to read an insulin syringe
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Rounding and display</h2>
        <p className="text-ink-soft">
          The shared engine rounds intermediate values for display (for example
          units to a practical number of decimals) using a stable{" "}
          <code>roundTo</code> helper. Visible working steps use locale-stable
          formatting. If a result falls between syringe tick marks, a warning may
          note the nearest whole unit — that is measurement feedback, not a dose
          recommendation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Input validation</h2>
        <p className="text-ink-soft">
          Non-positive or non-finite inputs are rejected. The engine may warn
          when a calculated draw exceeds a selected syringe capacity, when a dose
          exceeds the vial mass entered, or when a draw is extremely small. Warnings
          do not invent missing inputs or choose values for you.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Engine testing and parity</h2>
        <p className="text-ink-soft">
          Web calculators call the shared <code>@pepexact/engine</code> package.
          Automated tests cover unit conversion, draw calculation, diluent
          calculation, and round-trip consistency so future clients (including a
          planned iOS app) can stay numerically aligned. Compound pages use the
          same calculator; only headings and educational context change.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Limitations</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Does not verify product identity, purity, or sterility</li>
          <li>Does not determine legality or regulatory approval</li>
          <li>Does not recommend peptides, amounts, water volumes, or protocols</li>
          <li>Assumes U-100 unless you convert for another scale yourself</li>
        </ul>
        <p className="text-ink-soft">
          Try the{" "}
          <Link href="/peptide-calculator" className="text-accent hover:underline">
            peptide calculator
          </Link>
          . Policy:{" "}
          <Link
            href="/editorial-policy"
            className="text-accent hover:underline"
          >
            editorial policy
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-ink-soft">
        {siteName} is a measurement tool, not medical advice. It never suggests
        what or how much to take.
      </p>
    </article>
  );
}
