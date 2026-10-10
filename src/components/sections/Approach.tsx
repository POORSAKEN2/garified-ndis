import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { StepTrack } from "./StepTrack";

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

      <StepTrack steps={copy.steps} className="mt-14 lg:mt-20" />
    </Section>
  );
}
