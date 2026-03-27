// app/evenements/[slug]/inscription/page.tsx
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

    // On considère que tout ce qui n’est pas "gratuit / libre" est une participation payante
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

            {/* FORMULAIRE D’INSCRIPTION (simple, HTML pur) */}
            <section className="rounded-3xl bg-white shadow-sm border border-vwa-background px-5 py-6 space-y-4">
                <h2 className="text-base font-semibold text-vwa-dark">
                    Formulaire d&apos;inscription
                </h2>

                {/* Pour l’instant, on ne branche rien : pas de onSubmit, pas de hook.
            Plus tard on pluggera HelloAsso ou un backend. */}
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
                            Pour ce brunch, une participation entre 10&nbsp;€ et 15&nbsp;€
                            sera demandée au moment de l&apos;inscription via un lien de
                            paiement sécurisé (type HelloAsso) ou sur place selon les
                            indications envoyées dans l&apos;email de confirmation.
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
                        ticket ou un QR code à présenter à l&apos;entrée du lieu de
                        l&apos;événement.
                    </p>
                </form>
            </section>

            {/* À SAVOIR */}
            <section className="space-y-2">
                <h2 className="text-sm font-semibold text-vwa-dark">À savoir</h2>
                <ul className="list-disc list-inside text-xs text-vwa-dark/75 space-y-1">
                    <li>
                        Les inscriptions sont nominatives et ne peuvent pas être cédées
                        sans accord préalable de l&apos;association.
                    </li>
                    <li>
                        En cas d&apos;empêchement, merci de nous prévenir au moins 48&nbsp;h
                        à l&apos;avance pour libérer la place.
                    </li>
                    <li>
                        Certains événements peuvent être annulés ou reprogrammés en cas de
                        météo défavorable ou de nombre insuffisant de participants.
                    </li>
                </ul>
            </section>
        </main>
    );
}
