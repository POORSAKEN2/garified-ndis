import type { StaticImageData } from "next/image";
import type { ServiceId } from "@/content/types";
import calculator from "@/assets/Calculator.png";
import file from "@/assets/File.png";
import marketing from "@/assets/Marketing.png";
import roster from "@/assets/Roster.png";

/**
 * The clay icon for each service, the same four that float around the home hero. On a
 * service page it sits on the example sheet. Always decorative: the page title names
 * the service.
 */
export const serviceArt: Record<ServiceId, StaticImageData> = {
  rostering: roster,
  administration: file,
  marketing,
  accounting: calculator,
};
