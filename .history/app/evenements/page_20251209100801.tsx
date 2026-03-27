// app/evenements/page.tsx
import Link from "next/link";
import Image from "next/image";
import { events } from "@/data/events";

export default function EventsPage() {
    const upcomingEvents = events.filter((e) => !e.isPast);
    const pastEvents = events.filter((e) => e.isPast);

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-12 space-y-10">
            {/* HERO SIMPLE */}
            <header className="space-y-3">
                <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-vwa-dark/60">
                    Agenda · Vwa Kiltirèl
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-vwa-dark">
                    Tous nos événements
                </h1>
                <p className="text-sm sm:text-base text-vwa-dark/75 max-w-2xl">
                    Ateliers, soirées, brunchs, rencontres et temps forts pour faire
                    vibrer les cultures créoles, afro-descendantes et caribéennes à Tours.
                </p>
            </header>

            {/* EVENTS À VENIR */}
            <section aria-labelledby="upcoming-title" className="space-y-4">
                <div className="flex items-baseline justify-between gap-3">
                    <div>
                        <h2
                            id="upcoming-title"
                            className="text-lg sm:text-xl font-semibold text-vwa-dark"
                        >
                            Événements à venir
                        </h2>
                        <p className="mt-1 text-sm text-vwa-dark/70">
                            Ce qui arrive très bientôt dans la programmation de Vwa Kiltirèl.
                        </p>
                    </div>
                </div>

                {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-vwa-dark/60">
                        Aucun événement à venir pour le moment. Abonnez-vous à nos réseaux
                        ou revenez jeter un œil bientôt 💛
                    </p>
                ) : (
                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <article
                                key={event.slug}
                                className="grid gap-4 rounded-3xl border border-vwa-background/80 bg-white/90 p-4 sm:p-5 shadow-sm sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
                            >
                                {/* Texte */}
                                <div className="flex flex-col justify-between gap-3">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-vwa-dark/70">
                                            {event.category && (
                                                <span className="rounded-full bg-vwa-dark/5 px-2.5 py-1 font-medium">
                                                    {event.category}
                                                </span>
                                            )}
                                            {event.tag && (
                                                <span className="rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-2.5 py-1 font-medium text-vwa-accent">
                                                    {event.tag}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-vwa-dark">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-vwa-dark/75">
                                            {event.date}
                                            {event.time && ` · ${event.time}`} • {event.location}
                                        </p>
                                        {event.shortDescription && (
                                            <p className="text-xs sm:text-sm text-vwa-dark/70 mt-1">
                                                {event.shortDescription}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <Link
                                            href={`/evenements/${event.slug}`}
                                            className="inline-flex items-center rounded-full border border-vwa-dark/15 bg-white/80 px-4 py-2 text-xs sm:text-sm font-medium text-vwa-dark/80 hover:border-vwa-primary/40 hover:bg-vwa-background/80 hover:text-vwa-primary transition"
                                        >
                                            Voir les détails
                                        </Link>
                                        <Link
                                            href={`/evenements/${event.slug}/inscription`}
                                            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md
                                 [background:linear-gradient(135deg,theme(colors.vwa.terracotta),theme(colors.vwa.accent))]
                                 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition"
                                        >
                                            Je m&apos;inscris
                                        </Link>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="relative min-h-[180px] rounded-2xl overflow-hidden bg-vwa-dark/5">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width:1024px) 40vw, 100vw"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* EVENTS PASSÉS */}
            <section aria-labelledby="past-title" className="space-y-4 pt-4 border-t border-vwa-background/70">
                <div className="flex items-baseline justify-between gap-3">
                    <div>
                        <h2
                            id="past-title"
                            className="text-lg sm:text-xl font-semibold text-vwa-dark"
                        >
                            Événements passés
                        </h2>
                        <p className="mt-1 text-sm text-vwa-dark/70">
                            Un aperçu des rencontres déjà organisées avec la communauté.
                        </p>
                    </div>
                </div>

                {pastEvents.length === 0 ? (
                    <p className="text-sm text-vwa-dark/60">
                        Aucun événement passé enregistré pour le moment.
                    </p>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {pastEvents.map((event) => (
                            <article
                                key={event.slug}
                                className="group rounded-2xl border border-vwa-background/80 bg-white/90 p-4 shadow-sm flex gap-3"
                            >
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-vwa-dark/5">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                        sizes="80px"
                                    />
                                </div>
                                <div className="flex flex-col justify-between gap-1">
                                    <div>
                                        <h3 className="text-sm font-semibold text-vwa-dark">
                                            {event.title}
                                        </h3>
                                        <p className="text-xs text-vwa-dark/70">
                                            {event.date} • {event.location}
                                        </p>
                                    </div>
                                    <span className="inline-flex w-fit items-center rounded-full bg-vwa-background px-2 py-0.5 text-[11px] font-medium text-vwa-dark/70">
                                        Événement passé
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}