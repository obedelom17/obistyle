import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Obi Style — Mode Africaine",
  description: "Pagnes wax, vêtements et sacs artisanaux soigneusement sélectionnés, livrés partout dans le monde.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Obi Style — Mode Africaine",
    description: "Pagnes wax, vêtements et sacs artisanaux. Livraison mondiale.",
    url: "https://obistyle.vercel.app",
    siteName: "Obi Style",
    images: [
      {
        url: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Obi Style — Mode Africaine",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obi Style — Mode Africaine",
    description: "Pagnes wax, vêtements et sacs artisanaux. Livraison mondiale.",
    images: ["https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1200&h=630&fit=crop"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
