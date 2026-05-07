import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events, isEventPast } from "@/data/events";
import EventDetailClient from "@/components/events/EventDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

function parseFrenchDateToIso(dateStr: string, timeStr?: string) {
  const months: Record<string, number> = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const cleanDate = dateStr.trim().toLowerCase();
  const parts = cleanDate.split(" ");

  if (parts.length < 4) return null;

  const day = Number(parts[1]);
  const month = months[parts[2]];
  const year = Number(parts[3]);

  if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) {
    return null;
  }

  let hours = 12;
  let minutes = 0;

  if (timeStr) {
    const match = timeStr.trim().match(/(\d{1,2})\s*h?\s*(\d{0,2})/i);
    if (match) {
      hours = Number(match[1]);
      minutes = match[2] ? Number(match[2]) : 0;
    }
  }

  const date = new Date(year, month, day, hours, minutes);
  return date.toISOString();
}

function extractNumericPrice(price: string) {
  const normalized = price.replace(",", ".").trim().toLowerCase();

  if (
    normalized.includes("gratuit") ||
    normalized.includes("entrée libre") ||
    normalized.includes("libre")
  ) {
    return null;
  }

  const matches = normalized.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length === 0) return null;

  const firstPrice = Number(matches[0]);
  return Number.isNaN(firstPrice) ? null : firstPrice;
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

  const canonicalUrl = `https://vwa-kiltirel.fr/evenements/${slug}`;
  const description =
    event.shortDescription ||
    `Découvrez ${event.title} organisé par Vwa Kiltirèl à ${event.location}.`;

  return {
    title: `${event.title} | Vwa Kiltirèl`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: event.title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: event.image,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: [event.image],
    },
  };
}

function generateEventSchema(
  event: NonNullable<ReturnType<typeof getEventBySlug>>,
) {
  const startTime = event.time.split("–")[0]?.trim() || event.time;
  const startDateIso = parseFrenchDateToIso(event.date, startTime);
  const numericPrice = extractNumericPrice(event.price);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.shortDescription || event.description,
    startDate: startDateIso || event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: isEventPast(event)
      ? "https://schema.org/EventCompleted"
      : "https://schema.org/EventScheduled",
    image: [event.image],
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tours",
        addressCountry: "FR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      url: "https://vwa-kiltirel.fr",
    },
    ...(numericPrice !== null
      ? {
          offers: {
            "@type": "Offer",
            price: numericPrice,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url:
              event.paymentUrl ||
              `https://vwa-kiltirel.fr/evenements/${event.slug}`,
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
        item: "https://vwa-kiltirel.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Événements",
        item: "https://vwa-kiltirel.fr/evenements",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://vwa-kiltirel.fr/evenements/${slug}`,
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