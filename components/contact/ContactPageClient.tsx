"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Clock, Sparkles, Heart } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

// Composant d'animation section
const SectionWrapper = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function ContactPageClient() {
  return (
    <>
      {/* Logo en filigrane qui tourne */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="relative h-[800px] w-[800px] opacity-[0.03] sm:opacity-[0.04] md:opacity-[0.05]"
          >
            <Image
              src="/images/Logo.png"
              alt="Vwa Kiltirèl"
              fill
              sizes="800px"
              className="object-contain"
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="relative h-[500px] w-[500px] opacity-[0.02] sm:opacity-[0.03]"
          >
            <Image
              src="/images/Logo.png"
              alt="Vwa Kiltirèl"
              fill
              sizes="500px"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* ==================== HEADER ÉDITORIAL PREMIUM ==================== */}
        <SectionWrapper>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-vwa-accent/80">
                Contact
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
            </div>

            <h1 className="text-3xl font-bold text-vwa-dark sm:text-4xl lg:text-5xl">
              Une question, une idée,
              <span className="mt-2 block text-vwa-primary/70">
                une envie de projet ?
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-vwa-dark/70 sm:text-base">
              Écrivez-nous pour toute demande d’information, un partenariat, une
              proposition d’atelier ou simplement pour entrer en contact avec
              l’équipe de Vwa Kiltirèl. Nous prêtons attention à tous les
              messages.
            </p>
          </div>
        </SectionWrapper>

        {/* ==================== STATS RAPIDES ==================== */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-vwa-dark/8 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Clock className="h-4 w-4 text-vwa-accent" />
            <span className="text-sm font-medium text-vwa-dark">
              Réponse sous 48h jours ouvrés
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-vwa-dark/8 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Heart className="h-4 w-4 text-vwa-accent" />
            <span className="text-sm font-medium text-vwa-dark">
              Équipe à l'écoute
            </span>
          </div>
        </div>

        {/* ==================== GRILLE PRINCIPALE ==================== */}
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* COLONNE GAUCHE - FORMULAIRE */}
          <SectionWrapper delay={0.1}>
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-vwa-accent/70">
                Envoyer un message
              </h2>

              <div className="rounded-xl border border-vwa-accent/20 bg-vwa-accent/5 px-4 py-3 text-xs text-vwa-dark/70">
                Ce formulaire envoie votre message à l’équipe de Vwa Kiltirèl.
                Une réponse vous sera apportée par e-mail dès que possible.
              </div>

              <ContactForm />
            </div>
          </SectionWrapper>

          {/* COLONNE DROITE - INFOS */}
          <SectionWrapper delay={0.15}>
            <div className="lg:mt-[150px] space-y-8">
              {/* Ce que vous pouvez proposer */}
              <div className="rounded-xl border border-vwa-dark/8 bg-white/90 p-6 shadow-md">
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-vwa-dark">
                  <Sparkles className="h-4 w-4 text-vwa-accent" />
                  Ce que vous pouvez nous proposer
                </h3>
                <ul className="space-y-2 text-sm text-vwa-dark/70">
                  <li className="flex items-start gap-2">
                    <span className="text-vwa-accent">•</span>
                    Un partenariat avec une structure, un lieu ou un événement
                    existant.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-vwa-accent">•</span>
                    Une invitation pour intervenir dans un établissement ou une
                    structure.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-vwa-accent">•</span>
                    Une suggestion pour la programmation ou la vie de
                    l’association.
                  </li>
                </ul>
              </div>

              {/* Esprit Vwa Kiltirèl */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-vwa-dark to-vwa-primary p-6 text-white shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(199,140,59,0.4),transparent_70%)]" />
                <div className="relative">
                  <Heart className="mb-3 h-6 w-6 text-vwa-accent" />
                  <h3 className="mb-2 font-bold">Esprit Vwa Kiltirèl</h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    Une association ancrée à Tours, tournée vers les cultures
                    créoles, afro & afro-descendantes et caribéennes, avec une volonté
                    : créer des espaces chaleureux, exigeants et joyeux.
                  </p>
                  <p className="mt-3 text-sm text-white/70">
                    Votre message contribue à construire les prochains chapitres
                    de cette aventure.
                  </p>
                </div>
              </div>

              {/* RGPD */}
              <div className="space-y-2 text-xs text-vwa-dark/50">
                <p>
                  Pour toute question liée à vos données personnelles,
                  écrivez-nous à{" "}
                  <a
                    href="mailto:vwakiltirel.asso@gmail.com"
                    className="underline hover:text-vwa-primary"
                  >
                    vwakiltirel.asso@gmail.com
                  </a>
                  .
                </p>
                <Link
                  href="/rgpd"
                  className="inline-block underline hover:text-vwa-primary"
                >
                  En savoir plus sur vos droits
                </Link>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </main>
    </>
  );
}
