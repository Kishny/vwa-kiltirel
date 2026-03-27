"use client";

import { useState } from "react";
import { CheckCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitted(true);

    // reset visuel léger
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 2200);
  }

  return (
    <div className="relative max-w-xl">
      {/* halo */}
      <div className="pointer-events-none absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-vwa-primary/10 via-vwa-accent/10 to-vwa-primary/5 blur-xl opacity-80" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-vwa-background/80 bg-white/95 p-4 sm:p-5 shadow-[0_18px_55px_rgba(28,22,18,0.12)] backdrop-blur-sm">
        <div className="mb-4 flex items-start gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-vwa-dark/5 text-vwa-primary">
            <EnvelopeIcon className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-vwa-dark">
              Rejoignez la newsletter Vwa Kiltirèl
            </p>
            <p className="text-[11px] leading-relaxed text-vwa-dark/62">
              Un concentré d’actualités, d’événements et de coulisses, envoyé avec
              soin. Pas de spam. Jamais.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre adresse e-mail"
              className="peer w-full rounded-2xl border border-vwa-background bg-white px-4 py-3 pr-32 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.45)]"
            />

            {/* ligne glow focus */}
            <span className="pointer-events-none absolute inset-x-4 bottom-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-vwa-primary via-vwa-accent to-vwa-primary opacity-0 transition-all duration-300 peer-focus:scale-x-100 peer-focus:opacity-100" />

            <button
              type="submit"
              className="absolute right-1.5 top-1.5 inline-flex h-[42px] items-center justify-center rounded-xl bg-gradient-to-r from-vwa-primary to-vwa-dark px-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(28,22,18,0.35)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_rgba(28,22,18,0.45)] active:scale-[0.98]"
            >
              S’inscrire
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-relaxed text-vwa-dark/55">
              En vous inscrivant, vous acceptez de recevoir les informations liées
              à la vie de l’association. Vous pourrez vous désinscrire à tout moment.
            </p>

            <span className="inline-flex shrink-0 rounded-full bg-vwa-background px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-vwa-dark/60">
              RGPD friendly
            </span>
          </div>
        </form>

        {/* message succès */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm transition-all duration-300 ${
            isSubmitted
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-center gap-2 rounded-3xl border border-vwa-background/80 bg-white px-6 py-5 shadow-[0_20px_60px_rgba(28,22,18,0.18)]">
            <CheckCircleIcon className="h-8 w-8 text-vwa-primary" />
            <p className="text-sm font-semibold text-vwa-dark">
              Inscription enregistrée
            </p>
            <p className="text-[11px] text-vwa-dark/65 text-center max-w-xs">
              Merci ✨ La newsletter Vwa Kiltirèl arrive bientôt dans votre boîte mail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}