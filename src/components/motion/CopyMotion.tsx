"use client";

import { createTimeline, splitText, stagger, utils } from "animejs";
import { useRef, type ReactNode } from "react";
import { fullMotion } from "./media";
import { useAnimeScope } from "./use-anime-scope";

/**
 * Hero copy entrance: the eyebrow, then the headline word by word, then the text, buttons
 * and note, each rising a short way into place. Plays once on load and is over in about a
 * second, so the headline is readable almost immediately. The wrapper carries
 * `data-hero-anim`, so CSS hides it before first paint until this takes over. Phones skip
 * it and get the copy at first paint.
 */
export function CopyMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimeScope(ref, () => {
    const root = ref.current!;
    const html = document.documentElement;
    // Motion has taken over, so the CSS reveal-after-2.5s fallback is switched off.
    html.dataset.heroReady = "";

    const heading = root.querySelector("h1")!;
    const blocks = [...root.children].filter((el) => el !== heading);
    // Wraps each headline word in a span; screen readers still get the heading as one line.
    const splitter = splitText(heading, { words: true });
    const { words } = splitter;

    // Starting states are set before the wrapper is revealed, so nothing flashes.
    utils.set([...blocks, ...words], { opacity: 0, y: 14 });
    utils.set(root, { opacity: 1 });

    // Once settled, the word spans are removed so the heading is plain markup again.
    createTimeline({ defaults: { ease: "outExpo", duration: 900 }, onComplete: () => splitter.revert() })
      .add(blocks[0], { opacity: 1, y: 0 })
      .add(words, { opacity: 1, y: 0, delay: stagger(55) }, 80)
      .add(blocks.slice(1), { opacity: 1, y: 0, delay: stagger(80) }, 380);

    return () => {
      splitter.revert();
      delete html.dataset.heroReady;
    };
  }, fullMotion);

  return (
    <div ref={ref} data-hero-anim className={className}>
      {children}
    </div>
  );
}
