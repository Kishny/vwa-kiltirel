"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/association", label: "L'association" },
    { href: "/evenements", label: "Événements" },
    { href: "/mediatheque", label: "Médiathèque" },
    { href: "/actualites", label: "Actualités" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur border-b border-slate-200">
            <div className="max-w-4xl mx-auto w-full px-4 py-3 flex items-center justify-between gap-4">
                {/* Logo + nom */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo/logo.png"
                        alt="Logo Vwa Kiltirèl"
                        width={32}
                        height={32}
                        className="h-12 w-12 rounded-full object-cover"
                        priority
                    />
                    <span className="font-semibold text-sm sm:text-base">
                        Vwa Kiltirèl
                    </span>
                </Link>

                {/* NAV DESKTOP */}
                <nav className="hidden md:flex items-center justify-center gap-6 text-sm flex-1">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors ${isActive
                                    ? "text-slate-900 font-medium"
                                    : "text-slate-500 hover:text-slate-900"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA + burger */}
                <div className="flex items-center gap-2">
                    {/* CTA desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/don"
                            className="text-xs px-3 py-1.5 rounded-full border border-slate-300 text-slate-800 hover:border-slate-400 transition"
                        >
                            Faire un don
                        </Link>
                        <Link
                            href="/devenir-membre"
                            className="text-xs px-3 py-1.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
                        >
                            Devenir membre
                        </Link>
                    </div>

                    {/* Burger mobile */}
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Ouvrir le menu"
                        className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* MENU MOBILE PLEIN ÉCRAN */}
            {open && (
                <nav className="md:hidden border-t border-slate-200 bg-slate-50/95 backdrop-blur">
                    <ul className="flex flex-col px-4 py-3 gap-1 text-sm">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="block w-full py-2.5"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        <li className="mt-2 pt-2 border-t border-slate-200 flex gap-2">
                            <Link
                                href="/don"
                                className="flex-1 text-xs px-3 py-2 rounded-full border border-slate-300 text-center"
                                onClick={() => setOpen(false)}
                            >
                                Faire un don
                            </Link>
                            <Link
                                href="/devenir-membre"
                                className="flex-1 text-xs px-3 py-2 rounded-full bg-slate-900 text-white text-center"
                                onClick={() => setOpen(false)}
                            >
                                Devenir membre
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
