// data/media.ts

export type MediaItem = {
  id: string;
  src: string; // chemin dans /public
  alt: string;
};

export const mediaByEvent: Record<string, MediaItem[]> = {
  "brunch-mamans-reconnexion": [
    {
      id: "brunch-1",
      src: "/mediatheque/brunch-mamans-reconnexion.png",
      alt: "Moments de partage entre mamans autour de la table",
    },
    {
      id: "brunch-2",
      src: "/mediatheque/brunch-mamans-reconnexion-2.png",
      alt: "Atelier bien-être pendant le brunch des mamans",
    },
    {
      id: "brunch-3",
      src: "/mediatheque/brunch-mamans-reconnexion-3.jpg",
      alt: "Ambiance conviviale du brunch Vwa Kiltirèl",
    },
  ],

  "soiree-contes-musique": [
    {
      id: "contes-1",
      src: "/mediatheque/soiree-contes-musique-1.jpg",
      alt: "Conteur en pleine histoire avec le public",
    },
    {
      id: "contes-2",
      src: "/mediatheque/soiree-contes-musique-2.jpg",
      alt: "Musiciens et percussionnistes pendant la soirée contes",
    },
  ],

  // Tu pourras ajouter tes futurs événements ici :
  // "pique-nique-culturel": [...]
};