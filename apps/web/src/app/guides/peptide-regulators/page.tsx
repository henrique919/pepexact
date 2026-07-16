import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import { articleJsonLd, faqJsonLd, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peptide regulators — FDA, MHRA, and TGA (facts only)",
  description:
    "Where to look up peptide and medicine regulation in the US, UK, and Australia. PepExact is a measurement tool, not a legal adviser. Links to FDA, MHRA, and TGA only.",
  alternates: { canonical: "/guides/peptide-regulators" },
};

/*
 * §5 compliance: no substance-specific legal claims. Primary regulator links
 * only. If a citation can't be verified, omit the claim — never invent it.
 */

const faqs = [
  {
    q: "Can PepExact tell me whether a peptide is legal where I live?",
    a: "No. PepExact is a measurement calculator. It converts a vial, water, and a dose into syringe units and nothing else. It has no information about the legal status of any substance and does not provide legal advice.",
  },
  {
    q: "Which regulator should I check in the US, UK, or Australia?",
    a: "United States: the Food and Drug Administration (FDA). United Kingdom: the Medicines and Healthcare products Regulatory Agency (MHRA). Australia: the Therapeutic Goods Administration (TGA). Status depends on the exact substance and form — only the relevant regulator is the source of record.",
  },
  {
    q: "Does PepExact sell peptides or help obtain them?",
    a: "No. PepExact sells nothing, links to no vendors, and offers no guidance on obtaining, importing, or sourcing any substance.",
  },
];

const sources = [
  {
    label: "U.S. Food & Drug Administration (FDA)",
    url: "https://www.fda.gov/",
  },
  {
    label: "FDA — how drugs are developed and approved",
    url: "https://www.fda.gov/drugs/development-approval-process-drugs",
  },
  {
    label:
      "Medicines and Healthcare products Regulatory Agency (MHRA) — United Kingdom",
    url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency",
  },
  {
    label: "Therapeutic Goods Administration (TGA) — Australia",
    url: "https://www.tga.gov.au/",
  },
  {
    label: "ClinicalTrials.gov — registry of clinical studies",
    url: "https://clinicaltrials.gov/",
  },
];

export default function Page() {
  return (
    <article className="space-y-6">
      <JsonLd
        data={articleJsonLd({
          headline: "Peptide regulators — FDA, MHRA, and TGA",
          path: "/guides/peptide-regulators",
          description:
            "Facts-only links to primary medicine regulators in the US, UK, and Australia. PepExact is a measurement tool, not a legal adviser.",
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <Breadcrumbs path="/guides/peptide-regulators" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Peptide regulators: FDA, MHRA, and TGA
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Regulations differ by country. {siteName} does not answer legality
          questions — here are the primary authorities for the United States,
          United Kingdom, and Australia.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What {siteName} is — and isn&apos;t</h2>
        <p className="text-ink-soft">
          {siteName} is an educational measurement tool. It takes numbers you
          already have — a vial size, the water added, a dose — and returns the
          units on a syringe, with the arithmetic shown. That is the whole
          product.
        </p>
        <p className="text-ink-soft">
          It does <strong className="text-ink">not</strong> sell peptides, link
          to vendors, recommend doses, or advise on obtaining or importing
          anything. And it does not provide legal advice. Nothing on this page is
          legal advice.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Why there is no single yes or no</h2>
        <p className="text-ink-soft">
          &ldquo;Peptides&rdquo; covers many substances and forms. Whether a
          specific one may be possessed, imported, or supplied — and under what
          conditions — depends on that substance, its presentation, and how the
          law treats it where you are. Those are questions for the regulator and
          the law, not for a calculator.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Where the authoritative answers live</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>
            <strong className="text-ink">United States — FDA.</strong> The{" "}
            <a
              href="https://www.fda.gov/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-accent hover:underline"
            >
              Food and Drug Administration
            </a>{" "}
            regulates medicines and related products in the US.
          </li>
          <li>
            <strong className="text-ink">United Kingdom — MHRA.</strong> The{" "}
            <a
              href="https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-accent hover:underline"
            >
              Medicines and Healthcare products Regulatory Agency
            </a>{" "}
            is the UK medicines regulator.
          </li>
          <li>
            <strong className="text-ink">Australia — TGA.</strong> The{" "}
            <a
              href="https://www.tga.gov.au/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-accent hover:underline"
            >
              Therapeutic Goods Administration
            </a>{" "}
            regulates therapeutic goods in Australia. For AU-focused framing, see{" "}
            <Link
              href="/au/are-peptides-legal"
              className="text-accent hover:underline"
            >
              Are peptides legal in Australia?
            </Link>
            .
          </li>
        </ul>
        <ul className="list-disc space-y-1 pl-5 text-ink-soft">
          {sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-accent hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
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

      <RelatedTools path="/guides/peptide-regulators" />

      <p className="text-xs text-ink-soft">
        {siteName} is a measurement tool, not medical or legal advice. For
        regulatory questions, consult the FDA (US), MHRA (UK), TGA (Australia),
        or the relevant authority where you are.
      </p>
    </article>
  );
}
