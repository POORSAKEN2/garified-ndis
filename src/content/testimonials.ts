/**
 * Client quotes for the home Testimonials section (spec 9).
 *
 * The entries below are MOCK DATA for layout only. They use "Client name" rather
 * than invented people and make no numeric claims. Replace them with real quotes,
 * with written consent on file from each person, and set `placeholder: false`.
 *
 * Fake testimonials are misleading conduct under Australian Consumer Law. Do not
 * remove the guard in `getDisplayableTestimonials()`.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  providerType: string;
  state: string;
  placeholder: boolean;
};

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Our roster used to take most of Monday. Now it’s prepared before the week starts, and we still approve every change.",
    name: "Client name",
    role: "Operations Manager",
    providerType: "In-home & community provider",
    state: "VIC",
    placeholder: true,
  },
  {
    quote:
      "They work inside our systems and follow our processes. Our team keeps every care and staffing decision across our homes.",
    name: "Client name",
    role: "Director",
    providerType: "SIL provider",
    state: "NSW",
    placeholder: true,
  },
  {
    quote:
      "Vacancy enquiries are followed up properly now, so our intake team spends its time on the right conversations.",
    name: "Client name",
    role: "Founder",
    providerType: "SDA business",
    state: "QLD",
    placeholder: true,
  },
];

type GuardEnv = { NODE_ENV?: string; SHOW_SAMPLE_CONTENT?: string };

/** Placeholder quotes may render only outside production, or when previews opt in. */
export function canShowSamples(env: GuardEnv = process.env): boolean {
  return env.NODE_ENV !== "production" || env.SHOW_SAMPLE_CONTENT === "true";
}

/**
 * The quotes that may be shown. In a production build without SHOW_SAMPLE_CONTENT,
 * placeholders are removed; an empty result means the section must not render.
 */
export function getDisplayableTestimonials(
  list: readonly Testimonial[] = testimonials,
  env: GuardEnv = process.env,
): Testimonial[] {
  const samples = canShowSamples(env);
  return list.filter((t) => !t.placeholder || samples);
}
