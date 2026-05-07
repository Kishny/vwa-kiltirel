"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AdminLogoutButton() {
  const router = useRouter();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutDone, setLogoutDone] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setLoggingOut(true);
      setError("");

      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Impossible de se déconnecter.");
      }

      setLogoutDone(true);

      setTimeout(() => {
        router.push("/admin/login");
        router.refresh();
      }, 2200);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur est survenue pendant la déconnexion.";

      setError(message);
      setLoggingOut(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenConfirm(true)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-vwa-dark/10 bg-white px-4 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-red-300 hover:text-red-600"
      >
        <ArrowRightOnRectangleIcon className="h-4 w-4" />
        Déconnexion
      </button>

      <AnimatePresence>
        {openConfirm && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 shadow-[0_30px_80px_rgba(28,22,18,0.22)]"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.22 }}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-vwa-accent/12 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-vwa-primary/10 blur-3xl" />
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                {!logoutDone ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                        <ExclamationTriangleIcon className="h-6 w-6" />
                      </div>

                      {!loggingOut && (
                        <button
                          type="button"
                          onClick={() => setOpenConfirm(false)}
                          className="rounded-full p-2 text-vwa-dark/45 transition hover:bg-vwa-dark/5 hover:text-vwa-dark"
                          aria-label="Fermer"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="inline-flex rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
                        Confirmation
                      </p>

                      <h3 className="text-2xl font-extrabold text-vwa-dark">
                        Voulez-vous vraiment vous déconnecter ?
                      </h3>

                      <p className="text-sm leading-relaxed text-vwa-dark/70">
                        Vous allez quitter l’espace administrateur sécurisé de
                        Vwa Kiltirèl. Vous devrez vous reconnecter pour revenir
                        au back-office.
                      </p>
                    </div>

                    {error && (
                      <div className="mt-4 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setOpenConfirm(false)}
                        disabled={loggingOut}
                        className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Annuler
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(239,68,68,0.28)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(239,68,68,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {loggingOut ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                            Déconnexion...
                          </>
                        ) : (
                          <>
                            <ArrowRightOnRectangleIcon className="h-4 w-4" />
                            Oui, me déconnecter
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto flex w-full max-w-[120px] items-center justify-center">
                      <div className="relative h-24 w-24">
                        <div className="absolute inset-0 rounded-full border-2 border-vwa-accent/25 border-t-vwa-accent animate-spin" />
                        <div className="absolute inset-3 overflow-hidden rounded-full bg-white shadow-sm">
                          <Image
                            src="/favicon.png"
                            alt="Logo Vwa Kiltirèl"
                            fill
                            className="object-contain p-2"
                            sizes="96px"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <p className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700">
                        Session fermée
                      </p>

                      <h3 className="text-2xl font-extrabold text-vwa-dark">
                        Déconnexion réussie
                      </h3>

                      <p className="mx-auto max-w-sm text-sm leading-relaxed text-vwa-dark/70">
                        Vous allez être redirigé vers la page de connexion dans
                        quelques secondes…
                      </p>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-vwa-background">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-vwa-primary to-vwa-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}