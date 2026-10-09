"use client";

import { createTimeline, onScroll, stagger } from "animejs";
import { useRef, type ReactNode } from "react";
import { useAnimeScope } from "./use-anime-scope";

/**
 * Zoom reveal, scrubbed by scroll: the photo opens out from a container-width frame to
 * the full width of the screen while it settles from a slight zoom, then the gradients
 * over its top and bottom edges fade in and the copy lines rise in on them. Scrolling
 * back plays it in reverse. The frame and zoom only move CSS variables (`--reveal`, `--zoom`, 0 to 1);
 * globals.css turns them into the clip and scale, and sets every starting value before
 * first paint, so nothing jumps when this takes over. The section is the scroll track.
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
    // pinned. The gradient fades in from 60%, the lines rise in on it while it darkens and
    // are in by 83%, and the rest holds before it scrolls away.
    createTimeline({
      defaults: { ease: "linear" },
      autoplay: onScroll({ target: track, enter: "bottom top", leave: "bottom bottom", sync: true }),
    })
      .add({ duration: 1000 }, 0)
      .add(track, { "--reveal": { from: 0, to: 1 }, duration: 450, ease: "inOutSine" }, 150)
      .add(track, { "--zoom": { from: 0, to: 1 }, duration: 600 }, 0)
      .add("[data-zoom-copy]", { opacity: { from: 0, to: 1 }, duration: 100 }, 600)
      .add("[data-zoom-line]", {
        opacity: { from: 0, to: 1 },
        y: { from: 12, to: 0 },
        duration: 100,
        delay: stagger(30),
        ease: "outQuad",
      }, 640);
  });

  return (
    <section ref={ref} data-zoom-reveal aria-label={label} className={className}>
      {children}
    </section>
  );
}
