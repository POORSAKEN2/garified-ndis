import { Calculator, CalendarClock, FileText, Megaphone, type LucideIcon } from "lucide-react";
import type { ServiceId } from "@/content/types";

/**
 * One outline icon per service, shown beside the title in the service list. Always
 * decorative: the service title beside it carries the meaning.
 */
export const serviceIcon: Record<ServiceId, LucideIcon> = {
  rostering: CalendarClock,
  administration: FileText,
  marketing: Megaphone,
  accounting: Calculator,
};
