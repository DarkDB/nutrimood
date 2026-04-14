import type { Metadata } from "next";
import { Lora, Raleway, Geist_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NutriMood — MoodCalm | Suplemento para el control del estrés",
    template: "%s | NutriMood",
  },
  description:
    "MoodCalm es un suplemento en polvo con KSM-66, L-Theanine y Magnesio Glicinato para controlar el cortisol y recuperar tu calma. Envío a España.",
  keywords: ["suplemento estrés", "MoodCalm", "control cortisol", "KSM-66", "L-Theanine", "magnesio"],
  authors: [{ name: "NutriMood" }],
  creator: "NutriMood",
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "NutriMood",
    title: "NutriMood — Controla el cortisol. Recupera tu calma.",
    description:
      "MoodCalm: el suplemento en polvo science-backed para el control del estrés. Con KSM-66 Ashwagandha, L-Theanine y Magnesio Glicinato.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NutriMood MoodCalm" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriMood — Controla el cortisol. Recupera tu calma.",
    description: "MoodCalm: suplemento en polvo para el control del estrés. Science-backed, premium, accesible.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${lora.variable} ${raleway.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
