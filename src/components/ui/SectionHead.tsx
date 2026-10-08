import type { ReactNode } from "react";
import type { Rich } from "@/content/types";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";

type SectionHeadProps = {
  eyebrow: string;
  title: Rich | string;
  /** Used as the section's accessible name. */
  titleId?: string;
  intro?: ReactNode;
  /** "split" puts the intro beside the heading from `lg`, aligned to its last line. */
  layout?: "stack" | "split";
  className?: string;
};

export function SectionHead({ eyebrow, title, titleId, intro, layout = "stack", className }: SectionHeadProps) {
  return (
    <div
      className={cn(
        layout === "split" ? "grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16" : "grid gap-6",
        className,
      )}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading id={titleId} className="mt-4" content={title} />
      </div>
      {intro && (
        <div className={cn("measure text-lead text-muted in-[.on-deep]:text-on-deep", layout === "split" && "lg:pb-1.5")}>
          {intro}
        </div>
      )}
    </div>
  );
}
