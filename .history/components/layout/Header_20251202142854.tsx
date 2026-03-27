"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";


const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/association", label: "L'association" },
    { href: "/evenements", label: "Événements" },
    { href: "/mediatheque", label: "Médiathèque" },
    { href: "/actualites", label: "Actualités" },
    { href: "/devenir-membre", label: "Devenir membre" },
    { href: "/don", label: "Faire un don" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur border-b border-slate-200">
            <div className="max-w-xl mx-auto w-full px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* Remplace par ton logo plus tard */}
                    <div className="h-8 w-8 rounded-full bg-slate-900 text-slate-50 flex items-center justify-center text-xs font-semibold">
                        VK
                    </div>
                    <span className="font-semibold text-sm">Vwa Kiltirèl</span>
                </Link>

                {/* Actions à droite */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/devenir-membre"
                        className="hidden sm:inline-flex text-xs px-3 py-1.5 rounded-full bg-slate-900 text-white font-medium"
                    >
                        Devenir membre
                    </Link>

                    {/* Bouton menu mobile */}
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Ouvrir le menu"
                        className="inline-flex sm:hidden h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Menu mobile plein écran */}
            {open && (
                <nav className="sm:hidden border-t border-slate-200 bg-slate-50">
                    <ul className="flex flex-col px-4 py-3 gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="block w-full py-2.5 text-sm"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
