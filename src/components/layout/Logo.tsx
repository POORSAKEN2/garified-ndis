import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/garified solutions logo.png";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The Garified Solutions logo, linking home. Its blue is the palette's blue, so it only
 * sits on light grounds: on navy it falls to about 2:1. The footer's large logo is the
 * vector trace in LogoSvg, since this PNG blurs past about 500px wide.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={site.wordmarkLabel}
      className={cn("inline-flex min-h-11 shrink-0 items-center", className)}
    >
      {/* Sized for its largest display (36px tall) so the srcset stays small. */}
      <Image src={logo} alt="" width={144} height={36} loading="eager" className="h-8 w-auto lg:h-9" />
    </Link>
  );
}
