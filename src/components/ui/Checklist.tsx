import { cn } from "@/lib/cn";
import { CheckIcon } from "./Icons";

/** A list of included items, each marked with the amber tick. */
export function Checklist({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-3.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 font-semibold">
          <CheckIcon className="mt-[3px]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
