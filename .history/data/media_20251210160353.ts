// data/media.ts

export type MediaItem = {
  id: string;
  src: string;          // image (ou poster vidéo) dans /public
  alt: string;
  type?: "image" | "video";
  videoUrl?: string;    // pour les vidéos (YouTube, MP4, etc.)
};

// 📁 Médias par événement (archives)
export const mediaByEvent: Record<string, MediaItem[]> = {
  "brunch-mamans-reconnexion": [
    {
      id: "brunch-1",
      src: "/images/mediatheque/brunch-mamans.png",
      alt: "Moments de partage entre mamans autour de la table",
      type: "image",
    },
    {
      id: "brunch-2",
      src: "/images/mediatheque/brunch-mamans-reconnexion-2.png",
      alt: "Atelier bien-être pendant le brunch des mamans",
      type: "image",
    },
    {
      id: "brunch-3",
      src: "/images/mediatheque/brunch-mamans-reconnexion-3.jpg",
      alt: "Ambiance conviviale du brunch Vwa Kiltirèl",
      type: "image",
    },
  ],

  "soiree-contes-musique": [
    {
      id: "contes-1",
      src: "/images/mediatheque/soiree-contes-musique-1.jpg",
      alt: "Conteur en pleine histoire avec le public",
      type: "image",
    },
    {
      id: "contes-2",
      src: "/images/mediatheque/soiree-contes-musique-2.jpg",
      alt: "Musiciens et percussionnistes pendant la soirée contes",
      type: "image",
    },
  ],

  "pique-nique-culturel": [
    {
      id: "pique-1",
      src: "/images/mediatheque/pique-nique-culturel.png",
      alt: "Moment convivial durant le pique-nique culturel",
      type: "image",
    },
    {
      id: "pique-2",
      src: "/images/mediatheque/pique-nique-2.png",
      alt: "Jeux et partage lors du pique-nique culturel",
      type: "image",
    },
    {
      id: "pique-3",
      src: "/images/mediatheque/pique-nique-3.jpg",
      alt: "Participants profitant d’un atelier en plein air",
      type: "image",
    },
  ],
};

// 📁 Médias “Vie de l’association” (coulisses, préparation, etc.)
export const associationMedia: MediaItem[] = [
  {
    id: "asso-1",
    src: "/images/mediatheque/asso-decor-1.png",
    alt: "L’équipe de Vwa Kiltirèl en pleine préparation d’un atelier.",
    type: "image",
  },
  {
    id: "asso-2",
    src: "/images/mediatheque/asso-decor-2.png",
    alt: "Installation de la déco pour une future soirée contes & musique.",
    type: "image",
  },
  {
    id: "asso-3-video",
    src: "/images/mediatheque/asso-video-poster.png", // image d’aperçu
    alt: "Extrait vidéo des coulisses d’un événement.",
    type: "video",
    videoUrl: "/videos/asso-coulisses.mp4", // à créer plus tard si tu veux faire des vidéos locales
  },
];