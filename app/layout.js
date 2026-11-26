import { Inter, Bebas_Neue } from "next/font/google";
import ConditionalFooter from "@/components/ConditionalFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "APEX DRIVE | Luxury Car Rental Dubai",
    template: "%s | APEX DRIVE",
  },

  description:
    "Experience luxury car rentals in Dubai with APEX DRIVE. Explore our exclusive collection of supercars, sports cars and premium SUVs.",

  keywords: [
    "Luxury car rental Dubai",
    "Supercar rental Dubai",
    "Sports car rental",
    "Porsche rental Dubai",
    "Lamborghini rental Dubai",
    "Ferrari rental Dubai",
    "APEX DRIVE",
  ],

  authors: [{ name: "APEX DRIVE" }],

  openGraph: {
    title: "APEX DRIVE | Luxury Car Rental Dubai",
    description:
      "Exceptional cars. Unforgettable drives. Discover our exclusive fleet.",
    siteName: "APEX DRIVE",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "APEX DRIVE Luxury Car Rental",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "APEX DRIVE | Luxury Car Rental Dubai",
    description: "Discover our exclusive collection of luxury vehicles.",
    images: ["/og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} antialiased`}>
        {children}
<ConditionalFooter />
      </body>
    </html>
  );
}