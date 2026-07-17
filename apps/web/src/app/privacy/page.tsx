import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteHandle, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — PepExact",
  description:
    "How PepExact handles privacy: no accounts, calculator inputs stay in your browser session, and we do not sell personal data.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <Breadcrumbs path="/privacy" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Last updated 17 July 2026. {siteName} is a simple measurement site —
          we keep data collection minimal.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">No accounts</h2>
        <p className="text-ink-soft">
          You do not create an account to use the calculators. We do not ask for
          a name, email, or health history to run the arithmetic.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Calculator inputs</h2>
        <p className="text-ink-soft">
          Vial, water, and dose values are processed in your browser to show
          results. They are not stored in a {siteName} user database. Shareable
          query URLs (if you use them) put numbers in the address bar — treat
          those like any other link you choose to share.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Hosting and logs</h2>
        <p className="text-ink-soft">
          The site is hosted on standard web infrastructure (including Vercel).
          Hosts may process ordinary request logs (IP, user agent, path) as part
          of serving pages. We do not sell personal data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <p className="text-ink-soft">
          PepExact uses Google Tag Manager (container GTM-NQRJ9KN4) and Google
          Analytics 4 (measurement ID G-6B35Q3CXCT) to understand aggregate
          traffic. Google may collect usage data under their terms. Calculator
          inputs are not sent to PepExact as a stored user profile.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Waitlist</h2>
        <p className="text-ink-soft">
          If you join an external waitlist (Google Form or similar), that
          provider&apos;s privacy policy applies to what you submit there.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-ink-soft">
          Questions: {siteHandle}. See also{" "}
          <Link href="/terms" className="text-accent hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/about" className="text-accent hover:underline">
            About
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
