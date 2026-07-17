import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompoundCalculatorPage from "@/components/CompoundCalculatorPage";
import { compounds, compoundBySlug } from "@/lib/compounds";

/** Prerender one static page per known compound slug. */
export function generateStaticParams() {
  return compounds.map((c) => ({ slug: c.slug }));
}

/** Only the slugs in compounds.ts exist; anything else 404s. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const compound = compoundBySlug.get(slug);
  if (!compound) return {};
  const path = `/calculator/${compound.slug}`;
  // Titles ending in "| PepExact" are absolute; others use the root template.
  const title = compound.title.endsWith("| PepExact")
    ? { absolute: compound.title }
    : compound.title;
  return {
    title,
    description: compound.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: compound.title,
      description: compound.metaDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: compound.title,
      description: compound.metaDescription,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const compound = compoundBySlug.get(slug);
  if (!compound) notFound();
  return <CompoundCalculatorPage compound={compound} />;
}
