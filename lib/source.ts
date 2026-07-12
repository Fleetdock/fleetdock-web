import { loader } from "fumadocs-core/source";
import { docs } from "@/.source/server";
import { openapi } from "@/lib/openapi";

/**
 * Combined Fumadocs content source: hand-written MDX docs plus generated
 * OpenAPI reference pages from `openapi/openapi.yaml`.
 */
export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      baseDir: "api",
      groupBy: "tag",
    }),
  },
  {
    baseUrl: "/docs",
    plugins: [openapi.loaderPlugin()],
  },
);
