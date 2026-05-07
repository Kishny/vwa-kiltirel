"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="relative flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/50 via-vwa-background to-vwa-background" />
          <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-vwa-accent/15 blur-3xl opacity-60" />
          <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-vwa-primary/10 blur-3xl opacity-60" />
        </div>

        <div className="w-full max-w-xl text-center">
          <p className="inline-flex rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
            Erreur inattendue
          </p>

          <h1 className="mt-4 text-4xl font-extrabold text-vwa-dark sm:text-5xl">
            Quelque chose s&apos;est mal passé
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-vwa-dark/65">
            Une erreur inattendue est survenue. Vous pouvez réessayer ou
            revenir à l&apos;accueil.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(28,22,18,0.28)] transition hover:-translate-y-[1px]"
            >
              Réessayer
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-6 py-3 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
