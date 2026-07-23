import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Syringe from "@/components/Syringe";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ReviewedOn from "@/components/ReviewedOn";
import {
  articleJsonLd,
  GUIDE_MODIFIED_ISO,
  GUIDE_PUBLISHED_ISO,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "How to read an insulin syringe — U-100, units, and tick marks",
  description:
    "What U-100 means, how the 0.3, 0.5, and 1.0 mL sizes differ, what the tick marks represent, and how to read a draw accurately.",
  alternates: { canonical: "/guides/how-to-read-an-insulin-syringe" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <JsonLd
        data={articleJsonLd({
          headline:
            "How to read an insulin syringe — U-100, units, and tick marks",
          path: "/guides/how-to-read-an-insulin-syringe",
          description:
            "What U-100 means, how syringe sizes differ, and how to read the markings accurately.",
          datePublished: GUIDE_PUBLISHED_ISO,
          dateModified: GUIDE_MODIFIED_ISO,
        })}
      />
      <Breadcrumbs path="/guides/how-to-read-an-insulin-syringe" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How to read an insulin syringe
        </h1>
        <p className="mt-2 text-ink-soft">
          The markings are simpler than they look — once you know what U-100
          actually means.
        </p>
      </header>

      <ReviewedOn />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What U-100 means</h2>
        <p className="text-ink-soft">
          U-100 is a concentration standard from insulin: 100 units per
          millilitre. On any U-100 syringe, the unit markings are really volume
          markings in disguise — <strong className="text-ink">1 unit is
          always 0.01 mL</strong>. Draw to the 10-unit mark and you&apos;ve
          drawn 0.10 mL of liquid, whatever that liquid is.
        </p>
        <p className="text-ink-soft">
          That&apos;s why peptide calculators output &quot;units&quot;: it is
          the easiest way to name an exact position on the syringe you&apos;re
          holding.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">The three common sizes</h2>
        <table className="w-full max-w-lg text-sm">
          <thead>
            <tr className="border-b border-line text-left text-ink-soft">
              <th className="py-2 font-medium">Barrel size</th>
              <th className="py-2 font-medium">Capacity</th>
              <th className="py-2 font-medium">Typical markings</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line/60">
              <td className="py-2">0.3 mL</td>
              <td className="py-2">30 units</td>
              <td className="py-2">every 1 unit (some every ½)</td>
            </tr>
            <tr className="border-b border-line/60">
              <td className="py-2">0.5 mL</td>
              <td className="py-2">50 units</td>
              <td className="py-2">every 1 unit</td>
            </tr>
            <tr className="border-b border-line/60">
              <td className="py-2">1.0 mL</td>
              <td className="py-2">100 units</td>
              <td className="py-2">every 2 units</td>
            </tr>
          </tbody>
        </table>
        <p className="text-ink-soft">
          Smaller barrels spread the same units over more physical distance, so
          they&apos;re easier to read precisely for small draws. The scale
          itself never changes: 20 units is 0.2 mL on all three.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Reading a draw</h2>
        <p className="text-ink-soft">
          Read the position of the <strong className="text-ink">front edge
          of the plunger&apos;s rubber seal</strong> — the edge closest to the
          needle — against the printed scale. Here is 35 units on a 100-unit
          syringe:
        </p>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <Syringe
            fillUnits={35}
            capacity={100}
            caption="The seal's front edge sits on the 35-unit line: 0.35 mL"
          />
        </div>
        <p className="text-ink-soft">
          Common misreadings: judging from the seal&apos;s back edge or its
          middle (both overstate the draw), viewing the barrel at an angle
          rather than eye level, and counting tick marks without first checking
          what each tick represents on that particular barrel — 1 unit on some
          sizes, 2 on others.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Checking the number</h2>
        <p className="text-ink-soft">
          A draw is just volume, so you can always sanity-check it: units ÷ 100
          = mL. If the units you expect to draw don&apos;t match the volume
          your own math says a dose should be, one of the two numbers is wrong
          — recompute before drawing. The{" "}
          <Link href="/syringe-units-calculator" className="text-accent hover:underline">
            syringe units calculator
          </Link>{" "}
          does the conversion instantly, the{" "}
          <Link
            href="/guides/syringe-units-chart"
            className="text-accent hover:underline"
          >
            printable units chart
          </Link>{" "}
          lists every mark as mL, and the{" "}
          <Link href="/peptide-calculator" className="text-accent hover:underline">
            peptide calculator
          </Link>{" "}
          shows the full working from vial to units.
        </p>
      </section>

      <RelatedTools path="/guides/how-to-read-an-insulin-syringe" />

      <p className="text-xs text-ink-soft">
        This guide covers reading measurements only. It is not medical advice
        and doesn&apos;t cover technique for administering anything.
      </p>
    </article>
  );
}
