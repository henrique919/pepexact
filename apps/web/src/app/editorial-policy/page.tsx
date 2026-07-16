import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial policy — PepExact",
  description:
    "How PepExact writes about peptides: measurement arithmetic only, primary sources for status claims, no dosing advice, no vendors.",
  alternates: { canonical: "/editorial-policy" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <Breadcrumbs path="/editorial-policy" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Editorial policy
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Last updated 17 July 2026. {siteName} publishes educational measurement
          content only.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What we publish</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Reconstitution and syringe-unit arithmetic, with working shown</li>
          <li>Unit conversions (mg/mcg, U-100 units/mL)</li>
          <li>Calm identity context for named compounds when sourced</li>
          <li>Links to primary registries (ClinicalTrials.gov, PubMed, regulators)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What we do not publish</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Dose recommendations, cycles, stacks, or titration schedules</li>
          <li>Injection technique or preparation protocols framed as guidance</li>
          <li>Vendor, affiliate, or &ldquo;where to buy&rdquo; content</li>
          <li>Efficacy, safety, or therapy claims</li>
          <li>Invented medical, legal, or statistical claims</li>
          <li>Fake authors, reviewers, testimonials, or star ratings</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sources and review</h2>
        <p className="text-ink-soft">
          Status or research-identity statements must cite a primary source or be
          omitted. Example inputs in calculators are labelled as examples for the
          math demo — not recommendations.
        </p>
        <p className="text-ink-soft">
          {siteName} does not currently list a named medical reviewer. Until a
          real qualified reviewer is appointed, we do not display &ldquo;medically
          reviewed&rdquo; badges. Content is maintained for measurement accuracy
          and compliance with this policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Corrections</h2>
        <p className="text-ink-soft">
          If you find an arithmetic or citation error, contact us via{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact
          </Link>
          . See also{" "}
          <Link href="/methodology" className="text-accent hover:underline">
            Methodology
          </Link>{" "}
          and{" "}
          <Link href="/about" className="text-accent hover:underline">
            About
          </Link>
          .
        </p>
      </section>
    </article>
  );
}