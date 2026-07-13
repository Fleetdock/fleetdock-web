import path from "node:path";
import { createOpenAPI } from "fumadocs-openapi/server";
import type { SchemaToPagesOptions } from "fumadocs-openapi";
import {
  DEFAULT_VERSION,
  type DocVersionId,
  isPathInVersion,
  stripVersionFromApiFilePath,
} from "@/lib/versions";

const SPEC_PATH = "./openapi/openapi.yaml";

const baseOpenapi = createOpenAPI({
  input: [SPEC_PATH],
  proxyUrl: "/api/proxy",
});

type BundledDocument = Awaited<
  ReturnType<typeof baseOpenapi.getSchema>
>["bundled"];

function filterDocumentByVersion(
  document: BundledDocument,
  version: DocVersionId,
): BundledDocument {
  const paths = Object.fromEntries(
    Object.entries(document.paths ?? {}).filter(([route]) =>
      isPathInVersion(route, version),
    ),
  );

  return { ...document, paths };
}

async function loadVersionedDocument(
  version: DocVersionId,
): Promise<BundledDocument> {
  const { bundled } = await baseOpenapi.getSchema(SPEC_PATH);
  return filterDocumentByVersion(bundled, version);
}

function createPageNameFn(version: DocVersionId): NonNullable<
  Extract<SchemaToPagesOptions, { per?: "operation" }>["name"]
> {
  return function pageName(entry) {
    if (entry.type === "operation") {
      const operation =
        this.document.paths?.[entry.item.path]?.[entry.item.method];
      if (operation?.operationId) return operation.operationId;

      let filePath = stripVersionFromApiFilePath(
        this.routePathToFilePath(entry.item.path),
        version,
      );
      return path.join(filePath, entry.item.method.toLowerCase());
    }

    const hook = this.dereferenceShallow(
      this.document.webhooks?.[entry.item.name],
    )?.[entry.item.method];
    if (hook?.operationId) return hook.operationId;

    return path.join(
      entry.item.name.replace(/\s+/g, "-").toLowerCase(),
      entry.item.method.toLowerCase(),
    );
  };
}

function createVersionedOpenAPI(version: DocVersionId) {
  return createOpenAPI({
    input: {
      [SPEC_PATH]: () => loadVersionedDocument(version),
    },
    proxyUrl: "/api/proxy",
  });
}

/**
 * Default OpenAPI server (v1). Used by the API playground proxy route.
 */
export const openapi = createVersionedOpenAPI(DEFAULT_VERSION);

/** OpenAPI virtual pages scoped to a documentation version. */
export async function createVersionedOpenAPISource(version: DocVersionId) {
  const baseDir = version === DEFAULT_VERSION ? "api" : `${version}/api`;
  const server =
    version === DEFAULT_VERSION ? openapi : createVersionedOpenAPI(version);

  return server.staticSource({
    baseDir,
    groupBy: "tag",
    name: createPageNameFn(version),
  });
}
