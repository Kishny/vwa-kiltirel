"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, HeartHandshake, Users, Info } from "lucide-react";

const items = [
    { href: "/evenements", label: "Événements", icon: CalendarDays },
    { href: "/don", label: "Don", icon: HeartHandshake },
    { href: "/devenir-membre", label: "Membres", icon: Users },
    { href: "/association", label: "À propos", icon: Info },
];

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-vwa-accent/20 bg-vwa-background/95 backdrop-blur md:hidden">
            <div className="max-w-xl mx-auto px-3 py-2 flex items-center justify-between gap-1">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                    return (
                        <Link key={item.href} href={item.href} className="flex-1">
                            <div
                                className={`flex flex-col items-center justify-center gap-0.5 text-[11px] px-3 py-1.5 rounded-full transition ${isActive
                                    ? "bg-vwa-primary text-white shadow-sm"
                                    : "text-vwa-dark/60"
                                    }`}
                            >
                                <Icon size={17} />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
