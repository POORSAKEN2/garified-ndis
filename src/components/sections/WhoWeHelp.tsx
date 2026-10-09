import type { CSSProperties } from "react";
import Image from "next/image";
import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Checklist } from "@/components/ui/Checklist";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { providerPhoto } from "./provider-photo";

/**
 * The three kinds of provider, side by side so every visitor finds theirs without a
 * click. Each column is a photo with the provider's name tagged on its corner, then the
 * scope, the promise, and the ticked work. From `lg` the columns share one subgrid, so
 * promises, lists and buttons line up across the row like a roster. On tablets each
 * column turns into a row, photo beside copy; on phones they stack.
 */
export function WhoWeHelp() {
  const copy = home.providers;
  return (
    <Section id={copy.id} aria-labelledby="providers-title">
      <SectionHead eyebrow={copy.eyebrow} title={copy.title} titleId="providers-title" />

      <ul className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
        {copy.tabs.map((tab) => {
          const photo = providerPhoto[tab.id];
          const Icon = photo.icon;
          return (
            <li
              key={tab.id}
              className="grid content-start md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-x-10 lg:row-span-6 lg:grid-cols-1 lg:grid-rows-subgrid"
            >
              {/* The name sits first in the source so it is read before the photo, and
                  shares the photo's grid cell so it can sit on the photo's corner. */}
              <div className="grid aspect-[3/2] grid-cols-1 grid-rows-1 overflow-hidden rounded-panel bg-tint md:row-span-5 md:aspect-[4/5] md:self-start lg:row-span-1 lg:aspect-[5/4]">
                <h3
                  className="relative z-10 col-start-1 row-start-1 self-end justify-self-start rounded-tr-card border-t-[3px] border-amber bg-deep px-4 pt-2 pb-2.5 text-[0.9375rem] leading-snug font-bold text-white sm:text-base"
                >
                  {tab.tab}
                </h3>
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 42vw, 100vw"
                    className="col-start-1 row-start-1 size-full object-cover [object-position:var(--focus)] md:max-lg:[object-position:var(--focus-tablet)]"
                    style={
                      {
                        "--focus": photo.focus ?? "center",
                        "--focus-tablet": photo.focusTablet ?? photo.focus ?? "center",
                      } as CSSProperties
                    }
                  />
                ) : (
                  <div
                    data-photo-placeholder
                    aria-hidden="true"
                    className="col-start-1 row-start-1 grid place-items-center pb-10"
                  >
                    <Icon strokeWidth={1.1} className="size-[clamp(56px,7vw,76px)] text-blue/30" />
                  </div>
                )}
              </div>

              <p className="mt-4 font-serif text-[1.125rem] leading-[1.3] text-pretty text-navy/75 italic md:col-start-2 md:mt-0 lg:col-start-1 lg:mt-4">
                {tab.accent}
              </p>
              <p className="mt-5 text-[1.25rem] leading-[1.3] font-bold tracking-[-0.015em] text-balance md:col-start-2 md:mt-4 lg:col-start-1 lg:mt-5 lg:self-end">{tab.title}</p>
              <p className="mt-2.5 text-base leading-[1.6] text-muted md:col-start-2 lg:col-start-1">{tab.text}</p>
              <div className="mt-6 md:col-start-2 lg:col-start-1">
                <p className="sr-only">{copy.sideEyebrow}</p>
                <Checklist items={tab.items} className="gap-0 border-t border-line text-base *:border-b *:border-line *:py-3 [&>li>[aria-hidden]]:mt-0" />
              </div>
              <div className="mt-7 md:col-start-2 lg:col-start-1">
                <EnquiryTrigger preselect={tab.preselect} variant="outline" size="sm">
                  {copy.cta}
                </EnquiryTrigger>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
