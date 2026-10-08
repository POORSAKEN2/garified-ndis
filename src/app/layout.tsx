import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { home } from "@/content/site";
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
  title: home.meta.title,
  description: home.meta.description,
};

// Runs before first paint so hero motion can start from hidden without a flash.
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${jakarta.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <EnquiryProvider>{children}</EnquiryProvider>
      </body>
    </html>
  );
}
