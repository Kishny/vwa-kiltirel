"use client";

import { motion } from "framer-motion";

export default function MediathequeQuoteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2rem] border border-vwa-dark/8 bg-gradient-to-br from-white/95 via-white to-vwa-background/40 px-6 py-12 text-center shadow-[0_24px_80px_-40px_rgba(59,38,29,0.35)] sm:px-8 lg:px-12"
    >
      {/* halos */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vwa-accent/12 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-vwa-primary/8 blur-3xl" />
        <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-vwa-accent/8 blur-3xl" />
      </div>

      {/* ligne décorative */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto mb-6 flex w-fit items-center gap-3"
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-vwa-accent/60" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-vwa-accent/75">
          Regard sensible
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-vwa-accent/60" />
      </motion.div>

      <blockquote className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.95, delay: 0.12, ease: "easeOut" }}
          className="text-base italic leading-relaxed text-vwa-dark/65 sm:text-lg"
        >
          <span className="text-vwa-accent/70">&ldquo;</span>
          Chaque photographie est une fenêtre ouverte sur notre histoire
          collective, un pont entre les générations, une invitation à perpétuer
          la richesse de nos cultures.
          <span className="text-vwa-accent/70">&rdquo;</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent via-vwa-primary/45 to-transparent" />
          <cite className="not-italic text-xs font-semibold uppercase tracking-[0.22em] text-vwa-primary/70">
            Vwa Kiltirèl · mémoire vivante
          </cite>
        </motion.div>
      </blockquote>
    </motion.footer>
  );
}