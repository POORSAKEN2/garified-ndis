/**
 * Copy with accent words and line breaks, kept as data rather than HTML.
 * A plain string is regular text, `{ em }` is a serif accent word and `{ br: true }` is a line break.
 */
export type RichSegment = string | { em: string } | { br: true };
export type Rich = readonly RichSegment[];

export const BR = { br: true } as const;

export type ServiceId = "rostering" | "administration" | "marketing" | "accounting";

/** A FAQ section: the home one, and one on each full service page. */
export type FaqCopy = {
  id: string;
  title: Rich;
  intro: string;
  items: readonly { q: string; a: string }[];
};

/** Flattens rich copy to plain text, for metadata and aria labels. */
export function richToText(rich: Rich | string): string {
  if (typeof rich === "string") return rich;
  return rich
    .map((segment) => {
      if (typeof segment === "string") return segment;
      if ("em" in segment) return segment.em;
      return " ";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}
