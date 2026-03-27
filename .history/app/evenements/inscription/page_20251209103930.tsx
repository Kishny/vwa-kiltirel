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
        <main className="max-w-lg mx-auto px-4 py-10 space-y-6">
            <nav className="text-xs text-vwa-dark/60">
                <Link href="/" className="hover:underline">
                    Accueil
                </Link>{" "}
                <span className="mx-1 text-vwa-dark/40">/</span>
                <Link href="/evenements" className="hover:underline">
                    Événements
                </Link>{" "}
                <span className="mx-1 text-vwa-dark/40">/</span>
                <Link href={`/evenements/${event.slug}`} className="hover:underline">
                    {event.title}
                </Link>{" "}
                <span className="mx-1 text-vwa-dark/40">/</span>
                <span className="text-vwa-dark/80">Inscription</span>
            </nav>

            <header className="space-y-2">
                <h1 className="text-xl font-extrabold text-vwa-dark">
                    Inscription – {event.title}
                </h1>
                <p className="text-sm text-vwa-dark/75">
                    {event.date} • {event.time} • {event.location}
                </p>
            </header>

            {isPast ? (
                <p className="text-sm text-vwa-dark/75">
                    Cet événement est passé. Les inscriptions ne sont plus possibles.
                </p>
            ) : (
                <form className="space-y-4 rounded-2xl bg-white border border-vwa-background px-4 py-5 shadow-sm">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80">
                            Nom et prénom
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                            placeholder="Votre nom complet"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80">
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                            placeholder="vous@example.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80">
                            Nombre de personnes
                        </label>
                        <input
                            type="number"
                            min={1}
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                            defaultValue={1}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-vwa-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                    >
                        Valider mon inscription
                    </button>
                </form>
            )}
        </main>
    );
}
