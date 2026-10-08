"use client";

import { createTimeline, stagger } from "animejs";
import { useRef, type ReactNode } from "react";
import { playInView } from "./play-in-view";
import { useAnimeScope } from "./use-anime-scope";

/**
 * The page's one set piece: tasks drop into their days, then each is ticked as approved.
 * Tasks and ticks carry `data-hero-anim`, so CSS hides them before first paint (only
 * when JS and motion are on). Plays when the sheet is well into view, which on phones
 * is after the visitor scrolls past the hero copy.
 */
export function SheetMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimeScope(ref, () => {
    const html = document.documentElement;
    // Motion has taken over, so the CSS reveal-after-2.5s fallback is switched off.
    html.dataset.heroReady = "";

    const timeline = createTimeline({ defaults: { ease: "outExpo" }, autoplay: false })
      .add("[data-sheet-task]", {
        opacity: { from: 0, to: 1, duration: 350, ease: "linear" },
        y: { from: -12, to: 0 },
        scale: { from: 0.94, to: 1 },
        duration: 700,
        delay: stagger(70),
      })
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

    const stop = playInView(ref.current!, () => timeline.play());

    return () => {
      stop();
      delete html.dataset.heroReady;
    };
  });

  return <div ref={ref}>{children}</div>;
}
