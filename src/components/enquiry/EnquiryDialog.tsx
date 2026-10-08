"use client";

import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import { enquiry } from "@/content/enquiry";
import type { ServiceId } from "@/content/types";
import { EnquiryPanel } from "./EnquiryPanel";

type EnquiryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselect: readonly ServiceId[];
  /** Restores focus on close. Radix only does this itself when a Dialog.Trigger is used. */
  onCloseFocus: () => void;
};

/**
 * Radix Dialog: focus is trapped, Escape closes, and focus returns to the button that
 * opened it. A centred panel from `sm`, a full-height sheet on phones. The panel
 * content unmounts on close, so every opening starts a fresh form.
 */
export function EnquiryDialog({ open, onOpenChange, preselect, onCloseFocus }: EnquiryDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-navy/60" />
        <Dialog.Content
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            onCloseFocus();
          }}
          className={
            "dialog-panel fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-white " +
            "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[calc(100dvh-48px)] sm:w-[min(640px,calc(100vw-48px))] " +
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-panel sm:shadow-raised"
          }
        >
          <Dialog.Close
            aria-label={enquiry.close}
            className="absolute top-3 right-3 inline-grid size-11 place-items-center rounded-full text-navy transition-colors hover:bg-tint sm:top-4 sm:right-4"
          >
            <X aria-hidden="true" size={22} strokeWidth={2.2} />
          </Dialog.Close>
          <EnquiryPanel preselect={preselect} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
