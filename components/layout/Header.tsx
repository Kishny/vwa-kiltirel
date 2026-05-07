"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, SparklesIcon } from "@heroicons/react/24/outline";
import MobileMenu from "@/components/layout/MobileMenu";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-black/5 bg-vwa-background/88 shadow-[0_10px_30px_rgba(28,22,18,0.08)] backdrop-blur-xl"
            : "border-b border-black/5 bg-vwa-background/82 backdrop-blur-lg"
        }`}
      >
        <div className="relative mx-auto max-w-5xl px-4">
          {/* glow discret */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
            <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-vwa-primary/8 blur-2xl" />
            <div className="absolute right-10 top-0 h-16 w-16 rounded-full bg-vwa-accent/10 blur-2xl" />
          </div>

          <div className="relative flex h-16 items-center justify-between gap-4 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-3"
              aria-label="Retour à l'accueil"
            >
              <motion.div
                whileHover={{ rotate: -4, scale: 1.03 }}
                transition={{ duration: 0.22 }}
                className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-[0_8px_18px_rgba(28,22,18,0.10)] ring-1 ring-black/5 sm:h-12 sm:w-12"
              >
                <Image
                  src="/logo/logo.png"
                  alt="Vwa Kiltirèl"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 48px"
                />
              </motion.div>

              <div className="hidden min-w-0 leading-tight xs:block">
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06, duration: 0.32 }}
                  className="truncate text-[11px] text-vwa-dark/65 sm:text-xs"
                >
                  Association culturelle & événementielle
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.34 }}
                  className="truncate text-sm font-semibold text-vwa-dark sm:text-base"
                >
                  Vwa Kiltirèl
                </motion.p>
              </div>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden items-center gap-2 text-[13px] md:flex lg:gap-3">
              {navLinks.map((link, index) => {
                const isActive = isActivePath(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.28 }}
                  >
                    <Link
                      href={link.href}
                      className={`group relative inline-flex items-center rounded-full px-3 py-2 transition-all duration-300 ${
                        isActive
                          ? "font-semibold text-vwa-dark"
                          : "text-vwa-dark/72 hover:text-vwa-dark"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="header-active-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-white/78 shadow-[0_8px_18px_rgba(28,22,18,0.08)] ring-1 ring-black/5"
                        />
                      )}

                      {!isActive && (
                        <span className="absolute inset-0 rounded-full bg-white/0 opacity-0 transition-all duration-300 group-hover:bg-white/55 group-hover:opacity-100" />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* bouton don desktop */}
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:block"
              >
                <Link
                  href="/don"
                  className="inline-flex items-center justify-center rounded-full border border-vwa-dark/12 bg-white/65 px-3.5 py-2 text-xs font-medium text-vwa-dark shadow-sm transition-all duration-300 hover:border-vwa-accent/35 hover:bg-vwa-accent/5 hover:text-vwa-dark"
                >
                  Faire un don
                </Link>
              </motion.div>

              {/* bouton membre desktop */}
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:block"
              >
                <Link
                  href="/devenir-membre"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-vwa-accent to-vwa-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(199,140,59,0.22)] transition-all duration-300 hover:shadow-[0_14px_28px_rgba(199,140,59,0.28)]"
                >
                  <SparklesIcon className="h-4 w-4" />
                  Devenir membre
                </Link>
              </motion.div>

              {/* Burger mobile premium */}
              <motion.button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={isMobileMenuOpen}
                whileTap={{ scale: 0.94 }}
                className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-vwa-dark/10 bg-white/72 text-vwa-dark/80 shadow-[0_8px_20px_rgba(28,22,18,0.08)] transition-all duration-300 hover:border-vwa-accent/30 hover:bg-white hover:text-vwa-primary md:hidden"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" />
                <Bars3Icon className="relative z-10 h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* petite barre de lecture visuelle sous header si menu fermé */}
          <AnimatePresence>
            {!isMobileMenuOpen && isScrolled && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.85 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.85 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 left-1/2 h-px w-[90%] -translate-x-1/2 bg-gradient-to-r from-transparent via-vwa-accent/18 to-transparent"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
