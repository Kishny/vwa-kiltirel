"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/association", label: "L'association" },
    { href: "/evenements", label: "Événements" },
    { href: "/mediatheque", label: "Médiathèque" },
    { href: "/actualites", label: "Actualités" },
    { href: "/contact", label: "Contact" },
    { href: "/don", label: "Faire un don" },
    { href: "/devenir-membre", label: "Devenir membre" },
];


export default function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-black/5 bg-vwa-background/90 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:h-20 gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden shadow-md bg-white">
                        <Image
                            src="/logo/logo.png"
                            alt="Vwa Kiltirèl"
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 48px"
                        />

                    </div>
                    <div className="leading-tight hidden xs:block">
                        <p className="text-[11px] sm:text-xs text-vwa-dark/70">
                            Association culturelle & événementielle
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-vwa-dark">
                            Vwa Kiltirèl
                        </p>
                    </div>
                </Link>

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-[13px]">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative rounded-pill px-3 py-1.5 transition-colors ${isActive
                                    ? "text-vwa-dark font-semibold"
                                    : "text-vwa-dark/70 hover:text-vwa-dark"
                                    }`}
                            >
                                <span
                                    className={`absolute inset-0 -z-10 rounded-pill transition-opacity ${isActive
                                        ? "bg-white/70 shadow-soft-card opacity-100"
                                        : "opacity-0 group-hover:opacity-100"
                                        }`}
                                />
                                <span className="relative">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/don"
                        className="hidden sm:inline-flex items-center justify-center rounded-pill border border-vwa-dark/15 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-vwa-dark hover:bg-vwa-accent/5 hover:border-vwa-accent/40 transition shadow-sm"
                    >
                        Faire un don
                    </Link>
                    <Link
                        href="/devenir-membre"
                        className="inline-flex items-center justify-center rounded-pill bg-vwa-accent px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-vwa-accent/90 hover:shadow-md transition"
                    >
                        Devenir membre
                    </Link>
                </div>
            </div>
        </header>
    );
}

