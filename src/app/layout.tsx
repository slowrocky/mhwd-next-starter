import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import { getSiteSettings } from "@/sanity/lib/site-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.shortName}` },
    description: site.description,
    openGraph: {
      type: "website",
      locale: site.locale,
      url: site.url,
      siteName: site.name,
      title: site.name,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();

  return (
    <html lang={site.locale.slice(0, 2)} data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex min-h-screen flex-col">
          <Header site={site} />

          <div className="flex-1">{children}</div>

          <Footer site={site} />
        </div>
      </body>
    </html>
  );
}
