import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";
import { peptideProfiles } from "@/lib/peptides";
import { articleJsonLd, webPageJsonLd } from "@/lib/site";

const TITLE = "Peptide Evidence Guides | PepExact";
const DESCRIPTION =
  "Evidence-led profiles of investigational peptides: research history, human evidence limits, safety uncertainties and regulatory status. No dosing advice.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/peptides" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/peptides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PeptidesIndexPage() {
  return (
    <article className="space-y-8">
      <JsonLd
        data={webPageJsonLd({
          name: TITLE,
          path: "/peptides",
          description: DESCRIPTION,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          headline: "Peptide evidence guides",
          path: "/peptides",
          description: DESCRIPTION,
          datePublished: "2026-07-17",
          dateModified: "2026-07-17",
        })}
      />
      <Breadcrumbs path="/peptides" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Peptide evidence guides
        </h1>
        <p className="max-w-xl text-ink-soft">
          Independent summaries of what published research and regulators say
          about specific peptides. These pages are informational. They do not
          recommend products, doses or protocols, and they are separate from
          PepExact&apos;s measurement calculators.
        </p>
      </header>

      <ul className="divide-y divide-line border-y border-line">
        {peptideProfiles.map((p) => (
          <li key={p.path} className="py-5">
            <h2 className="text-base font-semibold">
              <Link
                href={p.path}
                className="text-ink hover:text-accent-deep hover:underline"
              >
                {p.h1}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{p.metaDescription}</p>
            <p className="mt-2 text-xs text-ink-soft">
              Evidence last reviewed: {p.evidenceReviewedDisplay}
            </p>
          </li>
        ))}
      </ul>

      <RelatedTools path="/peptides" />
    </article>
  );
}
