import { ImageResponse } from "next/og";
import { OG_ACCENT, OG_PAPER } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: OG_PAPER,
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 110,
            height: 22,
            borderRadius: 11,
            background: OG_ACCENT,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
