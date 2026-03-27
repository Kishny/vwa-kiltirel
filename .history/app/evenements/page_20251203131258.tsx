import Image from "next/image";
import Link from "next/link";
import { upcomingEvents, pastEvents, type EventItem } from "@/lib/eventsData";
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

function getCategoryColor(category: EventItem["category"]) {
    switch (category) {
        case "atelier":
            return "bg-vwa-terracotta/10 text-vwa-terracotta";
        case "famille":
            return "bg-vwa-green/10 text-vwa-green";
        case "plein-air":
            return "bg-vwa-blueSoft/10 text-vwa-blueSoft";
        case "rencontre":
            return "bg-vwa-primary/10 text-vwa-primary";
        default:
            return "bg-vwa-dark/10 text-vwa-dark";
    }
}

export default function EvenementsPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-12">
            {/* Header de page */}
            <header className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-vwa-dark/60">
                    Agenda
                </p>
                <h1 className="mt-2 text-2xl font-extrabold text-vwa-dark">
                    Événements Vwa Kiltirèl
                </h1>
                <p className="mt-2 text-sm text-vwa-dark/75 max-w-2xl">
                    Retrouvez nos prochains événements, ateliers, rencontres et temps
                    forts à Tours et aux alentours. Certains sont gratuits, d’autres sur
                    inscription ou adhésion.
                </p>
            </header>

            {/* Prochains événements */}
            <section className="mt-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <h2 className="text-lg font-semibold text-vwa-dark">
                        Prochains événements
                    </h2>
                    <span className="text-xs text-vwa-dark/60">
                        {upcomingEvents.length} événements à venir
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    {upcomingEvents.map((event) => (
                        <article
                            key={event.id}
                            className="
                rounded-3xl bg-white shadow-sm border border-vwa-background
                overflow-hidden flex flex-col sm:flex-row
              "
                        >
                            {/* Colonne texte */}
                            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-2">
                                <p className="text-[11px] tracking-[0.16em] uppercase text-vwa-dark/50">
                                    {event.badgeLabel || "Événement"}
                                </p>
                                <h3 className="text-base sm:text-lg font-semibold text-vwa-dark">
                                    {event.title}
                                </h3>
                                {event.subtitle && (
                                    <p className="text-xs sm:text-sm text-vwa-dark/70">
                                        {event.subtitle}
                                    </p>
                                )}

                                <div className="mt-2 space-y-1.5 text-xs text-vwa-dark/80">
                                    <p className="flex items-center gap-2">
                                        <CalendarDaysIcon className="h-4 w-4 text-vwa-primary/80" />
                                        <span>{event.dateLabel}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <ClockIcon className="h-4 w-4 text-vwa-primary/80" />
                                        <span>{event.timeLabel}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPinIcon className="h-4 w-4 text-vwa-primary/80" />
                                        <span>{event.placeLabel}</span>
                                    </p>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-3">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium ${getCategoryColor(
                                            event.category
                                        )}`}
                                    >
                                        {event.badgeLabel || "Événement"}
                                    </span>

                                    <Link
                                        href={`/evenements/${event.slug}`}
                                        className="
                      group relative inline-flex items-center justify-center
                      rounded-full px-5 py-2 text-xs sm:text-sm font-medium text-white
                      bg-gradient-to-r from-vwa-terracotta to-vwa-accent
                      shadow-md hover:shadow-lg transition-all duration-200
                      ring-1 ring-vwa-terracotta/40 hover:ring-vwa-terracotta/70
                      active:scale-95
                    "
                                    >
                                        <span className="relative z-10">Je m&apos;inscris</span>
                                        <span
                                            className="
                        pointer-events-none absolute inset-0 rounded-full
                        opacity-0 group-hover:opacity-100
                        bg-vwa-terracotta/20 blur-lg transition-opacity duration-200
                      "
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Colonne image à droite */}
                            <div className="relative sm:w-56 h-40 sm:h-auto">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Événements passés */}
            <section className="mt-10">
                <h2 className="text-lg font-semibold text-vwa-dark mb-3">
                    Événements passés
                </h2>
                <p className="text-xs text-vwa-dark/60 mb-3">
                    Un aperçu des moments déjà partagés avec les familles, les enfants et
                    les habitants de Tours.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                    {pastEvents.map((event) => (
                        <article
                            key={event.id}
                            className="rounded-2xl bg-white border border-vwa-background shadow-sm overflow-hidden flex"
                        >
                            <div className="relative w-20 sm:w-24 h-full min-h-[80px]">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 p-3 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-vwa-dark line-clamp-2">
                                        {event.title}
                                    </h3>
                                    {event.subtitle && (
                                        <p className="mt-1 text-[11px] text-vwa-dark/65 line-clamp-2">
                                            {event.subtitle}
                                        </p>
                                    )}
                                </div>
                                <p className="mt-1 text-[11px] text-vwa-dark/50">
                                    {event.dateLabel} • {event.placeLabel}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
