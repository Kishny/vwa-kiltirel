// app/api/hooks/helloasso/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("HelloAsso webhook reçu :", body);

    return NextResponse.json(
      { success: true, message: "Webhook reçu." },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/hooks/helloasso error:", error);

    return NextResponse.json(
      { success: false, error: "Erreur serveur." },
      { status: 500 }
    );
  }
}