import db from "@/lib/db";
import { createHash, randomInt } from "crypto";
import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server"
import { Resend } from 'resend'
interface UserRow extends RowDataPacket {
    id: number;
}
const resend = new Resend(process.env.RESEND_API_KEY)
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, purpose, name } = body
        if (!email || typeof email !== 'string') {
            return NextResponse.json({
                success: false,
                message: 'Email is required'
            },
                {
                    status: 400
                },);
        }
        if (purpose !== 'register' && purpose !== 'login') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid authentication Purpose'
                },
                { status: 400 }
            )
        }
        if (purpose === "register" && (!name || typeof name !== "string")) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name is required for registration",
                },
                { status: 400 }
            );
        }
        const [users] = await db.execute<UserRow[]>(
            `SELECT id 
FROM users
WHERE email = ?
LIMIT 1
`, [email],
        );
        const userExists = users.length > 0
        if (purpose === 'register' && userExists) {
            return NextResponse.json({
                success: false,
                message: 'An account with this email already exist. Please sign In'
            },
                { status: 409 }
            )
        }
        if (purpose === 'login' && !userExists) {
            return NextResponse.json({
                success: false,
                message: 'No account with this email is found. Please create an account',
            },
                {
                    status: 404
                }
            )
        }
        const otp = randomInt(100000, 1000000).toString()
        const otpHash = createHash('sha256').update(otp).digest('hex')
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await db.execute(
            `DELETE FROM otp_verifications
            WHERE email = ?`,
            [email],
        );
        await db.execute(
            `INSERT INTO otp_verifications
   (email, otp_hash, expires_at, attempt_count, purpose, name)
   VALUES (?, ?, ?, ?, ?, ?)`,
            [
                email,
                otpHash,
                expiresAt,
                0,
                purpose,
                purpose === "register" ? name.trim() : null,
            ]
        );

        const { data, error } = await resend.emails.send({
            from: "YourCareerForge <noreply@yourcareerforge.com>",
            to: email,
            subject: 'Your Verification Code',
            html: `
            <h2>Email Verification</h2>
            <p>Your Verifiaction code is:</p>
            <h1>${otp}</h1>
            <p>This code is valid for only 10 minutes</p>
            `,
        });
        if (error) {
            console.log('Resend Error:', error)
            return NextResponse.json({
                success: false,
                message: 'Failed to send Verification Email'
            },
                { status: 500 }
            )
        }
        console.log("Email sent:", data);
        console.log("OTP:", otp);
        console.log("OTP Hash:", otpHash);
        console.log("Expires:", expiresAt);
        return NextResponse.json({
            success: true,
            message: 'OTP request received'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to send verification code'
        },
            { status: 500 }
        )
    }
}