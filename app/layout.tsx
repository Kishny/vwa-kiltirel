// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, organizationSchema, webSiteSchema } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vwa Kiltirèl – Association culturelle à Tours",
    template: "%s | Vwa Kiltirèl",
  },
  description:
    "Vwa Kiltirèl est une association culturelle à Tours qui propose des événements, ateliers et expériences autour des cultures afro-caribéennes, créoles et afro-descendantes.",
  keywords: [
    "association culturelle Tours",
    "événements Tours",
    "culture afro caribéenne",
    "culture créole",
    "événements culturels Tours",
    "association culturelle France",
    "ateliers culturels",
    "Vwa Kiltirèl",
  ],
  authors: [{ name: "Vwa Kiltirèl" }],
  creator: "Vwa Kiltirèl",
  publisher: "Vwa Kiltirèl",
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Vwa Kiltirèl",
    title: "Vwa Kiltirèl – Association culturelle à Tours",
    description:
      "Découvrez Vwa Kiltirèl : événements, ateliers et expériences culturelles afro-caribéennes à Tours.",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Vwa Kiltirèl – Association culturelle à Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vwa Kiltirèl – Association culturelle à Tours",
    description:
      "Événements et expériences culturelles afro-caribéennes à Tours.",
    images: ["/images/og-cover.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning
        className="relative overflow-x-hidden bg-vwa-background text-vwa-dark antialiased"
      >
        {/* Identité de l'association (NGO) + site — schémas globaux,
            volontairement déclarés une seule fois pour tout le site. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />

        <div
          className="
            pointer-events-none 
            fixed inset-0 
            -z-10 
            flex items-center justify-center
            opacity-[0.25]
            sm:opacity-[0.20]
          "
        >
          <img
            src="/logo-filigrane.webp"
            alt="Filigrane Vwa Kiltirèl"
            className="
              w-[100vw]
              sm:w-[80vw]
              max-w-[900px]
              object-contain
              opacity-30 sm:opacity-25
              rotate-[-10deg]
              blur-[0.5px]
              select-none
              mix-blend-multiply
              animate-[slowRotate_120s_linear_infinite]
            "
          />
        </div>

        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-20 pt-6">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
