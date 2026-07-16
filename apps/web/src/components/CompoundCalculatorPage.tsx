import Link from "next/link";
import PeptideCalculator from "./PeptideCalculator";
import { Note } from "./ui";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";
import RelatedTools from "./RelatedTools";
import { faqJsonLd, webAppJsonLd } from "@/lib/site";
import type { Compound } from "@/lib/compounds";

/**
 * Shared shell for every /calculator/[slug] compound page. Consumes a pure
 * data record (see src/lib/compounds.ts) — no per-page JSX — and renders
 * JSON-LD, the engine-backed calculator (optionally preset with a generic,
 * clearly-labelled example so the arithmetic is visible), calm identity /
 * measurement sections, primary sources, measurement FAQs, related tools,
 * and the standing disclaimer.
 *
 * Copy rules (docs/EXECUTION-PLAN.md §5) are enforced by what this template
 * does NOT render: no dose recommendations, no protocols, no vendor links.
 */
export default function CompoundCalculatorPage({
  compound,
}: {
  compound: Compound;
}) {
  const {
    slug,
    name,
    h1,
    intro,
    summary,
    example,
    aboutHeading = "About this calculator",
    aboutParagraphs,
    sections = [],
    sources = [],
    faqs = [],
  } = compound;

  const path = `/calculator/${slug}`;

  return (
    <article className="space-y-10">
      <JsonLd
        data={webAppJsonLd({
          name: `PepExact ${name} Calculator`,
          path,
          description: summary,
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs, path)} />}

      <Breadcrumbs path={path} />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {h1 ?? `${name} calculator`}
        </h1>
        <p className="max-w-xl text-ink-soft">{intro}</p>
      </header>

      {example && (
        <Note>
          The fields below are generic example numbers, filled in so you can see
          the calculator work — they are not a recommended {name} dose. Clear
          them and enter your own vial size, water, and dose from an authorized
          source.
        </Note>
      )}

      <section aria-labelledby="calculator-heading" className="space-y-3">
        <h2 id="calculator-heading" className="sr-only">
          {name} measurement calculator
        </h2>
        <PeptideCalculator
          initialVial={example?.vial}
          initialWater={example?.water}
          initialDose={example?.dose}
          initialDoseUnit={example?.doseUnit}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{aboutHeading}</h2>
        {aboutParagraphs.map((p) => (
          <p key={p.slice(0, 48)} className="text-ink-soft">
            {p}
          </p>
        ))}
      </section>

      {sections.map((sec) => (
        <section key={sec.heading} className="space-y-4">
          <h2 className="text-xl font-semibold">{sec.heading}</h2>
          {sec.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="text-ink-soft">
              {p}
            </p>
          ))}
        </section>
      ))}

      {sources.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Primary sources</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
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
          <p className="text-xs text-ink-soft">
            PepExact does not assess whether any compound works or is
            appropriate for anyone. These registries are the record for research
            status — not dosing instructions.
          </p>
          <p className="text-sm text-ink-soft">
            Also see{" "}
            <Link
              href="/guides/peptide-regulators"
              className="text-accent hover:underline"
            >
              peptide regulators (FDA, MHRA, TGA)
            </Link>{" "}
            and the{" "}
            <Link
              href="/peptide-calculator"
              className="text-accent hover:underline"
            >
              main peptide calculator
            </Link>
            .
          </p>
        </section>
      )}

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

      <RelatedTools path={path} />

      <p className="text-xs text-ink-soft">
        PepExact is a measurement tool, not medical advice. Inputs should come
        from an authorized label, validated laboratory protocol, pharmacist, or
        licensed healthcare professional. PepExact never suggests what or how
        much of {name} — or anything else — to take; it only does the arithmetic
        on numbers you already have. It does not verify identity, purity,
        sterility, legality, or approval.
      </p>
    </article>
  );
}
