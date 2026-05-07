import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/50 via-vwa-background to-vwa-background" />
          <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-vwa-accent/15 blur-3xl opacity-60" />
          <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-vwa-primary/10 blur-3xl opacity-60" />
        </div>

        <div className="w-full max-w-xl text-center">
          <p className="inline-flex rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
            Erreur 404
          </p>

          <h1 className="mt-4 text-6xl font-extrabold text-vwa-dark sm:text-8xl">
            404
          </h1>

          <p className="mt-2 text-xl font-semibold text-vwa-dark sm:text-2xl">
            Page introuvable
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-vwa-dark/65">
            La page que vous cherchez n&apos;existe pas ou a été déplacée. Revenez
            à l&apos;accueil pour continuer votre navigation.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(28,22,18,0.28)] transition hover:-translate-y-[1px]"
            >
              Retour à l&apos;accueil
            </Link>

            <Link
              href="/evenements"
              className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-6 py-3 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
            >
              Voir les événements
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
