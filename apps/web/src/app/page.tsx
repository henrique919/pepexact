import Link from "next/link";
import type { Metadata } from "next";
import CompoundLinks from "@/components/CompoundLinks";
import JsonLd from "@/components/JsonLd";
import {
  organizationJsonLd,
  siteName,
  siteUrl,
  webAppJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/site";

const HOME_TITLE = "Peptide Calculator & Syringe Units Tool | PepExact";
const HOME_DESCRIPTION =
  "Calculate peptide reconstitution, syringe units and mg-to-mcg conversions with transparent formulas. Free tools with no sales or dosing advice.";

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
          name: "PepExact Peptide Calculator & Syringe Units Tool",
          path: "/",
          description: HOME_DESCRIPTION,
        })}
      />

      <section className="space-y-6 border-b border-line pb-14 pt-4">
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
          Independent measurement utility
        </p>
        <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Read the exact number.
        </h1>
        <p className="max-w-xl text-lg text-ink-soft">
          {siteName} is a free{" "}
          <Link
            href="/peptide-calculator"
            className="text-accent-deep hover:underline"
          >
            peptide calculator
          </Link>{" "}
          and syringe-units toolkit. Enter a vial size, the water you added, and
          a target amount you already have — get U-100 insulin syringe units with
          the arithmetic shown. Not a clinic. Not a seller. Not dosing advice.
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
            <div key={t.href} className="py-5">
              <h3 className="text-base font-semibold">
                <Link
                  href={t.href}
                  className="text-ink hover:text-accent-deep hover:underline"
                >
                  {t.title}
                </Link>
              </h3>
              <p className="mt-1 max-w-xl text-sm text-ink-soft">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          How transparent calculations work
        </h2>
        <p className="max-w-xl text-sm text-ink-soft">
          A peptide reconstitution calculation is ordinary arithmetic: concentration
          from vial milligrams ÷ water millilitres, draw volume from your amount ÷
          concentration, then U-100 insulin syringe units from millilitres × 100.
          {siteName} shows those steps so you can verify the result instead of
          trusting a black box. Details live in the{" "}
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

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Compound calculators
        </h2>
        <p className="max-w-xl text-sm text-ink-soft">
          Same engine, compound-specific context pages. Measurement only — the
          compound name does not change the formulas, and nothing here recommends
          a dose.
        </p>
        <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
          High-interest entry pages
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
        <CompoundLinks />
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
            <strong className="text-ink">One shared engine</strong> — web and
            future app clients use <code>@pepexact/engine</code>.
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

      <section className="space-y-3 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight">Guides</h2>
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
