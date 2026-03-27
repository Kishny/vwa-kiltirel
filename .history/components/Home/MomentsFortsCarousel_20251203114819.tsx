"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type MomentTone = "atelier" | "soiree" | "pleinAir";

type MomentFort = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    imageAlt: string;
    tone: MomentTone;
};

const moments: MomentFort[] = [
    {
        id: 1,
        title: "Atelier parents-enfants",
        category: "Atelier créatif",
        description:
            "Un temps de création partagée pour renforcer les liens entre enfants et parents autour d’une activité artistique.",
        image: "/images/moments/atelier-parents-enfants.jpg",
        imageAlt: "Parent et enfant en train de créer ensemble lors d’un atelier.",
        tone: "atelier",
    },
    {
        id: 2,
        title: "Soirée contes & musique",
        category: "Soirée culturelle",
        description:
            "Un moment chaleureux pour écouter des contes, vibrer avec la musique et partager la culture orale afro-caribéenne.",
        image: "/images/moments/soiree-contes-musique.jpg",
        imageAlt: "Ambiance de soirée avec conteuse et musiciens.",
        tone: "soiree",
    },
    {
        id: 3,
        title: "Pique-nique culturel",
        category: "Plein air & bien-être",
        description:
            "Rencontre conviviale en extérieur, entre partages de saveurs, jeux, discussions et moments de respiration.",
        image: "/images/moments/pique-nique-culturel.png",
        imageAlt: "Familles réunies pour un pique-nique en plein air.",
        tone: "pleinAir",
    },
];

function toneClasses(tone: MomentTone) {
    switch (tone) {
        case "atelier":
            return {
                tag: "bg-vwa-terracotta/12 text-vwa-terracotta",
                dot: "bg-vwa-terracotta",
            };
        case "soiree":
            return {
                tag: "bg-vwa-blueSoft/12 text-vwa-blueSoft",
                dot: "bg-vwa-blueSoft",
            };
        case "pleinAir":
        default:
            return {
                tag: "bg-vwa-green/12 text-vwa-green",
                dot: "bg-vwa-green",
            };
    }
}

export default function MomentsFortsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    // rotation automatique sur mobile
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % moments.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const activeMoment = moments[activeIndex];

    return (
        <section className="mt-8">
            <header className="flex items-center justify-between gap-2 mb-3">
                <h2 className="text-lg font-semibold text-vwa-dark">Moments forts</h2>
            </header>

            {/* Mobile : 1 carte à la fois avec dots */}
            <div className="md:hidden">
                <MomentCard moment={activeMoment} />

                <div className="mt-3 flex justify-center gap-2">
                    {moments.map((m, index) => (
                        <button
                            key={m.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={[
                                "h-2.5 rounded-full transition-all duration-200",
                                index === activeIndex
                                    ? "w-5 bg-vwa-primary"
                                    : "w-2 bg-vwa-dark/20",
                            ].join(" ")}
                            aria-label={`Aller au moment ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop : 3 cartes côte à côte */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
                {moments.map((moment) => (
                    <MomentCard key={moment.id} moment={moment} />
                ))}
            </div>
        </section>
    );
}

function MomentCard({ moment }: { moment: MomentFort }) {
    const tone = toneClasses(moment.tone);

    return (
        <article
            className={[
                "group flex h-full flex-col overflow-hidden rounded-3xl bg-white border border-vwa-background",
                "shadow-[0_18px_45px_-26px_rgba(59,38,29,0.28)]",
                "transition-transform duration-300 pressable md:hover:-translate-y-[4px]",
            ].join(" ")}
        >
            {/* Image */}
            <div className="relative h-40 w-full overflow-hidden">
                <Image
                    src={moment.image}
                    alt={moment.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                {/* Tag sur l'image */}
                <div className="absolute left-3 bottom-3 flex items-center gap-2">
                    <span
                        className={[
                            "inline-flex h-2 w-2 rounded-full border border-white/80",
                            tone.dot,
                        ].join(" ")}
                    />
                    <span
                        className={[
                            "rounded-full px-3 py-1 text-[10px] font-medium backdrop-blur-sm",
                            "text-white bg-black/35",
                        ].join(" ")}
                    >
                        {moment.category}
                    </span>
                </div>
            </div>

            {/* Contenu texte */}
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-sm font-semibold text-vwa-dark">
                    {moment.title}
                </h3>
                <p className="text-xs text-vwa-dark/70">{moment.description}</p>

                <div className="mt-2 flex items-center justify-between">
                    <span
                        className={[
                            "inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium",
                            tone.tag,
                        ].join(" ")}
                    >
                        Souvenir Vwa Kiltirèl
                    </span>
                    <span className="text-[10px] text-vwa-dark/45">
                        + d&apos;événements à venir
                    </span>
                </div>
            </div>
        </article>
    );
}
