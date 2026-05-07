"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import type { MediaItem } from "@/data/media";

type Props = {
  eventTitle: string;
  images: MediaItem[];
  onOpenLightbox: (index: number) => void;
};

export function EventGallery({ eventTitle, images, onOpenLightbox }: Props) {
  return (
    <section className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-6 shadow-md backdrop-blur-sm md:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-vwa-dark">
          <Camera className="h-5 w-5 text-vwa-accent" aria-hidden="true" />
          Galerie
        </h2>
        <span className="text-xs font-medium text-vwa-dark/50">
          {images.length} visuel{images.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.slice(0, 6).map((media, idx) => (
          <button
            key={idx}
            onClick={() => onOpenLightbox(idx)}
            aria-label={`Ouvrir la photo ${idx + 1} : ${media.alt ?? eventTitle}`}
            className="relative aspect-square overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent"
          >
            <Image
              src={media.src}
              alt={media.alt ?? `${eventTitle} – Photo ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>
      <div className="mt-5">
        <Link
          href={`/mediatheque?event=${eventTitle}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-vwa-primary transition-colors hover:text-vwa-dark"
        >
          Voir la galerie complète
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}