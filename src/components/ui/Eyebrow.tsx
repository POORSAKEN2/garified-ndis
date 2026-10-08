import { cn } from "@/lib/cn";

/**
 * Section label. Copy like "01 / Our services" keeps its section number, set in muted
 * tabular figures so the label itself leads. Sentence case, not tracked capitals.
 */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  const match = /^(\d{2}) \/ (.+)$/.exec(children);
  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 text-small font-semibold text-blue in-[.on-deep]:text-amber",
        className,
      )}
    >
      {match ? (
        <>
          <span className="font-medium tabular-nums text-muted in-[.on-deep]:text-on-deep">
            {match[1]} /
          </span>
          <span>{match[2]}</span>
        </>
      ) : (
        children
      )}
    </p>
  );
}
