import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.includes("/login")) {
    const token = req.cookies.get("adminToken")?.value || "";

    try {
      jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
