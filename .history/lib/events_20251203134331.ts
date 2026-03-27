// lib/events.ts
export type EventCategory = "atelier" | "soiree" | "brunch" | "plein-air";

export type EventStatus = "a-venir" | "passe";

export type Event = {
  slug: string;
  title: string;
  subtitle?: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  status: EventStatus;
  tag: string;
  shortDescription: string;
  longDescription: string;
  image: string; // chemin vers ton .png dans /public/images/...
};

export const events: Event[] = [
  {
    slug: "brunch-mamans-reconnexion",
    title: "Brunch mamans & reconnexion",
    subtitle: "Un moment doux entre futures et jeunes mamans",
    category: "brunch",
    date: "Dimanche 8 février 2026",
    time: "11h – 14h",
    location: "Centre-ville de Tours",
    status: "a-venir",
    tag: "Brunch entre mamans",
    shortDescription:
      "Un temps pour souffler, échanger, rire et se soutenir entre mamans autour d’un brunch chaleureux.",
    longDescription:
      "Ce brunch est pensé pour offrir un espace cocon aux mamans et futures mamans : temps de parole, jeux, échanges autour de la parentalité, mais aussi détente, rires et gourmandise. L’équipe de Vwa Kiltirèl anime des moments de discussion et des mini-ateliers pour prendre soin de soi et des liens familiaux.",
    image: "/images/events/brunch-mamans.png",
  },
  {
    slug: "atelier-bijoux-tissu-wax",
    title: "Création de bijoux en tissu wax",
    subtitle: "Atelier parents-enfants",
    category: "atelier",
    date: "Dimanche 29 mars 2026",
    time: "15h – 17h",
    location: "Maison de quartier, Tours",
    status: "a-venir",
    tag: "Atelier créatif",
    shortDescription:
      "Un atelier ludique pour créer ensemble des bijoux en tissu wax et découvrir les histoires derrière les motifs.",
    longDescription:
      "Pendant cet atelier, parents et enfants explorent les tissus wax, leurs motifs et leurs significations. Guidés par une animatrice, chacun réalise un bijou (boucles d’oreilles, bracelet ou pendentif) à emporter chez soi. C’est aussi l’occasion d’aborder les cultures afro-descendantes à travers la création artistique.",
    image: "/images/events/atelier-bijoux.png",
  },
  {
    slug: "soiree-contes-musique-familles",
    title: "Soirée contes & musique",
    subtitle: "Histoires, chants et percussions",
    category: "soiree",
    date: "Samedi 14 mars 2026",
    time: "19h – 21h30",
    location: "Salle associative, Tours Nord",
    status: "a-venir",
    tag: "Soirée conviviale",
    shortDescription:
      "Une soirée chaleureuse autour de contes créoles, de chants et de percussions pour toute la famille.",
    longDescription:
      "Cette soirée mêle contes créoles, récits afro-caribéens, chants et percussions. Le public est invité à participer, répéter des refrains, frapper des mains, rire et voyager au rythme des histoires. Un moment intergénérationnel qui met en avant la transmission orale et la richesse des cultures afro-descendantes.",
    image: "/images/events/soiree-contes.png",
  },
  {
    slug: "pique-nique-culturel-plein-air",
    title: "Pique-nique culturel en plein air",
    subtitle: "Jeux, découverte et partage",
    category: "plein-air",
    date: "Dimanche 10 mai 2026",
    time: "12h – 16h",
    location: "Parc de la Gloriette, Tours",
    status: "passe",
    tag: "Plein air & bien-être",
    shortDescription:
      "Un pique-nique collectif avec animations, jeux pour enfants, musique et découverte de saveurs.",
    longDescription:
      "Lors de ce pique-nique, les familles apportent un plat à partager et découvrent des spécialités culinaires inspirées des cultures afro-caribéennes. Des animations sont proposées : jeux collectifs, mini-atelier danse, temps de relaxation. L’objectif : créer du lien, respirer dehors et célébrer la diversité culturelle.",
    image: "/images/events/pique-nique-culturel.png",
  },
];

export function getUpcomingEvents() {
  return events.filter((e) => e.status === "a-venir");
}

export function getPastEvents() {
  return events.filter((e) => e.status === "passe");
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
