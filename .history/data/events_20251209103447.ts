// data/events.ts

export type Event = {
  slug: string;
  title: string;
  date: string;        // ex: "Dimanche 29 mars 2026"
  time: string;        // ex: "15h – 17h"
  location: string;    // ex: "Maison de quartier, Tours"
  category?: string;   // Culture, Familles, Plein air & bien-être, ...
  tag?: string;        // Atelier créatif, Soirée, etc.
  shortDescription?: string;
  description: string;
  image: string;       // chemin vers l'image (public/...)
  isPast: boolean;     // true = événement passé, false = à venir
};

export const events: Event[] = [
  {
    slug: "brunch-mamans-reconnexion",
    title: "Brunch mamans & reconnexion",
    date: "Dimanche 29 mars 2026",
    time: "11h – 14h",
    location: "Centre-ville de Tours",
    category: "Familles",
    tag: "Rencontre / Bien-être",
    shortDescription:
      "Un moment doux entre mamans pour souffler, échanger et se ressourcer autour d’un brunch convivial.",
    description:
      "Ce brunch est pensé pour les mamans qui ont besoin d’un temps pour elles : échanges, partage d’expériences, ateliers bien-être légers et buffet gourmand inspiré des saveurs afro-caribéennes. Enfants bienvenus avec un petit coin jeux encadré.",
    image: "/images/evenements/brunch-mamans.png",
    isPast: false,
  },
  {
    slug: "atelier-bijoux-tissu-wax",
    title: "Création de bijoux en tissu wax",
    date: "Samedi 14 mars 2026",
    time: "15h – 17h",
    location: "Maison de quartier, Tours Nord",
    category: "Culture",
    tag: "Atelier créatif",
    shortDescription:
      "Atelier parents-enfants pour créer des bijoux colorés en tissu wax et découvrir leurs histoires.",
    description:
      "Accompagné·es par une intervenante artiste, les participant·es réalisent boucles d’oreilles, bracelets ou porte-clés en tissu wax. L’atelier est aussi l’occasion de parler des origines de ces motifs, de leur symbolique et de leurs usages dans les cultures afro-caribéennes.",
    image: "/images/evenements/atelier-bijoux-wax.png",
    isPast: false,
  },
  {
    slug: "soiree-contes-musique",
    title: "Soirée contes & musique",
    date: "Samedi 18 janvier 2025",
    time: "19h – 22h",
    location: "Salle associative, Tours",
    category: "Culture",
    tag: "Soirée",
    shortDescription:
      "Une soirée chaleureuse de contes créoles, musique live et partage autour des traditions orales.",
    description:
      "Conteurs, musicien·nes et public se retrouvent pour une soirée conviviale. Histoires, proverbes, chants et percussions tissent un voyage entre Caraïbes, Afrique et Europe. Petite collation aux saveurs créoles proposée sur place.",
    image: "/images/evenements/atelier-contes.png",
    isPast: true,
  },
  {
    slug: "pique-nique-culturel",
    title: "Pique-nique culturel",
    date: "Dimanche 1er septembre 2024",
    time: "12h – 17h",
    location: "Parc de Sainte-Radegonde, Tours",
    category: "Plein air & bien-être",
    tag: "Plein air",
    shortDescription:
      "Un moment en plein air pour partager plats, jeux, musique et histoires en famille.",
    description:
      "Chaque famille apporte un plat à partager (ou vient les mains vides, l’important est d’être là). Jeux coopératifs, temps de discussion, mini-atelier danse et espace lecture pour les enfants. Objectif : créer du lien dans un cadre simple et joyeux.",
    image: "/images/evenements/pique-nique-culturel.png",
    isPast: true,
  },
];
