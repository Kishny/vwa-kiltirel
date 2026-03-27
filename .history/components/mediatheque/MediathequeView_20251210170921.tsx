// components/mediatheque/MediathequeView.tsx
"use client";

import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MediaItem } from "@/data/media";

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
    associationMedia: MediaItem[];
    initialEventSlug?: string;
    initialCategory?: string;
};

const ALL_CATEGORIES = "tous";

export default function MediathequeView({
    events,
    associationMedia,
    initialEventSlug,
    initialCategory,
}: Props) {
    const [activeCategory, setActiveCategory] = useState<string>(
        initialCategory ?? ALL_CATEGORIES
    );
    const [activeSlug, setActiveSlug] = useState<string>(
        initialEventSlug ?? events[0]?.slug ?? ""
    );

    // 🔥 Nouveau state pour lightbox avec carousel
    const [lightboxState, setLightboxState] = useState<{
        contextTitle: string;
        medias: MediaItem[];
        index: number;
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

    // Préparation du node lightbox (pour pouvoir déclarer des fonctions)
    let lightboxNode: JSX.Element | null = null;

    if (lightboxState) {
        const { contextTitle, medias, index } = lightboxState;
        const currentMedia = medias[index];

        const goPrev = () => {
            setLightboxState((prev) =>
                !prev
                    ? null
                    : {
                        ...prev,
                        index:
                            prev.index === 0
                                ? prev.medias.length - 1
                                : prev.index - 1,
                    }
            );
        };

        const goNext = () => {
            setLightboxState((prev) =>
                !prev
                    ? null
                    : {
                        ...prev,
                        index:
                            prev.index === prev.medias.length - 1
                                ? 0
                                : prev.index + 1,
                    }
            );
        };

        lightboxNode = (
            <div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6"
                onClick={() => setLightboxState(null)}
            >
                <div
                    className="relative max-w-3xl w-full max-h-full rounded-3xl bg-black/70 border border-white/15 overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.85)] animate-[mediaZoom_220ms_ease-out]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Bouton fermeture */}
                    <button
                        type="button"
                        onClick={() => setLightboxState(null)}
                        className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-xs text-white/90 shadow-lg hover:bg-black focus:outline-none"
                    >
                        ✕
                    </button>

                    {/* Flèche gauche */}
                    {medias.length > 1 && (
                        <button
                            type="button"
                            onClick={goPrev}
                            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white/90 shadow-lg hover:bg-black focus:outline-none"
                        >
                            ←
                        </button>
                    )}

                    {/* Flèche droite */}
                    {medias.length > 1 && (
                        <button
                            type="button"
                            onClick={goNext}
                            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white/90 shadow-lg hover:bg-black focus:outline-none"
                        >
                            →
                        </button>
                    )}

                    <div className="relative w-full aspect-[16/10] bg-black">
                        {currentMedia.type === "video" && currentMedia.videoUrl ? (
                            <video
                                src={currentMedia.videoUrl}
                                className="h-full w-full object-contain"
                                controls
                                autoPlay
                            />
                        ) : (
                            <Image
                                src={currentMedia.src}
                                alt={currentMedia.alt}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />
                        )}
                    </div>

                    <div className="px-4 py-3 text-xs text-vwa-background/90 flex items-center justify-between gap-3">
                        <div>
                            <p className="font-semibold">{contextTitle}</p>
                            <p className="text-vwa-background/80">{currentMedia.alt}</p>
                        </div>
                        <p className="text-[11px] text-vwa-background/60">
                            {index + 1} / {medias.length}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
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
                            événements Vwa Kiltirèl, ainsi que des instantanés de la
                            vie de l’association.
                        </p>
                    </div>
                    <div className="text-xs text-right space-y-1">
                        <p className="text-vwa-dark/60">Événements archivés</p>
                        <p className="text-sm font-semibold text-vwa-dark">
                            {events.length} souvenir
                            {events.length > 1 && "s"} en images
                        </p>
                        <p className="text-[11px] text-vwa-dark/55">
                            + {associationMedia.length} média(s) “Vie de l’association”
                        </p>
                    </div>
                </div>
            </header>

            {/* SECTION 1 — Archives d’événements */}
            <section className="space-y-6">
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

                    {/* Colonne droite : galerie événement */}
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
                                {activeMedias.map((media, index) => (
                                    <button
                                        key={media.id}
                                        type="button"
                                        onClick={() =>
                                            setLightboxState({
                                                contextTitle: activeEvent.title,
                                                medias: activeMedias,
                                                index,
                                            })
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
            </section>

            {/* SECTION 2 — Vie de l’association */}
            {associationMedia.length > 0 && (
                <section className="space-y-4 pt-4 border-t border-vwa-background/60">
                    <div className="flex items-baseline justify-between gap-4">
                        <h2 className="text-sm font-semibold text-vwa-dark">
                            La vie de l’association
                        </h2>
                        <span className="text-[11px] text-vwa-dark/55">
                            {associationMedia.length} média
                            {associationMedia.length > 1 && "s"} (coulisses, préparation, etc.)
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {associationMedia.map((media, index) => (
                            <button
                                key={media.id}
                                type="button"
                                onClick={() =>
                                    setLightboxState({
                                        contextTitle: "Vie de l’association",
                                        medias: associationMedia,
                                        index,
                                    })
                                }
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-vwa-background/70 shadow-[0_12px_36px_rgba(28,22,18,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(28,22,18,0.24)]"
                            >
                                <Image
                                    src={media.src}
                                    alt={media.alt}
                                    fill
                                    sizes="(min-width:1024px) 25vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                />
                                {media.type === "video" && (
                                    <span className="pointer-events-none absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white/90">
                                        ▶ Vidéo
                                    </span>
                                )}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="pointer-events-none absolute bottom-2 left-2 right-2 text-[10px] text-vwa-background/95 line-clamp-2 drop-shadow-sm">
                                    {media.alt}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* LIGHTBOX commun */}
            {lightboxNode}
        </div>
    );
}