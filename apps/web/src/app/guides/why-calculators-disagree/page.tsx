import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ReviewedOn from "@/components/ReviewedOn";
import {
  articleJsonLd,
  faqJsonLd,
  GUIDE_MODIFIED_ISO,
  GUIDE_PUBLISHED_ISO,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Why two peptide calculators give different answers",
  description:
    "Same vial, same dose, two different unit numbers? The five reasons peptide calculators disagree — water volume, mg vs mcg, syringe type, rounding, and what 'units' means — and how to settle it.",
  alternates: { canonical: "/guides/why-calculators-disagree" },
};

const faqs = [
  {
    q: "Why do two peptide calculators give different units for the same dose?",
    a: "Almost always because they assume a different water volume, and water volume sets the concentration. The same dose from a vial mixed with 1 mL versus 2 mL of water lands on a different number of units. Other causes are mg/mcg mix-ups, a different syringe type, and rounding at different steps.",
  },
  {
    q: "Which calculator is correct?",
    a: "The one whose inputs match your actual vial. There is no single right answer without knowing the vial size, the exact water added, and the syringe. A trustworthy calculator shows its working so you can check that its inputs match yours.",
  },
  {
    q: "How do I settle the disagreement?",
    a: "Put your real numbers into one calculator that shows every step, and read the working. If the concentration, volume, and unit lines all use the same figures you have on the vial, the result is sound.",
  },
];

export default function Page() {
  return (
    <article className="space-y-6">
      <JsonLd
        data={articleJsonLd({
          headline: "Why two peptide calculators give different answers",
          path: "/guides/why-calculators-disagree",
          description:
            "The five reasons peptide calculators disagree — water volume, mg vs mcg, syringe type, rounding, and the meaning of 'units' — explained with measurement math only.",
          datePublished: GUIDE_PUBLISHED_ISO,
          dateModified: GUIDE_MODIFIED_ISO,
        })}
      />
      <JsonLd data={faqJsonLd(faqs, "/guides/why-calculators-disagree")} />
      <Breadcrumbs path="/guides/why-calculators-disagree" />

      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why two calculators give different answers
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Same vial, same dose, two different numbers of units. It is almost
          never a bug — it is five ordinary measurement differences. Here is
          each one, and how to tell which result matches your vial.
        </p>
      </header>

      <ReviewedOn />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          1. They assume a different water volume
        </h2>
        <p className="text-ink-soft">
          This is the big one. The amount of peptide in the vial never changes,
          but the water you add sets the concentration — and concentration is
          what turns a dose into a number of units. A 5&nbsp;mg vial with
          1&nbsp;mL of water is twice as concentrated as the same vial with
          2&nbsp;mL, so every dose is half the units. Two calculators that
          quietly assume different default water volumes will disagree for this
          reason alone.
        </p>
        <p className="rounded-xl bg-accent-soft/60 px-4 py-3 font-medium">
          Same 5&nbsp;mg vial, same 250&nbsp;mcg dose: 2&nbsp;mL water → 10
          units · 1&nbsp;mL water → 5 units.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Milligrams vs micrograms</h2>
        <p className="text-ink-soft">
          One milligram is 1,000 micrograms. Enter a dose in the wrong unit —
          250 read as mg when you meant 250&nbsp;mcg — and the answer is off by a
          factor of a thousand. If two calculators are a clean 1,000× apart, a
          unit mix-up is the first thing to check. Our{" "}
          <Link href="/guides/mg-vs-mcg" className="text-accent hover:underline">
            mg vs mcg guide
          </Link>{" "}
          covers this in full.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. A different syringe</h2>
        <p className="text-ink-soft">
          &ldquo;Units&rdquo; only means something once you fix the syringe.
          PepExact uses U-100 insulin syringes, where 100 units is 1&nbsp;mL, so
          1 unit is 0.01&nbsp;mL. A calculator that assumes a U-40 syringe, or
          that reports millilitres instead of units, will show a different
          number for the very same draw. The{" "}
          <Link
            href="/syringe-units-calculator"
            className="text-accent hover:underline"
          >
            syringe units calculator
          </Link>{" "}
          and the{" "}
          <Link
            href="/guides/how-to-read-an-insulin-syringe"
            className="text-accent hover:underline"
          >
            insulin syringe guide
          </Link>{" "}
          show exactly what the marks mean.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. Where they round</h2>
        <p className="text-ink-soft">
          Some tools round the millilitre volume first, then convert to units;
          others round the units directly. Rounding to whole units versus one
          decimal place, or snapping a between-marks value to the nearest tick,
          all nudge the final figure. These differences are small — a fraction
          of a unit — but they are enough to make two calculators look like they
          disagree when the underlying math is identical.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          5. What &ldquo;units&rdquo; is being counted
        </h2>
        <p className="text-ink-soft">
          Insulin-syringe units, millilitres, and vague &ldquo;clicks&rdquo; on
          a pen are three different things. If one calculator answers in syringe
          units and another in millilitres, the numbers will not match even when
          both are correct — they are measuring the draw on different scales.
          Always confirm which scale a result is in before comparing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How to settle it</h2>
        <p className="text-ink-soft">
          Pick one calculator that shows its working, enter the numbers printed
          on your vial and the water you actually added, and read the steps. If
          the concentration, volume, and unit lines all use your figures, the
          result is trustworthy — not because a tool said so, but because you can
          see the arithmetic.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/peptide-calculator"
            className="inline-block rounded-xl bg-accent px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Check yours on the peptide calculator
          </Link>
          <Link
            href="/syringe-units-calculator"
            className="inline-block rounded-xl border border-line bg-surface px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Convert units ⇄ mL
          </Link>
        </div>
      </section>

      <section className="space-y-4">
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

      <RelatedTools path="/guides/why-calculators-disagree" />

      <p className="text-xs text-ink-soft">
        This guide explains measurement arithmetic only. It is not medical
        advice and does not suggest what or how much of anything to take.
      </p>
    </article>
  );
}
