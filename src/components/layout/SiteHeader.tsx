"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { MobileNavPanel, MobileNavToggle } from "./MobileNav";
import { useScrolled } from "./use-scrolled";
import { Wordmark } from "./Wordmark";

export type HeaderVariant = "home" | "service";

/**
 * Sticky header. The home variant has the section links and a mobile menu; service
 * pages and the 404 show only the wordmark and Let’s talk, as on the reference site.
 */
export function SiteHeader({ variant }: { variant: HeaderVariant }) {
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const isHome = variant === "home";
  // Phase 4 swaps these links for the enquiry dialog trigger.
  const contactHref = isHome ? "#contact" : "/#contact";

  const close = useCallback((opts?: { restoreFocus?: boolean }) => {
    setOpen(false);
    if (opts?.restoreFocus) toggleRef.current?.querySelector("button")?.focus();
  }, []);

  return (
    <header
      data-site-header
      className={cn(
        "sticky top-0 z-40 border-b bg-white transition-[border-color,box-shadow] duration-200",
        scrolled || open
          ? "border-line shadow-[0_10px_30px_-20px_rgb(11_31_58/0.35)]"
          : "border-transparent",
      )}
    >
      <div className="container-site flex min-h-[72px] items-center gap-6 lg:min-h-20">
        <Wordmark />

        {isHome && (
          <nav aria-label={site.nav.label} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-flex min-h-11 items-center px-3.5 font-semibold text-navy transition-colors hover:text-blue"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 bottom-2 h-0.5 origin-left scale-x-0 rounded-full bg-current transition-transform duration-300 ease-out-expo group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className={cn("flex items-center gap-3", isHome ? "ml-auto lg:ml-4" : "ml-auto")}>
          <ButtonLink
            href={contactHref}
            size="sm"
            className={isHome ? "hidden sm:inline-flex" : undefined}
          >
            {site.letsTalk}
          </ButtonLink>
          {isHome && (
            <div ref={toggleRef} className="lg:hidden">
              <MobileNavToggle open={open} onToggle={() => setOpen((v) => !v)} />
            </div>
          )}
        </div>
      </div>

      {isHome && <MobileNavPanel open={open} onClose={close} contactHref={contactHref} />}
    </header>
  );
}
