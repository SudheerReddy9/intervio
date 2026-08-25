import db from "@/lib/db";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("session_token")?.value;

        if (sessionToken) {
            const tokenHash = createHash("sha256")
                .update(sessionToken)
                .digest("hex");

            await db.execute(
                `DELETE FROM sessions
         WHERE token_hash = ?`,
                [tokenHash]
            );
        }

        const response = NextResponse.json(
            {
                success: true,
                message: "Logged out successfully",
            },
            { status: 200 }
        );

        response.cookies.set("session_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to logout",
            },
            { status: 500 }
        );
    }
}