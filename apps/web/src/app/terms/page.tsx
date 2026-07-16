import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use — PepExact",
  description:
    "Terms for using PepExact: educational measurement tool only. No medical advice, no dosing recommendations, no warranty of fitness for a particular purpose.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <Breadcrumbs path="/terms" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of use
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Last updated 17 July 2026. By using {siteName}, you agree to these
          terms.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Educational measurement tool</h2>
        <p className="text-ink-soft">
          {siteName} provides arithmetic that converts user-entered vial size,
          water volume, and dose into concentration, volume, and U-100 syringe
          units. It is for educational and informational measurement purposes
          only.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Not medical or legal advice</h2>
        <p className="text-ink-soft">
          Nothing on this site is medical advice, a diagnosis, a treatment plan,
          or legal advice. {siteName} does not recommend compounds, doses,
          frequencies, stacks, or sources. You are solely responsible for how
          you use any numbers you enter or receive.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">No sales or sourcing</h2>
        <p className="text-ink-soft">
          {siteName} does not sell peptides and does not link to vendors or
          affiliates for the purpose of obtaining substances.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accuracy and warranty</h2>
        <p className="text-ink-soft">
          We aim for correct arithmetic and show working steps so you can check
          them. The site is provided &ldquo;as is&rdquo; without warranties of
          any kind, including fitness for a particular purpose. Always verify
          critical calculations independently.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Related</h2>
        <p className="text-ink-soft">
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy
          </Link>
          {" · "}
          <Link href="/methodology" className="text-accent hover:underline">
            Methodology
          </Link>
          {" · "}
          <Link href="/about" className="text-accent hover:underline">
            About
          </Link>
          {" · "}
          <Link
            href="/guides/peptide-regulators"
            className="text-accent hover:underline"
          >
            Regulators
          </Link>
        </p>
      </section>
    </article>
  );
}
