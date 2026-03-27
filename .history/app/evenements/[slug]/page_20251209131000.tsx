// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

type EventDetailPageProps = {
    params: {
        slug: string;
    };
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = params; // ⚠️ surtout ne pas utiliser Promise ici
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;
    const statusLabel = isPast ? "Événement passé" : "Prochain événement";
    const statusColorClasses = isPast
        ? "bg-vwa-dark/5 text-vwa-dark/70 border-vwa-dark/10"
        : "bg-vwa-accent/10 text-vwa-accent border-vwa-accent/30";

    return (
        <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* HERO VISUEL */}
            <section className="overflow-hidden rounded-3xl bg-vwa-background shadow-sm border border-vwa-background/80">
                <div className="relative h-64 sm:h-80 md:h-96">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(min-width: 1024px) 960px, 100vw"
                    />

                    {/* Voile + dégradé */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

                    {/* Contenu overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-2">
                                <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                                    {statusLabel}
                                </p>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                                    {event.title}
                                </h1>

                                <p className="text-sm text-white/85">
                                    {event.date} • {event.time} • {event.location}
                                </p>

                                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                                    {event.category && (
                                        <span className="rounded-full bg-white/15 px-3 py-1 font-medium text-white/90 backdrop-blur-sm">
                                            {event.category}
                                        </span>
                                    )}
                                    {event.tag && (
                                        <span className="rounded-full border border-white/50 bg-white/10 px-3 py-1 font-medium text-white/90 backdrop-blur-sm">
                                            {event.tag}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* CTA principal dans le hero */}
                            <div className="flex flex-col items-end gap-3">
                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm ${statusColorClasses}`}
                                >
                                    {isPast ? "Merci à tou·te·s pour ce moment !" : "Inscriptions ouvertes"}
                                </span>

                                {!isPast && (
                                    <Link
                                        href={`/evenements/${event.slug}/inscription`}
                                        className="group inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2 text-sm font-medium text-white shadow-md shadow-vwa-primary/25 transition-all duration-200 hover:-translate-y-[1px] hover:bg-vwa-dark hover:shadow-lg hover:shadow-vwa-primary/35 active:translate-y-[0.5px]"
                                    >
                                        <span className="mr-1">Je m&apos;inscris</span>
                                        <span className="inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5">
                                            →
                                        </span>
                                    </Link>
                                )}

                                {isPast && (
                                    <Link
                                        href="/evenements"
                                        className="inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-1.5 text-[13px] font-medium text-vwa-dark shadow-sm backdrop-blur-sm transition hover:bg-white"
                                    >
                                        Voir les prochains événements
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOC INFOS + DESCRIPTION */}
            <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
                {/* Colonne gauche : texte */}
                <div className="space-y-5">
                    <header className="space-y-2">
                        {event.shortDescription && (
                            <p className="text-sm text-vwa-dark/80">{event.shortDescription}</p>
                        )}
                    </header>

                    <div className="space-y-3 text-sm leading-relaxed text-vwa-dark/80">
                        {/* Description longue si dispo, sinon on réutilise la courte */}
                        <p>{event.description || event.shortDescription}</p>
                    </div>

                    {/* CTA secondaire sous le texte */}
                    {!isPast && (
                        <div className="pt-2">
                            <Link
                                href={`/evenements/${event.slug}/inscription`}
                                className="inline-flex items-center justify-center rounded-full border border-vwa-primary/30 bg-vwa-primary/5 px-4 py-2 text-xs font-medium text-vwa-primary shadow-sm transition-all hover:bg-vwa-primary/10 hover:shadow-md"
                            >
                                Réserver ma place
                            </Link>
                        </div>
                    )}
                </div>

                {/* Colonne droite : infos pratiques */}
                <aside className="space-y-5">
                    <div className="rounded-2xl bg-white shadow-sm border border-vwa-background px-4 py-4 sm:px-5 sm:py-5">
                        <h2 className="text-sm font-semibold text-vwa-dark mb-3">
                            Infos pratiques
                        </h2>

                        <dl className="space-y-2 text-xs sm:text-sm text-vwa-dark/80">
                            <div className="flex justify-between gap-4">
                                <dt className="text-vwa-dark/60">Date</dt>
                                <dd className="font-medium text-right">{event.date}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-vwa-dark/60">Horaires</dt>
                                <dd className="font-medium text-right">{event.time}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-vwa-dark/60">Lieu</dt>
                                <dd className="font-medium text-right">{event.location}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-vwa-dark/60">Tarif</dt>
                                <dd className="font-medium text-right">{event.price}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* À savoir */}
                    <div className="rounded-2xl bg-vwa-background/70 border border-vwa-background px-4 py-4 sm:px-5 sm:py-5">
                        <h2 className="text-sm font-semibold text-vwa-dark mb-3">
                            À savoir
                        </h2>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-vwa-dark/80">
                            <li>
                                Les inscriptions sont nominatives et non transférables.
                            </li>
                            <li>
                                En cas d&apos;empêchement, merci de prévenir au moins 48h à l&apos;avance
                                afin de libérer la place.
                            </li>
                            <li>
                                Nous nous réservons le droit d&apos;adapter ou d&apos;annuler
                                l&apos;événement en cas de circonstances exceptionnelles.
                            </li>
                        </ul>
                    </div>
                </aside>
            </section>

            {/* LIEN RETOUR / AUTRES ÉVÉNEMENTS */}
            <section className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Link
                    href="/evenements"
                    className="text-xs sm:text-sm text-vwa-dark/70 hover:text-vwa-dark underline-offset-4 hover:underline"
                >
                    ← Retour à la liste des événements
                </Link>

                {!isPast && (
                    <Link
                        href={`/evenements/${event.slug}/inscription`}
                        className="text-xs sm:text-sm font-medium text-vwa-primary hover:text-vwa-dark"
                    >
                        Je souhaite participer
                    </Link>
                )}
            </section>
        </main>
    );
}