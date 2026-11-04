import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

// The Fleetdock installer lives in the main repository. Redirect to it rather
// than keeping a copy in public/: copies drift, and the installer must always
// match the docker-compose.yml it downloads from the same branch.
const INSTALLER_URL =
  "https://raw.githubusercontent.com/Fleetdock/fleetdock/main/scripts/install.sh";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Temporary (307), so clients never cache where the script lives.
      // `curl -sSL` and `wget` both follow it.
      { source: "/install.sh", destination: INSTALLER_URL, permanent: false },
    ];
  },
  async rewrites() {
    // Plain-Markdown copies of content pages for AI assistants and agents,
    // served by app/md/[section]/[[...slug]]/route.ts.
    return ["docs", "blog", "guides", "alternatives"].flatMap((section) => [
      { source: `/${section}.md`, destination: `/md/${section}` },
      { source: `/${section}/:path*.md`, destination: `/md/${section}/:path*` },
    ]);
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
