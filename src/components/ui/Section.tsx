import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const grounds = {
  white: "bg-white",
  tint: "bg-tint",
  // .on-deep switches accent words, eyebrows and focus rings to their dark-ground colours.
  deep: "on-deep bg-deep text-white",
  navy: "on-deep bg-navy text-white",
} as const;

export type Ground = keyof typeof grounds;

type SectionProps = {
  ground?: Ground;
  /** Skip the default vertical padding when a section sets its own. */
  flush?: boolean;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

export function Section({
  ground = "white",
  flush,
  children,
  className,
  innerClassName,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(grounds[ground], !flush && "py-section", className)} {...rest}>
      <div className={cn("container-site", innerClassName)}>{children}</div>
    </section>
  );
}
