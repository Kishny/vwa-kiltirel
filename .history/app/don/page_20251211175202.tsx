// app/don/page.tsx
import type { Metadata } from "next";
import DonationForm from "@/components/forms/DonationForm";

export const metadata: Metadata = {
    title: "Faire un don | Vwa Kiltirèl",
    description:
        "Soutenir l’association Vwa Kiltirèl par un don ponctuel ou mensuel : aide à financer les ateliers, actions culturelles et événements.",
};

const DON_LINES = [
    {
        title: "Soutien aux ateliers & actions éducatives",
        desc: "Financer du matériel, des intervenant·es et des ateliers pour les enfants, adolescent·es et adultes.",
    },
    {
        title: "Soutien aux événements culturels",
        desc: "Aider à organiser des soirées, rencontres, brunchs et temps forts festifs accessibles au plus grand nombre.",
    },
    {
        title: "Soutien au fonctionnement de l’association",
        desc: "Participer aux frais de salle, de communication, d’assurance et au développement de nouveaux projets.",
    },
];

export default function FaireUnDonPage() {
    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-70" />
                <div className="absolute bottom-[-4rem] left-[-3rem] h-56 w-56 rounded-full bg-vwa-primary/15 blur-3xl opacity-70" />
            </div>

            {/* Header */}
            <header className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                    Faire un don – Vwa Kiltirèl
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                            Soutenir l’association Vwa Kiltirèl
                        </h1>
                        <p className="text-sm text-vwa-dark/75 max-w-2xl">
                            Vos dons permettent de rendre possibles les ateliers, rencontres,
                            soirées, projets avec les jeunes et actions en plein air portés
                            par Vwa Kiltirèl à Tours et alentours.
                        </p>
                    </div>

                    <div className="text-xs text-right space-y-1">
                        <p className="text-vwa-dark/60">Contact dons</p>
                        <p className="text-sm font-semibold text-vwa-dark">
                            vwakiltirel.asso@gmail.com
                            <br />
                            Objet&nbsp;: Don Vwa Kiltirèl
                        </p>
                        <p className="text-[11px] text-vwa-dark/70">
                            Pour un mécénat ou un partenariat, contactez-nous.
                        </p>
                    </div>
                </div>
            </header>

            {/* 1. À quoi servent les dons ? */}
            <section className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    À quoi sert votre don ?
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                    {DON_LINES.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl bg-white/95 border border-vwa-background/80 px-4 py-4 shadow-[0_14px_40px_rgba(28,22,18,0.10)]"
                        >
                            <p className="text-sm font-semibold text-vwa-dark mb-1">
                                {item.title}
                            </p>
                            <p className="text-xs text-vwa-dark/80">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <p className="text-[11px] text-vwa-dark/60">
                    Chaque contribution permet de maintenir des actions accessibles,
                    inclusives et profondément ancrées dans les cultures afro-descendantes,
                    créoles et caribéennes.
                </p>
            </section>

            {/* 2. Formulaire de don */}
            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
                {/* Colonne gauche : formulaire */}
                <div className="space-y-4">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        Proposer un don
                    </h2>

                    {/* Bandeau info */}
                    <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/70 px-4 py-3 text-[11px] text-vwa-dark/80">
                        Ce formulaire permet d’enregistrer votre{" "}
                        <span className="font-semibold">intention de don</span>.
                        Le règlement sera finalisé ensuite (espèces, chèque, virement
                        ou lien sécurisé).
                    </div>

                    <DonationForm />
                </div>

                {/* Colonne droite */}
                <aside className="space-y-6">
                    <div className="rounded-3xl bg-white/95 border border-vwa-background/90 px-4 py-4 shadow-[0_16px_45px_rgba(28,22,18,0.12)] text-xs text-vwa-dark/80 space-y-2">
                        <p className="text-sm font-semibold text-vwa-dark mb-1">
                            Don ponctuel ou récurrent
                        </p>
                        <p>
                            Vous pouvez faire un don unique ou configurer un don mensuel.
                            Pour les dons importants, nous échangeons avec vous pour trouver le
                            mode de soutien le plus adapté.
                        </p>
                        <p>
                            Les entreprises peuvent également participer via des actions de
                            mécénat ou de partenariat culturel.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-vwa-dark text-vwa-background px-4 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.6)] text-xs space-y-2">
                        <p className="uppercase tracking-[0.18em] text-vwa-background/70">
                            Information fiscale
                        </p>
                        <p className="text-vwa-background/85">
                            Les dons peuvent ouvrir droit à une réduction d’impôt seulement si
                            l’association remplit les conditions légales (loi 2000, œuvres ou
                            organismes d’intérêt général). Nous clarifierons cette possibilité
                            une fois la situation administrative finalisée.
                        </p>
                        <p className="text-vwa-background/80">
                            En attendant, les dons restent considérés comme des soutiens
                            financiers sans contrepartie directe.
                        </p>
                    </div>
                </aside>
            </section>
        </main>
    );
}