/**
 * The example sheet in each service page hero: a sample of the working document that
 * service produces. This is illustrative demo material, not copy from the reference
 * site. It is always shown under the "Example" label, uses placeholder names
 * ("Worker A", "Referral B") and carries no prices, client names or statistics.
 *
 * Sheet names come from the service's handover outputs, by index, so they stay 1:1
 * with the copy.
 */
import type { ServiceId } from "./types";

export const exampleLabel = "Example";

/** How a status is drawn: exceptions in amber, items awaiting approval in blue. */
export type StatusTone = "done" | "review" | "flag" | "pending";

export type SheetStatus = { label: string; tone: StatusTone };

export type ShiftState = "confirmed" | "pending" | "open" | "leave" | "changed";

export type SheetRow = {
  title: string;
  detail: string;
  status: SheetStatus;
  /** Pipeline stage, 1 to 3, on sheets that have stages. */
  stage?: 1 | 2 | 3;
};

type SheetBase = {
  /** Index into the service's handover outputs ("Garified prepares"). */
  output: number;
  /** Last line of the sheet: the next output and where it stands. */
  footer: { output: number; status: SheetStatus };
};

export type WeekSheet = SheetBase & {
  kind: "week";
  days: readonly { day: string; shifts: readonly { time: string; who: string; state: ShiftState }[] }[];
  legend: readonly { state: ShiftState; label: string }[];
};

export type RegisterSheet = SheetBase & {
  kind: "register";
  /** Column labels for the three pipeline stages, when rows carry a stage. */
  stages?: readonly [string, string, string];
  rows: readonly SheetRow[];
};

export type ExampleSheet = WeekSheet | RegisterSheet;

export const exampleSheets: Record<ServiceId, ExampleSheet> = {
  rostering: {
    kind: "week",
    output: 0,
    days: [
      {
        day: "Mon",
        shifts: [
          { time: "7am–3pm", who: "Worker A", state: "confirmed" },
          { time: "3pm–9pm", who: "Worker B", state: "confirmed" },
        ],
      },
      {
        day: "Tue",
        shifts: [
          { time: "7am–3pm", who: "Worker C", state: "pending" },
          { time: "3pm–9pm", who: "Worker B", state: "confirmed" },
        ],
      },
      {
        day: "Wed",
        shifts: [
          { time: "7am–3pm", who: "Worker A", state: "confirmed" },
          { time: "3pm–9pm", who: "Open shift", state: "open" },
        ],
      },
      {
        day: "Thu",
        shifts: [
          { time: "7am–3pm", who: "Worker E", state: "changed" },
          { time: "Leave", who: "Worker D", state: "leave" },
        ],
      },
      {
        day: "Fri",
        shifts: [
          { time: "7am–3pm", who: "Worker A", state: "confirmed" },
          { time: "3pm–9pm", who: "Worker C", state: "pending" },
        ],
      },
    ],
    legend: [
      { state: "confirmed", label: "Confirmed" },
      { state: "pending", label: "Pending" },
      { state: "changed", label: "Approved change" },
      { state: "open", label: "Open shift" },
      { state: "leave", label: "Leave" },
    ],
    footer: { output: 4, status: { label: "Ready Friday", tone: "pending" } },
  },

  administration: {
    kind: "register",
    output: 3,
    rows: [
      { title: "Intake pack", detail: "Referral A", status: { label: "2 documents missing", tone: "flag" } },
      { title: "Service agreement draft", detail: "Referral A", status: { label: "Ready for your review", tone: "review" } },
      { title: "Worker screening check", detail: "Worker C", status: { label: "Expires in 30 days", tone: "flag" } },
      { title: "Shared inbox", detail: "Routine enquiries", status: { label: "Acknowledged", tone: "done" } },
      { title: "Appointment follow-up", detail: "Referral B", status: { label: "Booked", tone: "done" } },
    ],
    footer: { output: 4, status: { label: "Ready Friday", tone: "pending" } },
  },

  marketing: {
    kind: "register",
    output: 3,
    stages: ["Enquiry", "Followed up", "With intake"],
    rows: [
      { title: "SDA listing enquiry", detail: "Via vacancy listing", stage: 3, status: { label: "With your intake team", tone: "done" } },
      { title: "Support coordinator", detail: "Via referral outreach", stage: 2, status: { label: "Callback booked", tone: "pending" } },
      { title: "Campaign enquiry", detail: "Via approved campaign", stage: 2, status: { label: "Follow-up sent", tone: "pending" } },
      { title: "Website enquiry", detail: "Via service page", stage: 1, status: { label: "Callback due", tone: "flag" } },
      { title: "Next two weeks of posts", detail: "Content calendar", status: { label: "For your approval", tone: "review" } },
    ],
    footer: { output: 1, status: { label: "Ready Monday", tone: "pending" } },
  },

  accounting: {
    kind: "register",
    output: 4,
    rows: [
      { title: "Invoice 0413", detail: "Service record missing", status: { label: "Flagged", tone: "flag" } },
      { title: "Payment received", detail: "Matched to invoice 0398", status: { label: "Matched", tone: "done" } },
      { title: "Bank transaction", detail: "Needs classification", status: { label: "Escalated", tone: "flag" } },
      { title: "Overdue statement", detail: "Approved follow-up sent", status: { label: "Awaiting payment", tone: "pending" } },
      { title: "Payroll input pack", detail: "2 timesheets missing", status: { label: "In progress", tone: "pending" } },
    ],
    footer: { output: 0, status: { label: "Ready Thursday", tone: "pending" } },
  },
};
