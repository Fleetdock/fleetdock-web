import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { ogImageSize, renderOgImage } from "@/lib/og";

export const alt = siteConfig.title;
export const size = ogImageSize;
export const contentType = "image/png";

const TITLE = "One dashboard for all your databases.";
const DESCRIPTION = "Self-hosted · open source · MariaDB, MySQL, PostgreSQL";

// Social preview: the headline over a real screenshot of the dashboard,
// generated at build time. Falls back to the text-only card if the
// screenshot is missing (see fleetdock/scripts/screenshots.sh).
export default async function OpengraphImage() {
  let shot: string;
  try {
    const png = await readFile(join(process.cwd(), "public/screenshots/dark/overview.png"));
    shot = `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return renderOgImage({ title: TITLE, description: DESCRIPTION });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(60% 70% at 85% 100%, rgba(45,212,191,0.28), transparent 70%), linear-gradient(rgba(161,161,170,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(161,161,170,0.07) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 0 72px", gap: 22, maxWidth: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                width: 52,
                height: 52,
                background: "#0f766e",
                borderRadius: 12,
                padding: "12px 11px",
                justifyContent: "center",
              }}
            >
              <div style={{ height: 5, width: "62%", borderRadius: 3, background: "#fff" }} />
              <div style={{ height: 5, width: "100%", borderRadius: 3, background: "#fff" }} />
              <div style={{ height: 5, width: "78%", borderRadius: 3, background: "#fff" }} />
            </div>
            <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>{siteConfig.name}</div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>{TITLE}</div>
          <div style={{ fontSize: 24, color: "#a1a1aa", lineHeight: 1.3 }}>{DESCRIPTION}</div>
        </div>
        <img
          src={shot}
          width={900}
          height={562}
          alt=""
          style={{
            position: "absolute",
            left: 380,
            top: 340,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    ),
    { ...ogImageSize },
  );
}
