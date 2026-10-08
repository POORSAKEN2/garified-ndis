import { Fragment } from "react";
import type { Rich } from "@/content/types";

/** Renders rich copy: strings as text, `{ em }` as an accent word, `{ br }` as a line break. */
export function RichText({ content }: { content: Rich | string }) {
  if (typeof content === "string") return content;
  return content.map((segment, i) => {
    if (typeof segment === "string") return <Fragment key={i}>{segment}</Fragment>;
    if ("em" in segment) return <em key={i}>{segment.em}</em>;
    return <br key={i} />;
  });
}
