import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050505",
        color: "#ffffff",
        padding: 72,
        fontFamily: "Arial",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 34, fontWeight: 800 }}>Kobina</div>
        <div style={{ color: "#a1a1aa", fontSize: 24 }}>
          Full Stack Developer
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            maxWidth: 820,
            fontSize: 78,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.06em",
          }}
        >
          Polished digital experiences with clarity and taste.
        </div>
        <div style={{ marginTop: 32, color: "#a1a1aa", fontSize: 28 }}>
          Projects · Stack · Services · Contact
        </div>
      </div>
      <div
        style={{
          width: 180,
          height: 6,
          background: "linear-gradient(90deg, #fb923c, #c2410c)",
        }}
      />
    </div>,
    size,
  );
}
