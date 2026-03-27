"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import { associationEvents } from "@/components/events/eventsData";

export default function NextEventsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    // auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % associationEvents.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const currentEvent = associationEvents[activeIndex];

    return (
        <section className="mt-8 space-y-3">
            <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-semibold text-vwa-dark">
                    Prochains événements
                </h2>

                <Link
                    href="/evenements"
                    className="text-xs font-medium text-vwa-primary underline-offset-4 hover:text-vwa-terracotta hover:underline"
                >
                    Tout voir
                </Link>
            </div>

            {/* Card / carrousel */}
            <div className="overflow-hidden rounded-3xl bg-white/90 shadow-lg shadow-vwa-dark/5 ring-1 ring-vwa-background/80">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {associationEvents.map((event) => (
                        <article
                            key={event.id}
                            className="min-w-full flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-stretch"
                        >
                            {/* Colonne gauche : texte */}
                            <div className="flex-1 space-y-3">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vwa-dark/70">
                                    {event.categoryLabel}
                                </p>

                                <h3 className="text-base font-semibold text-vwa-dark leading-snug">
                                    {event.title}
                                </h3>

                                <div className="space-y-1 text-xs text-vwa-dark/80">
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

                                <p className="text-xs leading-relaxed text-vwa-dark/70">
                                    {event.description}
                                </p>

                                <div className="mt-2 flex items-center gap-3">
                                    <span className="inline-flex items-center rounded-full bg-vwa-background px-3 py-1 text-[11px] font-medium text-vwa-primary">
                                        {event.tag}
                                    </span>

                                    <Link href={`/evenements#${event.id}`}>
                                        <Button variant="primary" size="sm">
                                            Je m&apos;inscris
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Colonne droite : visuel */}
                            <div className="relative mt-3 h-40 w-full overflow-hidden rounded-2xl bg-vwa-background md:mt-0 md:h-auto md:w-52 lg:w-64">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    priority={event.id === currentEvent.id}
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                />
                                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                            </div>
                        </article>
                    ))}
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 px-4 pb-3 pt-1">
                    {associationEvents.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`h-1.5 rounded-full transition-all ${index === activeIndex
                                ? "w-5 bg-vwa-primary"
                                : "w-2 bg-vwa-primary/25 hover:bg-vwa-primary/50"
                                }`}
                            aria-label={`Aller à l’événement ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


