import type { ReactNode } from "react";
import type { ServiceId } from "@/content/types";
import { MobileCtaBar } from "./MobileCtaBar";
import { SiteHeader, type HeaderVariant } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Header, main landmark and footer shared by every page. */
export function SiteShell({
  variant,
  preselect,
  ctaBar = true,
  children,
}: {
  variant: HeaderVariant;
  /** Services ticked when the header or phone CTA opens the dialog. */
  preselect?: readonly ServiceId[];
  /** The fixed phone CTA. Off where the page itself is the next step, such as the 404. */
  ctaBar?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader variant={variant} preselect={preselect} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter variant={variant} />
      {ctaBar && <MobileCtaBar preselect={preselect} />}
    </>
  );
}
