"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

type EventTone = "atelier" | "soiree" | "rencontre";

type NextEvent = {
    id: number;
    title: string;
    category: string;
    date: string;
    time: string;
    place: string;
    mention: string;
    ctaLabel: string;
    image: string;
    imageAlt: string;
    tone: EventTone;
};

const nextEvents: NextEvent[] = [
    {
        id: 1,
        category: "Rencontre / Bien-être",
        title: "Brunch mamans & reconnexion",
        date: "Dimanche 8 février 2026",
        time: "11h – 14h",
        place: "Centre-ville de Tours",
        mention: "Participation libre / cotisation",
        ctaLabel: "Je m'inscris",
        image: "/images/events/brunch-mamans.jpg",
        imageAlt: "Mamans et enfants autour d’une grande table de brunch.",
        tone: "rencontre",
    },
    {
        id: 2,
        category: "Soirée culturelle",
        title: "Soirée contes, musique & dégustation",
        date: "Samedi 14 mars 2026",
        time: "19h – 22h",
        place: "Quartier Nord – Tours",
        mention: "Gratuit sur inscription",
        ctaLabel: "Réserver ma place",
        image: "/images/events/soiree-contes-musique.png",
        imageAlt: "Ambiance chaleureuse de soirée avec conteuse et musiciens.",
        tone: "soiree",
    },
    {
        id: 3,
        category: "Atelier parents-enfants",
        title: "Création de bijoux en tissu wax",
        date: "Mercredi 2 avril 2026",
        time: "15h – 17h",
        place: "Maison de quartier, Tours",
        mention: "Atelier créatif – matériel fourni",
        ctaLabel: "Je participe",
        image: "/images/events/atelier-bijoux-wax.png",
        imageAlt: "Enfant et parent fabriquant un bijou en tissu coloré.",
        tone: "atelier",
    },
];

function toneClasses(tone: EventTone) {
    switch (tone) {
        case "atelier":
            return {
                tag: "bg-vwa-terracotta/12 text-vwa-terracotta",
                bullet: "bg-vwa-terracotta",
                border: "border-vwa-terracotta/22",
            };
        case "soiree":
            return {
                tag: "bg-vwa-blueSoft/12 text-vwa-blueSoft",
                bullet: "bg-vwa-blueSoft",
                border: "border-vwa-blueSoft/22",
            };
        case "rencontre":
        default:
            return {
                tag: "bg-vwa-green/12 text-vwa-green",
                bullet: "bg-vwa-green",
                border: "border-vwa-green/22",
            };
    }
}

export default function NextEventsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    // rotation automatique
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % nextEvents.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const activeEvent = nextEvents[activeIndex];

    return (
        <section className="mt-6 space-y-4">
            <header className="flex items-center justify-between gap-2">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-vwa-dark/55">
                        Agenda
                    </p>
                    <h2 className="text-lg font-semibold text-vwa-dark">
                        Prochains événements
                    </h2>
                </div>
                <button
                    type="button"
                    className="hidden text-[11px] font-medium text-vwa-primary/85 underline-offset-2 hover:underline md:inline-flex"
                >
                    Tout voir
                </button>
            </header>

            {/* Carte principale : texte à gauche, image à droite (sur desktop) */}
            <EventCard event={activeEvent} />

            {/* Bullets de navigation */}
            <div className="mt-3 flex justify-center gap-2">
                {nextEvents.map((event, index) => {
                    const tone = toneClasses(event.tone);
                    const isActive = index === activeIndex;
                    return (
                        <button
                            key={event.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={[
                                "h-2.5 rounded-full transition-all duration-200",
                                isActive
                                    ? `w-5 ${tone.bullet}`
                                    : "w-2 bg-vwa-dark/20",
                            ].join(" ")}
                            aria-label={`Aller à l'événement ${index + 1}`}
                        />
                    );
                })}
            </div>
        </section>
    );
}

function EventCard({ event }: { event: NextEvent }) {
    const tone = toneClasses(event.tone);

    return (
        <article
            className={[
                "group relative overflow-hidden rounded-3xl bg-white/95 border backdrop-blur-sm",
                "shadow-[0_22px_60px_-30px_rgba(59,38,29,0.45)]",
                "transition-transform duration-300 pressable md:hover:-translate-y-[4px]",
                tone.border,
            ].join(" ")}
        >
            {/* halo */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-vwa-background opacity-70 blur-3xl" />

            <div className="relative flex flex-col md:flex-row">
                {/* Colonne texte (gauche) */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span
                            className={[
                                "inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium",
                                tone.tag,
                            ].join(" ")}
                        >
                            {event.category}
                        </span>
                    </div>

                    <h3 className="text-base font-semibold text-vwa-dark">
                        {event.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-vwa-dark/80">
                        <p className="flex items-center gap-2">
                            <CalendarDays className="h-3.5 w-3.5 text-vwa-primary" />
                            <span>{event.date}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <Clock3 className="h-3.5 w-3.5 text-vwa-primary" />
                            <span>{event.time}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-vwa-primary" />
                            <span>{event.place}</span>
                        </p>
                    </div>

                    <p className="mt-2 text-[11px] text-vwa-dark/70">{event.mention}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2 text-xs font-medium text-white shadow-[0_14px_32px_-18px_rgba(29,91,107,0.95)] transition-transform duration-200 md:hover:-translate-y-[1px] pressable"
                        >
                            {event.ctaLabel}
                        </button>
                        <span className="hidden text-[11px] text-vwa-dark/55 sm:inline">
                            Places limitées • inscription recommandée
                        </span>
                    </div>
                </div>

                {/* Colonne image (droite) */}
                <div className="relative h-40 w-full overflow-hidden border-t border-vwa-background md:h-auto md:w-64 md:border-t-0 md:border-l">
                    <Image
                        src={event.image}
                        alt={event.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 260px, (min-width: 768px) 240px, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                    <div className="absolute right-3 bottom-3 rounded-full bg-black/35 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                        Prochain rendez-vous Vwa Kiltirèl
                    </div>
                </div>
            </div>
        </article>
    );
}

