// app/evenements/page.tsx
import Link from "next/link";
import Image from "next/image";
import { events } from "@/data/events";

export const metadata = {
    title: "Événements | Vwa Kiltirèl",
};

export default function EventsPage() {
    const upcomingEvents = events.filter((e) => !e.isPast);
    const pastEvents = events.filter((e) => e.isPast);

    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/40 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/15 blur-3xl opacity-70" />
            </div>

            {/* Header premium */}
            <header className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                    Agenda - vwa kiltirèl
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                            Les événements Vwa Kiltirèl
                        </h1>
                        <p className="text-sm text-vwa-dark/75 max-w-2xl">
                            Ateliers, rencontres, soirées, moments en plein air… Retrouvez
                            ici tous nos rendez-vous à venir et un aperçu des moments déjà
                            vécus.
                        </p>
                    </div>

                    <div className="flex gap-2 text-xs">
                        <div className="rounded-2xl bg-white/80 px-3 py-2 shadow-sm border border-vwa-background/80">
                            <p className="text-[11px] text-vwa-dark/60 uppercase tracking-[0.18em]">
                                À venir
                            </p>
                            <p className="text-sm font-semibold text-vwa-dark">
                                {upcomingEvents.length} évènement
                                {upcomingEvents.length > 1 && "s"}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-vwa-dark text-vwa-background px-3 py-2 shadow-md border border-vwa-dark/80">
                            <p className="text-[11px] text-vwa-background/65 uppercase tracking-[0.18em]">
                                Déjà partagés
                            </p>
                            <p className="text-sm font-semibold">
                                {pastEvents.length} souvenir
                                {pastEvents.length > 1 && "s"}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* PROCHAINS ÉVÉNEMENTS */}
            <section className="space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-lg font-semibold text-vwa-dark">
                        Prochains événements
                    </h2>
                    {upcomingEvents.length > 0 && (
                        <span className="text-[11px] text-vwa-dark/55">
                            Réservez votre place en quelques clics
                        </span>
                    )}
                </div>

                {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-vwa-dark/70">
                        Aucun événement à venir pour le moment, de belles choses se
                        préparent en coulisses…
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <li
                                key={event.slug}
                                className="group rounded-3xl bg-white/95 border border-vwa-background/80 shadow-[0_16px_45px_rgba(28,22,18,0.10)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,22,18,0.18)]"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    {/* Texte */}
                                    <div className="flex-1 p-5 sm:p-6 space-y-3">
                                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-vwa-dark/70">
                                            {event.category && (
                                                <span className="rounded-full bg-vwa-dark/5 px-2.5 py-1 font-medium text-vwa-dark/80">
                                                    {event.category}
                                                </span>
                                            )}
                                            {event.tag && (
                                                <span className="rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-2.5 py-1 font-medium text-vwa-accent">
                                                    {event.tag}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-base sm:text-lg font-semibold text-vwa-dark">
                                                {event.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-vwa-dark/75">
                                                {event.date} • {event.time} • {event.location}
                                            </p>
                                        </div>

                                        {event.shortDescription && (
                                            <p className="text-xs text-vwa-dark/70">
                                                {event.shortDescription}
                                            </p>
                                        )}

                                        {/* Prix + actions */}
                                        <div className="mt-2 space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                {event.price && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-vwa-dark/4 px-3 py-1 text-[11px] font-medium text-vwa-dark/85">
                                                        {event.price}
                                                    </span>
                                                )}

                                                {/* CTA inscription */}
                                                <Link
                                                    href={/evenements/${event.slug} /inscription}
                                                className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-4 py-1.5 text-xs font-semibold text-white shadow-[0_10px_28px_rgba(28,22,18,0.45)] transition-all duration-200 hover:shadow-[0_16px_40px_rgba(28,22,18,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70"
                                                >
                                                <span className="absolute inset-0 opacity-40">
                                                    <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                                                </span>
                                                <span className="relative">Je m&apos;inscris</span>
                                            </Link>

                                            {/* Lien détails */}
                                            <Link
                                                href={/evenements/${event.slug}}
                                            className="text-xs font-medium text-vwa-primary underline-offset-2 hover:text-vwa-dark hover:underline transition-colors"
                                                >
                                            Voir les détails
                                        </Link>
                                    </div>

                                    {event.reservationNote && (
                                        <p className="text-[11px] text-vwa-dark/60">
                                            {event.reservationNote}
                                        </p>
                                    )}
                                </div>
                            </div>

                                    {/* Image */ }
                            < div className = "relative w-full sm:w-64 md:w-72 overflow-hidden" >
                            <Image
                                src={event.image}
                                alt={event.title}
                                width={640}
                                height={400}
                                className="h-48 sm:h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                priority={event.slug === "brunch-mamans-reconnexion"}
                            />
                                        {/* halo vertical à droite */ }
                            < div className = "pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-vwa-background/40 to-transparent sm:block hidden" />
                                    </>
                                </div>
        </li>
    ))
}
                    </ul >
                )}
            </section >

    {/* ÉVÉNEMENTS PASSÉS */ }
    < section className = "space-y-4" >
        <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold text-vwa-dark">
                Événements passés
            </h2>
            {pastEvents.length > 0 && (
                <span className="text-[11px] text-vwa-dark/55">
                    Retrouvez les fiches et la médiathèque de chaque moment
                </span>
            )}
        </div>

{
    pastEvents.length === 0 ? (
        <p className="text-sm text-vwa-dark/70">
            Aucun événement passé répertorié pour le moment.
        </p>
    ) : (
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {pastEvents.map((event) => (
                            <li
                                key={event.slug}
                                className="group rounded-3xl bg-white/90 border border-vwa-background/85 shadow-[0_14px_40px_rgba(28,22,18,0.10)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(28,22,18,0.18)]"
                            >
                                {/* Image cliquable vers fiche événement */}
                                <Link href={/evenements/${event.slug}} className="block">
                                    <div className="relative h-40 overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            width={640}
                                            height={400}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent opacity-80" />
                                        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-vwa-background">
                                            <span className="font-semibold drop-shadow-sm">
                                                {event.date}
                                            </span>
                                            <span className="rounded-full bg-black/35 px-2 py-0.5 backdrop-blur-sm">
                                                Souvenir Vwa Kiltirèl
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Texte + liens */}
                                <div className="space-y-2 px-4 pb-4 pt-3 text-xs text-vwa-dark/80">
                                    <p className="font-semibold text-vwa-dark">{event.title}</p>
                                    <p className="text-[11px] text-vwa-dark/65">
                                        {event.location}
                                    </p>

                                    {event.shortDescription && (
                                        <p className="mt-1 text-[11px] text-vwa-dark/70">
                                            {event.shortDescription}
                                        </p>
                                    )}

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <Link
                                            href={/evenements/${event.slug}}
                                            className="text-[11px] font-semibold text-vwa-primary underline-offset-2 hover:text-vwa-dark hover:underline transition-colors"
                                        >
                                            Voir la fiche de l&apos;événement
                                        </Link>
                                        <span className="text-vwa-dark/30">•</span>
                                        <Link
                                            href={/mediatheque?event=${event.slug}}
                                            className="text-[11px] font-medium text-vwa-dark/70 underline-offset-2 hover:text-vwa-primary hover:underline transition-colors"
                                        >
                                            Voir la médiathèque de cet événement
                                        </Link>
                                    </div >
                                </div >
                            </li >
                        ))
}
                    </ul >
                )}
            </section >
        </main >
    );
}
