import Link from "next/link";
import { home } from "@/content/site";
import { exploreLabel, services } from "@/content/services";
import { ArrowIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { serviceSwatch } from "./service-swatch";

export function ServiceList() {
  const copy = home.services;
  return (
    <Section ground="tint" id={copy.id} aria-labelledby="services-title">
      <SectionHead
        layout="split"
        eyebrow={copy.eyebrow}
        title={copy.title}
        titleId="services-title"
        intro={<p>{copy.intro}</p>}
      />

      <ol className="mt-12 border-t border-line lg:mt-16">
        {services.map((service) => (
          <li
            key={service.id}
            data-service-row
            className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-line py-8 lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.15fr)_auto] lg:gap-x-10 lg:py-10"
          >
            {/* Blue rule that draws across the row on hover or keyboard focus. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-blue transition-transform duration-500 ease-out-expo group-focus-within:scale-x-100 group-hover:scale-x-100"
            />
            <span className="pt-1.5 font-semibold text-muted tabular-nums">{service.number}</span>
            <div>
              <h3 className="text-h3 font-bold">{service.title}</h3>
              <p className="mt-2 text-lead font-medium text-navy/80">{service.tagline}</p>
            </div>
            <div className="col-start-2 lg:col-start-auto">
              <p className="measure text-muted">{service.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-3 py-1.5 text-small font-semibold"
                  >
                    <span aria-hidden="true" className={cn("size-2 rounded-full", serviceSwatch[service.id].dot)} />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={service.href}
              aria-label={exploreLabel(service)}
              // The ::after stretches the link over the whole row, so the row is one big target.
              className="col-start-2 inline-flex min-h-11 items-center gap-2 self-start font-bold whitespace-nowrap text-blue after:absolute after:inset-0 lg:col-start-auto lg:pt-0.5"
            >
              {copy.linkLabel}
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
