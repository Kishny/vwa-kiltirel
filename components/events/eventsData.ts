// components/events/eventsData.ts

export type EventType = "atelier" | "soiree" | "plein-air" | "mamans";

// Type étendu avec des propriétés SEO
export type AssociationEvent = {
  id: string;
  title: string;
  categoryLabel: string;
  type: EventType;
  date: string;      // version lisible
  dateISO: string;   // version technique pour trier (YYYY-MM-DD)
  time: string;
  location: string;
  description: string;
  tag: string;
  image: string;
  // Propriétés SEO supplémentaires
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    slug?: string;
  };
  // Propriétés pratiques
  price?: string;
  isFree?: boolean;
  capacity?: number;
  duration?: string;
  targetAudience?: string[];
  prerequisites?: string;
  whatToBring?: string[];
  accessibility?: {
    wheelchairAccessible?: boolean;
    signLanguage?: boolean;
    audioDescription?: boolean;
  };
  organizer?: {
    name: string;
    email?: string;
    phone?: string;
  };
  registrationDeadline?: string;
};

// Configuration SEO par type d'événement
const eventTypeConfig: Record<EventType, { icon: string; color: string; defaultKeywords: string[] }> = {
  atelier: {
    icon: "🎨",
    color: "vwa-primary",
    defaultKeywords: ["atelier créatif", "DIY", "artisanat", "wax", "création", "DIY Tours"],
  },
  soiree: {
    icon: "🎶",
    color: "vwa-accent",
    defaultKeywords: ["soirée culturelle", "contes", "musique du monde", "concert", "spectacle Tours"],
  },
  "plein-air": {
    icon: "🌳",
    color: "emerald",
    defaultKeywords: ["plein air", "pique-nique", "nature", "famille", "découverte", "parc Tours"],
  },
  mamans: {
    icon: "🌸",
    color: "rose",
    defaultKeywords: ["mamans", "parentalité", "brunch", "échange", "soutien", "cercle de parole"],
  },
};

// Génère un slug SEO-friendly
export function generateEventSlug(title: string, id: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug}-${id}`;
}

// Génère les métadonnées SEO pour un événement
export function generateEventMetadata(event: AssociationEvent) {
  const config = eventTypeConfig[event.type];
  const slug = event.seo?.slug || generateEventSlug(event.title, event.id);
  
  return {
    title: event.seo?.metaTitle || `${event.title} | Atelier culturel Vwa Kiltirèl Tours`,
    description: event.seo?.metaDescription || 
      `Participez à "${event.title}" - ${event.categoryLabel} organisé par Vwa Kiltirèl. ${event.description.substring(0, 150)} Le ${event.date} à ${event.location}.`,
    keywords: event.seo?.keywords || [
      event.title.toLowerCase(),
      event.categoryLabel.toLowerCase(),
      ...config.defaultKeywords,
      "Vwa Kiltirèl",
      "association culturelle Tours",
      "culture afro-caribéenne",
      "Tours",
      "événement culturel",
    ],
    openGraph: {
      title: event.seo?.metaTitle || `${event.title} | Vwa Kiltirèl`,
      description: event.seo?.metaDescription || event.description.substring(0, 200),
      url: `https://vwakiltirel-asso.org/evenements/${slug}`,
      siteName: "Vwa Kiltirèl",
      locale: "fr_FR",
      type: "event",
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: `${event.title} - ${event.categoryLabel}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Vwa Kiltirèl`,
      description: event.description.substring(0, 200),
      images: [event.image],
    },
    slug,
  };
}

// Génère les données structurées JSON-LD pour un événement
export function generateEventJsonLd(event: AssociationEvent) {
  const slug = event.seo?.slug || generateEventSlug(event.title, event.id);
  const [day, month, year] = event.dateISO.split("-");
  const startDate = `${year}-${month}-${day}T${event.time.split(" – ")[0] || "00:00"}:00`;
  const endTime = event.time.split(" – ")[1] || event.time.split(" – ")[0];
  const endDate = `${year}-${month}-${day}T${endTime}:00`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: startDate,
    endDate: endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.includes("Tours") ? "Tours" : "Indre-et-Loire",
        addressRegion: "Centre-Val de Loire",
        addressCountry: "FR",
      },
    },
    image: event.image,
    organizer: {
      "@type": "Organization",
      name: event.organizer?.name || "Vwa Kiltirèl",
      email: event.organizer?.email || "vwakiltirel.asso@gmail.com",
      url: "https://vwakiltirel-asso.org",
    },
    offers: {
      "@type": "Offer",
      price: event.isFree ? 0 : (event.price ? parseFloat(event.price.replace("€", "").trim()) : 0),
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      validFrom: new Date().toISOString(),
      url: `https://vwakiltirel-asso.org/evenements/${slug}/inscription`,
    },
    ...(event.capacity && { maximumAttendeeCapacity: event.capacity }),
    ...(event.targetAudience && { audience: event.targetAudience.join(", ") }),
  };
}

// Version enrichie des événements avec propriétés SEO
export const associationEvents: AssociationEvent[] = [
  {
    id: "atelier-parents-enfants",
    categoryLabel: "Atelier parents-enfants",
    type: "atelier",
    title: "Création de bijoux en tissu wax",
    date: "Dimanche 29 mars 2026",
    dateISO: "2026-03-29",
    time: "15h – 17h",
    location: "Maison de quartier, Tours",
    description:
      "Un atelier créatif pour fabriquer ensemble des bijoux colorés en tissu wax et découvrir leurs histoires.",
    tag: "Atelier créatif",
    image: "/images/events/atelier-bijoux-wax.png",
    price: "15€ par binôme parent-enfant",
    isFree: false,
    capacity: 15,
    duration: "2 heures",
    targetAudience: ["Parents", "Enfants (6-12 ans)"],
    whatToBring: ["Des chutes de tissu si vous en avez", "Votre bonne humeur"],
    accessibility: {
      wheelchairAccessible: true,
    },
    seo: {
      metaTitle: "Atelier bijoux en tissu wax | Atelier parents-enfants Tours",
      metaDescription: "Atelier créatif parents-enfants pour fabriquer des bijoux en tissu wax. Un moment de partage et de création autour des motifs africains à Tours.",
      keywords: ["atelier wax", "bijoux africains", "parents-enfants", "DIY Tours", "tissu wax"],
    },
  },
  {
    id: "soiree-contes-musique",
    categoryLabel: "Soirée contes & musique",
    type: "soiree",
    title: "Contes créoles & musiques du monde",
    date: "Samedi 18 avril 2026",
    dateISO: "2026-04-18",
    time: "19h – 22h",
    location: "Salle des fêtes, Tours Nord",
    description:
      "Une soirée chaleureuse de contes, de chants et de guitare pour voyager à travers les cultures afro-caribéennes.",
    tag: "Soirée culturelle",
    image: "/images/events/soiree-contes-musique.png",
    price: "Participation libre (chapeau)",
    isFree: true,
    capacity: 80,
    duration: "3 heures",
    targetAudience: ["Adultes", "Familles", "Tout public"],
    whatToBring: ["Un coussin pour être confortable", "De quoi noter vos coups de cœur"],
    accessibility: {
      wheelchairAccessible: true,
      signLanguage: false,
    },
    seo: {
      metaTitle: "Soirée contes créoles et musiques du monde | Vwa Kiltirèl Tours",
      metaDescription: "Voyagez à travers les cultures afro-caribéennes lors d'une soirée contes et musiques du monde. Participation libre à Tours.",
      keywords: ["contes créoles", "musique du monde", "soirée culturelle Tours", "guitare", "voyage musical"],
    },
  },
  {
    id: "pique-nique-culturel",
    categoryLabel: "Plein air & convivialité",
    type: "plein-air",
    title: "Pique-nique culturel au parc",
    date: "Dimanche 10 mai 2026",
    dateISO: "2026-05-10",
    time: "12h – 16h",
    location: "Parc de la Gloriette, Tours",
    description:
      "Un moment de partage en plein air avec repas partagé, jeux pour les enfants et découvertes culinaires.",
    tag: "Plein air",
    image: "/images/events/pique-nique-culturel.png",
    price: "Gratuit (repas partagé)",
    isFree: true,
    capacity: 50,
    duration: "4 heures",
    targetAudience: ["Familles", "Enfants", "Adultes", "Séniors"],
    whatToBring: ["Un plat à partager", "Une couverture", "Vos jeux de société préférés"],
    accessibility: {
      wheelchairAccessible: true,
    },
    seo: {
      metaTitle: "Pique-nique culturel au parc | Rencontre conviviale Tours",
      metaDescription: "Pique-nique culturel et convivial au parc de la Gloriette à Tours. Repas partagé, jeux pour enfants et découvertes culinaires.",
      keywords: ["pique-nique Tours", "repas partagé", "parc Gloriette", "convivialité", "plein air Tours"],
    },
  },
  {
    id: "brunch-entre-mamans",
    categoryLabel: "Rencontre entre mamans",
    type: "mamans",
    title: "Brunch entre mamans & futures mamans",
    date: "Samedi 23 mai 2026",
    dateISO: "2026-05-23",
    time: "10h – 13h",
    location: "Café associatif, Tours centre",
    description:
      "Un espace doux pour échanger entre mamans, partager des expériences et créer du lien autour d’un brunch gourmand.",
    tag: "Cercle de parole",
    image: "/images/events/brunch-mamans.png",
    price: "12€ (boisson chaude + brunch)",
    isFree: false,
    capacity: 20,
    duration: "3 heures",
    targetAudience: ["Mamans", "Futures mamans"],
    whatToBring: ["Votre expérience à partager", "Un carnet si vous aimez noter"],
    accessibility: {
      wheelchairAccessible: true,
      signLanguage: false,
    },
    organizer: {
      name: "Vwa Kiltirèl",
      email: "contact@vwakiltirel-asso.org",
    },
    registrationDeadline: "2026-05-20",
    seo: {
      metaTitle: "Brunch entre mamans | Cercle de parole et partage Tours",
      metaDescription: "Brunch convivial entre mamans et futures mamans à Tours. Un espace d'échange, de partage et de soutien autour d'un brunch gourmand.",
      keywords: ["brunch mamans Tours", "cercle de parole", "parentalité", "soutien mamans", "rencontre entre mamans"],
    },
  },
];

// Fonctions utilitaires pour filtrer et trier les événements
export function getUpcomingEvents(): AssociationEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return associationEvents
    .filter(event => event.dateISO >= today)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

export function getPastEvents(): AssociationEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return associationEvents
    .filter(event => event.dateISO < today)
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

export function getEventsByType(type: EventType): AssociationEvent[] {
  return associationEvents.filter(event => event.type === type);
}

export function getEventById(id: string): AssociationEvent | undefined {
  return associationEvents.find(event => event.id === id);
}

export function getEventBySlug(slug: string): AssociationEvent | undefined {
  return associationEvents.find(event => {
    const eventSlug = event.seo?.slug || generateEventSlug(event.title, event.id);
    return eventSlug === slug;
  });
}

export { eventTypeConfig };
