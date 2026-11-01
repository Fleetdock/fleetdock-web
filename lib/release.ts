const LATEST_RELEASE_API =
  "https://api.github.com/repos/Fleetdock/fleetdock/releases/latest";

/**
 * The tag of the latest published Fleetdock release (e.g. "v0.8.0"), read
 * from GitHub Releases and refreshed at most once an hour — so a new release
 * appears on the site without a redeploy. Null when GitHub cannot be reached
 * or rate-limits the request: callers then show no version rather than a
 * made-up one. Set GITHUB_TOKEN at build/runtime to lift the unauthenticated
 * limit.
 */
export async function getLatestVersion(): Promise<string | null> {
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
    // Network failure: no version rather than a wrong one.
  }
  return null;
}

/**
 * The repository's star count, refreshed at most once an hour, or null when
 * GitHub can't be reached — callers then show the repository name instead of
 * a made-up number.
 */
export async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/repos/Fleetdock/fleetdock", {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const { stargazers_count: stars } = (await res.json()) as { stargazers_count?: unknown };
      if (typeof stars === "number") return stars;
    }
  } catch {
    // Network failure: no number rather than a wrong one.
  }
  return null;
}

/** formatCount renders 1234 as "1.2k". */
export function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}
