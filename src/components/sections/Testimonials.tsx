import { home } from "@/content/site";
import { getDisplayableTestimonials, type Testimonial } from "@/content/testimonials";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

function SampleTag() {
  return (
    <span className="inline-flex rounded-pill border border-dashed border-amber bg-amber/15 px-2.5 py-0.5 text-small font-bold text-navy">
      {home.testimonials.sampleTag}
    </span>
  );
}

function Quote({ item, lead }: { item: Testimonial; lead: boolean }) {
  return (
    <figure
      data-quote
      className={cn(
        "flex flex-col rounded-panel border border-line bg-white p-6 sm:p-8",
        lead && "md:col-span-2 lg:p-12",
      )}
    >
      {item.placeholder && (
        <div className="mb-5">
          <SampleTag />
        </div>
      )}
      <blockquote className={cn("mb-8 text-navy", lead ? "max-w-[30ch] text-h4 font-semibold lg:text-h3 lg:font-bold" : "text-lead")}>
        <p>
          “{item.quote}”
        </p>
      </blockquote>
      <figcaption className="mt-auto border-t border-line pt-5 text-small text-muted">
        <span className="block text-body font-bold text-navy">{item.name}</span>
        {item.role}, {item.providerType}, {item.state}
      </figcaption>
    </figure>
  );
}

/**
 * Client quotes. Renders nothing when there are no displayable quotes: in production
 * the mock entries are filtered out by the guard in content/testimonials.ts.
 */
export function Testimonials() {
  const items = getDisplayableTestimonials();
  if (items.length === 0) return null;
  const copy = home.testimonials;

  return (
    <Section ground="tint" id={copy.id} aria-labelledby="testimonials-title">
      <SectionHead eyebrow={copy.eyebrow} title={copy.title} titleId="testimonials-title" />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:gap-6">
        {items.slice(0, 3).map((item, i) => (
          <Quote key={i} item={item} lead={i === 0 && items.length > 1} />
        ))}
      </div>
    </Section>
  );
}
