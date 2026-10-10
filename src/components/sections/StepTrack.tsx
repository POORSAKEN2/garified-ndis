import { TrackMotion } from "@/components/motion/TrackMotion";
import { cn } from "@/lib/cn";

type Step = { number: string; title: string; text: string };

/**
 * Three steps that are a real sequence, so they are numbered and joined by a track.
 * Used by the home approach and the service page process, on white or deep grounds.
 */
export function StepTrack({ steps, className }: { steps: readonly Step[]; className?: string }) {
  return (
    <TrackMotion>
      <ol data-approach-steps className={cn("relative grid gap-10 pl-12 lg:grid-cols-3 lg:gap-12 lg:pl-0", className)}>
        {/* Track: vertical on phones, horizontal from lg. */}
        <li
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-line in-[.on-deep]:bg-white/15 lg:top-[11px] lg:right-3 lg:bottom-auto lg:left-3 lg:h-0.5 lg:w-auto"
        >
          <span data-approach-fill className="absolute inset-0 origin-top bg-amber lg:origin-left" />
        </li>
        {steps.map((step) => (
          <li key={step.number} data-approach-step className="relative min-w-0 lg:pt-14">
            <span
              aria-hidden="true"
              data-approach-dot
              className="absolute top-0 -left-12 grid size-6 place-items-center rounded-full border-2 border-amber bg-white in-[.on-deep]:bg-deep lg:left-0"
            >
              <span className="size-2 rounded-full bg-amber" />
            </span>
            <p className="text-small font-medium text-muted tabular-nums in-[.on-deep]:text-on-deep">{step.number}</p>
            <h3 className="mt-1.5 text-h4 font-bold">{step.title}</h3>
            <p className="mt-3 max-w-[36ch] in-[.on-deep]:text-on-deep">{step.text}</p>
          </li>
        ))}
      </ol>
    </TrackMotion>
  );
}
