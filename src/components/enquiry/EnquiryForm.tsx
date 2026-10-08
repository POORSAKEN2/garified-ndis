"use client";

import { ChevronDown, CircleAlert } from "lucide-react";
import { Dialog } from "radix-ui";
import { useId, type ReactNode } from "react";
import { enquiry, serviceOptions, teamSizes } from "@/content/enquiry";
import type { EnquiryField, EnquiryValues, FieldErrors } from "@/lib/enquiry-schema";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const { fields } = enquiry;

const control =
  "w-full min-h-[52px] rounded-[12px] border-[1.5px] border-line bg-white px-4 text-body text-navy " +
  "placeholder:text-muted transition-colors hover:border-muted focus:border-blue " +
  "aria-invalid:border-error";

type EnquiryFormProps = {
  values: EnquiryValues;
  fieldErrors?: FieldErrors;
  message?: string;
  pending: boolean;
  /** When the dialog opened. The server rejects forms completed faster than a person could. */
  startedAt: number;
  onSubmit: (form: HTMLFormElement) => void;
};

export function EnquiryForm({ values, fieldErrors, message, pending, startedAt, onSubmit }: EnquiryFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const errorFor = (name: EnquiryField) => fieldErrors?.[name]?.[0];

  const describe = (name: EnquiryField) => (errorFor(name) ? id(`${name}-error`) : undefined);

  return (
    <div className="px-5 pt-14 pb-8 sm:px-10 sm:pt-12 sm:pb-10">
      <Dialog.Title className="pr-10 text-h3 font-bold">{enquiry.title}</Dialog.Title>
      <Dialog.Description className="mt-3 text-muted">{enquiry.description}</Dialog.Description>

      <form
        noValidate
        className="mt-8 grid gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.currentTarget);
        }}
      >
        <div aria-live="polite">
          {message && (
            <p
              role="alert"
              className="flex items-start gap-3 rounded-card border-[1.5px] border-error/30 bg-error/5 px-4 py-3 font-semibold text-error"
            >
              <CircleAlert aria-hidden="true" size={20} className="mt-0.5 flex-none" />
              {message}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={fields.business.label} htmlFor={id("business")} error={errorFor("business")} errorId={id("business-error")} className="sm:col-span-2">
            <input
              id={id("business")}
              name="business"
              type="text"
              autoComplete="organization"
              required
              maxLength={120}
              defaultValue={values.business}
              placeholder={fields.business.placeholder}
              aria-invalid={!!errorFor("business") || undefined}
              aria-describedby={describe("business")}
              className={control}
            />
          </Field>

          <Field label={fields.name.label} htmlFor={id("name")} error={errorFor("name")} errorId={id("name-error")}>
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              defaultValue={values.name}
              placeholder={fields.name.placeholder}
              aria-invalid={!!errorFor("name") || undefined}
              aria-describedby={describe("name")}
              className={control}
            />
          </Field>

          <Field label={fields.email.label} htmlFor={id("email")} error={errorFor("email")} errorId={id("email-error")}>
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              defaultValue={values.email}
              placeholder={fields.email.placeholder}
              aria-invalid={!!errorFor("email") || undefined}
              aria-describedby={describe("email")}
              className={control}
            />
          </Field>

          <Field label={fields.teamSize.label} htmlFor={id("teamSize")} error={errorFor("teamSize")} errorId={id("teamSize-error")} className="sm:col-span-2">
            <div className="relative">
              <select
                id={id("teamSize")}
                name="teamSize"
                defaultValue={values.teamSize}
                aria-describedby={describe("teamSize")}
                className={cn(control, "appearance-none pr-12")}
              >
                {teamSizes.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                size={20}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-navy"
              />
            </div>
          </Field>
        </div>

        <fieldset>
          <legend className="font-semibold">{fields.services.legend}</legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {serviceOptions.map((option) => (
              <label
                key={option.id}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-pill border-[1.5px] border-line px-4 font-semibold",
                  "transition-colors hover:border-navy has-checked:border-blue has-checked:bg-tint has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue",
                )}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={option.id}
                  defaultChecked={values.services.includes(option.id)}
                  className="size-[18px] accent-blue"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Field label={fields.priorities.label} htmlFor={id("priorities")} error={errorFor("priorities")} errorId={id("priorities-error")}>
          <textarea
            id={id("priorities")}
            name="priorities"
            rows={3}
            maxLength={2000}
            defaultValue={values.priorities}
            placeholder={fields.priorities.placeholder}
            aria-invalid={!!errorFor("priorities") || undefined}
            aria-describedby={describe("priorities")}
            className={cn(control, "py-3 leading-normal")}
          />
        </Field>

        {/* Bot traps: a field people never see, and the time the form was opened. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <input type="hidden" name="startedAt" value={startedAt} />

        <div className="grid gap-4 border-t border-line pt-6">
          <Button type="submit" disabled={pending} className="w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:justify-self-start">
            {pending ? enquiry.sending : enquiry.submit}
          </Button>
          <p className="text-small text-muted">{enquiry.note}</p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <label htmlFor={htmlFor} className="font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="flex items-start gap-2 text-small font-semibold text-error">
          <CircleAlert aria-hidden="true" size={18} className="mt-px flex-none" />
          {error}
        </p>
      )}
    </div>
  );
}
