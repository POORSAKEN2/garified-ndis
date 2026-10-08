"use client";

import { startTransition, useActionState, useState } from "react";
import { sendEnquiry, type EnquiryState } from "@/actions/send-enquiry";
import { enquiry } from "@/content/enquiry";
import type { ServiceId } from "@/content/types";
import { readEnquiryForm, validateEnquiry, type EnquiryValues, type FieldErrors } from "@/lib/enquiry-schema";
import { EnquiryForm } from "./EnquiryForm";
import { EnquirySuccess } from "./EnquirySuccess";

const idle: EnquiryState = { status: "idle" };

/** Switches between the form and the sent state, and keeps the user's input between them. */
export function EnquiryPanel({ preselect }: { preselect: readonly ServiceId[] }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, idle);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const [editing, setEditing] = useState(false);
  // Kept here, not in the form, so editing after a send does not restart the bot timer.
  const [startedAt] = useState(() => Date.now());
  const [values, setValues] = useState<EnquiryValues>(() => ({
    business: "",
    name: "",
    email: "",
    teamSize: enquiry.fields.teamSize.default,
    services: [...preselect],
    priorities: "",
  }));

  function submit(form: HTMLFormElement) {
    const formData = new FormData(form);
    const next = readEnquiryForm(formData);
    setValues(next);
    const check = validateEnquiry(next);
    if (!check.ok) {
      setClientErrors(check.fieldErrors);
      // Move focus to the first field that needs fixing.
      const first = Object.keys(check.fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setClientErrors(null);
    setEditing(false);
    // Submitted through a transition rather than the form action, so React does not
    // reset the fields and the user's input survives a failed send.
    startTransition(() => formAction(formData));
  }

  if (state.status === "success" && !editing && !pending) {
    return <EnquirySuccess brief={state.brief} email={state.email} onEdit={() => setEditing(true)} />;
  }

  const serverError = state.status === "error" && !editing && !pending ? state : null;

  return (
    <EnquiryForm
      values={values}
      fieldErrors={clientErrors ?? serverError?.fieldErrors}
      message={clientErrors ? enquiry.fieldErrors.summary : serverError?.message}
      pending={pending}
      startedAt={startedAt}
      onSubmit={submit}
    />
  );
}
