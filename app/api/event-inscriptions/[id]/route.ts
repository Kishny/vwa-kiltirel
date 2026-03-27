import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import EventInscription from "@/models/EventInscription";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "ID invalide." },
        { status: 400 }
      );
    }

    const allowedStatuses = ["pending", "confirmed", "cancelled"];
    const nextStatus = body?.status;

    if (!allowedStatuses.includes(nextStatus)) {
      return NextResponse.json(
        { success: false, error: "Statut invalide." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updated = await EventInscription.findByIdAndUpdate(
      id,
      { status: nextStatus },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Inscription introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Statut mis à jour.",
        inscription: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/event-inscriptions/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "ID invalide." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deleted = await EventInscription.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Inscription introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Inscription supprimée." },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/event-inscriptions/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur." },
      { status: 500 }
    );
  }
}