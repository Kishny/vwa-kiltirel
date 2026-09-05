// lib/seo.ts
// =========================================================
// Constantes et helpers SEO partagés par tout le site.
// Objectif : une seule source de vérité pour l'URL de base,
// l'identité de l'association et les URLs absolues exigées
// par Schema.org / Open Graph.
// =========================================================

export const SITE_URL = "https://vwakiltirel-asso.org";
export const SITE_NAME = "Vwa Kiltirèl";

export const CONTACT_EMAIL = "vwakiltirel.asso@gmail.com";
export const CONTACT_PHONE = "+33743550051";

/** Logo carré haute définition (Schema.org refuse les chemins relatifs). */
export const ORG_LOGO = `${SITE_URL}/images/Logo.png`;
export const OG_IMAGE = `${SITE_URL}/images/og-cover.png`;

export const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "55 Rue Daniel Mayer",
  addressLocality: "Tours",
  postalCode: "37100",
  addressRegion: "Centre-Val de Loire",
  addressCountry: "FR",
} as const;

/** Profils officiels : aide Google à consolider l'entité "Vwa Kiltirèl". */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/vwakiltirel.asso/",
  "https://www.facebook.com/profile.php?id=61589580235561",
  "https://www.helloasso.com/associations/vwa-kiltirel",
];

/**
 * Transforme un chemin interne ("/images/x.png") en URL absolue.
 * Laisse intactes les URLs déjà absolues.
 */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** URL canonique d'une page ("/evenements" -> "https://.../evenements"). */
export function canonicalUrl(path = "/"): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Fiche d'identité de l'association, réutilisée dans les schémas
 * Organization / Event.organizer / Article.publisher.
 * Type NGO : plus précis qu'Organization pour une asso loi 1901.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Vwa Kiltirel",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: ORG_LOGO,
  },
  image: OG_IMAGE,
  description:
    "Association culturelle loi 1901 basée à Tours, dédiée à la transmission et à la valorisation des cultures afro-descendantes, créoles et caribéennes à travers des événements, des ateliers et des actions culturelles.",
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  address: ORG_ADDRESS,
  areaServed: {
    "@type": "City",
    name: "Tours",
  },
  foundingLocation: {
    "@type": "Place",
    name: "Tours, France",
  },
  knowsLanguage: ["fr-FR"],
  sameAs: SOCIAL_PROFILES,
} as const;

/** Référence courte vers l'organisation, pour éviter de la redéclarer. */
export const organizationRef = {
  "@type": "NGO",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
} as const;

/** Schéma du site lui-même (permet le sitelinks searchbox / knowledge panel). */
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE_URL}/#organization` },
} as const;
