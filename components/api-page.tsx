"use client";

import type { MediaAdapter } from "fumadocs-openapi";
import { createOpenAPIPage } from "fumadocs-openapi/ui";

/**
 * CSV import (`POST /v1/databases/{id}/tables/{table}/import`) takes a raw
 * `text/csv` body, which fumadocs has no adapter for. Send the playground's
 * input as is; code samples skip the body.
 */
const textCsv: MediaAdapter = {
  encode: ({ body }) => (typeof body === "string" ? body : JSON.stringify(body ?? "")),
  generateExample: () => undefined,
};

export const OpenAPIPage = createOpenAPIPage({
  mediaAdapters: { "text/csv": textCsv },
});
