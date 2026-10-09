import Image from "next/image";
import { home } from "@/content/site";
import { richToText } from "@/content/types";
import { ZoomMotion } from "@/components/motion/ZoomMotion";
import { CheckIcon } from "@/components/ui/Icons";
import { RichText } from "@/components/ui/RichText";
import photo from "@/assets/woman_helping.jpg";

/**
 * Photo band between the hero and the services, opened out by ZoomMotion as the page
 * scrolls. The ribbon title sits in its top-left corner and the three kinds of provider
 * Garified works with run along its bottom edge, clear of the faces.
 * The stage fills the room under the header (72px, 80px from lg, plus its 1px border),
 * but never gets taller than 4:5, so on phones the crop keeps both people in view. A
 * shorter stage sticks centred in that room and follows the hero with no gap. Sticking
 * only matters when motion makes the section taller than the stage.
 */
export function ZoomReveal() {
  const { ribbon } = home;
  return (
    <ZoomMotion aria-label={richToText(ribbon.title)}>
      <div className="sticky top-[calc(var(--head)_+_(var(--room)_-_var(--stage))_/_2)] h-(--stage) [--head:73px] [--room:calc(100svh_-_var(--head))] [--stage:min(var(--room),125vw)] lg:[--head:81px]">
        <div data-zoom-frame className="relative size-full overflow-hidden bg-tint">
          <div data-zoom-photo className="absolute inset-0 z-0 origin-[55%_40%]">
            {/* In portrait the frame crops a photo about 2.2 times the screen's width. */}
            <Image
              src={photo}
              alt={home.hero.imageAlt}
              fill
              sizes="(orientation: portrait) 225vw, 100vw"
              placeholder="blur"
              className="object-cover object-[55%_40%]"
            />
          </div>
          {/* Each block of copy carries its own black gradient, so the shade grows with the
              text it sits on: darkest at the photo's edge, fading out over the padding on the
              inner side. Black is deliberately off-palette. */}
          <div
            data-zoom-copy
            className="absolute inset-x-0 top-0 z-10 bg-linear-to-b from-[rgb(0_0_0/0.55)] via-[rgb(0_0_0/0.25)] via-50% to-transparent pb-12 text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.3)] md:pb-28"
          >
            <p
              data-zoom-line
              className="container-site pt-5 font-serif text-[clamp(1.75rem,1.4rem+1.5vw,2.375rem)] leading-[1.02] italic md:pt-9"
            >
              <RichText content={ribbon.title} />
            </p>
          </div>
          {/* The items read as a ticked, ruled row: a hairline across the top, columns split
              by hairlines from md, stacked rows on phones. */}
          <div
            data-zoom-copy
            className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-[rgb(0_0_0/0.6)] via-[rgb(0_0_0/0.3)] via-55% to-transparent pt-16 text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.3)] md:pt-28"
          >
            <ul className="container-site grid border-t border-white/35 pb-2 md:grid-cols-3 md:pb-4">
              {ribbon.items.map((item) => (
                <li
                  key={item}
                  data-zoom-line
                  className="flex items-start gap-3 border-b border-white/20 py-2.5 text-small font-semibold last:border-b-0 md:border-b-0 md:border-l md:px-6 md:py-5 md:first:border-l-0 md:first:pl-0 md:last:pr-0 lg:text-body"
                >
                  <CheckIcon size={20} className="mt-px lg:mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ZoomMotion>
  );
}
