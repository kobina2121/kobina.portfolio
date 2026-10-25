import type { Metadata } from "next";
import { Geist_Mono, Montserrat, MonteCarlo } from "next/font/google";
import { BackToTopButton } from "@/components/back-to-top-button";
import { JsonLd } from "@/components/json-ld";
import { SiteLocationProvider } from "@/components/site-location-provider";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { getSiteConfig } from "@/lib/portfolio-content";
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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();

  return {
    metadataBase: new URL(siteUrl),
    applicationName: site.name,
    title: {
      default: site.metaTitle,
      template: `%s | ${site.name}`,
    },
    description: site.metaDescription,
    keywords: [
      "Kobina",
      "full stack developer",
      "portfolio",
      "web designer",
      "React developer",
      "Next.js developer",
      "Accra Ghana",
    ],
    authors: [{ name: site.owner }],
    creator: site.owner,
    alternates: {
      canonical: "/",
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: site.metaTitle,
      description: site.metaDescription,
      url: absoluteUrl("/"),
      type: "website",
      locale: "en_US",
      siteName: site.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${site.name} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.metaTitle,
      description: site.metaDescription,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteConfig();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${geistMono.variable} ${monteCarlo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteLocationProvider location={site.location}>
          <ThemeProvider>
            <TooltipProvider>
              <a
                href="#main-content"
                className="focus-visible:bg-background focus-visible:text-foreground border-border fixed top-3 left-3 z-[100] -translate-y-16 rounded-full border px-4 py-2 text-sm font-semibold shadow-lg transition focus-visible:translate-y-0"
              >
                Skip to content
              </a>
              <JsonLd id="website-json-ld" data={getWebsiteJsonLd(site)} />
              {children}
              <SiteFooter />
              <BackToTopButton />
              <Toaster richColors closeButton position="top-center" />
            </TooltipProvider>
          </ThemeProvider>
        </SiteLocationProvider>
      </body>
    </html>
  );
}
