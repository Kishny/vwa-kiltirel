// data/media.ts
// Médiathèque — Les contenus seront ajoutés après les premiers événements 2027.

export type MediaItem = {
  id: string;
  src: string;          // image (ou poster vidéo) dans /public
  alt: string;
  type?: "image" | "video";
  videoUrl?: string;    // pour les vidéos (YouTube, MP4, etc.)
};

// Aucun événement passé pour le moment — les galeries seront alimentées après les premiers temps forts 2027.
export const mediaByEvent: Record<string, MediaItem[]> = {};

// Les photos et vidéos de la vie associative seront publiées ici progressivement.
export const associationMedia: MediaItem[] = [];
