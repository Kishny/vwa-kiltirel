"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import {
    associationEvents,
    EventType,
} from "@/components/events/eventsData";

const FILTERS: { id: "all" | EventType; label: string }[] = [
    { id: "all", label: "Tous" },
    { id: "atelier", label: "Ateliers & rencontres" },
    { id: "soiree", label: "Soirées" },
    { id: "plein-air", label: "Plein air & bien-être" },
    { id: "mamans", label: "Entre mamans" },
];

export default function EvenementsPage() {
    const [activeFilter, setActiveFilter] = useState<"all" | EventType>("all");

    const filteredEvents =
        activeFilter === "all"
            ? associationEvents
            : associationEvents.filter((evt) => evt.type === activeFilter);

    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-0">
            {/* Intro */}
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vwa-dark/60">
                    Agenda Vwa Kiltirèl
                </p>
                <h1 className="text-2xl font-semibold text-vwa-dark sm:text-3xl">
                    Tous nos événements à venir
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-vwa-dark/75">
                    Ateliers, soirées, moments en plein air et rencontres entre
                    générations : retrouvez ici tout ce qui fait vibrer la culture
                    créole, afro-descendante et caribéenne à Tours.
                </p>
            </header>

            {/* Filtres */}
            <section className="flex flex-wrap gap-2 rounded-2xl bg-white/70 p-3 shadow-sm shadow-vwa-dark/5 ring-1 ring-vwa-background/80">
                {FILTERS.map((filter) => {
                    const isActive = activeFilter === filter.id;
                    return (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() => setActiveFilter(filter.id)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${isActive
                                ? "bg-vwa-primary text-white shadow-md shadow-vwa-primary/30"
                                : "bg-vwa-background/70 text-vwa-dark/80 hover:bg-vwa-background hover:text-vwa-primary"
                                }`}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </section>

            {/* Liste des événements */}
            <section className="space-y-4">
                {filteredEvents.map((event) => (
                    <article
                        key={event.id}
                        id={event.id}
                        className="group flex flex-col gap-4 rounded-3xl bg-white/95 p-5 shadow-md shadow-vwa-dark/5 ring-1 ring-vwa-background/80 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-vwa-terracotta/40 md:flex-row md:items-stretch md:p-6"
                    >
                        {/* Image */}
                        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-vwa-background md:h-auto md:w-56 lg:w-64">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            />
                            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                        </div>

                        {/* Contenu */}
                        <div className="flex flex-1 flex-col justify-between gap-3">
                            <div className="space-y-2">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vwa-dark/70">
                                    {event.categoryLabel}
                                </p>
                                <h2 className="text-base font-semibold text-vwa-dark sm:text-lg">
                                    {event.title}
                                </h2>

                                <div className="mt-1 space-y-1 text-xs text-vwa-dark/80">
                                    <p className="flex items-center gap-2">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-vwa-terracotta" />
                                        <span>{event.date}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-vwa-blueSoft" />
                                        <span>{event.time}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-vwa-green" />
                                        <span>{event.location}</span>
                                    </p>
                                </div>

                                <p className="mt-2 text-xs leading-relaxed text-vwa-dark/75">
                                    {event.description}
                                </p>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center rounded-full bg-vwa-background px-3 py-1 text-[11px] font-medium text-vwa-primary">
                                    {event.tag}
                                </span>

                                {/* CTA – à brancher plus tard vers une vraie réservation */}
                                <Button variant="primary" size="sm">
                                    Je m&apos;inscris
                                </Button>
                            </div>
                        </div>
                    </article>
                ))}

                {filteredEvents.length === 0 && (
                    <p className="rounded-2xl bg-white/80 p-4 text-sm text-vwa-dark/70">
                        Aucun événement dans cette catégorie pour le moment. D&apos;autres
                        rendez-vous arrivent bientôt !
                    </p>
                )}
            </section>
        </main>
    );
}
