import { siteConfig } from "@/lib/site-config";
import { ogImageSize, renderOgImage } from "@/lib/og";

export const alt = siteConfig.title;
export const size = ogImageSize;
export const contentType = "image/png";

// Branded social preview, generated at build time with no external assets.
export default function OpengraphImage() {
  return renderOgImage({
    title: "Manage every database from one control plane.",
    description:
      "Provision, monitor, back up, restore, and migrate self-hosted database instances from one secure interface.",
  });
}
