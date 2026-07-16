import type { Metadata } from "next";
import UnitsCalculator from "@/components/UnitsCalculator";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import Link from "next/link";
import { webAppJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Syringe Units Calculator — U-100 units to mL",
  description:
    "Convert insulin syringe units to millilitres and back. On a U-100 syringe, 100 units = 1 mL. Includes a visual syringe and conversion table.",
  alternates: { canonical: "/syringe-units-calculator" },
};

const table = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100];

export default function Page() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={webAppJsonLd({
          name: "PepExact Syringe Units Calculator",
          path: "/syringe-units-calculator",
          description:
            "Convert U-100 insulin syringe units to millilitres and back, with a rendered syringe.",
        })}
      />
      <Breadcrumbs path="/syringe-units-calculator" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Syringe units calculator
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          U-100 means 100 units per millilitre. Convert between units and mL,
          and see the draw rendered on a syringe.
        </p>
      </header>

      <UnitsCalculator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Units to mL reference</h2>
        <table className="w-full max-w-md text-sm">
          <thead>
            <tr className="border-b border-line text-left text-ink-soft">
              <th className="py-2 font-medium">U-100 units</th>
              <th className="py-2 font-medium">Millilitres</th>
            </tr>
          </thead>
          <tbody>
            {table.map((u) => (
              <tr key={u} className="border-b border-line/60">
                <td className="py-2">{u} units</td>
                <td className="py-2">{(u / 100).toFixed(2)} mL</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-ink-soft">
          The unit-to-mL ratio never changes across U-100 syringe sizes — a
          0.3 mL, 0.5 mL, and 1.0 mL syringe all use the same 100-units-per-mL
          scale; they just hold different maximums.{" "}
          <Link
            href="/guides/how-to-read-an-insulin-syringe"
            className="text-accent hover:underline"
          >
            Learn to read the markings.
          </Link>
        </p>
      </section>

      <RelatedTools path="/syringe-units-calculator" />

      <p className="text-xs text-ink-soft">
        PepExact is a measurement tool, not medical advice. It converts units
        from numbers you provide — it never suggests a dose.
      </p>
    </div>
  );
}
