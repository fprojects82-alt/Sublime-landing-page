import type { Metadata } from "next";
import { Poppins, Yellowtail } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { themeInitScript } from "@/components/ThemeToggle";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const script = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

/**
 * Drives canonical URLs and Open Graph image resolution. Without it the site
 * falls back to a placeholder origin and social previews will not resolve.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sublime+ — Content & social marketing, done with a little extra",
    template: "%s | Sublime+",
  },
  description:
    "Sublime+ is a content and social marketing studio: strategy, short-form video, UGC and always-on social management handled end to end.",
  openGraph: {
    type: "website",
    siteName: "Sublime+",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint to avoid a colour flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${poppins.variable} ${script.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-brand"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
