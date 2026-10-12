import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/** Keep long descriptions to about three lines on the card. */
function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[,;:—-]$/, "")}…`;
}

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Branded 1200×630 social preview, rendered with no external assets. Shared by
 * the site-wide image and the per-page documentation images.
 */
export function renderOgImage({
  title,
  description,
  label,
  footer = ["Open source", "Self-hosted", siteConfig.license.name],
}: {
  title: string;
  description?: string;
  /** Small label beside the wordmark, e.g. "Docs". */
  label?: string;
  footer?: string[];
}) {
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
          {label ? (
            <div
              style={{
                fontSize: 28,
                color: "#2dd4bf",
                border: "2px solid rgba(45,212,191,0.4)",
                borderRadius: 999,
                padding: "4px 18px",
              }}
            >
              {label}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 40 ? 62 : 72,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: 28,
                color: "#8b97a8",
                maxWidth: 960,
                lineHeight: 1.3,
              }}
            >
              {truncate(description, 170)}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#a1a1aa" }}>
          {footer.flatMap((item, i) => [
            ...(i > 0 ? [<span key={`sep-${i}`}>·</span>] : []),
            <span key={item} style={i === 0 ? { color: "#2dd4bf", fontWeight: 600 } : undefined}>
              {item}
            </span>,
          ])}
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
