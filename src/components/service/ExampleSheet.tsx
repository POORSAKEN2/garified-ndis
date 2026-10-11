import { FileText } from "lucide-react";
import {
  exampleLabel,
  type ExampleSheet as Sheet,
  type RegisterSheet,
  type SheetStatus,
  type ShiftState,
  type WeekSheet,
} from "@/content/examples";
import { servicePage, type ServiceDetail } from "@/content/services";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/**
 * The hero visual on each service page: a sample of the working document the service
 * produces, labelled Example. Its rows and statuses carry the SheetMotion hooks, so the
 * hero can play them in. From sm the header keeps its right end clear for the clay icon
 * that sits on the sheet's corner.
 */
export function ExampleSheet({ sheet, detail }: { sheet: Sheet; detail: ServiceDetail }) {
  const { hero, handover } = detail;
  return (
    <aside aria-labelledby="service-approach" className="rounded-panel bg-white shadow-raised">
      <div className="flex items-center gap-3 border-b border-line px-5 py-3 sm:pr-32 sm:pl-7">
        <p className="text-small font-semibold text-blue">{servicePage.panel.eyebrow}</p>
        <p className="rounded-pill bg-tint px-3 py-1 text-small font-semibold">{exampleLabel}</p>
      </div>

      <div className="px-5 pt-6 pb-6 sm:px-7">
        <h2 id="service-approach" className="max-w-[30ch] text-h5 font-bold">
          {hero.panel.title}
        </h2>
        <p className="mt-6 flex items-center gap-2 text-small font-semibold text-muted">
          <FileText aria-hidden="true" size={16} strokeWidth={2} className="flex-none" />
          {handover.prepares[sheet.output]}
        </p>
        <div className="mt-3">{sheet.kind === "week" ? <Week sheet={sheet} /> : <Register sheet={sheet} />}</div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-b-panel border-t border-line bg-tint px-5 py-4 sm:px-7">
        <p className="text-ui font-semibold">{handover.prepares[sheet.footer.output]}</p>
        <Status status={sheet.footer.status} />
      </div>
    </aside>
  );
}

/** Statuses are words, so colour is never the only signal. Exceptions are amber, approvals blue. */
function Status({ status }: { status: SheetStatus }) {
  const pill = "inline-flex items-center rounded-pill px-2.5 py-0.5 text-small font-semibold whitespace-nowrap";
  switch (status.tone) {
    case "review":
      return (
        <span data-sheet-tick data-hero-anim className={cn(pill, "bg-blue text-white")}>
          {status.label}
        </span>
      );
    case "flag":
      return (
        <span data-sheet-tick data-hero-anim className={cn(pill, "bg-amber text-navy")}>
          {status.label}
        </span>
      );
    case "done":
      return (
        <span
          data-sheet-tick
          data-hero-anim
          className="inline-flex items-center gap-1.5 text-small font-semibold whitespace-nowrap"
        >
          <CheckIcon size={18} />
          {status.label}
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1.5 text-small font-semibold whitespace-nowrap text-muted">
          <span aria-hidden="true" className="size-2.5 rounded-full ring-[1.5px] ring-muted ring-inset" />
          {status.label}
        </span>
      );
  }
}

/* ---------- Rostering: the week ---------- */

const shiftStyle: Record<ShiftState, string> = {
  confirmed: "bg-blue text-white",
  changed: "bg-navy text-white",
  pending: "bg-white text-navy ring-[1.5px] ring-blue/45 ring-inset",
  open: "border-[1.5px] border-dashed border-navy/40 bg-white text-muted",
  leave: "bg-tint text-muted ring-1 ring-navy/15 ring-inset",
};

/** Amber approval badge on the corner of a confirmed or changed shift. */
function ShiftTick() {
  return (
    <span
      data-sheet-tick
      data-hero-anim
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
 * Days as rows (day, then its two shifts) where the sheet is narrow: phones, and the
 * hero column from lg. Days as columns where there is room: sm to lg. A shift sets its
 * time and worker on one line when the tile is wide enough, and wraps when it is not.
 */
function Week({ sheet }: { sheet: WeekSheet }) {
  const stateLabel = Object.fromEntries(sheet.legend.map((l) => [l.state, l.label])) as Record<ShiftState, string>;

  return (
    <>
      <ul className="grid gap-2 sm:grid-cols-5 lg:grid-cols-1">
        {sheet.days.map((day) => (
          <li
            key={day.day}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)_minmax(0,1fr)] gap-2 sm:grid-cols-1 sm:content-start lg:grid-cols-[2.75rem_minmax(0,1fr)_minmax(0,1fr)] lg:content-normal"
          >
            <p className="self-center text-small font-semibold text-muted sm:self-auto lg:self-center">
              {day.day}
            </p>
            {day.shifts.map((shift, i) => (
              <p
                key={i}
                data-sheet-task
                data-hero-anim
                className={cn(
                  "relative flex flex-wrap content-center gap-x-1.5 rounded-[10px] px-2.5 py-2 text-small leading-snug",
                  shiftStyle[shift.state],
                )}
              >
                <span className="font-semibold whitespace-nowrap tabular-nums">{shift.time}</span>
                <span className="whitespace-nowrap">{shift.who}</span>
                <span className="sr-only">, {stateLabel[shift.state]}</span>
                {(shift.state === "confirmed" || shift.state === "changed") && <ShiftTick />}
              </p>
            ))}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-line pt-3">
        {sheet.legend.map((item) => (
          <li key={item.state} className="flex items-center gap-2 text-small font-semibold">
            <span aria-hidden="true" className={cn("size-3.5 flex-none rounded-[4px]", shiftStyle[item.state])} />
            {item.label}
          </li>
        ))}
      </ul>
    </>
  );
}

/* ---------- Administration, marketing, accounting: a register ---------- */

/** Three short bars, filled up to the row's stage. */
function StagePips({ stage, label }: { stage: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden={label ? undefined : true}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={cn("h-1.5 w-3.5 rounded-pill", n <= stage ? "bg-blue" : "bg-line")} />
      ))}
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}

function Register({ sheet }: { sheet: RegisterSheet }) {
  const { stages } = sheet;
  return (
    <>
      <ol className="border-t border-line">
        {sheet.rows.map((row) => (
          <li
            key={row.title}
            data-sheet-task
            data-hero-anim
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b border-line py-3"
          >
            <div className="min-w-0">
              <p className="text-ui font-semibold">{row.title}</p>
              <p className="text-small text-muted">{row.detail}</p>
            </div>
            <p className="flex items-center gap-2.5">
              {stages && row.stage && (
                <StagePips stage={row.stage} label={`${row.stage} of 3, ${stages[row.stage - 1]}.`} />
              )}
              <Status status={row.status} />
            </p>
          </li>
        ))}
      </ol>

      {stages && (
        <ol aria-hidden="true" className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {stages.map((stage, i) => (
            <li key={stage} className="flex items-center gap-2 text-small font-semibold text-muted">
              <StagePips stage={i + 1} />
              {stage}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
