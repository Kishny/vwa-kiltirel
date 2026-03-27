"use client";

import Link from "next/link";
import { ArrowRightIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
    return (
        <section className="text-center pt-6 pb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-vwa-dark/60">
                Association culturelle & événementielle
            </p>

            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                🧡 Vwa Kiltirèl
            </h1>

            <p className="mt-3 text-sm sm:text-base text-vwa-dark/75 max-w-xl mx-auto">
                Des événements, ateliers et moments de partage pour faire vibrer les
                cultures, les familles et le vivre ensemble à Tours.
            </p>

            {/* CTA zone */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                {/* Bouton 1 : Voir les actualités */}
                <Link
                    href="/actualites"
                    className="
            group relative inline-flex items-center justify-center
            rounded-full px-8 py-3 text-sm font-medium text-white
            bg-gradient-to-r from-vwa-terracotta to-vwa-accent
            shadow-md hover:shadow-[0_16px_32px_rgba(139,63,33,0.35)]
            transition-all duration-200
            ring-1 ring-vwa-terracotta/40 hover:ring-vwa-terracotta/70
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70
            active:scale-95
          "
                >
                    {/* halo doux derrière le bouton */}
                    <span
                        className="
              pointer-events-none absolute inset-0 rounded-full
              opacity-0 group-hover:opacity-100
              bg-vwa-terracotta/20 blur-xl transition-opacity duration-200
            "
                    />

                    <span className="relative z-10 flex items-center gap-2">
                        <span>Voir les actualités</span>
                        <ArrowRightIcon
                            className="
                h-4 w-4
                transition-transform duration-200
                group-hover:translate-x-1 group-active:translate-x-0.5
              "
                        />
                    </span>
                </Link>

                {/* Bouton 2 : Devenir membre */}
                <Link
                    href="/devenir-membre"
                    className="
            group relative inline-flex items-center justify-center
            rounded-full px-8 py-3 text-sm font-medium
            bg-white text-vwa-dark
            border border-vwa-dark/10
            shadow-sm hover:shadow-md
            transition-all duration-200
            hover:bg-vwa-background/70
            ring-1 ring-transparent hover:ring-vwa-primary/25
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vwa-primary/60
            active:scale-95
          "
                >
                    {/* halo plus léger */}
                    <span
                        className="
              pointer-events-none absolute inset-0 rounded-full
              opacity-0 group-hover:opacity-100
              bg-vwa-primary/10 blur-lg transition-opacity duration-200
            "
                    />

                    <span className="relative z-10 flex items-center gap-2">
                        <UserPlusIcon
                            className="
                h-4 w-4
                transition-transform duration-200
                group-hover:-translate-y-0.5 group-active:-translate-y-0
              "
                        />
                        <span>Devenir membre</span>
                    </span>
                </Link>
            </div>
        </section>
    );
}




