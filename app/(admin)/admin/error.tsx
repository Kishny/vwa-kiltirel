"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 p-8 shadow-[0_24px_70px_rgba(28,22,18,0.12)] backdrop-blur-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm ring-1 ring-red-200/70">
          <ExclamationTriangleIcon className="h-8 w-8" />
        </div>

        <p className="inline-flex rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
          Erreur administration
        </p>

        <h2 className="mt-3 text-2xl font-extrabold text-vwa-dark">
          Une erreur est survenue
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-vwa-dark/65">
          Impossible d&apos;afficher cette section. Réessayez ou revenez au
          tableau de bord.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(28,22,18,0.28)] transition hover:-translate-y-[1px]"
          >
            Réessayer
          </button>

          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
          >
            Tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
