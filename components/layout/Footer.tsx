"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ChevronDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "navigation",
      title: "Navigation",
      items: [
        { label: "L'association", href: "/association" },
        { label: "Événements", href: "/evenements" },
        { label: "Devenir membre", href: "/devenir-membre" },
        { label: "Faire un don", href: "/don" },
        { label: "Médiathèque", href: "/mediatheque" },
        { label: "Actualités", href: "/actualites" },
        { label: "FAQ / Aide", href: "/aide" },
      ],
    },
    {
      id: "informations",
      title: "Informations",
      items: [
        {
          label: "55 Rue Daniel Mayer, 37100 Tours",
          href: null,
          icon: MapPinIcon,
        },
        {
          label: "vwakiltirel.asso@gmail.com",
          href: "mailto:vwakiltirel.asso@gmail.com",
          icon: EnvelopeIcon,
        },
        {
          label: "07 43 55 00 51",
          href: "tel:0743550051",
          icon: PhoneIcon,
        },
      ],
    },
    {
      id: "legal",
      title: "Légal",
      items: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Données personnelles / RGPD", href: "/rgpd" },
      ],
    },
  ];

  return (
    <footer className="relative mt-16 overflow-x-hidden border-t border-vwa-background/40 bg-gradient-to-b from-vwa-dark to-vwa-dark/95 pb-8 pt-12 text-vwa-background">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-vwa-primary/20 blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-vwa-accent/25 blur-3xl opacity-80" />
        <div className="absolute left-0 top-1/3 h-40 w-40 rounded-full bg-vwa-primary/15 blur-3xl opacity-60" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        {/* Desktop Layout */}
        <div className="hidden gap-10 md:grid md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="min-w-0 space-y-4">
            <div className="relative h-20 w-20">
              <Image
                src="/logo-filigrane.webp"
                alt="Vwa Kiltirèl Logo"
                fill
                sizes="80px"
                className="object-contain opacity-90"
              />
            </div>
            <p className="text-sm leading-relaxed text-vwa-background/80">
              Vwa Kiltirèl est une association engagée dans la transmission,
              l'expression et la valorisation des cultures afro-descendantes,
              créoles et caribéennes à Tours.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <HeartIcon className="h-4 w-4 flex-shrink-0 text-vwa-accent" />
              <span className="text-[11px] text-vwa-background/60">
                Association loi 1901
              </span>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-accent/80">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {sections[0].items.map((item) => (
                <li key={item.label} className="min-w-0">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="group inline-flex max-w-full items-center gap-1 text-vwa-background/80 transition-all duration-300 hover:text-vwa-accent"
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="h-px w-0 bg-vwa-accent transition-all duration-300 group-hover:w-4" />
                    </Link>
                  ) : (
                    <span className="text-vwa-background/80">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 space-y-4">
  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-accent/80">
    Informations
  </h3>
  <ul className="space-y-3 text-sm">
    {sections[1].items.map((item) => {
      const Icon = "icon" in item ? item.icon : null;

      const content = (
        <div className="group flex min-w-0 items-start gap-3">
          {Icon && (
            <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent/60 transition-colors group-hover:text-vwa-accent" />
          )}
          <span className="min-w-0 break-words text-vwa-background/80 transition-colors group-hover:text-vwa-background">
            {item.label}
          </span>
        </div>
      );

      return item.href ? (
        <li key={item.label} className="min-w-0">
          <Link
            href={item.href}
            className="block transition-all duration-300 hover:translate-x-0.5"
          >
            {content}
          </Link>
        </li>
      ) : (
        <li key={item.label} className="min-w-0">
          {content}
        </li>
      );
    })}
  </ul>
</div>

          <div className="min-w-0 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-accent/80">
              Légal
            </h3>
            <ul className="space-y-2 text-sm">
              {sections[2].items.map((item) => (
                <li key={item.label} className="min-w-0">
                  <Link
                    href={item.href!}
                    className="group inline-flex max-w-full items-center gap-1 text-vwa-background/80 transition-all duration-300 hover:text-vwa-accent"
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="h-px w-0 bg-vwa-accent transition-all duration-300 group-hover:w-4" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-vwa-accent/80">
                Suivez-nous
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/vwakiltirel.asso/?hl=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block"
                  aria-label="Instagram"
                >
                  <div className="absolute inset-0 rounded-full bg-vwa-accent/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Image
                    src="/icons/instagram.png"
                    width={24}
                    height={24}
                    alt="Instagram"
                    className="relative z-10 opacity-80 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61589580235561"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block"
                  aria-label="Facebook"
                >
                  <div className="absolute inset-0 rounded-full bg-vwa-accent/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Image
                    src="/icons/facebook.png"
                    width={24}
                    height={24}
                    alt="Facebook"
                    className="relative z-10 opacity-80 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="space-y-4 md:hidden">
          <div className="flex min-w-0 items-center gap-4 border-b border-vwa-background/20 pb-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src="/logo-filigrane.webp"
                alt="Vwa Kiltirèl Logo"
                fill
                sizes="64px"
                className="object-contain opacity-90"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="break-words text-xs leading-relaxed text-vwa-background/70">
                Vwa Kiltirèl — Transmission, expression et valorisation des cultures afro-descendantes, créoles et caribéennes à Tours.
              </p>
            </div>
          </div>

          {sections.map((section) => (
            <div
              key={section.id}
              className="min-w-0 border-b border-vwa-background/20"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full min-w-0 items-center justify-between gap-3 py-3 text-left"
              >
                <span className="min-w-0 text-xs font-semibold uppercase tracking-[0.18em] text-vwa-accent/80">
                  {section.title}
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 flex-shrink-0 text-vwa-background/60 transition-transform duration-300 ${
                    openSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 pb-4 text-sm">
                      {section.items.map((item) => {
                        const Icon = "icon" in item ? item.icon : null;
                        const content = (
                          <div className="flex min-w-0 items-start gap-3 py-1">
                            {Icon && (
                              <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent/60" />
                            )}
                            <span className="min-w-0 break-words text-sm text-vwa-background/80">
                              {item.label}
                            </span>
                          </div>
                        );

                        return item.href ? (
                          <li key={item.label} className="min-w-0">
                            <Link
                              href={item.href}
                              className="block min-w-0 transition-all duration-300 hover:translate-x-1"
                              onClick={() => setOpenSection(null)}
                            >
                              {content}
                            </Link>
                          </li>
                        ) : (
                          <li key={item.label} className="min-w-0">
                            {content}
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="flex min-w-0 items-center justify-between gap-4 pb-2 pt-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-vwa-accent/80">
              Suivez-nous
            </p>
            <div className="flex flex-shrink-0 gap-4">
              <a
                href="https://www.instagram.com/vwakiltirel.asso/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block"
                aria-label="Instagram"
              >
                <Image
                  src="/icons/instagram.png"
                  width={22}
                  height={22}
                  alt="Instagram"
                  className="opacity-70 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61589580235561"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block"
                aria-label="Facebook"
              >
                <Image
                  src="/icons/facebook.png"
                  width={22}
                  height={22}
                  alt="Facebook"
                  className="opacity-70 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-vwa-background/20 pt-6 text-center">
          <div className="flex flex-col items-center justify-between gap-3 text-[10px] text-vwa-background/50 sm:flex-row">
            <p className="break-words">
              © {new Date().getFullYear()} Vwa Kiltirèl — Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <Link
                href="/mentions-legales"
                className="transition-colors hover:text-vwa-accent"
              >
                Mentions légales
              </Link>
              <span className="text-vwa-background/30">•</span>
              <Link
                href="/rgpd"
                className="transition-colors hover:text-vwa-accent"
              >
                RGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
