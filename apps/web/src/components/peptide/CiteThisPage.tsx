"use client";

import { useMemo, useState } from "react";
import { siteName, siteUrl } from "@/lib/site";

export default function CiteThisPage({
  title,
  path,
  datePublished,
  dateReviewed,
}: {
  title: string;
  path: string;
  datePublished: string;
  dateReviewed: string;
}) {
  const url = `${siteUrl}${path}`;
  const year = datePublished.slice(0, 4);
  const formats = useMemo(
    () => ({
      plain: `${siteName}. (${datePublished}). ${title}. ${url}. Evidence last reviewed ${dateReviewed}.`,
      apa: `${siteName}. (${year}). ${title}. ${url}`,
      bibtex: `@misc{pepexact_${path.replace(/\W+/g, "_")},
  title = {${title}},
  author = {{${siteName}}},
  year = {${year}},
  howpublished = {\\url{${url}}},
  note = {Evidence last reviewed ${dateReviewed}}
}`,
    }),
    [title, path, datePublished, dateReviewed, url, year],
  );

  const [active, setActive] = useState<keyof typeof formats>("plain");
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(formats[active]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="space-y-3 rounded-xl border border-line bg-surface px-4 py-4">
      <h2 className="text-xl font-semibold tracking-tight">Cite this page</h2>
      <dl className="grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider">Title</dt>
          <dd className="text-ink">{title}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider">
            Publisher
          </dt>
          <dd className="text-ink">{siteName}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider">
            Published
          </dt>
          <dd className="text-ink">{datePublished}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider">
            Last reviewed
          </dt>
          <dd className="text-ink">{dateReviewed}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-mono text-[11px] uppercase tracking-wider">
            Canonical URL
          </dt>
          <dd>
            <a href={url} className="break-all text-accent-deep hover:underline">
              {url}
            </a>
          </dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Citation format">
        {(
          [
            ["plain", "Plain text"],
            ["apa", "APA"],
            ["bibtex", "BibTeX"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            className={`inline-flex min-h-11 items-center rounded-lg border px-3 text-sm ${
              active === key
                ? "border-accent-deep bg-accent-soft text-ink"
                : "border-line text-ink-soft hover:text-ink"
            }`}
            onClick={() => setActive(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto rounded-xl border border-line bg-paper p-3 font-mono text-xs text-ink whitespace-pre-wrap">
        {formats[active]}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-medium text-accent-deep hover:border-accent-deep"
      >
        {copied ? "Copied" : "Copy citation"}
      </button>
    </section>
  );
}
