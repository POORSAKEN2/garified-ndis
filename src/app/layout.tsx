import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garified | Business support for NDIS providers",
  description:
    "Rostering, administration, marketing and accounting support, thoughtfully organised around your Australian NDIS provider business.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
