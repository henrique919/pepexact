import { ImageResponse } from "next/og";

const INK = "#15181a";
const STEEL = "#4a5157";
const SIGNAL = "#ff4d2e";

// 180×180 Apple touch icon: graphite ground + the Index mark (no wordmark).
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
          background: INK,
        }}
      >
        {/* mark canvas ~ 96×108 */}
        <div style={{ position: "relative", width: 96, height: 108, display: "flex" }}>
          {/* minor ticks */}
          <div style={{ position: "absolute", left: 14, bottom: 12, width: 6, height: 20, borderRadius: 3, background: STEEL, display: "flex" }} />
          <div style={{ position: "absolute", left: 30, bottom: 12, width: 6, height: 32, borderRadius: 3, background: STEEL, display: "flex" }} />
          <div style={{ position: "absolute", left: 60, bottom: 12, width: 6, height: 32, borderRadius: 3, background: STEEL, display: "flex" }} />
          <div style={{ position: "absolute", left: 76, bottom: 12, width: 6, height: 20, borderRadius: 3, background: STEEL, display: "flex" }} />
          {/* index bar */}
          <div style={{ position: "absolute", left: 43, bottom: 10, width: 10, height: 66, borderRadius: 5, background: SIGNAL, display: "flex" }} />
          {/* pointer */}
          <div style={{ position: "absolute", left: 35, top: 0, width: 0, height: 0, borderLeft: "13px solid transparent", borderRight: "13px solid transparent", borderTop: `20px solid ${SIGNAL}`, display: "flex" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
