import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/site";
import { breadcrumbTrail } from "@/lib/routes";

/**
 * Single breadcrumb source of truth (TASK-V2-009): emits BreadcrumbList
 * JSON-LD and a small visible trail from the same routes.ts-derived path, so
 * the two can never disagree. Renders nothing for the homepage (a one-item
 * "Home" trail isn't a meaningful breadcrumb).
 */
export default function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  if (trail.length < 2) return null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <nav aria-label="Breadcrumb" className="text-xs text-ink-soft">
        {trail.map((t, i) => (
          <span key={t.path}>
            {i > 0 && <span className="mx-1.5">/</span>}
            {i === trail.length - 1 ? (
              <span className="text-ink">{t.name}</span>
            ) : (
              <Link href={t.path} className="hover:text-ink hover:underline">
                {t.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
