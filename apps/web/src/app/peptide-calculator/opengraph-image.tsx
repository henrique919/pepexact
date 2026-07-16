import { ogImageResponse } from "@/lib/og";

export const alt = "PepExact peptide calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogImageResponse("Peptide calculator — syringe units from vial, water, dose");
}
