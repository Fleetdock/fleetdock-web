import { createOpenAPI } from "fumadocs-openapi/server";

/**
 * OpenAPI server instance for the Fleetdock Manager API.
 * The spec is copied from `fleetdock/backend/internal/openapi/openapi.yaml`
 * (run `pnpm sync:openapi` to refresh it).
 */
export const openapi = createOpenAPI({
  input: ["./openapi/openapi.yaml"],
  proxyUrl: "/api/proxy",
});
