import defaultMdxComponents from "fumadocs-ui/mdx";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import type { MDXComponents } from "mdx/types";
import { Screenshot } from "@/components/shared/screenshot";

/**
 * MDX component map for documentation pages. Merges Fumadocs' default
 * components with the interactive building blocks used across the docs
 * (callouts, steps, tabs, accordions, file trees).
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Callout,
    Tab,
    Tabs,
    Step,
    Steps,
    Accordion,
    Accordions,
    File,
    Files,
    Folder,
    TypeTable,
    // Images in the docs open full size on click.
    img: (props) => <ImageZoom {...(props as React.ComponentProps<typeof ImageZoom>)} />,
    // <Screenshot name="data-browser" /> shows the light or dark capture to match the theme.
    Screenshot: (props: React.ComponentProps<typeof Screenshot>) => (
      <Screenshot frame={false} zoom sizes="(min-width: 1024px) 860px, 100vw" className="my-6" {...props} />
    ),
    ...components,
  };
}
