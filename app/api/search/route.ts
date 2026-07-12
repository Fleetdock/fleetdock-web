import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// Static, client-side full-text search index built from the docs source.
export const { GET } = createFromSource(source);
