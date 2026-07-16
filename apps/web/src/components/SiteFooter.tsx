import Link from "next/link";
import { siteHandle, siteName } from "@/lib/site";
import { allRoutes } from "@/lib/routes";

const tools = [
  allRoutes.find((r) => r.path === "/peptide-calculator")!,
  ...allRoutes.filter((r) => r.kind === "converter"),
];
const compounds = allRoutes.filter((r) => r.kind === "compound");
const guides = [
  ...allRoutes.filter((r) => r.kind === "guide"),
  ...allRoutes.filter((r) => r.kind === "regulatory"),
];
const info = allRoutes.filter((r) => r.kind === "info");

export default function SiteFooter() {
  return (
    <footer className="no-print border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Calculators
            </h2>
            <ul className="space-y-2 text-sm">
              {tools.map((t) => (
                <li key={t.path}>
                  <Link href={t.path} className="text-ink-soft hover:text-ink">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Compounds
            </h2>
            <ul className="space-y-2 text-sm">
              {compounds.map((c) => (
                <li key={c.path}>
                  <Link href={c.path} className="text-ink-soft hover:text-ink">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Guides
            </h2>
            <ul className="space-y-2 text-sm">
              {guides.map((g) => (
                <li key={g.path}>
                  <Link href={g.path} className="text-ink-soft hover:text-ink">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              About
            </h2>
            <ul className="space-y-2 text-sm">
              {info.map((i) => (
                <li key={i.path}>
                  <Link href={i.path} className="text-ink-soft hover:text-ink">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-ink-soft">
          {siteName} is an educational measurement tool. It does the arithmetic
          of concentrations, volumes, and syringe units — nothing more. It is
          not medical advice, it never suggests what or how much to take, and
          it does not sell peptides. Regulations differ between countries —
          including the United States (FDA), the United Kingdom (MHRA), and
          Australia (TGA). See{" "}
          <Link
            href="/guides/peptide-regulators"
            className="text-accent hover:underline"
          >
            peptide regulators
          </Link>
          . Speak with a licensed health professional about anything
          health-related.
        </p>
        <p className="mt-4 text-xs text-ink-soft">
          © {new Date().getFullYear()} {siteName}. Independent — nothing to
          sell you. {siteHandle}
        </p>
      </div>
    </footer>
  );
}
