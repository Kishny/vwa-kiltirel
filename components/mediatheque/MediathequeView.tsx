"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Images,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Info,
} from "lucide-react";
import type { MediaItem } from "@/data/media";

const EMPTY_MEDIAS: MediaItem[] = [];

export type EventWithMedia = {
  slug: string;
  title: string;
  category?: string;
  date: string;
  location: string;
  medias: MediaItem[];
};

type Props = {
  events: EventWithMedia[];
  associationMedia: MediaItem[];
  initialEventSlug?: string;
  initialCategory?: string;
};

const ALL_CATEGORIES = "tous";

export default function MediathequeView({
  events,
  associationMedia,
  initialEventSlug,
  initialCategory,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory ?? ALL_CATEGORIES,
  );
  const [activeSlug, setActiveSlug] = useState<string>(
    initialEventSlug ?? events[0]?.slug ?? "",
  );
  const [lightboxMedia, setLightboxMedia] = useState<{
    contextTitle: string;
    media: MediaItem;
    origin: "event" | "association";
    index: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);

  const categories = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return [ALL_CATEGORIES, ...Array.from(set)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES) return events;
    return events.filter((e) => e.category === activeCategory);
  }, [events, activeCategory]);

  // On dérive un slug valide sans setState dans un effect
  const resolvedActiveSlug = useMemo(() => {
    if (!filteredEvents.length) return "";
    const exists = filteredEvents.some((e) => e.slug === activeSlug);
    return exists ? activeSlug : filteredEvents[0].slug;
  }, [filteredEvents, activeSlug]);

  const activeEvent = useMemo(() => {
    return (
      filteredEvents.find((e) => e.slug === resolvedActiveSlug) ??
      filteredEvents[0]
    );
  }, [filteredEvents, resolvedActiveSlug]);
  
  const activeMedias = useMemo(() => {
    return activeEvent?.medias ?? EMPTY_MEDIAS;
  }, [activeEvent]);

  const totalEventMedia = useMemo(
    () => events.reduce((acc, event) => acc + event.medias.length, 0),
    [events],
  );

  const totalMedia = totalEventMedia + associationMedia.length;

  const goToRelativeMedia = useCallback(
    (delta: 1 | -1) => {
      if (!lightboxMedia) return;
      setIsLoading(true);

      window.setTimeout(() => {
        const eventList = activeMedias;
        const assoList = associationMedia;
        const list = lightboxMedia.origin === "event" ? eventList : assoList;

        if (!list.length) {
          setIsLoading(false);
          return;
        }

        const nextIndex =
          (lightboxMedia.index + delta + list.length) % list.length;
        const nextMedia = list[nextIndex];

        setLightboxMedia((prev) =>
          prev ? { ...prev, media: nextMedia, index: nextIndex } : prev,
        );
        setIsLoading(false);
      }, 180);
    },
    [lightboxMedia, activeMedias, associationMedia],
  );

  const handlePrev = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    goToRelativeMedia(-1);
  };

  const handleNext = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    goToRelativeMedia(1);
  };

  useEffect(() => {
    if (!lightboxMedia) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxMedia(null);
      } else if (e.key === "ArrowRight") {
        goToRelativeMedia(1);
      } else if (e.key === "ArrowLeft") {
        goToRelativeMedia(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxMedia, goToRelativeMedia]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowKeyboardHint(false), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const currentLightboxListLength = lightboxMedia
    ? lightboxMedia.origin === "event"
      ? activeMedias.length
      : associationMedia.length
    : 0;

  // Grouper les médias de la vie associative par type pour plus de richesse
  const associationPhotos = associationMedia.filter((m) => m.type === "image");
  const associationVideos = associationMedia.filter((m) => m.type === "video");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative space-y-20"
    >
      {/* ==================== FILIGRANE LOGO TOURNANT ==================== */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          {/* Halo léger autour */}
          <div className="absolute h-[900px] w-[900px] rounded-full bg-vwa-accent/10 blur-[120px]" />

          {/* Logo */}
          <div className="relative h-[900px] w-[900px] sm:h-[1100px] sm:w-[1100px] lg:h-[1400px] lg:w-[1400px] opacity-[0.09]">
            <Image
              src="/logo-filigrane.webp"
              alt="Logo Vwa Kiltirèl filigrane"
              fill
              priority
              sizes="(max-width: 640px) 900px, (max-width: 1024px) 1100px, 1400px"
              className="object-contain animate-[spin_90s_linear_infinite]"
            />
          </div>
        </div>
      </div>
      {/* ==================== HEADER ÉDITORIAL PREMIUM ==================== */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-white to-vwa-background/30 p-6 shadow-[0_30px_80px_-35px_rgba(59,38,29,0.35)] backdrop-blur-sm sm:p-8 lg:p-10"
      >
        {/* Éléments décoratifs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-vwa-accent/8 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-vwa-primary/8 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vwa-dark/3 blur-3xl" />
        </div>
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,420px)] xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,460px)] items-start lg:items-end">
          {/* Colonne gauche - Contenu éditorial */}
          <div className="min-w-0 space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
              <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.22em] sm:tracking-[0.25em] text-vwa-accent/80 uppercase">
                Archives vivantes
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-vwa-dark max-w-[12ch] sm:max-w-[14ch] lg:max-w-none">
              Les moments, les visages
              <span className="block text-vwa-primary/70 mt-1 sm:mt-2">
                et les traces vivantes
              </span>
            </h1>

            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-vwa-dark/70">
              Parcourez les souvenirs de nos événements, les coulisses de
              l’association et l’énergie collective qui fait vivre nos actions
              culturelles à Tours & ailleurs. Chaque image raconte une histoire,
              chaque regard témoigne d&apos;une émotion partagée.
            </p>

            <blockquote className="max-w-xl border-l-2 border-vwa-accent/40 pl-4 italic text-vwa-dark/60 text-xs sm:text-sm">
              &laquo;&nbsp;Notre médiathèque est une invitation à plonger dans
              l&apos;âme de notre communauté, là où les souvenirs deviennent
              patrimoine.&nbsp;&raquo;
            </blockquote>
          </div>

          {/* Colonne droite - Logo + Statistiques premium */}
          <div className="min-w-0 w-full lg:justify-self-end">
            <div className="flex flex-col gap-6">
              {/* Logo premium fixe - version améliorée */}
              <div className="relative flex items-start justify-center lg:justify-end pt-2 lg:pt-0 lg:-mt-6">
                {/* Halo */}
                <div className="absolute inset-0 flex items-start justify-center lg:justify-end">
                  <div className="h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64 rounded-full bg-vwa-accent/10 blur-3xl" />
                </div>

                {/* Logo */}
                <div className="relative h-36 w-36 sm:h-44 sm:w-44 lg:h-56 lg:w-56 xl:h-64 xl:w-64 opacity-[0.18]">
                  <Image
                    src="/images/Logo.webp"
                    alt="Logo Vwa Kiltirèl"
                    fill
                    sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, (max-width: 1280px) 224px, 256px"
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Carte 1 / 2 / 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Carte 1 */}
                <div className="group min-w-0 rounded-2xl border border-vwa-dark/8 bg-white/90 p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-start gap-2 text-vwa-dark/55">
                    <Images className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110 flex-shrink-0" />
                    <span className="min-w-0 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold leading-tight break-words">
                      Mémoire visuelle
                    </span>
                  </div>

                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-vwa-dark">
                    {totalMedia}
                  </p>

                  <p className="text-[10px] sm:text-xs text-vwa-dark/50 leading-snug break-words">
                    souvenirs précieux
                  </p>
                </div>

                {/* Carte 2 */}
                <div className="group min-w-0 rounded-2xl border border-vwa-dark/8 bg-white/90 p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-start gap-2 text-vwa-dark/55">
                    <CalendarDays className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110 flex-shrink-0" />
                    <span className="min-w-0 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold leading-tight break-words">
                      Événements
                    </span>
                  </div>

                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-vwa-dark">
                    {events.length}
                  </p>

                  <p className="text-[10px] sm:text-xs text-vwa-dark/50 leading-snug break-words">
                    dossiers documentés
                  </p>
                </div>

                {/* Carte 3 */}
                <div className="group min-w-0 rounded-2xl border border-vwa-dark/8 bg-white/90 p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-start gap-2 text-vwa-dark/55">
                    <Heart className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110 flex-shrink-0" />
                    <span className="min-w-0 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold leading-tight break-words">
                      Vie associative
                    </span>
                  </div>

                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-vwa-dark">
                    {associationMedia.length}
                  </p>

                  <p className="text-[10px] sm:text-xs text-vwa-dark/50 leading-snug break-words">
                    instants partagés
                  </p>
                </div>
              </div>{" "}
              {/* fin grille stats */}
            </div>{" "}
            {/* fin colonne droite */}
          </div>
        </div>{" "}
        {/* fin grille principale du header */}
      </motion.section>

      {/* ==================== SECTION ÉVÉNEMENTS ==================== */}
      <motion.section variants={itemVariants} className="space-y-10">
        {/* Filtres premium */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            const label = cat === ALL_CATEGORIES ? "Tous les moments" : cat;

            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-vwa-dark/70 hover:text-vwa-dark"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-vwa-dark to-vwa-primary/90 shadow-lg"
                    transition={{ type: "spring", duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Layout 2 colonnes premium */}
        <div className="grid gap-10 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] items-start">
          {/* ========== COLONNE GAUCHE - LISTE ÉVÉNEMENTS ========== */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-vwa-primary/70">
                Sélection d'événements
              </h2>
              <span className="text-[11px] font-mono text-vwa-dark/45">
                {filteredEvents.length} dossier
                {filteredEvents.length > 1 && "s"}
              </span>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredEvents.map((event) => {
                const isActive = event.slug === activeSlug;
                const hasVideo = event.medias.some((m) => m.type === "video");
                const mediaCount = event.medias.length;

                return (
                  <motion.button
                    key={event.slug}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    type="button"
                    onClick={() => setActiveSlug(event.slug)}
                    className={`
                      w-full rounded-2xl border p-5 text-left transition-all duration-400
                      ${
                        isActive
                          ? "border-vwa-accent/40 bg-gradient-to-br from-vwa-dark to-vwa-dark/95 shadow-2xl"
                          : "border-vwa-dark/8 bg-white/80 hover:border-vwa-accent/25 hover:bg-white hover:shadow-lg"
                      }
                    `}
                  >
                    <div className="space-y-4">
                      {/* Header de l'événement */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                              isActive
                                ? "bg-white/15 text-vwa-accent/90"
                                : "bg-vwa-background/80 text-vwa-dark/55"
                            }`}
                          >
                            {event.category || "Moment fort"}
                          </span>

                          <h3
                            className={`text-base font-semibold leading-tight ${
                              isActive ? "text-white" : "text-vwa-dark"
                            }`}
                          >
                            {event.title}
                          </h3>
                        </div>

                        <div
                          className={`rounded-full px-2.5 py-1.5 text-[10px] font-bold ${
                            isActive
                              ? "bg-white/15 text-white/90"
                              : "bg-vwa-dark/5 text-vwa-dark/55"
                          }`}
                        >
                          {mediaCount}
                        </div>
                      </div>

                      {/* Métadonnées */}
                      <div
                        className={`space-y-1.5 text-[11px] ${
                          isActive ? "text-white/70" : "text-vwa-dark/55"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Tags médias */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide ${
                            isActive
                              ? "bg-white/15 text-white/80"
                              : "bg-vwa-background text-vwa-dark/55"
                          }`}
                        >
                          <Camera className="h-3 w-3" />
                          Photos
                        </span>

                        {hasVideo && (
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide ${
                              isActive
                                ? "bg-white/15 text-white/80"
                                : "bg-vwa-background text-vwa-dark/55"
                            }`}
                          >
                            <Clapperboard className="h-3 w-3" />
                            Vidéo
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {filteredEvents.length === 0 && (
              <div className="rounded-2xl border border-dashed border-vwa-dark/15 bg-vwa-dark/5 p-8 text-center">
                <p className="text-sm text-vwa-dark/50">
                  Aucun événement dans cette catégorie
                </p>
              </div>
            )}
          </motion.div>

          {/* ========== COLONNE DROITE - DOSSIER ACTIF + GALERIE ========== */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* DOSSIER ACTIF - MISE EN SCÈNE */}
            {activeEvent && (
              <motion.div
                key={activeEvent.slug}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-vwa-dark/5 via-white to-vwa-accent/5 p-6 shadow-lg"
              >
                {/* Effet de lumière */}
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-vwa-accent/10 blur-2xl" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-vwa-primary/10 blur-2xl" />

                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-vwa-accent/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-vwa-accent">
                        <Info className="h-3 w-3" />
                        Dossier actif
                      </span>
                      {activeEvent.category && (
                        <span className="inline-flex rounded-full bg-vwa-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-vwa-primary">
                          {activeEvent.category}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold leading-tight text-vwa-dark lg:text-3xl">
                        {activeEvent.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-5 text-sm text-vwa-dark/65">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-vwa-primary" />
                          {activeEvent.date}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-vwa-primary" />
                          {activeEvent.location}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Images className="h-4 w-4 text-vwa-primary" />
                          {activeMedias.length} média
                          {activeMedias.length > 1 && "s"}
                        </span>
                      </div>
                    </div>

                    <p className="max-w-xl text-sm leading-relaxed text-vwa-dark/65">
                      Une sélection de souvenirs visuels pour revivre
                      l'ambiance, les détails et l'énergie de cet événement
                      unique.
                    </p>
                  </div>

                  <Link
                    href={`/evenements/${activeEvent.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-vwa-dark/15 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition-all duration-300 hover:border-vwa-primary/40 hover:bg-vwa-primary/5 hover:text-vwa-primary hover:shadow-md"
                  >
                    Explorer l'événement
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* GALERIE AVEC IMAGE HÉRO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-vwa-primary/70">
                  Galerie
                </h2>
                {activeMedias.length > 0 && (
                  <span className="text-xs text-vwa-dark/45 font-mono">
                    {activeMedias.length} image{activeMedias.length > 1 && "s"}
                  </span>
                )}
              </div>

              {activeMedias.length === 0 ? (
                <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-vwa-dark/12 bg-vwa-dark/3">
                  <div className="text-center space-y-2">
                    <Camera className="h-10 w-10 text-vwa-dark/25 mx-auto" />
                    <p className="text-sm text-vwa-dark/45">
                      Aucune image pour cet événement
                    </p>
                    <p className="text-xs text-vwa-dark/35">
                      Revenez bientôt pour découvrir nos souvenirs
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3"
                >
                  {activeMedias.map((media, index) => {
                    const isHero = index === 0;

                    return (
                      <motion.button
                        key={media.id}
                        variants={{
                          hidden: { opacity: 0, scale: 0.94 },
                          visible: { opacity: 1, scale: 1 },
                        }}
                        whileHover={{ scale: 1.02, y: -6 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        type="button"
                        onClick={() =>
                          setLightboxMedia({
                            contextTitle: activeEvent?.title ?? "Événement",
                            media,
                            origin: "event",
                            index,
                          })
                        }
                        className={`
                          group relative overflow-hidden rounded-xl bg-vwa-dark/5 shadow-xl
                          ${
                            isHero
                              ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
                              : "aspect-square"
                          }
                        `}
                        style={isHero ? { minHeight: "280px" } : undefined}
                      >
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          sizes={
                            isHero
                              ? "(min-width: 1024px) 50vw, 100vw"
                              : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                          }
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={isHero}
                        />

                        {/* Badge vidéo */}
                        {media.type === "video" && (
                          <div className="absolute left-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 backdrop-blur-sm">
                            <span className="text-[9px] font-bold text-white flex items-center gap-1">
                              <Clapperboard className="h-3 w-3" />
                              VIDÉO
                            </span>
                          </div>
                        )}

                        {/* Overlay premium */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                        {/* Légende au hover */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                          <span className="block line-clamp-2 text-left text-[11px] leading-relaxed font-medium text-white drop-shadow-lg">
                            {media.alt}
                          </span>
                        </div>

                        {/* Compteur pour héro */}
                        {isHero && activeMedias.length > 1 && (
                          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-mono text-white/80 backdrop-blur-sm">
                            +{activeMedias.length - 1}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== VIE ASSOCIATIVE - INCARNÉE ==================== */}
      {associationMedia.length > 0 && (
        <motion.section
          variants={itemVariants}
          className="space-y-8 border-t border-vwa-dark/8 pt-12"
        >
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-vwa-accent/10 px-4 py-1.5">
              <Users className="h-4 w-4 text-vwa-accent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-vwa-accent">
                Mémoire collective
              </span>
            </div>

            <h2 className="text-3xl font-bold text-vwa-dark">
              Dans les coulisses de Vwa Kiltirèl
            </h2>

            <p className="text-base leading-relaxed text-vwa-dark/65 max-w-2xl mx-auto">
              Préparations, instants de partage, énergie d'équipe et moments
              plus intimes : une autre manière de raconter la vie de
              l'association, là où l'humain est au cœur de tout.
            </p>
          </div>

          {/* Grille avec métadonnées enrichies */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
          >
            {associationMedia.map((media, index) => (
              <motion.button
                key={media.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.94 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
                type="button"
                onClick={() =>
                  setLightboxMedia({
                    contextTitle: "Vie associative",
                    media,
                    origin: "association",
                    index,
                  })
                }
                className="group relative aspect-square overflow-hidden rounded-xl bg-vwa-dark/5 shadow-lg"
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badge type */}
                {media.type === "video" && (
                  <div className="absolute left-2 top-2 z-10 rounded-full bg-black/70 px-2 py-0.5 backdrop-blur-sm">
                    <Clapperboard className="h-3 w-3 text-white" />
                  </div>
                )}

                {/* Overlay incarné */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                {/* Légende descriptive */}
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block line-clamp-2 text-left text-[10px] leading-relaxed font-medium text-white drop-shadow-md">
                    {media.alt}
                  </span>
                </div>

                {/* Petite icône d'ambiance */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="h-3 w-3 text-white/70" />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Citation de clôture */}
          {associationPhotos.length > 0 && (
            <div className="text-center pt-6">
              <p className="text-xs text-vwa-dark/45 italic">
                {associationPhotos.length} instant
                {associationPhotos.length > 1 && "s"} capturé
                {associationPhotos.length > 1 ? "s" : ""}
                {associationVideos.length > 0 && (
                  <span>
                    {" "}
                    — dont {associationVideos.length} vidéo
                    {associationVideos.length > 1 && "s"}
                  </span>
                )}
              </p>
            </div>
          )}
        </motion.section>
      )}

      {/* ==================== LIGHTBOX CINÉMATOGRAPHIQUE ==================== */}
      <AnimatePresence>
        {lightboxMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-xl"
            onClick={() => setLightboxMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="relative mx-4 w-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Compteur intégré */}
              <div className="absolute left-5 top-5 z-20 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md">
                <span className="text-sm font-mono font-bold text-white/90">
                  {lightboxMedia.index + 1} / {currentLightboxListLength}
                </span>
              </div>

              {/* Aide clavier */}
              {showKeyboardHint && (
                <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
                  <span className="text-xs text-white/70 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <ChevronLeft className="h-3 w-3" />{" "}
                      <ChevronRight className="h-3 w-3" />
                      <span className="ml-1">Naviguer</span>
                    </span>
                    <span className="w-px h-3 bg-white/30" />
                    <span>Échap fermer</span>
                  </span>
                </div>
              )}

              {/* Bouton fermer */}
              <button
                type="button"
                onClick={() => setLightboxMedia(null)}
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Navigation précédente */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Navigation suivante */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Média principal */}
              <div className="relative h-[85vh] w-full overflow-hidden rounded-2xl bg-black/40 shadow-2xl">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full border-3 border-white/30 border-t-white animate-spin" />
                  </div>
                ) : lightboxMedia.media.type === "video" &&
                  lightboxMedia.media.videoUrl ? (
                  <video
                    src={lightboxMedia.media.videoUrl}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <Image
                    src={lightboxMedia.media.src}
                    alt={lightboxMedia.media.alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                )}

                {/* Légende cinématographique */}
                <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                  <p className="text-base font-semibold text-white/95">
                    {lightboxMedia.contextTitle}
                  </p>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-white/75">
                    {lightboxMedia.media.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles globaux pour scrollbar personnalisée */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(59, 38, 29, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 38, 29, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 38, 29, 0.35);
        }
      `}</style>
    </motion.div>
  );
}
