import Link from "next/link";
import { allRoutes } from "@/lib/routes";

const compoundLinks = allRoutes.filter((r) => r.kind === "compound");

/**
 * Compact chip links to every compound calculator. Used on the homepage and
 * the hub (peptide calculator) so the compound cluster is discoverable without
 * a wall of cards. Reads from routes.ts, so new slugs appear everywhere
 * automatically.
 */
export default function CompoundLinks({
  excludeSlugs = [],
  labelled = false,
}: {
  /** Slugs already featured elsewhere on the page (e.g. homepage popular pair). */
  excludeSlugs?: string[];
  /** When true, render an “All compound calculators” label above the chips. */
  labelled?: boolean;
}) {
  const links = compoundLinks.filter(
    (c) => !excludeSlugs.some((slug) => c.path === `/calculator/${slug}`),
  );

  if (links.length === 0) return null;

  return (
    <div className="space-y-3">
      {labelled ? (
        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-ink-soft">
          All compound calculators
        </h3>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {links.map((c) => (
          <Link
            key={c.path}
            href={c.path}
            className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink-soft transition-colors hover:border-accent-deep hover:text-accent-deep"
          >
            {c.label.replace(/ calculator$/, "")}
          </Link>
        ))}
      </div>
    </div>
  );
}
