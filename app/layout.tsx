import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Roman de science-politique-fiction paru sous le signe d'Alpha du Centaure — voyage interstellaire, politique et aventure.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full min-h-svh flex flex-col bg-[#030510] text-zinc-100">
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sky-200 focus:px-4 focus:py-2 focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Aller au contenu principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
