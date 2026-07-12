import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social preview, generated at build time with no external assets.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px",
          color: "#fafafa",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(rgba(161,161,170,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(161,161,170,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 7,
              width: 68,
              height: 68,
              background: "#0f766e",
              borderRadius: 15,
              padding: "16px 14px",
              justifyContent: "center",
            }}
          >
            <div style={{ height: 7, width: "62%", borderRadius: 4, background: "#ffffff" }} />
            <div style={{ height: 7, width: "100%", borderRadius: 4, background: "#ffffff" }} />
            <div style={{ height: 7, width: "78%", borderRadius: 4, background: "#ffffff" }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            Manage every database from one control plane.
          </div>
          <div style={{ fontSize: 28, color: "#8b97a8", maxWidth: 900, lineHeight: 1.3 }}>
            Provision, monitor, back up, restore, and migrate self-hosted database instances
            from one secure interface.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#a1a1aa" }}>
          <span style={{ color: "#2dd4bf", fontWeight: 600 }}>Open source</span>
          <span>·</span>
          <span>Self-hosted</span>
          <span>·</span>
          <span>Apache-2.0</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
