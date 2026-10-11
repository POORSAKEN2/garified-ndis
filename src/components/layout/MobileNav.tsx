"use client";

import { useEffect, type CSSProperties, type Ref } from "react";
import { site } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export const MOBILE_NAV_ID = "mobile-nav";

type ToggleProps = {
  open: boolean;
  onToggle: () => void;
  ref?: Ref<HTMLButtonElement>;
};

const bar = "absolute inset-x-0 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out-expo";

/**
 * The last cell of the bar under lg, ruled off on its left. Two bars that cross into an
 * X while the drawer is open.
 */
export function MobileNavToggle({ open, onToggle, ref }: ToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={MOBILE_NAV_ID}
      aria-label={open ? site.nav.close : site.nav.open}
      // Without JS the drawer is always shown, so the toggle is hidden (see globals.css).
      data-menu-toggle
      className={cn(
        "grid w-16 flex-none place-items-center border-l border-line text-navy lg:hidden",
        "transition-colors duration-200 hover:bg-tint focus-visible:-outline-offset-4",
        open && "bg-tint",
      )}
    >
      <span aria-hidden="true" className="relative block h-3.5 w-[22px]">
        <span className={cn(bar, "top-0", open && "translate-y-1.5 rotate-45")} />
        <span className={cn(bar, "bottom-0", open && "-translate-y-1.5 -rotate-45")} />
      </span>
    </button>
  );
}

type PanelProps = {
  open: boolean;
  /** Id of the section being read, from the header, so its link is marked here too. */
  active: string | null;
  onClose: (opts?: { restoreFocus?: boolean }) => void;
};

/**
 * Drawer under lg: full width, hung from the bar's bottom rule, the links as large ruled
 * rows with Let’s talk below them. A scrim dims the page under it; tapping the scrim,
 * a link or Escape closes it, and so does growing to the desktop layout.
 */
export function MobileNavPanel({ open, active, onClose }: PanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose({ restoreFocus: true });
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && onClose();
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          data-nav-scrim
          onClick={() => onClose()}
          className="fixed inset-x-0 top-(--head) bottom-0 touch-none bg-navy/30 lg:hidden"
        />
      )}
      <nav
        id={MOBILE_NAV_ID}
        aria-label={site.nav.mobileLabel}
        data-mobile-nav
        data-open={open || undefined}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-raised lg:hidden"
      >
        <div className="container-site pb-6">
          <ul>
            {site.nav.links.map((link, i) => {
              const current = active === link.href.slice(1);
              return (
                <li
                  key={link.href}
                  data-nav-row
                  style={{ "--row": i } as CSSProperties}
                  className="border-b border-line"
                >
                  <a
                    href={link.href}
                    onClick={() => onClose()}
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "group flex min-h-16 items-center justify-between gap-4 text-h4 font-bold",
                      "transition-colors duration-200 hover:text-blue",
                      current ? "text-blue" : "text-navy",
                    )}
                  >
                    {link.label}
                    <ArrowIcon direction="down" className={current ? "text-blue" : "text-muted"} />
                  </a>
                </li>
              );
            })}
          </ul>
          <EnquiryTrigger className="mt-6 w-full" onBeforeOpen={() => onClose()}>
            {site.letsTalk}
          </EnquiryTrigger>
        </div>
      </nav>
    </>
  );
}
