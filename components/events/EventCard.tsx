"use client";

import { CalendarDays, MapPin, Clock, Users, Ticket, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export type EventStatus = "open" | "full" | "past";

export type Event = {
    slug: string;
    title: string;
    category: string;
    date: string;
    time: string;
    location: string;
    status: EventStatus;
    isFree?: boolean;
    price?: string;
    availableSeats?: number;
    totalSeats?: number;
};

type Props = {
    event: Event;
    priority?: boolean;
};

// Données structurées JSON-LD pour l'événement
function generateEventSchema(event: Event) {
    const statusMap = {
        open: "https://schema.org/EventScheduled",
        full: "https://schema.org/EventScheduled",
        past: "https://schema.org/EventPostponed",
    };

    const availabilityMap = {
        open: "https://schema.org/LimitedAvailability",
        full: "https://schema.org/SoldOut",
        past: "https://schema.org/Discontinued",
    };

    return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: `${event.category} organisé par Vwa Kiltirèl à ${event.location}`,
        startDate: event.date,
        location: {
            "@type": "Place",
            name: event.location,
            address: {
                "@type": "PostalAddress",
                addressLocality: event.location.includes("Tours") ? "Tours" : event.location,
                addressCountry: "FR",
            },
        },
        image: "/images/og/events-og.jpg",
        eventStatus: statusMap[event.status],
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        organizer: {
            "@type": "Organization",
            name: "Vwa Kiltirèl",
            url: "https://vwakiltirel-asso.org",
        },
        offers: {
            "@type": "Offer",
            price: event.isFree ? 0 : (event.price ? parseFloat(event.price.replace("€", "").trim()) : undefined),
            priceCurrency: "EUR",
            availability: availabilityMap[event.status],
            validFrom: new Date().toISOString(),
            url: `https://vwakiltirel-asso.org/evenements/${event.slug}/inscription`,
        },
    };
}

export default function EventCard({ event, priority = false }: Props) {
    const statusLabel =
        event.status === "open"
            ? "Inscriptions ouvertes"
            : event.status === "full"
                ? "Complet"
                : "Événement passé";

    const statusColor =
        event.status === "open"
            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
            : event.status === "full"
                ? "bg-rose-100 text-rose-700 border-rose-200"
                : "bg-slate-100 text-slate-500 border-slate-200";

    const statusIcon =
        event.status === "open"
            ? "🟢"
            : event.status === "full"
                ? "🔴"
                : "⚪";

    const formattedDate = useMemo(() => {
        try {
            const [day, month, year] = event.date.split("/");
            if (day && month && year) {
                const date = new Date(`${year}-${month}-${day}`);
                return date.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
            }
        } catch {
            // fallback
        }
        return event.date;
    }, [event.date]);

    const eventSchema = generateEventSchema(event);

    return (
        <>
            {/* JSON-LD Schema.org pour l'événement */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />

            <article
                className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-vwa-accent/40 hover:shadow-md transition-all duration-300 overflow-hidden"
                itemScope
                itemType="https://schema.org/Event"
            >
                {/* Barre de statut colorée */}
                <div className={`h-1 w-full ${event.status === "open" ? "bg-emerald-500" : event.status === "full" ? "bg-rose-500" : "bg-slate-400"}`} />

                <div className="p-4 flex flex-col gap-3">
                    {/* En-tête */}
                    <div className="flex justify-between items-start gap-3">
                        <div className="flex flex-col gap-1">
                            <span
                                className="text-[11px] uppercase tracking-wide text-vwa-accent font-semibold"
                                itemProp="eventType"
                            >
                                {event.category}
                            </span>
                            <h3
                                className="text-sm font-semibold text-slate-900 group-hover:text-vwa-primary transition-colors"
                                itemProp="name"
                            >
                                {event.title}
                            </h3>
                        </div>

                        <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusColor} whitespace-nowrap flex items-center gap-1 border`}
                            aria-label={`Statut : ${statusLabel}`}
                        >
                            <span aria-hidden="true">{statusIcon}</span>
                            <span>{statusLabel}</span>
                        </span>
                    </div>

                    {/* Informations date, heure, lieu */}
                    <div className="flex flex-col gap-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={14} className="text-vwa-accent shrink-0" />
                            <span itemProp="startDate" content={event.date}>
                                {formattedDate}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-vwa-accent shrink-0" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-vwa-accent shrink-0" />
                            <span itemProp="location" itemScope itemType="https://schema.org/Place">
                                <span itemProp="name">{event.location}</span>
                            </span>
                        </div>
                    </div>

                    {/* Places disponibles */}
                    {event.status === "open" && event.availableSeats !== undefined && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <Users size={12} className="text-vwa-accent" />
                            <span>
                                {event.availableSeats} place{event.availableSeats > 1 ? "s" : ""} disponible
                                {event.availableSeats > 1 ? "s" : ""}
                                {event.totalSeats && ` sur ${event.totalSeats}`}
                            </span>
                        </div>
                    )}

                    {/* Prix et bouton */}
                    <div className="flex justify-between items-center pt-1 mt-1">
                        <div className="flex items-center gap-2">
                            {event.isFree ? (
                                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 flex items-center gap-1">
                                    <Ticket size={10} />
                                    Gratuit
                                </span>
                            ) : event.price ? (
                                <span className="text-[11px] px-2.5 py-1 rounded-full bg-vwa-dark/5 text-vwa-dark/80 font-medium">
                                    {event.price}
                                </span>
                            ) : (
                                <span className="text-[11px] text-slate-500">
                                    Participation libre
                                </span>
                            )}
                        </div>

                        {event.status === "open" ? (
                            <Link
                                href={`/evenements/${event.slug}/inscription`}
                                className="inline-flex items-center gap-1 text-xs px-3.5 py-1.5 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                                aria-label={`S'inscrire à l'événement ${event.title}`}
                            >
                                Je m&apos;inscris
                                <ChevronRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
                            </Link>
                        ) : event.status === "full" ? (
                            <span className="text-xs px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-500 font-medium cursor-not-allowed">
                                Complet
                            </span>
                        ) : (
                            <Link
                                href={`/evenements/${event.slug}`}
                                className="inline-flex items-center gap-1 text-xs px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                                aria-label={`Voir l'événement passé ${event.title}`}
                            >
                                Voir le souvenir
                                <ChevronRight size={12} />
                            </Link>
                        )}
                    </div>

                    {/* Micro-données cachées pour le SEO */}
                    <div className="hidden" aria-hidden="true">
                        <span itemProp="eventStatus">{event.status === "open" ? "Scheduled" : event.status === "full" ? "Scheduled" : "Postponed"}</span>
                        <span itemProp="eventAttendanceMode">Offline</span>
                        <span itemProp="organizer">Vwa Kiltirèl</span>
                        {event.isFree && <span itemProp="isAccessibleForFree">true</span>}
                    </div>
                </div>
            </article>
        </>
    );
}