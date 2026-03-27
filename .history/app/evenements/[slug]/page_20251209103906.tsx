// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

type EventDetailPageProps = {
    params: { slug: string };
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            {/* Breadcrumb minimal */}
            <nav className="text-xs text-vwa-dark/60 mb-2">
                <Link href="/" className="hover:underline">
                    Accueil
                </Link>{" "}
                <span className="mx-1 text-vwa-dark/40">/</span>
                <Link href="/evenements" className="hover:underline">
                    Événements
                </Link>{" "}
                <span className="mx-1 text-vwa-dark/40">/</span>
                <span className="text-vwa-dark/80">{event.title}</span>
            </nav>

            {/* Header visuel */}
            <header className="rounded-3xl bg-gradient-to-br from-vwa-background via-vwa-background/80 to-vwa-accent/10 border border-vwa-background/80 overflow-hidden shadow-sm">
                <div className="flex flex-col sm:flex-row">
                    {/* Texte */}
                    <div className="flex-1 p-5 sm:p-7 space-y-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-vwa-dark/60">
                            {event.category ?? "Événement Vwa Kiltirèl"}
                        </p>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-vwa-dark">
                            {event.title}
                        </h1>

                        <p className="text-sm text-vwa-dark/75">
                            {event.date} • {event.time} • {event.location}
                        </p>

                        {event.shortDescription && (
                            <p className="text-sm text-vwa-dark/80">{event.shortDescription}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <span className="text-xs font-medium text-vwa-dark/80">
                                {event.price}
                            </span>

                            {!isPast && (
                                <Link
                                    href={`/evenements/${event.slug}/inscription`}
                                    className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                                >
                                    Je m&apos;inscris
                                </Link>
                            )}

                            {isPast && (
                                <span className="inline-flex items-center rounded-full border border-vwa-dark/15 bg-vwa-dark/5 px-4 py-1.5 text-xs font-medium text-vwa-dark/70">
                                    Événement passé
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full sm:w-60 md:w-72 h-48 sm:h-full bg-vwa-background/80">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 240px, 100vw"
                        />
                    </div>
                </div>
            </header>

            {/* Description */}
            <section className="space-y-4">
                <h2 className="text-sm font-semibold text-vwa-dark/80 uppercase tracking-[0.16em]">
                    À propos de cet événement
                </h2>
                <p className="text-sm leading-relaxed text-vwa-dark/80">
                    {event.description}
                </p>
            </section>

            {/* À savoir */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-vwa-dark/80 uppercase tracking-[0.16em]">
                    À savoir
                </h2>
                <ul className="text-sm text-vwa-dark/75 list-disc pl-5 space-y-1.5">
                    <li>Accueil 15 minutes avant le début de l’événement.</li>
                    <li>
                        Les enfants restent sous la responsabilité des adultes qui les
                        accompagnent.
                    </li>
                    <li>
                        Merci de prévenir en cas d’empêchement afin de libérer la place
                        d’une autre personne.
                    </li>
                </ul>
            </section>
        </main>
    );
}

