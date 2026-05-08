"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
  GlobeAltIcon,
  MapPinIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const bureau = [
  {
    role: "Présidente",
    name: "Maud ARON",
    desc: "Pilote la dynamique globale de l’association avec une vision humaine, culturelle et fédératrice.",
    image: "/images/bureau/maud-aron.png",
    level: "main",
  },
  {
    role: "Co-président",
    name: "Jean VOLCY",
    desc: "Contribue à la stratégie, au développement des projets et à l’identité numérique de Vwa Kiltirèl.",
    image: "/images/bureau/jean-volcy.png",
    level: "main",
  },
  {
    role: "Trésorier",
    name: "Joseph ABENA",
    desc: "Veille à la bonne gestion financière et à la solidité des actions portées par l’association.",
    image: "/images/bureau/joseph-abena.png",
    level: "main",
  },
  {
    role: "Trésorier adjoint",
    name: "Thiery GASPARD",
    desc: "Assiste le trésorier dans la gestion financière, le suivi des comptes et la structuration budgétaire de l’association.",
    image: "/images/bureau/thiery-gaspard.png",
    level: "secondary",
  },
  {
    role: "Secrétaire générale",
    name: "Stessy ARON VOLCY",
    desc: "Assure l’organisation administrative, le suivi et la fluidité des échanges internes.",
    image: "/images/bureau/stessy-aron.png",
    level: "main",
  },
] as const;

const valeurs = [
  {
    title: "Transmission",
    text: "Préserver et faire circuler les héritages culturels afro-descendants, créoles et caribéens à travers des expériences vivantes.",
    icon: SparklesIcon,
    color: "vwa-accent",
  },
  {
    title: "Lien humain",
    text: "Créer des espaces où les générations, les familles, les artistes et les publics se rencontrent réellement.",
    icon: HeartIcon,
    color: "vwa-primary",
  },
  {
    title: "Collectif",
    text: "Faire émerger des projets qui se construisent avec les autres, jamais à distance des réalités humaines et locales.",
    icon: UserGroupIcon,
    color: "vwa-terracotta",
  },
  {
    title: "Ouverture",
    text: "Valoriser une culture enracinée et vivante, tout en restant ouverte au dialogue, au partage et à la création contemporaine.",
    icon: GlobeAltIcon,
    color: "vwa-blueSoft",
  },
];

const timeline = [
  {
    year: "2025",
    title: "Naissance de Vwa Kiltirèl",
    text: "Création de l’association avec une volonté claire : faire vibrer les cultures afro-caribéennes à Tours à travers des événements, ateliers et moments de transmission.",
  },
  {
    year: "2025",
    title: "Premiers formats & premières rencontres",
    text: "Mise en place des premiers événements, expérimentation de formats intimistes, familiaux et culturels.",
  },
  {
    year: "2026",
    title: "Structuration de l’identité",
    text: "Développement d’une présence digitale, clarification de la ligne artistique et culturelle, et montée en qualité de l’expérience proposée.",
  },
  {
    year: "À venir",
    title: "Déploiement de nouveaux projets",
    text: "Développement de partenariats, programmation enrichie, médiathèque, adhésion, dons et parcours membres plus complets.",
  },
];

const reperes = [
  { value: "Tours", label: "Ancrage territorial", icon: MapPinIcon },
  { value: "5", label: "Membres du bureau", icon: UserGroupIcon },
  { value: "Afro-caribéen", label: "Univers culturel", icon: GlobeAltIcon },
  { value: "Humain", label: "Esprit du projet", icon: HeartIcon },
];

function bureauCardStyles(level: "main" | "secondary") {
  if (level === "main") {
    return {
      badge:
        "bg-gradient-to-r from-vwa-dark to-vwa-primary text-white border-none",
      ring: "ring-vwa-accent/40",
      glow: "bg-vwa-accent/12",
      label: "Membre principal",
      gradient: "from-vwa-primary/5 to-vwa-accent/5",
    };
  }

  return {
    badge: "bg-white/80 text-vwa-dark border border-vwa-dark/10",
    ring: "ring-vwa-primary/25",
    glow: "bg-vwa-primary/10",
    label: "Fonction d’appui",
    gradient: "from-vwa-background to-white",
  };
}

// Composant d'animation section
const SectionWrapper = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function AssociationPageClient() {
  return (
    <>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ==================== HERO SECTION PREMIUM ==================== */}
        <SectionWrapper>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-vwa-background/30 shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-vwa-accent/8 blur-3xl" />
              <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-vwa-primary/8 blur-3xl" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] p-8 lg:p-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
                  <span className="text-[11px] font-medium tracking-[0.25em] text-vwa-accent/80 uppercase">
                    L'association
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-vwa-dark">
                  Une association culturelle
                  <span className="block text-vwa-primary/70 mt-2">
                    pensée pour transmettre, relier et faire vibrer
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-vwa-dark/70 leading-relaxed max-w-xl">
                  Vwa Kiltirèl est une association culturelle et événementielle
                  basée à Tours, créée pour mettre en lumière les cultures afro
                  & afro-descendantes, créoles et caribéennes à travers des
                  expériences sensibles, humaines et exigeantes.
                </p>

                <p className="text-sm text-vwa-dark/60 leading-relaxed max-w-xl">
                  Plus qu'une programmation, nous construisons des espaces de
                  rencontre, de mémoire, de fête, de transmission et de
                  création.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/evenements"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Voir les événements
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/devenir-membre"
                    className="inline-flex items-center gap-2 rounded-full border border-vwa-dark/15 bg-white px-6 py-3 text-sm font-medium text-vwa-dark/80 shadow-sm transition-all duration-300 hover:border-vwa-primary/40 hover:bg-vwa-primary/5 hover:text-vwa-primary"
                  >
                    Devenir membre
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  {reperes.map((item) => (
                    <div
                      key={item.label}
                      className="group rounded-xl border border-vwa-dark/8 bg-white/80 p-3 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                    >
                      <item.icon className="h-5 w-5 text-vwa-accent mx-auto mb-2 transition-transform group-hover:scale-110" />
                      <p className="text-lg font-bold text-vwa-dark">
                        {item.value}
                      </p>
                      <p className="text-[10px] font-medium text-vwa-dark/50 uppercase tracking-wide">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[300px] lg:h-auto rounded-2xl overflow-hidden">
                <Image
                  src="/images/actualites/cover-1.png"
                  alt="Vwa Kiltirèl - Association culturelle à Tours"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-[10px] font-medium text-white/90">
                  Tours • Culture • Transmission
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ==================== MISSION & VISION ==================== */}
        <div className="grid gap-6 lg:grid-cols-2 mt-12">
          <SectionWrapper delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-vwa-background/20 p-8 shadow-lg border border-vwa-dark/8 hover:shadow-xl transition-all duration-300">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-vwa-accent/5 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-vwa-primary/10 to-vwa-accent/10">
                  <SparklesIcon className="h-6 w-6 text-vwa-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-vwa-accent/70">
                    Notre mission
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-vwa-dark/75">
                    Faire vivre, découvrir et transmettre les cultures afro &
                    afro-descendantes, créoles et caribéennes à travers des
                    événements, ateliers, rencontres et expériences collectives
                    à forte dimension humaine.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.15}>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-vwa-background/20 p-8 shadow-lg border border-vwa-dark/8 hover:shadow-xl transition-all duration-300">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-vwa-primary/5 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-vwa-primary/10 to-vwa-accent/10">
                  <GlobeAltIcon className="h-6 w-6 text-vwa-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-vwa-primary/70">
                    Notre vision
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-vwa-dark/75">
                    Construire une présence culturelle forte, sensible et
                    contemporaine à Tours et ailleurs, capable de rassembler
                    différents publics autour d'une mémoire vivante, d'une
                    créativité assumée et d'un esprit profondément fédérateur.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>

        {/* ==================== NOS VALEURS ==================== */}
        <SectionWrapper delay={0.2}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
              <span className="text-[11px] font-medium tracking-[0.25em] text-vwa-accent/80 uppercase">
                Notre ADN
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-vwa-dark mb-2">
              Nos valeurs
            </h2>
            <p className="text-sm text-vwa-dark/60 max-w-2xl mx-auto">
              Ce qui guide chaque projet, chaque rencontre et chaque expérience
              Vwa Kiltirèl.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {valeurs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group relative overflow-hidden rounded-xl bg-white/90 p-6 text-center shadow-md border border-vwa-dark/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${item.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-${item.color}/10 to-${item.color}/5 mb-4 mx-auto`}
                    >
                      <Icon className={`h-7 w-7 text-${item.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-vwa-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-vwa-dark/65 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>

        {/* ==================== LE BUREAU ==================== */}
        <SectionWrapper delay={0.25}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
              <span className="text-[11px] font-medium tracking-[0.25em] text-vwa-accent/80 uppercase">
                L'équipe
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-vwa-dark mb-2">
              Le bureau
            </h2>
            <p className="text-sm text-vwa-dark/60 max-w-2xl mx-auto">
              Les personnes qui portent, structurent et accompagnent les projets
              au quotidien.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {bureau.map((member, index) => {
              const styles = bureauCardStyles(member.level);
              return (
                <motion.div
                  key={`${member.role}-${member.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="group relative overflow-hidden rounded-xl bg-white/90 p-6 shadow-lg border border-vwa-dark/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-vwa-accent/30 to-vwa-primary/20 opacity-0 blur-md group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-vwa-dark/10">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${styles.badge}`}
                        >
                          {member.role}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-vwa-dark">
                        {member.name}
                      </h3>
                      <p className="text-xs text-vwa-dark/60 mt-2 leading-relaxed">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>

        {/* ==================== TIMELINE ==================== */}
        <SectionWrapper delay={0.3}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
              <span className="text-[11px] font-medium tracking-[0.25em] text-vwa-accent/80 uppercase">
                Notre histoire
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-vwa-dark mb-2">
              Notre trajectoire
            </h2>
            <p className="text-sm text-vwa-dark/60 max-w-2xl mx-auto">
              Les étapes qui structurent l'évolution de Vwa Kiltirèl.
            </p>
          </div>

          <div className="relative mt-8 space-y-4 pl-6">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-vwa-accent/50 via-vwa-primary/30 to-transparent" />
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="relative rounded-xl bg-white/90 p-5 shadow-md border border-vwa-dark/8 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute -left-[23px] top-5 flex h-4 w-4 items-center justify-center rounded-full bg-vwa-accent ring-4 ring-white shadow-sm" />
                <div className="space-y-2">
                  <span className="inline-flex rounded-full bg-gradient-to-r from-vwa-dark to-vwa-primary px-3 py-1 text-[10px] font-bold text-white">
                    {item.year}
                  </span>
                  <h3 className="text-base font-bold text-vwa-dark">
                    {item.title}
                  </h3>
                  <p className="text-sm text-vwa-dark/65 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* ==================== CTA FINAL ==================== */}
        <SectionWrapper delay={0.35}>
          <div className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-vwa-dark to-vwa-primary p-8 text-center shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-vwa-accent/20 blur-3xl" />
            </div>
            <div className="relative">
              <CheckBadgeIcon className="h-12 w-12 text-vwa-accent mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Envie de soutenir, participer ou construire quelque chose avec
                nous ?
              </h2>
              <p className="text-sm text-white/80 max-w-2xl mx-auto mb-6">
                Que ce soit par une adhésion, un don, une collaboration ou une
                simple prise de contact, chaque lien compte dans la construction
                de cette aventure collective.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/devenir-membre"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-vwa-dark shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Devenir membre
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  );
}
