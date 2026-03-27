// app/evenements/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { events } from "@/data/events";

export const metadata = {
    title: "Événements | Vwa Kiltirèl",
};

export default function EventsPage() {
    const router = useRouter();

    const upcomingEvents = events.filter((e) => !e.isPast);
    const pastEvents = events.filter((e) => e.isPast);

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
            {/* Header */}
            <header className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-vwa-dark/60">
                    Agenda
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                    Les événements Vwa Kiltirèl
                </h1>
                <p className="text-sm text-vwa-dark/75 max-w-2xl">
                    Ateliers, rencontres, soirées, moments en plein air… Retrouvez ici
                    tous nos rendez-vous à venir et un aperçu des moments déjà vécus.
                </p>
            </header>

            {/* Événements à venir */}
            <section className="space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-lg font-semibold text-vwa-dark">
                        Prochains événements
                    </h2>
                </div>

                {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-vwa-dark/70">
                        Aucun événement à venir pour le moment, de belles choses se
                        préparent en coulisses…
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <li
                                key={event.slug}
                                className="rounded-3xl border border-vwa-background/80"
                            >
                                {/* Card entièrement cliquable */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => router.push(`/evenements/${event.slug}`)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            router.push(`/evenements/${event.slug}`);
                                        }
                                    }}
                                    className="group flex flex-col sm:flex-row bg-white shadow-sm overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/60"
                                >
                                    {/* Texte */}
                                    <div className="flex-1 p-5 sm:p-6 space-y-2">
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-vwa-dark/70">
                                            {event.category && (
                                                <span className="rounded-full bg-vwa-dark/5 px-2.5 py-1 font-medium text-vwa-dark/80">
                                                    {event.category}
                                                </span>
                                            )}
                                            {event.tag && (
                                                <span className="rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-2.5 py-1 font-medium text-vwa-accent">
                                                    {event.tag}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-base sm:text-lg font-semibold text-vwa-dark">
                                            {event.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-vwa-dark/75">
                                            {event.date} • {event.time} • {event.location}
                                        </p>

                                        {event.shortDescription && (
                                            <p className="text-xs text-vwa-dark/70 mt-1">
                                                {event.shortDescription}
                                            </p>
                                        )}

                                        {/* Prix + actions */}
                                        <div className="mt-3 flex flex-col gap-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                {event.price && (
                                                    <span className="text-xs font-medium text-vwa-dark/80">
                                                        {event.price}
                                                    </span>
                                                )}

                                                {/* Bouton inscription (ne déclenche pas le clic de la card) */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(
                                                            `/evenements/${event.slug}/inscription`
                                                        );
                                                    }}
                                                    className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                                                >
                                                    Je m&apos;inscris
                                                </button>

                                                {/* Texte indicatif pour les détails */}
                                                <span className="text-xs font-medium text-vwa-primary/80 underline-offset-2 group-hover:underline group-hover:text-vwa-dark/90">
                                                    Voir les détails
                                                </span>
                                            </div>

                                            {event.reservationNote && (
                                                <p className="text-[11px] text-vwa-dark/60">
                                                    {event.reservationNote}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="relative w-full sm:w-56 md:w-64 h-44 sm:h-full bg-vwa-background/70">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 256px, 100vw"
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Événements passés */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-vwa-dark">
                    Événements passés
                </h2>

                {pastEvents.length === 0 ? (
                    <p className="text-sm text-vwa-dark/70">
                        Aucun événement passé répertorié pour le moment.
                    </p>
                ) : (
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {pastEvents.map((event) => (
                            <li
                                key={event.slug}
                                className="rounded-2xl border border-vwa-background bg-white/70 px-4 py-3 text-xs text-vwa-dark/80"
                            >
                                <p className="font-semibold text-vwa-dark">{event.title}</p>
                                <p className="mt-1">
                                    {event.date} • {event.location}
                                </p>
                                {event.shortDescription && (
                                    <p className="mt-1 text-[11px] text-vwa-dark/65">
                                        {event.shortDescription}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
