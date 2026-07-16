import Link from "next/link";
import { compoundNav } from "@/lib/compounds";

/**
 * Compact chip links to every compound calculator. Used on the homepage and
 * the hub (peptide calculator) so the compound cluster is discoverable without
 * a wall of cards. Reads from the single compounds data source, so new slugs
 * appear everywhere automatically.
 */
export default function CompoundLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      {compoundNav.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
