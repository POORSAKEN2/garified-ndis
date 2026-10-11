"use client";

import { animate, createTimeline, stagger } from "animejs";
import { useRef, type ReactNode } from "react";
import { playInView } from "./play-in-view";
import { useAnimeScope } from "./use-anime-scope";

/**
 * The page's one set piece: tasks drop into their days, then each is ticked as approved.
 * Also drives the service page hero, where the service's clay icon first lands on the
 * example sheet, then the rows rise in and their statuses stamp on, and the icon keeps a
 * slow drift. Tasks, ticks and the icon carry `data-hero-anim`, so CSS hides them before
 * first paint (only when JS and motion are on). Plays when the sheet is well into view,
 * which on phones is after the visitor scrolls past the hero copy.
 */
export function SheetMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimeScope(ref, () => {
    const html = document.documentElement;
    // Motion has taken over, so the CSS reveal-after-2.5s fallback is switched off.
    html.dataset.heroReady = "";

    const icon = ref.current!.querySelector("[data-sheet-icon]");
    const timeline = createTimeline({ defaults: { ease: "outExpo" }, autoplay: false });

    if (icon) {
      timeline.add(
        icon,
        {
          opacity: { from: 0, to: 1, duration: 300, ease: "linear" },
          scale: { from: 0.6, to: 1 },
          y: { from: -36, to: 0 },
          rotate: { from: 16, to: 0 },
          duration: 1000,
          ease: "outBack(1.6)",
        },
        0,
      );
    }

    timeline
      .add(
        "[data-sheet-task]",
        {
          opacity: { from: 0, to: 1, duration: 350, ease: "linear" },
          y: { from: -12, to: 0 },
          scale: { from: 0.94, to: 1 },
          duration: 700,
          delay: stagger(70),
        },
        icon ? 250 : 0,
      )
      .add(
        "[data-sheet-tick]",
        {
          opacity: { from: 0, to: 1, duration: 150, ease: "linear" },
          scale: { from: 0, to: 1, ease: "outBack(2)" },
          duration: 420,
          delay: stagger(60),
        },
        "-=500",
      );

    const stop = playInView(ref.current!, () => {
      timeline.play();
      // The drift sits on the icon's wrapper, so it never fights the landing above.
      const drift = ref.current!.querySelector("[data-sheet-drift]");
      if (drift) {
        animate(drift, {
          y: { from: -7, to: 7 },
          rotate: { from: -2.5, to: 2.5 },
          duration: 3600,
          ease: "inOutSine",
          alternate: true,
          loop: true,
        });
      }
    });

    return () => {
      stop();
      delete html.dataset.heroReady;
    };
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
