// app/evenements/[slug]/inscription/page.tsx
import { notFound } from "next/navigation";
import { events } from "@/data/events";

export const metadata = {
    title: "Inscription à un événement | Vwa Kiltirèl",
};

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

    const isPaid =
        event.price &&
        !event.price.toLowerCase().includes("gratuit") &&
        !event.price.toLowerCase().includes("libre");

    return (
        <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
            {/* Header */}
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

            {/* Infos pratiques / prix */}
            <section className="space-y-2">
                {event.price && (
                    <p className="text-sm font-medium text-vwa-dark">
                        Modalités :{" "}
                        <span className="font-semibold text-vwa-primary">
                            {event.price}
                        </span>
                    </p>
                )}

                {isPaid && (
                    <p className="text-xs text-vwa-dark/70">
                        La participation (10–15&nbsp;€) sera réglée via un lien de paiement
                        sécurisé (ex. HelloAsso) après validation de votre inscription.
                        Vous recevrez également un{" "}
                        <span className="font-semibold">ticket à présenter à l’entrée</span>{" "}
                        de l’événement.
                    </p>
                )}

                {!isPaid && (
                    <p className="text-xs text-vwa-dark/70">
                        Entrée libre mais{" "}
                        <span className="font-semibold">sur réservation</span>. Vous
                        recevrez un mail de confirmation avec les détails pratiques et un
                        ticket numérique à présenter à l’entrée.
                    </p>
                )}
            </section>

            {/* Formulaire minimaliste (on branchera HelloAsso plus tard) */}
            <section className="rounded-2xl bg-white shadow-sm border border-vwa-background/80 p-5 space-y-4">
                <h2 className="text-sm font-semibold text-vwa-dark">
                    Je réserve ma place
                </h2>

                <form className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark">
                            Nom et prénom
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark">
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark">
                            Nombre de personnes
                        </label>
                        <input
                            type="number"
                            min={1}
                            defaultValue={1}
                            className="w-32 rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark">
                            Message (optionnel)
                        </label>
                        <textarea
                            rows={3}
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                    >
                        Valider mon inscription
                    </button>
                </form>

                <p className="text-[11px] text-vwa-dark/60 mt-2">
                    En validant, vous recevrez un e-mail de confirmation avec les détails
                    pratiques et, le cas échéant, un lien de paiement sécurisé.
                </p>
            </section>
        </main>
    );
}
