import db from "@/lib/db";
import { createHash, randomBytes } from "crypto";
import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
interface OTPRow extends RowDataPacket {
    id: number;
    email: string;
    otp_hash: string;
    expires_at: Date;
    attempt_count: number;
    purpose: "register" | "login";
    name: string | null;
}
export async function POST(request: Request) {
    try {

        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({
                success: false,
                message: 'Email and Verification code are required'
            },
                { status: 400 }
            );
        }
        const normalizedEmail = String(email).trim().toLowerCase();
        const [rows] = await db.execute<OTPRow[]>(
            `SELECT id, email, otp_hash, expires_at,
       attempt_count, purpose, name
FROM otp_verifications
WHERE email = ?
LIMIT 1`,
            [normalizedEmail]
        )
        if (rows.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'NO Verification code found. Please request new code.',
            },
                { status: 404 })
        }
        const otpRecord = rows[0];
        const now = new Date();
        const expiresAt = new Date(otpRecord.expires_at)
        if (now > expiresAt) {
            await db.execute(
                `DELETE FROM otp_verifications where id = ?`,
                [otpRecord.id]
            )
            return NextResponse.json({
                success: false,
                message: 'Your OTP is expired. Please request new code.'
            },
                { status: 400 }
            )
        }

        if (otpRecord.attempt_count >= 5) {
            return NextResponse.json({
                success: false,
                message: 'Too many attempts. Please request new code'
            },
                { status: 429 }
            )
        }
        const enteredOTPhash = createHash("sha256")
            .update(String(otp))
            .digest("hex");
        if (enteredOTPhash !== otpRecord.otp_hash) {
            await db.execute(
                `UPDATE otp_verifications
                SET attempt_count =  attempt_count + 1
                WHERE id = ?`,
                [otpRecord.id]
            )
            return NextResponse.json({
                success: false,
                message: 'Invalid Verification code'
            },
                { status: 400 }
            )
        }
        if (otpRecord.purpose === "register") {
            if (!otpRecord.name) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Registration name is missing",
                    },
                    { status: 400 }
                );
            }

            await db.execute(
                `INSERT INTO users (name, email)
     VALUES (?, ?)`,
                [otpRecord.name, otpRecord.email]
            );
        }
        const [users] = await db.execute<RowDataPacket[]>(
            `SELECT id
   FROM users
   WHERE email = ?
   LIMIT 1`,
            [otpRecord.email]
        );

        if (users.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User account not found",
                },
                { status: 404 }
            );
        }

        const userId = users[0].id;
        const sessionToken = randomBytes(32).toString("hex");

        const sessionTokenHash = createHash("sha256")
            .update(sessionToken)
            .digest("hex");

        const sessionExpiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );
        await db.execute(
            `INSERT INTO sessions
   (user_id, token_hash, expires_at)
   VALUES (?, ?, ?)`,
            [
                userId,
                sessionTokenHash,
                sessionExpiresAt,
            ]
        );
        await db.execute(
            `DELETE FROM otp_verifications
   WHERE id = ?`,
            [otpRecord.id]
        );
        const response = NextResponse.json({
            success: true,
            message: 'verification Successful'
        },
            { status: 200 }
        );
        response.cookies.set("session_token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: sessionExpiresAt,
        });
        return response;
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            message: 'Failed to verify code'
        },
            { status: 500 }

        )
    }
}