import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";

function isAdminAuthenticated(request: NextRequest) {
  const cookieName = process.env.ADMIN_COOKIE_NAME || "vwa_admin_session";
  const session = request.cookies.get(cookieName)?.value;

  return verifyAdminSession(session);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = isAdminAuthenticated(request);

  // ==============================
  // PAGES ADMIN
  // ==============================
  if (pathname.startsWith("/admin/login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // ==============================
  // API ADMIN
  // ==============================
  if (pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin/logout")) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Non autorisé." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Non autorisé." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // ==============================
  // OPTION BONUS :
  // protéger aussi certaines routes inscriptions sensibles
  // ==============================
  const protectedEventInscriptionApi =
    pathname.startsWith("/api/event-inscriptions/") &&
    !pathname.endsWith("/api/event-inscriptions");

  if (protectedEventInscriptionApi && !isAuthenticated) {
    return NextResponse.json(
      { success: false, error: "Non autorisé." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/event-inscriptions/:path*"],
};