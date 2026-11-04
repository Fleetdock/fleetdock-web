import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

/**
 * The site is exported as static files (`out/`) and served by Cloudflare
 * Pages; nothing runs on a server. Redirects and response headers live in
 * public/_redirects and public/_headers, which Pages applies — including the
 * /install.sh redirect to the installer in the main repository.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  // No image optimisation server: screenshots ship as the PNGs in public/.
  images: { unoptimized: true },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
