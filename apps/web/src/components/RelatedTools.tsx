import Link from "next/link";
import { relatedFor } from "@/lib/routes";

/**
 * Single related-links source of truth (TASK-V2-009): every tool/guide/
 * compound page renders its related links from routes.ts's relatedFor(),
 * so the internal-link graph is structural rather than hand-maintained.
 */
export default function RelatedTools({
  path,
  heading = "Related tools",
}: {
  path: string;
  heading?: string;
}) {
  const { tools, guides } = relatedFor(path);
  const links = [...tools, ...guides];
  if (links.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <ul className="list-disc space-y-1 pl-5 text-ink-soft">
        {links.map((l) => (
          <li key={l.path}>
            <Link href={l.path} className="text-accent hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
