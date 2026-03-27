// components/Home/MomentsFortsCarousel.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

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
    image: "/images/moments/atelier-parents-enfants.png",
    imageAlt:
      "Parent et enfant en train de créer ensemble lors d’un atelier.",
    tone: "atelier",
  },
  {
    id: 2,
    title: "Soirée contes & musique",
    category: "Soirée culturelle",
    description:
      "Un moment chaleureux pour écouter des contes, vibrer avec la musique et partager la culture orale afro-caribéenne.",
    image: "/images/moments/soiree-contes-musique.png",
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

const AUTO_PLAY_DELAY = 7000;

function toneClasses(tone: MomentTone) {
  switch (tone) {
    case "atelier":
      return {
        tag: "bg-vwa-terracotta/12 text-vwa-terracotta",
        dot: "bg-vwa-terracotta",
        halo: "bg-vwa-terracotta/15",
      };
    case "soiree":
      return {
        tag: "bg-vwa-blueSoft/12 text-vwa-blueSoft",
        dot: "bg-vwa-blueSoft",
        halo: "bg-vwa-blueSoft/15",
      };
    case "pleinAir":
    default:
      return {
        tag: "bg-vwa-green/12 text-vwa-green",
        dot: "bg-vwa-green",
        halo: "bg-vwa-green/15",
      };
  }
}

export default function MomentsFortsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (moments.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % moments.length);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(timer);
  }, []);

  const activeMoment = moments[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + moments.length) % moments.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % moments.length);
  };

  return (
    <section className="mt-8 space-y-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-vwa-dark">Moments forts</h2>
          <p className="mt-0.5 text-[11px] text-vwa-dark/55">
            Quelques instants qui racontent déjà l’âme de Vwa Kiltirèl
          </p>
        </div>

        {/* Contrôles mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-vwa-background bg-white text-vwa-dark/70 shadow-sm transition hover:border-vwa-dark/20 hover:text-vwa-dark"
            aria-label="Moment précédent"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-vwa-background bg-white text-vwa-dark/70 shadow-sm transition hover:border-vwa-dark/20 hover:text-vwa-dark"
            aria-label="Moment suivant"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile : 1 carte immersive */}
      <div className="md:hidden">
        <MomentCard moment={activeMoment} featured />

        <div className="mt-3 flex justify-center gap-2">
          {moments.map((m, index) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-6 bg-vwa-primary"
                  : "w-2 bg-vwa-dark/20 hover:bg-vwa-dark/40",
              ].join(" ")}
              aria-label={`Aller au moment ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop : 3 cartes premium */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {moments.map((moment) => (
          <MomentCard key={moment.id} moment={moment} />
        ))}
      </div>
    </section>
  );
}

function MomentCard({
  moment,
  featured = false,
}: {
  moment: MomentFort;
  featured?: boolean;
}) {
  const tone = toneClasses(moment.tone);

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/95 border border-vwa-background/85",
        "shadow-[0_18px_50px_rgba(28,22,18,0.12)]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,22,18,0.18)]",
      ].join(" ")}
    >
      {/* Halo */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -right-10 top-0 h-28 w-28 rounded-full blur-3xl opacity-70 ${tone.halo}`}
        />
      </div>

      {/* Image */}
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "h-52" : "h-44"
        }`}
      >
        <Image
          src={moment.image}
          alt={moment.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Tag image */}
        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <span
            className={[
              "inline-flex h-2.5 w-2.5 rounded-full border border-white/80",
              tone.dot,
            ].join(" ")}
          />
          <span className="rounded-full px-3 py-1 text-[10px] font-medium text-white bg-black/35 backdrop-blur-sm">
            {moment.category}
          </span>
        </div>
      </div>

      {/* Texte */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-2">
          <h3
            className={`font-semibold text-vwa-dark leading-snug ${
              featured ? "text-base" : "text-sm"
            }`}
          >
            {moment.title}
          </h3>

          <p className="text-xs text-vwa-dark/70 leading-relaxed">
            {moment.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span
            className={[
              "inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium",
              tone.tag,
            ].join(" ")}
          >
            Souvenir Vwa Kiltirèl
          </span>

          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-vwa-primary/85">
            Explorer
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
