"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/button";

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/association", label: "L'association" },
    { href: "/evenements", label: "Événements" },
    { href: "/mediatheque", label: "Médiathèque" },
    { href: "/actualites", label: "Actualités" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-vwa-accent/20 bg-vwa-background/95 backdrop-blur">
            <div className="max-w-xl mx-auto w-full px-4 py-3 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo/logo.png"
                        alt="Logo Vwa Kiltirèl"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                        priority
                    />
                    <span className="font-semibold text-sm text-vwa-dark">
                        Vwa Kiltirèl
                    </span>
                </Link>

                {/* NAV DESKTOP */}
                <nav className="hidden md:flex flex-1 items-center justify-center gap-5 text-sm">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    isActive
                                        ? "text-vwa-dark font-medium"
                                        : "text-vwa-dark/60 hover:text-vwa-dark"
                                }
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA + burger */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/don">
                            <Button variant="ghost" size="sm">
                                Faire un don
                            </Button>
                        </Link>
                        <Link href="/devenir-membre">
                            <Button variant="accent" size="sm">
                                Devenir membre
                            </Button>
                        </Link>
                    </div>

                    {/* Burger mobile */}
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Ouvrir le menu"
                        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-vwa-dark/20 bg-vwa-background shadow-sm"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* MENU MOBILE */}
            {open && (
                <nav className="md:hidden border-t border-vwa-accent/20 bg-vwa-background/98 backdrop-blur">
                    <ul className="flex flex-col px-4 py-3 gap-1 text-sm">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="block w-full py-2 text-vwa-dark/80"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="mt-2 pt-2 border-t border-vwa-accent/20 flex gap-2">
                            <Link href="/don" className="flex-1" onClick={() => setOpen(false)}>
                                <Button variant="ghost" size="sm" className="w-full">
                                    Faire un don
                                </Button>
                            </Link>
                            <Link
                                href="/devenir-membre"
                                className="flex-1"
                                onClick={() => setOpen(false)}
                            >
                                <Button variant="accent" size="sm" className="w-full">
                                    Devenir membre
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

