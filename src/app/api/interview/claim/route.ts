import { NextResponse } from "next/server";
import { createHash } from "crypto";
import type { ResultSetHeader } from "mysql2";

import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Authentication required",
                },
                { status: 401 }
            );
        }

        const { interviewId, claimToken } = await request.json();

        const parsedInterviewId = Number(interviewId);

        if (
            !Number.isInteger(parsedInterviewId) ||
            parsedInterviewId <= 0 ||
            typeof claimToken !== "string" ||
            claimToken.trim().length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Valid interview ID and claim token are required",
                },
                { status: 400 }
            );
        }

        const claimTokenHash = createHash("sha256")
            .update(claimToken)
            .digest("hex");

        const [result] = await db.execute<ResultSetHeader>(
            `
        UPDATE interviews
        SET
          user_id = ?,
          claim_token_hash = NULL
        WHERE id = ?
          AND claim_token_hash = ?
          AND user_id IS NULL
          AND status = 'completed'
      `,
            [
                user.id,
                parsedInterviewId,
                claimTokenHash,
            ]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Interview could not be claimed",
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Interview claimed successfully",
            interviewId: parsedInterviewId,
        });
    } catch (error) {
        console.error("Interview claim error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to claim interview",
            },
            { status: 500 }
        );
    }
}