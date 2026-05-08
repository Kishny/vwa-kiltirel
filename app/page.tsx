import type { Metadata } from "next";
import HeroSection from "@/components/Home/HeroSection";
import NextEventsCarousel from "@/components/Home/NextEventsCarousel";
import MomentsFortsCarousel from "@/components/Home/MomentsFortsCarousel";
import ValeursSection from "@/components/Home/ValeursSection";
import NewsletterForm from "@/components/forms/NewsletterForm";

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
    canonical: "https://vwakiltirel-asso.org",
  },

  openGraph: {
    title: "Vwa Kiltirèl – Association culturelle à Tours",
    description:
      "Découvrez Vwa Kiltirèl : événements, ateliers, transmission, partage et expériences culturelles afro-caribéennes à Tours.",
    url: "https://vwakiltirel-asso.org",
    siteName: "Vwa Kiltirèl",
    images: [
      {
        url: "/images/og-cover.png",
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
    images: ["/images/og-cover.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vwa Kiltirèl",
    url: "https://vwakiltirel-asso.org",
    logo: "https://vwakiltirel-asso.org/favicon.png",
    description:
      "Association culturelle à Tours dédiée aux cultures afro-caribéennes, créoles et afro-descendantes à travers des événements, ateliers et actions culturelles.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "55 Rue Daniel Mayer",
      addressLocality: "Tours",
      postalCode: "37100",
      addressCountry: "FR",
    },
    areaServed: "Tours",
    email: "vwakiltirel.asso@gmail.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="flex flex-col gap-10 py-6">
        <HeroSection />
        <NextEventsCarousel />

        <ValeursSection />

        <MomentsFortsCarousel />

        <section className="mb-8 mt-2 px-4">
          <NewsletterForm />
        </section>
      </div>
    </>
  );
}
