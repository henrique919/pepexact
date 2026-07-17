import Link from "next/link";
import type { Metadata } from "next";
import CompoundLinks from "@/components/CompoundLinks";
import HeroCalculatorPreview from "@/components/HeroCalculatorPreview";
import JsonLd from "@/components/JsonLd";
import {
  organizationJsonLd,
  siteName,
  siteUrl,
  webAppJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/site";

const HOME_TITLE = "Peptide Calculator, BPC-157 & Retatrutide Tool | PepExact";
const HOME_DESCRIPTION =
  "Calculate peptide reconstitution, BPC-157, retatrutide and syringe units with transparent formulas. Free tools with no sales or dosing advice.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  // Path form; metadataBase resolves to https://pepexact.com
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: siteUrl,
    type: "website",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const tools = [
  {
    href: "/peptide-calculator",
    title: "Peptide calculator",
    body: "Vial, water, and a user-supplied amount → concentration, draw volume, and U-100 insulin syringe units, with every step shown.",
  },
  {
    href: "/reconstitution-calculator",
    title: "Peptide reconstitution calculator",
    body: "Work backwards from a target draw on the syringe to the water volume that produces it.",
  },
  {
    href: "/mg-to-mcg-converter",
    title: "mg-to-mcg converter",
    body: "Convert milligrams and micrograms cleanly — the 1,000× slip behind many mismatched results.",
  },
  {
    href: "/syringe-units-calculator",
    title: "Syringe units calculator",
    body: "Translate U-100 insulin syringe units to millilitres and back on common barrel sizes.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          name: HOME_TITLE,
          path: "/",
          description: HOME_DESCRIPTION,
        })}
      />
      <JsonLd
        data={webAppJsonLd({
          name: HOME_TITLE,
          path: "/",
          description: HOME_DESCRIPTION,
        })}
      />

      <section className="border-b border-line pb-14 pt-4">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-ink-soft">
              Independent peptide measurement tools
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Free Peptide Calculator for Reconstitution &amp; Syringe Units
            </h1>
            <p className="max-w-xl text-lg text-ink-soft">
              {siteName} is a free{" "}
              <Link
                href="/peptide-calculator"
                className="text-accent-deep hover:underline"
              >
                peptide calculator
              </Link>{" "}
              and syringe-units toolkit. Enter a vial size, the water you added,
              and a target amount you already have — get U-100 insulin syringe
              units with the arithmetic shown. Not a clinic. Not a seller. Not
              dosing advice.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/peptide-calculator"
                className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-deep"
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
          </div>
          <HeroCalculatorPreview />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Measurement calculators
        </h2>
        <p className="max-w-xl text-sm text-ink-soft">
          Each tool does one job. They share the same pure calculation engine, so
          the numbers stay consistent across pages.
        </p>
        <div className="divide-y divide-line border-y border-line">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex min-h-11 items-start justify-between gap-4 py-5 transition-colors hover:bg-surface/80 focus-visible:bg-surface"
            >
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-ink group-hover:text-accent-deep">
                  {t.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-ink-soft">{t.body}</p>
              </div>
              <span
                aria-hidden
                className="mt-1 shrink-0 font-mono text-lg text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-accent-deep"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          How transparent calculations work
        </h2>
        <ol className="max-w-xl space-y-3 text-sm text-ink-soft">
          <li className="rounded-xl border border-line bg-surface px-4 py-3">
            <span className="font-medium text-ink">1. Concentration</span>
            <span className="mt-1 block font-mono text-ink">
              vial amount ÷ water volume
            </span>
            <span className="mt-1 block text-xs">
              Both values are user supplied.
            </span>
          </li>
          <li className="rounded-xl border border-line bg-surface px-4 py-3">
            <span className="font-medium text-ink">2. Draw volume</span>
            <span className="mt-1 block font-mono text-ink">
              user-entered target amount ÷ concentration
            </span>
            <span className="mt-1 block text-xs">
              The target amount must come from an authorised source —{" "}
              {siteName} does not choose it.
            </span>
          </li>
          <li className="rounded-xl border border-line bg-surface px-4 py-3">
            <span className="font-medium text-ink">3. U-100 units</span>
            <span className="mt-1 block font-mono text-ink">
              draw volume in mL × 100
            </span>
            <span className="mt-1 block text-xs">
              On a U-100 insulin syringe, 100 units = 1 mL.
            </span>
          </li>
        </ol>
        <p className="max-w-xl text-sm text-ink-soft">
          A peptide reconstitution calculation is ordinary arithmetic:
          concentration from vial milligrams ÷ water millilitres, draw volume
          from your amount ÷ concentration, then U-100 insulin syringe units from
          millilitres × 100. {siteName} shows those steps so you can verify the
          result instead of trusting a black box. Details live in the{" "}
          <Link
            href="/methodology"
            className="text-accent-deep hover:underline"
          >
            calculation methodology
          </Link>
          .
        </p>
        <h3 className="text-base font-semibold">Common unit pitfalls</h3>
        <p className="max-w-xl text-sm text-ink-soft">
          Milligrams and micrograms differ by 1,000. Mixing them up is the usual
          reason two tools disagree. Use the{" "}
          <Link
            href="/mg-to-mcg-converter"
            className="text-accent-deep hover:underline"
          >
            mg-to-mcg converter
          </Link>{" "}
          and the{" "}
          <Link
            href="/guides/mg-vs-mcg"
            className="text-accent-deep hover:underline"
          >
            mg vs mcg guide
          </Link>{" "}
          when labels disagree. For mark reading, see{" "}
          <Link
            href="/guides/how-to-read-an-insulin-syringe"
            className="text-accent-deep hover:underline"
          >
            how to read an insulin syringe
          </Link>{" "}
          or the{" "}
          <Link
            href="/syringe-units-calculator"
            className="text-accent-deep hover:underline"
          >
            syringe units calculator
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Why the number is trustworthy
        </h2>
        <ul className="space-y-4 text-sm text-ink-soft">
          <li>
            <strong className="text-ink">The math is shown</strong> — every
            result expands into working steps you can check. If two tools
            disagree, start with{" "}
            <Link
              href="/guides/why-calculators-disagree"
              className="text-accent-deep hover:underline"
            >
              why calculators disagree
            </Link>
            .
          </li>
          <li>
            <strong className="text-ink">One shared engine</strong> — every
            calculator uses the same tested calculation engine, so identical
            inputs produce consistent results. See the{" "}
            <Link
              href="/methodology"
              className="text-accent-deep hover:underline"
            >
              calculation methodology
            </Link>
            .
          </li>
          <li>
            <strong className="text-ink">Independent</strong> — no peptides for
            sale, no dosing advice, no affiliates.{" "}
            <Link href="/about" className="text-accent-deep hover:underline">
              About PepExact
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Compound calculators
        </h2>
        <p className="max-w-xl text-sm text-ink-soft">
          Same engine, compound-specific context pages. Measurement only — the
          compound name does not change the formulas, and nothing here recommends
          a dose.
        </p>
        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-ink-soft">
          Popular calculators
        </h3>
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
        <CompoundLinks
          labelled
          excludeSlugs={["bpc-157", "retatrutide"]}
        />
      </section>

      <section className="space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Limits of these tools
        </h2>
        <ul className="max-w-xl list-disc space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            Inputs should come from an authorized label, validated laboratory
            protocol, pharmacist, or licensed healthcare professional.
          </li>
          <li>
            {siteName} does not choose a peptide, target amount, water volume, or
            protocol — it only converts the numbers you enter.
          </li>
          <li>
            It does not verify identity, purity, sterility, legality, or approval.
            For regulator links, see{" "}
            <Link
              href="/guides/peptide-regulators"
              className="text-accent-deep hover:underline"
            >
              peptide regulators (FDA, MHRA, TGA)
            </Link>
            .
          </li>
          <li>
            No sales, affiliates, or sourcing guidance — see the{" "}
            <Link
              href="/editorial-policy"
              className="text-accent-deep hover:underline"
            >
              editorial policy
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight">Guides</h2>
        <ul className="space-y-4 text-sm">
          <li>
            <Link
              href="/guides/mg-vs-mcg"
              className="text-accent-deep hover:underline"
            >
              mg vs mcg — the 1,000× difference
            </Link>
            <p className="mt-1 max-w-xl text-ink-soft">
              Why milligram and microgram mix-ups change every downstream result
              by a factor of one thousand.
            </p>
          </li>
          <li>
            <Link
              href="/guides/how-to-read-an-insulin-syringe"
              className="text-accent-deep hover:underline"
            >
              How to read an insulin syringe
            </Link>
            <p className="mt-1 max-w-xl text-ink-soft">
              What U-100 marks mean in millilitres on common 0.3, 0.5, and 1.0 mL
              barrels.
            </p>
          </li>
          <li>
            <Link
              href="/guides/why-calculators-disagree"
              className="text-accent-deep hover:underline"
            >
              Why two calculators disagree
            </Link>
            <p className="mt-1 max-w-xl text-ink-soft">
              Rounding, unit confusion, and syringe-scale assumptions that make
              two tools report different unit numbers.
            </p>
          </li>
          <li>
            <Link
              href="/guides/syringe-units-chart"
              className="text-accent-deep hover:underline"
            >
              Printable U-100 syringe units chart
            </Link>
          </li>
          <li>
            <Link
              href="/guides/peptide-regulators"
              className="text-accent-deep hover:underline"
            >
              Peptide regulators — FDA, MHRA, TGA
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
