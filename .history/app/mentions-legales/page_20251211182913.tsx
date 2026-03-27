// app/mentions-legales/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions légales & Données personnelles | Vwa Kiltirèl",
    description:
        "Mentions légales, politique de confidentialité et informations RGPD de l’association Vwa Kiltirèl.",
};

export default function MentionsLegalesPage() {
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
                    Mentions légales & données personnelles
                </p>

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                        Mentions légales & politique de confidentialité
                    </h1>
                    <p className="text-sm text-vwa-dark/75 max-w-2xl">
                        Cette page présente les informations légales de l’association Vwa
                        Kiltirèl, ainsi que la manière dont vos données personnelles sont
                        collectées, utilisées et protégées dans le cadre du site et de ses
                        formulaires (contact, adhésion, dons, inscriptions aux événements).
                    </p>
                </div>
            </header>

            <section className="space-y-8 text-sm text-vwa-dark/80">
                {/* 1. Éditeur du site */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        1. Éditeur du site
                    </h2>
                    <p>
                        Le site{" "}
                        <span className="font-semibold">Vwa Kiltirèl</span> est édité par
                        l’association :
                    </p>
                    <ul className="mt-1 list-none space-y-0.5">
                        <li>
                            <span className="font-semibold">Dénomination :</span> Association
                            Vwa Kiltirèl
                        </li>
                        <li>
                            <span className="font-semibold">Forme :</span> Association loi 1901
                        </li>
                        <li>
                            <span className="font-semibold">Adresse du siège social :</span>{" "}
                            55 Rue Daniel Mayer, 37100 Tours, France
                        </li>
                        {/* Remplace les valeurs ci-dessous par les vraies références */}
                        <li>
                            <span className="font-semibold">N° RNA :</span> {/* à compléter */}
                        </li>
                        <li>
                            <span className="font-semibold">N° SIRET :</span>{" "}
                            {/* à compléter */}
                        </li>
                        <li>
                            <span className="font-semibold">Email :</span>{" "}
                            vwakiltirel.asso@gmail.com
                        </li>
                    </ul>
                </section>

                {/* 2. Hébergement */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        2. Hébergement du site
                    </h2>
                    <p>
                        Le site est hébergé par&nbsp;:
                    </p>
                    <ul className="mt-1 list-none space-y-0.5">
                        <li className="font-semibold">
                            {/* Exemple : Vercel / Render / OVH… à adapter */}
                            [Nom de l’hébergeur] {/* à compléter */}
                        </li>
                        <li>[Adresse de l’hébergeur] {/* à compléter */}</li>
                        <li>[Site web de l’hébergeur] {/* à compléter */}</li>
                    </ul>
                </section>

                {/* 3. Propriété intellectuelle */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        3. Propriété intellectuelle
                    </h2>
                    <p>
                        L’ensemble du contenu du site (textes, visuels, photos, identité
                        graphique, logo, éléments sonores, vidéos, etc.) est, sauf mention
                        contraire, la propriété de l’association Vwa Kiltirèl ou utilisé
                        avec l’autorisation de leurs auteur·rice·s.
                    </p>
                    <p>
                        Toute reproduction, représentation, modification, diffusion ou
                        exploitation, totale ou partielle, sans autorisation écrite
                        préalable de l’association est interdite et pourrait constituer une
                        contrefaçon au sens du Code de la propriété intellectuelle.
                    </p>
                </section>

                {/* 4. Données personnelles & RGPD */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        4. Données personnelles & RGPD
                    </h2>

                    <p>
                        Dans le cadre de ses activités, l’association Vwa Kiltirèl peut être
                        amenée à collecter et traiter des données personnelles, notamment
                        via les formulaires suivants&nbsp;:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Formulaire de contact</li>
                        <li>Formulaire d’adhésion / “Devenir membre”</li>
                        <li>Formulaire de dons</li>
                        <li>Formulaires d’inscription à certains événements</li>
                        <li>Inscription éventuelle à une newsletter ou liste d’information</li>
                    </ul>

                    <p className="pt-2">
                        Les données collectées peuvent inclure votre nom, prénom, adresse
                        postale, adresse e-mail, numéro de téléphone, informations de
                        facturation ou d’adhésion, ainsi que tout message ou précision
                        que vous choisissez de nous transmettre.
                    </p>

                    <p className="pt-2 font-semibold text-vwa-dark">
                        Base légale des traitements
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Votre consentement (formulaires, newsletter).</li>
                        <li>
                            L’exécution d’un contrat ou pré-contrat (adhésion, inscription à
                            un événement, gestion d’un don).
                        </li>
                        <li>
                            Le respect d’obligations légales et comptables (pièces justificatives
                            liées aux dons, cotisations, factures, etc.).
                        </li>
                    </ul>

                    <p className="pt-2 font-semibold text-vwa-dark">
                        Durée de conservation
                    </p>
                    <p>
                        Les données sont conservées pendant une durée proportionnée à la
                        finalité du traitement, par exemple&nbsp;:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Jusqu’à 3 ans après le dernier contact pour les échanges liés aux
                            formulaires (contact, demandes).
                        </li>
                        <li>
                            Jusqu’à 6 à 10 ans pour les données liées à la comptabilité,
                            aux dons et aux cotisations, conformément aux obligations légales.
                        </li>
                        <li>
                            Tant que vous êtes membre ou abonné·e à une newsletter, puis
                            suppression ou anonymisation sur demande ou à l’issue d’une
                            période d’inactivité.
                        </li>
                    </ul>

                    <p className="pt-2 font-semibold text-vwa-dark">
                        Vos droits
                    </p>
                    <p>
                        Conformément au Règlement général sur la protection des données
                        (RGPD) et à la loi Informatique et Libertés, vous disposez des
                        droits suivants sur vos données&nbsp;:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Droit d’accès et de rectification</li>
                        <li>Droit d’effacement (droit à l’oubli)</li>
                        <li>Droit de limitation du traitement</li>
                        <li>Droit d’opposition, notamment en cas de prospection</li>
                        <li>Droit à la portabilité de vos données</li>
                    </ul>

                    <p className="pt-2">
                        Pour exercer ces droits ou poser toute question relative à vos
                        données personnelles, vous pouvez contacter l’association à
                        l’adresse suivante&nbsp;:
                    </p>
                    <p className="font-semibold">
                        vwakiltirel.asso@gmail.com
                    </p>

                    <p className="pt-2 text-[13px] text-vwa-dark/70">
                        Si vous estimez, après nous avoir contactés, que vos droits ne sont
                        pas respectés, vous pouvez adresser une réclamation à la CNIL
                        (Commission Nationale de l’Informatique et des Libertés).
                    </p>
                </section>

                {/* 5. Cookies & mesure d’audience */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        5. Cookies & mesure d’audience
                    </h2>
                    <p>
                        Le site peut utiliser des cookies strictement nécessaires à son bon
                        fonctionnement (sécurité, affichage, préférences de navigation).
                    </p>
                    <p>
                        Si des outils de mesure d’audience ou des services tiers
                        (statistiques, vidéo, réseaux sociaux, etc.) sont ajoutés
                        ultérieurement, une bannière d’information et/ou un module de
                        gestion du consentement sera mis en place afin de vous permettre
                        d’accepter ou de refuser ces cookies.
                    </p>
                </section>

                {/* 6. Liens externes */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        6. Liens externes
                    </h2>
                    <p>
                        Le site peut contenir des liens vers d’autres sites (partenaires,
                        plateformes de billetterie, réseaux sociaux, etc.). L’association
                        Vwa Kiltirèl n’est pas responsable du contenu ou de la politique de
                        confidentialité de ces sites tiers. Nous vous invitons à consulter
                        leurs propres mentions légales et politiques de confidentialité.
                    </p>
                </section>

                {/* 7. Mise à jour de la page */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        7. Mise à jour des mentions
                    </h2>
                    <p>
                        L’association se réserve la possibilité de modifier la présente
                        page afin de refléter l’évolution du site, des activités ou du
                        cadre légal. La date de dernière mise à jour sera indiquée ci-dessous.
                    </p>
                    <p className="text-[11px] text-vwa-dark/60">
                        Dernière mise à jour&nbsp;: {/* à compléter (JJ/MM/AAAA) */}
                    </p>
                </section>
            </section>
        </main>
    );
}