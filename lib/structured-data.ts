import { siteConfig } from "@/lib/site-config";

/**
 * schema.org building blocks shared by every page, so the same Organization
 * and WebSite are referenced by `@id` instead of being described differently
 * on each page.
 */
export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export const publisher = {
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.maintainer.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
};

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteConfig.url}${path === "/" ? "" : path}`;
}

/** BreadcrumbList from Home → … → the page. */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: siteConfig.name, path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage for questions shown on the page. Answers must be visible text. */
export function faqPage(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replaceAll("`", "") },
    })),
  };
}

/** An article-like page (blog post, guide, comparison). */
export function article({
  type,
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  author,
}: {
  type: "BlogPosting" | "TechArticle" | "Article";
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    image: absoluteUrl(image),
    ...(datePublished ? { datePublished } : {}),
    ...((dateModified ?? datePublished) ? { dateModified: dateModified ?? datePublished } : {}),
    author: author
      ? { "@type": "Organization", name: author, url: siteConfig.url }
      : { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    about: { "@type": "SoftwareApplication", name: siteConfig.name, url: siteConfig.url },
  };
}

/** Wraps nodes in a single JSON-LD graph, always including the publisher. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": [publisher, ...nodes] };
}
