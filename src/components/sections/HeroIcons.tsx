import Image, { type StaticImageData } from "next/image";
import { FloatMotion } from "@/components/motion/FloatMotion";
import roster from "@/assets/Roster.png";
import calculator from "@/assets/Calculator.png";
import file from "@/assets/File.png";
import marketing from "@/assets/Marketing.png";

type Icon = {
  src: StaticImageData;
  side: -1 | 1;
  /** Centre of the icon, as a % of the hero's height. */
  y: string;
  tilt: string;
};

// Mirrored pairs: the top icons lean out, the bottom ones lean in, so the four frame the
// copy instead of scattering around it. Tilts stay small enough that the floating rock
// (±3deg) reads as a sway, not a spin.
const icons: Icon[] = [
  { src: roster, side: -1, y: "24%", tilt: "-18deg" },
  { src: calculator, side: 1, y: "26%", tilt: "18deg" },
  { src: file, side: -1, y: "66%", tilt: "14deg" },
  { src: marketing, side: 1, y: "64%", tilt: "-14deg" },
];

// Distance from the middle of the hero to each icon's centre. Mixes vw and px so the
// icons clear the headline at 1280px and sit near the Figma frame's spots at 1920px.
const offset = "(13vw + 330px)";

/**
 * The four service icons floating around the hero copy, all one size. Purely decorative,
 * so they are hidden from assistive tech, and only shown from `xl`, where there is room
 * beside the headline. They start hidden via `data-hero-anim` until FloatMotion takes over.
 */
export function HeroIcons() {
  return (
    <FloatMotion className="pointer-events-none absolute inset-0 hidden xl:block">
      {icons.map(({ src, side, y, tilt }) => (
        <div
          key={src.src}
          className="absolute w-[clamp(80px,6.4vw,124px)]"
          style={{
            left: `calc(50% + ${side} * ${offset})`,
            top: y,
            translate: "-50% -50%",
            rotate: tilt,
          }}
        >
          <div data-float>
            <div data-float-pop data-hero-anim>
              <Image src={src} alt="" aria-hidden="true" sizes="140px" className="h-auto w-full" />
            </div>
          </div>
        </div>
      ))}
    </FloatMotion>
  );
}
