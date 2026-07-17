import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PeptideEvidenceArticle from "@/components/peptide/PeptideEvidenceArticle";
import RelatedTools from "@/components/RelatedTools";
import { bpc157FdaBulksStatus, bpc157Profile } from "@/lib/peptides";
import { articleJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/site";

// TODO(editorial): After the FDA Pharmacy Compounding Advisory Committee
// meeting (23–24 July 2026), recheck the official outcome and update
// bpc157FdaBulksStatus + the US regulatory section in bpc-157.ts.
// Do not describe the May 2026 proposal as final while isFinalDecision is false.
void bpc157FdaBulksStatus;

const profile = bpc157Profile;

export const metadata: Metadata = {
  title: { absolute: profile.title },
  description: profile.metaDescription,
  alternates: { canonical: "/peptides/bpc-157" },
  openGraph: {
    title: profile.ogTitle,
    description: profile.ogDescription,
    url: "/peptides/bpc-157",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.ogTitle,
    description: profile.ogDescription,
  },
};

export default function Page() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={webPageJsonLd({
          name: profile.title,
          path: profile.path,
          description: profile.metaDescription,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          headline: profile.h1,
          path: profile.path,
          description: profile.metaDescription,
          datePublished: profile.datePublished,
          dateModified: profile.dateModified,
        })}
      />
      <JsonLd data={faqJsonLd(profile.faqs, profile.path)} />
      <Breadcrumbs path={profile.path} />
      <PeptideEvidenceArticle profile={profile} />
      <RelatedTools path={profile.path} />
    </div>
  );
}
