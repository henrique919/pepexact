import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ReviewedOn from "@/components/ReviewedOn";
import {
  articleJsonLd,
  faqJsonLd,
  GUIDE_MODIFIED_ISO,
  GUIDE_PUBLISHED_ISO,
  siteName,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Are peptides legal in Australia? What PepExact can and can't tell you",
  description:
    "A facts-only explainer: PepExact is a measurement tool, not a seller or a legal adviser. Whether a specific peptide is legal in Australia is a question for the TGA. Links to the primary regulators.",
  alternates: { canonical: "/au/are-peptides-legal" },
};

/*
 * §5 / TASK-007 compliance note.
 * This page makes NO substance-specific legal claim. It only:
 *  (a) describes what PepExact is/isn't (not a regulatory claim), and
 *  (b) points to primary regulators, each verified to load in-session on
 *      2026-07-17 (TGA home via browser; FDA + ClinicalTrials via HTTP 200).
 * Do not add "peptide X is legal/illegal/prescription-only" copy here without
 * a primary-source citation. If a citation can't be verified in-session, leave
 * a TODO(human): verify citation and omit the claim — never invent it.
 */

const faqs = [
  {
    q: "Can PepExact tell me whether a peptide is legal where I live?",
    a: "No. PepExact is a measurement calculator. It converts a vial, water, and a dose into syringe units and nothing else. It has no information about the legal status of any substance and does not provide legal advice.",
  },
  {
    q: "Where is the authoritative answer for Australia?",
    a: "The Therapeutic Goods Administration (TGA), the Australian Government authority that regulates medicines, medical devices, and biologicals. Whether a specific substance is approved, scheduled, prescription-only, or unapproved depends on the substance and its form, and the TGA is the source of record.",
  },
  {
    q: "Does PepExact sell peptides or help obtain them?",
    a: "No. PepExact sells nothing, links to no vendors, and offers no guidance on obtaining, importing, or sourcing any substance. It exists only to make the measurement arithmetic trustworthy.",
  },
];

const sources = [
  {
    label: "Therapeutic Goods Administration (TGA) — Australia's therapeutic goods regulator",
    url: "https://www.tga.gov.au/",
  },
  {
    label: "U.S. Food & Drug Administration (FDA)",
    url: "https://www.fda.gov/",
  },
  {
    label: "FDA — how drugs are developed and approved",
    url: "https://www.fda.gov/drugs/development-approval-process-drugs",
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
          headline: "Are peptides legal in Australia?",
          path: "/au/are-peptides-legal",
          description:
            "A facts-only explainer: PepExact is a measurement tool, not a seller or legal adviser. Legality of a specific peptide is a question for the TGA. Links to primary regulators.",
          datePublished: GUIDE_PUBLISHED_ISO,
          dateModified: GUIDE_MODIFIED_ISO,
        })}
      />
      <JsonLd data={faqJsonLd(faqs, "/au/are-peptides-legal")} />
      <Breadcrumbs path="/au/are-peptides-legal" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Are peptides legal in Australia?
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          The honest answer is: it depends on the exact substance, and only the
          regulator can tell you. Here is what {siteName} is, what it is not, and
          where the authoritative answers actually live.
        </p>
      </header>

      <ReviewedOn />

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
          &ldquo;Peptides&rdquo; is a broad category covering many different
          substances in many different forms. Whether a specific one may be
          possessed, imported, or supplied — and under what conditions — depends
          on that substance, its presentation, and how the law and the medicines
          schedule treat it. Those are questions for the regulator and the law,
          not for a calculator.
        </p>
        <p className="text-ink-soft">
          {siteName} has no information about any of that and will never guess.
          If you need to know the status of a particular substance, go to the
          primary source below.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Where the authoritative answers live</h2>
        <p className="text-ink-soft">
          In Australia, the{" "}
          <a
            href="https://www.tga.gov.au/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-accent hover:underline"
          >
            Therapeutic Goods Administration (TGA)
          </a>{" "}
          is the Australian Government authority that regulates medicines,
          medical devices, and biologicals. It is the source of record for what
          is approved, scheduled, or unapproved in Australia. For the United
          States (FDA) and United Kingdom (MHRA) alongside the TGA, see{" "}
          <Link
            href="/guides/peptide-regulators"
            className="text-accent hover:underline"
          >
            peptide regulators
          </Link>
          .
        </p>
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
        {/* TODO(human): confirm these regulator links still resolve and point
            to the most useful landing pages, and — only with a primary-source
            citation — decide whether any AU-specific scheduling detail should be
            added. Do not add legal characterisations without a cited source. */}
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

      <RelatedTools path="/au/are-peptides-legal" />

      <p className="text-xs text-ink-soft">
        {siteName} is a measurement tool, not medical or legal advice. It does
        not sell peptides and does not tell you what, how much, or whether to
        take anything. For regulatory questions, consult the TGA (Australia) or
        see{" "}
        <Link
          href="/guides/peptide-regulators"
          className="text-accent hover:underline"
        >
          FDA, MHRA, and TGA
        </Link>
        .
      </p>
    </article>
  );
}
