import { notFound } from "next/navigation";

export const dynamic = "force-static";

/**
 * IndexNow key file (https://www.indexnow.org): proves to Bing, Yandex and
 * the other IndexNow engines that `pnpm indexnow` may submit this site's
 * URLs. Set INDEXNOW_KEY (8–128 characters: letters, digits, dashes) at build.
 */
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) notFound();
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
