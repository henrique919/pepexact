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
  return {
    title: compound.title,
    description: compound.metaDescription,
    alternates: { canonical: `/calculator/${compound.slug}` },
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
