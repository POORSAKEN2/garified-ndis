import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { home } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  // Link previews need absolute URLs; the card itself is app/opengraph-image.png.
  metadataBase: new URL("https://ndis.garifiedsolutions.com"),
  title: home.meta.title,
  description: home.meta.description,
  openGraph: { siteName: "Garified Solutions", locale: "en_AU", type: "website" },
  twitter: { card: "summary_large_image" },
};

// Runs before first paint so hero motion can start from hidden without a flash.
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${jakarta.variable} ${instrument.variable}`}
      // Route changes jump to the top instead of gliding there from the old position.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <EnquiryProvider>
          <SmoothScroll />
          {children}
        </EnquiryProvider>
      </body>
    </html>
  );
}
