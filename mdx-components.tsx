import defaultMdxComponents from "fumadocs-ui/mdx";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { TypeTable } from "fumadocs-ui/components/type-table";
import type { MDXComponents } from "mdx/types";

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
    ...components,
  };
}
