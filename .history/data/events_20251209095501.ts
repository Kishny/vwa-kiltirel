// data/events.ts

export type EventItem = {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  image: string;
  description?: string;
  badgeText?: string;
};

export const events: EventItem[] = [
  {
    slug: "brunch-mamans-reconnexion",
    title: "Brunch mamans & reconnexion",
    category: "Rencontre / Bien-être",
    date: "2026-02-08",
    dateLabel: "Dimanche 8 février 2026",
    time: "11h – 14h",
    location: "Centre-ville de Tours",
    image: "/images/events/brunch-mamans.png",
    description:
      "Un moment doux et chaleureux pour les mamans : partage, discussions, ateliers légers et brunch gourmand.",
    badgeText: "Participation libre • sur inscription",
  },
  {
    slug: "creation-bijoux-tissu-wax",
    title: "Création de bijoux en tissu wax",
    category: "Atelier parents-enfants",
    date: "2026-03-29",
    dateLabel: "Dimanche 29 mars 2026",
    time: "15h – 17h",
    location: "Maison de quartier, Tours",
    image: "/images/events/atelier-bijoux.png",
    description:
      "Atelier créatif pour découvrir l’art du wax et créer ensemble un petit bijou personnel.",
    badgeText: "Atelier créatif"
  },
  {
    slug: "contes-musique",
    title: "Soirée contes & musique",
    category: "Soirée",
    date: "2026-04-12",
    dateLabel: "Samedi 12 avril 2026",
    time: "19h – 22h",
    location: "Tours Nord",
    image: "/images/events/atelier-contes.png",
    description:
      "Une soirée rythmée par les contes afro-caribéens, accompagnés de percussions et instruments traditionnels.",
    badgeText: "Soirée culturelle"
  },
  {
    slug: "pique-nique-culturel",
    title: "Pique-nique culturel",
    category: "Plein air",
    date: "2026-05-10",
    dateLabel: "Dimanche 10 mai 2026",
    time: "12h – 16h",
    location: "Parc de la Gloriette, Tours",
    image: "/images/events/pique-nique-culturel.png",
    description:
      "Un grand moment de partage autour de la culture afro-caribéenne : repas, danse et transmissions.",
    badgeText: "Ouvert à tous"
  }
];
