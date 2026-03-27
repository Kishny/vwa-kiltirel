// components/Home/NextEventsCarousel.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getUpcomingEvents } from "@/lib/events";

const AUTO_PLAY_DELAY = 8000;

export default function NextEventsCarousel() {
    const events = getUpcomingEvents();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((prev) => (prev + 1) % events.length);
        }, AUTO_PLAY_DELAY);
        return () => clearInterval(id);
    }, [events.length]);

    const event = events[current];

    return (
        <section aria-labelledby="next-events-title" className="mt-4">
            <div className="flex items-center justify-between mb-3">
                <h2
                    id="next-events-title"
                    className="text-lg font-semibold text-vwa-dark"
                >
                    Prochains événements
                </h2>
                <Link
                    href="/evenements"
                    className="text-xs font-medium text-vwa-primary hover:text-vwa-blueSoft transition"
                >
                    Tout voir
                </Link>
            </div>

            <article className="grid grid-cols-1 sm:grid-cols-[2fr,1.4fr] gap-4 rounded-3xl bg-white/90 shadow-[0_18px_55px_rgba(71,41,24,0.13)] overflow-hidden border border-vwa-background/70">
                {/* Partie texte */}
                <div className="flex flex-col justify-between p-4 sm:p-6">
                    <div className="space-y-2">
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-vwa-dark/55">
                            {event.subtitle ?? "Événement à venir"}
                        </p>
                        <h3 className="text-base sm:text-lg font-semibold text-vwa-dark leading-snug">
                            {event.title}
                        </h3>

                        <dl className="mt-3 space-y-1 text-xs text-vwa-dark/75">
                            <div className="flex items-center gap-2">
                                <span className="text-[13px]">📅</span>
                                <span>
                                    <dt className="sr-only">Date</dt>
                                    <dd>{event.date}</dd>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px]">⏰</span>
                                <span>
                                    <dt className="sr-only">Heure</dt>
                                    <dd>{event.time}</dd>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px]">📍</span>
                                <span>
                                    <dt className="sr-only">Lieu</dt>
                                    <dd>{event.location}</dd>
                                </span>
                            </div>
                        </dl>

                        <p className="mt-3 text-xs text-vwa-dark/70 leading-relaxed">
                            {event.shortDescription}
                        </p>
                    </div>

                    {/* CTA + bullets */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                        <Link
                            href={`/evenements/${event.slug}`}
                            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-vwa-primary/95 shadow-[0_14px_40px_rgba(7,68,82,0.35)] hover:bg-vwa-primary hover:shadow-[0_18px_50px_rgba(7,68,82,0.5)] active:scale-[0.97] transition-all"
                        >
                            Je m’inscris
                        </Link>

                        <div className="flex items-center gap-2">
                            {events.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setCurrent(index)}
                                    className={`h-2 rounded-full transition-all ${index === current
                                        ? "w-5 bg-vwa-primary"
                                        : "w-2 bg-vwa-dark/20 hover:bg-vwa-dark/40"
                                        }`}
                                    aria-label={`Afficher l’événement ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image côté droit */}
                <div className="relative min-h-[180px] sm:min-h-full bg-vwa-background">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 40vw, 100vw"
                        priority
                    />
                </div>
      article>
        </section>
    );
}


