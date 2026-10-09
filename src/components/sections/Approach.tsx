import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { TrackMotion } from "@/components/motion/TrackMotion";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/** The three steps are a real sequence, so they are numbered and joined by a track. */
export function Approach() {
  const copy = home.approach;
  return (
    <Section id={copy.id} aria-labelledby="approach-title">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        <SectionHead eyebrow={copy.eyebrow} title={copy.title} titleId="approach-title" />
        <div>
          <p className="measure text-lead">{copy.text}</p>
          <EnquiryTrigger className="mt-8">
            {copy.cta}
          </EnquiryTrigger>
        </div>
      </div>

      <TrackMotion>
        <ol data-approach-steps className="relative mt-14 grid gap-10 pl-12 lg:mt-20 lg:grid-cols-3 lg:gap-12 lg:pl-0">
          {/* Track: vertical on phones, horizontal from lg. */}
          <li aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-line lg:top-[11px] lg:right-3 lg:bottom-auto lg:left-3 lg:h-0.5 lg:w-auto">
            <span data-approach-fill className="absolute inset-0 origin-top bg-amber lg:origin-left" />
          </li>
          {copy.steps.map((step) => (
            <li key={step.number} data-approach-step className="relative min-w-0 lg:pt-14">
              <span
                aria-hidden="true"
                data-approach-dot
                className="absolute top-0 -left-12 grid size-6 place-items-center rounded-full border-2 border-amber bg-white lg:left-0"
              >
                <span className="size-2 rounded-full bg-amber" />
              </span>
              <p className="font-semibold tabular-nums">{step.number}</p>
              <h3 className="mt-1.5 text-h4 font-bold">{step.title}</h3>
              <p className="mt-3 max-w-[36ch]">{step.text}</p>
            </li>
          ))}
        </ol>
      </TrackMotion>
    </Section>
  );
}
