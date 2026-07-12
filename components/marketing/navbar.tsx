"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { GitHubIcon } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and support Escape while the mobile menu is open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/docs" ? pathname.startsWith("/docs") : pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background/0",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8"
      >
        <Link href="/" className="rounded-md" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hidden sm:inline-flex",
            )}
            aria-label={`${siteConfig.name} on GitHub`}
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href={siteConfig.links.getStarted}
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Get Started
          </Link>

          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "md:hidden",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>
              <ThemeToggle />
            </li>
            <li>
              <Link
                href={siteConfig.links.getStarted}
                className={cn(buttonVariants({ size: "lg" }), "mt-1 w-full")}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
