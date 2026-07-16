import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculation methodology — how PepExact does the arithmetic",
  description:
    "How PepExact converts vial mg, water mL, and a user-supplied dose into concentration, volume, and U-100 syringe units. Transparent formulas only — no dosing advice.",
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
        <h2 className="text-xl font-semibold">Units and validation</h2>
        <p className="text-ink-soft">
          Milligrams and micrograms differ by 1,000 (1 mg = 1,000 mcg). Mixing
          them up is the most common arithmetic slip — see{" "}
          <Link href="/guides/mg-vs-mcg" className="text-accent hover:underline">
            mg vs mcg
          </Link>
          . The engine warns on empty or invalid inputs, draws that exceed a
          common syringe capacity, and other measurable inconsistencies; it still
          does not recommend what you should enter.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Engine parity</h2>
        <p className="text-ink-soft">
          Web calculators call the shared <code>@pepexact/engine</code> package.
          The same formulas are covered by automated tests in the repo so future
          clients (including a planned iOS app) can stay numerically aligned.
          Compound pages use the same calculator; only headings and educational
          context change.
        </p>
        <p className="text-ink-soft">
          Try it on the{" "}
          <Link href="/peptide-calculator" className="text-accent hover:underline">
            peptide calculator
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
