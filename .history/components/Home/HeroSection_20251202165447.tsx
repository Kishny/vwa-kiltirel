import Link from "next/link";
import Button from "@/components/ui/button";

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
                    <button className="bg-vwa-terracotta text-white" >
                        Voir les événements
                    </button>
                </Link>

                <Link href="/devenir-membre">
                    <button className="border border-vwa-accent text-vwa-accent ...">
                        Devenir membre
                    </button>
                </Link>
            </div>
        </section>
    );
}


