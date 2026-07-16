import Link from "next/link";
import { siteHandle, siteName } from "@/lib/site";
import { compoundNav } from "@/lib/compounds";

const tools = [
  { href: "/peptide-calculator", label: "Peptide calculator" },
  { href: "/reconstitution-calculator", label: "Reconstitution calculator" },
  { href: "/mg-to-mcg-converter", label: "mg to mcg converter" },
  { href: "/syringe-units-calculator", label: "Syringe units calculator" },
];

const compounds = compoundNav.map((c) => ({
  href: c.href,
  label: `${c.name} calculator`,
}));

const guides = [
  { href: "/guides/mg-vs-mcg", label: "mg vs mcg, explained" },
  {
    href: "/guides/how-to-read-an-insulin-syringe",
    label: "How to read an insulin syringe",
  },
  {
    href: "/guides/why-calculators-disagree",
    label: "Why calculators disagree",
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Calculators
            </h2>
            <ul className="space-y-2 text-sm">
              {tools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-ink-soft hover:text-ink">
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
                <li key={c.href}>
                  <Link href={c.href} className="text-ink-soft hover:text-ink">
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
                <li key={g.href}>
                  <Link href={g.href} className="text-ink-soft hover:text-ink">
                    {g.label}
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
          it does not sell peptides. Regulations differ between countries,
          including Australia (TGA) and the United States (FDA). Speak with a
          licensed health professional about anything health-related.
        </p>
        <p className="mt-4 text-xs text-ink-soft">
          © {new Date().getFullYear()} {siteName}. Independent — nothing to
          sell you. {siteHandle}
        </p>
      </div>
    </footer>
  );
}
