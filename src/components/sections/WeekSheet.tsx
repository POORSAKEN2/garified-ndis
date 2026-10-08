import { home } from "@/content/site";
import { getService, services } from "@/content/services";
import type { ServiceId } from "@/content/types";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import { serviceSwatch } from "./service-swatch";

/**
 * Where each service task sits in the week. Every label is a service tag from the
 * copy (by index), so the sheet never shows a task Garified does not offer.
 */
const schedule: readonly (readonly [ServiceId, number])[][] = [
  [["rostering", 0], ["administration", 0], ["accounting", 0]],
  [["rostering", 1], ["marketing", 0]],
  [["rostering", 2], ["administration", 1], ["marketing", 1]],
  [["administration", 2], ["accounting", 1]],
  [["marketing", 2], ["accounting", 2]],
];

/** Amber "approved" badge on the corner of each task. */
function Tick() {
  return (
    <span
      data-sheet-tick
      aria-hidden="true"
      className="absolute -top-1.5 -right-1.5 grid size-[18px] place-items-center rounded-full bg-amber text-navy ring-2 ring-white"
    >
      <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

/**
 * The hero visual: a roster-style week with the agreed tasks in place and ticked.
 * It shows the promise ("a clearer week") rather than decorating around it. The grid
 * is decorative for assistive tech; the caption carries the message.
 *
 * Phones read the week as rows (day, then its tasks); from `md` it is five columns.
 */
export function WeekSheet() {
  const { hero } = home;
  return (
    <figure
      data-week-sheet
      className="overflow-hidden rounded-hero border border-line bg-white shadow-raised"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <p className="font-bold">{hero.sideLabel}</p>
        <p className="text-right text-small font-medium text-muted tabular-nums">{hero.indexLabel}</p>
      </div>

      <div aria-hidden="true" className="grid md:grid-cols-5">
        {hero.weekDays.map((day, d) => (
          <div
            key={day}
            data-sheet-day
            className={cn(
              "grid grid-cols-[3rem_1fr] items-start gap-3 border-line px-5 py-3 md:flex md:flex-col md:gap-2 md:px-2 md:pt-3 md:pb-5",
              d > 0 && "border-t md:border-t-0 md:border-l",
            )}
          >
            <p className="pt-1.5 text-small font-semibold text-muted md:pt-0 md:pb-1 md:pl-1">{day}</p>
            <ul className="flex flex-wrap gap-2 md:flex-col md:gap-2.5">
              {schedule[d].map(([id, tag]) => (
                <li
                  key={`${id}-${tag}`}
                  data-sheet-task
                  className={cn(
                    "relative rounded-[10px] py-2 pr-3.5 pl-2.5 md:pr-3 md:pl-2 text-[0.8125rem] leading-tight font-semibold",
                    serviceSwatch[id].chip,
                  )}
                >
                  {/* Non-breaking hyphen keeps "follow-up" on one line in narrow columns. */}
                  {getService(id).tags[tag].replace("-", "‑")}
                  <Tick />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <figcaption className="grid gap-4 border-t border-line bg-tint/60 px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-end sm:px-6">
        <div>
          <p className="text-small font-semibold text-blue">{hero.captionKicker}</p>
          <p className="mt-1 font-serif text-[1.75rem] leading-[1.08] italic">
            <RichText content={hero.caption} />
          </p>
        </div>
        <ul aria-hidden="true" className="flex flex-wrap gap-x-4 gap-y-1.5 sm:max-w-[15rem] sm:justify-end">
          {services.map((s) => (
            <li key={s.id} className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-muted">
              <span className={cn("size-2.5 rounded-full", serviceSwatch[s.id].dot)} />
              {s.title}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
