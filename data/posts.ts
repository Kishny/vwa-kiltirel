// data/posts.ts

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; items: string[] }
  | {
      type: "image";
      src: string; // /public/...
      alt: string;
      caption?: string;
      ratio?: "16/9" | "4/3" | "1/1" | "3/4";
      focal?: string; // ex: "50% 25%"
    }
  | {
      type: "video";
      src: string; // mp4 in /public or URL
      caption?: string;
      ratio?: "16/9" | "4/3" | "1/1" | "3/4";
      poster?: string;
    };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: PostBlock[];
  cover: string;
  date: string; // "2025-12-11"
  tags: string[];
  readingMinutes?: number;
  isFeatured?: boolean;
  focal?: string; // focal pour la cover
};

export const posts: Post[] = [
  {
    slug: "naissance-vwa-kiltirel",
    title: "Vwa Kiltirèl : pourquoi on existe (et pourquoi ça va vibrer à Tours)",
    excerpt:
      "Notre mission, notre vibe, et ce qu’on construit avec vous : transmission, partage et expériences afro-caribéennes premium.",
    cover: "/images/actualites/cover-1.png",
    focal: "50% 25%",
    date: "2025-12-11",
    tags: ["Association", "Vision", "Tours"],
    readingMinutes: 4,
    isFeatured: true,
    content: [
      {
        type: "p",
        text: "Vwa Kiltirèl est née d’un constat simple : il manquait à Tours un espace vivant, chaleureux et exigeant dédié aux cultures afro-descendantes, créoles et caribéennes.",
      },
      {
        type: "image",
        src: "/images/actualites/cover-1.png",
        alt: "Instant tendre et chaleureux, esprit Vwa Kiltirèl",
        caption: "Une culture se transmet… surtout quand elle se vit.",
        ratio: "16/9",
        focal: "50% 25%",
      },
      { type: "h2", text: "Une vision avant tout humaine" },
      {
        type: "p",
        text: "Derrière chaque événement, chaque atelier ou chaque rencontre, il y a une intention claire : créer du lien. Entre générations, entre cultures, entre parcours de vie.",
      },
      { type: "quote", text: "On ne crée pas des événements. On crée des souvenirs.", author: "Vwa Kiltirèl" },
      { type: "h2", text: "Ce que nous construisons à Tours" },
      {
        type: "list",
        items: [
          "Des soirées culturelles mêlant musique, oralité et partage",
          "Des ateliers pensés pour les familles, les femmes et les jeunes",
          "Des espaces de parole et de transmission intergénérationnelle",
          "Une approche premium, inclusive et profondément humaine",
        ],
      },
      {
        type: "p",
        text: "Vwa Kiltirèl, c’est une aventure collective. Et elle ne fait que commencer.",
      },
    ],
  },

  {
    slug: "coulisses-evenements",
    title: "Coulisses : comment on prépare un événement (sans perdre la tête)",
    excerpt:
      "De l’idée à la scénographie : checklists, équipe, repérages… et le petit grain de magie Vwa Kiltirèl.",
    cover: "/images/actualites/cover-2.png",
    focal: "50% 30%",
    date: "2025-12-08",
    tags: ["Coulisses", "Organisation", "Événements"],
    readingMinutes: 5,
    content: [
      {
        type: "p",
        text: "Avant une soirée réussie, il y a toujours une phase moins visible : la préparation. Et spoiler… c’est souvent là que tout se joue.",
      },
      {
        type: "image",
        src: "/images/actualites/cover-2.png",
        alt: "Sourire, énergie, coulisses et préparation",
        caption: "Les coulisses : là où l’énergie se construit.",
        ratio: "4/3",
        focal: "50% 30%",
      },
      { type: "h2", text: "De l’idée à la réalité" },
      {
        type: "p",
        text: "Tout commence par une intention : pourquoi cet événement, pour qui, et avec quelle énergie. Ensuite viennent les contraintes très concrètes : lieu, horaires, matériel, équipe.",
      },
      { type: "h2", text: "Le grain de magie" },
      {
        type: "list",
        items: [
          "Un détail de déco qui change tout",
          "Une playlist ajustée à l’énergie du public",
          "Un timing fluide (même quand ça improvise fort)",
        ],
      },
    ],
  },

  {
    slug: "culture-oralite",
    title: "Oralité, contes, musique : pourquoi on y tient autant",
    excerpt:
      "La parole comme héritage vivant. Ce qu’on veut transmettre et faire ressentir pendant nos soirées.",
    cover: "/images/actualites/cover-3.png",
    focal: "40% 35%",
    date: "2025-11-30",
    tags: ["Culture", "Oralité", "Musique"],
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "Dans de nombreuses cultures afro-descendantes et caribéennes, la parole n’est pas qu’un moyen de communication. Elle est mémoire, transmission et lien.",
      },
      {
        type: "image",
        src: "/images/actualites/cover-3.png",
        alt: "Musiciens et chaleur d’une scène, esprit culture & oralité",
        caption: "La parole, la musique, et ce frisson qu’on partage.",
        ratio: "16/9",
        focal: "40% 35%",
      },
      { type: "h2", text: "Créer une expérience sensorielle" },
      {
        type: "p",
        text: "Lors de nos événements, l’oralité se mêle à la musique, aux silences, aux regards. On ne vient pas seulement écouter : on vient ressentir.",
      },
      {
        type: "quote",
        text: "Quand on écoute une histoire, on reçoit bien plus que des mots.",
      },
    ],
  },
];