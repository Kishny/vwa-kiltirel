// app/evenements/[slug]/inscription/page.tsx
import { notFound } from "next/navigation";
import { events } from "@/data/events";

// Petit helper pour retrouver l'événement
function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

// ⚠️ Pas de "async" ici, pas de type avec Promise, rien de spécial
export default function EventInscriptionPage({
    params,
}: {
    params: { slug: string };
}) {
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
            {/* HEADER */}
            <header className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-vwa-dark/60">
                    Inscription à l&apos;événement
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                    {event.title}
                </h1>
                <p className="text-sm text-vwa-dark/75">
                    {event.date} • {event.time} • {event.location}
                </p>
                <p className="text-sm font-medium text-vwa-accent mt-2">
                    {event.price}
                </p>
            </header>

            {/* FORMULAIRE D’INSCRIPTION (statique pour l’instant) */}
            <section className="rounded-3xl bg-white shadow-sm border border-vwa-background px-5 py-6 space-y-4">
                <h2 className="text-base font-semibold text-vwa-dark">
                    Formulaire d&apos;inscription
                </h2>

                <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                                Prénom
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                                Nom
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                                Nombre d&apos;adultes
                            </label>
                            <input
                                type="number"
                                name="adults"
                                defaultValue={1}
                                min={1}
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                                Nombre d&apos;enfants
                            </label>
                            <input
                                type="number"
                                name="children"
                                defaultValue={0}
                                min={0}
                                className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-vwa-dark/80 mb-1">
                            Message (allergies, besoins particuliers…)
                        </label>
                        <textarea
                            name="message"
                            rows={3}
                            className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
                        />
                    </div>

                    {isPaid && (
                        <p className="text-xs text-vwa-dark/70">
                            Pour cet événement, une participation (ex. 10–15&nbsp;€) sera
                            demandée via un lien de paiement sécurisé (HelloAsso) ou sur
                            place. Tous les détails seront précisés dans l&apos;email de
                            confirmation.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                    >
                        Valider mon inscription
                    </button>

                    <p className="text-[11px] text-vwa-dark/60 mt-2">
                        Après validation, vous recevrez un e-mail de confirmation avec un
                        ticket ou un QR code à présenter à l&apos;entrée de l&apos;événement.
                    </p>
                </form>
            </section>

            <section className="space-y-2">
                <h2 className="text-sm font-semibold text-vwa-dark">À savoir</h2>
                <ul className="list-disc list-inside text-xs text-vwa-dark/75 space-y-1">
                    <li>Les inscriptions sont nominatives et non transférables.</li>
                    <li>
                        Merci de nous prévenir au moins 48&nbsp;h à l&apos;avance en cas
                        d&apos;annulation.
                    </li>
                    <li>
                        L&apos;association se réserve le droit d&apos;annuler ou de
                        reporter l&apos;événement en cas de circonstances exceptionnelles.
                    </li>
                </ul>
            </section>
        </main>
    );
}
