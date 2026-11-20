import type { Metadata } from "next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import { PurchasesProvider } from "@/components/PurchasesProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const ui = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "04OUR — Four of a kind · official site",
  description:
    "04OUR, Durban. Every release with a 30-second cassette-deck preview, official videos, the full discography, merch and patron support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${ui.variable} ${mono.variable} font-ui antialiased`}
      >
        <PurchasesProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </PurchasesProvider>
      </body>
    </html>
  );
}
