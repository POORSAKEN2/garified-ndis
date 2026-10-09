import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

/** Navy tick on an amber disc. Decorative: the text beside it carries the meaning. */
export function CheckIcon({ size = 24, className }: { size?: number; className?: string }) {
  const tick = Math.round(size * 0.58);
  return (
    <span
      aria-hidden="true"
      className={cn("inline-grid flex-none place-items-center rounded-full bg-amber text-navy", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={tick}
        height={tick}
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

const arrows = { right: ArrowRight, down: ArrowDown, left: ArrowLeft, up: ArrowUp } as const;

export type ArrowDirection = keyof typeof arrows;

const nudge: Record<ArrowDirection, string> = {
  right: "group-hover:translate-x-[3px]",
  down: "group-hover:translate-y-[3px]",
  left: "group-hover:-translate-x-[3px]",
  up: "group-hover:-translate-y-[3px]",
};

/** Arrow that nudges in its direction when the parent `.group` is hovered. */
export function ArrowIcon({
  direction = "right",
  className,
}: {
  direction?: ArrowDirection;
  className?: string;
}) {
  const Icon = arrows[direction];
  return (
    <Icon
      aria-hidden="true"
      size={18}
      strokeWidth={2.4}
      className={cn("flex-none transition-transform duration-200", nudge[direction], className)}
    />
  );
}
