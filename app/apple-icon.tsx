import { ImageResponse } from "next/og";

// Rendered once at build time (static export).
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon: the brand mark from components/shared/logo.tsx on a
// full-bleed tile (iOS applies its own rounded mask).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#0f766e",
        }}
      >
        <div style={{ width: 56, height: 17, borderRadius: 9, background: "#ffffff" }} />
        <div style={{ width: 90, height: 17, borderRadius: 9, background: "#ffffff" }} />
        <div style={{ width: 68, height: 17, borderRadius: 9, background: "#ffffff" }} />
        <div style={{ width: 112, height: 14, borderRadius: 7, background: "rgba(255,255,255,0.6)" }} />
      </div>
    ),
    { ...size },
  );
}
