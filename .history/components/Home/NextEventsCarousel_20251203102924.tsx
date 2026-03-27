"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

const events = [
    {
        id: 1,
        type: "culture",
        badge: "Atelier parents-enfants",
        title: "Création de bijoux en tissu wax",
        date: "Dimanche 29 mars 2026",
        time: "15h – 17h",
        place: "Maison de quartier, Tours",
        tag: "Atelier créatif",
    },
    {
        id: 2,
        type: "familles",
        badge: "Soirée / rencontre",
        title: "Soirée contes & musique",
        date: "Vendredi 10 avril 2026",
        time: "19h – 22h",
        place: "Salle associative, Tours Nord",
        tag: "Familles",
    },
    {
        id: 3,
        type: "bienetre",
        badge: "Plein air & bien-être",
        title: "Pique-nique culturel",
        date: "Samedi 25 avril 2026",
        time: "11h – 15h",
        place: "Parc des Prébendes",
        tag: "Plein air",
    },
];

export default function NextEventsCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % events.length);
        }, 8000);
        return () => clearInterval(id);
    }, []);

    const current = events[index];

    return (
        <section className="mt-8">
            <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-lg font-semibold text-vwa-dark">
                    Prochains événements
                </h2>
                <button className="text-xs text-vwa-primary font-medium hover:underline">
                    Tout voir
                </button>
            </div>

            <div
                className={cn(
                    "card-soft px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-4 md:flex-row md:items-center",
                    current.type === "culture" && "card-culture",
                    current.type === "familles" && "card-familles",
                    current.type === "bienetre" && "card-bienetre"
                )}
            >
                <div className="flex-1 space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-vwa-dark/55">
                        {current.badge}
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold text-vwa-dark">
                        {current.title}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-xs text-vwa-dark/80">
                        <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-vwa-primary" />
                            {current.date}
                        </p>
                        <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-vwa-primary" />
                            {current.time}
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-vwa-primary" />
                            {current.place}
                        </p>
                    </div>

                    <div className="mt-3">
                        <span className="tag-pill">{current.tag}</span>
                    </div>
                </div>

                <div className="mt-3 md:mt-0 md:self-end">
                    <Button variant="accent" size="md">
                        Je m&apos;inscris
                    </Button>
                </div>
            </div>

            {/* Dots */}
            <div className="mt-3 flex justify-center gap-2">
                {events.map((evt, i) => (
                    <button
                        key={evt.id}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            i === index ? "w-5 bg-vwa-primary" : "w-2 bg-vwa-primary/25 pressable"
                        )}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </section>
    );
}
