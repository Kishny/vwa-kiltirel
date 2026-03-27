// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
    return (
        <footer className="relative mt-16 border-t border-vwa-background/40 bg-vwa-dark text-vwa-background pt-12 pb-8">
            {/* Halo */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-vwa-primary/20 blur-3xl opacity-80" />
                <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-vwa-accent/25 blur-3xl opacity-80" />
            </div>

            <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
                {/* COLUMN 1 — Logo & présentation */}
                <div className="space-y-3">
                    <div className="relative w-20 h-20">
                        <Image
                            src="/logo-filigrane.png"
                            alt="Vwa Kiltirèl Logo"
                            fill
                            className="object-contain opacity-90"
                        />
                    </div>

                    <p className="text-sm text-vwa-background/90 leading-relaxed max-w-xs">
                        Vwa Kiltirèl est une association engagée dans la transmission,
                        l’expression et la valorisation des cultures afro-descendantes,
                        créoles et caribéennes à Tours.
                    </p>
                </div>

                {/* COLUMN 2 — Navigation */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em]">
                        Navigation
                    </h3>
                    <ul className="space-y-1.5 text-sm">
                        <li>
                            <Link
                                href="/evenements"
                                className="hover:text-vwa-accent transition-colors"
                            >
                                Événements
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/devenir-membre"
                                className="hover:text-vwa-accent transition-colors"
                            >
                                Devenir membre
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/don"
                                className="hover:text-vwa-accent transition-colors"
                            >
                                Faire un don
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mediatheque"
                                className="hover:text-vwa-accent transition-colors"
                            >
                                Médiathèque
                            </Link>
                        </li>

                        {/* ✅ AJOUT AIDE */}
                        <li>
                            <Link
                                href="/aide"
                                className="hover:text-vwa-accent transition-colors"
                            >
                                FAQ / Aide
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* COLUMN 3 — Informations */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em]">
                        Informations
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <MapPinIcon className="w-4 h-4 mt-0.5 text-vwa-background/70" />
                            <span>55 Rue Daniel Mayer, 37100 Tours</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <EnvelopeIcon className="w-4 h-4 mt-0.5 text-vwa-background/70" />
                            <span>vwakiltirel.asso@gmail.com</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <PhoneIcon className="w-4 h-4 mt-0.5 text-vwa-background/70" />
                            <span>06 00 00 00 00</span>
                        </li>
                    </ul>
                </div>

                {/* COLUMN 4 — Légal & réseaux */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em]">
                        Légal
                    </h3>
                    <ul className="space-y-1.5 text-sm">
                        <li>
                            <Link
                                href="/mentions-legales"
                                className="hover:text-vwa-accent transition-colors"
                            >
                                Mentions légales
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/rgpd"
                                className="hover:text-vwa-accent transition-colors"
                            >
                                Données personnelles / RGPD
                            </Link>
                        </li>
                    </ul>

                    <div className="pt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2">
                            Suivez-nous
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="hover:opacity-75 transition-opacity inline-block"
                            >
                                <Image
                                    src="/icons/instagram.png"
                                    width={22}
                                    height={22}
                                    alt="Instagram"
                                />
                            </a>
                            <a
                                href="#"
                                className="hover:opacity-75 transition-opacity inline-block"
                            >
                                <Image
                                    src="/icons/facebook.png"
                                    width={22}
                                    height={22}
                                    alt="Facebook"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom line */}
            <div className="mt-12 border-t border-vwa-background/20 pt-4 text-center text-[11px] text-vwa-background/60">
                © {new Date().getFullYear()} Vwa Kiltirèl — Tous droits réservés.
            </div>
        </footer>
    );
}