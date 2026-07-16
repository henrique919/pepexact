"use client";

import { useMemo, useState } from "react";
import { calculateDiluent, fmt, type MassUnit } from "@pepexact/engine";
import Syringe from "./Syringe";
import {
  Card,
  Errors,
  Field,
  Segmented,
  ShowMath,
  Stat,
  Warnings,
} from "./ui";

const ALT_TARGETS = [5, 10, 20, 25, 50];

export default function ReconstitutionCalculator() {
  const [vial, setVial] = useState("5");
  const [dose, setDose] = useState("250");
  const [doseUnit, setDoseUnit] = useState<MassUnit>("mcg");
  const [target, setTarget] = useState("10");

  const result = useMemo(() => {
    if (vial.trim() === "" || dose.trim() === "" || target.trim() === "") {
      return null;
    }
    return calculateDiluent({
      vialMg: Number(vial),
      doseValue: Number(dose),
      doseUnit,
      targetUnits: Number(target),
    });
  }, [vial, dose, doseUnit, target]);

  const alternatives = useMemo(() => {
    const v = Number(vial);
    const d = Number(dose);
    if (!Number.isFinite(v) || !Number.isFinite(d) || v <= 0 || d <= 0) {
      return [];
    }
    return ALT_TARGETS.map((t) => {
      const r = calculateDiluent({
        vialMg: v,
        doseValue: d,
        doseUnit,
        targetUnits: t,
      });
      return r.ok ? { target: t, diluentMl: r.diluentMl } : null;
    }).filter((x): x is { target: number; diluentMl: number } => x !== null);
  }, [vial, dose, doseUnit]);

  return (
    <div className="space-y-5">
      <Card>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Peptide in vial"
            value={vial}
            onChange={setVial}
            suffix="mg"
            placeholder="5"
          />
          <Field
            label="Your dose"
            value={dose}
            onChange={setDose}
            placeholder="250"
            suffix={
              <Segmented
                ariaLabel="Dose unit"
                options={[
                  { value: "mcg", label: "mcg" },
                  { value: "mg", label: "mg" },
                ]}
                value={doseUnit}
                onChange={setDoseUnit}
              />
            }
          />
          <Field
            label="Draw you want"
            value={target}
            onChange={setTarget}
            suffix="units"
            placeholder="10"
          />
        </div>
      </Card>

      {result && !result.ok && <Errors items={result.errors} />}

      {result && result.ok && (
        <Card className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Add
            </p>
            <p className="mt-1 text-5xl font-semibold tracking-tight">
              {fmt(result.diluentMl, 2)}{" "}
              <span className="text-2xl font-normal text-ink-soft">
                mL of water
              </span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              and each {fmt(Number(dose))} {doseUnit} dose lands on{" "}
              {fmt(Number(target), 1)} units.
            </p>
          </div>

          <Syringe fillUnits={Number(target)} capacity={100} />

          <div className="grid gap-3 sm:grid-cols-2">
            <Stat
              label="Resulting concentration"
              value={`${fmt(result.concentrationMgPerMl, 3)} mg/mL`}
              sub={`${fmt(result.concentrationMcgPerMl)} mcg/mL`}
            />
            <Stat
              label="Doses in this vial"
              value={`${result.dosesPerVial}`}
            />
          </div>

          <Warnings items={result.warnings} />
          <ShowMath steps={result.steps} />

          {alternatives.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Other round-number options
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-ink-soft">
                    <th className="py-2 font-medium">Draw per dose</th>
                    <th className="py-2 font-medium">Water to add</th>
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((a) => (
                    <tr key={a.target} className="border-b border-line/60">
                      <td className="py-2">{a.target} units</td>
                      <td className="py-2">{fmt(a.diluentMl, 2)} mL</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
