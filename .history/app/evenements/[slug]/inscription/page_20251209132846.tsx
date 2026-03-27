// app/evenements/[slug]/inscription/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import {
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
    EnvelopeIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

type EventInscriptionPageProps = {
    params: Promise<{ slug: string }>;
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default async function EventInscriptionPage({
    params,
}: EventInscriptionPageProps) {
    const { slug } = await params;

    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="min-h-[90vh] bg-gradient-to-b from-vwa-background via-vwa-background/70 to-white">
            <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center justify-between gap-4 text-xs">
                    <Link
                        href="/evenements"
                        className="inline-flex items-center text-vwa-dark/60 hover:text-vwa-dark transition-colors"
                    >
                        ← Retour aux événements
                    </Link>
                    <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[11px] text-vwa-dark/70 shadow-sm">
                        Formulaire sécurisé • Données confidentielles
                    </span>
                </div>

                {/* Halo animé derrière la card */}
                <div className="relative">
                    <div className="pointer-events-none absolute -inset-1 rounded-[32px] bg-gradient-to-r from-vwa-primary/35 via-vwa-accent/25 to-vwa-primary/35 blur-xl opacity-70" />

                    {/* CARD principale */}
                    <div className="relative rounded-[28px] bg-white/90 backdrop-blur-xl border border-vwa-background/70 shadow-xl shadow-vwa-background/70 overflow-hidden">
                        <div className="grid gap-0 lg:grid-cols-[1.2fr,1fr]">
                            {/* COLONNE FORMULAIRE */}
                            <section className="px-6 py-7 sm:px-8 sm:py-8 space-y-6">
                                <header className="space-y-2">
                                    <p className="text-[11px] uppercase tracking-[0.25em] text-vwa-dark/55">
                                        Inscription • Vwa Kiltirèl
                                    </p>
                                    <h1 className="text-xl sm:text-2xl font-extrabold text-vwa-dark leading-tight">
                                        {event.title}
                                    </h1>
                                    <p className="text-xs sm:text-sm text-vwa-dark/70 max-w-md">
                                        Remplis ce formulaire pour réserver ta place. Tu recevras un
                                        email de confirmation avec toutes les infos pratiques.
                                    </p>
                                </header>

                                {isPast ? (
                                    <div className="rounded-2xl border border-vwa-background bg-vwa-background/80 px-4 py-4 text-sm text-vwa-dark/80 space-y-2">
                                        <p className="font-semibold text-vwa-dark">
                                            Cet événement est déjà passé.
                                        </p>
                                        <p>
                                            Les inscriptions ne sont plus possibles, mais d&apos;autres
                                            rendez-vous arrivent très vite dans l&apos;agenda ✨
                                        </p>
                                        <Link
                                            href="/evenements"
                                            className="inline-flex mt-2 text-xs font-medium text-vwa-primary hover:text-vwa-dark transition-colors underline-offset-2 hover:underline"
                                        >
                                            Voir les prochains événements
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        {/* Petit stepper visuel */}
                                        <div className="flex items-center gap-2 text-[11px] text-vwa-dark/60">
                                            <div className="flex items-center gap-1">
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-vwa-primary text-[10px] font-semibold text-white shadow-md shadow-vwa-primary/40">
                                                    1
                                                </span>
                                                <span>Infos personnelles</span>
                                            </div>
                                            <span className="h-px flex-1 bg-vwa-background" />
                                            <div className="flex items-center gap-1 opacity-60">
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-vwa-background/80 text-[10px] font-semibold text-vwa-dark/60">
                                                    2
                                                </span>
                                                <span>Confirmation</span>
                                            </div>
                                        </div>

                                        {/* FORMULAIRE */}
                                        <form className="space-y-4 sm:space-y-5">
                                            {/* Nom */}
                                            <div className="space-y-1.5 text-sm">
                                                <label
                                                    htmlFor="name"
                                                    className="flex items-center gap-1 text-xs font-medium text-vwa-dark/80"
                                                >
                                                    <UserIcon className="h-4 w-4" />
                                                    Nom & prénom
                                                </label>
                                                <div className="group relative">
                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-vwa-primary/0 via-vwa-primary/10 to-vwa-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        className="relative w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark bg-white/80 outline-none transition-all duration-200 group-focus-within:border-vwa-primary/60 group-focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.02)] group-focus-within:ring-2 group-focus-within:ring-vwa-primary/40"
                                                        placeholder="Ex : Maud Aron"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1.5 text-sm">
                                                <label
                                                    htmlFor="email"
                                                    className="flex items-center gap-1 text-xs font-medium text-vwa-dark/80"
                                                >
                                                    <EnvelopeIcon className="h-4 w-4" />
                                                    Adresse email
                                                </label>
                                                <div className="group relative">
                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-vwa-accent/0 via-vwa-accent/10 to-vwa-accent/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className="relative w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark bg-white/80 outline-none transition-all duration-200 group-focus-within:border-vwa-accent/60 group-focus-within:ring-2 group-focus-within:ring-vwa-accent/40"
                                                        placeholder="Ex : ton.email@email.com"
                                                    />
                                                </div>
                                            </div>

                                            {/* Nombre de personnes */}
                                            <div className="space-y-1.5 text-sm">
                                                <label
                                                    htmlFor="people"
                                                    className="flex items-center gap-1 text-xs font-medium text-vwa-dark/80"
                                                >
                                                    <UsersIcon className="h-4 w-4" />
                                                    Nombre de personnes
                                                </label>
                                                <div className="group relative">
                                                    <input
                                                        id="people"
                                                        type="number"
                                                        min={1}
                                                        max={6}
                                                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark bg-white/80 outline-none transition-all duration-200 group-focus-within:border-vwa-primary/60 group-focus-within:ring-2 group-focus-within:ring-vwa-primary/40"
                                                        defaultValue={1}
                                                    />
                                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-vwa-dark/50">
                                                        max. 6
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Message optionnel */}
                                            <div className="space-y-1.5 text-sm">
                                                <label
                                                    htmlFor="message"
                                                    className="flex items-center gap-1 text-xs font-medium text-vwa-dark/80"
                                                >
                                                    <span className="h-2 w-2 rounded-full bg-vwa-primary/70 animate-pulse" />
                                                    Message / besoins particuliers (optionnel)
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={3}
                                                    className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark bg-white/80 outline-none transition-all duration-200 focus:border-vwa-dark/60 focus:ring-2 focus:ring-vwa-dark/30"
                                                    placeholder="Ex : poussette, intolérances alimentaires, besoin d’un coin calme..."
                                                />
                                            </div>

                                            {/* Consentement */}
                                            <div className="flex items-start gap-2 text-[11px] text-vwa-dark/70">
                                                <input
                                                    id="rgpd"
                                                    type="checkbox"
                                                    className="mt-0.5 h-3.5 w-3.5 rounded border-vwa-background text-vwa-primary focus:ring-vwa-primary/50"
                                                />
                                                <label htmlFor="rgpd">
                                                    J&apos;accepte que mes informations soient utilisées
                                                    uniquement pour la gestion de cet événement, conformément
                                                    à la politique de confidentialité de l&apos;association.
                                                </label>
                                            </div>

                                            {/* CTA */}
                                            <div className="pt-1.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-vwa-primary/30 transition-all duration-150 hover:shadow-xl hover:shadow-vwa-dark/30 hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-md"
                                                >
                                                    Valider mon inscription
                                                </button>
                                                <p className="text-[11px] text-vwa-dark/55">
                                                    Tu recevras une confirmation automatique à l&apos;adresse
                                                    indiquée.
                                                </p>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </section>

                            {/* COLONNE RÉSUMÉ ÉVÉNEMENT */}
                            <aside className="border-t lg:border-t-0 lg:border-l border-vwa-background/60 bg-vwa-background/40 px-6 py-7 sm:px-7 sm:py-8 space-y-5">
                                <div className="space-y-1">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/60">
                                        Résumé
                                    </p>
                                    <h2 className="text-sm font-semibold text-vwa-dark">
                                        {event.title}
                                    </h2>
                                    <p className="text-[11px] text-vwa-dark/70">
                                        {event.shortDescription}
                                    </p>
                                </div>

                                <div className="space-y-2 text-xs text-vwa-dark/80">
                                    <div className="flex items-center gap-2">
                                        <CalendarDaysIcon className="h-4 w-4 text-vwa-dark/70" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="h-4 w-4 text-vwa-dark/70" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="h-4 w-4 text-vwa-dark/70" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-white/80 px-4 py-3 text-[11px] text-vwa-dark/80 shadow-sm shadow-vwa-background/70 space-y-1.5">
                                    <p className="font-semibold text-vwa-dark">Participation</p>
                                    <p>{event.price}</p>
                                </div>

                                <div className="pt-1 text-[11px] text-vwa-dark/60 space-y-1.5">
                                    <p>💌 Un email récapitulatif te sera envoyé quelques jours avant.</p>
                                    <p>
                                        🌿 Merci d&apos;arriver 10–15 minutes en avance pour t&apos;installer
                                        tranquillement.
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}