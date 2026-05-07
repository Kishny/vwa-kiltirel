"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, Sparkles, Shield } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 2500);
  }

  return (
    <div className="relative max-w-xl mx-auto">
      {/* Effet de halo premium */}
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-vwa-primary/15 via-vwa-accent/15 to-vwa-primary/10 blur-xl opacity-70 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-vwa-dark/8 bg-white/95 p-5 sm:p-6 shadow-xl backdrop-blur-sm"
      >
        {/* Décoration */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-vwa-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-vwa-primary/5 blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex items-start gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-vwa-primary/10 to-vwa-accent/10 text-vwa-primary">
              <Mail className="h-5 w-5" />
            </div>

            <div className="space-y-1">
              <p className="text-base font-bold text-vwa-dark">
                Rejoignez la newsletter
              </p>
              <p className="text-xs leading-relaxed text-vwa-dark/60">
                Un concentré d'actualités, d'événements et de coulisses, envoyé avec
                soin. Pas de spam. Jamais.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="votre@email.fr"
                className="peer w-full rounded-xl border border-vwa-dark/10 bg-white/80 px-4 py-3 pr-28 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-300 focus:border-vwa-accent/50 focus:shadow-[0_0_0_3px_rgba(199,140,59,0.15)]"
              />

              {/* Effet de glow animé */}
              <span
                className={`pointer-events-none absolute inset-x-4 bottom-0 h-[2px] origin-left bg-gradient-to-r from-vwa-primary via-vwa-accent to-vwa-primary transition-all duration-500 ${
                  isFocused ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              />

              <button
                type="submit"
                className="absolute right-1.5 top-1.5 inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-vwa-primary to-vwa-dark px-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                S'inscrire
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] leading-relaxed text-vwa-dark/50">
                En vous inscrivant, vous acceptez de recevoir les informations liées
                à la vie de l'association. Désinscription à tout moment.
              </p>

              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-vwa-dark/5 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-vwa-dark/55">
                <Shield className="h-3 w-3" />
                RGPD friendly
              </span>
            </div>
          </form>
        </div>

        {/* Message de succès animé */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl"
            >
              <div className="text-center space-y-3 p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-vwa-primary to-vwa-accent"
                >
                  <CheckCircle className="h-7 w-7 text-white" />
                </motion.div>
                <p className="text-sm font-bold text-vwa-dark">Inscription enregistrée !</p>
                <p className="text-xs text-vwa-dark/60 max-w-xs">
                  Merci ✨ La newsletter Vwa Kiltirèl arrive bientôt dans votre boîte mail.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}