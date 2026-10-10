"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import type { ServiceId } from "@/content/types";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MobileNavPanel, MobileNavToggle } from "./MobileNav";
import { useActiveSection } from "./use-active-section";
import { useScrolled } from "./use-scrolled";

export type HeaderVariant = "home" | "service";

const sectionIds = site.nav.links.map((link) => link.href.slice(1));

/**
 * Sticky header: a frosted capsule floating 12px (16px from lg) below the top of the
 * window, inside the page container, so the photo and deep bands blur past under it.
 * The strip around it lets clicks through. 72px tall in all (80px from lg); the hero
 * and the zoom reveal size themselves from that. It gains its shadow once the page
 * scrolls. The home variant centres the section links, marks the one being read, and
 * has a mobile menu; service pages and the 404 show only the logo and Let’s talk.
 */
export function SiteHeader({
  variant,
  preselect,
}: {
  variant: HeaderVariant;
  /** Services ticked when Let’s talk opens the dialog, for example on a service page. */
  preselect?: readonly ServiceId[];
}) {
  const scrolled = useScrolled(8);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const isHome = variant === "home";

  const close = useCallback((opts?: { restoreFocus?: boolean }) => {
    setOpen(false);
    if (opts?.restoreFocus) toggleRef.current?.querySelector("button")?.focus();
  }, []);

  return (
    <header data-site-header className="pointer-events-none sticky top-0 z-40 pt-3 lg:pt-4">
      <div className="container-site relative">
        <div
          className={cn(
            "glass pointer-events-auto flex h-15 items-center gap-3 rounded-pill pr-2 pl-5",
            "lg:grid lg:h-16 lg:grid-cols-[1fr_auto_1fr] lg:pr-2.5 lg:pl-6",
            // The light top edge catches like the rim of a pane; the hairline keeps the
            // capsule's outline on white, where there is nothing behind it to frost.
            "inset-ring inset-shadow-[0_1px_0_rgb(255_255_255/0.8)]",
            "transition-shadow duration-300 ease-out-expo",
            scrolled || open ? "inset-ring-navy/6 shadow-raised" : "inset-ring-navy/10",
          )}
        >
          <Logo className="lg:justify-self-start" />

          {isHome && (
            <nav aria-label={site.nav.label} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {site.nav.links.map((link) => {
                  const current = active === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={current ? "true" : undefined}
                        className={cn(
                          "inline-flex min-h-11 items-center rounded-pill px-4 text-ui font-semibold",
                          "transition-colors duration-200",
                          current ? "bg-blue/8 text-blue" : "text-navy hover:bg-navy/5",
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <div className="ml-auto flex items-center gap-2 lg:col-start-3 lg:justify-self-end">
            <EnquiryTrigger
              size="sm"
              preselect={preselect}
              // A media-query class, so it beats the button's own inline-flex (cn does not merge).
              className={isHome ? "max-sm:hidden" : undefined}
            >
              {site.letsTalk}
            </EnquiryTrigger>
            {isHome && (
              <div ref={toggleRef} className="lg:hidden">
                <MobileNavToggle open={open} onToggle={() => setOpen((v) => !v)} />
              </div>
            )}
          </div>
        </div>

        {isHome && <MobileNavPanel open={open} active={active} onClose={close} />}
      </div>
    </header>
  );
}
