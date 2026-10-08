import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const sizes = {
  md: "text-[1.625rem]",
  lg: "text-[2.25rem]",
} as const;

/**
 * Placeholder until the logo arrives. Lowercase "garified" with the full stop drawn
 * as a round amber dot, so it reads as a mark rather than punctuation.
 */
export function Wordmark({
  size = "md",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={site.wordmarkLabel}
      className={cn(
        "inline-flex min-h-11 items-center font-extrabold leading-none tracking-[-0.05em] text-navy in-[.on-deep]:text-white",
        sizes[size],
        className,
      )}
    >
      <span aria-hidden="true" className="inline-flex items-baseline">
        {site.wordmark}
        <span className="ml-[0.06em] inline-block size-[0.2em] rounded-full bg-amber" />
      </span>
    </Link>
  );
}
