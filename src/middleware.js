import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("jwtToken")?.value;
    // Public routes
    const publicPaths = ["/login", "/signup"];
    // Bypass middleware for public paths

    if(pathname === "/"){
        if(token)
            return NextResponse.redirect(new URL('/admin', request.url));
        else{
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    if (publicPaths.includes(pathname)) {
        if (token && pathname !== "/signup") {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // Protected routes
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|api|public).*)"]
}
