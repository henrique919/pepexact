import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteHandle, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "About PepExact — independent peptide measurement tool",
  description:
    "PepExact is an independent educational measurement utility: vial, water, and dose → U-100 syringe units, with the math shown. No sales, no dosing advice.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <Breadcrumbs path="/about" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          About {siteName}
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          An independent educational measurement utility for reconstitution
          arithmetic — built for people who want the draw numbers to add up.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What we are</h2>
        <p className="text-ink-soft">
          {siteName} turns a vial size (mg), the water you add (mL), and a dose
          you already have into concentration, draw volume, and U-100 syringe
          units — and shows every step. The same pure TypeScript engine powers
          the web tools today and is designed for future app parity.
        </p>
        <p className="text-ink-soft">
          Start with the{" "}
          <Link href="/peptide-calculator" className="text-accent hover:underline">
            peptide calculator
          </Link>
          , or read{" "}
          <Link href="/methodology" className="text-accent hover:underline">
            how the calculation works
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What we are not</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Not a clinic, pharmacy, or marketplace</li>
          <li>Not medical, legal, or dosing advice</li>
          <li>No peptide sales, vendors, affiliates, or &ldquo;where to buy&rdquo;</li>
          <li>No protocols, stacks, or recommended amounts</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-ink-soft">
          {siteHandle} on X. For product updates, use the waitlist link on the
          calculator after a result.
        </p>
      </section>

      <p className="text-xs text-ink-soft">
        See also{" "}
        <Link href="/privacy" className="text-accent hover:underline">
          Privacy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="text-accent hover:underline">
          Terms
        </Link>
        .
      </p>
    </article>
  );
}
