"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type UnsubscribeState = {
  status: "loading" | "success" | "error";
  message: string;
};

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeContent />
    </Suspense>
  );
}

function UnsubscribeContent() {
  const params = useSearchParams();
  const token = params.get("token");

  const [state, setState] = useState<UnsubscribeState>({
    status: "loading",
    message: "Traitement de votre demande en cours...",
  });

  useEffect(() => {
    if (!token) return;

    let isCancelled = false;

    async function unsubscribe() {
      try {
        const response = await fetch("/api/newsletter/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (isCancelled) return;

        if (data.success) {
          setState({
            status: "success",
            message:
              data.message ||
              "Votre désinscription à la newsletter a bien été prise en compte.",
          });
        } else {
          setState({
            status: "error",
            message:
              data.error ||
              "Impossible de traiter votre demande pour le moment.",
          });
        }
      } catch {
        if (isCancelled) return;

        setState({
          status: "error",
          message: "Impossible de traiter votre demande.",
        });
      }
    }

    unsubscribe();

    return () => {
      isCancelled = true;
    };
  }, [token]);

  if (!token) {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/50 via-vwa-background to-vwa-background" />
          <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/15 blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-vwa-primary/10 blur-3xl opacity-60" />
        </div>

        <section className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 p-6 shadow-[0_24px_70px_rgba(28,22,18,0.14)] backdrop-blur-sm sm:p-8">
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm ring-1 ring-red-200/70">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <p className="inline-flex rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
                Désinscription newsletter
              </p>

              <h1 className="text-2xl font-extrabold text-vwa-dark sm:text-3xl">
                Lien invalide
              </h1>

              <p className="mx-auto max-w-md text-sm leading-relaxed text-vwa-dark/72">
                Le lien de désinscription semble incomplet, invalide ou expiré.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(28,22,18,0.32)] transition hover:-translate-y-[1px]"
              >
                Retour à l’accueil
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/50 via-vwa-background to-vwa-background" />
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/15 blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-vwa-primary/10 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-vwa-accent/10 blur-3xl opacity-60" />
      </div>

      <section className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 p-6 shadow-[0_24px_70px_rgba(28,22,18,0.14)] backdrop-blur-sm sm:p-8">
        <div className="space-y-6 text-center">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ring-1 ${
              state.status === "loading"
                ? "bg-vwa-background text-vwa-primary ring-vwa-background"
                : state.status === "success"
                ? "bg-emerald-50 text-emerald-600 ring-emerald-200/70"
                : "bg-red-50 text-red-600 ring-red-200/70"
            }`}
          >
            {state.status === "loading" && (
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-current/25 border-t-current" />
            )}

            {state.status === "success" && (
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}

            {state.status === "error" && (
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
                />
              </svg>
            )}
          </div>

          <div className="space-y-2">
            <p className="inline-flex rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
              Newsletter Vwa Kiltirèl
            </p>

            {state.status === "loading" && (
              <h1 className="text-2xl font-extrabold text-vwa-dark sm:text-3xl">
                Traitement en cours
              </h1>
            )}

            {state.status === "success" && (
              <h1 className="text-2xl font-extrabold text-vwa-dark sm:text-3xl">
                Désinscription confirmée
              </h1>
            )}

            {state.status === "error" && (
              <h1 className="text-2xl font-extrabold text-vwa-dark sm:text-3xl">
                Une erreur est survenue
              </h1>
            )}

            <p className="mx-auto max-w-md text-sm leading-relaxed text-vwa-dark/72">
              {state.message}
            </p>
          </div>

          <div
            className={`rounded-2xl px-4 py-4 text-sm shadow-sm ring-1 ${
              state.status === "loading"
                ? "bg-vwa-background/60 text-vwa-dark/75 ring-vwa-background"
                : state.status === "success"
                ? "bg-emerald-50/80 text-emerald-800 ring-emerald-200/70"
                : "bg-red-50/80 text-red-700 ring-red-200/70"
            }`}
          >
            {state.status === "success" && (
              <p>
                Vous ne recevrez plus les prochaines communications liées à la
                newsletter. Vous pourrez toujours vous réinscrire plus tard si
                vous le souhaitez.
              </p>
            )}

            {state.status === "loading" && (
              <p>Nous vérifions votre demande de désinscription sécurisée.</p>
            )}

            {state.status === "error" && (
              <p>
                Le lien a peut-être expiré ou ne correspond plus à une demande
                valide.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(28,22,18,0.32)] transition hover:-translate-y-[1px]"
            >
              Retour à l’accueil
            </Link>

            {state.status !== "loading" && (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
              >
                Nous contacter
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}