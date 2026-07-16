import { strict as assert } from "node:assert";
import {
  calculateDraw,
  calculateDiluent,
  mgToMcg,
  mcgToMg,
  unitsToMl,
  mlToUnits,
  roundTo,
  fmt,
} from "../src/index";

let passed = 0;
function t(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`  ok - ${name}`);
}

/* conversions */
t("mgToMcg", () => {
  assert.equal(mgToMcg(1), 1000);
  assert.equal(mgToMcg(0.25), 250);
  assert.equal(mgToMcg(5.5), 5500);
});

t("mcgToMg", () => {
  assert.equal(mcgToMg(1000), 1);
  assert.equal(mcgToMg(250), 0.25);
  assert.equal(mcgToMg(1), 0.001);
});

t("unitsToMl / mlToUnits", () => {
  assert.equal(unitsToMl(10), 0.1);
  assert.equal(unitsToMl(100), 1);
  assert.equal(unitsToMl(2.5), 0.025);
  assert.equal(mlToUnits(0.25), 25);
  assert.equal(mlToUnits(1), 100);
  assert.equal(mlToUnits(0.033), 3.3);
});

t("roundTo & fmt", () => {
  assert.equal(roundTo(0.1 + 0.2, 2), 0.3);
  assert.equal(roundTo(1.005, 2), 1.01);
  assert.equal(fmt(2500), "2,500");
  assert.equal(fmt(0.18333, 3), "0.183");
});

/* canonical draw: 5 mg vial, 2 mL water, 250 mcg dose */
t("calculateDraw canonical", () => {
  const r = calculateDraw({ vialMg: 5, diluentMl: 2, doseValue: 250, doseUnit: "mcg" });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.concentrationMgPerMl, 2.5);
  assert.equal(r.concentrationMcgPerMl, 2500);
  assert.equal(r.volumeMl, 0.1);
  assert.equal(r.units, 10);
  assert.equal(r.dosesPerVial, 20);
  assert.equal(r.warnings.length, 0);
  assert.equal(r.steps.length, 4);
});

t("calculateDraw with mg dose", () => {
  const r = calculateDraw({ vialMg: 10, diluentMl: 1, doseValue: 1, doseUnit: "mg" });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.concentrationMgPerMl, 10);
  assert.equal(r.units, 10);
  assert.equal(r.dosesPerVial, 10);
});

t("calculateDraw non-round thirds", () => {
  const r = calculateDraw({ vialMg: 5, diluentMl: 3, doseValue: 300, doseUnit: "mcg" });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.volumeMl, 0.18);
  assert.equal(r.units, 18);
  assert.equal(r.dosesPerVial, 16);
});

t("calculateDraw warns: dose exceeds vial", () => {
  const r = calculateDraw({ vialMg: 1, diluentMl: 1, doseValue: 2, doseUnit: "mg" });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.ok(r.warnings.some((w) => w.includes("larger than the total")));
});

t("calculateDraw warns: exceeds syringe capacity", () => {
  const r = calculateDraw({ vialMg: 5, diluentMl: 5, doseValue: 2, doseUnit: "mg", syringeCapacityUnits: 100 });
  assert.ok(r.ok);
  if (!r.ok) return;
  // 1 mg/mL → 2 mL → 200 units
  assert.ok(r.warnings.some((w) => w.includes("more than a 100-unit syringe")));
});

t("calculateDraw warns: tiny draw", () => {
  const r = calculateDraw({ vialMg: 10, diluentMl: 1, doseValue: 100, doseUnit: "mcg" });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.units, 1);
  assert.ok(r.warnings.some((w) => w.includes("under 2 units")));
});

t("calculateDraw rejects bad input", () => {
  const r = calculateDraw({ vialMg: 0, diluentMl: -1, doseValue: NaN, doseUnit: "mcg" });
  assert.ok(!r.ok);
  if (r.ok) return;
  assert.equal(r.errors.length, 3);
});

/* reconstitution */
t("calculateDiluent canonical", () => {
  const r = calculateDiluent({ vialMg: 5, doseValue: 250, doseUnit: "mcg", targetUnits: 10 });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.diluentMl, 2);
  assert.equal(r.concentrationMcgPerMl, 2500);
  assert.equal(r.dosesPerVial, 20);
});

t("calculateDiluent warns above 3 mL", () => {
  const r = calculateDiluent({ vialMg: 10, doseValue: 250, doseUnit: "mcg", targetUnits: 10 });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.diluentMl, 4);
  assert.ok(r.warnings.some((w) => w.includes("more than many small vials")));
});

t("calculateDiluent rejects bad input", () => {
  const r = calculateDiluent({ vialMg: -5, doseValue: 0, doseUnit: "mcg", targetUnits: Infinity });
  assert.ok(!r.ok);
});

/* engine consistency: draw(diluent(x)) round-trips */
t("round-trip consistency draw ↔ diluent", () => {
  const d = calculateDiluent({ vialMg: 8, doseValue: 400, doseUnit: "mcg", targetUnits: 25 });
  assert.ok(d.ok);
  if (!d.ok) return;
  const r = calculateDraw({ vialMg: 8, diluentMl: d.diluentMl, doseValue: 400, doseUnit: "mcg" });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.units, 25);
});

console.log(`\n${passed} test groups passed.`);
