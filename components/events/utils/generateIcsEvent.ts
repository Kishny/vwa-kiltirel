import type { Event } from "@/data/events";
import { parseFrenchDateFallback } from "./parseFrenchDate";

export function generateIcsEvent(event: Event): string {
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (event.startDate) {
    startDate = new Date(event.startDate);
  }
  if (event.endDate) {
    endDate = new Date(event.endDate);
  }

  if (!startDate) {
    startDate = parseFrenchDateFallback(event.date, event.time.split("–")[0]?.trim() ?? "");
  }
  if (!endDate && startDate) {
    endDate = parseFrenchDateFallback(event.date, event.time.split("–")[1]?.trim() ?? "23:59");
  }

  if (!startDate) return "";

  const formatICS = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const description = event.shortDescription ?? event.description?.slice(0, 200) ?? "";
  const location = event.location;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vwa Kiltirèl//NONSGML v1.0//FR",
    "BEGIN:VEVENT",
    `UID:${event.slug}@vwakiltirel-asso.org`,
    `DTSTAMP:${formatICS(new Date())}`,
    `DTSTART:${formatICS(startDate)}`,
    `DTEND:${formatICS(endDate ?? startDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}