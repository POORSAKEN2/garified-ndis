"use client";

import { Menu, X } from "lucide-react";
import { useEffect } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
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
        "inline-grid size-12 place-items-center rounded-[12px] border-[1.5px] border-line text-navy",
        "transition-colors hover:border-navy",
        open && "border-navy",
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
  onClose: (opts?: { restoreFocus?: boolean }) => void;
  contactHref: string;
};

/**
 * Disclosure panel below the header bar, under `lg` only. Closes on Escape, on a link
 * tap, and when the viewport grows to the desktop layout.
 */
export function MobileNavPanel({ open, onClose, contactHref }: PanelProps) {
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
    <nav
      id={MOBILE_NAV_ID}
      aria-label={site.nav.mobileLabel}
      data-mobile-nav
      data-open={open || undefined}
      className="border-t border-line bg-white lg:hidden"
    >
      <div className="container-site pt-2 pb-6">
        <ul>
          {site.nav.links.map((link) => (
            <li key={link.href} className="border-b border-line">
              <a
                href={link.href}
                onClick={() => onClose()}
                className="flex min-h-[52px] items-center text-lg font-semibold text-navy hover:text-blue"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href={contactHref} className="mt-5 w-full" onClick={() => onClose()}>
          {site.letsTalk}
        </ButtonLink>
      </div>
    </nav>
  );
}
