import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PeptideEvidenceArticle from "@/components/peptide/PeptideEvidenceArticle";
import RelatedTools from "@/components/RelatedTools";
import { retatrutideProfile } from "@/lib/peptides";
import { articleJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/site";

const profile = retatrutideProfile;

export const metadata: Metadata = {
  title: { absolute: profile.title },
  description: profile.metaDescription,
  alternates: { canonical: "/peptides/retatrutide" },
  openGraph: {
    title: profile.ogTitle,
    description: profile.ogDescription,
    url: "/peptides/retatrutide",
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
