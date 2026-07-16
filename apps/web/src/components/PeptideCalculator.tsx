"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  calculateDraw,
  fmt,
  SYRINGES,
  type MassUnit,
  type SyringeCapacity,
} from "@pepexact/engine";
import Syringe from "./Syringe";
import AppCta from "./AppCta";
import {
  Card,
  Errors,
  Field,
  Segmented,
  ShowMath,
  Stat,
  Warnings,
} from "./ui";

const CAPACITIES: SyringeCapacity[] = [30, 50, 100];

export default function PeptideCalculator() {
  const [vial, setVial] = useState("5");
  const [water, setWater] = useState("2");
  const [dose, setDose] = useState("250");
  const [doseUnit, setDoseUnit] = useState<MassUnit>("mcg");
  const [syringe, setSyringe] = useState<SyringeCapacity>(100);
  const [copied, setCopied] = useState(false);
  const dirty = useRef(false);

  // Seed state from a shared URL, once.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const num = (k: string) => {
      const v = q.get(k);
      return v !== null && v !== "" && Number.isFinite(Number(v)) ? v : null;
    };
    const v = num("vial");
    const w = num("water");
    const d = num("dose");
    if (v) setVial(v);
    if (w) setWater(w);
    if (d) setDose(d);
    if (q.get("unit") === "mg") setDoseUnit("mg");
    const s = Number(q.get("syringe"));
    if (CAPACITIES.includes(s as SyringeCapacity)) {
      setSyringe(s as SyringeCapacity);
    }
  }, []);

  // Keep the URL shareable once the user edits anything.
  useEffect(() => {
    if (!dirty.current) return;
    const q = new URLSearchParams({
      vial,
      water,
      dose,
      unit: doseUnit,
      syringe: String(syringe),
    });
    window.history.replaceState(null, "", `?${q.toString()}`);
  }, [vial, water, dose, doseUnit, syringe]);

  const touch = <T,>(setter: (v: T) => void) => {
    return (v: T) => {
      dirty.current = true;
      setter(v);
    };
  };

  const result = useMemo(() => {
    if (vial.trim() === "" || water.trim() === "" || dose.trim() === "") {
      return null;
    }
    return calculateDraw({
      vialMg: Number(vial),
      diluentMl: Number(water),
      doseValue: Number(dose),
      doseUnit,
      syringeCapacityUnits: syringe,
    });
  }, [vial, water, dose, doseUnit, syringe]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="space-y-5">
      <Card>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Peptide in vial"
            value={vial}
            onChange={touch(setVial)}
            suffix="mg"
            placeholder="5"
          />
          <Field
            label="Water added"
            value={water}
            onChange={touch(setWater)}
            suffix="mL"
            placeholder="2"
          />
          <Field
            label="Your dose"
            value={dose}
            onChange={touch(setDose)}
            placeholder="250"
            suffix={
              <Segmented
                ariaLabel="Dose unit"
                options={[
                  { value: "mcg", label: "mcg" },
                  { value: "mg", label: "mg" },
                ]}
                value={doseUnit}
                onChange={touch(setDoseUnit)}
              />
            }
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Syringe
          </span>
          <Segmented
            ariaLabel="Syringe size"
            options={SYRINGES.map((s) => ({
              value: String(s.capacityUnits),
              label: s.label,
            }))}
            value={String(syringe)}
            onChange={touch((v: string) =>
              setSyringe(Number(v) as SyringeCapacity)
            )}
          />
        </div>
      </Card>

      {result && !result.ok && <Errors items={result.errors} />}

      {result && result.ok && (
        <>
          <Card className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Your draw
              </p>
              <p className="mt-1 text-5xl font-semibold tracking-tight">
                {fmt(result.units, 1)}{" "}
                <span className="text-2xl font-normal text-ink-soft">
                  units
                </span>
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                on a U-100 insulin syringe · {fmt(result.volumeMl, 3)} mL
              </p>
            </div>

            <Syringe fillUnits={result.units} capacity={syringe} />

            <div className="grid gap-3 sm:grid-cols-3">
              <Stat
                label="Concentration"
                value={`${fmt(result.concentrationMgPerMl, 3)} mg/mL`}
                sub={`${fmt(result.concentrationMcgPerMl)} mcg/mL`}
              />
              <Stat
                label="Volume per dose"
                value={`${fmt(result.volumeMl, 3)} mL`}
              />
              <Stat
                label="Doses in this vial"
                value={`${result.dosesPerVial}`}
                sub={`at ${fmt(result.doseMcg)} mcg each`}
              />
            </div>

            <Warnings items={result.warnings} />
            <ShowMath steps={result.steps} />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={copyLink}
                className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? "Link copied ✓" : "Copy link to this result"}
              </button>
              <span className="text-xs text-ink-soft">
                The link carries your numbers — save it or share it.
              </span>
            </div>
          </Card>

          <AppCta />
        </>
      )}
    </div>
  );
}
