import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const authorizedRoutes =
    /^\/(verify-email|welcome|onboarding|dashboard|ask-my-ai|recent-activity|moodframes|profile|settings)/;
  const nonAuthorizedRoutes =
    /^\/(login|create-account|forgot-password|reset-password|email-sent|oauth-verify)/;

  const url = req.nextUrl.clone();

  if (authorizedRoutes.test(url.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (nonAuthorizedRoutes.test(url.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
