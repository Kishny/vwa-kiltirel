import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { verifyUnsubscribeToken } from "@/lib/newsletter-token";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const cleanToken = String(token || "").trim();

    if (!cleanToken) {
      return NextResponse.json(
        { success: false, error: "Token requis." },
        { status: 400 }
      );
    }

    const verification = verifyUnsubscribeToken(cleanToken);

    if (!verification.valid) {
      return NextResponse.json(
        { success: false, error: "Lien de désinscription invalide ou expiré." },
        { status: 401 }
      );
    }

    const email = verification.payload.email;

    await connectToDatabase();

    const subscriber = await NewsletterSubscriber.findOne({
      email,
      isActive: true,
    });

    if (!subscriber) {
      return NextResponse.json(
        {
          success: true,
          message: "Cette adresse est déjà désinscrite ou introuvable.",
        },
        { status: 200 }
      );
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return NextResponse.json({
      success: true,
      message: "Vous êtes désinscrit de la newsletter.",
    });
  } catch (error) {
    console.error("UNSUBSCRIBE ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Erreur serveur." },
      { status: 500 }
    );
  }
}