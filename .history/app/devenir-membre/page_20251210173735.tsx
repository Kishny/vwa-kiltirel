// app/devenir-membre/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
    CheckCircleIcon,
    UserGroupIcon,
    HeartIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
    title: "Devenir membre | Vwa Kiltirèl",
    description:
        "Rejoindre l’association Vwa Kiltirèl : adhésion, engagement bénévole et soutien des actions culturelles.",
};

export default function DevenirMembrePage() {
    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
                <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-vwa-accent/22 blur-3xl opacity-80" />
                <div className="absolute bottom-[-3rem] right-[-3rem] h-64 w-64 rounded-full bg-vwa-primary/18 blur-3xl opacity-80" />
            </div>

            {/* Bouton retour */}
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-vwa-dark/70 shadow-sm ring-1 ring-vwa-background/80 backdrop-blur-sm transition-all hover:-translate-y-[1px] hover:bg-white hover:text-vwa-dark hover:shadow-md"
                >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    <span>Retour à l’accueil</span>
                </Link>
            </div>

            {/* Header */}
            <header className="space-y-5">
                <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                    Adhésion – Vwa Kiltirèl
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                            Devenir membre de Vwa Kiltirèl
                        </h1>
                        <p className="text-sm text-vwa-dark/75 max-w-2xl">
                            Rejoindre l’association, c’est soutenir la mise en lumière des
                            cultures créoles, afro-descendantes et caribéennes à Tours, et
                            participer à une dynamique conviviale, engagée et intergénérationnelle.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white/90 px-4 py-3 text-xs text-vwa-dark/80 shadow-[0_16px_45px_rgba(28,22,18,0.16)] border border-vwa-background/80">
                        <p className="font-semibold text-vwa-dark">
                            Pourquoi adhérer&nbsp;?
                        </p>
                        <p className="mt-1">
                            Pour soutenir les événements, accéder à certaines rencontres
                            réservées, et prendre part aux décisions de l’association.
                        </p>
                    </div>
                </div>
            </header>

            {/* Layout principal */}
            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
                {/* Colonne gauche : “Ce que ça veut dire” + form visuel */}
                <div className="space-y-6">
                    {/* Les bénéfices / valeurs */}
                    <div className="rounded-3xl bg-white/95 px-5 py-5 shadow-[0_18px_55px_rgba(28,22,18,0.12)] border border-vwa-background/85">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 mb-2">
                            Ce que l’adhésion permet
                        </p>
                        <ul className="space-y-2 text-sm text-vwa-dark/80">
                            <li className="flex gap-2">
                                <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                                <span>
                                    Participer à l’assemblée générale et aux grandes orientations de
                                    l’association.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                                <span>
                                    Soutenir concrètement l’organisation des événements, ateliers et
                                    rencontres.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                                <span>
                                    Accéder à certaines invitations et temps de convivialité réservés
                                    aux membres.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                                <span>
                                    Rejoindre un réseau de personnes engagées pour la culture, l’éducation
                                    populaire et la cohésion sociale.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* “Formulaire” premium (pour l’instant statique, prêt pour plus tard) */}
                    <div className="relative">
                        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-vwa-primary/26 via-vwa-accent/20 to-vwa-dark/32 opacity-70 blur-2xl" />
                        <div className="relative rounded-3xl bg-vwa-dark text-vwa-background px-5 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.75)]">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-vwa-background/70">
                                Demande d’adhésion (étape 1)
                            </p>

                            <form className="mt-4 space-y-4">
                                {/* Identité */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-vwa-background/70">
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Ex : Maud"
                                            className="w-full rounded-2xl border border-vwa-background/40 bg-black/20 px-3.5 py-2.5 text-sm text-vwa-background placeholder:text-vwa-background/40 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:bg-black/30"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-vwa-background/70">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Ex : DUPONT"
                                            className="w-full rounded-2xl border border-vwa-background/40 bg-black/20 px-3.5 py-2.5 text-sm text-vwa-background placeholder:text-vwa-background/40 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:bg-black/30"
                                        />
                                    </div>
                                </div>

                                {/* Coordonnées */}
                                <div className="grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-vwa-background/70">
                                            Adresse e-mail
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="vous@example.com"
                                            className="w-full rounded-2xl border border-vwa-background/40 bg-black/20 px-3.5 py-2.5 text-sm text-vwa-background placeholder:text-vwa-background/40 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:bg-black/30"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-vwa-background/70">
                                            Téléphone (optionnel)
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Pour vous joindre si besoin"
                                            className="w-full rounded-2xl border border-vwa-background/40 bg-black/20 px-3.5 py-2.5 text-sm text-vwa-background placeholder:text-vwa-background/40 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:bg-black/30"
                                        />
                                    </div>
                                </div>

                                {/* Type d’adhésion (visuel, prêt pour de la logique plus tard) */}
                                <div className="space-y-2">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-vwa-background/70">
                                        Type d’adhésion souhaitée
                                    </p>
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        <button
                                            type="button"
                                            className="flex items-start gap-2 rounded-2xl border border-vwa-background/40 bg-black/15 px-3.5 py-2.5 text-left text-xs hover:border-vwa-accent/80 hover:bg-black/25 transition-all"
                                        >
                                            <UserGroupIcon className="mt-0.5 h-4 w-4 text-vwa-accent" />
                                            <span>
                                                <span className="block text-[11px] font-semibold">
                                                    Membre sympathisant
                                                </span>
                                                <span className="text-[11px] text-vwa-background/75">
                                                    Je soutiens l’association et je souhaite être informé·e
                                                    des actualités.
                                                </span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-start gap-2 rounded-2xl border border-vwa-background/40 bg-black/15 px-3.5 py-2.5 text-left text-xs hover:border-vwa-accent/80 hover:bg-black/25 transition-all"
                                        >
                                            <HeartIcon className="mt-0.5 h-4 w-4 text-vwa-accent" />
                                            <span>
                                                <span className="block text-[11px] font-semibold">
                                                    Membre actif / bénévole
                                                </span>
                                                <span className="text-[11px] text-vwa-background/75">
                                                    Je souhaite participer à l’organisation et donner un coup
                                                    de main sur le terrain.
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Note cotisation */}
                                <div className="rounded-2xl bg-black/30 border border-vwa-background/50 px-3.5 py-3 text-[11px] text-vwa-background/80">
                                    La cotisation annuelle (montant indicatif) et le règlement
                                    sécurisé se font via HelloAsso. Un lien personnalisé vous sera
                                    envoyé après validation de votre demande d’adhésion.
                                </div>

                                {/* CTA (pour l’instant purement visuel) */}
                                <div className="pt-1">
                                    <button
                                        type="button"
                                        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(0,0,0,0.7)] transition-all duration-200 hover:shadow-[0_24px_70px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70"
                                    >
                                        <span className="absolute inset-0 opacity-40">
                                            <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-600 group-hover:translate-x-[220%]" />
                                        </span>
                                        <span className="relative text-xs sm:text-sm">
                                            Pré-remplir ma demande d’adhésion
                                        </span>
                                    </button>
                                    <p className="mt-1 text-[10px] text-vwa-background/70">
                                        Ensuite, l’équipe Vwa Kiltirèl vous recontactera pour finaliser
                                        votre adhésion (infos pratiques + lien de paiement si besoin).
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Colonne droite : bloc “engagement / transparence” */}
                <aside className="space-y-4">
                    <div className="rounded-3xl bg-white/95 px-4 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.12)] border border-vwa-background/85">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                            Notre engagement
                        </p>
                        <p className="mt-2 text-sm text-vwa-dark/80">
                            Les cotisations servent à financer le matériel, la communication,
                            la logistique des événements, ainsi qu’une partie des actions
                            solidaires (places suspendues, ateliers à prix libre, etc.).
                        </p>
                    </div>

                    <div className="rounded-3xl bg-vwa-dark text-vwa-background px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)]">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-vwa-background/65">
                            Transparence & valeurs
                        </p>
                        <ul className="mt-2 space-y-1.5 text-xs">
                            <li>• Promotion des cultures créoles, afro-descendantes et caribéennes.</li>
                            <li>• Lien intergénérationnel et mixité sociale.</li>
                            <li>• Éducation populaire, respect, bienveillance.</li>
                            <li>• Gouvernance associative : les membres sont au cœur du projet.</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-white/90 px-4 py-3 text-[11px] text-vwa-dark/75 border border-vwa-background/80">
                        <p className="font-semibold mb-1">Déjà membre ou bénévole&nbsp;?</p>
                        <p>
                            Vous pouvez aussi nous écrire directement via la{" "}
                            <Link
                                href="/contact"
                                className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                            >
                                page contact
                            </Link>{" "}
                            pour proposer une idée, un atelier, ou un projet à co-construire.
                        </p>
                    </div>
                </aside>
            </section>
        </main>
    );
}