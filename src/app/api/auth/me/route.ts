import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                {
                    authenticated: false,
                    user: null,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                authenticated: true,
                user,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get current user error:", error);

        return NextResponse.json(
            {
                authenticated: false,
                user: null,
                message: "Failed to check authentication",
            },
            { status: 500 }
        );
    }
}