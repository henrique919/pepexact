import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteHandle, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact PepExact",
  description:
    "How to reach PepExact. We are an independent peptide measurement tool — not a clinic or seller.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <Breadcrumbs path="/contact" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          {siteName} is a small independent measurement utility. We do not
          provide medical advice or product support for peptides.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Reach us</h2>
        <p className="text-ink-soft">
          Public updates and messages:{" "}
          <a
            href={`https://x.com/${siteHandle.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {siteHandle}
          </a>{" "}
          on X.
        </p>
        <p className="text-ink-soft">
          Product waitlist links appear on calculator pages after a result when
          configured. Those forms are hosted externally and follow their own
          privacy policies.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What we cannot help with</h2>
        <ul className="list-disc space-y-2 pl-5 text-ink-soft">
          <li>Dosing, protocols, or whether a peptide is appropriate for you</li>
          <li>Sourcing, vendors, or purchasing</li>
          <li>Legal determinations for a specific substance or country</li>
        </ul>
        <p className="text-ink-soft">
          For measurement questions, start with the{" "}
          <Link href="/peptide-calculator" className="text-accent hover:underline">
            peptide calculator
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="text-accent hover:underline">
            methodology
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
