import { site } from "@/content/site";

/** First focusable element on every page. Hidden until it receives keyboard focus. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-pill bg-navy px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      {site.skipLink}
    </a>
  );
}
