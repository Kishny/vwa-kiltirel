import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { signAdminSession } from "@/lib/admin-session";
import {
  checkAdminRateLimit,
  clearAdminFailures,
  getClientKey,
  recordAdminFailure,
} from "@/lib/admin-rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim();
    const password = String(body?.password || "").trim();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const cookieName = process.env.ADMIN_COOKIE_NAME || "vwa_admin_session";

    console.log("LOGIN DEBUG", {
      emailTyped: email,
      adminEmail,
      passwordTyped: password,
      hashFromEnv: adminPasswordHash,
    });

    if (!adminEmail || !adminPasswordHash) {
      return NextResponse.json(
        { error: "Configuration admin manquante." },
        { status: 500 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;

    const rateLimitKey = getClientKey(ip, email);
    const rateLimit = checkAdminRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      const retryMinutes = Math.ceil(rateLimit.retryAfterMs / 60000);

      return NextResponse.json(
        {
          error: `Trop de tentatives. Réessaie dans ${retryMinutes} min.`,
        },
        { status: 429 }
      );
    }

    const isValidEmail = email === adminEmail;
const isValidPassword = await bcrypt.compare(password, adminPasswordHash);

console.log("LOGIN CHECK", {
  emailTyped: email,
  adminEmail,
  isValidEmail,
  passwordTyped: password,
  hashFromEnv: adminPasswordHash,
  isValidPassword,
});

if (!isValidEmail || !isValidPassword) {
  return NextResponse.json(
    { error: "Identifiants invalides." },
    { status: 401 }
  );
}

    clearAdminFailures(rateLimitKey);

    const sessionToken = signAdminSession(email);

    const response = NextResponse.json(
      { success: true, message: "Connexion réussie." },
      { status: 200 }
    );

    response.cookies.set(cookieName, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/login error:", error);

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}