import Link from "next/link";
import type { PeptideGlanceItem } from "@/lib/peptides/types";

export function PeptideStatusPanel({
  statusLabel,
  evidenceReviewedDisplay,
  readingMinutes,
}: {
  statusLabel: string;
  evidenceReviewedDisplay: string;
  readingMinutes: number;
}) {
  return (
    <aside
      className="rounded-xl border border-line bg-surface px-4 py-3 text-sm"
      aria-label="Article status"
    >
      <p className="font-medium text-ink">{statusLabel}</p>
      <p className="mt-1 text-ink-soft">
        Evidence last reviewed: {evidenceReviewedDisplay}
        <span className="mx-2 text-line" aria-hidden>
          ·
        </span>
        {readingMinutes} min read
      </p>
    </aside>
  );
}

export function PeptideGlance({ items }: { items: PeptideGlanceItem[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">At a glance</h2>
      <ul className="space-y-2 text-sm text-ink-soft">
        {items.map((item) => (
          <li key={item.label}>
            <strong className="text-ink">{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PeptideCallout({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="note"
      className="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink-soft"
    >
      <strong className="text-ink">Important:</strong> {children}
    </p>
  );
}

export function EvidenceTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: [string, string, string, string];
  rows: {
    area: string;
    available: string;
    observed: string;
    unknown: string;
  }[];
}) {
  const [h0, h1, h2, h3] = headers;
  const tableCaption = caption ?? "Evidence summary";
  return (
    <div className="space-y-3">
      {caption ? (
        <p className="text-sm font-medium text-ink">{caption}</p>
      ) : null}
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <caption className="sr-only">{tableCaption}</caption>
          <thead>
            <tr className="border-b border-line text-ink-soft">
              <th scope="col" className="py-2 pr-3 font-medium">
                {h0}
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                {h1}
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                {h2}
              </th>
              <th scope="col" className="py-2 font-medium">
                {h3}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.area} className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-3 font-medium text-ink">
                  {row.area}
                </th>
                <td className="py-3 pr-3 text-ink-soft">{row.available}</td>
                <td className="py-3 pr-3 text-ink-soft">{row.observed}</td>
                <td className="py-3 text-ink-soft">{row.unknown}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile stacked rows with explicit labels */}
      <ul className="space-y-4 md:hidden">
        {rows.map((row) => (
          <li
            key={row.area}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm"
          >
            <p className="font-medium text-ink">{row.area}</p>
            <dl className="mt-2 space-y-2 text-ink-soft">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  {h1}
                </dt>
                <dd>{row.available}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  {h2}
                </dt>
                <dd>{row.observed}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  {h3}
                </dt>
                <dd>{row.unknown}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResearchTimeline({
  items,
}: {
  items: { when: string; text: string }[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Research timeline</h2>
      <ol className="space-y-3 border-l border-line pl-4">
        {items.map((item) => (
          <li key={`${item.when}-${item.text.slice(0, 24)}`} className="text-sm">
            <p className="font-medium text-ink">{item.when}</p>
            <p className="mt-0.5 text-ink-soft">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PeptideFaqList({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-line bg-surface px-4 py-3"
          >
            <summary className="cursor-pointer select-none text-sm font-medium text-ink">
              {f.q}
            </summary>
            <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function PeptideReferences({
  sources,
}: {
  sources: { label: string; url: string }[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Sources and further reading
      </h2>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-ink-soft">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              className="text-accent-deep hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RelatedCalculatorPanel({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <section className="space-y-3 rounded-xl border border-line bg-surface px-4 py-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Related measurement tool
      </h2>
      <h3 className="text-base font-semibold">
        <Link href={href} className="text-accent-deep hover:underline">
          {title}
        </Link>
      </h3>
      <p className="text-sm text-ink-soft">{body}</p>
      <p>
        <Link
          href={href}
          className="inline-flex min-h-11 items-center text-sm font-medium text-accent-deep hover:underline"
        >
          Open the {title}
        </Link>
      </p>
    </section>
  );
}

export function PeptideClosingDisclaimer({
  text,
  evidenceReviewedDisplay,
}: {
  text: string;
  evidenceReviewedDisplay: string;
}) {
  return (
    <footer className="space-y-3 border-t border-line pt-8">
      <p
        role="note"
        className="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink-soft"
      >
        {text}
      </p>
      <p className="text-xs text-ink-soft">
        Evidence last reviewed: {evidenceReviewedDisplay}.
      </p>
    </footer>
  );
}
