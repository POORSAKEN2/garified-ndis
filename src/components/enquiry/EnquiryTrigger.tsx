"use client";

import type { ComponentProps } from "react";
import type { ServiceId } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { useEnquiry } from "./EnquiryProvider";

type EnquiryTriggerProps = Omit<ComponentProps<typeof Button>, "onClick" | "arrow"> & {
  preselect?: readonly ServiceId[];
  /** Runs before the dialog opens, for example to close the mobile menu. */
  onBeforeOpen?: () => void;
};

/** A button that opens the enquiry dialog. Every "Let’s talk"-style CTA uses this. */
export function EnquiryTrigger({ preselect, onBeforeOpen, children, ...rest }: EnquiryTriggerProps) {
  const { openEnquiry } = useEnquiry();
  return (
    <Button
      aria-haspopup="dialog"
      onClick={() => {
        onBeforeOpen?.();
        openEnquiry(preselect);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
