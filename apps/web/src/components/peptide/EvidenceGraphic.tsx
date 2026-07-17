import Link from "next/link";

const REUSE =
  "Publishers may reuse this graphic with a visible source credit to PepExact. Please link to the original evidence page so readers can inspect the sources and current status.";

export function EvidenceGraphic({
  title,
  svgHref,
  pngHref,
  pageHref,
  textEquivalent,
}: {
  title: string;
  svgHref: string;
  pngHref: string;
  pageHref: string;
  textEquivalent: string;
}) {
  return (
    <figure className="space-y-3 rounded-xl border border-line bg-surface p-4">
      <figcaption className="text-base font-semibold text-ink">{title}</figcaption>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={svgHref}
        alt={title}
        className="h-auto w-full max-w-full"
        width={960}
        height={540}
      />
      <p className="sr-only">{textEquivalent}</p>
      <p className="text-xs text-ink-soft">
        Source:{" "}
        <Link href={pageHref} className="text-accent-deep hover:underline">
          {pageHref}
        </Link>
        .{" "}
        <a href={svgHref} className="text-accent-deep hover:underline">
          SVG
        </a>{" "}
        ·{" "}
        <a href={pngHref} className="text-accent-deep hover:underline">
          PNG
        </a>
      </p>
      <p className="text-xs text-ink-soft">{REUSE}</p>
    </figure>
  );
}
