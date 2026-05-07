import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type PatchBody = {
  isActive?: boolean;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifiant invalide.",
        },
        { status: 400 }
      );
    }

    const body = (await request.json()) as PatchBody;
    const nextStatus = body?.isActive;

    if (typeof nextStatus !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          error: "Le champ isActive est requis.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const subscriber = await NewsletterSubscriber.findById(id);

    if (!subscriber) {
      return NextResponse.json(
        {
          success: false,
          error: "Abonné introuvable.",
        },
        { status: 404 }
      );
    }

    subscriber.isActive = nextStatus;
    subscriber.unsubscribedAt = nextStatus ? null : new Date();

    await subscriber.save();

    return NextResponse.json(
      {
        success: true,
        message: nextStatus
          ? "Abonné réactivé avec succès."
          : "Abonné désinscrit avec succès.",
        data: {
          _id: String(subscriber._id),
          email: subscriber.email ?? "",
          firstName: subscriber.firstName ?? "",
          source: subscriber.source ?? "",
          isActive: Boolean(subscriber.isActive),
          subscribedAt: subscriber.subscribedAt ?? subscriber.createdAt ?? null,
          unsubscribedAt: subscriber.unsubscribedAt ?? null,
          createdAt: subscriber.createdAt ?? null,
          updatedAt: subscriber.updatedAt ?? null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/admin/newsletter/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}