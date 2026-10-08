/**
 * Enquiry dialog copy. Title, description, labels, placeholders, options and the
 * brief template are 1:1 with the reference site.
 *
 * The note, submit label and result lines differ: the reference says nothing is
 * sent, which is false once the form emails Garified. The wording below is the
 * proposal in spec 5.2.2 and is pending client approval (spec 15.1).
 */
import type { ServiceId } from "./types";

export const teamSizes = [
  "1–7 workers",
  "8–15 workers",
  "16–25 workers",
  "26+ workers",
  "SDA business",
] as const;

export type TeamSize = (typeof teamSizes)[number];

export const serviceOptions: readonly { id: ServiceId; label: string }[] = [
  { id: "rostering", label: "Rostering" },
  { id: "administration", label: "Administration" },
  { id: "marketing", label: "Marketing" },
  { id: "accounting", label: "Accounting support" },
];

export const enquiry = {
  title: "Let’s find your starting point.",
  description: "Prepare a short enquiry about your business. Please leave out participant details.",
  fields: {
    business: { label: "Business name", placeholder: "Your provider business" },
    name: { label: "Your name", placeholder: "First and last name" },
    email: { label: "Business email", placeholder: "you@yourbusiness.com.au" },
    teamSize: { label: "Your team size", default: "8–15 workers" satisfies TeamSize },
    services: { legend: "Where would you like support?" },
    priorities: {
      label: "What is taking up your time?",
      placeholder: "Tell us about the business tasks you would like help with.",
    },
  },

  // Pending approval (spec 5.2.2).
  submit: "Send my enquiry",
  note: "We’ll only use these details to reply to your enquiry. Please leave out participant details.",
  success: {
    title: "Thanks. Your enquiry has been sent.",
    /** "{email}" is replaced with the address the user entered. */
    description: "We’ll reply to {email} soon. Here is a copy of your brief for your records.",
  },
  error: "We couldn’t send your enquiry. Please check your connection and try again.",

  // New copy, not on the reference site: field errors and the dialog's close label.
  fieldErrors: {
    business: "Enter your business name.",
    name: "Enter your first and last name.",
    email: "Enter a business email address, like you@yourbusiness.com.au.",
    tooLong: "This is too long. Shorten it and try again.",
    summary: "Check the highlighted fields.",
  },
  close: "Close",
  sending: "Sending…",

  // 1:1 with the reference result state.
  copy: "Copy brief",
  copied: "Copied",
  edit: "Edit your enquiry",

  brief: {
    heading: "GARIFIED SUPPORT ENQUIRY",
    labels: {
      business: "Business",
      contact: "Contact",
      email: "Email",
      teamSize: "Team size",
      services: "Support requested",
      priorities: "Priorities",
    },
    noServices: "Help choosing the right starting point",
    noPriorities: "To discuss in a workflow review.",
    // Reference closing line, kept for the record but not used: "has not been sent" is
    // untrue once the brief is emailed. Raise with the client alongside spec 15.1.
    footer: "Prepared for a Garified workflow conversation. This brief has not been sent.",
  },
} as const;
