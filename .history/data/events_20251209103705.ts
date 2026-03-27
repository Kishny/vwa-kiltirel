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
  image: string;      // chemin vers l’image dans /public
  isPast: boolean;    // true = événement passé
};

export const events: Event[] = [
  {
    slug: "brunch-mamans-reconnexion",
    title: "Brunch mamans & reconnexion",
    category: "Rencontre / Bien-être",
    tag: "Parents & futurs parents",
    date: "Dimanche 29 mars 2026",
    time: "11h – 14h",
    location: "Centre-ville de Tours",
    price: "Participation libre / cotisation",
    shortDescription:
      "Un moment de douceur entre mamans pour souffler, partager et se ressourcer.",
    description:
      "Un brunch chaleureux entre mamans pour parler maternité, charge mentale, parentalité et temps pour soi. Au programme : échanges guidés, petite capsule bien-être et buffet partagé aux couleurs de la Caraïbe.",
    image: "/images/evenements/brunch-mamans.png",
    isPast: false,
  },
  {
    slug: "soiree-contes-musique",
    title: "Soirée contes & musique",
    category: "Culture & oralité",
    tag: "Soirée familiale",
    date: "Samedi 18 avril 2026",
    time: "19h – 22h",
    location: "Maison de quartier, Tours Nord",
    price: "Entrée libre – chapeau solidaire",
    shortDescription:
      "Une soirée où la parole, les rires et les percussions se répondent.",
    description:
      "Une veillée moderne inspirée des ‘soirées contes’ d’antan : histoires créoles, musiques live, percussions et moments d’échanges. Une soirée pensée pour toute la famille.",
    image: "/images/evenements/contes-musique.png",
    isPast: false,
  },
  {
    slug: "pique-nique-culturel",
    title: "Pique-nique culturel",
    category: "Plein air & partage",
    tag: "Tout public",
    date: "Samedi 10 mai 2025",
    time: "12h – 17h",
    location: "Parc de la Gloriette, Tours",
    price: "Gratuit – sur inscription",
    shortDescription:
      "Un moment convivial en plein air pour célébrer les cultures afro-caribéennes.",
    description:
      "Pique-nique participatif avec musique, jeux pour enfants, découvertes culinaires et mini-ateliers autour de la culture créole et afro-descendante.",
    image: "/images/evenements/pique-nique-culturel.png",
    isPast: true,
  },
];

