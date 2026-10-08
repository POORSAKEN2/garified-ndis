import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CheckIcon } from "@/components/ui/Icons";
import { TextLink } from "@/components/ui/TextLink";
import { WeekSheet } from "./WeekSheet";

export function Hero() {
  const { hero } = home;
  return (
    <section data-cta-hide aria-labelledby="hero-title" className="pt-10 pb-16 sm:pt-14 lg:pt-20 lg:pb-28">
      <div className="container-site grid gap-12 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.2fr)] xl:items-center xl:gap-12">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <Heading as="h1" id="hero-title" className="mt-5" content={hero.title} />
          <p className="mt-6 max-w-[34ch] text-lead text-muted">{hero.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <EnquiryTrigger className="w-full sm:w-auto">{hero.primary}</EnquiryTrigger>
            <TextLink href={hero.secondary.href} arrow="down">
              {hero.secondary.label}
            </TextLink>
          </div>
          <p className="mt-10 flex max-w-[38ch] items-start gap-3 border-t border-line pt-6 font-semibold">
            <CheckIcon className="mt-0.5" />
            {hero.note}
          </p>
        </div>
        <div className="max-w-[760px] xl:max-w-none">
          <WeekSheet />
        </div>
      </div>
    </section>
  );
}
