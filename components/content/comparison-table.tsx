import { siteConfig } from "@/lib/site-config";

/** Fleetdock beside another tool, one row per capability. */
export function ComparisonTable({
  competitor,
  rows,
}: {
  competitor: string;
  rows: { feature: string; fleetdock: string; competitor: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <caption className="sr-only">
          {siteConfig.name} compared with {competitor}
        </caption>
        <thead>
          <tr className="border-b border-border bg-card">
            <th scope="col" className="p-3.5 text-left font-medium text-muted-foreground">
              &nbsp;
            </th>
            <th scope="col" className="bg-accent/[0.07] p-3.5 text-left font-semibold text-accent">
              {siteConfig.name}
            </th>
            <th scope="col" className="p-3.5 text-left font-semibold text-foreground">
              {competitor}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-border last:border-b-0">
              <th scope="row" className="p-3.5 text-left font-medium text-foreground">
                {row.feature}
              </th>
              <td className="bg-accent/[0.04] p-3.5 text-foreground/90">{row.fleetdock}</td>
              <td className="p-3.5 text-muted-foreground">{row.competitor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
