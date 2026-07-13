import { loader } from "fumadocs-core/source";
import { docs } from "@/.source/server";
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
