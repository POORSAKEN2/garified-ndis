"use client";

import { Menu, X } from "lucide-react";
import { useEffect } from "react";
import { site } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { cn } from "@/lib/cn";

export const MOBILE_NAV_ID = "mobile-nav";

type ToggleProps = { open: boolean; onToggle: () => void; className?: string };

export function MobileNavToggle({ open, onToggle, className }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={MOBILE_NAV_ID}
      aria-label={open ? site.nav.close : site.nav.open}
      // Without JS the panel is always shown, so the toggle is hidden (see globals.css).
      data-menu-toggle
      className={cn(
        "inline-grid size-11 place-items-center rounded-pill text-navy",
        "transition-colors duration-200 hover:bg-navy/5",
        open && "bg-navy/5",
        className,
      )}
    >
      {open ? (
        <X aria-hidden="true" size={22} strokeWidth={2.2} />
      ) : (
        <Menu aria-hidden="true" size={22} strokeWidth={2.2} />
      )}
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
 * Disclosure panel under `lg`: a second frosted pane hung 8px below the header capsule,
 * over the page rather than pushing it down. Closes on Escape, on a link tap, on a tap
 * outside the header, and when the viewport grows to the desktop layout.
 */
export function MobileNavPanel({ open, active, onClose }: PanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose({ restoreFocus: true });
    };
    const onPointer = (e: PointerEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest("[data-site-header]")) onClose();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && onClose();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, onClose]);

  return (
    <nav
      id={MOBILE_NAV_ID}
      aria-label={site.nav.mobileLabel}
      data-mobile-nav
      data-open={open || undefined}
      className={cn(
        "glass pointer-events-auto absolute inset-x-0 top-full mt-2 rounded-panel lg:hidden",
        "inset-ring inset-ring-navy/6 inset-shadow-[0_1px_0_rgb(255_255_255/0.8)] shadow-raised",
      )}
    >
      <div className="px-5 pt-1 pb-5">
        <ul>
          {site.nav.links.map((link) => {
            const current = active === link.href.slice(1);
            return (
              <li key={link.href} className="border-b border-navy/10">
                <a
                  href={link.href}
                  onClick={() => onClose()}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "flex min-h-[52px] items-center text-lg font-semibold hover:text-blue",
                    current ? "text-blue" : "text-navy",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <EnquiryTrigger className="mt-5 w-full" onBeforeOpen={() => onClose()}>
          {site.letsTalk}
        </EnquiryTrigger>
      </div>
    </nav>
  );
}
