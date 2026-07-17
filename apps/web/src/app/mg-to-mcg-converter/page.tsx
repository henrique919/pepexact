import type { Metadata } from "next";
import MgMcgConverter from "@/components/MgMcgConverter";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import Link from "next/link";
import { webAppJsonLd, webPageJsonLd } from "@/lib/site";

const TITLE = "mg to mcg Converter — milligrams to micrograms";
const DESCRIPTION =
  "Convert milligrams to micrograms and back, instantly. 1 mg = 1,000 mcg. Includes a quick-reference table for common peptide amounts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/mg-to-mcg-converter" },
};

const table = [
  { mg: 0.1, mcg: 100 },
  { mg: 0.25, mcg: 250 },
  { mg: 0.5, mcg: 500 },
  { mg: 1, mcg: 1000 },
  { mg: 2, mcg: 2000 },
  { mg: 2.5, mcg: 2500 },
  { mg: 5, mcg: 5000 },
  { mg: 10, mcg: 10000 },
];

export default function Page() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={webPageJsonLd({
          name: TITLE,
          path: "/mg-to-mcg-converter",
          description: DESCRIPTION,
        })}
      />
      <JsonLd
        data={webAppJsonLd({
          name: "PepExact mg to mcg Converter",
          path: "/mg-to-mcg-converter",
          description:
            "Instant milligram to microgram conversion. 1 mg = 1,000 mcg.",
        })}
      />
      <Breadcrumbs path="/mg-to-mcg-converter" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          mg to mcg converter
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          One milligram is exactly 1,000 micrograms. This is the conversion
          behind most dosing arithmetic — and most dosing mistakes.
        </p>
      </header>

      <MgMcgConverter />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Quick reference</h2>
        <table className="w-full max-w-md text-sm">
          <thead>
            <tr className="border-b border-line text-left text-ink-soft">
              <th className="py-2 font-medium">Milligrams (mg)</th>
              <th className="py-2 font-medium">Micrograms (mcg)</th>
            </tr>
          </thead>
          <tbody>
            {table.map((r) => (
              <tr key={r.mg} className="border-b border-line/60">
                <td className="py-2">{r.mg} mg</td>
                <td className="py-2">{r.mcg.toLocaleString("en-US")} mcg</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-ink-soft">
          Vial labels are usually printed in mg; doses are often quoted in mcg.
          Mixing the two up shifts a number by a factor of 1,000 — the classic
          &quot;10× or 1,000× error.&quot; When in doubt, convert everything to
          mcg before doing any other arithmetic.{" "}
          <Link href="/guides/mg-vs-mcg" className="text-accent hover:underline">
            Read the full mg vs mcg guide.
          </Link>
        </p>
      </section>

      <RelatedTools path="/mg-to-mcg-converter" />

      <p className="text-xs text-ink-soft">
        PepExact is a measurement tool, not medical advice. It converts units
        from numbers you provide — it never suggests a dose.
      </p>
    </div>
  );
}
