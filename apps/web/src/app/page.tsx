import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui";
import CompoundLinks from "@/components/CompoundLinks";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, siteName, websiteJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteName} — the independent peptide calculator`,
  description:
    "Vial, water, dose in — exact syringe units out, with the math shown. Free peptide calculator, reconstitution calculator, and unit converters. No sales, no advice.",
  alternates: { canonical: "/" },
};

const tools = [
  {
    href: "/peptide-calculator",
    title: "Peptide calculator",
    body: "Vial, water, dose → exact units on your syringe, with every step of the math shown.",
  },
  {
    href: "/reconstitution-calculator",
    title: "Reconstitution calculator",
    body: "Work backwards: pick the draw you want, get the exact water to add.",
  },
  {
    href: "/mg-to-mcg-converter",
    title: "mg ⇄ mcg converter",
    body: "The conversion behind most dosing mistakes, done instantly and correctly.",
  },
  {
    href: "/syringe-units-calculator",
    title: "Syringe units ⇄ mL",
    body: "Translate U-100 insulin syringe units to millilitres and back.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-14">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="pt-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Get the draw right.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
          {siteName} turns vial, water, and dose into an exact syringe
          measurement — with the math shown, every time.
        </p>
        <Link
          href="/peptide-calculator"
          className="mt-8 inline-block rounded-xl bg-accent px-6 py-3.5 font-medium text-white transition-opacity hover:opacity-90"
        >
          Open the peptide calculator
        </Link>
        <p className="mt-3 text-xs text-ink-soft">
          Free · no login · nothing to sell you
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Calculators
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="group">
              <Card className="h-full transition-colors group-hover:border-accent">
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{t.body}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Compound calculators
        </h2>
        <p className="mb-4 max-w-xl text-sm text-ink-soft">
          The same calculator, opened on a specific compound name. Each shows
          the working and never suggests a dose. High-interest entry pages:
        </p>
        <ul className="mb-4 space-y-2 text-sm">
          <li>
            <Link
              href="/calculator/bpc-157"
              className="font-medium text-accent hover:underline"
            >
              BPC-157 calculator
            </Link>
            <span className="text-ink-soft">
              {" "}
              — reconstitution &amp; syringe units
            </span>
          </li>
          <li>
            <Link
              href="/calculator/retatrutide"
              className="font-medium text-accent hover:underline"
            >
              Retatrutide calculator
            </Link>
            <span className="text-ink-soft">
              {" "}
              — also searched as reta peptide
            </span>
          </li>
        </ul>
        <CompoundLinks />
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Why trust the number
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <h3 className="font-semibold">The math is shown</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Every result expands into its working steps, so you can check it
              yourself.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold">One engine everywhere</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              The website and the app share the same calculation engine —
              identical inputs, identical results.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold">Independent</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              {siteName} sells no peptides and gives no dosing advice. It
              exists to make the measurement trustworthy.
            </p>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Guides
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/guides/mg-vs-mcg"
              className="text-accent hover:underline"
            >
              mg vs mcg — the 1,000× difference behind most dosing mistakes
            </Link>
          </li>
          <li>
            <Link
              href="/guides/how-to-read-an-insulin-syringe"
              className="text-accent hover:underline"
            >
              How to read an insulin syringe (U-100, units, and tick marks)
            </Link>
          </li>
          <li>
            <Link
              href="/guides/why-calculators-disagree"
              className="text-accent hover:underline"
            >
              Why two calculators give different answers for the same dose
            </Link>
          </li>
          <li>
            <Link
              href="/guides/syringe-units-chart"
              className="text-accent hover:underline"
            >
              Printable U-100 syringe units chart (units → mL)
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
