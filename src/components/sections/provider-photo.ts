import { Building2, HeartHandshake, House, type LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { ProviderTab } from "@/content/site";

type ProviderPhoto = {
  /** Leave null until the real photo arrives; the card shows a tinted frame instead. */
  src: StaticImageData | null;
  alt: string;
  /** CSS object-position, to keep faces clear of the name tag in the bottom-left corner. */
  focus?: string;
  /** Marks the placeholder frame. Decorative. */
  icon: LucideIcon;
};

/**
 * One photo per kind of provider, shown at the top of its card in "Who we help".
 * To add one: put the file in src/assets/providers/, import it here, set `src`
 * and write `alt` to describe what the photo shows.
 */
export const providerPhoto: Record<ProviderTab["id"], ProviderPhoto> = {
  "in-home": { src: null, alt: "", icon: HeartHandshake },
  sil: { src: null, alt: "", icon: House },
  sda: { src: null, alt: "", icon: Building2 },
};
