export interface PeptideGlanceItem {
  label: string;
  value: string;
}

export interface PeptideBullet {
  label?: string;
  text: string;
}

export interface PeptideSubsection {
  heading: string;
  paragraphs: string[];
  bullets?: PeptideBullet[];
}

export interface PeptideSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: PeptideBullet[];
  subsections?: PeptideSubsection[];
}

export interface PeptideEvidenceRow {
  area: string;
  available: string;
  observed: string;
  unknown: string;
}

export interface PeptideTimelineItem {
  when: string;
  text: string;
}

export interface PeptideFaq {
  q: string;
  a: string;
}

export interface PeptideSource {
  label: string;
  url: string;
}

export interface PeptideProfile {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  breadcrumbLabel: string;
  statusLabel: string;
  datePublished: string;
  dateModified: string;
  evidenceReviewedDisplay: string;
  lead: string[];
  glance: PeptideGlanceItem[];
  importantNote: string;
  sections: PeptideSection[];
  evidenceTable: {
    caption?: string;
    headers: [string, string, string, string];
    rows: PeptideEvidenceRow[];
  };
  /** Insert evidence table after this section id (default: "potential"). */
  evidenceTableAfter?: string;
  timeline: PeptideTimelineItem[];
  faqs: PeptideFaq[];
  sources: PeptideSource[];
  calculator: { href: string; title: string; body: string };
  closingDisclaimer: string;
  editorialNotes?: string | string[];
}

export function flattenProfileText(profile: PeptideProfile): string {
  const parts: string[] = [
    profile.h1,
    ...profile.lead,
    ...profile.glance.map((g) => `${g.label} ${g.value}`),
    profile.importantNote,
  ];

  for (const s of profile.sections) {
    parts.push(s.heading, ...(s.paragraphs ?? []));
    for (const b of s.bullets ?? []) {
      parts.push(b.label ? `${b.label} ${b.text}` : b.text);
    }
    for (const sub of s.subsections ?? []) {
      if (sub.heading) parts.push(sub.heading);
      parts.push(...sub.paragraphs);
      for (const b of sub.bullets ?? []) {
        parts.push(b.label ? `${b.label} ${b.text}` : b.text);
      }
    }
  }

  for (const r of profile.evidenceTable.rows) {
    parts.push(r.area, r.available, r.observed, r.unknown);
  }
  for (const t of profile.timeline) parts.push(t.when, t.text);
  for (const f of profile.faqs) parts.push(f.q, f.a);
  for (const s of profile.sources) parts.push(s.label);
  parts.push(
    profile.calculator.title,
    profile.calculator.body,
    profile.closingDisclaimer,
  );
  return parts.join(" ");
}

/** Approximate reading time from body copy (~220 wpm). */
export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
