import { ogImageResponse } from "@/lib/og";

export const alt = "PepExact — the independent peptide calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogImageResponse("Vial, water, dose → exact syringe units");
}
