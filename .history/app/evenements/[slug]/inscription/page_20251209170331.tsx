// app/evenements/[slug]/inscription/page.tsx
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import {
    CalendarDaysIcon,
    MapPinIcon,
    UsersIcon,
    CurrencyEuroIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

// On garde le pattern qui fonctionne déjà chez toi
export default async function EventInscriptionPage({ params }: any) {
    const { slug } = await params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPaid =
        event.price &&
        !event.price.toLowerCase().includes("gratuit") &&
        !event.price.toLowerCase().includes("libre");

    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10">
            {/* Halo de fond animé */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/40 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/20 blur-3xl opacity-60 animate-pulse" />
            </div>

            {/* En-tête */}
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-3">
                    <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-vwa-dark/60">
                        <SparklesIcon className="h-3 w-3 text-vwa-accent" />
                        Inscription à l&apos;événement
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark leading-tight">
                        {event.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {event.category && (
                            <span className="rounded-full bg-vwa-dark/5 px-3 py-1 font-medium text-vwa-dark/80">
                                {event.category}
                            </span>
                        )}
                        {event.tag && (
                            <span className="rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-3 py-1 font-medium text-vwa-accent">
                                {event.tag}
                            </span>
                        )}
                    </div>
                </div>

                {/* Carte résumé événement */}
                <aside className="relative mt-2 w-full sm:w-72">
                    <div className="group rounded-3xl bg-white/80 px-4 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.16)] border border-vwa-background/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(28,22,18,0.22)]">
                        <div className="flex items-center justify-between text-xs text-vwa-dark/70">
                            <span className="inline-flex items-center gap-1">
                                <CalendarDaysIcon className="h-4 w-4" />
                                {event.date}
                            </span>
                            <span>{event.time}</span>
                        </div>

                        <div className="mt-3 flex items-start gap-2 text-xs text-vwa-dark/75">
                            <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                            <span>{event.location}</span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center gap-1 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/80">
                                <UsersIcon className="h-3.5 w-3.5" />
                                Places limitées
                            </div>
                            <div className="inline-flex items-center gap-1 rounded-full bg-vwa-primary/10 px-3 py-1 text-[11px] font-semibold text-vwa-primary">
                                <CurrencyEuroIcon className="h-3.5 w-3.5" />
                                {event.price}
                            </div>
                        </div>
                    </div>
                </aside>
            </header>

            {/* Layout 2 colonnes : formulaire + infos */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                {/* FORMULAIRE */}
                <section className="space-y-4">
                    {/* Barre de progression “fictive” */}
                    <div className="relative overflow-hidden rounded-2xl bg-vwa-dark/90 px-4 py-3 text-xs text-vwa-background shadow-[0_16px_40px_rgba(28,22,18,0.55)]">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-vwa-background/10 text-[11px] font-semibold">
                                    1
                                </span>
                                <span className="font-medium">Vos informations</span>
                            </div>
                            <div className="hidden items-center gap-2 sm:flex">
                                <span className="h-1 w-14 rounded-full bg-vwa-background/25">
                                    <span className="block h-1 w-7 rounded-full bg-vwa-accent animate-[pulse_1.8s_ease-in-out_infinite]" />
                                </span>
                                <span className="text-[11px] text-vwa-background/70">
                                    Étape 1 sur 3
                                </span>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-5 rounded-3xl bg-white/90 px-5 py-6 shadow-[0_18px_55px_rgba(28,22,18,0.14)] border border-vwa-background/80 backdrop-blur-sm">
                        {/* Identité */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="group space-y-1">
                                <label className="flex items-center justify-between text-xs font-medium text-vwa-dark/80">
                                    <span>Prénom</span>
                                    <span className="text-[10px] text-vwa-accent/80 group-focus-within:text-vwa-accent">
                                        Obligatoire
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="peer w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 shadow-[0_0_0_0_rgba(0,0,0,0)] outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                                        placeholder="Ex : Annie"
                                    />
                                    <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1px] origin-left scale-x-0 bg-vwa-accent/80 opacity-0 transition-all duration-200 peer-focus:scale-x-100 peer-focus:opacity-100" />
                                </div>
                            </div>

                            <div className="group space-y-1">
                                <label className="flex items-center justify-between text-xs font-medium text-vwa-dark/80">
                                    <span>Nom</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="peer w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                                        placeholder="Ex : DUPONT"
                                    />
                                    <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1px] origin-left scale-x-0 bg-vwa-accent/80 opacity-0 transition-all duration-200 peer-focus:scale-x-100 peer-focus:opacity-100" />
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                            <div className="group space-y-1">
                                <label className="text-xs font-medium text-vwa-dark/80">
                                    Adresse e-mail
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="peer w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                                        placeholder="vous@example.com"
                                    />
                                    <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1px] origin-left scale-x-0 bg-vwa-accent/80 opacity-0 transition-all duration-200 peer-focus:scale-x-100 peer-focus:opacity-100" />
                                </div>
                            </div>

                            <div className="group space-y-1">
                                <label className="text-xs font-medium text-vwa-dark/80">
                                    Téléphone (optionnel)
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="peer w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                                        placeholder="Pour un rappel la veille de l’événement"
                                    />
                                    <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1px] origin-left scale-x-0 bg-vwa-accent/80 opacity-0 transition-all duration-200 peer-focus:scale-x-100 peer-focus:opacity-100" />
                                </div>
                            </div>
                        </div>

                        {/* Participants */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="group space-y-1">
                                <label className="text-xs font-medium text-vwa-dark/80">
                                    Nombre d&apos;adultes
                                </label>
                                <input
                                    type="number"
                                    name="adults"
                                    min={1}
                                    defaultValue={1}
                                    className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                                />
                            </div>
                            <div className="group space-y-1">
                                <label className="text-xs font-medium text-vwa-dark/80">
                                    Nombre d&apos;enfants
                                </label>
                                <input
                                    type="number"
                                    name="children"
                                    min={0}
                                    defaultValue={0}
                                    className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="group space-y-1">
                            <label className="text-xs font-medium text-vwa-dark/80">
                                Message (allergies, besoins particuliers, infos bébé…)
                            </label>
                            <textarea
                                name="message"
                                rows={3}
                                className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                                placeholder="Dites-nous ce dont vous avez besoin pour être à l’aise…"
                            />
                        </div>

                        {/* Infos paiement + CTA */}
                        {isPaid && (
                            <div className="rounded-2xl border border-vwa-primary/25 bg-vwa-primary/5 px-4 py-3 text-xs text-vwa-dark/80">
                                <p className="font-semibold text-vwa-primary mb-1">
                                    Participation libre ou conseillée
                                </p>
                                <p>
                                    Pour cet événement, une participation (ex. 10–15&nbsp;€) sera
                                    demandée via un lien de paiement sécurisé (HelloAsso) ou sur
                                    place. Tous les détails seront précisés dans l&apos;email de
                                    confirmation.
                                </p>
                            </div>
                        )}

                        <div className="space-y-2 pt-1">
                            <button
                                type="submit"
                                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(28,22,18,0.45)] transition-all duration-200 hover:shadow-[0_20px_55px_rgba(28,22,18,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70"
                            >
                                <span className="absolute inset-0 opacity-40">
                                    <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                                </span>
                                <span className="relative">Valider mon inscription</span>
                            </button>
                            <p className="text-[11px] text-vwa-dark/60">
                                Après validation, vous recevrez un e-mail de confirmation avec
                                un ticket ou un QR code à présenter à l&apos;entrée de
                                l&apos;événement.
                            </p>
                        </div>
                    </form>
                </section>

                {/* COLONNE DROITE : “À savoir” + ambiance */}
                <section className="space-y-4">
                    <div className="rounded-3xl bg-white/80 px-4 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.15)] border border-vwa-background/90 backdrop-blur-sm">
                        <h2 className="mb-2 text-sm font-semibold text-vwa-dark">
                            À savoir
                        </h2>
                        <ul className="list-disc list-inside space-y-1.5 text-xs text-vwa-dark/75">
                            <li>
                                Les inscriptions sont nominatives et ne peuvent pas être
                                transférées à une autre personne.
                            </li>
                            <li>
                                Merci de nous prévenir au moins 48&nbsp;h à l&apos;avance en cas
                                d&apos;annulation.
                            </li>
                            <li>
                                L&apos;association se réserve le droit de reporter ou
                                d&apos;annuler l&apos;événement en cas de circonstances
                                exceptionnelles.
                            </li>
                            <li>
                                L&apos;adresse exacte et les infos pratiques sont rappelées dans
                                l&apos;e-mail de confirmation.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl bg-vwa-dark text-vwa-background px-4 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.6)]">
                        <p className="text-xs uppercase tracking-[0.18em] text-vwa-background/70">
                            Esprit Vwa Kiltirèl
                        </p>
                        <p className="mt-2 text-sm font-medium">
                            Des moments chaleureux, sécurisés et bienveillants pour faire
                            vibrer les cultures créoles, afro-descendantes et caribéennes à
                            Tours.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}