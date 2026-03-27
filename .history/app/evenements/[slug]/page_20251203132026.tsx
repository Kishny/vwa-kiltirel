// app/evenements/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import {
    upcomingEvents,
    pastEvents,
    type EventItem,
} from "@/lib/eventsData";

// ---- helpers ----

function getEventBySlug(slug: string): EventItem | undefined {
    return (
        upcomingEvents.find((event) => event.slug === slug) ??
        pastEvents.find((event) => event.slug === slug)
    );
}

function getCategoryLabel(category: EventItem["category"]) {
    switch (category) {
        case "atelier":
            return "Atelier";
        case "famille":
            return "Familles";
        case "plein-air":
            return "Plein air & bien-être";
        case "rencontre":
            return "Rencontre";
        default:
            return "Événement";
    }
}

function getCategoryChipClasses(category: EventItem["category"]) {
    switch (category) {
        case "atelier":
            return "bg-vwa-terracotta/10 text-vwa-terracotta";
        case "famille":
            return "bg-vwa-green/10 text-vwa-green";
        case "plein-air":
            return "bg-vwa-blueSoft/10 text-vwa-blueSoft";
        case "rencontre":
            return "bg-vwa-primary/10 text-vwa-primary";
        default:
            return "bg-vwa-dark/10 text-vwa-dark";
    }
}

// ---- SEO dynamique ----

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const event = getEventBySlug(params.slug);

    if (!event) {
        return {
            title: "Événement introuvable • Vwa Kiltirèl",
        };
    }

    return {
        title: `${event.title} • Vwa Kiltirèl`,
        description:
            event.subtitle ??
            "Un événement culturel et convivial organisé par l’association Vwa Kiltirèl à Tours.",
    };
}

// ---- Page ----

export default function EventDetailsPage({
    params,
}: {
    params: { slug: string };
}) {
    const event = getEventBySlug(params.slug);

    if (!event) {
        return notFound();
    }

    const isUpcoming = upcomingEvents.some((e) => e.id === event.id);

    return (
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-12">
            {/* Lien retour */}
            <div className="mb-4">
                <Link
                    href="/evenements"
                    className="
            inline-flex items-center gap-2 text-xs font-medium
            text-vwa-dark/70 hover:text-vwa-dark
            rounded-full px-4 py-2 bg-white/70 border border-vwa-background
            shadow-sm hover:shadow-md transition-all duration-150
          "
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Retour aux événements</span>
                </Link>
            </div>

            <article
                className="
          rounded-3xl bg-white shadow-sm border border-vwa-background
          overflow-hidden
        "
            >
                {/* Image en haut (mobile) / à gauche (desktop) */}
                <div className="relative h-56 sm:h-64 md:h-72">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(min-width: 1024px) 768px, 100vw"
                        className="object-cover"
                        priority
                    />

                    {/* badge catégorie et statut */}
                    <div className="absolute inset-x-0 bottom-0 px-4 pb-4 flex justify-between items-end gap-2">
                        <span
                            className={`inline-flex px-3 py-1 rounded-full text-[11px] font-medium backdrop-blur bg-vwa-dark/5 border border-white/60 shadow-sm ${getCategoryChipClasses(
                                event.category
                            )}`}
                        >
                            {getCategoryLabel(event.category)}
                        </span>

                        {isUpcoming ? (
                            <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/90 text-white shadow">
                                À venir
                            </span>
                        ) : (
                            <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-medium bg-vwa-dark/80 text-white shadow">
                                Événement passé
                            </span>
                        )}
                    </div>
                </div>

                {/* Contenu texte */}
                <div className="p-5 sm:p-7 flex flex-col gap-4">
                    <header>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-vwa-dark/55">
                            Vwa Kiltirèl • {getCategoryLabel(event.category)}
                        </p>
                        <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-vwa-dark">
                            {event.title}
                        </h1>
                        {event.subtitle && (
                            <p className="mt-2 text-sm text-vwa-dark/75 max-w-2xl">
                                {event.subtitle}
                            </p>
                        )}
                    </header>

                    {/* Infos pratiques */}
                    <section
                        aria-label="Informations pratiques"
                        className="rounded-2xl bg-vwa-background/80 border border-vwa-background px-4 py-3 flex flex-col gap-2 text-xs sm:text-sm text-vwa-dark/85"
                    >
                        <p className="flex items-center gap-2">
                            <CalendarDaysIcon className="h-4 w-4 text-vwa-primary/90" />
                            <span>{event.dateLabel}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-vwa-primary/90" />
                            <span>{event.timeLabel}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-vwa-primary/90" />
                            <span>{event.placeLabel}</span>
                        </p>
                    </section>

                    {/* Texte générique — à personnaliser plus tard */}
                    <section className="text-sm text-vwa-dark/80 space-y-3">
                        <p>
                            Cet événement est organisé par l&apos;association{" "}
                            <strong>Vwa Kiltirèl</strong> pour faire vivre les cultures
                            afro-descendantes, caribéennes et créoles à Tours. C&apos;est un
                            moment de partage, de découverte et de convivialité ouvert à
                            toutes et tous.
                        </p>
                        <p>
                            Sur place, vous trouverez une ambiance chaleureuse, des temps
                            d&apos;échanges et des activités pensées pour créer du lien entre
                            les générations et les cultures. Certain·es événements peuvent
                            être gratuits, d&apos;autres sur participation libre ou
                            inscription.
                        </p>
                        <p className="text-xs text-vwa-dark/60">
                            👉 Les informations détaillées (participation, matériel
                            éventuellement à apporter, accès PMR, etc.) seront précisées dans
                            la communication officielle de l&apos;événement.
                        </p>
                    </section>

                    {/* CTA */}
                    <section className="flex flex-col sm:flex-row gap-3 mt-2">
                        {isUpcoming && (
                            <button
                                type="button"
                                className="
                  group relative flex-1 inline-flex items-center justify-center
                  rounded-full px-5 py-3 text-sm font-medium text-white
                  bg-gradient-to-r from-vwa-terracotta to-vwa-accent
                  shadow-md hover:shadow-xl transition-all duration-200
                  ring-1 ring-vwa-terracotta/50 hover:ring-vwa-terracotta/80
                  active:scale-95
                "
                            >
                                <span className="relative z-10">
                                    Je souhaite participer à cet événement
                                </span>
                                <span
                                    className="
                    pointer-events-none absolute inset-0 rounded-full
                    opacity-0 group-hover:opacity-100
                    bg-vwa-terracotta/25 blur-xl transition-opacity duration-200
                  "
                                />
                            </button>
                        )}

                        <Link
                            href="/devenir-membre"
                            className="
                flex-1 inline-flex items-center justify-center rounded-full
                px-5 py-3 text-sm font-medium
                bg-white text-vwa-dark border border-vwa-background
                hover:border-vwa-primary/50 hover:text-vwa-primary
                shadow-sm hover:shadow-md active:scale-95
                transition-all duration-150
              "
                        >
                            Devenir membre de l&apos;association
                        </Link>
                    </section>

                    {/* Lien secondaire */}
                    <footer className="mt-1">
                        <Link
                            href="/evenements"
                            className="inline-flex items-center text-xs text-vwa-dark/60 hover:text-vwa-dark underline-offset-4 hover:underline"
                        >
                            Voir tous les événements
                        </Link>
                    </footer>
                </div>
            </article>
        </div>
    );
}
