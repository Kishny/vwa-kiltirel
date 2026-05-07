import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Événements | Vwa Kiltirèl",
  description:
    "Découvrez les prochains événements de Vwa Kiltirèl à Tours : ateliers créatifs, soirées culturelles, pique-niques, contes et musique afro-caribéens. Rejoignez-nous !",
  keywords: [
    "événements culturels Tours",
    "ateliers afro-caribéens",
    "soirées créoles Tours",
    "Vwa Kiltirèl événements",
    "culture afro-descendante Indre-et-Loire",
    "ateliers wax Tours",
    "contes musique caribéens",
  ],
  authors: [{ name: "Vwa Kiltirèl" }],
  creator: "Vwa Kiltirèl",
  publisher: "Vwa Kiltirèl",
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
    title: "Événements Vwa Kiltirèl | Culture afro-caribéenne à Tours",
    description:
      "Ateliers, soirées, pique-niques et rencontres culturelles à Tours. Rejoignez la communauté Vwa Kiltirèl.",
    url: "https://vwakiltirel-asso.org/evenements",
    siteName: "Vwa Kiltirèl",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Événements Vwa Kiltirèl",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Événements Vwa Kiltirèl",
    description:
      "Ateliers, soirées, pique-niques et rencontres culturelles à Tours.",
    images: ["/images/og-cover.png"],
    site: "@vwa_kiltirel",
    creator: "@vwa_kiltirel",
  },
  alternates: {
    canonical: "https://vwakiltirel-asso.org/evenements",
  },
  category: "événements association culturelle",
};

export default function EvenementsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
