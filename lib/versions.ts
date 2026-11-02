export type DocVersion = {
  id: string;
  label: string;
  default?: boolean;
};

/**
 * Documentation/API versions served on fleetdock-web.
 *
 * To enable v2 later:
 * 1. Add `{ id: "v2", label: "v2" }` here
 * 2. Add `content/docs/v2/**` and `v2/api` OpenAPI source
 * 3. Extend or add an OpenAPI spec with `/v2` routes
 * 4. `showVersionSwitcher` becomes true automatically
 */
export const DOC_VERSIONS = [
  { id: "v1", label: "v1", default: true },
  // { id: "v2", label: "v2" },
] as const satisfies readonly DocVersion[];

export type DocVersionId = (typeof DOC_VERSIONS)[number]["id"];

export const DEFAULT_VERSION =
  DOC_VERSIONS.find((v) => v.default)?.id ?? DOC_VERSIONS[0].id;

export const showVersionSwitcher = DOC_VERSIONS.length > 1;

const NON_DEFAULT_VERSIONS = DOC_VERSIONS.filter(
  (v) => v.id !== DEFAULT_VERSION,
).map((v) => v.id);

const SHARED_API_PATHS = new Set([
  "/healthz",
  "/readyz",
  "/metrics",
  "/install.sh",
  "/openapi.yaml",
  "/docs",
]);

/** Routes included when generating OpenAPI pages for a version. */
export function isPathInVersion(path: string, version: DocVersionId): boolean {
  if (SHARED_API_PATHS.has(path)) return true;
  if (
    path.startsWith(`/${version}/`) ||
    path.startsWith(`/agent/${version}/`)
  ) {
    return true;
  }
  return false;
}

/** Remove version segments from generated OpenAPI file paths. */
export function stripVersionFromApiFilePath(
  filePath: string,
  version: DocVersionId,
): string {
  return filePath
    .replace(new RegExp(`^${version}/`), "")
    .replace(new RegExp(`^agent/${version}/`), "agent/");
}

export function getVersionFromPath(pathname: string): DocVersionId {
  for (const version of NON_DEFAULT_VERSIONS) {
    if (
      pathname === `/docs/${version}` ||
      pathname.startsWith(`/docs/${version}/`)
    ) {
      return version;
    }
  }
  return DEFAULT_VERSION;
}

export function stripVersionPrefix(
  pathname: string,
  version: DocVersionId = getVersionFromPath(pathname),
): string {
  if (version === DEFAULT_VERSION) return pathname;
  if (pathname === `/docs/${version}`) return "/docs";
  if (pathname.startsWith(`/docs/${version}/`)) {
    return `/docs/${pathname.slice(`/docs/${version}/`.length)}`;
  }
  return pathname;
}

export function withVersionPrefix(path: string, version: DocVersionId): string {
  const normalized = path.startsWith("/docs")
    ? path
    : `/docs${path.startsWith("/") ? path : `/${path}`}`;

  if (version === DEFAULT_VERSION) {
    for (const id of NON_DEFAULT_VERSIONS) {
      if (normalized.startsWith(`/docs/${id}/`)) {
        return normalized.replace(`/docs/${id}/`, "/docs/");
      }
      if (normalized === `/docs/${id}`) return "/docs";
    }
    return normalized;
  }

  const relative = normalized.replace(/^\/docs\/?/, "");
  return relative ? `/docs/${version}/${relative}` : `/docs/${version}`;
}

export function docsPath(
  path: string,
  version: DocVersionId = DEFAULT_VERSION,
): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const full = clean.startsWith("/docs") ? clean : `/docs${clean}`;
  return withVersionPrefix(full, version);
}

/** Split URL slug segments into version + Fumadocs page slug. */
export function resolveDocsSlug(slug?: string[]): {
  version: DocVersionId;
  slug: string[];
} {
  if (!slug?.length) {
    return { version: DEFAULT_VERSION, slug: [] };
  }

  const head = slug[0];
  if (NON_DEFAULT_VERSIONS.includes(head as DocVersionId)) {
    return { version: head as DocVersionId, slug: slug.slice(1) };
  }

  return { version: DEFAULT_VERSION, slug };
}

/** Map a public URL slug to the Fumadocs storage slug. */
export function getPageSlug(version: DocVersionId, slug: string[]): string[] {
  if (version === DEFAULT_VERSION) return slug;
  return [version, ...slug];
}

export function getEquivalentDocsPath(
  pathname: string,
  targetVersion: DocVersionId,
): string {
  const currentVersion = getVersionFromPath(pathname);
  const shared = stripVersionPrefix(pathname, currentVersion);
  return withVersionPrefix(shared, targetVersion);
}
