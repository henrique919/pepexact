import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import { articleJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "mg vs mcg — the 1,000× difference, explained",
  description:
    "Milligrams and micrograms differ by a factor of 1,000, and mixing them up is the most common dosing-math mistake. How to keep them straight, with a conversion table.",
  alternates: { canonical: "/guides/mg-vs-mcg" },
};

export default function Page() {
  return (
    <article className="space-y-6">
      <JsonLd
        data={articleJsonLd({
          headline: "mg vs mcg — the 1,000× difference, explained",
          path: "/guides/mg-vs-mcg",
          description:
            "Milligrams and micrograms differ by a factor of 1,000. How to keep them straight when doing dose arithmetic.",
        })}
      />
      <Breadcrumbs path="/guides/mg-vs-mcg" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          mg vs mcg: the 1,000× difference
        </h1>
        <p className="mt-2 text-ink-soft">
          Two abbreviations, one decimal point of danger. Here&apos;s how the
          units relate and how to stop them tripping you up.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">The relationship</h2>
        <p className="text-ink-soft">
          Both are units of mass in the metric system. A milligram (mg) is one
          thousandth of a gram. A microgram (mcg, sometimes written µg) is one
          thousandth of a milligram. So:
        </p>
        <p className="rounded-xl bg-accent-soft/60 px-4 py-3 font-medium">
          1 mg = 1,000 mcg &nbsp;·&nbsp; 1 mcg = 0.001 mg
        </p>
        <p className="text-ink-soft">
          To go from mg to mcg, multiply by 1,000 (move the decimal three
          places right). To go from mcg to mg, divide by 1,000 (three places
          left). That&apos;s the entire conversion — there are no edge cases.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Why peptide math mixes them</h2>
        <p className="text-ink-soft">
          Vial labels are almost always printed in milligrams: a vial might say
          5 mg or 10 mg. But individual doses are often discussed in
          micrograms, because typical amounts per dose are small — hundreds of
          mcg rather than whole mg. So a single calculation routinely uses both
          units, and every crossing between them is a chance to slip three
          decimal places.
        </p>
        <p className="text-ink-soft">
          A reliable habit: convert everything to micrograms first, do all the
          arithmetic in mcg, and only convert back at the end if you need to.
          One unit, no crossings, no 1,000× surprises. This is exactly what the{" "}
          <Link href="/peptide-calculator" className="text-accent hover:underline">
            peptide calculator
          </Link>{" "}
          does internally — and why its &quot;show the math&quot; steps display
          both units at each stage.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Conversion table</h2>
        <table className="w-full max-w-md text-sm">
          <thead>
            <tr className="border-b border-line text-left text-ink-soft">
              <th className="py-2 font-medium">mg</th>
              <th className="py-2 font-medium">mcg</th>
            </tr>
          </thead>
          <tbody>
            {[
              [0.05, 50],
              [0.1, 100],
              [0.25, 250],
              [0.5, 500],
              [1, 1000],
              [2.5, 2500],
              [5, 5000],
              [10, 10000],
            ].map(([mg, mcg]) => (
              <tr key={mg} className="border-b border-line/60">
                <td className="py-2">{mg} mg</td>
                <td className="py-2">{mcg.toLocaleString("en-US")} mcg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Three ways people get burned</h2>
        <p className="text-ink-soft">
          <strong className="text-ink">Reading µg as mg.</strong> The µ symbol
          renders badly in some fonts and gets transcribed as &quot;ug&quot; or
          misread entirely. If a number looks suspiciously large or small,
          check which unit it was originally written in.
        </p>
        <p className="text-ink-soft">
          <strong className="text-ink">Typing the dose in the wrong box.</strong>{" "}
          Entering 250 into a field that expects mg, when you meant 250 mcg,
          produces an answer 1,000× too high. Any calculator worth using labels
          its units on every field and lets you switch them explicitly.
        </p>
        <p className="text-ink-soft">
          <strong className="text-ink">Trusting a memorised number of units.</strong>{" "}
          &quot;My dose is 10 units&quot; is only true for one specific
          concentration. Change the water volume at reconstitution and the same
          mcg dose is a different number of units. Recompute whenever the vial
          changes.
        </p>
      </section>

      <RelatedTools path="/guides/mg-vs-mcg" />

      <p className="text-xs text-ink-soft">
        This guide covers measurement arithmetic only. It is not medical advice
        and doesn&apos;t suggest what or how much of anything to take.
      </p>
    </article>
  );
}
