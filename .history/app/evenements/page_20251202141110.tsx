"use client";

import { useState } from "react";
import EventCard, { Event, EventStatus } from "@/components/events/EventCard";

const MOCK_EVENTS: Event[] = [
    {
        slug: "soiree-decouverte-vwa-kiltirel",
        title: "Soirée découverte Vwa Kiltirèl",
        category: "Soirée / rencontre",
        date: "Samedi 14 mars 2026",
        time: "19h – 22h",
        location: "Tours Nord",
        status: "open",
        isFree: true,
    },
    {
        slug: "atelier-parents-enfants-bijoux",
        title: "Atelier parents-enfants : création de bijoux",
        category: "Atelier créatif",
        date: "Dimanche 29 mars 2026",
        time: "15h – 17h",
        location: "Maison de quartier, Tours",
        status: "open",
    },
    {
        slug: "brunch-mamans-reconnexion",
        title: "Brunch mamans & reconnexion",
        category: "Rencontre / bien-être",
        date: "Dimanche 8 février 2026",
        time: "11h – 14h",
        location: "Centre-ville de Tours",
        status: "past",
    },
    {
        slug: "projection-en-plein-air",
        title: "Projection de film en plein air",
        category: "Plein air / cinéma",
        date: "Samedi 21 juin 2026",
        time: "21h – 23h",
        location: "Parc de la Cousinerie",
        status: "full",
        isFree: true,
    },
];

const TABS: { id: "upcoming" | "past"; label: string }[] = [
    { id: "upcoming", label: "À venir" },
    { id: "past", label: "Passés" },
];

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

    const filteredEvents = MOCK_EVENTS.filter((event) => {
        const isPast = event.status === "past";
        return activeTab === "past" ? isPast : !isPast;
    });

    return (
        <div className="flex flex-col gap-6 py-6">
            {/* Titre + intro */}
            <section className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">Événements</h1>
                <p className="text-sm text-slate-600">
                    Ateliers, soirées, rencontres, plein air… Découvrez les prochains
                    rendez-vous de Vwa Kiltirèl.
                </p>
            </section>

            {/* Onglets (à venir / passés) */}
            <section className="flex gap-2 bg-slate-100 rounded-full p-1 text-xs">
                {TABS.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-1.5 rounded-full transition ${isActive
                                ? "bg-white shadow-sm text-slate-900"
                                : "text-slate-500"
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </section>

            {/* Liste des événements */}
            <section className="flex flex-col gap-4">
                {filteredEvents.length === 0 ? (
                    <p className="text-sm text-slate-500">
                        Aucun événement pour le moment. Abonnez-vous à la newsletter pour
                        être informé des prochaines dates.
                    </p>
                ) : (
                    filteredEvents.map((event) => (
                        <EventCard key={event.slug} event={event} />
                    ))
                )}
            </section>
        </div>
    );
}
