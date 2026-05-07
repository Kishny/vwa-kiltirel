import type { Metadata } from "next";
import { events, isEventPast } from "@/data/events";
import { mediaByEvent, associationMedia, MediaItem } from "@/data/media";
import MediathequeView, {
  EventWithMedia,
} from "@/components/mediatheque/MediathequeView";
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

// ============================================
// DONNÉES STRUCTURÉES JSON-LD PREMIUM
// ============================================
function generateMediaArchiveSchema(
  eventsWithMedia: EventWithMedia[],
  hasAssociationMedia: boolean
) {
  const allMediaItems: MediaItem[] = eventsWithMedia.flatMap((e) => e.medias);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Médiathèque Vwa Kiltirèl - Archives vivantes",
    description:
      "Une collection authentique de photographies et souvenirs, témoignant de la vitalité culturelle afro-descendante à Tours à travers les événements et moments de vie de l'association Vwa Kiltirèl.",
    url: "https://vwakiltirel-asso.org/mediatheque",
    mainEntity: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      url: "https://vwakiltirel-asso.org",
      email: "vwakiltirel.asso@gmail.com",
      foundingDate: "2018",
      areaServed: "Tours",
      knowsAbout: [
        "Culture afro-descendante",
        "Patrimoine créole",
        "Art caribéen",
        "Mémoire collective",
      ],
    },
    numberOfItems:
      allMediaItems.length + (hasAssociationMedia ? associationMedia.length : 0),
    about: [
      {
        "@type": "Event",
        name: "Événements culturels Vwa Kiltirèl",
        description:
          "Collection immersive de photographies capturant l'essence de nos ateliers, rencontres et célébrations, témoignant de la richesse des échanges culturels.",
        location: {
          "@type": "Place",
          name: "Tours, France",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tours",
            addressCountry: "FR",
          },
        },
      },
      {
        "@type": "CreativeWork",
        name: "Vie associative et coulisses",
        description:
          "Instantanés authentiques de la vie de notre association : préparations, moments de partage et souvenirs précieux qui forgent notre identité collective.",
      },
    ],
  };
}

function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://vwakiltirel-asso.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Médiathèque - Nos souvenirs en images",
        item: "https://vwakiltirel-asso.org/mediatheque",
      },
    ],
  };
}

function generateImageGallerySchema(eventsWithMedia: EventWithMedia[]) {
  const allImages: {
    url: string;
    name: string;
    description: string;
    dateCreated?: string;
  }[] = [];

  eventsWithMedia.forEach((event) => {
    event.medias.forEach((media) => {
      if (media.type === "image") {
        allImages.push({
          url: media.src,
          name: `${event.title} - ${media.alt || "Moment précieux"}`,
          description: `Capture authentique de ${event.title} - ${event.date} - ${event.location}`,
          dateCreated: event.date,
        });
      }
    });
  });

  if (allImages.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Galerie d'âme - Vwa Kiltirèl",
    description:
      "Une collection unique de photographies célébrant la richesse culturelle afro-descendante à Tours à travers les événements et moments de vie de Vwa Kiltirèl.",
    url: "https://vwakiltirel-asso.org/mediatheque",
    numberOfItems: allImages.length,
    image: allImages.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url,
      name: img.name,
      description: img.description,
      dateCreated: img.dateCreated,
    })),
  };
}

type MediathequePageProps = {
  searchParams: Promise<{
    event?: string;
    category?: string;
  }>;
};

export default async function MediathequePage({
  searchParams,
}: MediathequePageProps) {
  const { event: eventSlugFromUrl, category: categoryFromUrl } =
    await searchParams;

  const pastEventsWithMedia: EventWithMedia[] = events
    .filter((e) => isEventPast(e) && mediaByEvent[e.slug]?.length)
    .map((e) => ({
      slug: e.slug,
      title: e.title,
      category: e.category,
      date: e.date,
      location: e.location,
      medias: mediaByEvent[e.slug] as MediaItem[],
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const hasAssociationMedia = associationMedia && associationMedia.length > 0;
  const mediaArchiveSchema = generateMediaArchiveSchema(
    pastEventsWithMedia,
    hasAssociationMedia
  );
  const breadcrumbSchema = generateBreadcrumbSchema();
  const imageGallerySchema = generateImageGallerySchema(pastEventsWithMedia);

  const totalMediaCount =
    pastEventsWithMedia.reduce((acc, e) => acc + e.medias.length, 0) +
    (hasAssociationMedia ? associationMedia.length : 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaArchiveSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {imageGallerySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(imageGallerySchema),
          }}
        />
      )}

      <main className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-vwa-background via-vwa-background/95 to-vwa-background/90" />
          <div className="absolute left-0 right-0 top-0 h-[600px] bg-gradient-to-b from-vwa-accent/8 via-transparent to-transparent" />
          <div className="absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-vwa-primary/5 blur-3xl" />
          <div className="absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-vwa-accent/5 blur-3xl" />
        </div>

        <header className="mx-auto mb-16 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/50" />
            <span className="text-[13px] font-medium uppercase tracking-[0.3em] text-vwa-accent/80">
              Mémoire vivante
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/50" />
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-vwa-dark lg:text-6xl">
            L&apos;âme de Vwa Kiltirèl
            <span className="mt-3 block text-2xl text-vwa-primary/70 lg:text-3xl">
              en images
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-vwa-dark/70">
            Une collection précieuse de moments authentiques, capturés au fil de
            nos rencontres, ateliers et célébrations. Chaque image raconte une
            histoire, chaque regard témoigne d&apos;une émotion partagée.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-vwa-dark/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-2xl">📸</span>
              <span className="text-sm font-medium text-vwa-dark/80">
                {totalMediaCount} souvenirs précieux
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-vwa-dark/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-medium text-vwa-dark/80">
                {pastEventsWithMedia.length} événements célébrés
              </span>
            </div>
          </div>
        </header>

        <section className="mb-20">
          <MediathequeView
            events={pastEventsWithMedia}
            associationMedia={associationMedia}
            initialEventSlug={eventSlugFromUrl}
            initialCategory={categoryFromUrl}
          />
        </section>

        <MediathequeQuoteFooter />
      </main>
    </>
  );
}