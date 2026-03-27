import { NextResponse } from "next/server";

export async function POST() {
  const cookieName = process.env.ADMIN_COOKIE_NAME || "vwa_admin_session";

  const response = NextResponse.json(
    { success: true, message: "Déconnexion réussie." },
    { status: 200 }
  );

  response.cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}