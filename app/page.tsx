import type { Metadata } from "next";
import HeroSection from "@/components/Home/HeroSection";
import NextEventsCarousel from "@/components/Home/NextEventsCarousel";
import MomentsFortsCarousel from "@/components/Home/MomentsFortsCarousel";
import ValeursSection from "@/components/Home/ValeursSection";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Association culturelle à Tours – Événements afro-caribéens",
  description:
    "Vwa Kiltirèl est une association culturelle à Tours qui propose des événements, ateliers et expériences autour des cultures afro-caribéennes, créoles et afro-descendantes.",

  keywords: [
    "association culturelle Tours",
    "événements culturels Tours",
    "culture afro caribéenne",
    "culture créole Tours",
    "ateliers culturels Tours",
    "association afro descendante France",
    "soirées culturelles Tours",
    "Vwa Kiltirèl",
    "association culturelle afro-caribéenne",
    "ateliers créatifs Tours",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "Vwa Kiltirèl – Association culturelle à Tours",
    description:
      "Découvrez Vwa Kiltirèl : événements, ateliers, transmission, partage et expériences culturelles afro-caribéennes à Tours.",
    url: SITE_URL,
    siteName: "Vwa Kiltirèl",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Vwa Kiltirèl – Association culturelle à Tours",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vwa Kiltirèl – Association culturelle à Tours",
    description:
      "Événements, ateliers et expériences culturelles afro-caribéennes à Tours.",
    images: [OG_IMAGE],
  },
};

export default function Home() {
  return (
    // L'identité de l'association (NGO) et le schéma WebSite sont déclarés
    // une seule fois dans app/layout.tsx : ne pas les redéclarer ici.
    <div className="flex flex-col gap-10 py-6">
      <HeroSection />
      <NextEventsCarousel />

      <ValeursSection />

      <MomentsFortsCarousel />

      <section className="mb-8 mt-2 px-4">
        <NewsletterForm />
      </section>
    </div>
  );
}
