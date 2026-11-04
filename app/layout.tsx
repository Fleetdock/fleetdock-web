import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import { siteConfig } from "@/lib/site-config";
import { defaultOgImage } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  applicationName: siteConfig.name,
  keywords: [
    "database control plane",
    "self-hosted databases",
    "MariaDB management",
    "MySQL management",
    "PostgreSQL management",
    "database fleet",
    "database backups",
    "database migration",
    "open source database operations",
    "database provisioning",
    "phpMyAdmin alternative",
    "pgAdmin alternative",
    "database web GUI",
    "database per tenant",
  ],
  authors: [{ name: siteConfig.maintainer.name, url: siteConfig.maintainer.url }],
  creator: siteConfig.maintainer.name,
  publisher: siteConfig.maintainer.name,
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.metaDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.metaDescription,
    images: [defaultOgImage],
  },
  alternates: {
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${siteConfig.name} blog` }] },
  },
  verification: siteVerification(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Ownership proof for search consoles, read from the environment at build
 * time so tokens aren't committed: GOOGLE_SITE_VERIFICATION (Google Search
 * Console), BING_SITE_VERIFICATION (Bing Webmaster Tools, which also feeds
 * ChatGPT search and Copilot) and YANDEX_SITE_VERIFICATION.
 */
function siteVerification(): Metadata["verification"] {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  const yandex = process.env.YANDEX_SITE_VERIFICATION;
  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <RootProvider search={{ options: { type: "static" } }}>{children}</RootProvider>
      </body>
    </html>
  );
}
