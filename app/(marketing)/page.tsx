import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ProblemSection } from "@/components/marketing/problem-section";
import { DatabaseOperations } from "@/components/marketing/database-operations";
import { ArchitectureSection } from "@/components/marketing/architecture-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { UseCasesSection } from "@/components/marketing/use-cases-section";
import { ComparisonSection } from "@/components/marketing/comparison-section";
import { SecuritySection } from "@/components/marketing/security-section";
import { OpenSourceSection } from "@/components/marketing/open-source-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/lib/site-config";
import { createMetadata } from "@/lib/metadata";
import { getLatestVersion } from "@/lib/release";

export const metadata: Metadata = createMetadata({
  description: siteConfig.metaDescription,
  path: "/",
});

const organizationId = `${siteConfig.url}/#organization`;

/** Organization, WebSite, and SoftwareApplication structured data. */
function homeJsonLd(version: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.maintainer.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: [siteConfig.maintainer.url, siteConfig.links.github],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.metaDescription,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux, macOS, Windows (WSL2), Docker",
        description: siteConfig.metaDescription,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        ...(version !== siteConfig.fallbackVersion
          ? { softwareVersion: version.replace(/^v/, "") }
          : {}),
        downloadUrl: siteConfig.links.releases,
        releaseNotes: siteConfig.links.changelog,
        license: siteConfig.links.license,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@id": organizationId },
      },
    ],
  };
}

export default async function HomePage() {
  const version = await getLatestVersion();
  return (
    <>
      <JsonLd data={homeJsonLd(version)} />
      <Hero />
      <ProblemSection />
      <DatabaseOperations />
      <ArchitectureSection />
      <HowItWorks />
      <UseCasesSection />
      <ComparisonSection />
      <SecuritySection />
      <OpenSourceSection />
      <FinalCta />
    </>
  );
}
