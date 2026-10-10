import type { Metadata } from "next";
import {
  getService,
  serviceHeading,
  servicePage,
  type LegacyServicePage as LegacyPage,
  type Service,
  type ServiceDetail,
} from "@/content/services";
import type { ServiceId } from "@/content/types";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { StepTrack } from "@/components/sections/StepTrack";
import { serviceSwatch } from "@/components/sections/service-swatch";
import { Checklist } from "@/components/ui/Checklist";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CheckIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";

export function serviceMetadata(id: ServiceId): Metadata {
  const service = getService(id);
  if (service.detail) return { title: service.detail.meta.title, description: service.detail.meta.description };
  return { title: service.page.metaTitle, description: service.page.intro };
}

/** "01", "02"… for the numbered inclusions and steps. */
const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Shared template for the service pages. */
export function ServicePage({ id }: { id: ServiceId }) {
  const service = getService(id);
  const preselect = [id] as const;

  return (
    <SiteShell variant="service" preselect={preselect}>
      {service.detail ? (
        <DetailSections service={service} detail={service.detail} preselect={preselect} />
      ) : (
        <LegacySections service={service} page={service.page} preselect={preselect} />
      )}
    </SiteShell>
  );
}

type SectionsProps = { service: Service; preselect: readonly ServiceId[] };

/**
 * The full page, in the reference order: hero with the approach panel, what's included,
 * the handover, how we work together, questions and the closing call to action. Section
 * ids match the reference anchors (#included, #process, #questions, #contact).
 */
function DetailSections({ service, detail, preselect }: SectionsProps & { detail: ServiceDetail }) {
  const { hero, included, handover, process } = detail;

  return (
    <>
      <section data-cta-hide aria-labelledby="service-title" className="pt-6 pb-16 sm:pt-8 lg:pb-24">
        <div className="container-site">
          <TextLink href={servicePage.backHref} arrow="left" className="flex-row-reverse">
            {servicePage.backLink}
          </TextLink>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <Heading as="h1" id="service-title" className="mt-5" content={hero.title} />
              <p className="measure mt-7 text-lead text-muted">{hero.text}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                <EnquiryTrigger preselect={preselect} className="w-full sm:w-auto">
                  {hero.cta}
                </EnquiryTrigger>
                <TextLink href="#included">{servicePage.includedLink}</TextLink>
              </div>
            </div>

            <aside aria-labelledby="service-approach" className="on-deep rounded-panel bg-deep p-7 text-white sm:p-9">
              <p aria-hidden="true" className="text-[4rem] leading-none font-bold tracking-[-0.04em] text-white/25 tabular-nums">
                {service.number}
              </p>
              <Eyebrow className="mt-8">{servicePage.panel.eyebrow}</Eyebrow>
              <h2 id="service-approach" className="mt-3 text-h4 font-bold">
                {hero.panel.title}
              </h2>
              <dl className="mt-8 grid gap-5 border-t border-white/15 pt-6">
                <div>
                  <dt className="text-small text-on-deep">{servicePage.panel.builtAround}</dt>
                  <dd className="mt-1 font-semibold">{hero.panel.builtAround}</dd>
                </div>
                <div>
                  <dt className="text-small text-on-deep">{servicePage.panel.engagement}</dt>
                  <dd className="mt-1 font-semibold">{hero.panel.engagement}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <Section id="included" aria-labelledby="included-title">
        <SectionHead
          eyebrow={included.eyebrow}
          title={included.title}
          titleId="included-title"
          intro={<p>{included.intro}</p>}
          layout="split"
        />
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-y-14">
          {included.items.map((item, i) => (
            <li key={item.title} className="border-t border-line pt-6">
              <p className="text-small font-medium text-muted tabular-nums">{pad(i)}</p>
              <h3 className="mt-2 text-h5 font-bold">{item.title}</h3>
              <p className="mt-3 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section ground="tint" aria-labelledby="handover-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start lg:gap-20">
          <div>
            <SectionHead
              eyebrow={servicePage.handover.eyebrow}
              title={servicePage.handover.title}
              titleId="handover-title"
              intro={<p>{handover.intro}</p>}
            />
            <h3 className="mt-12 text-h5 font-bold">{servicePage.handover.preparesTitle}</h3>
            <Checklist items={handover.prepares} className="mt-5" />
          </div>

          <aside aria-labelledby="control-title" className="rounded-panel bg-white p-7 shadow-raised sm:p-10">
            <Eyebrow>{servicePage.handover.controlEyebrow}</Eyebrow>
            <Heading as="h3" id="control-title" className="mt-4" content={servicePage.handover.controlTitle} />
            <ul className="mt-7 border-t border-line">
              {handover.control.map((item) => (
                <li key={item} className="border-b border-line py-4 font-semibold">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-muted">{handover.note}</p>
          </aside>
        </div>
      </Section>

      <Section ground="deep" id="process" aria-labelledby="process-title">
        <SectionHead eyebrow={servicePage.process.eyebrow} title={process.title} titleId="process-title" />
        <StepTrack
          steps={process.steps.map((step, i) => ({ ...step, number: pad(i) }))}
          className="mt-14 lg:mt-20"
        />
      </Section>

      <Faq copy={{ ...servicePage.faq, ...detail.faq }} />

      <ContactCta copy={{ id: "contact", ...detail.contact, cta: hero.cta }} preselect={preselect} />
    </>
  );
}

/** The earlier, shorter page: intro, a five-item list and a callout. */
function LegacySections({ service, page, preselect }: SectionsProps & { page: LegacyPage }) {
  return (
    <>
      <section data-cta-hide aria-labelledby="service-title" className="pt-6 pb-16 sm:pt-8 lg:pb-24">
        <div className="container-site">
          <TextLink href={servicePage.backHref} arrow="left" className="flex-row-reverse">
            {servicePage.backLink}
          </TextLink>

          <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <Heading as="h1" id="service-title" className="mt-5" content={serviceHeading(service)} />
            </div>
            <div className="lg:pb-3">
              <p className="measure text-lead text-muted">{page.intro}</p>
              {/* The same colour-coded tags as the home week sheet, so the pages read as one system. */}
              <ul aria-hidden="true" className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className={cn("rounded-[10px] px-3 py-2 text-small font-semibold", serviceSwatch[service.id].chip)}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="service-includes" className="bg-tint py-section">
        <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Heading id="service-includes" content={service.tagline} className="self-start lg:sticky lg:top-28" />
          <ul className="border-t border-line">
            {page.items.map((item) => (
              <li key={item} className="flex items-start gap-4 border-b border-line py-5 text-lead font-semibold">
                <CheckIcon className="mt-[5px]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="service-callout" className="py-section">
        <div className="container-site">
          <div className="on-deep grid gap-8 rounded-panel bg-deep p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:p-14">
            <div>
              <Heading as="h3" id="service-callout" content={page.callout.title} />
              <p className="measure mt-5 text-on-deep">{page.callout.text}</p>
            </div>
            <EnquiryTrigger variant="white" preselect={preselect} className="w-full sm:w-auto">
              {servicePage.calloutLink}
            </EnquiryTrigger>
          </div>
        </div>
      </section>
    </>
  );
}
