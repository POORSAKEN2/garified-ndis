import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/** Deep section. The three steps are a real sequence, so they are numbered and joined by a track. */
export function Approach() {
  const copy = home.approach;
  return (
    <Section ground="deep" id={copy.id} aria-labelledby="approach-title">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        <SectionHead eyebrow={copy.eyebrow} title={copy.title} titleId="approach-title" />
        <div>
          <p className="measure text-lead text-on-deep">{copy.text}</p>
          <EnquiryTrigger variant="white" className="mt-8">
            {copy.cta}
          </EnquiryTrigger>
        </div>
      </div>

      <ol data-approach-steps className="relative mt-14 grid gap-10 pl-12 lg:mt-20 lg:grid-cols-3 lg:gap-12 lg:pl-0">
        {/* Track: vertical on phones, horizontal from lg. The fill is animated in Phase 7. */}
        <li aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-white/15 lg:top-[11px] lg:right-3 lg:bottom-auto lg:left-3 lg:h-0.5 lg:w-auto">
          <span data-approach-fill className="absolute inset-0 origin-top bg-amber lg:origin-left" />
        </li>
        {copy.steps.map((step) => (
          <li key={step.number} data-approach-step className="relative min-w-0 lg:pt-14">
            <span
              aria-hidden="true"
              data-approach-dot
              className="absolute top-0 -left-12 grid size-6 place-items-center rounded-full border-2 border-amber bg-deep lg:left-0"
            >
              <span className="size-2 rounded-full bg-amber" />
            </span>
            <p className="font-semibold text-amber tabular-nums">{step.number}</p>
            <h3 className="mt-1.5 text-h4 font-bold">{step.title}</h3>
            <p className="mt-3 max-w-[36ch] text-on-deep">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
