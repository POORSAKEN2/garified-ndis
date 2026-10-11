"use client";

import { createDrawable, createTimeline, onScroll } from "animejs";
import { useRef, type ReactNode } from "react";
import { fullMotion } from "./media";
import { useAnimeScope } from "./use-anime-scope";

/**
 * Zoom reveal, scrubbed by scroll: the photo opens out from a container-width frame to
 * the full width of the screen while it settles from a slight zoom, then the ribbon band
 * rises over the photo's lower edge, its title rises in and its items are signed off
 * one at a time. Scrolling back plays it in reverse. The frame and zoom only
 * move CSS variables (`--reveal`, `--zoom`, 0 to 1); globals.css turns them into the clip
 * and scale, and sets every starting value before first paint, so nothing jumps when
 * this takes over. The section is the scroll track. Phones skip it: pinning the photo
 * there cost nearly two screens of scrolling, so they get it with the ribbon already on.
 */
export function ZoomMotion({
  children,
  className,
  "aria-label": label,
}: {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useAnimeScope(ref, () => {
    const track = ref.current!;

    // Progress runs from the track's top entering at the bottom of the screen to the stage
    // letting go at the end, over 1000 units (the empty timer pins that length, so the
    // positions below read as tenths of a percent); the stage pins a little before 40%.
    // The frame rises at container width and opens from 15% to 60%, about half of it while
    // pinned. The band rises from 60%, its amber rule draws across from 64% and the title
    // rises out of its clip with it; the hairline under the title follows from 69%. Each
    // item then gets its own 6.5% beat from 72%: the divider before it drops, the text
    // rises out of its clip, and the tick pops in and draws as the text lands. The last
    // check is drawn by about 92% and the rest holds.
    const timeline = createTimeline({
      defaults: { ease: "linear" },
      autoplay: onScroll({ target: track, enter: "bottom top", leave: "bottom bottom", sync: true }),
    })
      .add({ duration: 1000 }, 0)
      .add(track, { "--reveal": { from: 0, to: 1 }, duration: 450, ease: "inOutSine" }, 150)
      .add(track, { "--zoom": { from: 0, to: 1 }, duration: 600 }, 0)
      .add("[data-ribbon-band]", { y: { from: "100%", to: "0%" }, duration: 60, ease: "outQuart" }, 600)
      .add("[data-ribbon-rule]", { "--draw": { from: 0, to: 1 }, duration: 70, ease: "inOutQuad" }, 640)
      .add("[data-ribbon-title]", { y: { from: "115%", to: "0%" }, duration: 50, ease: "outQuart" }, 650)
      .add("[data-ribbon-head]", { "--draw": { from: 0, to: 1 }, duration: 50, ease: "inOutQuad" }, 690);

    // The check paths start undrawn as soon as createDrawable wraps them; their badges are
    // still hidden by CSS at that point, so nothing flickers.
    const checks: SVGPathElement[] = [];
    track.querySelectorAll<HTMLElement>("[data-ribbon-item]").forEach((item, i) => {
      const at = 720 + i * 65;
      const check = item.querySelector<SVGPathElement>("[data-ribbon-tick] path")!;
      checks.push(check);
      timeline
        .add(item.querySelector("[data-ribbon-divider]")!, { "--draw": { from: 0, to: 1 }, duration: 40, ease: "inOutQuad" }, at - 10)
        .add(item.querySelector("[data-ribbon-text]")!, {
          y: { from: "115%", to: "0%" },
          duration: 45,
          ease: "outQuart",
        }, at)
        .add(item.querySelector("[data-ribbon-tick]")!, {
          opacity: { from: 0, to: 1 },
          scale: { from: 0.4, to: 1 },
          duration: 20,
          ease: "outQuad",
        }, at + 25)
        .add(createDrawable(check), { draw: { from: "0 0", to: "0 1" }, duration: 30, ease: "inOutSine" }, at + 35);
    });

    // createDrawable writes attributes that reverting the timeline leaves behind, so they
    // are cleared by hand to leave the checks whole when motion switches off.
    return () => {
      for (const check of checks) {
        check.removeAttribute("pathLength");
        check.removeAttribute("stroke-dasharray");
        check.removeAttribute("stroke-dashoffset");
        check.style.removeProperty("stroke-linecap");
      }
    };
  }, fullMotion);

  return (
    <section ref={ref} data-zoom-reveal aria-label={label} className={className}>
      {children}
    </section>
  );
}
