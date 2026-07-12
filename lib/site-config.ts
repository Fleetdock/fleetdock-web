/**
 * Central configuration for the Fleetdock marketing site and documentation
 * portal. Every external URL, product string, and navigation entry lives here
 * so nothing is hardcoded across components.
 *
 * Values are sourced from the Fleetdock repository (github.com/TajBrains/fleetdock).
 * Where a public URL is not yet confirmed it is left as a clearly-marked
 * placeholder rather than invented.
 */

const GITHUB_REPO = "https://github.com/TajBrains/fleetdock";

// The production domain referenced by the repository README badge.
// Override at build time with NEXT_PUBLIC_SITE_URL if it changes.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://fleetdock.dev";

export const siteConfig = {
  name: "Fleetdock",
  /** Short one-liner used in nav, footer, and OG fallbacks. */
  tagline: "The open-source control plane for self-hosted databases.",
  /** Primary product description used for metadata and hero support copy. */
  description:
    "Provision, monitor, back up, restore, and migrate self-hosted database instances across your servers from one secure interface.",
  /** Longer description for SEO metadata. */
  metaDescription:
    "Fleetdock is an open-source control plane for managing self-hosted MariaDB, MySQL, and PostgreSQL across your own servers — provisioning, monitoring, backups, restores, and migrations from one secure dashboard.",

  url: SITE_URL,

  license: {
    name: "Apache-2.0",
    url: `${GITHUB_REPO}/blob/main/LICENSE`,
  },

  /** First public release, from CHANGELOG.md / ROADMAP.md. */
  version: "v0.1.0",

  maintainer: {
    name: "TajBrains",
    url: "https://github.com/TajBrains",
    securityEmail: "security@tajbrains.com",
  },

  /** Supported database engines, per the repository. */
  engines: ["MariaDB", "MySQL", "PostgreSQL"] as const,

  links: {
    github: GITHUB_REPO,
    docs: "/docs",
    getStarted: "/docs/getting-started",
    releases: `${GITHUB_REPO}/releases`,
    issues: `${GITHUB_REPO}/issues`,
    contributing: `${GITHUB_REPO}/blob/main/CONTRIBUTING.md`,
    security: `${GITHUB_REPO}/blob/main/SECURITY.md`,
    securityAdvisory: `${GITHUB_REPO}/security/advisories/new`,
    changelog: `${GITHUB_REPO}/blob/main/CHANGELOG.md`,
    roadmap: `${GITHUB_REPO}/blob/main/ROADMAP.md`,
    codeOfConduct: `${GITHUB_REPO}/blob/main/CODE_OF_CONDUCT.md`,
    license: `${GITHUB_REPO}/blob/main/LICENSE`,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Primary top-navigation links (marketing pages + docs). */
export const mainNav: { title: string; href: string; external?: boolean }[] = [
  { title: "Features", href: "/features" },
  { title: "Architecture", href: "/architecture" },
  { title: "Use cases", href: "/use-cases" },
  { title: "Security", href: "/security" },
  { title: "Documentation", href: "/docs" },
];

/** Footer link groups. Only destinations that actually exist are listed. */
export const footerNav: {
  title: string;
  links: { title: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Product",
    links: [
      { title: "Overview", href: "/" },
      { title: "Features", href: "/features" },
      { title: "Architecture", href: "/architecture" },
      { title: "Use cases", href: "/use-cases" },
      { title: "Security", href: "/security" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Getting started", href: "/docs/getting-started" },
      { title: "Core concepts", href: "/docs/concepts" },
      { title: "Backups", href: "/docs/backups" },
      { title: "Security", href: "/docs/security" },
    ],
  },
  {
    title: "Open source",
    links: [
      { title: "GitHub", href: siteConfig.links.github, external: true },
      { title: "Releases", href: siteConfig.links.releases, external: true },
      { title: "Roadmap", href: siteConfig.links.roadmap, external: true },
      { title: "Contributing", href: siteConfig.links.contributing, external: true },
      { title: "License", href: siteConfig.links.license, external: true },
    ],
  },
];
