import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

// ============================================
// MÉTADONNÉES SEO COMPLÈTES
// ============================================
export const metadata: Metadata = {
  title: "Contactez Vwa Kiltirèl | Association culturelle Tours",
  description:
    "Contacter l'association Vwa Kiltirèl pour une question, une proposition de partenariat, un atelier culturel ou une demande d'information à Tours.",
  keywords: [
    "contact association Tours",
    "Vwa Kiltirèl contact",
    "partenariat culturel Tours",
    "atelier afro-caribéen",
    "contacter association culturelle",
    "proposition événement Tours",
    "demande information Vwa Kiltirèl",
    "association afro-descendante contact",
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
    title: "Contactez Vwa Kiltirèl | Association culturelle à Tours",
    description:
      "Une question, une idée, un partenariat ? Contactez l'équipe de Vwa Kiltirèl pour échanger sur vos projets culturels afro-caribéens à Tours.",
    url: "https://vwakiltirel-asso.org/contact",
    siteName: "Vwa Kiltirèl",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contactez Vwa Kiltirèl - Association culturelle Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactez Vwa Kiltirèl | Association culturelle",
    description:
      "Contactez l'équipe de Vwa Kiltirèl pour vos projets culturels, partenariats ou demandes d'information.",
    images: ["/images/og/contact-og.jpg"],
    site: "@vwa_kiltirel",
    creator: "@vwa_kiltirel",
  },
  alternates: {
    canonical: "https://vwakiltirel-asso.org/contact",
  },
  verification: {
    google: "votre-code-verification-google",
  },
  category: "contact association culturelle",
};

// ============================================
// DONNÉES STRUCTURÉES JSON-LD
// ============================================
function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contactez Vwa Kiltirèl",
    description:
      "Page de contact de l'association Vwa Kiltirèl. Formulaire de contact et informations pour nous joindre.",
    url: "https://vwakiltirel-asso.org/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      url: "https://vwakiltirel-asso.org",
      email: "vwakiltirel.asso@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "55 Rue Daniel Mayer",
        addressLocality: "Tours",
        postalCode: "37100",
        addressRegion: "Centre-Val de Loire",
        addressCountry: "FR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "vwakiltirel.asso@gmail.com",
        availableLanguage: ["French"],
        responseTime: "PT48H",
      },
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
        item: "https://vwakiltirel-asso.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://vwakiltirel-asso.org/contact",
      },
    ],
  };
}

function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vwa Kiltirèl",
    description:
      "Association culturelle à Tours valorisant les cultures afro & afro-descendantes, créoles et caribéennes.",
    url: "https://vwakiltirel-asso.org",
    email: "vwakiltirel.asso@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "55 Rue Daniel Mayer",
      addressLocality: "Tours",
      postalCode: "37100",
      addressRegion: "Centre-Val de Loire",
      addressCountry: "FR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.facebook.com/vwakiltirel",
      "https://www.instagram.com/vwa_kiltirel",
    ],
  };
}

export default function ContactPage() {
  const contactPageSchema = generateContactPageSchema();
  const breadcrumbSchema = generateBreadcrumbSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ContactPageClient />
    </>
  );
}