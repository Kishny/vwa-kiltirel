"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import {
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  EnvelopeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

type AdminLayoutProps = {
  children: ReactNode;
};

const navItems = [
  {
    href: "/admin",
    label: "Vue d’ensemble",
    icon: Squares2X2Icon,
    description: "Dashboard principal",
  },
  {
    href: "/admin/inscriptions",
    label: "Inscriptions",
    icon: ClipboardDocumentListIcon,
    description: "Événements & participants",
  },
  {
    href: "/admin/newsletter",
    label: "Newsletter",
    icon: EnvelopeIcon,
    description: "Abonnés & diffusion",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const currentSection =
    navItems.find((item) => isActivePath(pathname, item.href)) ?? navItems[0];

  return (
    <main className="min-h-screen bg-vwa-background">
      <div className="relative mx-auto max-w-[1600px] px-4 py-4 sm:px-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
          <div className="absolute left-[10%] top-0 h-72 w-72 rounded-full bg-vwa-accent/10 blur-3xl opacity-80" />
          <div className="absolute bottom-0 right-[8%] h-80 w-80 rounded-full bg-vwa-primary/10 blur-3xl opacity-80" />
        </div>

        {/* MOBILE / TABLET TOPBAR */}
        <section className="mb-4 rounded-[2rem] border border-vwa-background/80 bg-white/95 p-4 shadow-[0_18px_50px_rgba(28,22,18,0.10)] lg:hidden">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
                Espace administrateur
              </p>

              <div>
                <h1 className="text-2xl font-extrabold text-vwa-dark">
                  Back-office Vwa Kiltirèl
                </h1>
                <p className="mt-1 text-sm leading-relaxed text-vwa-dark/70">
                  Navigation centralisée pour les inscriptions, la newsletter et
                  la vue d’ensemble.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-2xl px-4 py-3 text-left shadow-sm transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-vwa-primary to-vwa-dark text-white shadow-[0_16px_40px_rgba(28,22,18,0.22)]"
                        : "border border-vwa-dark/10 bg-white text-vwa-dark/80 hover:border-vwa-primary/30 hover:text-vwa-primary"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        active ? "text-white/80" : "text-vwa-dark/50"
                      }`}
                    >
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>

            <AdminLogoutButton />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 shadow-[0_24px_70px_rgba(28,22,18,0.12)] backdrop-blur-sm">
              <div className="relative">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-vwa-accent/10 blur-3xl opacity-70" />
                  <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-vwa-primary/10 blur-3xl opacity-70" />
                </div>

                <div className="relative z-10 border-b border-vwa-background/80 p-6">
                  <div className="space-y-3">
                    <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
                      Espace administrateur
                    </p>

                    <div>
                      <h1 className="text-2xl font-extrabold text-vwa-dark">
                        Back-office
                      </h1>
                      <p className="mt-2 text-sm leading-relaxed text-vwa-dark/70">
                        Un espace plus clair pour piloter les actions internes de
                        Vwa Kiltirèl.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 p-4">
                  <nav className="space-y-2" aria-label="Navigation administration">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActivePath(pathname, item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`group flex items-start gap-3 rounded-[1.4rem] px-4 py-4 transition-all duration-200 ${
                            active
                              ? "bg-gradient-to-r from-vwa-primary to-vwa-dark text-white shadow-[0_16px_40px_rgba(28,22,18,0.22)]"
                              : "text-vwa-dark/75 hover:bg-vwa-background/70 hover:text-vwa-primary"
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                              active
                                ? "bg-white/15 text-white"
                                : "bg-vwa-dark/5 text-vwa-primary"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p
                              className={`mt-1 text-xs leading-relaxed ${
                                active ? "text-white/80" : "text-vwa-dark/50"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="relative z-10 border-t border-vwa-background/80 p-4">
                  <div className="rounded-[1.5rem] bg-vwa-background/60 p-4 ring-1 ring-vwa-background/80">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-vwa-accent/10 text-vwa-accent">
                        <SparklesIcon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-vwa-dark">
                          Session active
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-vwa-dark/60">
                          Tu peux naviguer entre les espaces sans te reconnecter.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <AdminLogoutButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENU */}
          <section className="min-w-0">
            <div className="mb-6 rounded-[2rem] border border-vwa-background/80 bg-white/90 px-5 py-4 shadow-[0_18px_45px_rgba(28,22,18,0.08)] backdrop-blur-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/45">
                    Section active
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-vwa-dark">
                    {currentSection.label}
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-vwa-dark/60">
                  {currentSection.description}
                </p>
              </div>
            </div>

            <div>{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}