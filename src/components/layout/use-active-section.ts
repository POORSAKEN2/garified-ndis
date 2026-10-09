"use client";

import { useEffect, useState } from "react";

/**
 * The id, among `ids`, of the section crossing a line 40% down the viewport, or null
 * while none does (the hero, the photo band, packages, the FAQ). Pass a stable array.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const onLine = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onLine.add(entry.target.id);
          else onLine.delete(entry.target.id);
        }
        setActive(ids.find((id) => onLine.has(id)) ?? null);
      },
      // A 1% band, so only one of the adjoining sections can be on it at a time.
      { rootMargin: "-40% 0px -59% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
