import type { ReactNode } from "react";
import { MobileCtaBar } from "./MobileCtaBar";
import { SiteHeader, type HeaderVariant } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Header, main landmark and footer shared by every page. */
export function SiteShell({
  variant,
  ctaBar = true,
  children,
}: {
  variant: HeaderVariant;
  /** The fixed phone CTA. Off where the page itself is the next step, such as the 404. */
  ctaBar?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader variant={variant} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter variant={variant} />
      {ctaBar && <MobileCtaBar href={variant === "home" ? "#contact" : "/#contact"} />}
    </>
  );
}
