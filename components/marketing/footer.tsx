import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site-config";
import { getLatestVersion } from "@/lib/release";
import { Logo } from "@/components/shared/logo";
import { GitHubIcon } from "@/components/shared/icons";
import { Container } from "@/components/shared/section";

export async function Footer() {
  const version = await getLatestVersion();
  return (
    <footer className="border-t border-border bg-background-subtle">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="w-fit">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} Managed database operations on infrastructure you
              control.
            </p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
              <span>Star on GitHub</span>
            </a>
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.title}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Maintained by{" "}
            <a
              href={siteConfig.maintainer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {siteConfig.maintainer.name}
            </a>
            .
          </p>
          <p className="flex items-center gap-4">
            <a
              href={siteConfig.links.license}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {siteConfig.license.name}
            </a>
            {version ? (
              <>
                <span aria-hidden className="text-border-strong">
                  •
                </span>
                <span>{version}</span>
              </>
            ) : null}
          </p>
        </div>
      </Container>
    </footer>
  );
}
