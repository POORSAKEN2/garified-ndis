import type { ServiceId } from "@/content/types";

/**
 * One colour per service, used wherever tasks are tagged by service: the hero week
 * sheet, its legend and the service list tags. The colour carries meaning, so it is
 * always paired with the service name in a legend or label.
 */
export const serviceSwatch: Record<ServiceId, { chip: string; dot: string }> = {
  rostering: { chip: "bg-blue text-white", dot: "bg-blue" },
  administration: { chip: "bg-navy text-white", dot: "bg-navy" },
  marketing: { chip: "bg-amber text-navy", dot: "bg-amber" },
  accounting: { chip: "bg-white text-navy ring-[1.5px] ring-inset ring-blue/40", dot: "bg-white ring-[1.5px] ring-inset ring-blue" },
};
