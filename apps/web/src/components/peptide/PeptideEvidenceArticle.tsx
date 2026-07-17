import {
  EvidenceTable,
  PeptideCallout,
  PeptideClosingDisclaimer,
  PeptideFaqList,
  PeptideGlance,
  PeptideReferences,
  PeptideStatusPanel,
  RelatedCalculatorPanel,
  ResearchTimeline,
} from "@/components/peptide/PeptideArticleParts";
import type { PeptideBullet, PeptideProfile, PeptideSection } from "@/lib/peptides/types";
import {
  flattenProfileText,
  readingTimeMinutes,
} from "@/lib/peptides/types";

function Bullets({ items }: { items: PeptideBullet[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
      {items.map((b) => (
        <li key={`${b.label ?? ""}${b.text}`}>
          {b.label ? (
            <>
              <strong className="text-ink">{b.label}:</strong> {b.text}
            </>
          ) : (
            b.text
          )}
        </li>
      ))}
    </ul>
  );
}

function SectionBody({ section }: { section: PeptideSection }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p.slice(0, 48)} className="text-ink-soft">
          {p}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 ? (
        <Bullets items={section.bullets} />
      ) : null}
      {section.subsections?.map((sub, i) => (
        <div key={`${section.id}-${sub.heading || i}`} className="space-y-3">
          {sub.heading ? (
            <h3 className="text-base font-semibold">{sub.heading}</h3>
          ) : null}
          {sub.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="text-ink-soft">
              {p}
            </p>
          ))}
          {sub.bullets && sub.bullets.length > 0 ? (
            <Bullets items={sub.bullets} />
          ) : null}
        </div>
      ))}
    </section>
  );
}

/**
 * Shared shell for /peptides/[slug] evidence profiles.
 * Renders status, glance, body sections, evidence table (after "potential"),
 * timeline, FAQ, sources, calculator panel and closing disclaimer.
 */
export default function PeptideEvidenceArticle({
  profile,
}: {
  profile: PeptideProfile;
}) {
  const minutes = readingTimeMinutes(flattenProfileText(profile));
  const afterId = profile.evidenceTableAfter ?? "potential";

  // Editorial TODOs live on the profile object / FDA status helper for humans.
  // Do not surface them in the rendered page.

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <PeptideStatusPanel
          statusLabel={profile.statusLabel}
          evidenceReviewedDisplay={profile.evidenceReviewedDisplay}
          readingMinutes={minutes}
        />
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.h1}
        </h1>
        {profile.lead.map((p) => (
          <p key={p.slice(0, 40)} className="max-w-xl text-ink-soft">
            {p}
          </p>
        ))}
      </header>

      <PeptideGlance items={profile.glance} />
      <PeptideCallout>{profile.importantNote}</PeptideCallout>

      {profile.sections.map((section) => (
        <div key={section.id} className="space-y-10">
          <SectionBody section={section} />
          {section.id === afterId ? (
            <EvidenceTable
              caption={profile.evidenceTable.caption}
              headers={profile.evidenceTable.headers}
              rows={profile.evidenceTable.rows}
            />
          ) : null}
        </div>
      ))}

      <ResearchTimeline items={profile.timeline} />
      <PeptideFaqList faqs={profile.faqs} />
      <PeptideReferences sources={profile.sources} />
      <RelatedCalculatorPanel
        href={profile.calculator.href}
        title={profile.calculator.title}
        body={profile.calculator.body}
      />
      <PeptideClosingDisclaimer
        text={profile.closingDisclaimer}
        evidenceReviewedDisplay={profile.evidenceReviewedDisplay}
      />
    </article>
  );
}
