import Link from "next/link";
import type { BpcTrackerRow, RetaTrackerRow } from "@/lib/peptides/trackers";
import { evidenceUpdateLog } from "@/lib/peptides/trackers";

function TrackerShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function BpcEvidenceTracker({ rows }: { rows: BpcTrackerRow[] }) {
  return (
    <TrackerShell title="BPC-157 evidence and regulatory tracker">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink-soft">
              <th scope="col" className="py-2 pr-3 font-medium">
                Date
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Jurisdiction or evidence type
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Event
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Source
              </th>
              <th scope="col" className="py-2 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.date}-${r.status}`} className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-3 font-medium text-ink">
                  {r.date}
                </th>
                <td className="py-3 pr-3 text-ink-soft">{r.jurisdiction}</td>
                <td className="py-3 pr-3 text-ink-soft">{r.event}</td>
                <td className="py-3 pr-3 text-ink-soft">
                  <a
                    href={r.sourceUrl}
                    className="text-accent-deep hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {r.source}
                  </a>
                </td>
                <td className="py-3 text-ink-soft">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-4 md:hidden">
        {rows.map((r) => (
          <li
            key={`${r.date}-${r.status}`}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm"
          >
            <p className="font-medium text-ink">{r.date}</p>
            <dl className="mt-2 space-y-2 text-ink-soft">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Jurisdiction or evidence type
                </dt>
                <dd>{r.jurisdiction}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Event
                </dt>
                <dd>{r.event}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Source
                </dt>
                <dd>
                  <a
                    href={r.sourceUrl}
                    className="text-accent-deep hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {r.source}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Status
                </dt>
                <dd>{r.status}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-soft">
        Download:{" "}
        <a
          href="/data/bpc-157-evidence-status-2026.csv"
          className="text-accent-deep hover:underline"
        >
          CSV
        </a>{" "}
        ·{" "}
        <a
          href="/data/bpc-157-evidence-status-2026.json"
          className="text-accent-deep hover:underline"
        >
          JSON
        </a>
      </p>
    </TrackerShell>
  );
}

export function RetatrutideClinicalTracker({
  rows,
}: {
  rows: RetaTrackerRow[];
}) {
  return (
    <TrackerShell title="Retatrutide clinical evidence tracker">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink-soft">
              <th scope="col" className="py-2 pr-3 font-medium">
                Study
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Population
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Phase
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Status at review date
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Evidence availability
              </th>
              <th scope="col" className="py-2 font-medium">
                Primary source
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.study} className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-3 font-medium text-ink">
                  {r.study}
                </th>
                <td className="py-3 pr-3 text-ink-soft">{r.population}</td>
                <td className="py-3 pr-3 text-ink-soft">{r.phase}</td>
                <td className="py-3 pr-3 text-ink-soft">{r.statusAtReview}</td>
                <td className="py-3 pr-3 text-ink-soft">
                  {r.evidenceAvailability}
                </td>
                <td className="py-3 text-ink-soft">
                  <a
                    href={r.sourceUrl}
                    className="text-accent-deep hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {r.source}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-4 md:hidden">
        {rows.map((r) => (
          <li
            key={r.study}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm"
          >
            <p className="font-medium text-ink">{r.study}</p>
            <dl className="mt-2 space-y-2 text-ink-soft">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Population
                </dt>
                <dd>{r.population}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Phase
                </dt>
                <dd>{r.phase}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Status at review date
                </dt>
                <dd>{r.statusAtReview}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Evidence availability
                </dt>
                <dd>{r.evidenceAvailability}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider">
                  Primary source
                </dt>
                <dd>
                  <a
                    href={r.sourceUrl}
                    className="text-accent-deep hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {r.source}
                  </a>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-soft">
        Download:{" "}
        <a
          href="/data/retatrutide-clinical-evidence-2026.csv"
          className="text-accent-deep hover:underline"
        >
          CSV
        </a>{" "}
        ·{" "}
        <a
          href="/data/retatrutide-clinical-evidence-2026.json"
          className="text-accent-deep hover:underline"
        >
          JSON
        </a>
      </p>
    </TrackerShell>
  );
}

export function EvidenceUpdateLog() {
  return (
    <details className="rounded-xl border border-line bg-surface px-4 py-3">
      <summary className="cursor-pointer select-none text-sm font-medium text-ink">
        Evidence update log
      </summary>
      <ol className="mt-3 space-y-2 text-sm text-ink-soft">
        {evidenceUpdateLog.map((e) => (
          <li key={e.date}>
            <strong className="text-ink">{e.date}</strong> — {e.text}
          </li>
        ))}
      </ol>
    </details>
  );
}

export function ResearcherContactNote() {
  return (
    <p className="text-sm text-ink-soft">
      Researcher, clinician or journalist? If you spot a source update or need
      the underlying citation list,{" "}
      <Link href="/contact" className="text-accent-deep hover:underline">
        contact PepExact
      </Link>
      .
    </p>
  );
}
