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
  title: "AmalGus | India's Most Intelligent Glass Marketplace",
  description: "India's most intelligent marketplace for glass and allied products. Find the best glass types, compare real-time vendor rates, and get instant technical matches powered by AI.",
  keywords: ["glass marketplace", "toughened glass", "DGU glass", "architectural glass", "AmalGus", "India glass rates"],
  authors: [{ name: "AmalGus Team" }],
  openGraph: {
    title: "AmalGus | Intelligent Glass Marketplace",
    description: "The intelligent marketplace connecting designers, architects, and builders with verified glass manufacturers.",
    type: "website",
    locale: "en_IN",
    siteName: "AmalGus",
  },
  twitter: {
    card: "summary_large_image",
    title: "AmalGus | Intelligent Glass Marketplace",
    description: "India's intelligent B2B2C glass marketplace.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ height: '100%', WebkitFontSmoothing: 'antialiased' }}
    >
      <body style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0C0C0C',
        color: '#F0EDE8',
        selectionBackground: '#F5A623',
        selectionColor: '#0C0C0C'
      }}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
