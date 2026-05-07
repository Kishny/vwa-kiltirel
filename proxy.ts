import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";

const NO_STORE = "no-store, no-cache, must-revalidate, private";

function next(noCache = false) {
  const res = NextResponse.next();
  if (noCache) res.headers.set("Cache-Control", NO_STORE);
  return res;
}

async function isAdminAuthenticated(request: NextRequest) {
  const cookieName = process.env.ADMIN_COOKIE_NAME || "vwa_admin_session";
  const session = request.cookies.get(cookieName)?.value;

  return verifyAdminSession(session);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = await isAdminAuthenticated(request);

  if (pathname.startsWith("/admin/login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return next(true);
  }

  if (pathname.startsWith("/api/admin/login")) {
    return next();
  }

  if (pathname.startsWith("/api/admin/logout")) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Non autorisé." },
        { status: 401 }
      );
    }
    return next(true);
  }

  if (pathname.startsWith("/api/admin")) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Non autorisé." },
        { status: 401 }
      );
    }
    return next(true);
  }

  const protectedEventInscriptionApi =
    pathname.startsWith("/api/event-inscriptions/") &&
    !pathname.endsWith("/api/event-inscriptions");

  if (protectedEventInscriptionApi && !isAuthenticated) {
    return NextResponse.json(
      { success: false, error: "Non autorisé." },
      { status: 401 }
    );
  }

  return next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/event-inscriptions/:path*"],
};