import type { Rich } from "@/content/types";
import { cn } from "@/lib/cn";
import { RichText } from "./RichText";

const sizes = {
  display: "text-display",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
} as const;

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: keyof typeof sizes;
  content: Rich | string;
  id?: string;
  className?: string;
};

export function Heading({ as: Tag = "h2", size, content, id, className }: HeadingProps) {
  const scale = size ?? (Tag === "h1" ? "display" : Tag);
  return (
    <Tag id={id} className={cn(sizes[scale], "font-bold", className)}>
      <RichText content={content} />
    </Tag>
  );
}
