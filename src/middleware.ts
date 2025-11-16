// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname.startsWith("/auth/login");
  const isPublicAsset = pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.startsWith("/api");
  if (isPublicAsset) return NextResponse.next();

  const hasAuth = req.cookies.get("auth")?.value === "1";
  if (!hasAuth && !isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|api|static|favicon.ico).*)"] };
