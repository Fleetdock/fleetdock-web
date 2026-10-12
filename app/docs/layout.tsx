import type { Metadata } from "next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsVersionSelect } from "@/components/docs-version-select";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import { showVersionSwitcher } from "@/lib/versions";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    template: `%s — ${siteConfig.name} Docs`,
    default: `${siteConfig.name} Docs`,
  },
};

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        banner: showVersionSwitcher ? <DocsVersionSelect /> : undefined,
      }}
    >
      {children}
    </DocsLayout>
  );
}
