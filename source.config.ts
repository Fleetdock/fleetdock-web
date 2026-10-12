import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // Plain-text Markdown for /llms-full.txt.
    postprocess: { includeProcessedMarkdown: true },
  },
});

export default defineConfig({
  // Git commit dates for sitemap <lastmod> and article dateModified.
  plugins: [lastModified()],
});
