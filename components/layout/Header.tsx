"use client";

// Import Next.js pour les liens internes
import Link from "next/link";

// Import Next.js pour optimiser l'image du logo
import Image from "next/image";

// Hook Next.js pour connaître la page active
import { usePathname } from "next/navigation";

// Hooks React pour gérer l'état du menu mobile et du scroll
import { useEffect, useState } from "react";

// Framer Motion pour les animations du header, des liens et des boutons
import { AnimatePresence, motion } from "framer-motion";

// Icônes Heroicons utilisées dans le header
import {
  Bars3Icon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

// Menu mobile séparé
import MobileMenu from "@/components/layout/MobileMenu";

// Liens principaux de navigation du site
const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/association", label: "L'association" },
  { href: "/evenements", label: "Événements" },
  { href: "/mediatheque", label: "Médiathèque" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

// Liens vers les réseaux sociaux de l'association
// Affichés uniquement en desktop large pour éviter de surcharger le header
const socialLinks = [
  {
    href: "https://www.instagram.com/vwakiltirel.asso/?hl=fr",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61589580235561",
    label: "Facebook",
    icon: FacebookIcon,
  },
];

export default function Header() {
  // Récupère l'URL actuelle pour savoir quel lien est actif
  const pathname = usePathname();

  // État d'ouverture/fermeture du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // État qui indique si l'utilisateur a scrollé
  const [isScrolled, setIsScrolled] = useState(false);

  // Détecte le scroll pour modifier légèrement l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };

    // Vérification immédiate au chargement
    handleScroll();

    // Écoute du scroll avec option passive pour les performances
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Nettoyage de l'écouteur au démontage du composant
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vérifie si un lien correspond à la page actuelle
  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Header sticky avec animation d'apparition */}
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
        {/* 
          Conteneur principal du header.
          max-w-6xl donne plus d'espace horizontal que max-w-5xl.
          Cela évite que la navigation et les boutons soient trop serrés.
        */}
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          {/* Glow décoratif discret en arrière-plan du header */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
            <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-vwa-primary/8 blur-2xl" />
            <div className="absolute right-10 top-0 h-16 w-16 rounded-full bg-vwa-accent/10 blur-2xl" />
          </div>

          {/* 
            Conteneur principal.
            gap augmenté pour mieux respirer entre logo, navigation et actions.
          */}
          <div className="relative flex h-16 items-center justify-between gap-6 sm:h-20 lg:gap-8">
            {/* Logo + nom de l'association */}
            <Link
              href="/"
              className="group flex min-w-0 shrink-0 items-center gap-3.5"
              aria-label="Retour à l'accueil"
            >
              {/* Logo animé au survol */}
              <motion.div
                whileHover={{ rotate: -4, scale: 1.03 }}
                transition={{ duration: 0.22 }}
                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_8px_18px_rgba(28,22,18,0.10)] ring-1 ring-black/5 sm:h-12 sm:w-12"
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

              {/* Texte à côté du logo */}
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

            {/* 
              Navigation desktop.
              gap augmenté + px des liens augmenté pour un rendu plus aéré.
            */}
            <nav className="hidden flex-1 items-center justify-center gap-2.5 text-[13px] md:flex lg:gap-4">
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
                      className={`group relative inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2.5 transition-all duration-300 lg:px-4 ${
                        isActive
                          ? "font-semibold text-vwa-dark"
                          : "text-vwa-dark/72 hover:text-vwa-dark"
                      }`}
                    >
                      {/* Fond animé du lien actif */}
                      {isActive && (
                        <motion.span
                          layoutId="header-active-pill"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                          className="absolute inset-0 rounded-full bg-white/78 shadow-[0_8px_18px_rgba(28,22,18,0.08)] ring-1 ring-black/5"
                        />
                      )}

                      {/* Fond au survol pour les liens non actifs */}
                      {!isActive && (
                        <span className="absolute inset-0 rounded-full bg-white/0 opacity-0 transition-all duration-300 group-hover:bg-white/55 group-hover:opacity-100" />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* 
              Actions : réseaux sociaux + don + devenir membre + menu mobile.
              shrink-0 évite que les boutons soient comprimés.
            */}
            <div className="flex shrink-0 items-center gap-2.5 lg:gap-3">
              {/* Réseaux sociaux desktop uniquement */}
              <div className="hidden items-center gap-2 lg:flex">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Suivre Vwa Kiltirèl sur ${social.label}`}
                      title={social.label}
                      whileHover={{ y: -1, scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-vwa-dark/10 bg-white/65 text-vwa-dark/70 shadow-sm transition-all duration-300 hover:border-vwa-accent/35 hover:bg-white hover:text-vwa-primary"
                    >
                      {/* Petit reflet décoratif dans le bouton */}
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-80" />

                      {/* Icône du réseau social */}
                      <Icon className="relative z-10 h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Bouton don desktop */}
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:block"
              >
                <Link
                  href="/don"
                  className="inline-flex min-w-[112px] items-center justify-center whitespace-nowrap rounded-full border border-vwa-dark/12 bg-white/70 px-4.5 py-2.5 text-xs font-medium text-vwa-dark shadow-sm transition-all duration-300 hover:border-vwa-accent/35 hover:bg-vwa-accent/5 hover:text-vwa-dark"
                >
                  Faire un don
                </Link>
              </motion.div>

              {/* Bouton devenir membre desktop */}
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:block"
              >
                <Link
                  href="/devenir-membre"
                  className="inline-flex min-w-[150px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-vwa-accent to-vwa-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(199,140,59,0.22)] transition-all duration-300 hover:shadow-[0_14px_28px_rgba(199,140,59,0.28)]"
                >
                  <SparklesIcon className="h-4 w-4 shrink-0" />
                  Devenir membre
                </Link>
              </motion.div>

              {/* Bouton burger mobile premium */}
              <motion.button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={isMobileMenuOpen}
                whileTap={{ scale: 0.94 }}
                className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-vwa-dark/10 bg-white/72 text-vwa-dark/80 shadow-[0_8px_20px_rgba(28,22,18,0.08)] transition-all duration-300 hover:border-vwa-accent/30 hover:bg-white hover:text-vwa-primary md:hidden"
              >
                {/* Reflet décoratif du bouton burger */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" />

                {/* Icône menu */}
                <Bars3Icon className="relative z-10 h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Petite barre visuelle sous le header quand l'utilisateur a scrollé */}
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

      {/* Menu mobile */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
