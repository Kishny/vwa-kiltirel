// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";

type EventDetailPageProps = {
    params: { slug: string };
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    const event = getEventBySlug(params.slug);

    if (!event) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-2xl font-semibold text-vwa-dark mb-4">
                    Événement introuvable
                </h1>
                <p className="text-vwa-dark/70 mb-4">
                    L’événement que vous cherchez n’existe plus ou a été déplacé.
                </p>
                <Link
                    href="/evenements"
                    className="inline-flex items-center text-sm font-medium text-vwa-primary hover:underline"
                >
                    ← Revenir à la liste des événements
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-10 md:py-16">
            {/* Bandeau visuel */}
            <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-start mb-10">
                <div>
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-vwa-dark/60 mb-2">
                        {event.category}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-vwa-dark mb-4">
                        {event.title}
                    </h1>

                    <div className="space-y-2 text-sm text-vwa-dark/80 mb-4">
                        <p>
                            <span className="font-medium">📅</span> {event.dateLabel}
                        </p>
                        <p>
                            <span className="font-medium">⏰</span> {event.time}
                        </p>
                        <p>
                            <span className="font-medium">📍</span> {event.location}
                        </p>
                    </div>

                    {event.description && (
                        <p className="text-sm text-vwa-dark/80 leading-relaxed mb-6">
                            {event.description}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={`/evenements/${event.slug}#inscription`}
                            className="inline-flex items-center justify-center rounded-full bg-vwa-terracotta px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-vwa-terracotta/30 transition-all duration-200 hover:shadow-lg hover:shadow-vwa-terracotta/50 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vwa-terracotta/70 focus-visible:ring-offset-2 focus-visible:ring-offset-vwa-background active:scale-95"
                        >
                            Je m’inscris
                        </Link>

                        <Link
                            href="/evenements"
                            className="inline-flex items-center justify-center rounded-full border border-vwa-dark/15 bg-white/70 px-5 py-2 text-sm font-medium text-vwa-dark shadow-sm hover:bg-vwa-background/60 hover:shadow-md transition-all duration-200 active:scale-95"
                        >
                            Voir tous les événements
                        </Link>
                    </div>
                </div>

                {/* Image événement */}
                <div className="relative w-full overflow-hidden rounded-3xl bg-vwa-background shadow-lg shadow-vwa-dark/5">
                    <div className="relative aspect-[4/3]">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 320px, 100vw"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Bloc infos pratiques + ancre inscription */}
            <section
                id="inscription"
                className="grid gap-6 md:grid-cols-2 items-start"
            >
                <div className="rounded-3xl bg-white/80 p-6 shadow-md shadow-vwa-dark/5 border border-vwa-background">
                    <h2 className="text-lg font-semibold text-vwa-dark mb-3">
                        Informations pratiques
                    </h2>
                    <ul className="space-y-2 text-sm text-vwa-dark/80">
                        <li>• Merci d’arriver 10 minutes en avance.</li>
                        <li>• Atelier adapté aux familles et enfants accompagnés.</li>
                        <li>• Lieu exact confirmé par email après inscription.</li>
                    </ul>
                </div>

                <div className="rounded-3xl bg-vwa-primary/5 border border-vwa-primary/15 p-6 shadow-md shadow-vwa-primary/10">
                    <h2 className="text-lg font-semibold text-vwa-dark mb-3">
                        Inscription
                    </h2>
                    <p className="text-sm text-vwa-dark/80 mb-4">
                        L’inscription nous permet de mieux organiser l’accueil et le
                        matériel. Merci de prendre un instant pour réserver votre place.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-vwa-primary/40 hover:shadow-lg hover:shadow-vwa-primary/60 hover:-translate-y-[1px] transition-all duration-200 active:scale-95"
                    >
                        Je confirme ma participation
                    </Link>
                </div>
            </section>
        </main>
    );
}
