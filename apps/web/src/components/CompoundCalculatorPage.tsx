import type { ReactNode } from "react";
import Link from "next/link";
import type { MassUnit } from "@pepexact/engine";
import PeptideCalculator from "./PeptideCalculator";
import { Note } from "./ui";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd, faqJsonLd, webAppJsonLd } from "@/lib/site";

export interface CompoundFaq {
  q: string;
  a: string;
}

export interface CompoundExample {
  vial: string;
  water: string;
  dose: string;
  doseUnit: MassUnit;
}

export interface RelatedLink {
  href: string;
  label: string;
}

const DEFAULT_TOOLS: RelatedLink[] = [
  { href: "/reconstitution-calculator", label: "Reconstitution calculator" },
  { href: "/mg-to-mcg-converter", label: "mg to mcg converter" },
  { href: "/syringe-units-calculator", label: "Syringe units calculator" },
];

const DEFAULT_GUIDES: RelatedLink[] = [
  { href: "/guides/mg-vs-mcg", label: "mg vs mcg, explained" },
  {
    href: "/guides/how-to-read-an-insulin-syringe",
    label: "How to read an insulin syringe",
  },
];

/**
 * Shared shell for every /calculator/[slug] compound page: JSON-LD, intro,
 * the engine-backed calculator (optionally preset with labelled example
 * inputs), compound-specific measurement context, FAQ, related tools, and
 * the standing disclaimer. Per-slug page.tsx files supply copy/data only —
 * see /calculator/retatrutide for a reference usage.
 */
export interface CompoundCalculatorPageProps {
  /** URL slug, e.g. "retatrutide" — page lives at /calculator/{slug}. */
  slug: string;
  /** Display name, e.g. "Retatrutide". */
  name: string;
  /** One-paragraph intro under the H1. */
  intro: string;
  /** Short factual description reused for JSON-LD WebApplication + FAQPage context. */
  summary: string;
  /** Optional preset inputs, clearly labelled as examples, not a recommendation. */
  example?: CompoundExample;
  /** Heading for the measurement-context section (default: "About this calculation"). */
  aboutHeading?: string;
  /** Body of the measurement-context section — factual, arithmetic-only. */
  aboutBody: ReactNode;
  faqs?: CompoundFaq[];
  relatedTools?: RelatedLink[];
  relatedGuides?: RelatedLink[];
}

export default function CompoundCalculatorPage({
  slug,
  name,
  intro,
  summary,
  example,
  aboutHeading = "About this calculation",
  aboutBody,
  faqs = [],
  relatedTools = DEFAULT_TOOLS,
  relatedGuides = DEFAULT_GUIDES,
}: CompoundCalculatorPageProps) {
  const path = `/calculator/${slug}`;

  return (
    <div className="space-y-10">
      <JsonLd
        data={webAppJsonLd({
          name: `PepExact ${name} Calculator`,
          path,
          description: summary,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Peptide Calculator", path: "/peptide-calculator" },
          { name: `${name} Calculator`, path },
        ])}
      />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {name} calculator
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">{intro}</p>
      </header>

      {example && (
        <Note>
          The fields below are example inputs so you can see the calculator
          work — not a recommended dose. Clear them and enter your own vial,
          water, and target dose.
        </Note>
      )}

      <PeptideCalculator
        initialVial={example?.vial}
        initialWater={example?.water}
        initialDose={example?.dose}
        initialDoseUnit={example?.doseUnit}
      />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{aboutHeading}</h2>
        {aboutBody}
      </section>

      {faqs.length > 0 && (
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
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Related tools</h2>
        <ul className="list-disc space-y-1 pl-5 text-ink-soft">
          <li>
            <Link href="/peptide-calculator" className="text-accent hover:underline">
              Peptide calculator (all compounds)
            </Link>
          </li>
          {relatedTools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="text-accent hover:underline">
                {t.label}
              </Link>
            </li>
          ))}
          {relatedGuides.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="text-accent hover:underline">
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-ink-soft">
        PepExact is a measurement tool, not medical advice. It never suggests
        what or how much of {name} — or anything else — to take; it only does
        the arithmetic on numbers you already have.
      </p>
    </div>
  );
}
