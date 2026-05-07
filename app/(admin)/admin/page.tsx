import Link from "next/link";
import {
  UsersIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClipboardDocumentListIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* HERO / INTRO */}
      <section className="overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 shadow-[0_22px_60px_rgba(28,22,18,0.10)]">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-vwa-accent/10 blur-3xl opacity-80" />
            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-vwa-primary/10 blur-3xl opacity-80" />
          </div>

          <div className="relative z-10 p-6 sm:p-8">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
                Dashboard admin
              </p>

              <div className="space-y-3">
                <h1 className="text-3xl font-extrabold text-vwa-dark sm:text-4xl">
                  Panneau de gestion
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-vwa-dark/70 sm:text-base">
                  Accède rapidement aux espaces clés du back-office, sépare
                  clairement la gestion des inscriptions événements et de la
                  newsletter, et garde une lecture plus fluide de l’activité du
                  site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCÈS PRINCIPAUX */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* INSCRIPTIONS */}
        <Link
          href="/admin/inscriptions"
          className="group overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 shadow-[0_18px_45px_rgba(28,22,18,0.10)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(28,22,18,0.16)]"
        >
          <div className="relative h-full p-6 sm:p-7">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-vwa-primary/10 blur-3xl opacity-80" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-vwa-primary/10 text-vwa-primary">
                    <UsersIcon className="h-7 w-7" />
                  </div>

                  <ArrowRightIcon className="h-5 w-5 shrink-0 text-vwa-dark/35 transition group-hover:translate-x-1 group-hover:text-vwa-primary" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-vwa-dark">
                    Inscriptions événements
                  </h2>
                  <p className="text-sm leading-relaxed text-vwa-dark/70">
                    Consulte les demandes, valide les participations, filtre les
                    profils et garde une vue claire sur tous les inscrits aux
                    événements.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                  Participants
                </span>
                <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                  Validation
                </span>
                <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                  Suivi
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* NEWSLETTER */}
        <Link
          href="/admin/newsletter"
          className="group overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 shadow-[0_18px_45px_rgba(28,22,18,0.10)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(28,22,18,0.16)]"
        >
          <div className="relative h-full p-6 sm:p-7">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-vwa-accent/10 blur-3xl opacity-80" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-vwa-accent/10 text-vwa-accent">
                    <EnvelopeIcon className="h-7 w-7" />
                  </div>

                  <ArrowRightIcon className="h-5 w-5 shrink-0 text-vwa-dark/35 transition group-hover:translate-x-1 group-hover:text-vwa-accent" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-vwa-dark">
                    Newsletter
                  </h2>
                  <p className="text-sm leading-relaxed text-vwa-dark/70">
                    Gère les abonnés, distingue les actifs des désinscrits,
                    recherche par email et exporte la base pour tes actions de
                    communication.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                  Abonnés
                </span>
                <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                  Désinscriptions
                </span>
                <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                  Export CSV
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* OUTILS RAPIDES */}
      <section className="rounded-[2rem] border border-vwa-background/80 bg-white/95 p-6 shadow-[0_18px_45px_rgba(28,22,18,0.10)]">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-vwa-dark/5 text-vwa-primary">
            <SparklesIcon className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-vwa-dark">
              Accès rapides
            </h2>
            <p className="mt-1 text-sm text-vwa-dark/65">
              Quelques raccourcis utiles pour aller vite dans ton back-office.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/admin/inscriptions"
            className="group rounded-3xl border border-vwa-background/80 bg-vwa-background/45 p-4 shadow-sm transition hover:border-vwa-primary/20 hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-vwa-dark">
                  Voir les inscriptions
                </p>
                <p className="mt-1 text-xs leading-relaxed text-vwa-dark/55">
                  Accéder directement au suivi des participants.
                </p>
              </div>
              <ClipboardDocumentListIcon className="h-5 w-5 text-vwa-primary/70 transition group-hover:scale-105" />
            </div>
          </Link>

          <Link
            href="/admin/newsletter"
            className="group rounded-3xl border border-vwa-background/80 bg-vwa-background/45 p-4 shadow-sm transition hover:border-vwa-primary/20 hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-vwa-dark">
                  Gérer la newsletter
                </p>
                <p className="mt-1 text-xs leading-relaxed text-vwa-dark/55">
                  Voir les abonnés et l’état des inscriptions email.
                </p>
              </div>
              <EnvelopeIcon className="h-5 w-5 text-vwa-accent/70 transition group-hover:scale-105" />
            </div>
          </Link>

          <a
            href="/api/admin/newsletter/export"
            className="group rounded-3xl border border-vwa-background/80 bg-vwa-background/45 p-4 shadow-sm transition hover:border-vwa-primary/20 hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-vwa-dark">
                  Export newsletter
                </p>
                <p className="mt-1 text-xs leading-relaxed text-vwa-dark/55">
                  Télécharger rapidement la base abonnés au format CSV.
                </p>
              </div>
              <ArrowDownTrayIcon className="h-5 w-5 text-vwa-dark/55 transition group-hover:scale-105" />
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}