import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center text-center gap-4 mt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vwa-terracotta/10 text-[11px] text-vwa-terracotta font-medium">
                Association culturelle & événementielle
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-vwa-dark leading-tight">
                    🧡 Vwa Kiltirèl
                </h1>
                <p className="text-sm text-vwa-dark/75 max-w-sm">
                    Des événements, ateliers et moments de partage pour faire vibrer les
                    cultures, les familles et le vivre ensemble à Tours.
                </p>
            </div>

            <div className="flex gap-3 mt-1">
                <Link
                    href="/evenements"
                    className="px-5 py-2.5 rounded-full bg-vwa-primary text-white text-sm font-medium shadow-sm hover:bg-vwa-dark transition"
                >
                    Voir les événements
                </Link>

                <Link
                    href="/devenir-membre"
                    className="px-5 py-2.5 rounded-full border border-vwa-accent text-vwa-accent text-sm font-medium hover:bg-vwa-accent hover:text-white transition"
                >
                    Devenir membre
                </Link>
            </div>
        </section>
    );
}
