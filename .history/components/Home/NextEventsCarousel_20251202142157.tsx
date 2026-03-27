"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";

type EventItem = {
    slug: string;
    title: string;
    category: string;
    date: string;
    time: string;
    location: string;
    isFree?: boolean;
};

const EVENTS: EventItem[] = [
    {
        slug: "soiree-decouverte-vwa-kiltirel",
        title: "Soirée découverte Vwa Kiltirèl",
        category: "Soirée / rencontre",
        date: "Samedi 14 mars 2026",
        time: "19h – 22h",
        location: "Tours Nord",
        isFree: true,
    },
    {
        slug: "atelier-parents-enfants-bijoux",
        title: "Atelier parents-enfants : création de bijoux",
        category: "Atelier créatif",
        date: "Dimanche 29 mars 2026",
        time: "15h – 17h",
        location: "Maison de quartier, Tours",
    },
    {
        slug: "brunch-mamans-reconnexion",
        title: "Brunch mamans & reconnexion",
        category: "Rencontre / bien-être",
        date: "Dimanche 8 février 2026",
        time: "11h – 14h",
        location: "Centre-ville de Tours",
    },
];

export default function NextEventsCarousel() {
    const [index, setIndex] = useState(0);

    // Auto défilement toutes les 6s
    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % EVENTS.length);
        }, 6000);

        return () => clearInterval(id);
    }, []);

    return (
        <section className="mt-2">
            <h2 className="text-lg font-semibold mb-3">Prochains événements</h2>

            <div className="relative overflow-hidden rounded-2xl">
                {/* Bandeau slider */}
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {EVENTS.map((event) => (
                        <div key={event.slug} className="min-w-full">
                            <article className="bg-white shadow-sm border border-slate-100 p-4 rounded-2xl flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] uppercase tracking-wide text-slate-500">
                                        {event.category}
                                    </span>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        {event.title}
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-1 text-xs text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarDays size={14} />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-1">
                                    {event.isFree ? (
                                        <span className="text-[11px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
                                            Gratuit
                                        </span>
                                    ) : (
                                        <span className="text-[11px] text-slate-500">
                                            Participation libre / cotisation
                                        </span>
                                    )}

                                    <Link
                                        href={`/evenements/${event.slug}`}
                                        className="text-xs px-3 py-2 rounded-full bg-slate-900 text-white"
                                    >
                                        Je m’inscris
                                    </Link>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>

                {/* Petits bullets de navigation */}
                <div className="flex justify-center gap-2 mt-3">
                    {EVENTS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 w-2 rounded-full transition ${i === index ? "bg-slate-900" : "bg-slate-300"
                                }`}
                            aria-label={`Aller à l’événement ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
