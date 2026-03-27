import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center text-center gap-5 mt-2">
            <p className="text-[12px] text-vwa-dark/80">
                Association culturelle & événementielle
            </p>

            <h1 className="text-3xl font-extrabold text-vwa-dark flex items-center gap-2">
                <span className="text-3xl">🧡</span>
                Vwa Kiltirèl
            </h1>

            <p className="text-sm text-vwa-dark/75 max-w-xs leading-relaxed">
                Des événements, ateliers et moments de partage pour faire vibrer les
                cultures, les familles et le vivre ensemble à Tours.
            </p>

            <div className="flex gap-3 mt-1">
                <Link href="/evenements">
                    <button className="px-5 py-2.5 rounded-full bg-vwa-primary text-white text-sm font-medium shadow-sm hover:bg-vwa-dark transition">
                        Voir les événements
                    </button>
                </Link>

                <Link href="/devenir-membre">
                    <button className="px-5 py-2.5 rounded-full border border-vwa-accent text-vwa-accent text-sm font-medium hover:bg-vwa-accent hover:text-white transition">
                        Devenir membre
                    </button>
                </Link>
            </div>
        </section>
    );
}

