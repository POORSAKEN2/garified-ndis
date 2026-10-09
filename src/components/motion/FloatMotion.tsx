"use client";

import { animate, stagger } from "animejs";
import { useRef, type ReactNode } from "react";
import { useAnimeScope } from "./use-anime-scope";

/**
 * Hero icons: each one pops in (scale, lift and a small counter-turn settling onto its
 * resting tilt), then drifts on a slow loop. Every icon gets its own period so the four
 * never bob in step. The pop-in lives on `[data-float-pop]` and the drift on its parent
 * `[data-float]`, so the two never fight over the same transform. Skipped entirely under
 * reduced motion, where the icons simply sit at their resting tilt.
 */
export function FloatMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimeScope(ref, () => {
    const html = document.documentElement;
    // Motion has taken over, so the CSS reveal-after-2.5s fallback is switched off.
    html.dataset.heroReady = "";

    animate("[data-float-pop]", {
      opacity: { from: 0, to: 1, duration: 400, ease: "linear" },
      scale: { from: 0.6, to: 1 },
      y: { from: 28, to: 0 },
      rotate: { from: -14, to: 0 },
      duration: 1100,
      ease: "outBack(1.6)",
      delay: stagger(110, { start: 650 }),
    });

    // One animation per icon: a shared one would hold the faster icons at their peak
    // until the slowest finished, pulling all four back into step every loop.
    ref.current!.querySelectorAll("[data-float]").forEach((el, i) => {
      animate(el, {
        y: { from: -9, to: 9 },
        rotate: { from: -3, to: 3 },
        duration: 3200 + i * 550,
        delay: i * 350,
        ease: "inOutSine",
        alternate: true,
        loop: true,
      });
    });

    return () => {
      delete html.dataset.heroReady;
    };
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
