// app/aide/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Aide / FAQ | Vwa Kiltirèl",
    description:
        "Questions fréquentes sur l’association Vwa Kiltirèl : adhésion, événements, dons, données personnelles et contact.",
};

export default function AidePage() {
    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/65 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-80" />
                <div className="absolute bottom-[-4rem] right-[-3rem] h-60 w-60 rounded-full bg-vwa-primary/18 blur-3xl opacity-80" />
                <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#111827_45%,transparent_0)] [background-size:18px_18px]" />
            </div>

            {/* Header */}
            <header className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                    Aide & FAQ – Vwa Kiltirèl
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                            Besoin d’un coup de main ?
                        </h1>
                        <p className="text-sm text-vwa-dark/75 max-w-2xl">
                            Retrouvez ici les réponses aux questions les plus fréquentes sur
                            l’adhésion, les événements, les dons, la médiathèque et la gestion
                            de vos données. Et si la réponse n’est pas là, on reste joignables.
                        </p>
                    </div>

                    {/* Bloc “Je ne trouve pas ma réponse” */}
                    <div className="text-xs text-right space-y-2">
                        <div className="inline-flex flex-col items-end rounded-2xl bg-vwa-dark text-vwa-background px-3 py-2 shadow-[0_16px_45px_rgba(28,22,18,0.7)]">
                            <span className="text-[11px] uppercase tracking-[0.18em] text-vwa-background/70">
                                Toujours perdu·e ?
                            </span>
                            <Link
                                href="/contact"
                                className="mt-1 inline-flex items-center gap-1 rounded-full bg-vwa-background text-vwa-dark px-3 py-1 text-[11px] font-semibold shadow-sm hover:bg-vwa-background/90 transition"
                            >
                                Écrire à l’équipe
                                <span aria-hidden>↗</span>
                            </Link>
                        </div>
                        <p className="text-[11px] text-vwa-dark/65">
                            On lit chaque message avec attention et bienveillance.
                        </p>
                    </div>
                </div>
            </header>

            {/* Barre de “pseudo recherche” (visuelle uniquement pour l’instant) */}
            <section className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Chercher dans l’aide
                </h2>
                <div className="relative max-w-xl">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-vwa-primary/10 via-vwa-accent/5 to-vwa-primary/0 blur-sm" />
                    <div className="relative flex items-center gap-2 rounded-2xl border border-vwa-background/80 bg-white/95 px-3.5 py-2 shadow-[0_12px_36px_rgba(28,22,18,0.12)]">
                        <span className="text-xs text-vwa-dark/50">🔍</span>
                        <input
                            type="text"
                            placeholder="Ex : adhésion, don, données personnelles…"
                            className="w-full bg-transparent text-sm text-vwa-dark placeholder:text-vwa-dark/35 outline-none"
                        />
                        <span className="hidden sm:inline-flex text-[10px] rounded-full bg-vwa-background px-2 py-0.5 text-vwa-dark/70">
                            (Fonction de recherche à venir)
                        </span>
                    </div>
                </div>
            </section>

            {/* Grille des catégories FAQ */}
            <section className="grid gap-6 lg:grid-cols-2">
                {/* Bloc : Adhésion / membres */}
                <FaqCard
                    title="Adhésion & membres"
                    badge="Devenir membre"
                    items={[
                        {
                            q: "Comment devenir membre de Vwa Kiltirèl ?",
                            a: (
                                <>
                                    Vous pouvez rejoindre l’association via la page{" "}
                                    <Link
                                        href="/devenir-membre"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Devenir membre
                                    </Link>
                                    . Vous y retrouverez les différentes formules d’adhésion
                                    (trimestrielle ou annuelle) ainsi qu’un formulaire à remplir
                                    avec vos coordonnées.
                                </>
                            ),
                        },
                        {
                            q: "Quelle est la différence entre adhésion trimestrielle et annuelle ?",
                            a: (
                                <>
                                    La formule <strong>trimestrielle</strong> (30 €) permet de
                                    soutenir l’association et de profiter des avantages membres
                                    pendant 3 mois, renouvelables. La formule{" "}
                                    <strong>annuelle</strong> (120 €) accompagne Vwa Kiltirèl sur
                                    12 mois, avec les mêmes avantages mais sur une durée plus
                                    longue et un coût plus avantageux à l’année.
                                </>
                            ),
                        },
                        {
                            q: "L’adhésion se renouvelle-t-elle automatiquement ?",
                            a: (
                                <>
                                    Pour l’instant, le renouvellement se fait{" "}
                                    <strong>manuellement</strong>. Vous serez informé·e des
                                    prochaines échéances afin de choisir si vous souhaitez
                                    poursuivre votre adhésion.
                                </>
                            ),
                        },
                        {
                            q: "Quels sont les avantages d’un membre ?",
                            a: (
                                <>
                                    Accès à certains événements à tarif réduit, priorités
                                    d’inscription, participation à la vie associative (projets,
                                    ateliers, bénévolat) et communication privilégiée sur la
                                    programmation. Les détails sont indiqués sur la page{" "}
                                    <Link
                                        href="/devenir-membre"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Devenir membre
                                    </Link>
                                    .
                                </>
                            ),
                        },
                    ]}
                />

                {/* Bloc : Événements */}
                <FaqCard
                    title="Événements & inscriptions"
                    badge="Agenda"
                    items={[
                        {
                            q: "Où retrouver tous les événements Vwa Kiltirèl ?",
                            a: (
                                <>
                                    La page{" "}
                                    <Link
                                        href="/evenements"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Événements
                                    </Link>{" "}
                                    centralise les prochains rendez-vous ainsi que les événements
                                    passés. Vous pouvez cliquer sur chaque fiche pour accéder aux
                                    détails, à l’inscription et à la médiathèque associée.
                                </>
                            ),
                        },
                        {
                            q: "Comment s’inscrire à un événement ?",
                            a: (
                                <>
                                    Depuis la page{" "}
                                    <Link
                                        href="/evenements"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Événements
                                    </Link>
                                    , cliquez sur &quot;Je m&apos;inscris&quot; pour l’événement
                                    souhaité. Vous serez redirigé·e vers un formulaire dédié
                                    (inscription simple ou lien de paiement futur via HelloAsso
                                    selon le type d’événement).
                                </>
                            ),
                        },
                        {
                            q: "Que se passe-t-il si je ne peux plus venir ?",
                            a: (
                                <>
                                    Si vous avez un empêchement, merci de prévenir l’association
                                    au moins <strong>48 heures avant</strong>, afin de libérer la
                                    place pour une autre personne. Les modalités précises
                                    (remboursement éventuel, report, etc.) sont indiquées sur
                                    chaque événement.
                                </>
                            ),
                        },
                        {
                            q: "Les événements sont-ils accessibles à tout public ?",
                            a: (
                                <>
                                    Certains événements sont tout public, d’autres sont pensés
                                    pour des publics précis (mamans, familles, enfants, adultes…).
                                    Le public visé est mentionné sur chaque fiche événement.
                                </>
                            ),
                        },
                    ]}
                />

                {/* Bloc : Dons & soutien */}
                <FaqCard
                    title="Dons & soutien"
                    badge="Soutenir Vwa Kiltirèl"
                    items={[
                        {
                            q: "Comment faire un don à l’association ?",
                            a: (
                                <>
                                    Vous pouvez exprimer votre intention de don depuis la page{" "}
                                    <Link
                                        href="/don"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Don / Soutenir
                                    </Link>
                                    . Vous pouvez choisir un montant, une fréquence (ponctuel ou
                                    mensuel) et un mode de règlement. Le module de paiement en
                                    ligne sécurisé sera ajouté progressivement.
                                </>
                            ),
                        },
                        {
                            q: "Mon don ouvre-t-il droit à une réduction d’impôt ?",
                            a: (
                                <>
                                    La situation dépend du cadre fiscal dans lequel se situe
                                    l’association. Pour l’instant, les dons sont principalement
                                    considérés comme un soutien volontaire. Si des reçus fiscaux
                                    deviennent possibles, l’information sera clairement indiquée
                                    sur le site.
                                </>
                            ),
                        },
                        {
                            q: "Puis-je faire un don sans être membre ?",
                            a: (
                                <>
                                    Oui. Vous pouvez soutenir l’association via un don libre même
                                    sans adhérer. À l’inverse, vous pouvez aussi adhérer sans
                                    effectuer de don complémentaire.
                                </>
                            ),
                        },
                    ]}
                />

                {/* Bloc : Médiathèque & images */}
                <FaqCard
                    title="Médiathèque & droit à l’image"
                    badge="Photos & vidéos"
                    items={[
                        {
                            q: "Où retrouver les photos des événements ?",
                            a: (
                                <>
                                    Les photos et certains extraits vidéo sont accessibles dans la
                                    page{" "}
                                    <Link
                                        href="/mediatheque"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Médiathèque
                                    </Link>
                                    , classées par événement et par thématique (&quot;Vie de
                                    l’association&quot;).
                                </>
                            ),
                        },
                        {
                            q: "Que faites-vous de mon image lors des événements ?",
                            a: (
                                <>
                                    Certains événements peuvent être photographiés ou filmés afin
                                    d’illustrer la vie de l’association. Nous précisons ce point
                                    dans les informations de l’événement et restons à l’écoute si
                                    vous ne souhaitez pas apparaître sur les supports de
                                    communication.
                                </>
                            ),
                        },
                        {
                            q: "Puis-je demander à être retiré·e d’une photo ?",
                            a: (
                                <>
                                    Oui. Vous pouvez nous écrire à{" "}
                                    <a
                                        href="mailto:vwakiltirel.asso@gmail.com"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        vwakiltirel.asso@gmail.com
                                    </a>{" "}
                                    en indiquant l’événement, la photo concernée et, si possible,
                                    une capture d’écran. Nous traiterons votre demande dans les
                                    meilleurs délais.
                                </>
                            ),
                        },
                    ]}
                />

                {/* Bloc : Données personnelles / RGPD */}
                <FaqCard
                    title="Données personnelles / RGPD"
                    badge="Vie privée"
                    items={[
                        {
                            q: "Quelles données collectez-vous via le site ?",
                            a: (
                                <>
                                    Nous collectons uniquement les informations nécessaires au
                                    traitement de vos demandes : inscriptions aux événements,
                                    adhésions, dons, contact. Ces données sont limitées à ce qui
                                    est utile pour vous répondre ou vous tenir informé·e.
                                </>
                            ),
                        },
                        {
                            q: "Comment puis-je exercer mes droits (accès, rectification, suppression) ?",
                            a: (
                                <>
                                    Vous pouvez nous écrire à{" "}
                                    <a
                                        href="mailto:vwakiltirel.asso@gmail.com"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        vwakiltirel.asso@gmail.com
                                    </a>{" "}
                                    en précisant l’objet de votre demande. Les grandes lignes sont
                                    détaillées sur la page{" "}
                                    <Link
                                        href="/rgpd"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Mentions légales / RGPD
                                    </Link>
                                    .
                                </>
                            ),
                        },
                        {
                            q: "Combien de temps conservez-vous mes données ?",
                            a: (
                                <>
                                    Les durées de conservation varient selon le type de données
                                    (gestion des membres, inscriptions, dons…). Nous conservons
                                    les informations uniquement le temps nécessaire à la gestion
                                    de la relation avec vous et aux obligations légales.
                                </>
                            ),
                        },
                    ]}
                />

                {/* Bloc : Contact & projets */}
                <FaqCard
                    title="Contact & projets"
                    badge="Nous écrire"
                    items={[
                        {
                            q: "Comment vous contacter directement ?",
                            a: (
                                <>
                                    Vous pouvez passer par la page{" "}
                                    <Link
                                        href="/contact"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Contact
                                    </Link>{" "}
                                    ou écrire à{" "}
                                    <a
                                        href="mailto:vwakiltirel.asso@gmail.com"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        vwakiltirel.asso@gmail.com
                                    </a>
                                    . Nous faisons le maximum pour répondre sous 48 heures.
                                </>
                            ),
                        },
                        {
                            q: "Puis-je proposer un projet ou une collaboration ?",
                            a: (
                                <>
                                    Oui, c’est même très bienvenu. Expliquez votre idée via la
                                    page{" "}
                                    <Link
                                        href="/contact"
                                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                                    >
                                        Contact
                                    </Link>{" "}
                                    en précisant le cadre, les publics concernés et, si possible,
                                    les dates envisagées.
                                </>
                            ),
                        },
                        {
                            q: "Proposez-vous du bénévolat au sein de Vwa Kiltirèl ?",
                            a: (
                                <>
                                    Oui, ponctuellement ou sur la durée (événements, logistique,
                                    communication…). Vous pouvez le mentionner dans le message de
                                    contact ou lors de votre adhésion.
                                </>
                            ),
                        },
                    ]}
                />
            </section>
        </main>
    );
}

/**
 * Petit composant interne pour factoriser une “carte FAQ”
 */
type FaqItem = {
    q: string;
    a: React.ReactNode;
};

type FaqCardProps = {
    title: string;
    badge?: string;
    items: FaqItem[];
};

function FaqCard({ title, badge, items }: FaqCardProps) {
    return (
        <section className="rounded-3xl bg-white/95 border border-vwa-background/85 shadow-[0_18px_55px_rgba(28,22,18,0.14)] px-4 py-4 sm:px-5 sm:py-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <h2 className="text-sm font-semibold text-vwa-dark">{title}</h2>
                    {badge && (
                        <p className="text-[11px] text-vwa-dark/55 uppercase tracking-[0.16em]">
                            {badge}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2.5">
                {items.map((item, idx) => (
                    <details
                        key={idx}
                        className="group rounded-2xl border border-vwa-background/80 bg-vwa-background/50 px-3.5 py-2.5 text-xs text-vwa-dark/80 transition-all duration-200 open:bg-white open:shadow-[0_14px_40px_rgba(28,22,18,0.16)]"
                    >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[11px] font-semibold text-vwa-dark/85">
                            <span>{item.q}</span>
                            <span className="shrink-0 rounded-full bg-vwa-background px-2 py-0.5 text-[10px] text-vwa-dark/70 group-open:rotate-90 transition-transform">
                                ▸
                            </span>
                        </summary>
                        <div className="mt-2 text-[11px] leading-relaxed text-vwa-dark/75">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}