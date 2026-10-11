"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";

/**
 * Eased wheel scrolling for the whole page. Touch keeps native momentum, anchor jumps
 * stay with CSS `scroll-behavior`, and Lenis turns itself off under reduced motion.
 * Phones and other touch-only screens never start it: it would not touch their scrolling,
 * and its frame loop would run for nothing. Paused while the enquiry dialog is open so
 * the wheel scrolls the dialog, not the page.
 */
export function SmoothScroll() {
  const { isOpen } = useEnquiry();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const lenis = new Lenis({ autoRaf: true, stopInertiaOnNavigate: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Declared after the effect above, so the instance exists by the time this runs.
  useEffect(() => {
    if (isOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [isOpen]);

  return null;
}
