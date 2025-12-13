import { links } from "./data";

const extraLinks = [
  { name: "Others", hash: "" },
] as const;

const allLinks = [...links, ...extraLinks] as const;

export type SectionName = (typeof allLinks)[number]["name"];
