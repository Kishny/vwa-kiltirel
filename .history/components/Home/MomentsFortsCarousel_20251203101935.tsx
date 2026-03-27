"use client";

import { useRef } from "react";

const moments = [
    { id: 1, label: "Atelier parents-enfants", tag: "Atelier créatif" },
    { id: 2, label: "Soirée contes & musique", tag: "Soirée" },
    { id: 3, label: "Pique-nique culturel", tag: "Plein air" },
];

function MomentCard({ label, tag }: { label: string; tag: string }) {
    return (
        <article className="card-neutral h-full px-4 py-3 flex flex-col justify-between">
            <p className="text-sm font-medium text-vwa-dark">{label}</p>
            <span className="mt-3 tag-pill">{tag}</span>
        </article>
    );
}

export default function MomentsFortsCarousel() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="mt-8">
            <h2 className="text-lg font-semibold text-vwa-dark mb-3">
                Moments forts
            </h2>

            {/* Desktop / tablette : 3 cartes fixes */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-4">
                {moments.map((m) => (
                    <MomentCard key={m.id} label={m.label} tag={m.tag} />
                ))}
            </div>

            {/* Mobile : carrousel horizontal swipe */}
            <div
                ref={containerRef}
                className="md:hidden flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
            >
                {moments.map((m) => (
                    <div
                        key={m.id}
                        className="snap-center min-w-[80%] max-w-[85%]"
                    >
                        <MomentCard label={m.label} tag={m.tag} />
                    </div>
                ))}
            </div>
        </section>
    );
}
