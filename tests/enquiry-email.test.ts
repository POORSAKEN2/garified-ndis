import { describe, expect, it } from "vitest";
import { buildEnquiryEmail } from "@/lib/enquiry-email";
import type { Enquiry } from "@/lib/enquiry-schema";

const base: Enquiry = {
  business: "Harbour Care Co",
  name: "Sam Lee",
  email: "sam@harbourcare.com.au",
  teamSize: "8–15 workers",
  services: ["accounting", "rostering"],
  priorities: "Roster changes every Friday.",
};

const ticked = (html: string) => html.split("&#10003;</span>Requested").length - 1;

describe("buildEnquiryEmail", () => {
  it("escapes everything the user typed", () => {
    const html = buildEnquiryEmail({
      ...base,
      business: `<img src=x onerror="alert(1)">`,
      name: "Sam <b>Lee</b>",
      priorities: "<script>alert(1)</script>",
    });
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain("<b>Lee</b>");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
    expect(html).toContain("Reply to Sam &lt;b&gt;Lee&lt;/b&gt;");
  });

  it("keeps replacement patterns in a name literal", () => {
    expect(buildEnquiryEmail({ ...base, name: "Jo $& $1" })).toContain("Reply to Jo $&amp; $1");
  });

  it("ticks only the requested services", () => {
    const html = buildEnquiryEmail(base);
    expect(ticked(html)).toBe(2);
    expect(html.split("Not requested").length - 1).toBe(2);
  });

  it("shows the starting-point fallback when no service is ticked", () => {
    const html = buildEnquiryEmail({ ...base, services: [] });
    expect(ticked(html)).toBe(0);
    expect(html).toContain("Help choosing the right starting point");
  });

  it("keeps the line breaks in their words, and notes a blank answer", () => {
    expect(buildEnquiryEmail({ ...base, priorities: "One\nTwo" })).toContain("One<br>Two");
    expect(buildEnquiryEmail({ ...base, priorities: "" })).toContain("They left this blank.");
  });

  it("previews the contact, team size and services in the inbox", () => {
    expect(buildEnquiryEmail(base)).toContain("Sam Lee, 8–15 workers. Rostering, Accounting support.");
  });

  it("replies to the contact's address", () => {
    expect(buildEnquiryEmail(base)).toContain(
      'href="mailto:sam@harbourcare.com.au?subject=Re%3A%20Your%20Garified%20enquiry"',
    );
  });
});
