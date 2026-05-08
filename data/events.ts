// data/events.ts

export type Event = {
  slug: string;
  title: string;
  category?: string;
  tag?: string;
  date: string;
  time: string;
  location: string;
  price: string;
  shortDescription?: string;
  description: string;
  image: string;

  // Infos optionnelles
  paymentUrl?: string;
  paymentNote?: string;
  reservationNote?: string;
  ticketNote?: string;

  // Champs premium
  startDate?: string; // ISO recommandé
  endDate?: string;   // ISO recommandé
  maxPlaces?: number;
  highlights?: string[];
  audiencePoints?: string[];

  // Programmation prévisionnelle
  isPreview?: boolean;
};



// ==================== PARSE DATE FR ====================
export function parseFrenchDateTime(
  dateStr: string,
  timeStr?: string
): Date | null {
  const months: Record<string, number> = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const parts = dateStr.trim().toLowerCase().split(/\s+/);

  if (parts.length < 4) return null;

  const day = Number(parts[1]);
  const month = months[parts[2] ?? ""];
  const year = Number(parts[3]);

  if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) {
    return null;
  }

  let hours = 12;
  let minutes = 0;

  if (timeStr) {
    const startTime = timeStr.split("–")[0]?.trim();

    const match = startTime?.match(/(\d{1,2})\s*h?\s*(\d{0,2})/i);

    if (match) {
      hours = Number(match[1]);
      minutes = match[2] ? Number(match[2]) : 0;
    }
  }

  return new Date(year, month, day, hours, minutes);
}



// ==================== GET DATE UNIQUE ====================
export function getEventDate(event: Event): Date | null {
  if (event.startDate) {
    const parsed = new Date(event.startDate);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return parseFrenchDateTime(event.date, event.time);
}



// ==================== STATUS ====================
export function isEventPast(event: Event): boolean {
  const date = getEventDate(event);
  if (!date) return false;

  return date.getTime() < Date.now();
}



// ==================== DATA ====================
// Programmation prévisionnelle 2027
// Les dates, lieux et modalités seront confirmés progressivement.
export const events: Event[] = [

  // ── JANVIER 2027 : Vie associative ──────────────────────────────────────
  {
    slug: "preparation-2027",
    title: "Préparation administrative & réunions du bureau",
    category: "Vie associative",
    tag: "Bureau & bénévoles",
    date: "Prévu en janvier 2027",
    time: "À confirmer",
    location: "Maison des Associations, Tours",
    price: "Réservé aux membres",
    shortDescription:
      "Préparation de la saison culturelle 2027 avec les membres du bureau : planification, organisation et lancement des projets de l'année.",
    description:
      "Temps de travail interne pour préparer la saison culturelle 2027 : planification des événements, coordination des bénévoles et lancement des dossiers administratifs.",
    image: "/images/evenements/brunch-mamans.webp",
    startDate: "2027-01-18T14:00:00",
    isPreview: true,
    highlights: [
      "Planification de la saison 2027",
      "Coordination des bénévoles",
      "Ouverture des dossiers de subvention",
    ],
  },

  // ── FÉVRIER 2027 : Racines & Vibrations ─────────────────────────────────
  {
    slug: "racines-vibrations",
    title: "Racines & Vibrations",
    category: "Soirée culturelle",
    tag: "Grand public",
    date: "Prévu en février 2027",
    time: "À confirmer",
    location: "Salle municipale / Maison des Associations, Tours",
    price: "À confirmer",
    shortDescription:
      "Un temps fort pour mettre en lumière les cultures afro-créoles à travers la musique, la rencontre et le partage.",
    description:
      "Soirée culturelle d'ouverture de saison autour des cultures afro-créoles : musique live, échanges, témoignages et moments de partage pour tous les publics.",
    image: "/images/evenements/soiree-dansante-live.webp",
    startDate: "2027-02-14T19:00:00",
    isPreview: true,
    highlights: [
      "Musique afro-créole live",
      "Rencontres et échanges entre participants",
      "Découverte des cultures afro-caribéennes",
    ],
    audiencePoints: ["Grand public", "Tous âges"],
  },

  // ── MARS / AVRIL 2027 : Lang & Tambour ──────────────────────────────────
  {
    slug: "lang-tambour",
    title: "Lang & Tambour",
    category: "Atelier",
    tag: "Jeunesse 12–25 ans",
    date: "Prévu en mars / avril 2027",
    time: "À confirmer",
    location: "MJC / Écoles partenaires, Tours",
    price: "À confirmer",
    shortDescription:
      "Des ateliers culturels pour sensibiliser les 12–25 ans à la langue, aux rythmes, aux récits et à l'expression créole.",
    description:
      "Série d'ateliers à destination des jeunes : initiation à la langue créole, percussions et rythmes afro-caribéens, récits oraux et expression artistique. Un projet pensé pour transmettre et faire vivre les cultures guyanaises et créoles.",
    image: "/images/evenements/atelier-contes.webp",
    startDate: "2027-03-22T10:00:00",
    isPreview: true,
    highlights: [
      "Ateliers de langue créole",
      "Percussions et rythmes afro-caribéens",
      "Expression artistique et récits oraux",
    ],
    audiencePoints: ["Jeunes 12–25 ans", "Scolaires et jeunesse"],
  },

  // ── MAI 2027 : Rencontre inter-associative ───────────────────────────────
  {
    slug: "rencontre-interasso-formation",
    title: "Rencontre inter-associative & formation bénévoles",
    category: "Vie associative",
    tag: "Membres & partenaires",
    date: "Prévu en mai 2027",
    time: "À confirmer",
    location: "Maison des Associations, Tours",
    price: "Gratuit",
    shortDescription:
      "Renforcer les compétences internes et créer du lien avec d'autres structures associatives de Tours.",
    description:
      "Temps fort destiné aux membres, bénévoles et partenaires de Vwa Kiltirèl : formation, échanges de pratiques avec d'autres associations et renforcement du réseau local.",
    image: "/images/evenements/brunch-mamans.webp",
    startDate: "2027-05-17T14:00:00",
    isPreview: true,
    highlights: [
      "Formation bénévoles",
      "Échanges avec des associations partenaires",
      "Renforcement du réseau local",
    ],
    audiencePoints: ["Membres", "Bénévoles", "Partenaires"],
  },

  // ── JUIN 2027 : Saveurs & Savoirs ────────────────────────────────────────
  {
    slug: "saveurs-savoirs",
    title: "Saveurs & Savoirs",
    category: "Journée culturelle",
    tag: "Familles & grand public",
    date: "Prévu en juin 2027",
    time: "À confirmer",
    location: "Parc ou salle municipale, Tours",
    price: "À confirmer",
    shortDescription:
      "Une journée autour de la cuisine, des traditions orales, des savoir-faire familiaux et de la transmission culturelle.",
    description:
      "Journée festive et culturelle autour de la gastronomie afro-créole et caribéenne : démonstrations culinaires, transmission de savoir-faire familiaux, traditions orales et moments de partage intergénérationnels.",
    image: "/images/evenements/pique-nique-culturel.webp",
    startDate: "2027-06-20T11:00:00",
    isPreview: true,
    highlights: [
      "Démonstrations et ateliers culinaires",
      "Transmission de traditions orales",
      "Moments intergénérationnels",
    ],
    audiencePoints: ["Familles", "Grand public", "Tous âges"],
  },

  // ── JUILLET 2027 : Kréyol Night #1 ──────────────────────────────────────
  {
    slug: "kreol-night-1",
    title: "Kréyol Night #1",
    category: "Soirée dansante",
    tag: "Grand public",
    date: "Prévu en juillet 2027",
    time: "À confirmer",
    location: "Plein air ou salle, Tours",
    price: "À confirmer",
    shortDescription:
      "Un moment convivial, populaire et festif autour des musiques et danses afro-caribéennes.",
    description:
      "Première soirée dansante de l'été : musiques afro-caribéennes, créoles et guyanaises, ambiance festive et populaire, ouverture à tous les publics.",
    image: "/images/evenements/soiree-dansante-live.webp",
    startDate: "2027-07-12T20:00:00",
    isPreview: true,
    highlights: [
      "Musiques afro-caribéennes",
      "Soirée dansante festive",
      "Ambiance conviviale et populaire",
    ],
    audiencePoints: ["Grand public", "Adultes"],
  },

  // ── AOÛT 2027 : Kréyol Night #2 ─────────────────────────────────────────
  {
    slug: "kreol-night-2",
    title: "Kréyol Night #2",
    category: "Soirée culturelle",
    tag: "Tous publics",
    date: "Prévu en août 2027",
    time: "À confirmer",
    location: "Salle municipale ou extérieur, Tours",
    price: "À confirmer",
    shortDescription:
      "Soirée culturelle estivale pour promouvoir les musiques afro-caribéennes dans une ambiance chaleureuse.",
    description:
      "Deuxième édition de la Kréyol Night : une soirée estivale dédiée aux musiques afro-caribéennes, aux rythmes créoles et guyanais, dans une ambiance festive et inclusive.",
    image: "/images/evenements/contes-musique.webp",
    startDate: "2027-08-09T20:00:00",
    isPreview: true,
    highlights: [
      "Musiques créoles et guyanaises",
      "Artistes invités",
      "Soirée estivale en plein air",
    ],
    audiencePoints: ["Tous publics"],
  },

  // ── SEPTEMBRE 2027 : Souvenirs d'Îles ───────────────────────────────────
  {
    slug: "souvenirs-iles",
    title: "Souvenirs d'Îles",
    category: "Atelier mémoire",
    tag: "Seniors & PMR",
    date: "Prévu en septembre 2027",
    time: "À confirmer",
    location: "EHPAD ou structure seniors, Tours",
    price: "Gratuit",
    shortDescription:
      "Recueillir, transmettre et valoriser la mémoire créole avec les seniors et les personnes à mobilité réduite.",
    description:
      "Projet mémoire à destination des seniors et personnes à mobilité réduite : ateliers de récit de vie, valorisation de la mémoire créole et guyanaise, et transmission intergénérationnelle.",
    image: "/images/evenements/atelier-bijoux-wax.webp",
    startDate: "2027-09-21T14:00:00",
    isPreview: true,
    highlights: [
      "Ateliers de récit de vie",
      "Mémoire créole et guyanaise",
      "Transmission intergénérationnelle",
    ],
    audiencePoints: ["Seniors", "Personnes à mobilité réduite"],
  },

  // ── OCTOBRE 2027 : Mémoires vivantes ────────────────────────────────────
  {
    slug: "memoires-vivantes",
    title: "Mémoires vivantes",
    category: "Exposition",
    tag: "Public local",
    date: "Prévu en octobre 2027",
    time: "À confirmer",
    location: "Salle d'exposition municipale, Tours",
    price: "Entrée libre",
    shortDescription:
      "Valoriser le travail réalisé avec les seniors, bénévoles et participants à travers une exposition restitution.",
    description:
      "Exposition de restitution du projet Souvenirs d'Îles : photographies, témoignages, créations et traces du travail de mémoire réalisé avec les seniors. Un temps d'ouverture au public local.",
    image: "/images/evenements/atelier-contes.webp",
    startDate: "2027-10-18T10:00:00",
    isPreview: true,
    highlights: [
      "Exposition de restitution",
      "Témoignages et photographies",
      "Ouverture au public local",
    ],
    audiencePoints: ["Public local", "Tous âges"],
  },

  // ── NOVEMBRE 2027 : Bilan interne ────────────────────────────────────────
  {
    slug: "bilan-2027",
    title: "Bilan interne & préparation 2028",
    category: "Vie associative",
    tag: "Bureau & bénévoles",
    date: "Prévu en novembre 2027",
    time: "À confirmer",
    location: "Maison des Associations, Tours",
    price: "Réservé aux membres",
    shortDescription:
      "Bilan de l'année 2027, préparation des demandes de subvention et organisation de la saison 2028.",
    description:
      "Temps de travail interne : bilan des actions 2027, retours des participants et partenaires, préparation des dossiers de subvention et planification de la saison 2028.",
    image: "/images/evenements/brunch-mamans.webp",
    startDate: "2027-11-15T14:00:00",
    isPreview: true,
    highlights: [
      "Bilan des actions 2027",
      "Préparation des subventions 2028",
      "Planification de la prochaine saison",
    ],
  },

  // ── DÉCEMBRE 2027 : Souvenirs & Vibrations ───────────────────────────────
  {
    slug: "souvenirs-vibrations",
    title: "Souvenirs & Vibrations",
    category: "Soirée culturelle",
    tag: "Tous publics",
    date: "Prévu en décembre 2027",
    time: "À confirmer",
    location: "Maison des Associations, Tours",
    price: "À confirmer",
    shortDescription:
      "Un événement de clôture pour rassembler toutes les générations autour d'un moment culturel, festif et inclusif.",
    description:
      "Grande soirée de clôture de l'année 2027 : spectacle, musique, partage de souvenirs de la saison, rencontres intergénérationnelles et célébration de la culture afro-créole et guyanaise.",
    image: "/images/evenements/soiree-dansante-live.webp",
    startDate: "2027-12-05T18:00:00",
    isPreview: true,
    highlights: [
      "Clôture de la saison 2027",
      "Spectacle et musique live",
      "Rassemblement intergénérationnel",
    ],
    audiencePoints: ["Tous publics", "Familles", "Grand public"],
  },
];
