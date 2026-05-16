import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuth = !!req.auth;
  
  // Tentukan file publik secara eksplisit
  const isPublicFile = nextUrl.pathname.endsWith('.png') || 
                       nextUrl.pathname.endsWith('.jpg') || 
                       nextUrl.pathname.endsWith('.svg') || 
                       nextUrl.pathname.endsWith('.ico') || 
                       nextUrl.pathname.endsWith('.txt') || 
                       nextUrl.pathname.endsWith('.xml');

  if (isPublicFile) {
    return NextResponse.next();
  }

  const isAuthPage = nextUrl.pathname.startsWith("/auth");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Jalankan middleware untuk semua rute KECUALI aset internal Next.js
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
