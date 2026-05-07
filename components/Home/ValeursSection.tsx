"use client";

import Link from "next/link";
import { Sparkles, ArrowUpRight, HeartHandshake, Palette, Users } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Transmission vivante",
    text: "Des cultures qui se racontent, se dansent et se partagent.",
  },
  {
    icon: Palette,
    title: "Création culturelle",
    text: "Des événements, des artistes et des projets qui font vibrer le territoire.",
  },
  {
    icon: HeartHandshake,
    title: "Liens humains",
    text: "Des rencontres intergénérationnelles et interculturelles ancrées dans le réel.",
  },
];

export default function ValeursSection() {
  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-vwa-dark/8 bg-white/80 px-5 py-8 shadow-[0_22px_65px_-30px_rgba(59,38,29,0.35)] backdrop-blur-sm sm:px-8 sm:py-10">
        {/* halos */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-vwa-accent/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-vwa-primary/10 blur-3xl" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.95fr)] lg:items-center">
          {/* Bloc éditorial */}
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-vwa-dark/60">
                <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                L’esprit Vwa Kiltirèl
              </p>

              <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-vwa-dark sm:text-3xl">
                Vwa Kiltirèl fait vivre les cultures, les mémoires et les rencontres.
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-vwa-dark/75 sm:text-[15px]">
                À Tours, l’association crée des espaces où les cultures afro-descendantes,
                créoles et caribéennes se transmettent, se célèbrent et se partagent à
                travers l’art, les événements et les liens humains.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-vwa-background px-3 py-1 text-[11px] font-medium text-vwa-dark/75">
                Cultures afro-descendantes
              </span>
              <span className="rounded-full bg-vwa-background px-3 py-1 text-[11px] font-medium text-vwa-dark/75">
                Transmission
              </span>
              <span className="rounded-full bg-vwa-background px-3 py-1 text-[11px] font-medium text-vwa-dark/75">
                Création
              </span>
              <span className="rounded-full bg-vwa-background px-3 py-1 text-[11px] font-medium text-vwa-dark/75">
                Cohésion sociale
              </span>
            </div>

            <div className="pt-1">
              <Link
                href="/association"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-20px_rgba(29,91,107,0.65)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_24px_60px_-22px_rgba(29,91,107,0.78)]"
              >
                Découvrir l’association
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Bloc visuel / piliers */}
          <div className="grid gap-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.title}
                  className="rounded-3xl border border-vwa-dark/8 bg-white/85 p-4 shadow-[0_16px_35px_-24px_rgba(59,38,29,0.35)] transition-all duration-300 hover:border-vwa-accent/25 hover:shadow-[0_22px_45px_-24px_rgba(199,140,59,0.35)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-vwa-background text-vwa-dark shadow-[0_8px_18px_-10px_rgba(0,0,0,0.2)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-vwa-dark">
                        {pillar.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-vwa-dark/72">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="rounded-3xl border border-dashed border-vwa-accent/25 bg-vwa-accent/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-vwa-accent shadow-[0_8px_18px_-10px_rgba(199,140,59,0.25)]">
                  <Users className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-vwa-dark">
                    Une association ancrée à Tours
                  </h3>
                  <p className="text-xs leading-relaxed text-vwa-dark/72">
                    Une présence locale forte, pensée pour relier les générations,
                    les quartiers, les artistes et les publics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
