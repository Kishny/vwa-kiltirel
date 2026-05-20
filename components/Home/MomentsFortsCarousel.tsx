"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Music,
  Sparkles,
  Utensils,
  Users,
  Mail,
  CalendarDays,
} from "lucide-react";

type TempsFort = {
  id: number;
  title: string;
  period: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  icon: React.ReactNode;
  accentClass: string;
  dotClass: string;
  haloClass: string;
};

const tempsForts: TempsFort[] = [
  {
    id: 1,
    title: "Racines & Vibrations",
    period: "Février 2027",
    category: "Soirée culturelle",
    description:
      "Un temps fort pour mettre en lumière les cultures afro-créoles à travers la musique, la rencontre et le partage.",
    image: "/images/evenements/racines.png",
    imageAlt: "Ambiance musicale lors d'une soirée culturelle afro-créole.",
    href: "/evenements/racines-vibrations",
    icon: <Music className="h-3.5 w-3.5" />,
    accentClass: "bg-vwa-blueSoft/10 text-vwa-blueSoft",
    dotClass: "bg-vwa-blueSoft",
    haloClass: "bg-vwa-blueSoft/15",
  },
  {
    id: 2,
    title: "Lang & Tambour",
    period: "Mars / Avril 2027",
    category: "Ateliers jeunesse",
    description:
      "Des ateliers culturels pour sensibiliser les 12–25 ans à la langue, aux rythmes, aux récits et à l'expression créole.",
    image: "/images/evenements/lang.png",
    imageAlt: "Jeunes participant à un atelier de langue et de percussions créoles.",
    href: "/evenements/lang-tambour",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    accentClass: "bg-vwa-terracotta/10 text-vwa-terracotta",
    dotClass: "bg-vwa-terracotta",
    haloClass: "bg-vwa-terracotta/15",
  },
  {
    id: 3,
    title: "Saveurs & Savoirs",
    period: "Juin 2027",
    category: "Journée gastronomique",
    description:
      "Une journée autour de la cuisine, des traditions orales, des savoir-faire familiaux et de la transmission culturelle.",
    image: "/images/evenements/saveur.png",
    imageAlt: "Familles réunies autour d'un moment de partage gastronomique et culturel.",
    href: "/evenements/saveurs-savoirs",
    icon: <Utensils className="h-3.5 w-3.5" />,
    accentClass: "bg-vwa-green/10 text-vwa-green",
    dotClass: "bg-vwa-green",
    haloClass: "bg-vwa-green/15",
  },
  {
    id: 4,
    title: "Souvenirs & Vibrations",
    period: "Décembre 2027",
    category: "Soirée intergénérationnelle",
    description:
      "Un événement de clôture pour rassembler toutes les générations autour d'un moment culturel, festif et inclusif.",
    image: "/images/evenements/vibrations.png",
    imageAlt: "Soirée intergénérationnelle festive et inclusive de Vwa Kiltirèl.",
    href: "/evenements/souvenirs-vibrations",
    icon: <Users className="h-3.5 w-3.5" />,
    accentClass: "bg-vwa-accent/10 text-vwa-accent",
    dotClass: "bg-vwa-accent",
    haloClass: "bg-vwa-accent/15",
  },
];

export default function MomentsFortsCarousel() {
  return (
    <section className="mt-8 space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2">
          <div className="h-px w-5 bg-gradient-to-r from-transparent to-vwa-accent/60" />
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-vwa-accent/70">
            Programmation prévisionnelle 2027
          </span>
          <div className="h-px w-5 bg-gradient-to-l from-transparent to-vwa-accent/60" />
        </div>

        <h2 className="text-xl font-bold text-vwa-dark">Nos temps forts 2027</h2>

        <p className="max-w-2xl text-xs leading-relaxed text-vwa-dark/60">
          Vwa Kiltirèl prépare une programmation culturelle et conviviale pour 2027 : soirées,
          ateliers, rencontres, projets mémoire et moments festifs autour des cultures
          afro-créoles, caribéennes et guyanaises.
        </p>
      </header>

      {/* Grille des 4 cartes */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tempsForts.map((temps, idx) => (
          <motion.div
            key={temps.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="h-full"
          >
            <Link
              href={temps.href}
              aria-label={`Découvrir ${temps.title}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-vwa-dark/8 bg-white/90 shadow-md transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-primary/40"
            >
              {/* Halo décoratif */}
              <div className="pointer-events-none absolute inset-0">
                <div
                  className={`absolute -right-10 top-0 h-28 w-28 rounded-full blur-3xl opacity-60 ${temps.haloClass}`}
                />
              </div>

              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={temps.image}
                  alt={temps.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Badge période */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className={`inline-flex h-2 w-2 rounded-full ${temps.dotClass}`} />
                  <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    {temps.period}
                  </span>
                </div>

                {/* Badge préviewi */}
                <div className="absolute right-3 top-3 rounded-full bg-vwa-accent/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                  Prévu
                </div>
              </div>

              {/* Contenu */}
              <div className="relative z-10 flex flex-1 flex-col gap-3 p-4">
                <div className="space-y-1.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-medium ${temps.accentClass}`}
                  >
                    {temps.icon}
                    {temps.category}
                  </span>

                  <h3 className="text-sm font-bold leading-snug text-vwa-dark">
                    {temps.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-relaxed text-vwa-dark/60">
                    {temps.description}
                  </p>
                </div>

                {/* Pied de carte */}
                <div className="mt-auto flex items-center justify-between border-t border-vwa-dark/8 pt-3">
                  <span className="inline-flex items-center gap-1 text-[10px] text-vwa-dark/45">
                    <CalendarDays className="h-3 w-3" />
                    {temps.period}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-vwa-primary/80 transition-all duration-300 group-hover:gap-1.5 group-hover:text-vwa-primary">
                    En savoir plus
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mention prévisionnelle */}
      <p className="text-center text-[10px] text-vwa-dark/40 italic">
        Programmation prévisionnelle 2027 — Les dates exactes, lieux et modalités seront confirmés progressivement.
      </p>

      {/* Boutons d'action */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/evenements"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <CalendarDays className="h-4 w-4" />
          Voir la programmation 2027
        </Link>

        <a
          href="#newsletter-title"
          className="inline-flex items-center gap-2 rounded-full border border-vwa-dark/15 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition-all duration-300 hover:border-vwa-primary/30 hover:text-vwa-primary hover:shadow-md"
        >
          <Mail className="h-4 w-4" />
          Recevoir les prochaines annonces
        </a>
      </div>
    </section>
  );
}
