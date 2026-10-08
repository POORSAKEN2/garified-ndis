"use server";

import { Resend } from "resend";
import { enquiry } from "@/content/enquiry";
import { buildBrief } from "@/lib/build-brief";
import {
  readEnquiryForm,
  validateEnquiry,
  type EnquiryValues,
  type FieldErrors,
} from "@/lib/enquiry-schema";

export type EnquiryState =
  | { status: "idle" }
  | { status: "success"; brief: string; email: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors; values: EnquiryValues };

/** Submissions faster than this are treated as bots. */
const MIN_FILL_MS = 3000;

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values = readEnquiryForm(formData);
  const result = validateEnquiry(values);

  if (!result.ok) {
    return {
      status: "error",
      message: enquiry.fieldErrors.summary,
      fieldErrors: result.fieldErrors,
      values,
    };
  }

  const brief = buildBrief(result.data);
  const success: EnquiryState = { status: "success", brief, email: result.data.email };

  // Honeypot filled or form completed too fast: report success so bots learn nothing.
  const startedAt = Number(formData.get("startedAt"));
  const honeypot = formData.get("website");
  if ((typeof honeypot === "string" && honeypot !== "") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return success;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "development") {
      // Lets the dialog be exercised locally before Resend is set up. Never in production.
      console.info("[enquiry] Email not configured; brief not sent.\n" + brief);
      return success;
    }
    console.error("[enquiry] RESEND_API_KEY, ENQUIRY_TO_EMAIL or ENQUIRY_FROM_EMAIL is missing.");
    return { status: "error", message: enquiry.error, values };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: result.data.email,
      // Line breaks stripped so the business name cannot add header lines.
      subject: `New enquiry: ${result.data.business.replace(/[\r\n]+/g, " ")}`,
      // Plain text only, so nothing the user typed is rendered as HTML.
      text: brief,
    });
    if (error) {
      // Log the failure type only, never the enquiry contents.
      console.error("[enquiry] Resend rejected the email:", error.name);
      return { status: "error", message: enquiry.error, values };
    }
  } catch (err) {
    console.error("[enquiry] Sending failed:", err instanceof Error ? err.name : "unknown error");
    return { status: "error", message: enquiry.error, values };
  }

  return success;
}
