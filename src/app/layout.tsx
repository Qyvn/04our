import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { PurchasesProvider } from "@/components/PurchasesProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const ui = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ui",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "04OUR — Official store & radio",
  description:
    "Buy 04OUR music and merch on-site, support as a patron, preview on the old radio, and keep permanent access in My Crate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${ui.variable} ${mono.variable} bg-ink font-ui text-paper antialiased`}
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
