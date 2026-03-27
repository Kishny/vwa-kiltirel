// components/mediatheque/MediathequeView.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MediaItem } from "@/data/media";

export default MediathequeView;
export type { EventWithMedia };

export type EventWithMedia = {
    slug: string;
    title: string;
    category?: string;
    date: string;
    location: string;
    medias: MediaItem[];
};

type Props = {
    events: EventWithMedia[];
    initialEventSlug?: string;
    initialCategory?: string;
};

const ALL_CATEGORIES = "tous";

export default function MediathequeView({
    events,
    initialEventSlug,
    initialCategory,
}: Props) {
    const [activeCategory, setActiveCategory] = useState<string>(
        initialCategory ?? ALL_CATEGORIES
    );
    const [activeSlug, setActiveSlug] = useState<string>(
        initialEventSlug ?? events[0]?.slug ?? ""
    );

    const [lightboxMedia, setLightboxMedia] = useState<{
        eventTitle: string;
        media: MediaItem;
    } | null>(null);

    const categories = useMemo(() => {
        const set = new Set<string>();
        events.forEach((e) => {
            if (e.category) set.add(e.category);
        });
        return [ALL_CATEGORIES, ...Array.from(set)];
    }, [events]);

    const filteredEvents = useMemo(() => {
        if (activeCategory === ALL_CATEGORIES) return events;
        return events.filter((e) => e.category === activeCategory);
    }, [events, activeCategory]);

    // Si on change de catégorie et que l’événement actif ne fait plus partie du filtre,
    // on recentre sur le 1er de la liste filtrée.
    useEffect(() => {
        if (!filteredEvents.length) return;
        const exists = filteredEvents.some((e) => e.slug === activeSlug);
        if (!exists) {
            setActiveSlug(filteredEvents[0].slug);
        }
    }, [filteredEvents, activeSlug]);

    const activeEvent =
        filteredEvents.find((e) => e.slug === activeSlug) ?? filteredEvents[0];

    const activeMedias = activeEvent?.medias ?? [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                    Médiathèque – souvenirs Vwa Kiltirèl
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                            Les moments déjà partagés
                        </h1>
                        <p className="text-sm text-vwa-dark/75 max-w-2xl">
                            Retrouvez les photos des ateliers, soirées, rencontres et
                            événements Vwa Kiltirèl. Chaque événement possède son dossier,
                            relié à sa fiche détaillée.
                        </p>
                    </div>
                    <div className="text-xs text-right space-y-1">
                        <p className="text-vwa-dark/60">Événements archivés</p>
                        <p className="text-sm font-semibold text-vwa-dark">
                            {events.length} souvenir
                            {events.length > 1 && "s"} en images
                        </p>
                    </div>
                </div>
            </header>

            {/* Filtres catégories */}
            <section className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Filtrer par type de moment
                </h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                        const isActive = cat === activeCategory;
                        const label = cat === ALL_CATEGORIES ? "Tous les événements" : cat;

                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={[
                                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                                    isActive
                                        ? "border-vwa-dark bg-vwa-dark text-vwa-background shadow-[0_10px_28px_rgba(28,22,18,0.45)]"
                                        : "border-vwa-background bg-white/80 text-vwa-dark/75 hover:border-vwa-dark/50 hover:bg-white",
                                ].join(" ")}
                            >
                                {cat === ALL_CATEGORIES ? "•" : "●"}
                                {label}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Layout 2 colonnes : liste d'événements + galerie */}
            <section className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] items-start">
                {/* Colonne gauche : événements */}
                <div className="space-y-3">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        Événements archivés
                    </h2>
                    <div className="rounded-3xl bg-white/90 border border-vwa-background/90 shadow-[0_14px_40px_rgba(28,22,18,0.10)] overflow-hidden">
                        <ul className="divide-y divide-vwa-background/80">
                            {filteredEvents.map((event) => {
                                const isActive = event.slug === activeSlug;
                                return (
                                    <li key={event.slug}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSlug(event.slug)}
                                            className={[
                                                "w-full text-left px-4 py-3.5 transition-all duration-200 flex flex-col gap-1",
                                                isActive
                                                    ? "bg-vwa-dark text-vwa-background"
                                                    : "hover:bg-vwa-background/60",
                                            ].join(" ")}
                                        >
                                            <span className="text-xs uppercase tracking-[0.18em] opacity-70">
                                                {event.date}
                                            </span>
                                            <span className="text-sm font-semibold leading-snug">
                                                {event.title}
                                            </span>
                                            <span
                                                className={[
                                                    "text-[11px]",
                                                    isActive ? "opacity-80" : "text-vwa-dark/70",
                                                ].join(" ")}
                                            >
                                                {event.location}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {activeEvent && (
                        <div className="rounded-2xl bg-vwa-dark text-vwa-background px-4 py-3 shadow-[0_16px_40px_rgba(28,22,18,0.6)] space-y-1.5 text-xs">
                            <p className="uppercase tracking-[0.18em] text-vwa-background/70">
                                Dossier sélectionné
                            </p>
                            <p className="font-medium text-sm">{activeEvent.title}</p>
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                <Link
                                    href={`/evenements/${activeEvent.slug}`}
                                    className="underline-offset-2 hover:underline"
                                >
                                    Voir la fiche de l&apos;événement
                                </Link>
                                <span className="text-vwa-background/40">•</span>
                                <span className="text-vwa-background/70">
                                    {activeMedias.length} photo
                                    {activeMedias.length > 1 && "s"}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Colonne droite : galerie */}
                <div className="space-y-3">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        Galerie photo
                    </h2>

                    {activeMedias.length === 0 ? (
                        <p className="text-sm text-vwa-dark/70">
                            Pas encore de photos pour cet événement, mais ça arrive…
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            {activeMedias.map((media) => (
                                <button
                                    key={media.id}
                                    type="button"
                                    onClick={() =>
                                        setLightboxMedia({ eventTitle: activeEvent.title, media })
                                    }
                                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-vwa-background/60 shadow-[0_14px_40px_rgba(28,22,18,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(28,22,18,0.22)]"
                                >
                                    <Image
                                        src={media.src}
                                        alt={media.alt}
                                        fill
                                        sizes="(min-width:768px) 33vw, 50vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="pointer-events-none absolute bottom-2 left-2 right-2 text-[10px] text-vwa-background/90 line-clamp-2 drop-shadow-sm">
                                        {media.alt}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* LIGHTBOX */}
            {lightboxMedia && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6"
                    onClick={() => setLightboxMedia(null)}
                >
                    <div
                        className="relative max-w-3xl w-full max-h-full rounded-3xl bg-black/70 border border-white/15 overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.85)] animate-[mediaZoom_220ms_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setLightboxMedia(null)}
                            className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-xs text-white/90 shadow-lg hover:bg-black focus:outline-none"
                        >
                            ✕
                        </button>
                        <div className="relative w-full aspect-[16/10] bg-black">
                            <Image
                                src={lightboxMedia.media.src}
                                alt={lightboxMedia.media.alt}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />
                        </div>
                        <div className="px-4 py-3 text-xs text-vwa-background/90">
                            <p className="font-semibold">{lightboxMedia.eventTitle}</p>
                            <p className="text-vwa-background/80">
                                {lightboxMedia.media.alt}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}