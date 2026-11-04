/**
 * Central configuration for the Fleetdock marketing site and documentation
 * portal. Every external URL, product string, and navigation entry lives here
 * so nothing is hardcoded across components.
 *
 * Values are sourced from the Fleetdock repository (github.com/Fleetdock/fleetdock).
 * Where a public URL is not yet confirmed it is left as a clearly-marked
 * placeholder rather than invented.
 */

const GITHUB_REPO = "https://github.com/Fleetdock/fleetdock";

// The production domain referenced by the repository README badge.
// Override at build time with NEXT_PUBLIC_SITE_URL if it changes.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://fleetdock.dev";

export const siteConfig = {
  name: "Fleetdock",
  /** Short one-liner used in nav, footer, and OG fallbacks. */
  tagline: "The open-source control plane for self-hosted databases.",
  /** Primary product description used for metadata and hero support copy. */
  description:
    "Provision, monitor, back up, restore, and migrate self-hosted database instances across your servers from one secure interface.",
  /** Default document title; kept under ~65 characters so search results show it whole. */
  title: "Fleetdock — Open-source control plane for self-hosted databases",
  /** Search-result description; kept under ~160 characters to avoid truncation. */
  metaDescription:
    "Open-source control plane for self-hosted MariaDB, MySQL, and PostgreSQL: provision, monitor, back up, restore, and migrate databases across your servers.",

  url: SITE_URL,

  license: {
    name: "Apache-2.0",
    url: `${GITHUB_REPO}/blob/main/LICENSE`,
  },

  maintainer: {
    name: "Fleetdock",
    url: "https://github.com/Fleetdock",
    securityEmail: "security@fleetdock.com",
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
  { title: "Use cases", href: "/use-cases" },
  { title: "Guides", href: "/guides" },
  { title: "Blog", href: "/blog" },
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
      { title: "Pricing", href: "/pricing" },
      { title: "Use cases", href: "/use-cases" },
      { title: "Architecture", href: "/architecture" },
      { title: "Security", href: "/security" },
      { title: "About", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Documentation", href: "/docs" },
      { title: "Getting started", href: "/docs/getting-started" },
      { title: "Guides", href: "/guides" },
      { title: "Blog", href: "/blog" },
      { title: "API reference", href: "/docs/api" },
    ],
  },
  {
    title: "Compare",
    links: [
      { title: "All alternatives", href: "/alternatives" },
      { title: "vs phpMyAdmin", href: "/alternatives/phpmyadmin" },
      { title: "vs pgAdmin", href: "/alternatives/pgadmin" },
      { title: "vs Adminer", href: "/alternatives/adminer" },
      { title: "vs ClusterControl", href: "/alternatives/clustercontrol" },
      { title: "vs Percona PMM", href: "/alternatives/percona-pmm" },
    ],
  },
  {
    title: "Open source",
    links: [
      { title: "GitHub", href: siteConfig.links.github, external: true },
      { title: "Releases", href: siteConfig.links.releases, external: true },
      { title: "Changelog", href: siteConfig.links.changelog, external: true },
      { title: "Roadmap", href: siteConfig.links.roadmap, external: true },
      {
        title: "Contributing",
        href: siteConfig.links.contributing,
        external: true,
      },
      { title: "License", href: siteConfig.links.license, external: true },
    ],
  },
];
