import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json(
      {
        success: true,
        message: "Inscription newsletter reçue.",
        data: body,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/newsletter error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}