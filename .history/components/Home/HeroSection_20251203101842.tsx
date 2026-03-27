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

            <div className="mt-5 flex items-center justify-center gap-3">
                <Button variant="primary" size="lg">
                    Voir les événements
                </Button>
                <Button variant="secondary" size="lg">
                    Devenir membre
                </Button>
            </div>
        </section>
    );
}



