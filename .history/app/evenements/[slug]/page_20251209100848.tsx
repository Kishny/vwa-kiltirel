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

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            {/* Hero */}
            <header className="space-y-4">
                <Link
                    href="/evenements"
                    className="inline-flex items-center text-xs text-vwa-dark/60 hover:text-vwa-dark"
                >
                    ← Retour aux événements
                </Link>

                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-1 space-y-3">
                        <p className="text-xs tracking-[0.2em] uppercase text-vwa-dark/60">
                            {event.category || "Événement"}
                        </p>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-vwa-dark">
                            {event.title}
                        </h1>
                        {event.tag && (
                            <span className="inline-flex items-center rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-3 py-1 text-[11px] font-medium text-vwa-accent">
                                {event.tag}
                            </span>
                        )}
                        <p className="text-sm text-vwa-dark/75">
                            {event.date} • {event.time} • {event.location}
                        </p>
                    </div>

                    <div className="relative w-full md:w-64 h-40 md:h-44 rounded-3xl overflow-hidden bg-vwa-background">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 256px, 100vw"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {!isPast ? (
                        <>
                            <Link
                                href={`/evenements/inscription?event=${event.slug}`}
                                className="px-6 py-2.5 rounded-full bg-vwa-primary text-white text-sm font-medium shadow-sm hover:bg-vwa-dark transition-all"
                            >
                                Je m&apos;inscris
                            </Link>
                            <p className="text-xs text-vwa-dark/60 self-center">
                                Places limitées – inscription recommandée.
                            </p>
                        </>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-vwa-dark/5 text-xs text-vwa-dark px-3 py-1">
                            Événement passé – inscriptions clôturées.
                        </span>
                    )}
                </div>
            </header>

            {/* Contenu */}
            <section className="space-y-4 bg-white/80 border border-vwa-background rounded-3xl p-5 md:p-6">
                {event.shortDescription && (
                    <p className="text-sm text-vwa-dark/80 font-medium">
                        {event.shortDescription}
                    </p>
                )}
                <p className="text-sm text-vwa-dark/80 whitespace-pre-line">
                    {event.description}
                </p>
            </section>

            {/* À savoir */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-vwa-dark">
                    À savoir avant de venir
                </h2>
                <ul className="text-xs text-vwa-dark/75 space-y-1.5">
                    <li>• Arriver 10 minutes avant le début de l&apos;événement.</li>
                    <li>• Possibilité d&apos;amener vos propres gourdes / bouteilles d&apos;eau.</li>
                    <li>
                        • Pour les ateliers enfants : un adulte référent doit rester sur place.
                    </li>
                </ul>
            </section>
        </main>
    );
}
