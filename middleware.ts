import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isAdminMgmtRoute = nextUrl.pathname.startsWith("/dashboard/admin-management");
  const isCustomerRoute = nextUrl.pathname.startsWith("/my-orders");

  // Jika belum login dan mencoba mengakses route yang diproteksi
  if (!isLoggedIn) {
    if (isDashboardRoute || isCustomerRoute) {
      const loginUrl = new URL("/login", nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Jika sudah login dan mengakses /login atau /register
  if (isAuthRoute) {
    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }
    return NextResponse.redirect(new URL("/my-orders", nextUrl.origin));
  }

  // Proteksi Route Staf (/dashboard)
  if (isDashboardRoute) {
    if (role === "CUSTOMER") {
      return NextResponse.redirect(new URL("/my-orders", nextUrl.origin));
    }
    // Proteksi khusus Super Admin (/dashboard/admin-management)
    if (isAdminMgmtRoute && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }
  }

  // Proteksi Route Customer (/my-orders)
  if (isCustomerRoute) {
    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
