"use client";

import { createContext, use, useCallback, useMemo, useState, type ReactNode } from "react";
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

  const openEnquiry = useCallback((services: readonly ServiceId[] = []) => {
    setPreselect(services);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ isOpen, openEnquiry }), [isOpen, openEnquiry]);

  return (
    <EnquiryContext value={value}>
      {children}
      <EnquiryDialog open={isOpen} onOpenChange={setOpen} preselect={preselect} />
    </EnquiryContext>
  );
}
