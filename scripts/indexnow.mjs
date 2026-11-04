#!/usr/bin/env node
/**
 * Tell IndexNow search engines (Bing, Yandex, Seznam, Naver…) about every URL
 * in the sitemap, so new and changed pages are crawled within hours instead of
 * weeks. Bing's index also powers ChatGPT search and Copilot.
 *
 * Run after a deploy:  INDEXNOW_KEY=… pnpm indexnow
 * The same INDEXNOW_KEY must be set when the site is built, so that
 * scripts/postexport.mjs writes https://fleetdock.dev/indexnow.txt.
 */
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleetdock.dev").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error("Set INDEXNOW_KEY (the same value the site was built with).");
  process.exit(1);
}

const keyLocation = `${site}/indexnow.txt`;
const served = await fetch(keyLocation).then((r) => (r.ok ? r.text() : null));
if (served?.trim() !== key) {
  console.error(`${keyLocation} does not serve INDEXNOW_KEY; rebuild the site with it set.`);
  process.exit(1);
}

const sitemap = await fetch(`${site}/sitemap.xml`).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
if (res.status >= 300) process.exit(1);
