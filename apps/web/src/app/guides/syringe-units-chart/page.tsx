import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import PrintButton from "@/components/PrintButton";
import ReviewedOn from "@/components/ReviewedOn";
import {
  articleJsonLd,
  faqJsonLd,
  GUIDE_MODIFIED_ISO,
  GUIDE_PUBLISHED_ISO,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Printable U-100 syringe units chart — units to mL",
  description:
    "Free printable U-100 insulin syringe reference: every unit mark converted to millilitres. Measurement only — print it, keep it by the vial.",
  alternates: { canonical: "/guides/syringe-units-chart" },
};

const faqs = [
  {
    q: "What does this chart convert?",
    a: "U-100 syringe unit marks to millilitres. On a U-100 syringe, 1 unit is always 0.01 mL, so 10 units is 0.10 mL and 100 units is 1.00 mL.",
  },
  {
    q: "Does the chart tell me how many units to draw?",
    a: "No. It only names the volume that each mark represents. Your vial size, water added, and dose still determine which mark to use — that arithmetic is what the peptide calculator does.",
  },
  {
    q: "Which syringe sizes does this apply to?",
    a: "Any U-100 insulin syringe. A 0.3 mL barrel only goes to 30 units, a 0.5 mL to 50, and a 1.0 mL to 100 — but the unit-to-mL ratio is the same on all three.",
  },
];

/** Rows for the printable chart: units → mL (U-100). */
function chartRows(max: number, step: number) {
  const rows: { units: number; ml: string }[] = [];
  for (let u = 0; u <= max; u += step) {
    rows.push({ units: u, ml: (u / 100).toFixed(2) });
  }
  return rows;
}

const CHART_30 = chartRows(30, 1);
const CHART_50 = chartRows(50, 1);
const CHART_100 = chartRows(100, 2);

function ChartTable({
  title,
  caption,
  rows,
}: {
  title: string;
  caption: string;
  rows: { units: number; ml: string }[];
}) {
  return (
    <div className="break-inside-avoid">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mb-2 text-xs text-ink-soft">{caption}</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-ink-soft">
            <th className="py-1.5 font-medium">Units</th>
            <th className="py-1.5 font-medium">mL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.units} className="border-b border-line/50">
              <td className="py-1 tabular-nums">{r.units}</td>
              <td className="py-1 tabular-nums">{r.ml}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <article className="space-y-6">
      <JsonLd
        data={articleJsonLd({
          headline: "Printable U-100 syringe units chart — units to mL",
          path: "/guides/syringe-units-chart",
          description:
            "U-100 insulin syringe unit marks converted to millilitres. Measurement reference only.",
          datePublished: GUIDE_PUBLISHED_ISO,
          dateModified: GUIDE_MODIFIED_ISO,
        })}
      />
      <JsonLd data={faqJsonLd(faqs, "/guides/syringe-units-chart")} />
      <Breadcrumbs path="/guides/syringe-units-chart" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Printable U-100 syringe units chart
        </h1>
        <p className="max-w-xl text-ink-soft">
          A one-page reference for reading U-100 insulin syringe marks as
          millilitres. Print it, keep it next to the vial — it does not calculate
          a dose.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <PrintButton />
          <Link
            href="/syringe-units-calculator"
            className="no-print text-sm text-accent hover:underline"
          >
            Or convert any number live →
          </Link>
        </div>
      </header>

      <ReviewedOn />

      <section className="space-y-3 rounded-xl border border-line bg-accent-soft/40 px-4 py-3 print:border-0 print:bg-transparent print:px-0">
        <h2 className="text-lg font-semibold">The only rule</h2>
        <p className="text-ink-soft">
          On a <strong className="text-ink">U-100</strong> syringe,{" "}
          <strong className="text-ink">1 unit = 0.01 mL</strong>. Multiply units
          by 0.01 to get millilitres; multiply millilitres by 100 to get units.
          Barrel size (0.3 / 0.5 / 1.0 mL) only changes how far the scale goes —
          not what each mark means.
        </p>
      </section>

      <section className="print-chart space-y-6">
        <h2 className="text-xl font-semibold">Unit → mL tables</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <ChartTable
            title="0.3 mL barrel (to 30 units)"
            caption="Every 1 unit"
            rows={CHART_30}
          />
          <ChartTable
            title="0.5 mL barrel (to 50 units)"
            caption="Every 1 unit"
            rows={CHART_50}
          />
          <ChartTable
            title="1.0 mL barrel (to 100 units)"
            caption="Every 2 units (typical tick spacing)"
            rows={CHART_100}
          />
        </div>
      </section>

      <section className="space-y-3 no-print">
        <h2 className="text-xl font-semibold">Use it with the calculator</h2>
        <p className="text-ink-soft">
          This chart names the mark. The{" "}
          <Link href="/peptide-calculator" className="text-accent hover:underline">
            peptide calculator
          </Link>{" "}
          turns your vial mg, water mL, and dose into that mark — and shows the
          working. For a single conversion either way, use the{" "}
          <Link
            href="/syringe-units-calculator"
            className="text-accent hover:underline"
          >
            syringe units calculator
          </Link>
          . For how the markings look on the barrel, see{" "}
          <Link
            href="/guides/how-to-read-an-insulin-syringe"
            className="text-accent hover:underline"
          >
            how to read an insulin syringe
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 no-print">
        <h2 className="text-xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-line bg-surface px-4 py-3"
            >
              <summary className="cursor-pointer select-none font-medium">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools path="/guides/syringe-units-chart" />

      <p className="text-xs text-ink-soft">
        Measurement reference only. PepExact never suggests what or how much to
        take — it only names volumes and unit marks.
      </p>
    </article>
  );
}
