"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, UserPlus, Sparkles, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center pt-8 pb-12"
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-6 bg-gradient-to-r from-transparent to-vwa-accent/60" />
        <span className="text-[10px] font-medium tracking-[0.25em] text-vwa-accent/70 uppercase">
          Association culturelle & événementielle
        </span>
        <div className="h-px w-6 bg-gradient-to-l from-transparent to-vwa-accent/60" />
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-vwa-dark"
      >
        {/* Le H1 est le signal le plus fort envoyé à Google sur le sujet de la
            page : il doit contenir le nom ET l'activité + la ville. L'emoji
            reste présent en décoration, hors du texte indexé. */}
        <span aria-hidden="true">🧡</span> Vwa Kiltirèl
        <span className="mt-2 block text-lg font-semibold text-vwa-dark/75 sm:text-xl lg:text-2xl">
          Association culturelle afro-caribéenne à Tours
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-sm sm:text-base text-vwa-dark/70 max-w-xl mx-auto leading-relaxed"
      >
        Des événements, ateliers et moments de partage pour faire vibrer les
        cultures, les familles et le vivre ensemble à Tours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        {/* Bouton principal - Voir les actualités */}
        <Link
          href="/actualites"
          className="group relative inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-vwa-terracotta to-vwa-accent shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
        >
          <span className="absolute inset-0 rounded-full bg-vwa-terracotta/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Voir les actualités
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Bouton secondaire - Devenir membre */}
        <Link
          href="/devenir-membre"
          className="group relative inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium bg-white text-vwa-dark border border-vwa-dark/10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-vwa-primary/30 hover:text-vwa-primary active:scale-95"
        >
          <span className="absolute inset-0 rounded-full bg-vwa-primary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            <UserPlus className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Devenir membre
          </span>
        </Link>
      </motion.div>

      {/* Petit élément décoratif */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center justify-center gap-2 text-[10px] text-vwa-dark/40"
      >
        <Heart className="h-3 w-3" />
        <span>Une communauté qui grandit ensemble</span>
        <Heart className="h-3 w-3" />
      </motion.div>
    </motion.section>
  );
}




