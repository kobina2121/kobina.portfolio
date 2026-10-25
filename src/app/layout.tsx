import type { Metadata } from "next";
import { Geist_Mono, Montserrat, MonteCarlo } from "next/font/google";
import { BackToTopButton } from "@/components/back-to-top-button";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { getWebsiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const monteCarlo = MonteCarlo({
  variable: "--font-monte-carlo",
  subsets: ["latin"],
  weight: "400",
});

// Admin edits revalidate pages immediately; this catches edits made directly
// in MongoDB.
export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Kobina Portfolio",
  title: {
    default: "Kobina — Full Stack Developer",
    template: "%s | Kobina Portfolio",
  },
  description:
    "A premium personal portfolio for Kobina, a Ghana-based full stack developer building polished, accessible digital experiences.",
  keywords: [
    "Kobina",
    "full stack developer",
    "portfolio",
    "web designer",
    "React developer",
    "Next.js developer",
    "Accra Ghana",
  ],
  authors: [{ name: "Kobina Boakye" }],
  creator: "Kobina Boakye",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Kobina — Full Stack Developer",
    description:
      "Explore Kobina's portfolio, selected projects, skills, and contact details.",
    url: absoluteUrl("/"),
    type: "website",
    locale: "en_US",
    siteName: "Kobina Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kobina portfolio social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobina — Full Stack Developer",
    description:
      "Explore Kobina's portfolio, selected projects, skills, and contact details.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${geistMono.variable} ${monteCarlo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <a
              href="#main-content"
              className="focus-visible:bg-background focus-visible:text-foreground border-border fixed top-3 left-3 z-[100] -translate-y-16 rounded-full border px-4 py-2 text-sm font-semibold shadow-lg transition focus-visible:translate-y-0"
            >
              Skip to content
            </a>
            <JsonLd id="website-json-ld" data={getWebsiteJsonLd()} />
            {children}
            <SiteFooter />
            <BackToTopButton />
            <Toaster richColors closeButton position="top-center" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
