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

export default function EventInscriptionPage({ params }: EventInscriptionPageProps) {
    const { slug } = params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            {/* Breadcrumb */}
            <nav className="text-xs text-vwa-dark/60">
                <Link href="/evenements" className="hover:text-vwa-dark">
                    Événements
                </Link>{" "}
                /{" "}
                <Link href={`/evenements/${event.slug}`} className="hover:text-vwa-dark">
                    {event.title}
                </Link>{" "}
                / <span className="font-medium text-vwa-dark">Inscription</span>
            </nav>

            {/* En-tête */}
            <header className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-vwa-dark/60">
                    Inscription
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                    {event.title}
                </h1>
                <p className="text-sm text-vwa-dark/75">
                    {event.date} • {event.time} • {event.location}
                </p>
            </header>

            {/* Si l’événement est passé */}
            {isPast && (
                <div className="rounded-2xl border border-vwa-background bg-vwa-background/60 px-4 py-3 text-sm text-vwa-dark/80">
                    Cet événement est terminé. Les inscriptions ne sont plus possibles, mais
                    restez à l’écoute pour nos prochains rendez-vous ✨
                </div>
            )}

            {/* Formulaire minimaliste */}
            {!isPast && (
                <section className="rounded-3xl bg-white shadow-sm border border-vwa-background/80 px-5 py-6 space-y-4">
                    <h2 className="text-lg font-semibold text-vwa-dark mb-2">
                        Je m’inscris à cet événement
                    </h2>

                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1 text-sm">
                                <label className="block text-vwa-dark/80" htmlFor="firstname">
                                    Prénom
                                </label>
                                <input
                                    id="firstname"
                                    type="text"
                                    className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                                    placeholder="Ex : Maud"
                                />
                            </div>
                            <div className="space-y-1 text-sm">
                                <label className="block text-vwa-dark/80" htmlFor="lastname">
                                    Nom
                                </label>
                                <input
                                    id="lastname"
                                    type="text"
                                    className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                                    placeholder="Ex : Aron"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 text-sm">
                            <label className="block text-vwa-dark/80" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                                placeholder="vous@example.com"
                            />
                        </div>

                        <div className="space-y-1 text-sm">
                            <label className="block text-vwa-dark/80" htmlFor="notes">
                                Message / précisions (facultatif)
                            </label>
                            <textarea
                                id="notes"
                                rows={3}
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                                placeholder="Nombre de participants, besoins spécifiques…"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                        >
                            Valider mon inscription
                        </button>
                    </form>
                </section>
            )}

            {/* À savoir */}
            <section className="space-y-2">
                <h2 className="text-sm font-semibold text-vwa-dark">À savoir</h2>
                <ul className="list-disc list-inside text-sm text-vwa-dark/75 space-y-1">
                    <li>
                        Les inscriptions sont nominatives et non transférables.
                    </li>
                    <li>
                        En cas d’annulation, merci de nous prévenir au moins 48h à l’avance.
                    </li>
                    <li>
                        L’association se réserve le droit d’annuler ou de reporter l’événement
                        en cas de nécessité (météo, nombre de participants, etc.).
                    </li>
                </ul>
            </section>
        </main>
    );
}