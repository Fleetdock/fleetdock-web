# fleetdock-web

The website and documentation for [Fleetdock](https://github.com/Fleetdock/fleetdock),
served at [fleetdock.dev](https://fleetdock.dev). Built with Next.js and
[Fumadocs](https://fumadocs.dev).

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build; also type-checks the MDX
```

> This Next.js version differs from older ones — read the guides in
> `node_modules/next/dist/docs/` before changing framework code (see `AGENTS.md`).

## Where things are

| Path | What |
| --- | --- |
| `app/(marketing)/` | Landing, features, use cases, architecture and security pages |
| `content/docs/` | Documentation pages (MDX). Order and sections: `content/docs/meta.json` |
| `openapi/` | The API spec the API reference pages are generated from |
| `lib/versions.ts` | Documentation versions |
| `next.config.ts` | Includes the `/install.sh` redirect |

## `/install.sh`

`https://fleetdock.dev/install.sh` — the Fleetdock installer people run with
`curl -sSL https://fleetdock.dev/install.sh | sh` — is a **redirect** to
[`scripts/install.sh`](https://github.com/Fleetdock/fleetdock/blob/main/scripts/install.sh)
on the main repository's `main` branch. Do not copy the script into `public/`
again: copies drift from the `docker-compose.yml` the installer downloads, and
that drift has broken installs before. Change the installer in the main
repository instead.

Not to be confused with the **agent** installer, which each Fleetdock install
serves itself at `https://<your-fleetdock>/install.sh`.

## Docs content

Documentation describes the released product. When behaviour changes in the
main repository, update the matching page here — the installer and its options
appear in `getting-started.mdx`, `manager.mdx`, `local.mdx` and
`troubleshooting.mdx`.
