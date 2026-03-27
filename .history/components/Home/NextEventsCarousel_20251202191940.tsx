"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";

type EventItem = {
    id: number;
    type: string;
    title: string;
    date: string;
    time: string;
    location: string;
    badge: string;
    badgeColor: "green" | "accent" | "primary";
    slug: string;
};

const events: EventItem[] = [
    {
        id: 1,
        type: "SOIRÉE / RENCONTRE",
        title: "Soirée découverte Vwa Kiltirèl",
        date: "Samedi 14 mars 2026",
        time: "19h – 22h",
        location: "Tours Nord",
        badge: "Gratuit – sur inscription",
        badgeColor: "green",
        slug: "soiree-decouverte",
    },
    {
        id: 2,
        type: "ATELIER PARENTS-ENFANTS",
        title: "Création de bijoux en tissu wax",
        date: "Dimanche 29 mars 2026",
        time: "15h – 17h",
        location: "Maison de quartier, Tours",
        badge: "Atelier créatif",
        badgeColor: "accent",
        slug: "atelier-bijoux-wax",
    },
    {
        id: 3,
        type: "SORTIE PLEIN AIR",
        title: "Balade sonore & pique-nique",
        date: "Samedi 18 avril 2026",
        time: "10h – 16h",
        location: "Bord de Loire",
        badge: "En famille",
        badgeColor: "primary",
        slug: "balade-sonore",
    },
];

export default function NextEventsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const current = events[currentIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % events.length);
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    const goTo = (index: number) => {
        setCurrentIndex(index);
    };

    const badgeBg = {
        green: "bg-vwa-green/10 text-vwa-green",
        accent: "bg-vwa-accent/10 text-vwa-accent",
        primary: "bg-vwa-primary/10 text-vwa-primary",
    }[current.badgeColor];

    return (
        <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-vwa-dark">
                    Prochains événements
                </h2>
                <Link
                    href="/evenements"
                    className="text-xs font-medium text-vwa-primary hover:text-vwa-primary/80 underline-offset-4 hover:underline"
                >
                    Tout voir
                </Link>
            </div>

            <div className="relative">
                <div className="overflow-hidden rounded-3xl bg-white shadow-soft-card border border-black/5">
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={current.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="p-5 sm:p-6 flex flex-col gap-3"
                        >
                            <p className="text-[11px] tracking-[0.16em] uppercase text-vwa-dark/60">
                                {current.type}
                            </p>

                            <h3 className="text-sm sm:text-base font-semibold text-vwa-dark">
                                {current.title}
                            </h3>

                            <div className="flex flex-wrap gap-4 text-[12px] text-vwa-dark/80 mt-1">
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 text-vwa-primary" />
                                    <span>{current.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-vwa-primary" />
                                    <span>{current.time}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-vwa-primary" />
                                    <span>{current.location}</span>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span
                                    className={`inline-flex items-center rounded-pill px-3 py-1 text-[11px] font-medium ${badgeBg}`}
                                >
                                    {current.badge}
                                </span>

                                <Link href={`/evenements/${current.slug}`}>
                                    <Button variant="accent" size="sm">
                                        Je m’inscris
                                    </Button>
                                </Link>
                            </div>
                        </motion.article>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="mt-3 flex justify-center gap-2">
                    {events.map((event, index) => (
                        <button
                            key={event.id}
                            aria-label={`Aller à l'événement ${index + 1}`}
                            onClick={() => goTo(index)}
                            className={`h-1.5 rounded-full transition-all ${index === currentIndex
                                ? "w-5 bg-vwa-primary"
                                : "w-2 bg-vwa-dark/25 hover:bg-vwa-dark/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
