/**
 * Calls `play` once, when `el` is well into the viewport (its top past 85% of the
 * screen height). Returns a cleanup function. A plain IntersectionObserver keeps the
 * trigger simple: one entry, one play, no scroll listeners.
 */
export function playInView(el: Element, play: () => void): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        play();
      }
    },
    { rootMargin: "0px 0px -15% 0px" },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
