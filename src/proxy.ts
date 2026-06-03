import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/admin-panel/:path*"],
};

export function proxy(req: NextRequest) {
    const ADMIN_KEY = process.env.ADMIN_KEY!;
    const url = req.nextUrl;

    const cookieVal = req.cookies.get("admin_key")?.value;
    if (cookieVal === ADMIN_KEY) {
        return NextResponse.next();
    }

    const keyFromUrl = url.searchParams.get("key");
    if (keyFromUrl === ADMIN_KEY) {
        const resUrl = url.clone();
        resUrl.searchParams.delete("key");

        const res = NextResponse.redirect(resUrl);

        res.cookies.set("admin_key", ADMIN_KEY, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    }

    const notFoundUrl = url.clone();
    notFoundUrl.pathname = "/404";
    notFoundUrl.search = "";
    return NextResponse.rewrite(notFoundUrl);
}
