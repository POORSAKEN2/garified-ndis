import Link from "next/link";
import { home } from "@/content/site";
import { exploreLabel, services } from "@/content/services";
import { ArrowIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { serviceIcon } from "./service-icon";
import { serviceSwatch } from "./service-swatch";

export function ServiceList() {
  const copy = home.services;
  return (
    <Section id={copy.id} aria-labelledby="services-title">
      <SectionHead
        layout="split"
        title={copy.title}
        titleId="services-title"
        intro={<p>{copy.intro}</p>}
      />

      <ol className="mt-12 border-t border-line lg:mt-16">
        {services.map((service) => {
          const Icon = serviceIcon[service.id];
          return (
            <li
              key={service.id}
              data-service-row
              // One column on phones; from `lg` the title, summary and link sit on a shared baseline.
              className="group relative grid border-b border-line py-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)_auto] lg:items-baseline lg:gap-x-10 lg:py-9"
            >
              {/* Blue rule that draws across the row on hover or keyboard focus. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-blue transition-transform duration-500 ease-out-expo group-focus-within:scale-x-100 group-hover:scale-x-100"
              />
              <div>
                <h3 className="text-h4 font-bold">
                  {/* Inline rather than flex, so the heading keeps a text baseline for the row to align on. */}
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mr-2.5 inline-block size-[1em] align-[-0.14em] text-blue transition-transform duration-300 ease-out-expo motion-safe:group-hover:-rotate-6"
                  />
                  {service.title}
                </h3>
                <p className="mt-1.5 text-lead font-medium text-navy/80">{service.tagline}</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <p className="measure text-muted">{service.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-3 py-1.5 text-small font-semibold"
                    >
                      <span aria-hidden="true" className={cn("size-1.5 rounded-full", serviceSwatch[service.id].dot)} />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={service.href}
                aria-label={exploreLabel(service)}
                // The ::after stretches the link over the whole row, so the row is one big target.
                className="mt-3 inline-flex min-h-11 items-center gap-2 justify-self-start font-bold whitespace-nowrap text-blue after:absolute after:inset-0 lg:mt-0"
              >
                {copy.linkLabel}
                <ArrowIcon />
              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
