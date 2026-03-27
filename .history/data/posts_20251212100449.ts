export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // pour plus tard (page article)
  cover: string;   // /public/...
  date: string;    // "2025-12-11"
  tags: string[];
  readingMinutes?: number;
  isFeatured?: boolean;
  focal?: string;
};

export const posts: Post[] = [
  {
    slug: "naissance-vwa-kiltirel",
    title: "Vwa Kiltirèl : pourquoi on existe (et pourquoi ça va vibrer à Tours)",
    excerpt:
      "Notre mission, notre vibe, et ce qu’on construit avec vous : transmission, partage et expériences afro-caribéennes premium.",
    content:
      "Contenu à venir… (on fera une page [slug] ensuite).",
    cover: "/images/actualites/cover-1.png",
    focal: "50% 25%",
    date: "2025-12-11",
    tags: ["Association", "Vision", "Tours"],
    readingMinutes: 4,
    isFeatured: true,
  },
  {
    slug: "coulisses-evenements",
    title: "Coulisses : comment on prépare un événement (sans perdre la tête)",
    excerpt:
      "De l’idée à la scénographie : checklists, équipe, repérages… et le petit grain de magie Vwa Kiltirèl.",
    content: "Contenu à venir…",
    cover: "/images/actualites/cover-2.png",
    focal: "50% 25%",
    date: "2025-12-08",
    tags: ["Coulisses", "Organisation", "Événements"],
    readingMinutes: 5,
  },
  {
    slug: "culture-oralite",
    title: "Oralité, contes, musique : pourquoi on y tient autant",
    excerpt:
      "La parole comme héritage vivant. Ce qu’on veut transmettre et faire ressentir pendant nos soirées.",
    content: "Contenu à venir…",
    cover: "/images/actualites/cover-3.png",
    date: "2025-11-30",
    tags: ["Culture", "Oralité", "Musique"],
    readingMinutes: 6,
  },
];