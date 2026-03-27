// app/association/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "L’association | Vwa Kiltirèl",
  description:
    "Découvrez l’association Vwa Kiltirèl, sa mission, ses valeurs, son équipe et sa vision culturelle à Tours.",
};

const bureau = [
  {
    role: "Présidente",
    name: "Maud ARON",
    desc: "Pilote la dynamique globale de l’association avec une vision humaine, culturelle et fédératrice.",
    image: "/images/bureau/maud-aron.png",
    level: "main",
  },
  {
    role: "Co-président",
    name: "Jean VOLCY",
    desc: "Contribue à la stratégie, au développement des projets et à l’identité numérique de Vwa Kiltirèl.",
    image: "/images/bureau/jean-volcy.png",
    level: "main",
  },
  {
    role: "Trésorier",
    name: "Joseph ABENA",
    desc: "Veille à la bonne gestion financière et à la solidité des actions portées par l’association.",
    image: "/images/bureau/joseph-abena.png",
    level: "main",
  },
  {
    role: "Trésorier adjoint",
    name: "Thiery GASPARD",
    desc: "Assiste le trésorier dans la gestion financière, le suivi des comptes et la structuration budgétaire de l’association.",
    image: "/images/bureau/thiery-gaspard.png",
    level: "secondary",
  },
  {
    role: "Secrétaire",
    name: "Stessy ARON VOLCY",
    desc: "Assure l’organisation administrative, le suivi et la fluidité des échanges internes.",
    image: "/images/bureau/stessy-aron.png",
    level: "main",
  },
] as const;

const valeurs = [
  {
    title: "Transmission",
    text: "Préserver et faire circuler les héritages culturels afro-descendants, créoles et caribéens à travers des expériences vivantes.",
    icon: SparklesIcon,
  },
  {
    title: "Lien humain",
    text: "Créer des espaces où les générations, les familles, les artistes et les publics se rencontrent réellement.",
    icon: HeartIcon,
  },
  {
    title: "Collectif",
    text: "Faire émerger des projets qui se construisent avec les autres, jamais à distance des réalités humaines et locales.",
    icon: UserGroupIcon,
  },
  {
    title: "Ouverture",
    text: "Valoriser une culture enracinée et vivante, tout en restant ouverte au dialogue, au partage et à la création contemporaine.",
    icon: GlobeAltIcon,
  },
];

const timeline = [
  {
    year: "2025",
    title: "Naissance de Vwa Kiltirèl",
    text: "Création de l’association avec une volonté claire : faire vibrer les cultures afro-caribéennes à Tours à travers des événements, ateliers et moments de transmission.",
  },
  {
    year: "2025",
    title: "Premiers formats & premières rencontres",
    text: "Mise en place des premiers événements, expérimentation de formats intimistes, familiaux et culturels.",
  },
  {
    year: "2026",
    title: "Structuration de l’identité",
    text: "Développement d’une présence digitale, clarification de la ligne artistique et culturelle, et montée en qualité de l’expérience proposée.",
  },
  {
    year: "À venir",
    title: "Déploiement de nouveaux projets",
    text: "Développement de partenariats, programmation enrichie, médiathèque, adhésion, dons et parcours membres plus complets.",
  },
];

const reperes = [
  { value: "Tours", label: "Ancrage territorial" },
  { value: "5", label: "Membres du bureau" },
  { value: "Afro-caribéen", label: "Univers culturel" },
  { value: "Humain", label: "Esprit du projet" },
];

function bureauCardStyles(level: "main" | "secondary") {
  if (level === "main") {
    return {
      badge: "bg-vwa-dark text-vwa-background border border-vwa-dark/80",
      ring: "group-hover:ring-vwa-accent/40",
      glow: "bg-vwa-accent/12",
      label: "Membre principal",
    };
  }

  return {
    badge: "bg-vwa-background text-vwa-dark border border-vwa-background/90",
    ring: "group-hover:ring-vwa-primary/25",
    glow: "bg-vwa-primary/10",
    label: "Fonction d’appui",
  };
}

export default function AssociationPage() {
  return (
    <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Halo / ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />

        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/20 blur-3xl opacity-70" />

        <div className="absolute bottom-[-4rem] left-[-3rem] h-60 w-60 rounded-full bg-vwa-primary/10 blur-3xl opacity-60" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 shadow-[0_22px_70px_rgba(28,22,18,0.14)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-vwa-accent/10 blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-vwa-primary/10 blur-3xl opacity-60" />
        </div>

        <div className="grid gap-6 px-5 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10 space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
              <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
              L’association – Vwa Kiltirèl
            </p>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-vwa-dark leading-tight">
                Une association culturelle pensée pour transmettre, relier et
                faire vibrer.
              </h1>

              <p className="text-sm sm:text-base text-vwa-dark/75 max-w-2xl leading-relaxed">
                Vwa Kiltirèl est une association culturelle et événementielle
                basée à Tours, créée pour mettre en lumière les cultures
                afro-descendantes, créoles et caribéennes à travers des
                expériences sensibles, humaines et exigeantes.
              </p>

              <p className="text-sm text-vwa-dark/70 max-w-2xl leading-relaxed">
                Plus qu’une programmation, nous construisons des espaces de
                rencontre, de mémoire, de fête, de transmission et de création.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/evenements"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(28,22,18,0.45)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_22px_55px_rgba(28,22,18,0.58)]"
              >
                Voir les événements
              </Link>

              <Link
                href="/devenir-membre"
                className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
              >
                Devenir membre
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {reperes.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-vwa-background/80 bg-vwa-background/50 px-3 py-3"
                >
                  <p className="text-sm font-extrabold text-vwa-dark">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-vwa-dark/58">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[340px] overflow-hidden rounded-[1.6rem] bg-vwa-background">
            <Image
              src="/images/actualites/cover-1.png"
              alt="Univers Vwa Kiltirèl"
              fill
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
              Tours • Culture • Transmission
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-vwa-background/80 bg-white/95 px-5 py-5 shadow-[0_18px_55px_rgba(28,22,18,0.10)]">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-vwa-dark/5 text-vwa-primary">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                Notre mission
              </p>
              <p className="mt-3 text-sm leading-relaxed text-vwa-dark/78">
                Faire vivre, découvrir et transmettre les cultures
                afro-descendantes, créoles et caribéennes à travers des
                événements, ateliers, rencontres et expériences collectives à
                forte dimension humaine.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-vwa-background/80 bg-white/95 px-5 py-5 shadow-[0_18px_55px_rgba(28,22,18,0.10)]">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-vwa-dark/5 text-vwa-accent">
              <GlobeAltIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                Notre vision
              </p>
              <p className="mt-3 text-sm leading-relaxed text-vwa-dark/78">
                Construire une présence culturelle forte, sensible et
                contemporaine à Tours, capable de rassembler différents publics
                autour d’une mémoire vivante, d’une créativité assumée et d’un
                esprit profondément fédérateur.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* VALEURS */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-vwa-dark">Nos valeurs</h2>
          <p className="text-sm text-vwa-dark/65">
            Ce qui guide chaque projet, chaque rencontre et chaque expérience
            Vwa Kiltirèl.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {valeurs.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-vwa-background/85 bg-white/95 px-5 py-5 shadow-[0_16px_45px_rgba(28,22,18,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(28,22,18,0.18)]"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-vwa-dark/5 text-vwa-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-vwa-dark">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-vwa-dark/72">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* BUREAU */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-vwa-dark">Le bureau</h2>
          <p className="text-sm text-vwa-dark/65">
            Les personnes qui portent, structurent et accompagnent le projet au
            quotidien.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {bureau.map((member) => {
            const styles = bureauCardStyles(member.level);

            return (
              <article
                key={`${member.role}-${member.name}`}
                className={[
                  "group relative overflow-hidden rounded-[1.75rem] border border-vwa-background/85 bg-white/95 p-5",
                  "shadow-[0_16px_45px_rgba(28,22,18,0.10)]",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,22,18,0.18)]",
                  "ring-1 ring-transparent",
                  styles.ring,
                ].join(" ")}
              >
                {/* Halo premium */}
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className={`absolute -right-10 top-0 h-28 w-28 rounded-full blur-3xl opacity-70 transition-opacity duration-300 ${styles.glow}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-vwa-accent/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Top */}
                <div className="relative z-10 flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-vwa-accent/30 via-transparent to-vwa-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative h-20 w-20 overflow-hidden rounded-[1.4rem] border border-vwa-background/80 bg-vwa-background shadow-[0_10px_28px_rgba(28,22,18,0.10)]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        sizes="80px"
                      />
                    </div>
                  </div>

                  {/* Infos */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                          styles.badge,
                        ].join(" ")}
                      >
                        {member.role}
                      </span>

                      <span className="inline-flex rounded-full bg-vwa-dark/5 px-2.5 py-1 text-[10px] font-medium text-vwa-dark/55">
                        {styles.label}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-extrabold leading-snug text-vwa-dark">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-vwa-dark/45">
                        {member.role}
                      </p>
                      <p className="text-xs leading-relaxed text-vwa-dark/72">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="relative z-10 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-vwa-dark/45">
                    Équipe fondatrice & pilotage
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-vwa-primary opacity-80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                    Découvrir
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-vwa-dark">
            Notre trajectoire
          </h2>
          <p className="text-sm text-vwa-dark/65">
            Les étapes qui structurent l’évolution de Vwa Kiltirèl.
          </p>
        </div>

        <div className="relative space-y-4 pl-4 sm:pl-6">
          <div className="absolute left-[10px] top-2 bottom-2 w-px bg-gradient-to-b from-vwa-accent/50 via-vwa-primary/30 to-transparent sm:left-[14px]" />

          {timeline.map((item, index) => (
            <article
              key={`${item.year}-${item.title}-${index}`}
              className="relative rounded-3xl border border-vwa-background/85 bg-white/95 px-5 py-5 shadow-[0_16px_45px_rgba(28,22,18,0.10)]"
            >
              <span className="absolute -left-[18px] top-6 inline-flex h-5 w-5 rounded-full border-4 border-vwa-background bg-vwa-accent shadow-sm sm:-left-[22px]" />

              <div className="space-y-2">
                <span className="inline-flex rounded-full bg-vwa-dark text-vwa-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {item.year}
                </span>

                <h3 className="text-sm font-semibold text-vwa-dark">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-vwa-dark/72">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-vwa-dark px-5 py-6 text-vwa-background shadow-[0_22px_70px_rgba(28,22,18,0.24)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-8 top-0 h-36 w-36 rounded-full bg-vwa-accent/20 blur-3xl opacity-80" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl opacity-70" />
        </div>

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-background/70">
              Rejoindre l’aventure
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              Envie de soutenir, participer ou construire quelque chose avec
              nous ?
            </h2>
            <p className="text-sm text-vwa-background/82 leading-relaxed">
              Que ce soit par une adhésion, un don, une collaboration ou une
              simple prise de contact, chaque lien compte dans la construction
              de cette aventure collective.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/devenir-membre"
              className="inline-flex items-center justify-center rounded-full bg-vwa-background px-5 py-2.5 text-sm font-semibold text-vwa-dark shadow-sm transition hover:bg-white"
            >
              Devenir membre
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-vwa-background/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-vwa-background backdrop-blur-sm transition hover:bg-white/15"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
