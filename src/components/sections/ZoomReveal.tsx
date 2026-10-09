import Image from "next/image";
import { home } from "@/content/site";
import { richToText } from "@/content/types";
import { ZoomMotion } from "@/components/motion/ZoomMotion";
import { cn } from "@/lib/cn";
import photo from "@/assets/woman_helping.jpg";

/**
 * Amber "approved" badge, the same tick the hero sheet uses, sized for the band. ZoomMotion
 * pops the badge in and draws the check through its path.
 */
function RibbonTick() {
  return (
    <span
      data-ribbon-tick
      aria-hidden="true"
      className="grid size-7 flex-none place-items-center rounded-full bg-amber text-navy md:size-10"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 md:size-[22px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

/**
 * Photo band between the hero and the services, opened out by ZoomMotion as the page
 * scrolls. The ribbon sits on a solid deep band across the photo's lower edge, over the
 * desk and clear of the faces: its title as a heading row, then the three kinds of
 * provider Garified works with, each ticked like an approved task in the hero sheet.
 * The stage fills the room under the header (72px, 80px from lg, plus its 1px border),
 * but never gets taller than 4:5, so on phones the crop keeps both people in view. A
 * shorter stage sticks centred in that room and follows the hero with no gap. Sticking
 * only matters when motion makes the section taller than the stage.
 */
export function ZoomReveal() {
  const { ribbon } = home;
  const title = richToText(ribbon.title);
  return (
    <ZoomMotion aria-label={title}>
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
          {/* The ribbon: a flat deep band with an amber rule along its top. The title runs on
              one line as the band's heading, then the items read as a ruled row of columns
              from md and as stacked rows on phones. Rules and dividers scale from --draw (1
              unless the motion is running). Each text sits in a clip, open sideways for the
              italic, so it can rise out of it; the clip's padding keeps descenders in. */}
          <div data-ribbon-band className="absolute inset-x-0 bottom-0 z-10 bg-deep text-white">
            <span
              data-ribbon-rule
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left bg-amber [scale:var(--draw,1)_1]"
            />
            <div className="container-site pt-3.5 pb-2 md:pt-8 md:pb-9 lg:pt-10 lg:pb-11">
              <p className="-mb-[0.1em] overflow-x-visible overflow-y-clip pb-[0.1em]">
                <span
                  data-ribbon-title
                  className="block font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.15] italic"
                >
                  {title}
                </span>
              </p>
              <div className="relative mt-1.5 md:mt-7">
                <span
                  data-ribbon-head
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 hidden h-px origin-left bg-white/20 [scale:var(--draw,1)_1] md:block"
                />
                <ul className="grid md:grid-cols-3">
                  {ribbon.items.map((item, i) => (
                    <li
                      key={item}
                      data-ribbon-item
                      className="relative flex items-center gap-3.5 py-2 md:flex-col md:items-start md:gap-5 md:px-8 md:pt-8 md:pb-0 md:first:pl-0 md:last:pr-0"
                    >
                      <span
                        data-ribbon-divider
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 top-0 h-px origin-left bg-white/20 [scale:var(--draw,1)_1] md:inset-x-auto md:inset-y-0 md:left-0 md:h-auto md:w-px md:origin-top md:[scale:1_var(--draw,1)]",
                          i === 0 && "md:hidden",
                        )}
                      />
                      <RibbonTick />
                      <span className="-mb-[0.1em] block overflow-x-visible overflow-y-clip pb-[0.1em]">
                        <span
                          data-ribbon-text
                          className="block text-[clamp(1.125rem,0.85rem+1.3vw,2rem)] leading-[1.18] font-semibold tracking-[-0.018em] text-balance"
                        >
                          {item}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ZoomMotion>
  );
}
