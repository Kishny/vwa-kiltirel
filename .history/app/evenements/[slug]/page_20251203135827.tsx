// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";

type EventDetailPageProps = {
    params: Promise<{ slug: string }>;
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    // ⚠️ IMPORTANT : on "déballe" la Promise params
    const { slug } = await params;

    const event = getEventBySlug(slug);

    if (!event) {
        // Si jamais quelqu’un tape une URL à la main
        return (
            <main className="max-w-4xl mx-auto px-4 py-16">
                <div className="rounded-3xl border border-vwa-background/80 bg-white/80 px-6 py-10 text-center shadow-[0_18px_60px_rgba(38,25,17,0.14)]">
                    <p className="text-sm font-medium text-vwa-dark/60 uppercase tracking-[0.18em]">
                        Événement introuvable
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold text-vwa-dark">
                        Oups… cet événement n’existe plus.
                    </h1>
                    <p className="mt-3 text-sm text-vwa-dark/70">
                        Il a peut-être été archivé ou supprimé. Tu peux revenir à la liste
                        des événements pour découvrir les prochaines dates.
                    </p>

                    <Link
                        href="/evenements"
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(7,68,82,0.35)] hover:bg-vwa-primary/95 hover:shadow-[0_18px_50px_rgba(7,68,82,0.5)] active:scale-[0.97] transition-all"
                    >
                        ← Retour aux événements
                    </Link>
                </div>
            </main>
        );
    }

    const isPast = new Date(event.date) < new Date();

    return (
        <main className="max-w-5xl mx-auto px-4 py-10 lg:py-12 space-y-8">
            {/* Lien retour */}
            <Link
                href="/evenements"
                className="inline-flex items-center gap-2 text-xs font-medium text-vwa-dark/70 hover:text-vwa-dark transition"
            >
                <span className="text-lg">←</span>
                Retour aux événements
            </Link>

            {/* Carte principale */}
            <section className="overflow-hidden rounded-3xl border border-vwa-background/80 bg-white shadow-[0_18px_60px_rgba(38,25,17,0.18)]">
                <div className="grid lg:grid-cols-[3fr_2fr]">
                    {/* Bloc texte */}
                    <div className="p-6 sm:p-8 flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-vwa-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-vwa-dark/70">
                                {event.category}
                            </span>

                            {isPast ? (
                                <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                                    Événement passé
                                </span>
                            ) : (
                                <span className="rounded-full bg-vwa-terracotta/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-vwa-terracotta">
                                    Inscriptions ouvertes
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark leading-tight">
                            {event.title}
                        </h1>

                        {/* Infos principales */}
                        <div className="mt-2 space-y-2 text-sm text-vwa-dark/80">
                            <p>
                                <span className="font-semibold">Date :</span>{" "}
                                {event.dateLabel}
                            </p>
                            <p>
                                <span className="font-semibold">Horaire :</span>{" "}
                                {event.time}
                            </p>
                            <p>
                                <span className="font-semibold">Lieu :</span>{" "}
                                {event.location}
                            </p>
                        </div>

                        {/* Description */}
                        {event.description && (
                            <p className="mt-3 text-sm leading-relaxed text-vwa-dark/80">
                                {event.description}
                            </p>
                        )}

                        {/* CTA inscription */}
                        {!isPast && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                <a
                                    href="#inscription"
                                    className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(7,68,82,0.35)] hover:bg-vwa-primary/95 hover:shadow-[0_18px_50px_rgba(7,68,82,0.5)] active:scale-[0.97] transition-all"
                                >
                                    Je m’inscris
                                </a>

                                <p className="text-xs text-vwa-dark/60 flex items-center">
                                    {event.badgeText ?? "Places limitées – inscription conseillée"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Image côté droit */}
                    <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-full bg-vwa-background">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Bloc inscription simple (placeholder) */}
            <section
                id="inscription"
                className="rounded-3xl border border-vwa-background/80 bg-white/90 px-6 py-7 sm:px-8 shadow-[0_14px_50px_rgba(38,25,17,0.12)]"
            >
                <h2 className="text-lg font-semibold text-vwa-dark">
                    Inscription à l’événement
                </h2>
                <p className="mt-2 text-sm text-vwa-dark/75">
                    On mettra ici le vrai formulaire (nom, prénom, email, nombre de
                    personnes, etc.). Pour l’instant, c’est juste une version de travail
                    pour la maquette.
                </p>
            </section>
        </main>
    );
}
