import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ProblemSection } from "@/components/marketing/problem-section";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { FaqSection } from "@/components/marketing/faq-section";
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
import { organizationId, publisher, websiteId } from "@/lib/structured-data";
import { productFeatures, productSummary } from "@/lib/product-facts";

export const metadata: Metadata = createMetadata({
  description: siteConfig.metaDescription,
  path: "/",
});

/** Organization, WebSite, and SoftwareApplication structured data. */
function homeJsonLd(version: string | null) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...publisher,
        description: productSummary,
        sameAs: [siteConfig.maintainer.url, siteConfig.links.github],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.metaDescription,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: siteConfig.name,
        alternateName: "Fleetdock database control plane",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Database management",
        operatingSystem: "Linux, macOS, Windows (WSL2), Docker",
        description: productSummary,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        screenshot: [
          `${siteConfig.url}/screenshots/light/overview.png`,
          `${siteConfig.url}/screenshots/light/data-browser.png`,
          `${siteConfig.url}/screenshots/light/fleet-query.png`,
        ],
        featureList: productFeatures,
        keywords:
          "database management, self-hosted, MySQL, MariaDB, PostgreSQL, web GUI, database backups, phpMyAdmin alternative, pgAdmin alternative",
        ...(version ? { softwareVersion: version.replace(/^v/, "") } : {}),
        downloadUrl: siteConfig.links.releases,
        installUrl: `${siteConfig.url}/docs/getting-started`,
        releaseNotes: siteConfig.links.changelog,
        license: siteConfig.links.license,
        codeRepository: siteConfig.links.github,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
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
      <FeatureShowcase />
      <HowItWorks />
      <ProblemSection />
      <ComparisonSection />
      <DatabaseOperations />
      <ArchitectureSection />
      <SecuritySection />
      <UseCasesSection />
      <OpenSourceSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
