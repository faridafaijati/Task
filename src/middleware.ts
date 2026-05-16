import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return null;
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
