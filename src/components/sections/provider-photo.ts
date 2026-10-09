import { Building2, HeartHandshake, House, type LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { ProviderTab } from "@/content/site";
import inHome from "@/assets/InhomeCommunity.jpg";
import sil from "@/assets/SILproviders.jpg";
import sda from "@/assets/SDAbusiness.jpg";

type ProviderPhoto = {
  /** Leave null until the real photo arrives; the card shows a tinted frame instead. */
  src: StaticImageData | null;
  alt: string;
  /** CSS object-position, to keep faces clear of the name tag in the bottom-left corner. */
  focus?: string;
  /** object-position for the tall 4:5 tablet crop, when `focus` would cut faces in half there. */
  focusTablet?: string;
  /** Marks the placeholder frame. Decorative. */
  icon: LucideIcon;
};

/**
 * One photo per kind of provider, shown at the top of its card in "Who we help".
 * To add one: put the file in src/assets/, import it here, set `src`
 * and write `alt` to describe what the photo shows.
 *
 * The photos are wide (16:9) and the card crops them to 3:2, 4:5 or 5:4, so only the
 * horizontal focus matters. `focus` keeps both faces in the phone and desktop crops;
 * the 4:5 tablet crop is too narrow for two people, so `focusTablet` picks one.
 */
export const providerPhoto: Record<ProviderTab["id"], ProviderPhoto> = {
  "in-home": {
    src: inHome,
    alt: "A manager leans over a colleague's desk to talk through her work in a bright office",
    focus: "54% 50%",
    icon: HeartHandshake,
  },
  sil: {
    src: sil,
    alt: "Two women talk across a desk, one pointing to a roster dashboard on the monitor",
    focus: "58% 50%",
    focusTablet: "75% 50%",
    icon: House,
  },
  sda: {
    src: sda,
    alt: "A woman points to a property map on screen while a colleague works through vacancy listings",
    focus: "50% 50%",
    focusTablet: "42% 50%",
    icon: Building2,
  },
};
