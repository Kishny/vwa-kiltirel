"use client";

import { useState } from "react";
import {
    Sparkles,
    Users,
    Palette,
    HeartHandshake,
    ChevronDown,
} from "lucide-react";

type ValueTone = "culture" | "liens" | "patrimoine" | "cohesion";

const values = [
    {
        id: 1,
        title: "Promouvoir les cultures créoles & afro-descendantes",
        short: "Mettre en lumière les héritages caribéens, créoles et afro-descendants.",
        description:
            "À travers l’art, la musique, la danse, les traditions, les langues et la gastronomie, Vwa Kiltirèl crée des espaces où les cultures afro-caribéennes sont célébrées, racontées et transmises.",
        icon: Sparkles,
        tone: "culture" as ValueTone,
        tag: "Cultures & héritages",
    },
    {
        id: 2,
        title: "Créer des liens intergénérationnels & interculturels",
        short:
            "Faire se rencontrer les générations, les histoires et les origines.",
        description:
            "Nous imaginons des moments où enfants, parents, grands-parents et voisins se retrouvent, partagent leurs mémoires et construisent un vivre-ensemble ancré dans le respect et la curiosité.",
        icon: Users,
        tone: "liens" as ValueTone,
        tag: "Transmission & rencontres",
    },
    {
        id: 3,
        title: "Valoriser le patrimoine culturel, artistique & gastronomique",
        short: "Mettre en avant les artistes, les savoir-faire et les saveurs.",
        description:
            "Expositions, performances, ateliers culinaires, mise en avant d’artistes locaux… Vwa Kiltirèl soutient la création vivante et le patrimoine qui font battre le cœur de nos cultures.",
        icon: Palette,
        tone: "patrimoine" as ValueTone,
        tag: "Patrimoine vivant",
    },
    {
        id: 4,
        title: "Favoriser la cohésion sociale par la culture",
        short:
            "Utiliser la culture comme levier d’inclusion et d’éducation populaire.",
        description:
            "Nos actions sont pensées pour être accessibles, inclusives et ancrées sur le terrain, afin que chaque personne puisse trouver sa place, s’exprimer, apprendre et contribuer.",
        icon: HeartHandshake,
        tone: "cohesion" as ValueTone,
        tag: "Cohésion & éducation",
    },
];

const objectives = [
    {
        id: 1,
        title: "Organiser des événements culturels",
        description:
            "Expositions, festivals, ateliers, soirées à thème, concerts, rencontres artistiques et temps forts festifs ouverts à tous.",
    },
    {
        id: 2,
        title: "Développer des actions éducatives & artistiques",
        description:
            "Interventions dans les écoles, associations et quartiers pour sensibiliser à l’histoire, aux cultures afro-descendantes et aux arts.",
    },
    {
        id: 3,
        title: "Soutenir la création locale",
        description:
            "Accompagner, programmer et valoriser les artistes, collectifs et initiatives culturelles du territoire.",
    },
    {
        id: 4,
        title: "Contribuer à la transmission des savoirs",
        description:
            "Mettre en lumière la gastronomie, les traditions orales, les langues, les rites, les gestes et les mémoires qui font notre richesse.",
    },
];

function toneClasses(tone: ValueTone) {
    switch (tone) {
        case "culture":
            return {
                dot: "bg-vwa-terracotta",
                border: "border-vwa-terracotta/20",
                shadow:
                    "shadow-[0_18px_45px_-26px_rgba(196,75,52,0.55)] md:hover:shadow-[0_22px_55px_-28px_rgba(196,75,52,0.75)]",
                tag: "bg-vwa-terracotta/10 text-vwa-terracotta",
            };
        case "liens":
            return {
                dot: "bg-vwa-green",
                border: "border-vwa-green/18",
                shadow:
                    "shadow-[0_18px_45px_-26px_rgba(75,122,61,0.4)] md:hover:shadow-[0_22px_55px_-28px_rgba(75,122,61,0.65)]",
                tag: "bg-vwa-green/10 text-vwa-green",
            };
        case "patrimoine":
            return {
                dot: "bg-vwa-blueSoft",
                border: "border-vwa-blueSoft/20",
                shadow:
                    "shadow-[0_18px_45px_-26px_rgba(47,113,136,0.45)] md:hover:shadow-[0_22px_55px_-28px_rgba(47,113,136,0.7)]",
                tag: "bg-vwa-blueSoft/10 text-vwa-blueSoft",
            };
        case "cohesion":
        default:
            return {
                dot: "bg-vwa-accent",
                border: "border-vwa-accent/20",
                shadow:
                    "shadow-[0_18px_45px_-26px_rgba(199,140,59,0.45)] md:hover:shadow-[0_22px_55px_-28px_rgba(199,140,59,0.7)]",
                tag: "bg-vwa-accent/10 text-vwa-accent",
            };
    }
}

export default function ValeursSection() {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <section className="mt-10 space-y-6">
            <header className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.24em] text-vwa-dark/55">
                    Nos valeurs
                </p>
                <h2 className="text-xl font-semibold text-vwa-dark">
                    Ce que porte Vwa Kiltirèl
                </h2>
                <p className="text-sm text-vwa-dark/75 max-w-xl mt-1">
                    Une association ancrée dans les cultures afro-descendantes, tournée
                    vers la transmission, la création et le vivre-ensemble à Tours.
                </p>
            </header>

            {/* Cartes de valeurs */}
            <div className="grid gap-4 md:grid-cols-2">
                {values.map((value) => {
                    const Icon = value.icon;
                    const tone = toneClasses(value.tone);

                    const isOpen = openId === value.id;

                    return (
                        <article
                            key={value.id}
                            className={[
                                "relative overflow-hidden rounded-3xl bg-white/95 border backdrop-blur-sm",
                                "transition-transform duration-300 pressable",
                                "md:hover:-translate-y-[4px]",
                                tone.border,
                                tone.shadow,
                            ].join(" ")}
                        >
                            {/* halo coloré */}
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-vwa-background opacity-60 blur-2xl" />

                            <div className="relative flex flex-col gap-3 p-4 sm:p-5">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={[
                                            "flex h-10 w-10 items-center justify-center rounded-2xl bg-vwa-background/60",
                                            "shadow-[0_8px_18px_-10px_rgba(0,0,0,0.25)]",
                                        ].join(" ")}
                                    >
                                        <Icon className="h-5 w-5 text-vwa-dark" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={[
                                                    "inline-flex h-2 w-2 rounded-full",
                                                    tone.dot,
                                                ].join(" ")}
                                            />
                                            <span
                                                className={[
                                                    "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                                                    "bg-vwa-background text-vwa-dark/70",
                                                ].join(" ")}
                                            >
                                                {value.tag}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-vwa-dark">
                                            {value.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-xs text-vwa-dark/75">{value.short}</p>

                                {/* Bouton / accordéon par carte */}
                                <button
                                    type="button"
                                    onClick={() => setOpenId(isOpen ? null : value.id)}
                                    className="mt-1 inline-flex items-center gap-2 text-[11px] font-medium text-vwa-primary pressable"
                                >
                                    <span>{isOpen ? "Réduire" : "En savoir plus"}</span>
                                    <ChevronDown
                                        className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`grid transition-all duration-250 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="mt-2 text-[11px] leading-relaxed text-vwa-dark/80">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Accordéon global "Objectifs concrets" */}
            <div className="mt-4 rounded-3xl border border-vwa-dark/5 bg-white/70 p-4 shadow-[0_18px_45px_-26px_rgba(59,38,29,0.35)]">
                <h3 className="text-sm font-semibold text-vwa-dark mb-2">
                    Nos objectifs concrets
                </h3>
                <p className="text-xs text-vwa-dark/70 mb-3">
                    Derrière chaque valeur, des actions très concrètes pour faire vivre la
                    culture, la transmission et la cohésion sociale à Tours.
                </p>

                <ObjectivesAccordion />
            </div>
        </section>
    );
}

function ObjectivesAccordion() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="divide-y divide-vwa-background">
            {objectives.map((obj, index) => {
                const isOpen = open === obj.id;
                return (
                    <div key={obj.id} className="py-2">
                        <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : obj.id)}
                            className="flex w-full items-center justify-between gap-3 text-left pressable"
                        >
                            <span className="text-xs font-medium text-vwa-dark">
                                {obj.title}
                            </span>
                            <ChevronDown
                                className={`h-3.5 w-3.5 text-vwa-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div
                            className={`grid transition-all duration-250 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <p className="mt-1 text-[11px] text-vwa-dark/75">
                                    {obj.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
