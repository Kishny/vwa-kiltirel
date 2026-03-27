// lib/eventsData.ts
export type EventCategory = "atelier" | "rencontre" | "famille" | "plein-air" | "autre";

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: EventCategory;
  dateLabel: string; // ex : "Dimanche 29 mars 2026"
  timeLabel: string; // ex : "15h – 17h"
  placeLabel: string; // ex : "Maison de quartier, Tours"
  badgeLabel?: string; // ex : "Atelier créatif"
  image: string; // chemin vers l'image dans /public
  isFull?: boolean;
};

export const upcomingEvents: EventItem[] = [
  {
    id: "brunch-mamans",
    slug: "brunch-mamans-reconnexion",
    title: "Brunch mamans & reconnexion",
    subtitle: "Un moment doux entre futures et jeunes mamans.",
    category: "famille",
    dateLabel: "Dimanche 8 février 2026",
    timeLabel: "11h – 14h",
    placeLabel: "Tours Nord",
    badgeLabel: "Brunch entre mamans",
    image: "/images/evenements/brunch-mamans.png",
  },
  {
    id: "atelier-bijoux-wax",
    slug: "atelier-bijoux-tissu-wax",
    title: "Création de bijoux en tissu wax",
    subtitle: "Atelier parents-enfants autour des tissus africains.",
    category: "atelier",
    dateLabel: "Dimanche 29 mars 2026",
    timeLabel: "15h – 17h",
    placeLabel: "Maison de quartier, Tours",
    badgeLabel: "Atelier créatif",
    image: "/images/evenements/atelier-bijoux-wax.png",
  },
  {
    id: "contes-musique",
    slug: "soiree-contes-et-musique",
    title: "Soirée contes & musique",
    subtitle: "Histoires, tambours et chants caribéens au clair de lune.",
    category: "rencontre",
    dateLabel: "Samedi 12 avril 2026",
    timeLabel: "19h – 22h",
    placeLabel: "Salle polyvalente, Tours",
    badgeLabel: "Soirée",
    image: "/images/evenements/contes-musique.png",
  },
];

export const pastEvents: EventItem[] = [
  {
    id: "pique-nique-culturel",
    slug: "pique-nique-culturel",
    title: "Pique-nique culturel au parc",
    subtitle: "Jeux, dégustations et rencontres en plein air.",
    category: "plein-air",
    dateLabel: "Mai 2025",
    timeLabel: "Après-midi",
    placeLabel: "Parc de Tours",
    badgeLabel: "Plein air",
    image: "/images/evenements/pique-nique-culturel.png",
  },
  {
    id: "atelier-contes-enfants",
    slug: "atelier-contes-enfants",
    title: "Contes créoles pour les enfants",
    subtitle: "Histoires et marionnettes pour éveiller l’imaginaire.",
    category: "atelier",
    dateLabel: "Mars 2025",
    timeLabel: "Matinée",
    placeLabel: "Bibliothèque de quartier",
    image: "/images/evenements/atelier-contes.png",
  },
];
