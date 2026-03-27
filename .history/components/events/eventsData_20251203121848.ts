// components/events/eventsData.ts

export type EventType = "atelier" | "soiree" | "plein-air" | "mamans";

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
};

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
    image: "/images/events/atelier-parents-enfants.png",
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
    image: "/images/events/brunch-entre-mamans.png",
  },
];
