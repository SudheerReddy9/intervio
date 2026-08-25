import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await db.query('SELECT 1')
        return NextResponse.json({
            success: true,
            message: 'MYSQL connected successfully'
        });

    } catch (error) {
        console.error('DataBase connection error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Database conneciton failed'
            },
            { status: 500 }
        )

    }
}
