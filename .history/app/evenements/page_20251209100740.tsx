// app/evenements/page.tsx
import Link from "next/link";
import Image from "next/image";
import { events } from "@/data/events";

export const metadata = {
    title: "Événements – Vwa Kiltirèl",
};

export default function EventsPage() {
    const upcomingEvents = events.filter((e) => !e.isPast);
    const pastEvents = events.filter((e) => e.isPast);

    return (
        <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
            <header className="space-y-3">
                <p className="text-xs tracking-[0.2em] uppercase text-vwa-dark/60">
                    Agenda
                </p>
                <h1 className="text-3xl font-extrabold text-vwa-dark">
                    Tous les événements Vwa Kiltirèl
                </h1>
                <p className="text-sm text-vwa-dark/70 max-w-2xl">
                    Ateliers, rencontres, soirées et temps forts pour faire vibrer les
                    cultures afro-descendantes et caribéennes à Tours.
                </p>
            </header>

            {/* À venir */}
            <section className="space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-xl font-semibold text-vwa-dark">
                        Événements à venir
                    </h2>
                    <p className="text-xs text-vwa-dark/60">
                        {upcomingEvents.length} événement(s) prévu(s)
                    </p>
                </div>

                {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-vwa-dark/60">
                        Aucun événement à venir pour le moment, mais ça arrive vite…
                    </p>
                ) : (
                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <article
                                key={event.slug}
                                className="flex flex-col sm:flex-row gap-4 rounded-3xl bg-white/80 border border-vwa-background shadow-sm hover:shadow-md transition-all overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative sm:w-56 h-40 sm:h-auto bg-vwa-background/80">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 220px, 100vw"
                                    />
                                </div>

                                {/* Texte */}
                                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-vwa-dark/70">
                                            {event.category && (
                                                <span className="rounded-full bg-vwa-dark/5 px-2.5 py-1 font-medium text-[11px]">
                                                    {event.category}
                                                </span>
                                            )}
                                            {event.tag && (
                                                <span className="rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-2.5 py-1 font-medium text-[11px] text-vwa-accent">
                                                    {event.tag}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-base sm:text-lg font-semibold text-vwa-dark">
                                            <Link href={`/evenements/${event.slug}`}>
                                                {event.title}
                                            </Link>
                                        </h3>

                                        <p className="text-sm text-vwa-dark/75">
                                            {event.date} • {event.time} • {event.location}
                                        </p>

                                        {event.shortDescription && (
                                            <p className="text-xs text-vwa-dark/70">
                                                {event.shortDescription}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            href={`/evenements/${event.slug}`}
                                            className="px-4 py-2 rounded-full bg-white text-vwa-dark text-xs font-medium border border-vwa-dark/10 hover:border-vwa-dark/40 hover:bg-vwa-background/60 transition-all"
                                        >
                                            Voir le détail
                                        </Link>
                                        <Link
                                            href={`/evenements/inscription?event=${event.slug}`}
                                            className="px-5 py-2 rounded-full bg-vwa-primary text-white text-xs font-medium shadow-sm hover:bg-vwa-dark transition-all"
                                        >
                                            Je m&apos;inscris
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* Passés */}
            <section className="space-y-4 border-t border-vwa-background pt-8">
                <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-lg font-semibold text-vwa-dark">
                        Événements passés
                    </h2>
                    <p className="text-xs text-vwa-dark/60">
                        {pastEvents.length} événement(s) archivés
                    </p>
                </div>

                {pastEvents.length === 0 ? (
                    <p className="text-sm text-vwa-dark/60">
                        Aucun événement passé enregistré pour le moment.
                    </p>
                ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                        {pastEvents.map((event) => (
                            <article
                                key={event.slug}
                                className="rounded-2xl bg-white/60 border border-vwa-background/80 p-4 flex flex-col gap-2 hover:bg-white transition"
                            >
                                <h3 className="text-sm font-semibold text-vwa-dark">
                                    {event.title}
                                </h3>
                                <p className="text-xs text-vwa-dark/70">
                                    {event.date} • {event.time}
                                </p>
                                {event.shortDescription && (
                                    <p className="text-xs text-vwa-dark/60 line-clamp-2">
                                        {event.shortDescription}
                                    </p>
                                )}
                                <Link
                                    href={`/evenements/${event.slug}`}
                                    className="mt-1 text-xs font-medium text-vwa-primary hover:text-vwa-dark underline-offset-2 hover:underline"
                                >
                                    Voir la fiche de l&apos;événement
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}