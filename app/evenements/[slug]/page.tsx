import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events, isEventPast } from "@/data/events";
import EventDetailClient from "@/components/events/EventDetailClient";
import {
  SITE_URL,
  ORG_ADDRESS,
  absoluteUrl,
  canonicalUrl,
  organizationRef,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

type PriceInfo =
  | { kind: "free" }
  | { kind: "paid"; amount: number }
  | { kind: "unknown" };

/**
 * Interprète le champ `price` libre ("Gratuit", "12 €", "À confirmer"…).
 * On distingue explicitement la gratuité de l'absence d'information :
 * un événement gratuit mérite une offre à 0 € (éligible aux résultats
 * enrichis), un tarif non communiqué ne doit produire aucune offre.
 */
function parsePrice(price: string): PriceInfo {
  const normalized = price.replace(",", ".").trim().toLowerCase();

  if (
    normalized.includes("gratuit") ||
    normalized.includes("entrée libre") ||
    normalized.includes("prix libre") ||
    normalized === "libre"
  ) {
    return { kind: "free" };
  }

  const matches = normalized.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length === 0) return { kind: "unknown" };

  const amount = Number(matches[0]);
  return Number.isNaN(amount) ? { kind: "unknown" } : { kind: "paid", amount };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Événement introuvable | Vwa Kiltirèl",
      description:
        "L’événement recherché est introuvable sur le site de Vwa Kiltirèl.",
    };
  }

  const pageUrl = canonicalUrl(`/evenements/${slug}`);
  const description =
    event.shortDescription ||
    `Découvrez ${event.title} organisé par Vwa Kiltirèl à ${event.location}.`;

  return {
    title: `${event.title} | Vwa Kiltirèl`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: event.title,
      description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: absoluteUrl(event.image),
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: [absoluteUrl(event.image)],
    },
  };
}

function generateEventSchema(
  event: NonNullable<ReturnType<typeof getEventBySlug>>,
) {
  const price = parsePrice(event.price);
  const eventUrl = canonicalUrl(`/evenements/${event.slug}`);

  // `startDate` est la seule source fiable : le champ `date` est une
  // formulation lisible ("Prévu en février 2027") que Schema.org rejette.
  const startDate = event.startDate;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${eventUrl}#event`,
    name: event.title,
    description: event.shortDescription || event.description,
    url: eventUrl,
    inLanguage: "fr-FR",
    ...(startDate ? { startDate } : {}),
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: isEventPast(event)
      ? "https://schema.org/EventCompleted"
      : "https://schema.org/EventScheduled",
    // Schema.org exige des URLs absolues pour les images.
    image: [absoluteUrl(event.image)],
    location: {
      "@type": "Place",
      name: event.location,
      address: ORG_ADDRESS,
    },
    organizer: organizationRef,
    performer: organizationRef,
    ...(event.maxPlaces ? { maximumAttendeeCapacity: event.maxPlaces } : {}),
    ...(price.kind === "free"
      ? {
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: event.paymentUrl || eventUrl,
            ...(startDate ? { validFrom: startDate } : {}),
          },
        }
      : {}),
    ...(price.kind === "paid"
      ? {
          isAccessibleForFree: false,
          offers: {
            "@type": "Offer",
            price: price.amount,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: event.paymentUrl || eventUrl,
            ...(startDate ? { validFrom: startDate } : {}),
          },
        }
      : {}),
  };
}

function generateBreadcrumbSchema(slug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Événements",
        item: canonicalUrl("/evenements"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl(`/evenements/${slug}`),
      },
    ],
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const eventSchema = generateEventSchema(event);
  const breadcrumbSchema = generateBreadcrumbSchema(slug, event.title);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <EventDetailClient event={event} allEvents={events} />
    </>
  );
}