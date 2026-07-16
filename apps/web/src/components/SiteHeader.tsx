import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="no-print border-b border-line bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Pep<span className="text-accent">Exact</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink-soft">
          <Link href="/peptide-calculator" className="hover:text-ink">
            Calculator
          </Link>
          <Link href="/peptide-calculator#compounds" className="hover:text-ink">
            Compounds
          </Link>
          <Link href="/reconstitution-calculator" className="hover:text-ink">
            Reconstitution
          </Link>
          <Link href="/guides/mg-vs-mcg" className="hover:text-ink">
            Guides
          </Link>
        </nav>
      </div>
    </header>
  );
}
