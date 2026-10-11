import type { Metadata } from "next";
import Image from "next/image";
import { exampleSheets } from "@/content/examples";
import { getService, servicePage, type Service, type ServiceDetail } from "@/content/services";
import type { ServiceId } from "@/content/types";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { SiteShell } from "@/components/layout/SiteShell";
import { SheetMotion } from "@/components/motion/SheetMotion";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { StepTrack } from "@/components/sections/StepTrack";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CheckIcon } from "@/components/ui/Icons";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { TextLink } from "@/components/ui/TextLink";
import { ExampleSheet } from "./ExampleSheet";
import { includedIcon } from "./included-icon";
import { serviceArt } from "./service-art";

export function serviceMetadata(id: ServiceId): Metadata {
  const { meta } = getService(id).detail;
  return { title: meta.title, description: meta.description };
}

type Preselect = readonly ServiceId[];

/**
 * Shared template for the four service pages. The hero is the one bold moment: the copy
 * beside a tint stage that runs to the edge of the screen, where the service's clay icon
 * lands on an example of the work. Everything after it uses the home page's own parts
 * (section heads, ruled lists, amber ticks, the step track, the FAQ and the closing band),
 * so the service pages read as the same site. Section ids match the reference anchors
 * (#included, #questions, #contact).
 */
export function ServicePage({ id }: { id: ServiceId }) {
  const service = getService(id);
  const preselect = [id] as const;
  const { detail } = service;

  return (
    <SiteShell variant="service" preselect={preselect}>
      <Hero service={service} preselect={preselect} />
      <Included detail={detail} />
      <Handover detail={detail} />

      <Section ground="tint" aria-labelledby="process-title">
        <SectionHead title={detail.process.title} titleId="process-title" />
        <StepTrack
          steps={detail.process.steps.map((step, i) => ({ ...step, number: `0${i + 1}` }))}
          className="mt-12 lg:mt-16"
        />
      </Section>

      <Faq copy={{ ...servicePage.faq, ...detail.faq }} />
      <ContactCta copy={{ id: "contact", ...detail.contact, cta: detail.hero.cta }} preselect={preselect} />
    </SiteShell>
  );
}

/**
 * The first viewport. From lg the copy sits on the left and the stage fills the right,
 * from the header's bottom rule to the hero's foot and out to the screen edge. On phones
 * the stage follows the copy, edge to edge, so the action stays in the first screen.
 */
function Hero({ service, preselect }: { service: Service; preselect: Preselect }) {
  const { detail } = service;
  const { hero } = detail;

  return (
    <section data-cta-hide aria-labelledby="service-title" className="overflow-x-clip">
      <div className="container-site grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-x-[clamp(40px,5vw,72px)]">
        <div className="flex flex-col pt-4 pb-14 sm:pt-6 lg:pt-8 lg:pb-[clamp(56px,6vw,96px)]">
          <TextLink href={servicePage.backHref} arrow="left" className="flex-row-reverse self-start">
            {servicePage.backLink}
          </TextLink>

          <div className="mt-8 lg:my-auto lg:pt-10">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <Heading as="h1" size="title" id="service-title" className="mt-4" content={hero.title} />
            <p className="measure mt-6 text-lead text-muted">{hero.text}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <EnquiryTrigger preselect={preselect} className="w-full sm:w-auto">
                {hero.cta}
              </EnquiryTrigger>
              <TextLink href="#included">{servicePage.includedLink}</TextLink>
            </div>

            <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2 lg:mt-12">
              <div>
                <dt className="text-small font-semibold text-muted">{servicePage.panel.builtAround}</dt>
                <dd className="mt-1 font-semibold">{hero.panel.builtAround}</dd>
              </div>
              <div>
                <dt className="text-small font-semibold text-muted">{servicePage.panel.engagement}</dt>
                <dd className="mt-1 font-semibold">{hero.panel.engagement}</dd>
              </div>
            </dl>
          </div>
        </div>

        <SheetMotion
          className={[
            "flex items-center bg-tint pt-24 pb-16 sm:py-20",
            // Phones and tablets: edge to edge. From lg: out to the right edge only, rounded on the left.
            "mx-[calc(var(--bleed)*-1)] px-(--bleed)",
            "lg:mr-[calc(var(--bleed)*-1)] lg:ml-0 lg:rounded-bl-hero lg:pr-(--bleed) lg:pl-[clamp(32px,4vw,64px)]",
            "lg:pt-24 lg:pb-16",
          ].join(" ")}
        >
          <div className="relative w-full">
            {/* The clay icon sits on the sheet's top corner. On phones it rests on the top edge; from sm it
                overlaps the header row, which keeps that end clear. */}
            <div
              aria-hidden="true"
              className="absolute -top-[68px] right-1 z-10 w-[76px] rotate-[8deg] sm:-top-16 sm:-right-5 sm:w-[clamp(84px,9vw,132px)]"
            >
              <div data-sheet-drift>
                <div data-sheet-icon data-hero-anim>
                  <Image src={serviceArt[service.id]} alt="" sizes="140px" loading="eager" className="h-auto w-full" />
                </div>
              </div>
            </div>
            <ExampleSheet sheet={exampleSheets[service.id]} detail={detail} />
          </div>
        </SheetMotion>
      </div>
    </section>
  );
}

type Props = { detail: ServiceDetail };

/**
 * What's included: the six tasks as a ruled grid, each marked with an outline icon. They
 * are options, not steps, so they carry no numbers.
 */
function Included({ detail }: Props) {
  const { included } = detail;
  return (
    <Section id="included" aria-labelledby="included-title">
      <SectionHead
        layout="split"
        title={included.title}
        titleId="included-title"
        intro={<p>{included.intro}</p>}
      />
      <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-y-14">
        {included.items.map((item) => {
          const Icon = includedIcon[item.title];
          return (
            <li key={item.title} className="border-t border-line pt-6">
              {Icon && <Icon aria-hidden="true" strokeWidth={1.75} className="mb-4 size-7 text-blue" />}
              <h3 className="text-h5 font-bold">{item.title}</h3>
              <p className="mt-3 text-muted">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/** The handover as one joined panel: what Garified prepares on tint, beside what your team decides on deep. */
function Handover({ detail }: Props) {
  const { handover } = detail;
  const copy = servicePage.handover;
  return (
    <Section aria-labelledby="handover-title">
      <SectionHead
        layout="split"
        title={copy.title}
        titleId="handover-title"
        intro={<p>{handover.intro}</p>}
      />

      <div className="mt-12 grid overflow-hidden rounded-hero lg:mt-16 lg:grid-cols-2">
        <div className="bg-tint p-6 sm:p-10 lg:p-12">
          <h3 className="text-h4 font-bold">{copy.preparesTitle}</h3>
          <ul className="mt-8 border-t border-navy/10">
            {handover.prepares.map((item) => (
              <li key={item} className="flex items-start gap-3.5 border-b border-navy/10 py-4 font-semibold">
                <CheckIcon className="mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="on-deep flex flex-col bg-deep p-6 text-white sm:p-10 lg:p-12">
          <h3 className="text-h4 font-bold">
            <RichText content={copy.controlTitle} />
          </h3>
          <ul className="mt-8 border-t border-white/15">
            {handover.control.map((item) => (
              <li key={item} className="border-b border-white/15 py-4 font-semibold">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto flex items-center gap-3 pt-8 font-semibold text-amber">
            <CheckIcon />
            {copy.controlEyebrow}
          </p>
        </div>
      </div>

      <p className="mt-5 text-small text-muted">{handover.note}</p>
    </Section>
  );
}
