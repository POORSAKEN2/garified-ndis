import type { Metadata } from "next";
import { getService, serviceHeading, servicePage } from "@/content/services";
import type { ServiceId } from "@/content/types";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { SiteShell } from "@/components/layout/SiteShell";
import { serviceSwatch } from "@/components/sections/service-swatch";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CheckIcon } from "@/components/ui/Icons";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";

export function serviceMetadata(id: ServiceId): Metadata {
  const service = getService(id);
  return { title: service.page.metaTitle, description: service.page.intro };
}

/** Shared template for the four service pages (spec 4.3). */
export function ServicePage({ id }: { id: ServiceId }) {
  const service = getService(id);
  const { page } = service;
  const preselect = [id] as const;

  return (
    <SiteShell variant="service" preselect={preselect}>
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
                    className={cn("rounded-[10px] px-3 py-2 text-small font-semibold", serviceSwatch[id].chip)}
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
    </SiteShell>
  );
}
