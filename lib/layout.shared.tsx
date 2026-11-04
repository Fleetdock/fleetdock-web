import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/lib/site-config";

/**
 * Navigation options shared by the documentation layout so the docs portal
 * carries the same identity (logo, links, GitHub) as the marketing site.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: "/",
    },
    links: [
      { text: "Features", url: "/features" },
      { text: "Architecture", url: "/architecture" },
      { text: "Use cases", url: "/use-cases" },
      { text: "Guides", url: "/guides" },
      { text: "Blog", url: "/blog" },
    ],
    githubUrl: siteConfig.links.github,
  };
}
