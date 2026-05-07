"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Sparkles,
} from "lucide-react";

type MomentTone = "atelier" | "soiree" | "pleinAir";

type MomentFort = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  tone: MomentTone;
  href: string;
};

const moments: MomentFort[] = [
  {
    id: 1,
    title: "Création de bijoux en tissu wax",
    category: "Atelier créatif",
    description:
      "Un atelier ludique pour créer ensemble des bijoux en tissu wax et découvrir les histoires derrière les motifs.",
    image: "/images/moments/atelier-parents-enfants.png",
    imageAlt:
      "Parent et enfant en train de créer ensemble lors d'un atelier.",
    tone: "atelier",
    href: "/evenements/creation-bijoux-tissu-wax",
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
    href: "/evenements/soiree-contes-musique",
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
    href: "/evenements/pique-nique-culturel",
  },
];

const AUTO_PLAY_DELAY = 7000;

function toneClasses(tone: MomentTone) {
  switch (tone) {
    case "atelier":
      return {
        tag: "bg-vwa-terracotta/10 text-vwa-terracotta",
        dot: "bg-vwa-terracotta",
        halo: "bg-vwa-terracotta/15",
        icon: <Sparkles className="h-3 w-3" />,
      };
    case "soiree":
      return {
        tag: "bg-vwa-blueSoft/10 text-vwa-blueSoft",
        dot: "bg-vwa-blueSoft",
        halo: "bg-vwa-blueSoft/15",
        icon: <Heart className="h-3 w-3" />,
      };
    case "pleinAir":
    default:
      return {
        tag: "bg-vwa-green/10 text-vwa-green",
        dot: "bg-vwa-green",
        halo: "bg-vwa-green/15",
        icon: <Sparkles className="h-3 w-3" />,
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
    <section className="mt-8 space-y-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2">
            <div className="h-px w-5 bg-gradient-to-r from-transparent to-vwa-accent/60" />
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-vwa-accent/70">
              Mémoire vivante
            </span>
            <div className="h-px w-5 bg-gradient-to-l from-transparent to-vwa-accent/60" />
          </div>
          <h2 className="text-xl font-bold text-vwa-dark">Moments forts</h2>
          <p className="mt-0.5 text-xs text-vwa-dark/55">
            Quelques instants qui racontent déjà l'âme de Vwa Kiltirèl
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-vwa-dark/10 bg-white text-vwa-dark/60 shadow-sm transition-all duration-300 hover:border-vwa-primary/30 hover:text-vwa-primary hover:shadow-md"
            aria-label="Moment précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-vwa-dark/10 bg-white text-vwa-dark/60 shadow-sm transition-all duration-300 hover:border-vwa-primary/30 hover:text-vwa-primary hover:shadow-md"
            aria-label="Moment suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMoment.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MomentCard moment={activeMoment} featured />
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-center gap-2">
          {moments.map((m, index) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-vwa-primary"
                  : "w-1.5 bg-vwa-dark/20 hover:bg-vwa-dark/40"
              }`}
              aria-label={`Aller au moment ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden gap-5 md:grid md:grid-cols-3">
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
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Link
        href={moment.href}
        aria-label={`Explorer ${moment.title}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-vwa-dark/8 bg-white/90 shadow-md transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-primary/40"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute -right-10 top-0 h-28 w-28 rounded-full blur-3xl opacity-60 ${tone.halo}`}
          />
        </div>

        <div
          className={`relative w-full overflow-hidden ${
            featured ? "h-56" : "h-48"
          }`}
        >
          <Image
            src={moment.image}
            alt={moment.imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className={`inline-flex h-2 w-2 rounded-full ${tone.dot}`} />
            <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
              {moment.category}
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-3 p-5">
          <div className="space-y-2">
            <h3
              className={`leading-snug text-vwa-dark ${
                featured ? "text-base font-bold" : "text-sm font-bold"
              }`}
            >
              {moment.title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-vwa-dark/65">
              {moment.description}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-vwa-dark/8 pt-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-medium ${tone.tag}`}
            >
              {tone.icon}
              Souvenir Vwa Kiltirèl
            </span>

            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-vwa-primary/80 transition-all duration-300 group-hover:gap-1.5 group-hover:text-vwa-primary">
              Explorer
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
