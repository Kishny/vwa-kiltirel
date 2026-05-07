// =========================================================
// app/devenir-membre/page.tsx
// =========================================================
// Page d’adhésion Vwa Kiltirèl
// Cette page permet aux visiteurs :
// - de découvrir les formules d’adhésion
// - d’accéder aux liens HelloAsso
// - de comprendre les avantages membres
// =========================================================

import type { Metadata } from "next";
import Link from "next/link";

// =========================================================
// SEO
// =========================================================

export const metadata: Metadata = {
  title: "Devenir membre | Vwa Kiltirèl",
  description:
    "Rejoignez Vwa Kiltirèl et soutenez les cultures afro & afro-descendantes, créoles et caribéennes à Tours.",
};

// =========================================================
// LIENS HELLOASSO
// =========================================================
// Tu peux modifier les liens ici plus tard si besoin.
// Actuellement les deux formules redirigent
// vers la même campagne HelloAsso.
// =========================================================

const HELLOASSO_LINKS = {
  trimestrielle:
    "https://www.helloasso.com/associations/vwa-kiltirel/adhesions/adhesion-vwa-kiltirel",

  annuelle:
    "https://www.helloasso.com/associations/vwa-kiltirel/adhesions/adhesion-vwa-kiltirel",
} as const;

// =========================================================
// FORMULES D’ADHÉSION
// =========================================================

const FORMULES = [
  {
    id: "trimestrielle",
    title: "Adhésion trimestrielle",
    amount: "30 €",
    duration: "3 mois",
    badge: "Flexible",
    description:
      "Idéal pour découvrir l’association et participer à vos premiers événements.",
    highlight: false,
  },

  {
    id: "annuelle",
    title: "Adhésion annuelle",
    amount: "140 €",
    duration: "12 mois",
    badge: "Le choix recommandé",
    description:
      "La formule la plus avantageuse pour vivre pleinement l’expérience Vwa Kiltirèl.",
    highlight: true,
  },
] as const;

// =========================================================
// CTA FINAL
// =========================================================
// Bouton réutilisable pour les CTA principaux
// =========================================================

function CTA({
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

  // =========================================================
  // Si un lien existe → vrai bouton cliquable
  // =========================================================

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${
          highlight
            ? "bg-gradient-to-r from-vwa-primary to-vwa-dark text-white shadow-[0_18px_55px_rgba(28,22,18,0.42)] hover:-translate-y-[1px] hover:shadow-[0_22px_70px_rgba(28,22,18,0.58)]"
            : "border-2 border-white/70 bg-white/10 text-white shadow-[0_12px_35px_rgba(28,22,18,0.14)] backdrop-blur-sm hover:border-white hover:bg-white/16 hover:-translate-y-[1px]"
        }`}
      >
        {/* Effet lumineux */}
        <span className="absolute inset-0 opacity-40">
          <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
        </span>

        <span className="relative inline-flex items-center gap-2">
          {label}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    );
  }

  // =========================================================
  // Bouton désactivé si pas de lien
  // =========================================================

  return (
    <button
      type="button"
      disabled
      className={`${baseClass} cursor-not-allowed border-2 border-dashed border-white/55 bg-white/5 text-white/70 backdrop-blur-sm`}
    >
      <span className="relative inline-flex items-center gap-2">
        {label}

        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/75">
          Bientôt disponible
        </span>
      </span>
    </button>
  );
}

// =========================================================
// CTA FORMULES
// =========================================================

function FormulaCTA({
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
        {/* Glow animation */}
        <span className="absolute inset-0 opacity-40">
          <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
        </span>

        <span className="relative inline-flex items-center gap-2">
          {label}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    );
  }

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

// =========================================================
// PAGE PRINCIPALE
// =========================================================

export default function Page() {
  return (
    <main className="relative max-w-6xl mx-auto px-4 py-12 space-y-14">
      {/* =========================================================
          BACKGROUND / EFFETS VISUELS
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />

        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/20 blur-3xl opacity-70" />

        <div className="absolute bottom-[-4rem] right-[-3rem] h-56 w-56 rounded-full bg-vwa-primary/12 blur-3xl opacity-70" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="space-y-6 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
          <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
          Devenir membre – Vwa Kiltirèl
        </p>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-vwa-dark sm:text-5xl">
            Rejoindre Vwa Kiltirèl
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-vwa-dark/70 sm:text-lg">
            Une communauté culturelle, engagée, créative et vivante à Tours.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full bg-vwa-dark px-4 py-2 text-xs font-medium text-vwa-background shadow-[0_16px_45px_rgba(28,22,18,0.35)]">
          Paiement sécurisé via HelloAsso
        </div>
      </section>

      {/* =========================================================
          FORMULES D’ADHÉSION
      ========================================================= */}

      <section className="space-y-5">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/55">
            Choisir votre formule
          </p>

          <h2 className="text-2xl font-bold text-vwa-dark">
            Deux formules pour rejoindre l’aventure
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {FORMULES.map((f) => (
            <article
              key={f.id}
              className={`group relative overflow-hidden rounded-[2rem] border-2 bg-white/96 p-6 shadow-[0_18px_55px_rgba(28,22,18,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,22,18,0.22)] ${
                f.highlight
                  ? "border-vwa-accent/70 ring-1 ring-vwa-accent/30"
                  : "border-vwa-dark/10 ring-1 ring-vwa-dark/5"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-vwa-accent/15 blur-2xl" />
              </div>

              <div className="relative space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-vwa-dark/50">
                      {f.title}
                    </p>

                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-extrabold leading-none text-vwa-dark">
                        {f.amount}
                      </p>

                      <span className="pb-1 text-sm font-medium text-vwa-dark/65">
                        / {f.duration}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${
                      f.highlight
                        ? "bg-vwa-dark text-vwa-background shadow-sm"
                        : "bg-vwa-background text-vwa-dark/75"
                    }`}
                  >
                    {f.badge}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-vwa-dark/75">
                  {f.description}
                </p>

                <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/55 p-4 text-[12px] leading-relaxed text-vwa-dark/68">
                  {f.highlight
                    ? "La formule la plus avantageuse pour vivre pleinement l’expérience Vwa Kiltirèl."
                    : "Parfaite pour découvrir l’association, ses projets et ses premiers événements."}
                </div>

                {/* CTA lié à HelloAsso */}
                <FormulaCTA
                  href={HELLOASSO_LINKS[f.id]}
                  label="Adhérer maintenant"
                  highlight={f.highlight}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          COMMENT ÇA MARCHE
      ========================================================= */}

      <section className="space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/55">
            Parcours d’adhésion
          </p>

          <h2 className="text-2xl font-bold text-vwa-dark">
            Comment ça marche ?
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)] backdrop-blur-sm">
            <p className="text-lg font-semibold text-vwa-dark">
              1. Choisissez
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Sélectionnez votre formule d’adhésion.
            </p>
          </div>

          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)] backdrop-blur-sm">
            <p className="text-lg font-semibold text-vwa-dark">
              2. Paiement sécurisé
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Vous êtes redirigé vers HelloAsso.
            </p>
          </div>

          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)] backdrop-blur-sm">
            <p className="text-lg font-semibold text-vwa-dark">
              3. Vous rejoignez
            </p>

            <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
              Bienvenue dans la communauté Vwa Kiltirèl.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          ENGAGEMENT & IMPACT
      ========================================================= */}

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/55">
            Engagement & impact
          </p>

          <h2 className="text-2xl font-bold text-vwa-dark">
            Pourquoi devenir membre ?
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-sm font-semibold text-vwa-dark">
              ✔ Soutenir une culture vivante
            </p>
          </div>

          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-sm font-semibold text-vwa-dark">
              ✔ Participer à des événements uniques
            </p>
          </div>

          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-sm font-semibold text-vwa-dark">
              ✔ Accéder à des avantages membres
            </p>
          </div>

          <div className="rounded-2xl border border-vwa-dark/10 bg-white/70 p-5 shadow-[0_10px_25px_rgba(28,22,18,0.06)]">
            <p className="text-sm font-semibold text-vwa-dark">
              ✔ Rejoindre une vraie communauté
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA FINAL
      ========================================================= */}

      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-vwa-dark to-[#4a2b1f] p-8 text-center text-white shadow-[0_24px_70px_rgba(28,22,18,0.45)]">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Prêt·e à rejoindre l’aventure ?
          </h2>

          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Choisissez votre formule et finalisez votre adhésion en quelques
            clics. Renouvellement de l'adhésion sous réserve du paiement de la
            cotisation.
          </p>

          <div className="grid gap-4 pt-3 sm:grid-cols-2">
            <CTA
              href={HELLOASSO_LINKS.annuelle}
              label="Adhésion annuelle"
              highlight
            />

            <CTA
              href={HELLOASSO_LINKS.trimestrielle}
              label="Adhésion trimestrielle"
            />
          </div>

          <Link
            href="/contact"
            className="inline-block pt-2 text-xs underline underline-offset-4 opacity-75 transition hover:opacity-100"
          >
            Une question avant d’adhérer ?
          </Link>
        </div>
      </section>

      {/* =========================================================
          INFORMATIONS LÉGALES
      ========================================================= */}

      <section className="mx-auto max-w-3xl text-center">
        <p className="text-xs leading-relaxed text-vwa-dark/55">
          L’adhésion donne accès à des avantages membres et ne constitue pas un
          don.
        </p>

        <p className="text-xs leading-relaxed text-vwa-dark/55">
          Pour la résiliation de l'adhésion, il est possible de le faire par
          mail ou courrier adressé au siège de l'association un mois avant la
          date d'échéance.
        </p>
      </section>
    </main>
  );
}