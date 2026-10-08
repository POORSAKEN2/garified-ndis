import { z } from "zod";
import { enquiry, teamSizes } from "@/content/enquiry";
import type { ServiceId } from "@/content/types";

const errors = enquiry.fieldErrors;

export const serviceIds = [
  "rostering",
  "administration",
  "marketing",
  "accounting",
] as const satisfies readonly ServiceId[];

/** Shared by the dialog (inline errors before sending) and the server action. */
export const enquirySchema = z.object({
  business: z.string().trim().min(2, errors.business).max(120, errors.tooLong),
  name: z.string().trim().min(2, errors.name).max(120, errors.tooLong),
  email: z.string().trim().max(254, errors.tooLong).pipe(z.email({ error: errors.email })),
  teamSize: z.enum(teamSizes),
  services: z.array(z.enum(serviceIds)).max(serviceIds.length),
  priorities: z.string().trim().max(2000, errors.tooLong),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof Enquiry;
export type FieldErrors = Partial<Record<EnquiryField, string[]>>;

/** The raw strings a form holds, used to refill fields after an error or an edit. */
export type EnquiryValues = {
  business: string;
  name: string;
  email: string;
  teamSize: string;
  services: string[];
  priorities: string;
};

export function readEnquiryForm(formData: FormData): EnquiryValues {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    business: text("business"),
    name: text("name"),
    email: text("email"),
    teamSize: text("teamSize"),
    services: formData.getAll("services").filter((v): v is string => typeof v === "string"),
    priorities: text("priorities"),
  };
}

export function validateEnquiry(values: EnquiryValues) {
  const result = enquirySchema.safeParse(values);
  if (result.success) return { ok: true as const, data: result.data };
  return { ok: false as const, fieldErrors: z.flattenError(result.error).fieldErrors as FieldErrors };
}
