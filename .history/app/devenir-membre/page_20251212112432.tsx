// app/devenir-membre/page.tsx
import type { Metadata } from "next";
import AdhesionForm from "@/components/forms/AdhesionForm";

export const metadata: Metadata = {
    title: "Devenir membre | Vwa Kiltirèl",
    description:
        "Adhésion à l’association Vwa Kiltirèl – formules trimestrielle ou annuelle, avantages culturels et communautaires.",
};

const FORMULES = [
    {
        id: "trimestrielle",
        title: "Adhésion trimestrielle",
        amount: "30 €",
        duration: "3 mois",
        badge: "Flexible",
        description:
            "Formule idéale pour découvrir l’association et nos événements sur une courte période.",
        details: "Renouvellement automatique tous les 3 mois (30 € / trimestre).",
    },
    {
        id: "annuelle",
        title: "Adhésion annuelle",
        amount: "140 €",
        duration: "12 mois",
        badge: "Meilleure valeur",
        description:
            "Pour accompagner Vwa Kiltirèl sur la durée et profiter pleinement des avantages membres.",
        details:
            "Renouvellement automatique chaque année à la date d’adhésion (120 € / an).",
    },
];

export default function DevenirMembrePage() {
    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-70" />
                <div className="absolute bottom-[-4rem] right-[-3rem] h-56 w-56 rounded-full bg-vwa-primary/15 blur-3xl opacity-70" />
            </div>

            {/* Header */}
            <header className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                    Devenir membre – Vwa Kiltirèl
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                            Rejoindre l’association Vwa Kiltirèl
                        </h1>
                        <p className="text-sm text-vwa-dark/75 max-w-2xl">
                            En adhérant, vous soutenez la promotion et la transmission des
                            cultures afro-descendantes, créoles et caribéennes, et vous
                            participez à des événements uniques au cœur de Tours.
                        </p>
                    </div>

                    <div className="text-xs text-right space-y-1">
                        <p className="text-vwa-dark/60">Siège social</p>
                        <p className="text-sm font-semibold text-vwa-dark">
                            55 Rue Daniel Mayer
                            <br />
                            37100 Tours
                        </p>
                        <p className="text-[11px] text-vwa-dark/70">
                            vwakiltirel.asso@gmail.com
                        </p>
                    </div>
                </div>
            </header>

            {/* 1. Bloc formules d’adhésion */}
            <section className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Choisir votre formule
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {FORMULES.map((f) => (
                        <div
                            key={f.id}
                            className="group relative overflow-hidden rounded-3xl bg-white/95 border border-vwa-background/80 shadow-[0_16px_45px_rgba(28,22,18,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,22,18,0.22)]"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute -top-10 right-[-3rem] h-32 w-32 rounded-full bg-vwa-accent/25 blur-2xl" />
                            </div>

                            <div className="relative p-5 sm:p-6 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-vwa-dark/70 uppercase tracking-[0.16em]">
                                            {f.title}
                                        </p>
                                        <p className="text-2xl font-extrabold text-vwa-dark flex items-baseline gap-1">
                                            {f.amount}
                                            <span className="text-xs font-medium text-vwa-dark/60">
                                                / {f.duration}
                                            </span>
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-vwa-dark text-vwa-background px-3 py-1 text-[11px] font-medium">
                                        {f.badge}
                                    </span>
                                </div>

                                <p className="text-sm text-vwa-dark/80">{f.description}</p>
                                <p className="text-[11px] text-vwa-dark/65">{f.details}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-[11px] text-vwa-dark/60">
                    L’adhésion est valable à compter de la date d’inscription et se
                    renouvelle automatiquement selon la formule choisie. Pour résilier,
                    il suffit de prévenir l’association par écrit (email ou courrier) au
                    moins 15 jours avant l’échéance.
                </p>
            </section>

            {/* 2. Formulaire d’adhésion */}
            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
                {/* Colonne gauche : formulaire */}
                <div className="space-y-4">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        Remplir votre adhésion
                    </h2>

                    {/* Bandeau info visuel */}
                    <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/70 px-4 py-3 text-[11px] text-vwa-dark/80">
                        Ce formulaire est pour l’instant{" "}
                        <span className="font-semibold">à titre informatif</span>. Le
                        traitement (paiement, confirmation, etc.) sera mis en place
                        prochainement via un module sécurisé.
                    </div>

                    {/* Formulaire client avec feedback */}
                    <AdhesionForm />
                </div>

                {/* Colonne droite : avantages + mention légale */}
                <aside className="space-y-6">
                    <div className="rounded-3xl bg-white/95 border border-vwa-background/90 px-4 py-4 shadow-[0_16px_45px_rgba(28,22,18,0.12)]">
                        <h2 className="text-sm font-semibold text-vwa-dark mb-2">
                            Avantages réservés aux membres
                        </h2>

                        <div className="space-y-3 text-xs text-vwa-dark/80">
                            <div>
                                <p className="font-semibold text-vwa-dark">Avantages culturels</p>
                                <ul className="mt-1 list-disc list-inside space-y-1">
                                    <li>Accès gratuit ou à tarif réduit sur certains événements.</li>
                                    <li>Priorité sur les ateliers, formations et stages.</li>
                                    <li>
                                        Participation à des projets artistiques et communautaires
                                        (performances, expositions, collaborations).
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-vwa-dark">
                                    Avantages associatifs
                                </p>
                                <ul className="mt-1 list-disc list-inside space-y-1">
                                    <li>
                                        Possibilité de proposer et porter des projets culturels au
                                        sein de l’association.
                                    </li>
                                    <li>Réception d’une newsletter réservée aux membres.</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-vwa-dark">
                                    Avantages événementiels
                                </p>
                                <ul className="mt-1 list-disc list-inside space-y-1">
                                    <li>
                                        Invitations privilégiées à certaines soirées et événements
                                        partenaires.
                                    </li>
                                    <li>
                                        Possibilité de bénévolat pour vivre l’ambiance de
                                        l’intérieur.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-vwa-dark text-vwa-background px-4 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.6)] text-xs space-y-2">
                        <p className="uppercase tracking-[0.18em] text-vwa-background/70">
                            Mention légale
                        </p>
                        <p className="text-vwa-background/85">
                            La cotisation d’adhésion donne lieu à des contreparties (accès à
                            des événements, ateliers, avantages membres). À ce titre, elle ne
                            constitue pas un don et n’ouvre pas droit à une réduction
                            d’impôt.
                        </p>
                        <p className="text-vwa-background/80">
                            Il est toutefois possible d’effectuer un don libre en complément
                            de l’adhésion. Ce don, sans contrepartie directe, peut ouvrir
                            droit à une réduction d’impôt si l’association remplit les
                            conditions légales en vigueur.
                        </p>
                    </div>
                </aside>
            </section>
        </main>
    );
}