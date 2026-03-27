// app/evenements/[slug]/inscription/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

type EventInscriptionPageProps = {
    params: { slug: string };
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default async function EventInscriptionPage({
    params,
}: EventInscriptionPageProps) {
    const { slug } = params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
            {/* BREADCRUMB */}
            <div className="flex items-center justify-between gap-4 text-sm">
                <Link
                    href={`/evenements/${slug}`}
                    className="inline-flex items-center gap-2 text-vwa-dark/70 hover:text-vwa-dark transition-colors"
                >
                    <span aria-hidden="true">←</span>
                    <span>Retour à l&apos;événement</span>
                </Link>

                <Link
                    href="/evenements"
                    className="hidden sm:inline-flex items-center gap-2 text-vwa-dark/60 hover:text-vwa-dark transition-colors"
                >
                    Tous les événements
                </Link>
            </div>

            {/* HEADER */}
            <header className="space-y-3">
                <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-vwa-dark/60">
                    Inscription · Vwa Kiltirèl
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-vwa-dark">
                    {event.title}
                </h1>
                <p className="text-sm sm:text-base text-vwa-dark/75">
                    {event.date}
                    {event.time && ` · ${event.time}`} • {event.location}
                </p>
            </header>

            {/* BLOC INFO / PLACEHOLDER POUR LE FUTUR FORMULAIRE */}
            <section className="rounded-3xl border border-vwa-background/80 bg-white/90 p-5 sm:p-6 shadow-sm space-y-4">
                {isPast ? (
                    <>
                        <h2 className="text-base sm:text-lg font-semibold text-vwa-dark">
                            Événement passé
                        </h2>
                        <p className="text-sm text-vwa-dark/75 leading-relaxed">
                            Cet événement est terminé, mais d&apos;autres moments arrivent
                            très bientôt dans la programmation de Vwa Kiltirèl.
                        </p>
                        <Link
                            href="/evenements"
                            className="inline-flex mt-2 items-center gap-2 rounded-full border border-vwa-dark/15 bg-vwa-background/80 px-5 py-2 text-sm font-medium text-vwa-dark/80 hover:border-vwa-primary/40 hover:bg-vwa-background/90 hover:text-vwa-primary transition"
                        >
                            Voir les prochains événements
                        </Link>
                    </>
                ) : (
                    <>
                        <h2 className="text-base sm:text-lg font-semibold text-vwa-dark">
                            Inscription en ligne
                        </h2>
                        <p className="text-sm text-vwa-dark/80 leading-relaxed">
                            Le formulaire d&apos;inscription sera bientôt disponible directement
                            sur cette page. En attendant, vous pouvez réserver vos places en
                            nous envoyant un message avec :
                        </p>
                        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-vwa-dark/80">
                            <li>Le nom de l&apos;événement : {event.title}</li>
                            <li>Le nombre de participant·es (adultes et enfants)</li>
                            <li>Un numéro de téléphone pour vous joindre</li>
                        </ul>
                        <p className="pt-2 text-sm text-vwa-dark/80">
                            Envoyer ces informations à :{" "}
                            <a
                                href="mailto:contact@vwa-kiltirel.fr"
                                className="font-semibold text-vwa-primary underline-offset-2 hover:underline"
                            >
                                contact@vwa-kiltirel.fr
                            </a>
                        </p>
                    </>
                )}
            </section>

            {/* CTA de confort */}
            {!isPast && (
                <section className="text-xs sm:text-sm text-vwa-dark/65">
                    <p>
                        💡 Une fois le formulaire intégré, cette page permettra de vous
                        inscrire en quelques clics, avec une confirmation par email.
                    </p>
                </section>
            )}
        </main>
    );
}