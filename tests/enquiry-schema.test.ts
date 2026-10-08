import { describe, expect, it } from "vitest";
import { enquiry } from "@/content/enquiry";
import { readEnquiryForm, validateEnquiry, type EnquiryValues } from "@/lib/enquiry-schema";

const valid: EnquiryValues = {
  business: "Harbour Care Co",
  name: "Sam Lee",
  email: "sam@harbourcare.com.au",
  teamSize: "8–15 workers",
  services: ["rostering"],
  priorities: "",
};

describe("validateEnquiry", () => {
  it("accepts a complete enquiry and trims whitespace", () => {
    const result = validateEnquiry({ ...valid, business: "  Harbour Care Co  ", email: " sam@harbourcare.com.au " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.business).toBe("Harbour Care Co");
      expect(result.data.email).toBe("sam@harbourcare.com.au");
    }
  });

  it("requires business, name and email", () => {
    const result = validateEnquiry({ ...valid, business: "", name: " ", email: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.business).toEqual([enquiry.fieldErrors.business]);
      expect(result.fieldErrors.name).toEqual([enquiry.fieldErrors.name]);
      expect(result.fieldErrors.email).toBeDefined();
    }
  });

  it("rejects a malformed email", () => {
    const result = validateEnquiry({ ...valid, email: "sam@" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.email).toEqual([enquiry.fieldErrors.email]);
  });

  it("caps field lengths", () => {
    const result = validateEnquiry({
      ...valid,
      business: "x".repeat(121),
      priorities: "x".repeat(2001),
      email: `${"a".repeat(250)}@b.au`,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.business).toEqual([enquiry.fieldErrors.tooLong]);
      expect(result.fieldErrors.priorities).toEqual([enquiry.fieldErrors.tooLong]);
      expect(result.fieldErrors.email).toBeDefined();
    }
  });

  it("only allows known team sizes and services", () => {
    expect(validateEnquiry({ ...valid, teamSize: "500 workers" }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, services: ["payroll"] }).ok).toBe(false);
  });
});

describe("readEnquiryForm", () => {
  it("collects every checked service", () => {
    const form = new FormData();
    form.set("business", "Harbour Care Co");
    form.append("services", "rostering");
    form.append("services", "marketing");
    const values = readEnquiryForm(form);
    expect(values.services).toEqual(["rostering", "marketing"]);
    expect(values.name).toBe("");
  });
});
