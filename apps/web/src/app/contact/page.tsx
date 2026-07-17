import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteHandle, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact PepExact",
  description:
    "How to reach PepExact for evidence corrections, citation requests and product questions. Independent measurement tool — not a clinic or seller.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <Breadcrumbs path="/contact" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          {siteName} is a small independent measurement utility. We do not
          provide medical advice or product support for peptides.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Reach us</h2>
        <p className="text-ink-soft">
          Public updates and messages:{" "}
          <a
            href={`https://x.com/${siteHandle.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-deep hover:underline"
          >
            {siteHandle}
          </a>{" "}
          on X.
        </p>
        <p className="text-ink-soft">
          For waitlist forms configured on calculator pages, those forms are
          hosted externally and follow their own privacy policies. When{" "}
          {siteName} falls back to email, messages use{" "}
          <a
            href="mailto:hello@pepexact.com"
            className="text-accent-deep hover:underline"
          >
            hello@pepexact.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Evidence corrections and citation requests
        </h2>
        <p className="text-ink-soft">
          Researchers, clinicians and journalists can use this contact route to:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Flag a source update on an evidence guide</li>
          <li>Request the underlying citation list for a published page</li>
          <li>Ask about reusing evidence graphics with source credit</li>
        </ul>
        <p className="text-ink-soft">
          Start from the relevant guide —{" "}
          <Link
            href="/peptides/bpc-157"
            className="text-accent-deep hover:underline"
          >
            BPC-157 evidence
          </Link>{" "}
          or{" "}
          <Link
            href="/peptides/retatrutide"
            className="text-accent-deep hover:underline"
          >
            retatrutide evidence
          </Link>{" "}
          — then message {siteHandle} with the page URL and the correction or
          request.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What we cannot help with</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Dosing, protocols, or whether a peptide is appropriate for you</li>
          <li>Sourcing, vendors, or purchasing</li>
          <li>Legal determinations for a specific substance or country</li>
        </ul>
        <p className="text-ink-soft">
          For measurement questions, start with the{" "}
          <Link
            href="/peptide-calculator"
            className="text-accent-deep hover:underline"
          >
            peptide calculator
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="text-accent-deep hover:underline">
            methodology
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
