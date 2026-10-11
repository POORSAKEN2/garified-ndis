"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import type { ServiceId } from "@/content/types";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MobileNavPanel, MobileNavToggle } from "./MobileNav";
import { useActiveSection } from "./use-active-section";

export type HeaderVariant = "home" | "service";

const sectionIds = site.nav.links.map((link) => link.href.slice(1));

/**
 * Sticky ruled bar, solid white and edge to edge, closed by a hairline across the window.
 * Its height is `--head` (64px, 72px from lg, in globals.css); the hero, the zoom reveal
 * and anchor jumps size themselves from it. On the home page the section links stand as
 * ruled cells, like the column heads of a roster, and the section being read gets a blue
 * bar on the bottom rule. Under lg they move into a drawer that slides out from under the
 * bar. Service pages and the 404 show only the logo and Let’s talk.
 */
export function SiteHeader({
  variant,
  preselect,
}: {
  variant: HeaderVariant;
  /** Services ticked when Let’s talk opens the dialog, for example on a service page. */
  preselect?: readonly ServiceId[];
}) {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isHome = variant === "home";

  const close = useCallback((opts?: { restoreFocus?: boolean }) => {
    setOpen(false);
    if (opts?.restoreFocus) toggleRef.current?.focus();
  }, []);

  return (
    <header data-site-header className="sticky top-0 z-40">
      {/* Above the drawer, so the drawer slides out from under it. */}
      <div className="relative z-10 border-b border-line bg-white">
        <div className="container-site flex h-[calc(var(--head)_-_1px)]">
          <Logo className="mr-auto self-center" />

          {isHome && (
            <nav aria-label={site.nav.label} className="hidden lg:flex">
              <ul className="flex border-l border-line">
                {site.nav.links.map((link) => {
                  const current = active === link.href.slice(1);
                  return (
                    <li key={link.href} className="flex border-r border-line">
                      <a
                        href={link.href}
                        aria-current={current ? "true" : undefined}
                        className={cn(
                          "relative flex items-center px-6 text-ui font-semibold",
                          "transition-colors duration-200 hover:bg-tint focus-visible:-outline-offset-4",
                          // The marker sits on the bottom rule and grows from the middle.
                          "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-blue",
                          "after:transition-transform after:duration-300 after:ease-out-expo",
                          current ? "text-blue after:scale-x-100" : "text-navy after:scale-x-0",
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

          <div className={cn("flex items-center pl-6", isHome && "pr-4 max-sm:hidden lg:pr-0")}>
            <EnquiryTrigger size="sm" preselect={preselect}>
              {site.letsTalk}
            </EnquiryTrigger>
          </div>

          {isHome && (
            <MobileNavToggle ref={toggleRef} open={open} onToggle={() => setOpen((v) => !v)} />
          )}
        </div>
      </div>

      {isHome && <MobileNavPanel open={open} active={active} onClose={close} />}
    </header>
  );
}
