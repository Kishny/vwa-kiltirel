// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

type EventDetailPageProps = {
    // avec Next 16, params est typé comme une Promise
    params: Promise<{ slug: string }>;
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    // 💡 ICI le fix : on "unwrap" la Promise
    const { slug } = await params;

    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
            {/* Fil d’Ariane / retour */}
            <Link
                href="/evenements"
                className="inline-flex items-center text-xs text-vwa-dark/60 hover:text-vwa-dark transition"
            >
                ← Retour aux événements
            </Link>

            <article className="overflow-hidden rounded-3xl bg-white shadow-sm border border-vwa-background/80">
                {/* HERO visuel */}
                <div className="relative h-56 sm:h-64">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(min-width: 1024px) 896px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0" />

                    <div className="absolute inset-x-5 bottom-5 flex flex-col gap-2 text-white">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
                            {event.category && (
                                <span className="rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm">
                                    {event.category}
                                </span>
                            )}
                            {event.tag && (
                                <span className="rounded-full bg-vwa-primary/90 px-2.5 py-1">
                                    {event.tag}
                                </span>
                            )}
                            {isPast && (
                                <span className="rounded-full bg-black/70 px-2.5 py-1">
                                    Événement passé
                                </span>
                            )}
                        </div>

                        <h1 className="text-xl sm:text-2xl font-extrabold leading-snug">
                            {event.title}
                        </h1>

                        <p className="text-xs sm:text-sm text-vwa-background/90">
                            {event.date} • {event.time} • {event.location}
                        </p>
                    </div>
                </div>

                {/* CONTENU */}
                <div className="p-5 sm:p-7 space-y-7">
                    {/* Bloc infos + CTA */}
                    <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-1 text-sm text-vwa-dark/80">
                            <p className="font-semibold text-vwa-dark">Infos pratiques</p>
                            <p>{event.price}</p>
                            <p>{event.shortDescription}</p>
                        </div>

                        <div className="flex flex-col items-stretch gap-2 sm:items-end">
                            {!isPast ? (
                                <>
                                    <Link
                                        href={`/evenements/${event.slug}/inscription`}
                                        className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2 text-xs sm:text-sm font-medium text-white shadow-md hover:bg-vwa-dark hover:shadow-lg transition-all"
                                    >
                                        Je m&apos;inscris à cet événement
                                    </Link>
                                    <p className="text-[11px] text-vwa-dark/60 text-right max-w-xs">
                                        Places limitées. L&apos;inscription est gratuite mais
                                        obligatoire.
                                    </p>
                                </>
                            ) : (
                                <p className="rounded-full border border-vwa-background px-4 py-2 text-[11px] font-medium text-vwa-dark/70 bg-vwa-background/40">
                                    Les inscriptions sont closes, cet événement est passé.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Description longue */}
                    <section className="space-y-3 text-sm text-vwa-dark/80">
                        <h2 className="text-base font-semibold text-vwa-dark">
                            Description
                        </h2>
                        <p className="whitespace-pre-line">{event.description}</p>
                    </section>

                    {/* À savoir */}
                    <section className="space-y-3">
                        <h2 className="text-base font-semibold text-vwa-dark">À savoir</h2>
                        <ul className="list-disc list-inside text-sm text-vwa-dark/75 space-y-1.5">
                            <li>Les inscriptions sont nominatives et non transférables.</li>
                            <li>
                                En cas d&apos;empêchement, merci de nous prévenir au moins 48h à
                                l&apos;avance.
                            </li>
                            <li>
                                L&apos;adresse exacte et les infos pratiques seront rappelées par
                                email après inscription.
                            </li>
                        </ul>
                    </section>
                </div>
            </article>
        </main>
    );
}