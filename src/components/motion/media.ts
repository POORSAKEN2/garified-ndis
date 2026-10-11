/**
 * Where the full motion runs: tablets and up, held at least 512px tall. Phones, upright
 * or on their side, get every section at rest instead: no load sequences, no scroll-scrubbed
 * set pieces, nothing hidden until a trigger fires, so the page scrolls straight through.
 * globals.css repeats this query for the first-paint states; keep the two in step.
 */
export const fullMotion = "(min-width: 48rem) and (min-height: 32rem)";

/** The hero icons only show from `xl`, so their pop-in and drift only run there. */
export const heroIcons = "(min-width: 80rem)";
