"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Fixed "Let’s talk" bar on phones (below `md`). It stays out of the way while any
 * element marked `data-cta-hide` is on screen: the hero and contact section on the
 * home page, the intro on service pages. Phase 4 also hides it while the dialog is open.
 */
export function MobileCtaBar({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-cta-hide]");
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        inert={!visible}
        aria-hidden={!visible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white md:hidden",
          "pb-[max(12px,env(safe-area-inset-bottom))] pt-3",
          "transition-[translate,opacity] duration-300 ease-out-expo",
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        <div className="container-site">
          <ButtonLink href={href} className="w-full">
            {site.letsTalk}
          </ButtonLink>
        </div>
      </div>
      {/* Keeps the end of the page clear of the fixed bar. */}
      <div aria-hidden="true" className="h-[84px] bg-navy md:hidden" />
    </>
  );
}
