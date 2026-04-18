import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GlassIQ | India's Most Intelligent Glass Marketplace",
  description: "India's most intelligent marketplace for glass and allied products. Find the best glass types, compare real-time vendor rates, and get instant technical matches powered by AI.",
  keywords: ["glass marketplace", "toughened glass", "DGU glass", "architectural glass", "GlassIQ", "India glass rates"],
  authors: [{ name: "GlassIQ Team" }],
  openGraph: {
    title: "GlassIQ | Intelligent Glass Marketplace",
    description: "The intelligent marketplace connecting designers, architects, and builders with verified glass manufacturers.",
    type: "website",
    locale: "en_IN",
    siteName: "GlassIQ",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlassIQ | Intelligent Glass Marketplace",
    description: "India's intelligent B2B2C glass marketplace.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-950">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
