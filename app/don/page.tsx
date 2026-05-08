// app/don/page.tsx

import type { Metadata } from "next";
import Link from "next/link";



// ===============================
// SEO
// ===============================
export const metadata: Metadata = {
  title: "Faire un don | Vwa Kiltirèl",
  description:
    "Soutenez Vwa Kiltirèl par un don et contribuez au rayonnement des cultures afro & afro-descendantes, créoles et caribéennes à Tours.",
};



// ===============================
// LIEN HELLOASSO DON
// ===============================
// 👉 Lien officiel de votre campagne de dons
const HELLOASSO_DON_LINK =
  "https://www.helloasso.com/associations/vwa-kiltirel/formulaires/1";



// ===============================
// MONTANTS SUGGÉRÉS
// ===============================
const DON_AMOUNTS = [
  {
    label: "5 €",
    title: "Un geste symbolique",
    description:
      "Chaque contribution compte et participe à faire vivre notre dynamique.",
  },
  {
    label: "10 €",
    title: "Un soutien concret",
    description:
      "Vous aidez à renforcer nos actions culturelles et communautaires.",
  },
  {
    label: "20 €",
    title: "Un vrai coup de pouce",
    description:
      "Vous soutenez l’organisation de nos temps forts et ateliers.",
  },
  {
    label: "50 €",
    title: "Un engagement fort",
    description:
      "Vous contribuez directement au développement de projets à plus grande portée.",
  },
] as const;



// ===============================
// BOUTON CTA DON
// ===============================
function DonationCTA({
  href,
  label,
  highlight = false,
}: {
  href?: string;
  label: string;
  highlight?: boolean;
}) {
  const baseClass =
    "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-5 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70";

  // ===============================
  // VERSION ACTIVE
  // ===============================
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${
          highlight
            ? "bg-gradient-to-r from-vwa-primary to-vwa-dark text-white shadow-[0_18px_55px_rgba(28,22,18,0.42)] hover:-translate-y-[1px] hover:shadow-[0_22px_70px_rgba(28,22,18,0.58)]"
            : "border-2 border-vwa-dark/12 bg-white text-vwa-dark shadow-[0_12px_35px_rgba(28,22,18,0.10)] hover:border-vwa-primary/40 hover:text-vwa-primary hover:-translate-y-[1px]"
        }`}
      >
        {/* Effet lumineux */}
        <span className="absolute inset-0 opacity-40">
          <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
        </span>

        {/* Texte bouton */}
        <span className="relative inline-flex items-center gap-2">
          {label}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    );
  }

  // ===============================
  // VERSION DÉSACTIVÉE
  // ===============================
  return (
    <button
      type="button"
      disabled
      className={`${baseClass} cursor-not-allowed border-2 border-dashed border-vwa-dark/20 bg-vwa-dark/5 text-vwa-dark/50`}
    >
      <span className="relative inline-flex items-center gap-2">
        {label}

        <span className="rounded-full bg-vwa-dark/8 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-vwa-dark/65">
          Bientôt disponible
        </span>
      </span>
    </button>
  );
}



// ===============================
// PAGE DON
// ===============================
export default function DonPage() {
  return (
    <main className="relative max-w-6xl mx-auto px-4 py-12 space-y-14">

      {/* ===============================
          BACKGROUND / EFFETS
      =============================== */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />

        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/20 blur-3xl opacity-70" />

        <div className="absolute bottom-[-4rem] right-[-3rem] h-56 w-56 rounded-full bg-vwa-primary/12 blur-3xl opacity-70" />
      </div>



      {/* ===============================
          HERO
      =============================== */}
      <section className="space-y-6 text-center">

        {/* Petit badge haut */}
        <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
          <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
          Faire un don – Vwa Kiltirèl
        </p>

        {/* Titre */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-vwa-dark sm:text-5xl">
            Soutenir Vwa Kiltirèl
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-vwa-dark/70 sm:text-lg">
            Votre don aide Vwa Kiltirèl à faire vivre des événements,
            ateliers, rencontres et projets culturels autour des cultures
            afro et afro-descendantes, créoles et caribéennes à Tours et ailleurs.
          </p>
        </div>

        {/* Badge sécurité */}
        <div className="inline-flex items-center rounded-full bg-vwa-dark px-4 py-2 text-xs font-medium text-vwa-background shadow-[0_16px_45px_rgba(28,22,18,0.35)]">
          Don sécurisé via HelloAsso
        </div>
      </section>



      {/* ===============================
          IMPACT DES DONS
      =============================== */}
      <section className="rounded-[2rem] border border-vwa-background/80 bg-white/80 px-5 py-5 shadow-[0_20px_60px_rgba(28,22,18,0.10)] backdrop-blur-sm">

        <div className="grid gap-4 md:grid-cols-3">

          {/* Carte 1 */}
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-sm font-semibold text-vwa-dark">
              Financer nos événements
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Vos dons participent à la mise en place de soirées,
              rencontres, ateliers et temps forts culturels.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-sm font-semibold text-vwa-dark">
              Soutenir la transmission
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Vous aidez à transmettre des héritages culturels précieux.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-sm font-semibold text-vwa-dark">
              Faire grandir l’association
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Chaque contribution renforce la stabilité des projets portés
              par Vwa Kiltirèl.
            </p>
          </div>
        </div>
      </section>



      {/* ===============================
          MONTANTS
      =============================== */}
      <section className="space-y-5">

        {/* Header section */}
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/55">
            Montants suggérés
          </p>

          <h2 className="text-2xl font-bold text-vwa-dark">
            Donner selon vos moyens
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {DON_AMOUNTS.map((amount) => (
            <article
              key={amount.label}
              className="group relative overflow-hidden rounded-[2rem] border-2 border-vwa-dark/10 bg-white/96 p-6 shadow-[0_18px_55px_rgba(28,22,18,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,22,18,0.22)]"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-vwa-accent/15 blur-2xl" />
              </div>

              <div className="relative space-y-4">

                {/* Montant */}
                <p className="text-4xl font-extrabold leading-none text-vwa-dark">
                  {amount.label}
                </p>

                {/* Texte */}
                <div>
                  <p className="text-sm font-semibold text-vwa-dark">
                    {amount.title}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
                    {amount.description}
                  </p>
                </div>

                {/* CTA DON */}
                <DonationCTA
                  href={HELLOASSO_DON_LINK}
                  label={`Donner ${amount.label}`}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Message montant libre */}
        <div className="rounded-3xl border border-vwa-background/80 bg-vwa-background/60 px-4 py-4 text-[12px] text-vwa-dark/70 leading-relaxed">
          Vous pourrez également choisir un montant libre sur la page
          sécurisée HelloAsso.
        </div>
      </section>



      {/* ===============================
          COMMENT ÇA MARCHE
      =============================== */}
      <section className="space-y-6">

        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/55">
            Parcours de don
          </p>

          <h2 className="text-2xl font-bold text-vwa-dark">
            Comment ça marche ?
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          {/* Étape 1 */}
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-lg font-semibold text-vwa-dark">
              1. Choisissez
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Sélectionnez un montant suggéré ou un don libre.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-lg font-semibold text-vwa-dark">
              2. Paiement sécurisé
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Vous êtes redirigé vers HelloAsso.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-lg font-semibold text-vwa-dark">
              3. Vous soutenez
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Votre contribution aide directement les actions culturelles.
            </p>
          </div>
        </div>
      </section>



      {/* ===============================
          CTA FINAL
      =============================== */}
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-vwa-dark to-[#4a2b1f] p-8 text-center text-white shadow-[0_24px_70px_rgba(28,22,18,0.45)]">

        <div className="mx-auto max-w-3xl space-y-4">

          {/* Titre */}
          <h2 className="text-3xl font-bold tracking-tight">
            Faire vivre Vwa Kiltirèl, ensemble
          </h2>

          {/* Texte */}
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Chaque don compte. Même modeste, il contribue à faire exister
            des projets culturels porteurs de sens.
          </p>

          {/* Boutons */}
          <div className="grid gap-4 pt-3 sm:grid-cols-2">

            <DonationCTA
              href={HELLOASSO_DON_LINK}
              label="Faire un don maintenant"
              highlight
            />

            <DonationCTA
              href={HELLOASSO_DON_LINK}
              label="Choisir un montant libre"
            />
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            className="inline-block pt-2 text-xs underline underline-offset-4 opacity-75 transition hover:opacity-100"
          >
            Une question avant de faire un don ?
          </Link>
        </div>
      </section>



      {/* ===============================
          INFORMATIONS LÉGALES
      =============================== */}
      <section className="mx-auto max-w-3xl text-center space-y-2">

        <p className="text-xs leading-relaxed text-vwa-dark/55">
          Le don est libre et sans contrepartie directe.
        </p>

        <p className="text-xs leading-relaxed text-vwa-dark/55">
          Selon le statut fiscal de l’association et les conditions légales
          en vigueur, il pourra ouvrir droit à une réduction d’impôt.
        </p>
      </section>
    </main>
  );
}