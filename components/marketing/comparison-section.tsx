import { Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const columns = ["Manual operations", "Managed cloud database", siteConfig.name];

const rows: { capability: string; values: [string, string, string] }[] = [
  { capability: "Where your data and credentials live", values: ["Your servers", "The provider's cloud", "Your servers"] },
  { capability: "One view of every database", values: ["Spreadsheets and SSH", "Per provider and region", "Yes, across all servers"] },
  { capability: "Browse and edit data", values: ["CLI or a desktop client per host", "Separate tool", "In the browser, with undo"] },
  { capability: "Run SQL on many databases", values: ["Shell loops", "Not built in", "Fleet query, up to 500 at once"] },
  { capability: "Backups", values: ["Cron jobs you maintain", "Included", "Scheduled, to your own bucket, test-restored"] },
  { capability: "Move a database to another server", values: ["Dump, copy, import by hand", "Within one provider", "Backup, restore, verify in one step"] },
  { capability: "Cost", values: ["Your time", "Grows with every database", "Free and open source"] },
];

export function ComparisonSection() {
  return (
    <Section id="comparison" className="border-b border-border bg-background-subtle/40">
      <Container>
        <SectionHeading
          eyebrow="Comparison"
          title="Ownership and central management, without the trade-off."
          description="Fleetdock sits between running everything by hand and giving your databases to a managed cloud provider — you keep the infrastructure and gain the operations layer."
        />

        <div className="mt-12 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">
              Comparison of manual database operations, managed cloud databases, and{" "}
              {siteConfig.name}
            </caption>
            <thead>
              <tr className="border-b border-border bg-card">
                <th scope="col" className="p-4 text-left font-medium text-muted-foreground">
                  Capability
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className={cn(
                      "p-4 text-left font-semibold",
                      col === siteConfig.name
                        ? "bg-accent/[0.07] text-accent"
                        : "text-foreground",
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.capability} className="border-b border-border last:border-b-0">
                  <th
                    scope="row"
                    className="p-4 text-left font-medium text-foreground"
                  >
                    {row.capability}
                  </th>
                  {row.values.map((value, i) => {
                    const isProduct = i === 2;
                    return (
                      <td
                        key={i}
                        className={cn(
                          "p-4 align-middle",
                          isProduct
                            ? "bg-accent/[0.05] font-medium text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {isProduct && (
                            <Check className="size-4 shrink-0 text-accent" aria-hidden />
                          )}
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Comparison reflects implemented Fleetdock capabilities. Fleetdock does not provide
          automatic failover or high availability.
        </p>
      </Container>
    </Section>
  );
}
