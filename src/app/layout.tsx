import type { Metadata } from "next";
import { Geist_Mono, Montserrat, MonteCarlo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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

export const metadata: Metadata = {
  applicationName: "Kobina Portfolio",
  title: {
    default: "Kobina — Front-End Developer",
    template: "%s | Kobina Portfolio",
  },
  description:
    "A premium personal portfolio for Kobina, a Ghana-based front-end developer building polished, accessible digital experiences.",
  keywords: [
    "Kobina",
    "front-end developer",
    "portfolio",
    "web designer",
    "React developer",
    "Next.js developer",
    "Accra Ghana",
  ],
  authors: [{ name: "Kobina Boakye" }],
  creator: "Kobina Boakye",
  openGraph: {
    title: "Kobina — Front-End Developer",
    description:
      "Explore Kobina's portfolio, selected projects, skills, and contact details.",
    type: "website",
    locale: "en_US",
    siteName: "Kobina Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobina — Front-End Developer",
    description:
      "Explore Kobina's portfolio, selected projects, skills, and contact details.",
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
            {children}
            <Toaster richColors closeButton position="top-center" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
