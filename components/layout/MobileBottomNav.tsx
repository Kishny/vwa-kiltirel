"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    CalendarDays,
    Images,
    Newspaper,
    User2,
} from "lucide-react";

const items = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/evenements", label: "Agenda", icon: CalendarDays },
    { href: "/mediatheque", label: "Média", icon: Images },
    { href: "/actualites", label: "Actus", icon: Newspaper },
    { href: "/devenir-membre", label: "Profil", icon: User2 },
];

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-vwa-background/95 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-0.5 text-[11px] ${isActive ? "text-vwa-primary" : "text-vwa-dark/60"
                                }`}
                        >
                            <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${isActive
                                    ? "bg-vwa-primary/10 shadow-soft-card"
                                    : "bg-transparent"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                            </span>
                            <span className="leading-none">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
