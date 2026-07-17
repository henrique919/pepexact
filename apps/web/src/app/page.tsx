import Link from "next/link";
import type { Metadata } from "next";
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
    body: "Vial, water, dose → exact units on your syringe, with every step shown.",
  },
  {
    href: "/reconstitution-calculator",
    title: "Reconstitution calculator",
    body: "Work backwards: pick the draw you want, get the exact water to add.",
  },
  {
    href: "/mg-to-mcg-converter",
    title: "mg ⇄ mcg converter",
    body: "The 1,000× conversion behind most measurement slips.",
  },
  {
    href: "/syringe-units-calculator",
    title: "Syringe units ⇄ mL",
    body: "Translate U-100 insulin syringe units to millilitres and back.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="space-y-6 border-b border-line pb-14 pt-4">
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
          Independent measurement utility
        </p>
        <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Read the exact number.
        </h1>
        <p className="max-w-xl text-lg text-ink-soft">
          {siteName} turns vial size, water, and a user-supplied dose into U-100
          syringe units — with the arithmetic shown. Not a clinic. Not a seller.
          Not dosing advice.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/peptide-calculator"
            className="inline-flex min-h-11 items-center rounded-xl bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-deep"
          >
            Open the peptide calculator
          </Link>
          <Link
            href="/methodology"
            className="inline-flex min-h-11 items-center text-sm font-medium text-ink-soft hover:text-ink"
          >
            How the math works
          </Link>
        </div>
      </section>

      <section className="space-y-0 divide-y divide-line border-y border-line">
        <h2 className="sr-only">Calculators</h2>
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex min-h-14 flex-col justify-center gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <span className="font-semibold text-ink group-hover:text-accent-deep">
              {t.title}
            </span>
            <span className="max-w-md text-sm text-ink-soft sm:text-right">
              {t.body}
            </span>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
          Compound calculators
        </h2>
        <p className="max-w-xl text-sm text-ink-soft">
          Same engine, compound-specific context. Measurement only — never a
          recommended dose.
        </p>
        <ul className="space-y-3 border-t border-line pt-4 text-sm">
          <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-line pb-3">
            <Link
              href="/calculator/bpc-157"
              className="font-medium text-accent-deep hover:underline"
            >
              BPC-157 calculator
            </Link>
            <span className="text-ink-soft">
              reconstitution &amp; syringe units
            </span>
          </li>
          <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-line pb-3">
            <Link
              href="/calculator/retatrutide"
              className="font-medium text-accent-deep hover:underline"
            >
              Retatrutide calculator
            </Link>
            <span className="text-ink-soft">also searched as reta peptide</span>
          </li>
        </ul>
        <CompoundLinks />
      </section>

      <section className="space-y-4 border-t border-line pt-10">
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
          Why the number is trustworthy
        </h2>
        <ul className="space-y-4 text-sm text-ink-soft">
          <li>
            <strong className="text-ink">The math is shown</strong> — every
            result expands into working steps you can check.
          </li>
          <li>
            <strong className="text-ink">One shared engine</strong> — web and
            future app clients use <code>@pepexact/engine</code>.
          </li>
          <li>
            <strong className="text-ink">Independent</strong> — no peptides for
            sale, no dosing advice, no affiliates.
          </li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-line pt-10">
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
          Guides
        </h2>
        <ul className="space-y-3 text-sm">
          <li>
            <Link
              href="/guides/mg-vs-mcg"
              className="text-accent-deep hover:underline"
            >
              mg vs mcg — the 1,000× difference
            </Link>
          </li>
          <li>
            <Link
              href="/guides/how-to-read-an-insulin-syringe"
              className="text-accent-deep hover:underline"
            >
              How to read an insulin syringe
            </Link>
          </li>
          <li>
            <Link
              href="/guides/why-calculators-disagree"
              className="text-accent-deep hover:underline"
            >
              Why two calculators disagree
            </Link>
          </li>
          <li>
            <Link
              href="/guides/syringe-units-chart"
              className="text-accent-deep hover:underline"
            >
              Printable U-100 syringe units chart
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
