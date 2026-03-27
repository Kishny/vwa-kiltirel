"use client";

import Link from "next/link";
import { CalendarDays, HeartHandshake, Users, Menu } from "lucide-react";

const items = [
    {
        href: "/evenements",
        label: "Événements",
        icon: CalendarDays,
    },
    {
        href: "/don",
        label: "Don",
        icon: HeartHandshake,
    },
    {
        href: "/devenir-membre",
        label: "Membres",
        icon: Users,
    },
    {
        href: "/",
        label: "Menu",
        icon: Menu,
    },
];

export default function MobileBottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden">
            <div className="max-w-xl mx-auto flex justify-around py-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href + item.label}
                            href={item.href}
                            className="flex flex-col items-center gap-0.5 text-[11px]"
                        >
                            <Icon size={18} className="mb-0.5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
