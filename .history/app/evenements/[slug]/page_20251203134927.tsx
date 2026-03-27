// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events";

type Props = {
    params: { slug: string };
};

export default function EventDetailPage({ params }: Props) {
    const event = getEventBySlug(params.slug);

    if (!event) {
        // Si jamais quelqu'un tape une URL à la main
        notFound();
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <Link
                href="/evenements"
                className="inline-flex items-center text-xs text-vwa-primary hover:text-vwa-blueSoft transition"
            >
                ← Retour aux événements
            </Link>

            <article className="grid gap-6 md:grid-cols-[1.5fr,1fr]">
                <div className="space-y-4">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-vwa-dark/60">
                        {event.tag}
                    </p>
                    <h1 className="text-2xl font-semibold text-vwa-dark leading-snug">
                        {event.title}
                    </h1>
                    {event.subtitle && (
                        <p className="text-sm text-vwa-dark/75">{event.subtitle}</p>
                    )}

                    <dl className="mt-4 space-y-1 text-sm text-vwa-dark/80">
                        <div className="flex items-center gap-2">
                            <span className="text-[15px]">📅</span>
                            <span>
                                <dt className="sr-only">Date</dt>
                                <dd>{event.date}</dd>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[15px]">⏰</span>
                            <span>
                                <dt className="sr-only">Horaire</dt>
                                <dd>{event.time}</dd>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[15px]">📍</span>
                            <span>
                                <dt className="sr-only">Lieu</dt>
                                <dd>{event.location}</dd>
                            </span>
                        </div>
                    </dl>

                    <p className="mt-4 text-sm text-vwa-dark/80 leading-relaxed">
                        {event.longDescription}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href={`/evenements/${event.slug}#inscription`}
                            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white bg-vwa-primary/95 shadow-[0_12px_40px_rgba(7,68,82,0.35)] hover:bg-vwa-primary hover:shadow-[0_16px_50px_rgba(7,68,82,0.5)] active:scale-[0.97] transition-all"
                        >
                            Je souhaite participer
                        </Link>

                        <Link
                            href="/devenir-membre"
                            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-vwa-dark bg-white/80 border border-vwa-background hover:border-vwa-primary/50 hover:bg-vwa-background/70 transition-all"
                        >
                            Devenir membre
                        </Link>
                    </div>
                </div>

                <div className="relative h-64 md:h-full rounded-3xl overflow-hidden shadow-[0_18px_55px_rgba(71,41,24,0.18)]">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 35vw, 100vw"
                    />
                </div>
            </article>

            {/* Future zone de formulaire d’inscription */}
            <section id="inscription" className="mt-6">
                <h2 className="text-lg font-semibold text-vwa-dark mb-3">
                    Inscription à l’événement
                </h2>
                <p className="text-sm text-vwa-dark/75">
                    Ici on pourra ajouter un formulaire (nom, email, nombre de
                    participants, etc.) ou un lien vers un formulaire externe.
                </p>
            </section>
        </main>
    );
}
