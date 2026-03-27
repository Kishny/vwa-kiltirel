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
    const { slug } = params; // ⬅️ plus de Promise ici
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            {/* Header visuel */}
            <header className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-vwa-dark/60">
                    {isPast ? "Événement passé" : "Événement à venir"}
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                    {event.title}
                </h1>
                <p className="text-sm text-vwa-dark/75 max-w-2xl">
                    {event.shortDescription}
                </p>
            </header>

            {/* Bloc principal */}
            <section className="grid gap-6 md:grid-cols-[1.3fr,1fr] items-start">
                {/* Texte */}
                <article className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-vwa-dark/70">
                        {event.category && (
                            <span className="rounded-full bg-vwa-dark/5 px-3 py-1 font-medium text-vwa-dark/80">
                                {event.category}
                            </span>
                        )}
                        {event.tag && (
                            <span className="rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-3 py-1 font-medium text-vwa-accent">
                                {event.tag}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-vwa-dark/75">
                        {event.date} • {event.time} • {event.location}
                    </p>

                    <p className="text-sm text-vwa-dark/80 leading-relaxed whitespace-pre-line">
                        {event.description}
                    </p>

                    <p className="text-sm font-semibold text-vwa-dark">
                        {event.price}
                    </p>

                    {!isPast && (
                        <div className="mt-4">
                            <Link
                                href={`/evenements/${event.slug}/inscription`}
                                className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                            >
                                Je m&apos;inscris
                            </Link>
                        </div>
                    )}
                </article>

                {/* Image */}
                <div className="relative w-full h-64 md:h-full rounded-3xl overflow-hidden bg-vwa-background">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 320px, 100vw"
                    />
                </div>
            </section>

            {/* À savoir */}
            <section className="mt-6 rounded-3xl bg-white/70 border border-vwa-background px-5 py-4 space-y-2">
                <h2 className="text-sm font-semibold text-vwa-dark">À savoir</h2>
                <ul className="list-disc list-inside text-sm text-vwa-dark/75 space-y-1">
                    <li>
                        Les inscriptions aux événements sont nominatives et non
                        transférables.
                    </li>
                    <li>
                        En cas d&apos;annulation de votre part, merci de nous prévenir au
                        moins 48h à l&apos;avance.
                    </li>
                    <li>
                        L&apos;association se réserve le droit d&apos;annuler un événement
                        en cas de nombre insuffisant de participants ou de circonstances
                        imprévues.
                    </li>
                </ul>
            </section>
        </main>
    );
}