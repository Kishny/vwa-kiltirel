import type { Metadata } from "next";
import MediathequeQuoteFooter from "@/components/mediatheque/MediathequeQuoteFooter";

// ============================================
// MÉTADONNÉES SEO PREMIUM
// ============================================
export const metadata: Metadata = {
  title: "Médiathèque | L'âme de Vwa Kiltirèl en images",
  description:
    "Explorez l'essence de Vwa Kiltirèl à travers notre médiathèque : une collection précieuse de moments capturés lors de nos ateliers, rencontres et célébrations afro-descendantes à Tours.",
  keywords: [
    "médiathèque culturelle Tours",
    "photographie événementielle afro-caribéenne",
    "souvenirs visuels Vwa Kiltirèl",
    "galerie d'art culturel Tours",
    "moments associatifs en images",
    "mémoire collective afro-descendante",
    "patrimoine culturel Tours",
    "instantanés créoles",
  ],
  authors: [{ name: "Vwa Kiltirèl" }],
  creator: "Vwa Kiltirèl",
  publisher: "Vwa Kiltirèl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Médiathèque Vwa Kiltirèl | L'âme de notre communauté",
    description:
      "Plongez dans l'univers visuel de Vwa Kiltirèl : une collection authentique de nos moments les plus précieux, célébrant la richesse des cultures afro-descendantes à Tours.",
    url: "https://vwakiltirel-asso.org/mediatheque",
    siteName: "Vwa Kiltirèl",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og/mediatheque-og.jpg",
        width: 1200,
        height: 630,
        alt: "Médiathèque Vwa Kiltirèl - Notre héritage visuel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Médiathèque Vwa Kiltirèl | Galerie d'âme",
    description:
      "Découvrez notre collection de moments précieux : ateliers, célébrations et vie associative de Vwa Kiltirèl à Tours.",
    images: ["/images/og/mediatheque-og.jpg"],
    site: "@vwa_kiltirel",
    creator: "@vwa_kiltirel",
  },
  alternates: {
    canonical: "https://vwakiltirel-asso.org/mediatheque",
  },
  verification: {
    google: "votre-code-verification-google",
  },
  category: "médiathèque culturelle",
};

export default async function MediathequePage() {
  return (
    <>

      <main className="relative mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-vwa-background via-vwa-background/95 to-vwa-background/90" />
          <div className="absolute left-0 right-0 top-0 h-[600px] bg-gradient-to-b from-vwa-accent/8 via-transparent to-transparent" />
          <div className="absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-vwa-primary/5 blur-3xl" />
          <div className="absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-vwa-accent/5 blur-3xl" />
        </div>

        {/* Header */}
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/50" />
            <span className="text-[12px] font-medium uppercase tracking-[0.28em] text-vwa-accent/80">
              Mémoire vivante
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/50" />
          </div>

          <h1 className="mb-5 text-4xl font-bold tracking-tight text-vwa-dark lg:text-5xl">
            Médiathèque
            <span className="mt-2 block text-2xl text-vwa-primary/70 lg:text-3xl">
              bientôt disponible
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-vwa-dark/65">
            Les photos, vidéos, affiches et souvenirs des événements Vwa Kiltirèl
            seront publiés ici après les premiers temps forts de la programmation 2027.
          </p>
        </header>

        {/* Cartes "à venir" */}
        <section className="mb-16 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: "🖼️",
              title: "Affiches à venir",
              description:
                "Découvrez prochainement les visuels officiels de nos événements 2027.",
            },
            {
              icon: "📸",
              title: "Photos d'événements",
              description:
                "Les galeries seront ajoutées après chaque rencontre, atelier ou soirée.",
            },
            {
              icon: "🎥",
              title: "Vidéos & souvenirs",
              description:
                "Cette section accueillera les moments partagés avec les participants, bénévoles et partenaires.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-vwa-dark/8 bg-white/80 p-6 text-center shadow-sm"
            >
              <div className="mb-4 flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-vwa-background text-3xl shadow-sm">
                {card.icon}
              </div>
              <h2 className="mb-2 text-sm font-bold text-vwa-dark">
                {card.title}
              </h2>
              <p className="text-xs leading-relaxed text-vwa-dark/55">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        {/* Mention + CTA newsletter */}
        <div className="mx-auto max-w-lg rounded-2xl border border-vwa-accent/20 bg-vwa-accent/5 px-6 py-6 text-center">
          <p className="text-sm font-medium text-vwa-dark/80">
            Inscrivez-vous à la newsletter pour recevoir les annonces officielles
            de Vwa Kiltirèl.
          </p>
          <a
            href="/#newsletter-title"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            S'inscrire à la newsletter
          </a>
        </div>

        <MediathequeQuoteFooter />
      </main>
    </>
  );
}