"use client";

import { Check, Copy } from "lucide-react";
import { Dialog } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { enquiry } from "@/content/enquiry";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers and some embedded views block the Clipboard API.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

export function EnquirySuccess({
  brief,
  email,
  onEdit,
}: {
  brief: string;
  email: string;
  onEdit: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Focus the new heading so screen readers announce the result.
  useEffect(() => titleRef.current?.focus(), []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="px-5 pt-14 pb-8 sm:px-10 sm:pt-12 sm:pb-10">
      <CheckIcon size={40} />
      <Dialog.Title ref={titleRef} tabIndex={-1} className="mt-5 pr-10 text-h3 font-bold outline-none">
        {enquiry.success.title}
      </Dialog.Title>
      <Dialog.Description className="mt-3 text-muted">
        {enquiry.success.description.replace("{email}", email)}
      </Dialog.Description>

      <pre className="mt-6 overflow-x-auto rounded-card bg-tint p-5 font-sans text-small whitespace-pre-wrap text-navy">
        {brief}
      </pre>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button variant="outline" onClick={async () => setCopied(await copyText(brief))}>
          {copied ? (
            <Check aria-hidden="true" size={18} strokeWidth={2.4} />
          ) : (
            <Copy aria-hidden="true" size={18} strokeWidth={2.2} />
          )}
          <span aria-live="polite">{copied ? enquiry.copied : enquiry.copy}</span>
        </Button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-11 items-center font-bold text-blue underline-offset-4 hover:underline"
        >
          {enquiry.edit}
        </button>
      </div>
    </div>
  );
}
