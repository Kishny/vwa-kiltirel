// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import {
    CalendarDaysIcon,
    MapPinIcon,
    CurrencyEuroIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";

type EventDetailPageProps = {
    // avec Next 16, params est typé comme une Promise
    params: Promise<{ slug: string }>;
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    // on "unwrap" la Promise
    const { slug } = await params;

    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-8">
            {/* Halo / background ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-70" />
                <div className="absolute bottom-0 right-[-4rem] h-64 w-64 rounded-full bg-vwa-primary/15 blur-3xl opacity-70" />
            </div>

            {/* Bouton retour */}
            <div>
                <Link
                    href="/evenements"
                    className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-vwa-dark/70 shadow-sm ring-1 ring-vwa-background/80 backdrop-blur-sm transition-all hover:-translate-y-[1px] hover:bg-white hover:text-vwa-dark hover:shadow-md"
                >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    <span>Retour aux événements</span>
                </Link>
            </div>

            <article className="overflow-hidden rounded-3xl bg-white/95 shadow-[0_22px_70px_rgba(28,22,18,0.35)] ring-1 ring-vwa-background/80 backdrop-blur-sm">
                {/* HERO visuel */}
                <div className="relative h-60 sm:h-72">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(min-width: 1024px) 960px, 100vw"
                    />

                    {/* Dégradé + glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-vwa-dark via-vwa-dark/60 to-vwa-dark/10" />
                    <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-black/40 blur-3xl opacity-60" />

                    {/* Contenu dans le hero */}
                    <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between text-vwa-background">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
                                <span className="rounded-full bg-vwa-background/10 px-3 py-1 uppercase tracking-[0.22em] text-vwa-background/75">
                                    Agenda Vwa Kiltirèl
                                </span>
                                {event.category && (
                                    <span className="rounded-full bg-vwa-background/15 px-3 py-1">
                                        {event.category}
                                    </span>
                                )}
                                {event.tag && (
                                    <span className="rounded-full bg-vwa-primary/90 px-3 py-1">
                                        {event.tag}
                                    </span>
                                )}
                                {isPast && (
                                    <span className="rounded-full bg-black/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
                                        Événement passé
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug drop-shadow-[0_8px_28px_rgba(0,0,0,0.65)]">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-vwa-background/90">
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    {event.date} • {event.time}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPinIcon className="h-4 w-4" />
                                    {event.location}
                                </span>
                            </div>
                        </div>

                        {/* CTA principal dans le hero */}
                        <div className="flex flex-col items-stretch gap-2 sm:items-end">
                            {!isPast ? (
                                <Link
                                    href={`/evenements/${event.slug}/inscription`}
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-vwa-background text-vwa-dark px-5 py-2 text-xs sm:text-sm font-semibold shadow-[0_18px_45px_rgba(0,0,0,0.55)] transition-all hover:-translate-y-[2px] hover:shadow-[0_24px_65px_rgba(0,0,0,0.7)]"
                                >
                                    <span>Je m&apos;inscris à cet événement</span>
                                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-[2px]" />
                                </Link>
                            ) : (
                                <span className="inline-flex items-center justify-center rounded-full bg-black/60 px-4 py-1.5 text-[11px] font-medium shadow-lg">
                                    Inscriptions closes
                                </span>
                            )}

                            {/* Lien vers médiathèque (future intégration) */}
                            <Link
                                href={`/mediatheque?event=${event.slug}`}
                                className="inline-flex items-center gap-2 rounded-full bg-vwa-background/10 px-4 py-1.5 text-[11px] font-medium text-vwa-background/95 shadow-sm backdrop-blur-sm transition-all hover:bg-vwa-background/20"
                            >
                                <PhotoIcon className="h-4 w-4" />
                                Voir les photos / vidéos de cet événement
                            </Link>
                        </div>
                    </div>
                </div>

                {/* CONTENU */}
                <div className="p-5 sm:p-7 space-y-8">
                    {/* Bloc infos + CTA secondaire */}
                    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                        {/* Infos pratiques */}
                        <div className="space-y-4">
                            <div className="space-y-1 text-sm text-vwa-dark/80">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                                    Infos pratiques
                                </p>

                                <div className="mt-1 grid gap-2 text-xs sm:text-sm">
                                    <p className="inline-flex items-start gap-2">
                                        <CalendarDaysIcon className="mt-0.5 h-4 w-4 text-vwa-accent" />
                                        <span>
                                            <span className="font-medium">Date & horaires : </span>
                                            {event.date} • {event.time}
                                        </span>
                                    </p>
                                    <p className="inline-flex items-start gap-2">
                                        <MapPinIcon className="mt-0.5 h-4 w-4 text-vwa-accent" />
                                        <span>
                                            <span className="font-medium">Lieu : </span>
                                            {event.location}
                                        </span>
                                    </p>
                                    <p className="inline-flex items-start gap-2">
                                        <CurrencyEuroIcon className="mt-0.5 h-4 w-4 text-vwa-accent" />
                                        <span>
                                            <span className="font-medium">Tarif / participation : </span>
                                            {event.price}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {event.shortDescription && (
                                <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/60 px-4 py-3 text-xs sm:text-sm text-vwa-dark/85">
                                    <p className="font-semibold text-vwa-dark mb-1">
                                        En un coup d’œil
                                    </p>
                                    <p>{event.shortDescription}</p>
                                </div>
                            )}
                        </div>

                        {/* Card “ambiance / note d’intention” */}
                        <div className="relative">
                            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-vwa-primary/30 via-vwa-accent/20 to-vwa-dark/35 opacity-60 blur-2xl" />
                            <div className="relative rounded-3xl bg-vwa-dark text-vwa-background px-5 py-4 shadow-[0_20px_60px_rgba(28,22,18,0.7)]">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-vwa-background/70">
                                    Esprit de la rencontre
                                </p>
                                <p className="mt-2 text-sm">
                                    Un moment chaleureux, bienveillant et intimiste pour faire vibrer
                                    les cultures créoles, afro-descendantes et caribéennes, en famille
                                    ou entre ami·e·s.
                                </p>
                                {!isPast && (
                                    <p className="mt-3 text-[11px] text-vwa-background/75">
                                        Les places sont limitées : pense à confirmer ton inscription
                                        pour recevoir ton ticket ou ton QR code par e-mail.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Description longue */}
                    <section className="space-y-3 text-sm text-vwa-dark/80">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                            Description détaillée
                        </h2>
                        <p className="whitespace-pre-line leading-relaxed">
                            {event.description}
                        </p>
                    </section>

                    {/* À savoir */}
                    <section className="space-y-3">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                            À savoir
                        </h2>
                        <ul className="list-disc list-inside space-y-1.5 text-sm text-vwa-dark/75">
                            <li>Les inscriptions sont nominatives et non transférables.</li>
                            <li>
                                En cas d&apos;empêchement, merci de nous prévenir au moins 48&nbsp;h à
                                l&apos;avance.
                            </li>
                            <li>
                                L&apos;adresse exacte et les infos pratiques sont rappelées dans
                                l&apos;e-mail de confirmation après inscription.
                            </li>
                            <li>
                                Selon l&apos;événement, un ticket ou QR code pourra être demandé à
                                l&apos;entrée.
                            </li>
                        </ul>
                    </section>
                </div>
            </article>
        </main>
    );
}
