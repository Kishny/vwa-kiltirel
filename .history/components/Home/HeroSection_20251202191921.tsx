import Link from "next/link";
import Button from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center text-center gap-5 mt-4">
            <p className="text-[12px] text-vwa-dark/70">
                Association culturelle & événementielle
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-vwa-dark flex items-center gap-2">
                <span className="text-3xl sm:text-4xl">🧡</span>
                Vwa Kiltirèl
            </h1>

            <p className="text-sm sm:text-base text-vwa-dark/75 max-w-md leading-relaxed">
                Des événements, ateliers et moments de partage pour faire vibrer les
                cultures, les familles et le vivre ensemble à Tours.
            </p>

            <div className="flex gap-3 mt-1">
                <Link href="/evenements">
                    <Button variant="primary" size="md">
                        Voir les événements
                    </Button>
                </Link>

                <Link href="/devenir-membre">
                    <Button variant="ghost" size="md">
                        Devenir membre
                    </Button>
                </Link>
            </div>
        </section>
    );
}



