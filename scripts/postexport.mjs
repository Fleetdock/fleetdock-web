#!/usr/bin/env node
/**
 * After `next build` (static export to out/): move the Markdown copies of
 * pages from out/md/<section>/… to sit beside their pages, so
 *   out/md/docs/backups.md → out/docs/backups.md   (/docs/backups.md)
 *   out/md/docs/index.md   → out/docs.md           (/docs.md)
 * and, when INDEXNOW_KEY is set, write the IndexNow key file.
 */
import { mkdir, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const out = "out";
const mdRoot = join(out, "md");

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

let moved = 0;
if (await stat(mdRoot).catch(() => null)) {
  for await (const file of files(mdRoot)) {
    const [section, ...rest] = relative(mdRoot, file).split("/");
    const target =
      rest.length === 1 && rest[0] === "index.md"
        ? join(out, `${section}.md`)
        : join(out, section, ...rest);
    await mkdir(dirname(target), { recursive: true });
    await rename(file, target);
    moved++;
  }
  await rm(mdRoot, { recursive: true });
}
console.log(`postexport: moved ${moved} Markdown files`);

const key = process.env.INDEXNOW_KEY;
if (key) {
  await writeFile(join(out, "indexnow.txt"), key);
  console.log("postexport: wrote indexnow.txt");
}
