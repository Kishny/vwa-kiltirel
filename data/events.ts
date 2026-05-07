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
export const events: Event[] = [
  {
    slug: "brunch-mamans-reconnexion",
    title: "Brunch mamans & reconnexion",
    category: "Rencontre / Bien-être",
    tag: "Parents & futurs parents",
    date: "Dimanche 29 mars 2026",
    time: "11h – 14h",
    location: "Centre-ville de Tours",
    price: "Participation 10 à 15 € / maman",
    shortDescription:
      "Un moment de douceur entre mamans pour souffler, partager et se ressourcer.",
    description:
      "Un brunch chaleureux entre mamans pour parler maternité, charge mentale, parentalité et temps pour soi.",
    image: "/images/evenements/brunch-mamans.png",

    paymentUrl:
      "https://www.helloasso.com/associations/vwa-kiltril/evenements/brunch-mamans-reconnexion",

    startDate: "2026-03-29T11:00:00",
    maxPlaces: 25,

    highlights: [
      "Un temps de respiration et de reconnexion entre mamans",
      "Des échanges guidés autour du bien-être",
    ],
  },

  {
    slug: "soiree-contes-musique",
    title: "Soirée contes & musique",
    category: "Culture & oralité",
    tag: "Soirée familiale",
    date: "Samedi 18 avril 2026",
    time: "19h – 22h",
    location: "Maison de quartier, Tours Nord",
    price: "Entrée libre",
    shortDescription: "Une soirée où la parole et la musique se rencontrent.",
    description:
      "Une veillée moderne inspirée des soirées contes d’antan.",
    image: "/images/evenements/contes-musique.png",

    startDate: "2026-04-18T19:00:00",
    maxPlaces: 80,
  },

  {
    slug: "pique-nique-culturel",
    title: "Pique-nique culturel",
    category: "Plein air & partage",
    tag: "Tout public",
    date: "Samedi 10 mai 2025",
    time: "12h – 17h",
    location: "Parc de la Gloriette, Tours",
    price: "Gratuit",
    shortDescription: "Un moment convivial en plein air.",
    description: "Pique-nique participatif avec animations.",
    image: "/images/evenements/pique-nique-culturel.png",

    startDate: "2025-05-10T12:00:00",
  },

  {
    slug: "creation-bijoux-tissu-wax",
    title: "Création de bijoux en tissu wax",
    category: "Atelier",
    tag: "Parents-enfants",
    date: "Dimanche 29 mars 2026",
    time: "15h – 17h",
    location: "Maison de quartier, Tours",
    price: "10€",
    shortDescription: "Atelier créatif autour du wax.",
    description: "Création et transmission autour du tissu wax.",
    image: "/images/evenements/atelier-bijoux-wax.png",

    startDate: "2026-03-29T15:00:00",
    maxPlaces: 20,
  },
];
