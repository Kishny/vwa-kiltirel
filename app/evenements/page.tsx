"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/data/events";
import {
  CalendarDays,
  MapPin,
  Ticket,
  ArrowRight,
  Camera,
  Sparkles,
  Heart,
  Users,
  Compass,
  Music,
  Palette,
  Coffee,
} from "lucide-react";

// Mapping des catégories vers des icônes
const categoryIcons: Record<string, React.ReactNode> = {
  Atelier: <Palette className="h-3.5 w-3.5" />,
  "Soirée culturelle": <Music className="h-3.5 w-3.5" />,
  Rencontre: <Users className="h-3.5 w-3.5" />,
  "Bien-être": <Heart className="h-3.5 w-3.5" />,
  "Vie associative": <Compass className="h-3.5 w-3.5" />,
  Brunch: <Coffee className="h-3.5 w-3.5" />,
};

// ==================== FONCTIONS DATE / TEMPS ====================
function parseFrenchEventDate(
  dateStr: string,
  timeStr?: string,
): { start: Date | null; end: Date | null } {
  const moisMap: Record<string, number> = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const parts = dateStr.trim().toLowerCase().split(/\s+/);

  if (parts.length < 4) {
    return { start: null, end: null };
  }

  const dayNum = parseInt(parts[1], 10);
  const monthName = parts[2];
  const year = parseInt(parts[3], 10);
  const month = moisMap[monthName];

  if (Number.isNaN(dayNum) || month === undefined || Number.isNaN(year)) {
    return { start: null, end: null };
  }

  let startHour = 12;
  let startMinute = 0;
  let endHour = 23;
  let endMinute = 59;

  if (timeStr) {
    const normalized = timeStr.replace(/\s+/g, " ").trim();
    const [startRaw, endRaw] = normalized
      .split("–")
      .map((value) => value?.trim());

    const parseTime = (value?: string) => {
      if (!value) return null;

      const match = value.match(/(\d{1,2})\s*h?\s*(\d{0,2})/i);
      if (!match) return null;

      return {
        hour: Number(match[1]),
        minute: match[2] ? Number(match[2]) : 0,
      };
    };

    const parsedStart = parseTime(startRaw);
    const parsedEnd = parseTime(endRaw);

    if (parsedStart) {
      startHour = parsedStart.hour;
      startMinute = parsedStart.minute;
    }

    if (parsedEnd) {
      endHour = parsedEnd.hour;
      endMinute = parsedEnd.minute;
    } else if (parsedStart) {
      endHour = parsedStart.hour + 1;
      endMinute = parsedStart.minute;
    }
  }

  const start = new Date(year, month, dayNum, startHour, startMinute);
  const end = new Date(year, month, dayNum, endHour, endMinute);

  return { start, end };
}

function isPastEvent(dateStr: string, timeStr?: string): boolean {
  const { end, start } = parseFrenchEventDate(dateStr, timeStr);
  const referenceDate = end ?? start;

  if (!referenceDate) return false;

  return referenceDate.getTime() < Date.now();
}

// Nouvelle fonction qui prend un événement complet
function isEventPast(event: typeof events[0]): boolean {
  return isPastEvent(event.date, event.time);
}

// Composant bouton qui clignote (apparaît/disparaît)
const BlinkingButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            {children}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("tous");
  const [viewMode, setViewMode] = useState<"upcoming" | "past">("upcoming");

  // ==================== TRI AUTOMATIQUE DES ÉVÉNEMENTS ====================
  // Un événement est passé si ET SEULEMENT SI isEventPast() retourne true.
  // Les deux listes sont mutuellement exclusives : un événement ne peut
  // appartenir qu'à l'une ou à l'autre.
  const upcomingEvents = useMemo(() => {
    return events
      .filter((event) => !isEventPast(event))
      .sort((a, b) => {
        const dateA = parseFrenchEventDate(a.date, a.time).start;
        const dateB = parseFrenchEventDate(b.date, b.time).start;
        if (!dateA || !dateB) return 0;
        return dateA.getTime() - dateB.getTime(); // le plus proche en premier
      });
  }, []);

  const pastEvents = useMemo(() => {
    return events
      .filter((event) => isEventPast(event))
      .sort((a, b) => {
        const dateA = parseFrenchEventDate(a.date, a.time).start;
        const dateB = parseFrenchEventDate(b.date, b.time).start;
        if (!dateA || !dateB) return 0;
        return dateB.getTime() - dateA.getTime(); // le plus récent en premier
      });
  }, []);

  // Extraction des catégories uniques
  const categories = useMemo(() => {
    const cats = new Set<string>();
    events.forEach((e) => {
      if (e.category) cats.add(e.category);
    });
    return ["tous", ...Array.from(cats)];
  }, []);

  const filteredUpcoming = useMemo(() => {
    if (selectedCategory === "tous") return upcomingEvents;
    return upcomingEvents.filter((e) => e.category === selectedCategory);
  }, [selectedCategory, upcomingEvents]);

  const filteredPast = useMemo(() => {
    if (selectedCategory === "tous") return pastEvents;
    return pastEvents.filter((e) => e.category === selectedCategory);
  }, [selectedCategory, pastEvents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    {
      label: "Événements à venir",
      value: upcomingEvents.length,
      icon: Sparkles,
    },
    { label: "Souvenirs partagés", value: pastEvents.length, icon: Camera },
    {
      label: "Ancrage",
      value: "Tours",
      icon: MapPin,
      subtitle: "Cœur de la dynamique",
    },
    {
      label: "Culture vivante",
      value: "Transmission",
      icon: Heart,
      subtitle: "Au service de tous",
    },
  ];

  // ==================== HELPERS SEO / JSON-LD ====================
  function toIsoStartDate(
    dateStr: string,
    timeStr?: string,
  ): string | undefined {
    const parsed = parseFrenchEventDate(dateStr, timeStr).start;
    return parsed ? parsed.toISOString() : undefined;
  }

  function extractNumericPrice(price?: string): number | undefined {
    if (!price) return undefined;

    const normalized = price.toLowerCase();

    if (
      normalized.includes("gratuit") ||
      normalized.includes("entrée libre") ||
      normalized.includes("libre")
    ) {
      return undefined;
    }

    const match = normalized.match(/\d+(?:[.,]\d+)?/);
    if (!match) return undefined;

    const numeric = Number(match[0].replace(",", "."));
    return Number.isNaN(numeric) ? undefined : numeric;
  }

  // Données structurées JSON-LD pour le SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Événements culturels Vwa Kiltirèl | Programmation à Tours",
    description:
      "Découvrez tous les événements de l'association Vwa Kiltirèl à Tours : ateliers, rencontres, soirées culturelles et moments de partage autour des cultures afro-descendantes, créoles et caribéennes.",
    url: "https://vwakiltirel-asso.org/evenements",
    mainEntity: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      url: "https://vwakiltirel-asso.org",
      email: "vwakiltirel.asso@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tours",
        addressCountry: "FR",
      },
    },
    about: {
      "@type": "Thing",
      name: "Programmation culturelle Vwa Kiltirèl",
      description:
        "Ateliers, rencontres, soirées et moments festifs autour des cultures afro-descendantes, créoles et caribéennes à Tours.",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://vwakiltirel-asso.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Événements",
        item: "https://vwakiltirel-asso.org/evenements",
      },
    ],
  };

  const upcomingEventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Prochains événements Vwa Kiltirèl",
    description: "Liste des prochains événements culturels à venir à Tours",
    numberOfItems: filteredUpcoming.length,
    itemListElement: filteredUpcoming.map((event, index) => {
      const numericPrice = extractNumericPrice(event.price);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title,
          description: event.shortDescription || event.description,
          startDate: toIsoStartDate(event.date, event.time),
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: event.location,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tours",
              addressCountry: "FR",
            },
          },
          image: [event.image],
          url: `https://vwakiltirel-asso.org/evenements/${event.slug}`,
          ...(numericPrice !== undefined
            ? {
                offers: {
                  "@type": "Offer",
                  price: numericPrice,
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  url:
                    event.paymentUrl ||
                    `https://vwakiltirel-asso.org/evenements/${event.slug}`,
                },
              }
            : {}),
        },
      };
    }),
  };

  const pastEventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Événements passés Vwa Kiltirèl",
    description:
      "Archives des événements culturels déjà organisés par Vwa Kiltirèl",
    numberOfItems: filteredPast.length,
    itemListElement: filteredPast.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.title,
        description: event.shortDescription || event.description,
        startDate: toIsoStartDate(event.date, event.time),
        eventStatus: "https://schema.org/EventCompleted",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tours",
            addressCountry: "FR",
          },
        },
        image: [event.image],
        url: `https://vwakiltirel-asso.org/evenements/${event.slug}`,
      },
    })),
  };

  return (
    <>
      {/* SEO - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {filteredUpcoming.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(upcomingEventsJsonLd),
          }}
        />
      )}
      {filteredPast.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pastEventsJsonLd) }}
        />
      )}

      {/* Logo en filigrane qui tourne */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative w-[800px] h-[800px] opacity-[0.03] sm:opacity-[0.04] md:opacity-[0.05]"
          >
            <Image
              src="/images/Logo.png"
              alt="Vwa Kiltirèl"
              fill
              sizes="800px"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative w-[500px] h-[500px] opacity-[0.02] sm:opacity-[0.03]"
          >
            <Image
              src="/images/Logo.png"
              alt="Vwa Kiltirèl"
              fill
              sizes="500px"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ==================== HEADER ÉDITORIAL PREMIUM ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.25em] text-vwa-accent/80 uppercase">
              Notre programmation
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-vwa-dark mb-4">
            Des rendez-vous culturels
            <span className="block text-vwa-primary/70 mt-2">
              pensés pour rassembler, transmettre et faire vibrer
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-vwa-dark/70 leading-relaxed">
            Découvrez les événements à venir de Vwa Kiltirèl à Tours : ateliers,
            rencontres, soirées culturelles, moments de bien-être et souvenirs
            des temps forts déjà vécus.
          </p>

          {/* Statistiques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="group rounded-2xl border border-vwa-dark/8 bg-white/80 backdrop-blur-sm p-3 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <stat.icon className="h-5 w-5 text-vwa-accent mx-auto mb-2 transition-transform group-hover:scale-110" />
                <p className="text-xl font-bold text-vwa-dark">{stat.value}</p>
                <p className="text-[10px] font-medium text-vwa-dark/50 uppercase tracking-wide">
                  {stat.label}
                </p>
                {stat.subtitle && (
                  <p className="text-[9px] text-vwa-dark/40 mt-0.5">
                    {stat.subtitle}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== NAVIGATION ENTRE VUES ==================== */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setViewMode("upcoming")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === "upcoming"
                ? "text-white"
                : "text-vwa-dark/60 hover:text-vwa-dark"
            }`}
          >
            {viewMode === "upcoming" && (
              <motion.div
                layoutId="viewMode"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-vwa-dark to-vwa-primary/90 shadow-lg"
                transition={{ type: "spring", duration: 0.45 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />À venir
            </span>
          </button>
          <button
            onClick={() => setViewMode("past")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === "past"
                ? "text-white"
                : "text-vwa-dark/60 hover:text-vwa-dark"
            }`}
          >
            {viewMode === "past" && (
              <motion.div
                layoutId="viewMode"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-vwa-dark to-vwa-primary/90 shadow-lg"
                transition={{ type: "spring", duration: 0.45 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Souvenirs
            </span>
          </button>
        </div>

        {/* ==================== FILTRES PAR CATÉGORIE ==================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const label = cat === "tous" ? "Tous" : cat;
            const Icon =
              cat !== "tous" &&
              categoryIcons[cat as keyof typeof categoryIcons];

            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-vwa-dark/60 hover:text-vwa-dark"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="eventCategory"
                    className="absolute inset-0 rounded-full bg-vwa-dark"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {Icon && <span className="opacity-80">{Icon}</span>}
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ==================== ÉVÉNEMENTS À VENIR ==================== */}
        {viewMode === "upcoming" && (
          <motion.section
            key="upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredUpcoming.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-vwa-dark/5 mb-4">
                  <Sparkles className="h-10 w-10 text-vwa-dark/30" />
                </div>
                <p className="text-vwa-dark/60">
                  Aucun événement à venir dans cette catégorie
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {filteredUpcoming.map((event) => {
                  const isFree =
                    event.price?.toLowerCase().includes("gratuit") ||
                    event.price?.toLowerCase().includes("entrée libre");

                  const ctaHref =
                    event.paymentUrl ?? `/evenements/${event.slug}/inscription`;

                  const ctaLabel =
                    event.paymentUrl || isFree ? "Je réserve" : "Je m'inscris";

                  return (
                    <motion.div key={event.slug} variants={itemVariants}>
                      <div className="group overflow-hidden rounded-2xl border border-vwa-dark/8 bg-white/90 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                          {/* CONTENU */}
                          <div className="relative p-6 md:p-8">
                            <div className="pointer-events-none absolute inset-0">
                              <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-vwa-accent/5 blur-3xl" />
                            </div>

                            <div className="relative space-y-4">
                              {/* TAGS */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-vwa-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-vwa-accent">
                                  À venir
                                </span>

                                {event.category && (
                                  <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[10px] font-medium text-vwa-dark/70 flex items-center gap-1">
                                    {categoryIcons[event.category] ?? (
                                      <Sparkles className="h-3.5 w-3.5" />
                                    )}
                                    {event.category}
                                  </span>
                                )}

                                {event.tag && (
                                  <span className="rounded-full border border-vwa-accent/20 bg-vwa-accent/5 px-3 py-1 text-[10px] font-medium text-vwa-accent">
                                    {event.tag}
                                  </span>
                                )}
                              </div>

                              {/* TITRE */}
                              <h2 className="text-xl md:text-2xl font-bold text-vwa-dark group-hover:text-vwa-primary transition-colors">
                                {event.title}
                              </h2>

                              {/* DESCRIPTION */}
                              {event.shortDescription && (
                                <p className="text-sm text-vwa-dark/70 leading-relaxed">
                                  {event.shortDescription}
                                </p>
                              )}

                              {/* INFOS */}
                              <div className="space-y-2 pt-2 border-t border-vwa-dark/8">
                                <div className="flex flex-wrap items-center gap-4 text-sm text-vwa-dark/65">
                                  <span className="flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 text-vwa-accent" />
                                    {event.date} • {event.time}
                                  </span>

                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-vwa-accent" />
                                    {event.location}
                                  </span>
                                </div>

                                {event.price && (
                                  <div className="flex items-center gap-1.5 text-sm">
                                    <Ticket className="h-4 w-4 text-vwa-accent" />
                                    <span className="font-semibold text-vwa-dark">
                                      {event.price}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* ACTIONS */}
                              <div className="flex flex-wrap items-center gap-3 pt-2">
                                <Link
                                  href={`/evenements/${event.slug}`}
                                  className="inline-flex items-center gap-2 rounded-full border border-vwa-dark/15 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition-all duration-300 hover:border-vwa-primary/40 hover:bg-vwa-primary/5 hover:text-vwa-primary"
                                >
                                  Voir la fiche
                                  <ArrowRight className="h-4 w-4" />
                                </Link>

                                <BlinkingButton href={ctaHref}>
                                  {ctaLabel}
                                </BlinkingButton>
                              </div>
                            </div>
                          </div>

                          {/* IMAGE */}
                          <div className="relative min-h-[280px] lg:min-h-full overflow-hidden bg-vwa-dark/5">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(min-width: 1024px) 40vw, 100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/10" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.section>
        )}

        {/* ==================== ÉVÉNEMENTS PASSÉS ==================== */}
        {viewMode === "past" && (
          <motion.section
            key="past"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPast.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-vwa-dark/5 mb-4">
                  <Camera className="h-10 w-10 text-vwa-dark/30" />
                </div>
                <p className="text-vwa-dark/60">
                  Aucun souvenir dans cette catégorie
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredPast.map((event) => (
                  <motion.div key={event.slug} variants={itemVariants}>
                    <div className="group relative overflow-hidden rounded-2xl bg-white/90 border border-vwa-dark/8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                      <Link
                        href={`/evenements/${event.slug}`}
                        className="block"
                      >
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                          {/* Badges overlay */}
                          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[10px] font-medium text-white/90">
                              Souvenir
                            </span>

                            {event.category && (
                              <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-medium text-white flex items-center gap-1">
                                {categoryIcons[event.category] ?? (
                                  <Sparkles className="h-3.5 w-3.5" />
                                )}
                                {event.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-2 text-xs text-vwa-dark/50">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span>{event.date}</span>
                          </div>

                          <h3 className="font-semibold text-vwa-dark line-clamp-2 text-base">
                            {event.title}
                          </h3>

                          <p className="text-xs text-vwa-dark/60 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>

                          {event.shortDescription && (
                            <p className="text-xs text-vwa-dark/65 line-clamp-2">
                              {event.shortDescription}
                            </p>
                          )}

                          <div className="pt-2 flex items-center gap-3 text-xs">
                            <span className="text-vwa-primary font-medium hover:text-vwa-dark transition-colors">
                              Voir la fiche
                            </span>
                            <span className="text-vwa-dark/20">•</span>
                            <span className="text-vwa-dark/50 flex items-center gap-1">
                              <Camera className="h-3 w-3" />
                              Souvenirs disponibles
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Bouton médiathèque séparé, hors du Link principal */}
                      <div className="px-5 pb-5">
                        <Link
                          href={`/mediatheque?event=${event.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-vwa-dark/50 hover:text-vwa-primary transition-colors"
                        >
                          <Camera className="h-3 w-3" />
                          Ouvrir la médiathèque
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>
        )}

        {/* ==================== CITATION INSPIRANTE ==================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-vwa-dark/8"
        >
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-sm italic text-vwa-dark/50">
              &ldquo;Chaque événement est une invitation à célébrer nos racines,
              à partager nos émotions et à construire ensemble l&apos;avenir de
              notre communauté.&rdquo;
            </p>
            <cite className="block mt-3 text-xs font-medium text-vwa-primary/70 tracking-wide">
              — Vwa Kiltirèl, culture vivante
            </cite>
          </blockquote>
        </motion.div>
      </main>
    </>
  );
}
