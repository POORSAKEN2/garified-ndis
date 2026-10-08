"use client";

import { createContext, use, useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import type { ServiceId } from "@/content/types";
import { EnquiryDialog } from "./EnquiryDialog";

type EnquiryContextValue = {
  isOpen: boolean;
  /** Opens the dialog with these services ticked. */
  openEnquiry: (preselect?: readonly ServiceId[]) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = use(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [preselect, setPreselect] = useState<readonly ServiceId[]>([]);
  // The button that opened the dialog, so focus can go back to it on close.
  const openerRef = useRef<HTMLElement | null>(null);

  const openEnquiry = useCallback((services: readonly ServiceId[] = []) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPreselect(services);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ isOpen, openEnquiry }), [isOpen, openEnquiry]);

  return (
    <EnquiryContext value={value}>
      {children}
      <EnquiryDialog
        open={isOpen}
        onOpenChange={setOpen}
        preselect={preselect}
        onCloseFocus={() => {
          const opener = openerRef.current;
          // The opener may be gone or hidden (the mobile menu closes as it opens the dialog).
          if (opener?.isConnected && opener.getClientRects().length > 0) opener.focus();
          else document.getElementById("main")?.focus();
        }}
      />
    </EnquiryContext>
  );
}
