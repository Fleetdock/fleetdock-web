import { loader } from "fumadocs-core/source";
import { alternatives, blog, docs, guides } from "@/.source/server";
import { createVersionedOpenAPISource, openapi } from "@/lib/openapi";
import { DEFAULT_VERSION } from "@/lib/versions";

/**
 * Combined Fumadocs content source: hand-written MDX docs plus generated
 * OpenAPI reference pages from `openapi/openapi.yaml`.
 */
export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await createVersionedOpenAPISource(DEFAULT_VERSION),
  },
  {
    baseUrl: "/docs",
    plugins: [openapi.loaderPlugin()],
  },
);

/** Blog posts at /blog/<slug>. */
export const blogSource = loader({
  source: blog.toFumadocsSource(),
  baseUrl: "/blog",
});

/** How-to guides at /guides/<slug>. */
export const guidesSource = loader({
  source: guides.toFumadocsSource(),
  baseUrl: "/guides",
});

/** Comparisons with other tools at /alternatives/<slug>. */
export const alternativesSource = loader({
  source: alternatives.toFumadocsSource(),
  baseUrl: "/alternatives",
});

export type BlogPost = ReturnType<typeof blogSource.getPages>[number];

/** Blog posts, newest first. */
export function getBlogPosts(): BlogPost[] {
  return [...blogSource.getPages()].sort((a, b) =>
    b.data.date.localeCompare(a.data.date),
  );
}

/**
 * The real last-modified date of a page from git, or undefined. A shallow
 * clone (common on CI) gives every file the date of the latest commit; that
 * would claim every page changed on every deploy, so when all pages share one
 * date it is treated as unknown.
 */
export function gitLastModified(page: { data: unknown }): Date | undefined {
  return trustGitDates() ? readLastModified(page) : undefined;
}

function readLastModified(page: { data: unknown }): Date | undefined {
  const value = (page.data as { lastModified?: unknown }).lastModified;
  return value instanceof Date ? value : undefined;
}

let gitDatesTrusted: boolean | undefined;
function trustGitDates(): boolean {
  if (gitDatesTrusted === undefined) {
    const dates = new Set(
      source
        .getPages()
        .map((p) => readLastModified(p)?.getTime())
        .filter((t): t is number => t !== undefined),
    );
    gitDatesTrusted = dates.size > 1;
  }
  return gitDatesTrusted;
}
