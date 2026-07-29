import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BackgroundEffects } from "@/components/background-effects";
import { GoogleAnalytics } from "@/components/ga-script";
import { InitialLoader } from "@/components/initial-loader";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DevBank Technologies | Creator Safety Research Platform",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Independent research platform focused on YouTube creator safety, monetization analysis, copyright risk intelligence, and digital scam awareness.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevBank Technologies",
    description:
      "Protecting creators through independent research, scam investigations, and monetization intelligence.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBank Technologies",
    description: "Creator safety and monetization research platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0B0B0B] font-sans text-zinc-100">
        <GoogleAnalytics />
        <BackgroundEffects />
        <InitialLoader />
        <SiteNavbar />
        <main className="relative z-10 flex min-h-[calc(100dvh-168px)] flex-col">{children}</main>
        <SiteFooter />
        <ScrollToTop />
      </body>
    </html>
  );
}
