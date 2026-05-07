import type { Metadata } from "next";
import AssociationPageClient from "@/components/association/AssociationPageClient";

// ============================================
// MÉTADONNÉES SEO COMPLÈTES
// ============================================
export const metadata: Metadata = {
  title: "Association Vwa Kiltirèl | Culture afro-caribéenne à Tours",
  description:
    "Vwa Kiltirèl est une association culturelle à Tours qui valorise les cultures afro-descendantes, créoles et caribéennes à travers des événements, ateliers et moments de transmission.",
  keywords: [
    "association culturelle Tours",
    "culture afro-caribéenne",
    "Vwa Kiltirèl",
    "événements culturels Tours",
    "transmission culturelle",
    "association afro-descendante",
    "créole",
    "caribéen",
    "musique Tours",
    "ateliers culturels",
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
    title: "Vwa Kiltirèl | Association culturelle à Tours",
    description:
      "Découvrez l'association Vwa Kiltirèl, sa mission, ses valeurs et ses projets pour valoriser les cultures afro-descendantes, créoles et caribéennes à Tours.",
    url: "https://vwa-kiltirel.fr/association",
    siteName: "Vwa Kiltirèl",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og/association-og.jpg",
        width: 1200,
        height: 630,
        alt: "Vwa Kiltirèl - Association culturelle à Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vwa Kiltirèl | Association culturelle à Tours",
    description:
      "Découvrez l'association Vwa Kiltirèl, sa mission, ses valeurs et ses projets pour valoriser les cultures afro-descendantes.",
    images: ["/images/og/association-og.jpg"],
    site: "@vwa_kiltirel",
    creator: "@vwa_kiltirel",
  },
  alternates: {
    canonical: "https://vwa-kiltirel.fr/association",
  },
  verification: {
    google: "votre-code-verification-google",
  },
  category: "association culturelle",
};

// ============================================
// DONNÉES STRUCTURÉES JSON-LD
// ============================================
function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vwa Kiltirèl",
    alternateName: "Vwa Kiltirèl Association",
    url: "https://vwa-kiltirel.fr",
    logo: "https://vwa-kiltirel.fr/logo.png",
    image: "https://vwa-kiltirel.fr/images/og/association-og.jpg",
    description:
      "Association culturelle basée à Tours valorisant les cultures afro-descendantes, créoles et caribéennes à travers des événements, ateliers et moments de transmission.",
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tours",
        addressRegion: "Centre-Val de Loire",
        addressCountry: "FR",
      },
    },
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tours",
        addressRegion: "Centre-Val de Loire",
        addressCountry: "FR",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tours",
      addressRegion: "Centre-Val de Loire",
      addressCountry: "FR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "contact",
      email: "contact@vwa-kiltirel.fr",
      availableLanguage: ["French"],
    },
    sameAs: [
      "https://www.facebook.com/vwakiltirel",
      "https://www.instagram.com/vwa_kiltirel",
      "https://www.linkedin.com/company/vwa-kiltirel",
    ],
    founder: [
      {
        "@type": "Person",
        name: "Maud ARON",
      },
      {
        "@type": "Person",
        name: "Jean VOLCY",
      },
    ],
  };
}

function generateWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de Vwa Kiltirèl",
    description:
      "Découvrez l'association Vwa Kiltirèl, sa mission, ses valeurs, son équipe et sa vision culturelle à Tours.",
    url: "https://vwa-kiltirel.fr/association",
    mainEntity: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      description:
        "Association culturelle à Tours valorisant les cultures afro-descendantes, créoles et caribéennes.",
    },
  };
}

function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://vwa-kiltirel.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Association",
        item: "https://vwa-kiltirel.fr/association",
      },
    ],
  };
}

export default function AssociationPage() {
  const organizationSchema = generateOrganizationSchema();
  const webpageSchema = generateWebPageSchema();
  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <>
      {/* JSON-LD Schema.org pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Client Component avec animations */}
      <AssociationPageClient />
    </>
  );
}
