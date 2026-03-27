// app/evenements/[slug]/inscription/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { events } from "@/data/events";

type EventInscriptionPageProps = {
    params: { slug: string };
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventInscriptionPage({
    params,
}: EventInscriptionPageProps) {
    const { slug } = params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-xl mx-auto px-4 py-10 space-y-6">
            <header className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-vwa-dark/60">
                    Inscription
                </p>
                <h1 className="text-2xl font-extrabold text-vwa-dark">
                    {event.title}
                </h1>
                <p className="text-sm text-vwa-dark/75">
                    {event.date} • {event.time} • {event.location}
                </p>
            </header>

            {isPast ? (
                <p className="text-sm text-vwa-dark/75">
                    Cet événement est déjà passé. D&apos;autres rendez-vous arrivent
                    bientôt dans l&apos;agenda !
                </p>
            ) : (
                <>
                    <p className="text-sm text-vwa-dark/80">
                        Formulaire ultra minimaliste pour le moment (à compléter plus
                        tard). L&apos;objectif est juste de valider le routing.
                    </p>

                    <form className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                                Nom et prénom
                            </label>
                            <input
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm"
                                placeholder="Votre nom complet"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                                Email
                            </label>
                            <input
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm"
                                placeholder="vous@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 inline-flex items-center justify-center rounded-full bg-vwa-primary px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                        >
                            Valider mon inscription
                        </button>
                    </form>
                </>
            )}

            <div className="pt-4">
                <Link
                    href={`/evenements/${event.slug}`}
                    className="text-xs text-vwa-dark/70 underline"
                >
                    ← Retour à la fiche de l&apos;événement
                </Link>
            </div>
        </main>
    );
}