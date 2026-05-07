import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

function escapeCsv(value: unknown) {
  const str = String(value ?? "");
  if (str.includes('"') || str.includes(",") || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  try {
    await connectToDatabase();

    const subscribers = await NewsletterSubscriber.find()
      .sort({ createdAt: -1 })
      .lean();

    const headers = [
      "email",
      "firstName",
      "source",
      "isActive",
      "subscribedAt",
      "unsubscribedAt",
      "createdAt",
      "updatedAt",
    ];

    const rows = subscribers.map((item) =>
      [
        item.email,
        item.firstName ?? "",
        item.source ?? "",
        item.isActive ? "actif" : "desinscrit",
        item.subscribedAt ? new Date(item.subscribedAt).toISOString() : "",
        item.unsubscribedAt ? new Date(item.unsubscribedAt).toISOString() : "",
        item.createdAt ? new Date(item.createdAt).toISOString() : "",
        item.updatedAt ? new Date(item.updatedAt).toISOString() : "",
      ]
        .map(escapeCsv)
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="newsletter-subscribers.csv"',
      },
    });
  } catch (error) {
    console.error("GET /api/admin/newsletter/export error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}