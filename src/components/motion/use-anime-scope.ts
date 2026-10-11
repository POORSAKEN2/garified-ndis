"use client";

import { createScope, type Scope } from "animejs";
import { useEffect, useRef, type RefObject } from "react";

type Setup = (scope: Scope) => void | (() => void);

/**
 * Runs anime.js setup inside a scope rooted at `rootRef`, so selector strings only match
 * inside that element. Runs only while `media` matches (see `./media`), and is skipped
 * entirely when the visitor prefers reduced motion. Crossing either query, by resizing or
 * turning a tablet, reverts the setup or runs it afresh; unmounting reverts it too, so no
 * inline styles are left behind.
 */
export function useAnimeScope(rootRef: RefObject<HTMLElement | null>, setup: Setup, media = "all") {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  });

  useEffect(() => {
    if (!rootRef.current) return;
    const scope = createScope({
      root: rootRef.current,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)", allowed: media },
    }).add((self) => {
      if (self?.matches.reduce || !self?.matches.allowed) return;
      return setupRef.current(self!);
    });
    return () => scope.revert();
  }, [rootRef, media]);
}
