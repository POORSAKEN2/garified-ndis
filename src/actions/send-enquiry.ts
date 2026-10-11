"use server";

import { createTransport, type NodemailerError } from "nodemailer";
import { enquiry } from "@/content/enquiry";
import { buildBrief } from "@/lib/build-brief";
import { buildEnquiryEmail } from "@/lib/enquiry-email";
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

/** Display name on the enquiry emails. */
const SENDER_NAME = "Garified Website";

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

  const user = process.env.GMAIL_USER;
  // Google shows app passwords in groups of four; the spaces are not part of the password.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!user || !pass) {
    const missing = Object.entries({ GMAIL_USER: user, GMAIL_APP_PASSWORD: pass })
      .filter(([, value]) => !value)
      .map(([name]) => name)
      .join(", ");
    if (process.env.NODE_ENV === "development") {
      // Lets the dialog be exercised locally before Gmail is set up. Never in production.
      console.info(`[enquiry] Email not configured (missing ${missing}); brief not sent.\n` + brief);
      return success;
    }
    console.error(`[enquiry] Missing ${missing}.`);
    return { status: "error", message: enquiry.error, values };
  }

  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      // Give up within seconds, not nodemailer's minutes-long defaults, so a stalled
      // connection fails before the hosting platform's request time limit.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
    await transporter.sendMail({
      // Gmail sends as the signed-in account whatever From says, so it is set to match.
      from: { name: SENDER_NAME, address: user },
      to: process.env.ENQUIRY_TO_EMAIL || user,
      replyTo: result.data.email,
      // Line breaks stripped so the business name cannot add header lines.
      subject: `Garified NDIS – New enquiry: ${result.data.business.replace(/[\r\n]+/g, " ")}`,
      // The designed sheet, with everything the user typed escaped, plus the plain-text
      // brief for clients that do not show HTML.
      html: buildEnquiryEmail(result.data),
      text: brief,
    });
  } catch (err) {
    // Log the failure code only, never the enquiry contents. The SMTP reply can echo an
    // address back, so it is shown in development only, where it explains setup mistakes
    // such as a wrong app password (EAUTH).
    const error = err as NodemailerError | undefined;
    console.error(
      "[enquiry] Sending failed:",
      error?.code ?? "unknown error",
      process.env.NODE_ENV === "development" ? error?.message : "",
    );
    return { status: "error", message: enquiry.error, values };
  }

  return success;
}
