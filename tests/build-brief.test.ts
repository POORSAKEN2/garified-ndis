import { describe, expect, it } from "vitest";
import { buildBrief } from "@/lib/build-brief";
import type { Enquiry } from "@/lib/enquiry-schema";

const base: Enquiry = {
  business: "Harbour Care Co",
  name: "Sam Lee",
  email: "sam@harbourcare.com.au",
  teamSize: "8–15 workers",
  services: ["accounting", "rostering"],
  priorities: "Roster changes every Friday.",
};

describe("buildBrief", () => {
  it("follows the reference template, with services in menu order", () => {
    expect(buildBrief(base)).toBe(
      [
        "GARIFIED SUPPORT ENQUIRY",
        "",
        "Business: Harbour Care Co",
        "Contact: Sam Lee",
        "Email: sam@harbourcare.com.au",
        "Team size: 8–15 workers",
        "Support requested: Rostering, Accounting support",
        "",
        "Priorities",
        "Roster changes every Friday.",
      ].join("\n"),
    );
  });

  it("falls back when no services are chosen", () => {
    expect(buildBrief({ ...base, services: [] })).toContain(
      "Support requested: Help choosing the right starting point",
    );
  });

  it("falls back when priorities are empty", () => {
    expect(buildBrief({ ...base, priorities: "" }).endsWith("Priorities\nTo discuss in a workflow review.")).toBe(true);
  });

  it("leaves out the 'has not been sent' line now that briefs are emailed", () => {
    expect(buildBrief(base)).not.toContain("has not been sent");
  });
});
