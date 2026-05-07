// components/events/EventFilters.tsx
// components/events/EventFilters.tsx
"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarIcon,
  MapPinIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
  ClockIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import {
  associationEvents,
  eventTypeConfig,
  type EventType,
  type AssociationEvent,
} from "./eventsData";

type EventFiltersProps = {
  onFilterChange?: (filteredEvents: AssociationEvent[]) => void;
  initialType?: EventType | "all";
  showMobile?: boolean;
};

type FilterState = {
  type: EventType | "all";
  searchQuery: string;
  dateRange: {
    start: string;
    end: string;
  };
  priceRange: "all" | "free" | "paid";
  location: string;
};

const LOCATIONS = ["Tous", "Tours centre", "Tours Nord", "Tours"] as const;
const EVENT_TYPES = ["atelier", "soiree", "plein-air", "mamans", "all"] as const;

function isValidEventType(value: string | null): value is EventType | "all" {
  return !!value && EVENT_TYPES.includes(value as EventType | "all");
}

function isValidPriceRange(
  value: string | null
): value is FilterState["priceRange"] {
  return value === "all" || value === "free" || value === "paid";
}

function getFiltersFromSearchParams(
  searchParams: ReturnType<typeof useSearchParams>,
  initialType: EventType | "all"
): FilterState {
  const typeParam = searchParams.get("type");
  const searchParam = searchParams.get("search");
  const priceParam = searchParams.get("price");
  const locationParam = searchParams.get("location");
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  return {
    type: isValidEventType(typeParam) ? typeParam : initialType,
    searchQuery: searchParam ?? "",
    dateRange: {
      start: startParam ?? "",
      end: endParam ?? "",
    },
    priceRange: isValidPriceRange(priceParam) ? priceParam : "all",
    location:
      locationParam && LOCATIONS.includes(locationParam as (typeof LOCATIONS)[number])
        ? locationParam
        : "Tous",
  };
}

export default function EventFilters({
  onFilterChange,
  initialType = "all",
  showMobile = false,
}: EventFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const derivedFilters = useMemo(
    () => getFiltersFromSearchParams(searchParams, initialType),
    [searchParams, initialType]
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>(derivedFilters);

  useEffect(() => {
    setFilters(derivedFilters);
  }, [derivedFilters]);

  const filteredEvents = useMemo(() => {
    let events = [...associationEvents];

    if (filters.type !== "all") {
      events = events.filter((event) => event.type === filters.type);
    }

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.tag.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.categoryLabel.toLowerCase().includes(query)
      );
    }

    if (filters.dateRange.start) {
      events = events.filter((event) => event.dateISO >= filters.dateRange.start);
    }

    if (filters.dateRange.end) {
      events = events.filter((event) => event.dateISO <= filters.dateRange.end);
    }

    if (filters.priceRange === "free") {
      events = events.filter((event) => event.isFree === true);
    } else if (filters.priceRange === "paid") {
      events = events.filter((event) => event.isFree === false);
    }

    if (filters.location !== "Tous") {
      events = events.filter((event) => event.location === filters.location);
    }

    events.sort((a, b) => a.dateISO.localeCompare(b.dateISO));

    return events;
  }, [filters]);

  useEffect(() => {
    onFilterChange?.(filteredEvents);
  }, [filteredEvents, onFilterChange]);

  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();

      if (newFilters.type !== "all") params.set("type", newFilters.type);
      if (newFilters.searchQuery) params.set("search", newFilters.searchQuery);
      if (newFilters.priceRange !== "all") params.set("price", newFilters.priceRange);
      if (newFilters.location !== "Tous") params.set("location", newFilters.location);
      if (newFilters.dateRange.start) params.set("start", newFilters.dateRange.start);
      if (newFilters.dateRange.end) params.set("end", newFilters.dateRange.end);

      const queryString = params.toString();
      router.push(`/evenements${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    },
    [router]
  );

  const handleFilterChange = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      const newFilters: FilterState = {
        ...filters,
        [key]: value,
      };
      setFilters(newFilters);
      updateURL(newFilters);
    },
    [filters, updateURL]
  );

  const handleDateRangeChange = useCallback(
    (key: keyof FilterState["dateRange"], value: string) => {
      const newFilters: FilterState = {
        ...filters,
        dateRange: {
          ...filters.dateRange,
          [key]: value,
        },
      };
      setFilters(newFilters);
      updateURL(newFilters);
    },
    [filters, updateURL]
  );

  const resetFilters = () => {
    const resetState: FilterState = {
      type: "all",
      searchQuery: "",
      dateRange: { start: "", end: "" },
      priceRange: "all",
      location: "Tous",
    };
    setFilters(resetState);
    updateURL(resetState);
    setIsExpanded(false);
  };

  const hasActiveFilters =
    filters.type !== "all" ||
    filters.searchQuery !== "" ||
    filters.priceRange !== "all" ||
    filters.location !== "Tous" ||
    filters.dateRange.start !== "" ||
    filters.dateRange.end !== "";

  const stats = {
    total: filteredEvents.length,
    upcoming: filteredEvents.filter(
      (e) => e.dateISO >= new Date().toISOString().split("T")[0]
    ).length,
    free: filteredEvents.filter((e) => e.isFree).length,
  };

  const filterSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Filtres des événements",
    description:
      "Filtrez les événements culturels de l'association Vwa Kiltirèl par type, date, prix ou lieu.",
    mainEntity: {
      "@type": "ItemList",
      name: "Événements filtrés",
      numberOfItems: stats.total,
      itemListElement: filteredEvents.slice(0, 10).map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title,
          url: `https://vwa-kiltirel.fr/evenements/${event.id}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filterSchema) }}
      />

      <div className={`space-y-4 ${showMobile ? "block" : "hidden lg:block"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-4 w-4 text-vwa-accent" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
              Filtrer les événements
            </h2>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-vwa-dark/50 transition hover:text-vwa-primary"
              aria-label="Réinitialiser tous les filtres"
            >
              <XMarkIcon className="h-3 w-3" />
              Réinitialiser
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-xs text-vwa-dark/70 lg:hidden"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Réduire les filtres" : "Développer les filtres"}
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
            Filtres
          </button>
        </div>

        <div
          className={`space-y-4 ${!showMobile && !isExpanded ? "hidden lg:block" : "block"}`}
        >
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              placeholder="Rechercher un événement, un lieu..."
              className="w-full rounded-2xl border border-vwa-background/80 bg-white/95 px-4 py-2.5 pl-9 text-sm text-vwa-dark placeholder:text-vwa-dark/40 outline-none transition-all focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
              aria-label="Rechercher un événement"
            />
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-vwa-dark/40"
              aria-hidden="true"
            >
              🔍
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-[11px] font-medium text-vwa-dark/60">
                <SparklesIcon className="h-3 w-3" />
                Type d&apos;événement
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  handleFilterChange("type", e.target.value as EventType | "all")
                }
                className="w-full rounded-xl border border-vwa-background/70 bg-white px-3 py-2 text-xs text-vwa-dark outline-none focus:border-vwa-accent/50"
                aria-label="Type d'événement"
              >
                <option value="all">Tous les types</option>
                <option value="atelier">🎨 Ateliers</option>
                <option value="soiree">🎶 Soirées</option>
                <option value="plein-air">🌳 Plein air</option>
                <option value="mamans">🌸 Rencontres mamans</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-[11px] font-medium text-vwa-dark/60">
                <CurrencyEuroIcon className="h-3 w-3" />
                Prix
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange(
                    "priceRange",
                    e.target.value as "all" | "free" | "paid"
                  )
                }
                className="w-full rounded-xl border border-vwa-background/70 bg-white px-3 py-2 text-xs text-vwa-dark outline-none focus:border-vwa-accent/50"
                aria-label="Filtre par prix"
              >
                <option value="all">Tous les prix</option>
                <option value="free">🎁 Gratuit</option>
                <option value="paid">💰 Payant</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-[11px] font-medium text-vwa-dark/60">
                <MapPinIcon className="h-3 w-3" />
                Lieu
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full rounded-xl border border-vwa-background/70 bg-white px-3 py-2 text-xs text-vwa-dark outline-none focus:border-vwa-accent/50"
                aria-label="Filtre par lieu"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-[11px] font-medium text-vwa-dark/60">
                <CalendarIcon className="h-3 w-3" />
                Période
              </label>
              <div className="flex gap-1">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange("start", e.target.value)}
                  className="w-full rounded-xl border border-vwa-background/70 bg-white px-2 py-2 text-xs text-vwa-dark outline-none focus:border-vwa-accent/50"
                  aria-label="Date de début"
                  placeholder="Début"
                />
                <span className="text-xs text-vwa-dark/40">-</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange("end", e.target.value)}
                  className="w-full rounded-xl border border-vwa-background/70 bg-white px-2 py-2 text-xs text-vwa-dark outline-none focus:border-vwa-accent/50"
                  aria-label="Date de fin"
                  placeholder="Fin"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-vwa-background/50 pt-2">
            <div className="flex flex-wrap gap-3 text-[11px] text-vwa-dark/55">
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {stats.total} événement{stats.total > 1 ? "s" : ""}
              </span>
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {stats.upcoming} à venir
              </span>
              <span className="inline-flex items-center gap-1">
                <CurrencyEuroIcon className="h-3 w-3" />
                {stats.free} gratuit{stats.free > 1 ? "s" : ""}
              </span>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-1.5">
                {filters.type !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-vwa-dark/5 px-2 py-0.5 text-[10px] text-vwa-dark/70">
                    {eventTypeConfig[filters.type]?.icon} {filters.type}
                    <button
                      onClick={() => handleFilterChange("type", "all")}
                      className="ml-1 hover:text-red-500"
                      aria-label="Retirer le filtre type"
                    >
                      ×
                    </button>
                  </span>
                )}

                {filters.priceRange !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-vwa-dark/5 px-2 py-0.5 text-[10px] text-vwa-dark/70">
                    {filters.priceRange === "free" ? "🎁 Gratuit" : "💰 Payant"}
                    <button
                      onClick={() => handleFilterChange("priceRange", "all")}
                      className="ml-1 hover:text-red-500"
                      aria-label="Retirer le filtre prix"
                    >
                      ×
                    </button>
                  </span>
                )}

                {filters.location !== "Tous" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-vwa-dark/5 px-2 py-0.5 text-[10px] text-vwa-dark/70">
                    📍 {filters.location}
                    <button
                      onClick={() => handleFilterChange("location", "Tous")}
                      className="ml-1 hover:text-red-500"
                      aria-label="Retirer le filtre lieu"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            <div className="sr-only" role="status" aria-live="polite">
              {stats.total} événements trouvés
            </div>
          </div>
        </div>
      </div>
    </>
  );
}