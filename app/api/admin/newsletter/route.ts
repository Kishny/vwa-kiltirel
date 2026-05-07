import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

type SubscriberQuery = {
  email?: {
    $regex: string;
    $options: string;
  };
  isActive?: boolean;
};

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const search = request.nextUrl.searchParams.get("search") || "";
    const status = request.nextUrl.searchParams.get("status");
    const page = Number(request.nextUrl.searchParams.get("page") || 1);
    const limit = 10;

    const query: SubscriberQuery = {};

    if (search.trim()) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.email = { $regex: safeSearch, $options: "i" };
    }

    if (status === "active") {
      query.isActive = true;
    }

    if (status === "inactive") {
      query.isActive = false;
    }

    const total = await NewsletterSubscriber.countDocuments(query);

    const subscribers = await NewsletterSubscriber.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: subscribers,
        pagination: {
          total,
          page,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/admin/newsletter error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}