// app/mentions-legales/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

// ============================================
// MÉTADONNÉES SEO COMPLÈTES
// ============================================
export const metadata: Metadata = {
  title: "Mentions légales & Confidentialité | Vwa Kiltirèl | RGPD",
  description:
    "Mentions légales, politique de confidentialité et informations RGPD de l'association Vwa Kiltirèl. Découvrez nos engagements en matière de protection des données personnelles.",
  keywords: [
    "mentions légales association",
    "politique confidentialité Vwa Kiltirèl",
    "RGPD association culturelle",
    "protection données personnelles",
    "CGU association Tours",
    "données personnelles culture",
    "confidentialité site association",
  ],
  authors: [{ name: "Vwa Kiltirèl" }],
  creator: "Vwa Kiltirèl",
  publisher: "Vwa Kiltirèl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mentions légales & Politique de confidentialité | Vwa Kiltirèl",
    description:
      "Consultez les mentions légales et la politique de protection des données personnelles de l'association Vwa Kiltirèl, conforme au RGPD.",
    url: "https://vwakiltirel-asso.org/mentions-legales",
    siteName: "Vwa Kiltirèl",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og/legal-og.jpg",
        width: 1200,
        height: 630,
        alt: "Mentions légales Vwa Kiltirèl",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions légales & Confidentialité | Vwa Kiltirèl",
    description:
      "Mentions légales, politique de confidentialité et informations RGPD de l'association Vwa Kiltirèl.",
    images: ["/images/og/legal-og.jpg"],
    site: "@vwa_kiltirel",
    creator: "@vwa_kiltirel",
  },
  alternates: {
    canonical: "https://vwakiltirel-asso.org/mentions-legales",
  },
  verification: {
    google: "votre-code-verification-google",
  },
  category: "mentions légales",
};

// ============================================
// DONNÉES STRUCTURÉES JSON-LD
// ============================================
function generateLegalPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mentions légales - Vwa Kiltirèl",
    description:
      "Mentions légales et politique de confidentialité de l'association Vwa Kiltirèl.",
    url: "https://vwakiltirel-asso.org/mentions-legales",
    mainEntity: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      legalName: "Association Vwa Kiltirèl",
      url: "https://vwakiltirel-asso.org",
      email: "vwakiltirel.asso@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "55 Rue Daniel Mayer",
        addressLocality: "Tours",
        postalCode: "37100",
        addressRegion: "Centre-Val de Loire",
        addressCountry: "FR",
      },
      taxID: "À renseigner",
      duns: "À renseigner",
    },
  };
}

function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://vwakiltirel-asso.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mentions légales",
        item: "https://vwakiltirel-asso.org/mentions-legales",
      },
    ],
  };
}

export default function MentionsLegalesPage() {
  const legalPageSchema = generateLegalPageSchema();
  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <>
      {/* JSON-LD Schema.org pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
          <section className="space-y-3 rounded-2xl border border-vwa-background/80 bg-white/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-vwa-accent/20 flex items-center justify-center text-[10px]">1</span>
              Éditeur du site
            </h2>
            <p>
              Le site{" "}
              <span className="font-semibold text-vwa-dark">Vwa Kiltirèl</span> est édité par
              l’association :
            </p>
            <ul className="mt-2 list-none space-y-1.5">
              <li className="flex flex-wrap gap-1">
                <span className="font-semibold text-vwa-dark">Dénomination :</span>
                <span>Association Vwa Kiltirèl</span>
              </li>
              <li className="flex flex-wrap gap-1">
                <span className="font-semibold text-vwa-dark">Forme :</span>
                <span>Association loi 1901</span>
              </li>
              <li className="flex flex-wrap gap-1">
                <span className="font-semibold text-vwa-dark">Adresse du siège social :</span>
                <span>55 Rue Daniel Mayer, 37100 Tours, France</span>
              </li>
              <li className="flex flex-wrap gap-1">
                <span className="font-semibold text-vwa-dark">Email :</span>
                <a href="mailto:vwakiltirel.asso@gmail.com" className="text-vwa-primary hover:underline">
                  vwakiltirel.asso@gmail.com
                </a>
              </li>
            </ul>
            <p className="text-[11px] text-vwa-dark/50 italic">
              ⚠️ N° RNA et N° SIRET : à renseigner dès réception des documents officiels
            </p>
          </section>

          {/* 2. Hébergement */}
          <section className="space-y-3 rounded-2xl border border-vwa-background/80 bg-white/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-vwa-accent/20 flex items-center justify-center text-[10px]">2</span>
              Hébergement du site
            </h2>
            <p>
              Le site est hébergé par&nbsp;:
            </p>
            <ul className="mt-2 list-none space-y-1.5">
              <li className="font-semibold text-vwa-dark">Vercel Inc.</li>
              <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
              <li>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-vwa-primary hover:underline">
                  https://vercel.com
                </a>
              </li>
            </ul>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section className="space-y-3 rounded-2xl border border-vwa-background/80 bg-white/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-vwa-accent/20 flex items-center justify-center text-[10px]">3</span>
              Propriété intellectuelle
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
          <section className="space-y-3 rounded-2xl border border-vwa-background/80 bg-white/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-vwa-accent/20 flex items-center justify-center text-[10px]">4</span>
              Données personnelles & RGPD
            </h2>

            <p>
              Dans le cadre de ses activités, l’association Vwa Kiltirèl peut être
              amenée à collecter et traiter des données personnelles, notamment
              via les formulaires suivants&nbsp;:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
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

            <div className="mt-3 rounded-xl bg-vwa-dark/5 p-4">
              <p className="font-semibold text-vwa-dark">Base légale des traitements</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
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
            </div>

            <div className="mt-3 rounded-xl bg-vwa-dark/5 p-4">
              <p className="font-semibold text-vwa-dark">Durée de conservation</p>
              <p className="mt-2">Les données sont conservées pendant une durée proportionnée à la finalité du traitement, par exemple&nbsp;:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
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
            </div>

            <div className="mt-3 rounded-xl bg-vwa-dark/5 p-4">
              <p className="font-semibold text-vwa-dark">Vos droits</p>
              <p className="mt-2">
                Conformément au Règlement général sur la protection des données
                (RGPD) et à la loi Informatique et Libertés, vous disposez des
                droits suivants sur vos données&nbsp;:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li>Droit d’accès et de rectification</li>
                <li>Droit d’effacement (droit à l’oubli)</li>
                <li>Droit de limitation du traitement</li>
                <li>Droit d’opposition, notamment en cas de prospection</li>
                <li>Droit à la portabilité de vos données</li>
              </ul>
            </div>

            <p className="pt-2">
              Pour exercer ces droits ou poser toute question relative à vos
              données personnelles, vous pouvez contacter l’association à
              l’adresse suivante&nbsp;:
            </p>
            <p className="font-semibold text-vwa-primary">
              <a href="mailto:vwakiltirel.asso@gmail.com">vwakiltirel.asso@gmail.com</a>
            </p>

            <p className="pt-2 text-[13px] text-vwa-dark/70">
              Si vous estimez, après nous avoir contactés, que vos droits ne sont
              pas respectés, vous pouvez adresser une réclamation à la{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-vwa-primary hover:underline">
                CNIL
              </a>{" "}
              (Commission Nationale de l’Informatique et des Libertés).
            </p>
          </section>

          {/* 5. Cookies & mesure d’audience */}
          <section className="space-y-3 rounded-2xl border border-vwa-background/80 bg-white/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-vwa-accent/20 flex items-center justify-center text-[10px]">5</span>
              Cookies & mesure d’audience
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
          <section className="space-y-3 rounded-2xl border border-vwa-background/80 bg-white/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-vwa-accent/20 flex items-center justify-center text-[10px]">6</span>
              Liens externes
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
          <section className="space-y-3 rounded-2xl border border-vwa-background/80 bg-white/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60 flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-vwa-accent/20 flex items-center justify-center text-[10px]">7</span>
              Mise à jour des mentions
            </h2>
            <p>
              L’association se réserve la possibilité de modifier la présente
              page afin de refléter l’évolution du site, des activités ou du
              cadre légal. La date de dernière mise à jour sera indiquée ci-dessous.
            </p>
            <p className="text-[11px] text-vwa-dark/60 flex items-center gap-2">
              <span>📅</span>
              Dernière mise à jour&nbsp;: 30 mars 2026
            </p>
          </section>

          {/* Footer de la page */}
          <div className="pt-4 text-center text-[11px] text-vwa-dark/50 border-t border-vwa-background/60">
            <p>© {new Date().getFullYear()} Vwa Kiltirèl - Tous droits réservés</p>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <Link href="/" className="hover:text-vwa-primary transition">Accueil</Link>
              <span>•</span>
              <Link href="/mentions-legales" className="hover:text-vwa-primary transition">Mentions légales</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-vwa-primary transition">Contact</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}