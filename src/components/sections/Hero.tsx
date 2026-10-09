import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CheckIcon } from "@/components/ui/Icons";
import { TextLink } from "@/components/ui/TextLink";
import { CopyMotion } from "@/components/motion/CopyMotion";
import { HeroIcons } from "./HeroIcons";

// Week sheet (WeekSheet + SheetMotion) is parked for now; the hero runs centred on copy alone.
// Fills the viewport below the sticky header (72px, 80px from lg, plus its 1px border) and
// centres the copy vertically; on short screens it grows with the content instead. Gaps
// scale with viewport height (svh) so the block keeps the same proportions on every screen.
// From md it stops 72px short, so the next section peeks up as a cue to scroll.
export function Hero() {
  const { hero } = home;
  return (
    <section
      data-cta-hide
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-73px)] items-center py-[clamp(2rem,6svh,4rem)] md:min-h-[calc(100svh-145px)] lg:min-h-[calc(100svh-153px)]"
    >
      <HeroIcons />
      <CopyMotion className="container-site relative flex flex-col items-center text-center">
        <Eyebrow className="justify-center">{hero.eyebrow}</Eyebrow>
        <Heading as="h1" id="hero-title" className="mt-[clamp(0.75rem,2svh,1.25rem)]" content={hero.title} />
        <p className="mt-[clamp(1rem,3svh,1.5rem)] max-w-[48ch] text-body text-muted">{hero.text}</p>
        <div className="mt-[clamp(1.5rem,4svh,2rem)] flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <EnquiryTrigger className="w-full sm:w-auto">{hero.primary}</EnquiryTrigger>
          <TextLink href={hero.secondary.href} arrow="down">
            {hero.secondary.label}
          </TextLink>
        </div>
        <p className="mt-[clamp(1.5rem,6svh,3.5rem)] flex max-w-[60ch] items-start gap-3 text-left text-small font-semibold">
          <CheckIcon className="mt-0.5" />
          {hero.note}
        </p>
      </CopyMotion>
    </section>
  );
}
