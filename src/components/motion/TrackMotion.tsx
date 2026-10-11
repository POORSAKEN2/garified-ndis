"use client";

import { animate, stagger, utils } from "animejs";
import { useRef, type ReactNode } from "react";
import { playInView } from "./play-in-view";
import { useAnimeScope } from "./use-anime-scope";

/**
 * Approach steps: the amber track fills along the three steps (down on phones, across
 * from lg) and each dot pops as the line reaches it. The fill only moves `--fill` from 0
 * to 1; StepTrack picks the axis in CSS, so turning a tablet across lg never leaves the
 * line scaled the wrong way. Short, played once and with the text never hidden, so it
 * stays on phones as their one moment. Without JS the track shows full.
 */
export function TrackMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimeScope(ref, () => {
    utils.set("[data-approach-fill]", { "--fill": 0 });
    utils.set("[data-approach-dot]", { scale: 0.4, opacity: 0 });

    const fill = animate("[data-approach-fill]", {
      "--fill": 1,
      duration: 1100,
      ease: "inOutQuart",
      autoplay: false,
    });
    const dots = animate("[data-approach-dot]", {
      scale: 1,
      opacity: 1,
      duration: 500,
      ease: "outBack(2)",
      delay: stagger(360, { start: 80 }),
      autoplay: false,
    });

    return playInView(ref.current!, () => {
      fill.play();
      dots.play();
    });
  });

  return <div ref={ref}>{children}</div>;
}
