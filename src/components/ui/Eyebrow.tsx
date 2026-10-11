import { cn } from "@/lib/cn";

/** Short label above a heading: the hero line, the contact prompt. Sentence case, not tracked capitals. */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 text-small font-semibold text-blue in-[.on-deep]:text-amber",
        className,
      )}
    >
      {children}
    </p>
  );
}
