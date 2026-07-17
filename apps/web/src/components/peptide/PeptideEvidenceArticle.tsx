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
import CiteThisPage from "@/components/peptide/CiteThisPage";
import CopyHeadingLink from "@/components/peptide/CopyHeadingLink";
import { EvidenceGraphic } from "@/components/peptide/EvidenceGraphic";
import {
  BpcEvidenceTracker,
  EvidenceUpdateLog,
  ResearcherContactNote,
  RetatrutideClinicalTracker,
} from "@/components/peptide/EvidenceTrackers";
import {
  bpcEvidenceTracker,
  retatrutideClinicalTracker,
} from "@/lib/peptides/trackers";
import type {
  PeptideBullet,
  PeptideProfile,
  PeptideSection,
} from "@/lib/peptides/types";
import {
  flattenProfileText,
  readingTimeMinutes,
} from "@/lib/peptides/types";
import { slugifyHeading } from "@/lib/slugify";

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

function SectionHeading({
  level,
  text,
}: {
  level: 2 | 3;
  text: string;
}) {
  const id = slugifyHeading(text);
  const className =
    level === 2
      ? "group scroll-mt-24 text-xl font-semibold tracking-tight"
      : "group scroll-mt-24 text-base font-semibold";
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className={className}>
      <span className="inline">{text}</span>
      <CopyHeadingLink fragment={id} label={text} />
    </Tag>
  );
}

function SectionBody({ section }: { section: PeptideSection }) {
  return (
    <section className="space-y-4" aria-labelledby={slugifyHeading(section.heading)}>
      <SectionHeading level={2} text={section.heading} />
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
          {sub.heading ? <SectionHeading level={3} text={sub.heading} /> : null}
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
 */
export default function PeptideEvidenceArticle({
  profile,
}: {
  profile: PeptideProfile;
}) {
  const minutes = readingTimeMinutes(flattenProfileText(profile));
  const afterId = profile.evidenceTableAfter ?? "potential";
  const isBpc = profile.slug === "bpc-157";

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

      {isBpc ? (
        <EvidenceGraphic
          title="BPC-157: evidence by research level"
          svgHref="/graphics/bpc-157-evidence-by-research-level.svg"
          pngHref="/graphics/bpc-157-evidence-by-research-level.png"
          pageHref="/peptides/bpc-157"
          textEquivalent="Qualitative bars: extensive laboratory and animal research; small limited human reports; no approved clinical use as of 17 July 2026."
        />
      ) : (
        <EvidenceGraphic
          title="Retatrutide: clinical development timeline"
          svgHref="/graphics/retatrutide-clinical-development-timeline.svg"
          pngHref="/graphics/retatrutide-clinical-development-timeline.png"
          pageHref="/peptides/retatrutide"
          textEquivalent="Timeline from early clinical studies through 2023 Phase 2 peer review, 2025 TRIUMPH-4 completion, May–June 2026 TRIUMPH-1 sponsor topline and TRANSCEND peer review, remaining investigational as of 17 July 2026."
        />
      )}

      {isBpc ? (
        <BpcEvidenceTracker rows={bpcEvidenceTracker} />
      ) : (
        <RetatrutideClinicalTracker rows={retatrutideClinicalTracker} />
      )}

      <EvidenceUpdateLog />
      <ResearchTimeline items={profile.timeline} />
      <PeptideFaqList faqs={profile.faqs} />

      <CiteThisPage
        title={profile.h1}
        path={profile.path}
        datePublished={profile.datePublished}
        dateReviewed={profile.evidenceReviewedDisplay}
      />

      <PeptideReferences sources={profile.sources} />
      <ResearcherContactNote />

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
