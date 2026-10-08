import { describe, expect, it } from "vitest";
import {
  getDisplayableTestimonials,
  testimonials,
  type Testimonial,
} from "@/content/testimonials";

const real: Testimonial = {
  quote: "Real quote",
  name: "Real person",
  role: "Director",
  providerType: "SIL provider",
  state: "NSW",
  placeholder: false,
};

describe("getDisplayableTestimonials", () => {
  it("hides placeholder quotes in production", () => {
    expect(getDisplayableTestimonials(testimonials, { NODE_ENV: "production" })).toEqual([]);
  });

  it("keeps real quotes in production and drops placeholders", () => {
    const list = [...testimonials, real];
    expect(getDisplayableTestimonials(list, { NODE_ENV: "production" })).toEqual([real]);
  });

  it("shows placeholders in production only when SHOW_SAMPLE_CONTENT is exactly 'true'", () => {
    expect(
      getDisplayableTestimonials(testimonials, { NODE_ENV: "production", SHOW_SAMPLE_CONTENT: "true" }),
    ).toHaveLength(testimonials.length);
    expect(
      getDisplayableTestimonials(testimonials, { NODE_ENV: "production", SHOW_SAMPLE_CONTENT: "1" }),
    ).toEqual([]);
  });

  it("shows placeholders in development", () => {
    expect(getDisplayableTestimonials(testimonials, { NODE_ENV: "development" })).toHaveLength(
      testimonials.length,
    );
  });

  it("marks every mock entry as a placeholder", () => {
    expect(testimonials.every((t) => t.placeholder)).toBe(true);
  });
});
