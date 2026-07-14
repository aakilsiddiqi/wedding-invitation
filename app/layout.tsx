import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding Invitation | Ayesha & Zayd",
  description: "With the blessings of Allah SWT, Mr. & Mrs. Shakeel Ahmed Siddiqua and Mr. & Mrs. Fazlur Rahman cordially invite you to celebrate the wedding ceremony of Ayesha Siddiqua and Zayd Rahman.",
  keywords: "wedding, invitation, muslim wedding, nikah, walima, luxury invitation, ayesha and zayd",
  authors: [{ name: "Zayd & Ayesha" }],
  openGraph: {
    title: "Wedding Invitation | Ayesha & Zayd",
    description: "Celebrate with us the wedding ceremony of Ayesha Siddiqua and Zayd Rahman. Click to view the interactive invitation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation | Ayesha & Zayd",
    description: "Celebrate with us the wedding ceremony of Ayesha Siddiqua and Zayd Rahman.",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${notoNastaliq.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-luxury-bg text-navy selection:bg-gold-light selection:text-navy-light">
        {children}
      </body>
    </html>
  );
}
