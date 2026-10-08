import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, type ArrowDirection } from "./Icons";

type TextLinkProps = {
  href: string;
  arrow?: ArrowDirection;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Bold blue link whose underline draws in on hover and focus. White on deep grounds. */
export function TextLink({ href, arrow, className, children, ...rest }: TextLinkProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-2 font-bold text-blue in-[.on-deep]:text-white",
    className,
  );
  const inner = (
    <>
      <span
        className={cn(
          "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-[position:0_100%] bg-no-repeat pb-0.5",
          "transition-[background-size] duration-300 ease-out-expo",
          "group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]",
        )}
      >
        {children}
      </span>
      {arrow && <ArrowIcon direction={arrow} />}
    </>
  );
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {inner}
    </Link>
  );
}
