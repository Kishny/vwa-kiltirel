// components/actualites/ShareBar.tsx
"use client";

import { useMemo, useState } from "react";

type Props = {
    title: string;
};

export default function ShareBar({ title }: Props) {
    const [copied, setCopied] = useState(false);

    const url = useMemo(() => {
        if (typeof window === "undefined") return "";
        return window.location.href;
    }, []);

    const whatsappHref = useMemo(() => {
        const text = encodeURIComponent(`${title}\n${url}`);
        return `https://wa.me/?text=${text}`;
    }, [title, url]);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
        } catch {
            // fallback ultra simple
            prompt("Copie le lien :", url);
        }
    }

    function shareInstagram() {
        // Instagram web n’accepte pas un “share url” direct fiable.
        // On fait donc : copier + ouvrir Instagram.
        copyLink();
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-vwa-dark text-vwa-background px-4 py-2 text-xs font-semibold shadow-[0_16px_45px_rgba(28,22,18,0.55)] hover:-translate-y-[1px] transition"
                title="Partager sur WhatsApp"
            >
                WhatsApp <span aria-hidden>↗</span>
            </a>

            <button
                type="button"
                onClick={shareInstagram}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-vwa-background/80 px-4 py-2 text-xs font-semibold text-vwa-dark/80 shadow-[0_12px_36px_rgba(28,22,18,0.12)] hover:-translate-y-[1px] hover:border-vwa-accent/60 transition"
                title="Copier le lien puis ouvrir Instagram"
            >
                Instagram <span aria-hidden>↗</span>
            </button>

            <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-vwa-background/80 px-4 py-2 text-xs font-semibold text-vwa-dark/80 shadow-[0_12px_36px_rgba(28,22,18,0.12)] hover:-translate-y-[1px] hover:border-vwa-accent/60 transition"
                title="Copier le lien"
            >
                {copied ? "Lien copié ✅" : "Copier le lien"}
            </button>
        </div>
    );
}