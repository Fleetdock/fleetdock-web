import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const dynamic = "force-static";

// The whole docs search index as one static file, built at export time; the
// search dialog downloads it once and searches in the browser
// (RootProvider search type "static" in app/layout.tsx).
export const { staticGET: GET } = createFromSource(source);
