import { enquiry, serviceOptions } from "@/content/enquiry";
import type { Enquiry } from "./enquiry-schema";

const { brief } = enquiry;

/**
 * The support brief, following the reference template line for line. The template's
 * closing line ("This brief has not been sent.") is left out: the brief is now emailed,
 * so that line would be false. See the note on `brief.footer` in content/enquiry.ts.
 */
export function buildBrief(data: Enquiry): string {
  const services = serviceOptions
    .filter((option) => data.services.includes(option.id))
    .map((option) => option.label);

  return [
    brief.heading,
    "",
    `${brief.labels.business}: ${data.business}`,
    `${brief.labels.contact}: ${data.name}`,
    `${brief.labels.email}: ${data.email}`,
    `${brief.labels.teamSize}: ${data.teamSize}`,
    `${brief.labels.services}: ${services.length ? services.join(", ") : brief.noServices}`,
    "",
    brief.labels.priorities,
    data.priorities || brief.noPriorities,
  ].join("\n");
}
