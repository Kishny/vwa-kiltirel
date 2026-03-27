"use client";

import { CalendarDays, MapPin, Clock } from "lucide-react";
import Link from "next/link";

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
};

type Props = {
    event: Event;
};

export default function EventCard({ event }: Props) {
    const statusLabel =
        event.status === "open"
            ? "Inscriptions ouvertes"
            : event.status === "full"
                ? "Complet"
                : "Événement passé";

    const statusColor =
        event.status === "open"
            ? "bg-emerald-100 text-emerald-700"
            : event.status === "full"
                ? "bg-rose-100 text-rose-700"
                : "bg-slate-100 text-slate-500";

    return (
        <article className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-wide text-slate-500">
                        {event.category}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">
                        {event.title}
                    </h3>
                </div>

                <span
                    className={`text-[10px] px-2 py-1 rounded-full ${statusColor} whitespace-nowrap`}
                >
                    {statusLabel}
                </span>
            </div>

            <div className="flex flex-col gap-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-1">
                {event.isFree ? (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        Gratuit
                    </span>
                ) : (
                    <span className="text-[11px] text-slate-500">
                        Participation libre / cotisation
                    </span>
                )}

                <Link
                    href={`/evenements/${event.slug}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-900 text-white"
                >
                    Je m’inscris
                </Link>
            </div>
        </article>
    );
}
