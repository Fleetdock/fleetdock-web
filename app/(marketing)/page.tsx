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
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, Docker",
  description: siteConfig.metaDescription,
  url: siteConfig.url,
  license: siteConfig.links.license,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: siteConfig.maintainer.name, url: siteConfig.maintainer.url },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Structured data for the software application.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
