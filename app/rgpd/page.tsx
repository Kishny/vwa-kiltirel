// app/rgpd/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Données personnelles & RGPD | Vwa Kiltirèl",
    description:
        "Informations sur la collecte, l’utilisation et la protection des données personnelles (RGPD) par l’association Vwa Kiltirèl.",
};

export default function RgpdPage() {
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
                    Données personnelles – RGPD
                </p>

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                        Données personnelles & RGPD
                    </h1>
                    <p className="text-sm text-vwa-dark/75 max-w-2xl">
                        Cette page explique comment l’association Vwa Kiltirèl collecte,
                        utilise et protège vos données personnelles dans le cadre de ses
                        activités (site web, adhésions, dons, événements, formulaires).
                    </p>
                </div>
            </header>

            {/* Contenu */}
            <section className="space-y-8 text-sm text-vwa-dark/80">
                {/* 1. Qui est responsable des données ? */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        1. Responsable du traitement
                    </h2>
                    <p>
                        Le responsable du traitement des données personnelles collectées via
                        ce site est&nbsp;:
                    </p>
                    <ul className="mt-1 list-none space-y-0.5">
                        <li>
                            <span className="font-semibold">Association :</span> Vwa Kiltirèl
                        </li>
                        <li>
                            <span className="font-semibold">Adresse :</span> 55 Rue Daniel
                            Mayer, 37100 Tours, France
                        </li>
                        <li>
                            <span className="font-semibold">Email de contact :</span>{" "}
                            vwakiltirel.asso@gmail.com
                        </li>
                    </ul>
                </section>

                {/* 2. Dans quels cas collectons-nous vos données ? */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        2. Dans quels cas vos données sont-elles collectées ?
                    </h2>
                    <p>Nous collectons vos données principalement dans les situations suivantes :</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Quand vous remplissez un formulaire de contact.</li>
                        <li>Quand vous remplissez le formulaire “Devenir membre”.</li>
                        <li>Quand vous remplissez le formulaire de don.</li>
                        <li>Quand vous vous inscrivez à un événement via le site.</li>
                        <li>
                            Éventuellement, quand vous vous inscrivez à une newsletter ou à une
                            liste d’information (si cette fonctionnalité est mise en place).
                        </li>
                    </ul>
                    <p className="pt-1">
                        Les données collectées sont limitées à ce qui est strictement utile à
                        la gestion de votre demande, de votre adhésion, de votre don ou de
                        votre participation à un événement.
                    </p>
                </section>

                {/* 3. Quelles données sont collectées ? */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        3. Quelles données personnelles sont collectées ?
                    </h2>
                    <p>
                        Selon le formulaire ou l’action réalisée, nous pouvons collecter les
                        données suivantes :
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Identité : nom, prénom.</li>
                        <li>Coordonnées : adresse postale, code postal, ville, pays.</li>
                        <li>Contact : adresse e-mail, numéro de téléphone.</li>
                        <li>
                            Informations liées à l’adhésion : formule choisie, mode de règlement
                            envisagé.
                        </li>
                        <li>
                            Informations liées aux dons : montant, périodicité souhaitée,
                            canal de règlement (espèces, chèque, virement, lien sécurisé).
                        </li>
                        <li>
                            Informations liées aux événements : choix de l’événement, nombre de
                            participant·e·s, précisions logistiques éventuelles.
                        </li>
                        <li>
                            Contenu libre : message, remarques ou informations complémentaires
                            que vous choisissez de renseigner dans un champ texte.
                        </li>
                    </ul>
                    <p className="pt-1 text-[13px] text-vwa-dark/70">
                        Nous ne collectons pas volontairement de données dites “sensibles”
                        (origine raciale ou ethnique, opinions politiques, santé, religion,
                        etc.) via les formulaires du site. Merci de ne pas renseigner ce
                        type d’information dans vos messages.
                    </p>
                </section>

                {/* 4. Pourquoi et sur quelle base légale ? */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        4. Finalités & bases légales des traitements
                    </h2>
                    <p>
                        Vos données sont traitées uniquement pour des finalités déterminées et
                        légitimes :
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <span className="font-semibold">Gestion des adhésions</span> :
                            suivi des membres, envoi d’informations relatives à la vie de
                            l’association, invitations aux assemblées générales et événements
                            réservés.
                        </li>
                        <li>
                            <span className="font-semibold">Gestion des dons</span> : suivi
                            comptable, remerciements, éventuelle émission de reçus fiscaux si
                            l’association remplit les conditions.
                        </li>
                        <li>
                            <span className="font-semibold">Organisation des événements</span>{" "}
                            : gestion des inscriptions, envoi de confirmations et d’informations
                            pratiques.
                        </li>
                        <li>
                            <span className="font-semibold">Réponse à vos demandes</span> :
                            traitement des questions envoyées via le formulaire de contact.
                        </li>
                        <li>
                            <span className="font-semibold">Communication</span> :
                            envoi ponctuel d’actualités de l’association lorsque vous l’avez
                            demandé ou accepté.
                        </li>
                    </ul>
                    <p className="pt-2 font-semibold text-vwa-dark">
                        Bases légales principales :
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Votre <span className="font-semibold">consentement</span> (case à
                            cocher, action volontaire sur un formulaire).
                        </li>
                        <li>
                            L’exécution d’un <span className="font-semibold">contrat</span> ou
                            de mesures précontractuelles (adhésion, inscription à un événement,
                            don).
                        </li>
                        <li>
                            Le respect d’
                            <span className="font-semibold">obligations légales</span> et
                            comptables (conservation des pièces justificatives).
                        </li>
                    </ul>
                </section>

                {/* 5. Durée de conservation */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        5. Durée de conservation des données
                    </h2>
                    <p>
                        Les données sont conservées pendant une durée limitée, adaptée à
                        chaque finalité :
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Données de contact simples (formulaire de contact) : jusqu’à 3 ans
                            après le dernier échange.
                        </li>
                        <li>
                            Données d’adhésion et de dons : durée nécessaire à la gestion de la
                            relation associative et aux obligations comptables (généralement de
                            6 à 10 ans pour les pièces justifiant les opérations financières).
                        </li>
                        <li>
                            Données liées aux inscriptions à des événements : pour la durée de
                            l’événement et de son suivi, puis archivage limité ou anonymisation.
                        </li>
                        <li>
                            Données liées à une newsletter : tant que vous restez abonné·e ou
                            jusqu’à votre demande de désinscription.
                        </li>
                    </ul>
                </section>

                {/* 6. Qui peut accéder à vos données ? */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        6. Destinataires & partage des données
                    </h2>
                    <p>
                        Vos données ne sont jamais vendues. Elles peuvent être accessibles&nbsp;:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Aux membres habilités du bureau ou de l’équipe de l’association
                            (gestion des adhésions, dons, inscriptions, communication).
                        </li>
                        <li>
                            Le cas échéant, à des prestataires techniques (hébergeur, outils
                            d’e-mailing, solution de paiement en ligne) strictement nécessaires
                            au fonctionnement des services, soumis à une obligation de
                            confidentialité.
                        </li>
                        <li>
                            Aux autorités administratives ou judiciaires, si la loi l’exige ou
                            pour la défense des droits de l’association.
                        </li>
                    </ul>
                </section>

                {/* 7. Vos droits (RGPD) */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        7. Vos droits sur vos données (RGPD)
                    </h2>
                    <p>
                        Conformément au RGPD et à la loi Informatique et Libertés, vous
                        disposez des droits suivants sur vos données personnelles&nbsp;:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <span className="font-semibold">Droit d’accès</span> : savoir
                            quelles données nous détenons sur vous.
                        </li>
                        <li>
                            <span className="font-semibold">Droit de rectification</span> :
                            corriger des données inexactes ou incomplètes.
                        </li>
                        <li>
                            <span className="font-semibold">Droit d’effacement</span> (droit
                            à l’oubli), sous certaines conditions.
                        </li>
                        <li>
                            <span className="font-semibold">Droit à la limitation</span> du
                            traitement de vos données.
                        </li>
                        <li>
                            <span className="font-semibold">Droit d’opposition</span>, en
                            particulier pour les communications de type “prospection”.
                        </li>
                        <li>
                            <span className="font-semibold">Droit à la portabilité</span> de
                            certaines données (transfert dans un format structuré).
                        </li>
                    </ul>
                    <p className="pt-2">
                        Pour exercer ces droits, vous pouvez contacter l’association à
                        l’adresse suivante&nbsp;:
                    </p>
                    <p className="font-semibold">
                        vwakiltirel.asso@gmail.com
                    </p>
                    <p className="pt-2 text-[13px] text-vwa-dark/70">
                        En l’absence de réponse satisfaisante, vous pouvez saisir la CNIL
                        (Commission Nationale de l’Informatique et des Libertés).
                    </p>
                </section>

                {/* 8. Sécurité des données */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        8. Sécurité des données
                    </h2>
                    <p>
                        Nous mettons en œuvre des mesures techniques et organisationnelles
                        raisonnables pour protéger vos données contre la perte, l’accès non
                        autorisé, la divulgation ou l’altération (accès restreint aux outils,
                        mots de passe sécurisés, hébergement professionnel, etc.).
                    </p>
                    <p className="text-[13px] text-vwa-dark/70">
                        Aucun système n’étant totalement infaillible, nous vous invitons à
                        éviter de transmettre par e-mail ou via les formulaires des
                        informations très sensibles (données de santé, détails très
                        personnels, etc.).
                    </p>
                </section>

                {/* 9. Cookies & outils tiers */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        9. Cookies & outils tiers
                    </h2>
                    <p>
                        Le site peut utiliser des cookies nécessaires à son bon
                        fonctionnement (affichage, sécurité, préférences de navigation).
                    </p>
                    <p>
                        Si des outils de mesure d’audience (statistiques), des lecteurs vidéo
                        externes ou des modules de réseaux sociaux sont ajoutés, une bannière
                        ou un module de gestion du consentement sera mis en place pour vous
                        permettre d’accepter ou de refuser ces cookies facultatifs.
                    </p>
                </section>

                {/* 10. Mise à jour de la politique */}
                <section className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        10. Mise à jour de cette page
                    </h2>
                    <p>
                        La présente page peut être mise à jour pour tenir compte de
                        l’évolution du site, des formulaires utilisés ou du cadre légal.
                    </p>
                    <p className="text-[11px] text-vwa-dark/60">
                        Dernière mise à jour&nbsp;: {/* à compléter (JJ/MM/AAAA) */}
                    </p>
                </section>
            </section>
        </main>
    );
}