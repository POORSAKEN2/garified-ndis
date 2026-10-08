"use client";

import { createScope, type Scope } from "animejs";
import { useEffect, useRef, type RefObject } from "react";

type Setup = (scope: Scope) => void | (() => void);

/**
 * Runs anime.js setup inside a scope rooted at `rootRef`, so selector strings only match
 * inside that element. Skipped entirely when the visitor prefers reduced motion, and
 * reverted on unmount so no inline styles are left behind.
 */
export function useAnimeScope(rootRef: RefObject<HTMLElement | null>, setup: Setup) {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  });

  useEffect(() => {
    if (!rootRef.current) return;
    const scope = createScope({
      root: rootRef.current,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (self?.matches.reduce) return;
      return setupRef.current(self!);
    });
    return () => scope.revert();
  }, [rootRef]);
}
