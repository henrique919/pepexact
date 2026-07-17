import type { Metadata } from "next";
import ReconstitutionCalculator from "@/components/ReconstitutionCalculator";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import { webAppJsonLd, webPageJsonLd } from "@/lib/site";

const TITLE = "Reconstitution Calculator — how much water to add";
const DESCRIPTION =
  "Work backwards from the draw you want: enter vial size, dose, and target syringe units to get the exact bacteriostatic water volume to add. Free, with the math shown.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/reconstitution-calculator" },
};

export default function Page() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={webPageJsonLd({
          name: TITLE,
          path: "/reconstitution-calculator",
          description: DESCRIPTION,
        })}
      />
      <JsonLd
        data={webAppJsonLd({
          name: "PepExact Reconstitution Calculator",
          path: "/reconstitution-calculator",
          description:
            "Calculate how much bacteriostatic water to add to a peptide vial so each dose lands on an easy-to-read syringe mark.",
        })}
      />
      <Breadcrumbs path="/reconstitution-calculator" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Reconstitution calculator
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Pick the draw you want each dose to be — a round, easy-to-read number
          of units — and PepExact tells you exactly how much water to add to
          the vial.
        </p>
      </header>

      <ReconstitutionCalculator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Why the water volume matters
        </h2>
        <p className="text-ink-soft">
          The amount of water you add doesn&apos;t change how much peptide is
          in the vial — it changes the concentration, and therefore how big or
          small each draw is on the syringe. More water means larger, easier
          draws; less water means smaller ones and stretches a small syringe
          further.
        </p>
        <p className="text-ink-soft">
          A draw that lands exactly on a syringe marking (10 units, 20 units)
          is easier to read consistently than one that falls between marks.
          This calculator works backwards from that goal: choose the units you
          want, and it computes the water volume that makes the arithmetic come
          out clean.
        </p>
      </section>

      <RelatedTools path="/reconstitution-calculator" />

      <p className="text-xs text-ink-soft">
        PepExact is a measurement tool, not medical advice. It calculates
        volumes and concentrations from numbers you provide — it never suggests
        a dose.
      </p>
    </div>
  );
}
