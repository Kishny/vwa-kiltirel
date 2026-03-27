// data/events.ts

export type Event = {
  slug: string;
  title: string;
  category?: string;
  tag?: string;
  date: string;
  time: string;
  location: string;
  price: string;                // ce qui s’affiche dans la bande
  shortDescription?: string;
  description: string;
  image: string;
  isPast: boolean;

  // nouvelles infos
  paymentUrl?: string;          // lien HelloAsso ou autre
  paymentNote?: string;         // texte sur le paiement
  reservationNote?: string;     // "Réservation obligatoire", etc.
  ticketNote?: string;          // "ticket à présenter à l'entrée", etc.
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
    price: "Participation 10 à 15 € / mamn",
    shortDescription:
      "Un moment de douceur entre mamans pour souffler, partager et se ressourcer.",
    description:
      "Un brunch chaleureux entre mamans pour parler maternité, charge mentale, parentalité et temps pour soi. Au programme : échanges guidés, petite capsule bien-être et buffet partagé aux couleurs de la Caraïbe.",
    image: "/images/evenements/brunch-mamans.png",
    isPast: false,
    paymentUrl:
      "https://www.helloasso.com/associations/vwa-kiltril/evenements/brunch-mamans-reconnexion",
    paymentNote:
      "Le règlement de la participation (10 à 15 €) se fait via un paiement sécurisé HelloAsso après validation du formulaire.",
    reservationNote:
      "Inscription obligatoire – places limitées pour garantir un cadre chaleureux.",
    ticketNote:
      "Un ticket numérique vous sera envoyé par email. Il sera à présenter à l’entrée du lieu de l’événement.",
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
      "Une veillée moderne inspirée des soirées contes d’antan : histoires créoles, musiques live, percussions et moments d’échanges. Une soirée pensée pour toute la famille.",
    image: "/images/evenements/contes-musique.png",
    isPast: false,
    reservationNote:
      "Entrée libre mais sur réservation – le nombre de places est limité.",
    ticketNote:
      "Votre email de confirmation fera office de ticket d’entrée à présenter à l’accueil.",
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

