import { NextRequest, NextResponse } from "next/server";

export function verifyAdmin(req: NextRequest) {
    const ADMIN_KEY = process.env.ADMIN_KEY;

    const cookie = req.cookies.get("admin_key");

    if (cookie?.value === ADMIN_KEY) {
        return NextResponse.next();
    }

    const urlKey = req.nextUrl.searchParams.get("key");

    if (urlKey === ADMIN_KEY) {
        const res = NextResponse.redirect(req.nextUrl.pathname);

        res.cookies.set("admin_key", ADMIN_KEY, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return res;
    }

    // 3) deny
    return NextResponse.next({
        status: 404,
    });
}
