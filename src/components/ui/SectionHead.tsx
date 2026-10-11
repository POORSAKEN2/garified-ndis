import type { ReactNode } from "react";
import type { Rich } from "@/content/types";
import { cn } from "@/lib/cn";
import { Heading } from "./Heading";

type SectionHeadProps = {
  title: Rich | string;
  /** Used as the section's accessible name. */
  titleId?: string;
  intro?: ReactNode;
  /** "split" puts the intro beside the heading from `lg`, aligned to its last line. */
  layout?: "stack" | "split";
  className?: string;
};

export function SectionHead({ title, titleId, intro, layout = "stack", className }: SectionHeadProps) {
  return (
    <div
      className={cn(
        layout === "split" ? "grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16" : "grid gap-6",
        className,
      )}
    >
      <Heading id={titleId} content={title} />
      {intro && (
        <div className={cn("measure text-lead text-muted in-[.on-deep]:text-on-deep", layout === "split" && "lg:pb-1.5")}>
          {intro}
        </div>
      )}
    </div>
  );
}
