"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  CalendarDays,
  Images,
  Newspaper,
  Users,
  Mail,
  MapPin,
  CircleHelp,
} from "lucide-react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  {
    label: "Accueil",
    href: "/",
    icon: Sparkles,
    description: "Retour à l’univers Vwa Kiltirèl",
  },
  {
    label: "L'association",
    href: "/association",
    icon: Users,
    description: "Notre histoire, nos valeurs, notre vision",
  },
  {
    label: "Événements",
    href: "/evenements",
    icon: CalendarDays,
    description: "Les prochains rendez-vous culturels",
  },
  {
    label: "Médiathèque",
    href: "/mediatheque",
    icon: Images,
    description: "Souvenirs, moments forts et archives",
  },
  {
    label: "Actualités",
    href: "/actualites",
    icon: Newspaper,
    description: "Les dernières nouvelles de l’association",
  },
  {
    label: "FAQ / Aide",
    href: "/aide",
    icon: CircleHelp,
    description: "Besoin d’un renseignement ?",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-vwa-dark/55 backdrop-blur-md md:hidden"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[95] flex h-[100dvh] w-full max-w-[92vw] flex-col overflow-hidden rounded-l-[2rem] border-l border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,238,228,0.96))] text-vwa-dark shadow-[-18px_0_50px_rgba(0,0,0,0.14)] backdrop-blur-2xl md:hidden"
          >
            {/* Halo */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-vwa-accent/15 blur-3xl" />
              <div className="absolute left-0 top-1/3 h-32 w-32 rounded-full bg-vwa-primary/12 blur-3xl" />
              <div className="absolute bottom-0 right-1/3 h-28 w-28 rounded-full bg-vwa-blueSoft/10 blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-vwa-dark/8 px-5 pb-4 pt-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl bg-white/70 ring-1 ring-white/50">
                  <Image
                    src="/logo-filigrane.webp"
                    alt="Logo Vwa Kiltirèl"
                    fill
                    sizes="48px"
                    className="object-contain p-1.5"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-vwa-accent/80">
                    Navigation
                  </p>
                  <p className="truncate text-sm font-semibold text-vwa-dark">
                    Vwa Kiltirèl
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-vwa-dark/10 bg-white/70 text-vwa-dark/70 shadow-sm transition hover:bg-white hover:text-vwa-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Intro */}
            <div className="relative z-10 border-b border-vwa-dark/8 px-5 py-4">
              <div className="rounded-[1.5rem] bg-white/70 p-4 shadow-[0_10px_30px_rgba(28,22,18,0.06)] ring-1 ring-white/60">
                <p className="text-sm leading-relaxed text-vwa-dark/72">
                  Explorez les événements, l’univers visuel et la vie de
                  l’association dans une navigation plus fluide, plus chaleureuse
                  et pensée pour le mobile.
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4">
              <nav aria-label="Menu mobile" className="space-y-2">
                {navItems.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 18 }}
                      transition={{ delay: 0.04 * index, duration: 0.28 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-[1.35rem] px-3 py-3.5 transition-all duration-300 ${
                          active
                            ? "bg-gradient-to-r from-vwa-primary to-vwa-dark text-white shadow-[0_14px_30px_rgba(28,22,18,0.18)]"
                            : "bg-white/65 text-vwa-dark hover:bg-white hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${
                            active
                              ? "bg-white/15 text-white"
                              : "bg-vwa-dark/5 text-vwa-primary"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {item.label}
                          </p>
                          <p
                            className={`truncate text-[11px] ${
                              active ? "text-white/75" : "text-vwa-dark/55"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>

                        <ChevronRight
                          className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${
                            active
                              ? "text-white/80"
                              : "text-vwa-dark/35 group-hover:translate-x-0.5 group-hover:text-vwa-primary"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA blocks */}
              <div className="mt-5 space-y-3">
                <Link
                  href="/devenir-membre"
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 rounded-[1.45rem] bg-gradient-to-r from-vwa-primary to-vwa-dark px-4 py-4 text-white shadow-[0_16px_35px_rgba(28,22,18,0.18)] transition hover:shadow-[0_20px_45px_rgba(28,22,18,0.24)]"
                >
                  <div>
                    <p className="text-sm font-semibold">Devenir membre</p>
                    <p className="text-[11px] text-white/75">
                      Rejoindre l’aventure Vwa Kiltirèl
                    </p>
                  </div>
                  <Users className="h-5 w-5 flex-shrink-0" />
                </Link>

                <Link
                  href="/don"
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 rounded-[1.45rem] border border-vwa-accent/25 bg-vwa-accent/8 px-4 py-4 text-vwa-dark transition hover:border-vwa-accent/40 hover:bg-vwa-accent/12"
                >
                  <div>
                    <p className="text-sm font-semibold">Faire un don</p>
                    <p className="text-[11px] text-vwa-dark/60">
                      Soutenir nos actions culturelles
                    </p>
                  </div>
                  <HeartHandshake className="h-5 w-5 flex-shrink-0 text-vwa-accent" />
                </Link>
              </div>

              {/* Contact block */}
              <div className="mt-5 rounded-[1.5rem] border border-vwa-dark/8 bg-white/60 p-4 backdrop-blur-sm">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-vwa-accent/80">
                  Contact
                </p>

                <div className="space-y-3 text-sm">
                  <a
                    href="mailto:vwakiltirel.asso@gmail.com"
                    className="flex items-start gap-3 text-vwa-dark/75 transition hover:text-vwa-primary"
                  >
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent/70" />
                    <span className="min-w-0 break-words">
                      vwakiltirel.asso@gmail.com
                    </span>
                  </a>

                  <div className="flex items-start gap-3 text-vwa-dark/75">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent/70" />
                    <span className="min-w-0 break-words">
                      55 Rue Daniel Mayer, 37100 Tours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 border-t border-vwa-dark/8 px-5 py-4">
              <p className="text-center text-[11px] text-vwa-dark/50">
                Une navigation mobile pensée pour une expérience plus douce,
                plus claire et plus vivante.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}