"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Button from "@/components/ui/button";

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

    useEffect(() => {
        const id = setInterval(
            () => setIndex((prev) => (prev + 1) % EVENTS.length),
            6000
        );
        return () => clearInterval(id);
    }, []);

    const current = EVENTS[index];

    return (
        <section className="mt-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-vwa-dark">
                    Prochains événements
                </h2>
                <Link
                    href="/evenements"
                    className="text-[11px] text-vwa-primary underline-offset-2 hover:underline"
                >
                    Tout voir
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-vwa-background shadow-sm p-4 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-wide text-vwa-accent">
                        {current.category}
                    </span>
                    <h3 className="text-sm font-semibold text-vwa-dark">
                        {current.title}
                    </h3>
                </div>

                <div className="flex flex-col gap-1 text-xs text-vwa-dark/80">
                    <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-vwa-primary" />
                        <span>{current.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-vwa-primary" />
                        <span>{current.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-vwa-primary" />
                        <span>{current.location}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                    {current.isFree ? (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-vwa-green/10 text-vwa-green">
                            Gratuit – sur inscription
                        </span>
                    ) : (
                        <span className="text-[11px] text-vwa-dark/60">
                            Participation libre / cotisation
                        </span>
                    )}

                    <Link href={`/evenements/${current.slug}`}>
                        <Button variant="accent" size="sm">
                            Je m’inscris
                        </Button>
                    </Link>
                </div>

                <div className="flex justify-center gap-2 mt-1">
                    {EVENTS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 w-2 rounded-full transition ${i === index ? "bg-vwa-primary" : "bg-vwa-background"
                                }`}
                            aria-label={`Aller à l’événement ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
