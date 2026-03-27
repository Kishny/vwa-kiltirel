"use client";

import { useRef } from "react";

const moments = [
    { id: 1, label: "Atelier parents-enfants", tag: "Atelier créatif" },
    { id: 2, label: "Soirée contes & musique", tag: "Soirée" },
    { id: 3, label: "Pique-nique culturel", tag: "Plein air" },
    { id: 4, label: "Cercles de parole mamans", tag: "Rencontre" },
];

export default function MomentsFortsCarousel() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="mt-6">
            <h2 className="text-lg font-semibold text-vwa-dark mb-3">
                Moments forts
            </h2>
            <div
                ref={containerRef}
                className="flex gap-3 overflow-x-auto no-scrollbar pb-2"
            >
                {moments.map((moment) => (
                    <article
                        key={moment.id}
                        className="min-w-[140px] sm:min-w-[160px] rounded-2xl bg-white border border-black/5 shadow-sm px-4 py-3 flex flex-col justify-between hover:shadow-soft-card hover:-translate-y-0.5 transition"
                    >
                        <p className="text-xs font-medium text-vwa-dark">
                            {moment.label}
                        </p>
                        <span className="mt-2 inline-flex w-fit rounded-pill bg-vwa-primary/8 px-2 py-0.5 text-[11px] text-vwa-primary">
                            {moment.tag}
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}
