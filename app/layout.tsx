import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-cottage.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Дом у Иссык-Куля - аренда коттеджа на берегу озера",
  description:
    "Уютный коттедж с видом на Иссык-Куль. 3 спальни, баня, мангал, выход к воде. Бронирование напрямую без посредников.",
  openGraph: {
    title: "Дом у Иссык-Куля",
    description: "Уютный коттедж на берегу озера. Бронирование напрямую.",
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    images: [
      {
        url: "/images/og-image.jpg", // TODO: реальное фото
        width: 1200,
        height: 630,
        alt: "Дом у Иссык-Куля",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-cream text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
