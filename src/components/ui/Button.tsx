import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, type ArrowDirection } from "./Icons";

const variants = {
  // The darker bottom edge makes the button read as pressable; it flattens when pressed.
  primary:
    "border-transparent bg-blue text-white shadow-[inset_0_-2px_0_rgb(11_31_58/0.32)] hover:bg-blue-hover active:shadow-none",
  outline: "bg-white text-navy border-line hover:border-navy",
  white:
    "border-transparent bg-white text-navy shadow-[inset_0_-2px_0_rgb(11_31_58/0.16)] hover:bg-tint active:shadow-none",
} as const;

const sizes = {
  md: "min-h-[52px] px-6 text-ui",
  sm: "min-h-11 px-[18px] text-small",
} as const;

export type ButtonVariant = keyof typeof variants;

type StyleProps = {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  /** Arrows mark navigation. Leave off for buttons that open the enquiry dialog. */
  arrow?: ArrowDirection;
  className?: string;
  children: ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<StyleProps, "variant" | "size" | "className">) {
  return cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-pill border-[1.5px]",
    "text-center font-bold leading-tight select-none",
    "transition-[background-color,border-color,box-shadow,translate] duration-150 active:translate-y-px",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = StyleProps & Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps>;

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow && <ArrowIcon direction={arrow} />}
    </button>
  );
}

type ButtonLinkProps = StyleProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    keyof StyleProps | "href"
  >;

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const inner = (
    <>
      {children}
      {arrow && <ArrowIcon direction={arrow} />}
    </>
  );
  // In-page anchors stay plain links so they work before hydration and with JS off.
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
