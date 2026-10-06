import { siteConfig } from "@/lib/site-config";

const LATEST_RELEASE_API =
  "https://api.github.com/repos/Fleetdock/fleetdock/releases/latest";

/**
 * The tag of the latest published Fleetdock release (e.g. "v0.8.0"), read
 * from GitHub Releases and refreshed at most once an hour — so a new release
 * appears on the site without a redeploy. Falls back to
 * `siteConfig.fallbackVersion` when GitHub cannot be reached or rate-limits
 * the request; set GITHUB_TOKEN at build/runtime to lift the unauthenticated
 * limit.
 */
export async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch(LATEST_RELEASE_API, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const { tag_name: tag } = (await res.json()) as { tag_name?: unknown };
      if (typeof tag === "string" && tag.length > 0) return tag;
    }
  } catch {
    // Network failure: fall through to the bundled version.
  }
  return siteConfig.fallbackVersion;
}
