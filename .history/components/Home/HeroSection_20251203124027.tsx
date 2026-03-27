"use client";

import Button from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section className="text-center pt-6 pb-4">
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

            <div className="flex items-center gap-4 mt-6">
                {/* Bouton 1 : Voir les actualités */}
                <Link
                    href="/actualites"
                    className="
      px-8 py-3 rounded-full text-white font-medium transition-all 
      bg-vwa-terracotta shadow-md hover:shadow-lg hover:bg-vwa-terracotta/90 
      hover:scale-[1.03] active:scale-95
    "
                >
                    Voir les actualités
                </Link>

                {/* Bouton 2 : Devenir membre */}
                <Link
                    href="/devenir-membre"
                    className="
      px-8 py-3 rounded-full bg-white text-vwa-dark font-medium 
      border border-vwa-dark/10 shadow-sm hover:bg-vwa-background 
      transition-all hover:shadow-md hover:scale-[1.03] active:scale-95
    "
                >
                    Devenir membre
                </Link>
            </div>

        </section>
    );
}



