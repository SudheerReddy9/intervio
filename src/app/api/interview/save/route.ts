import { NextResponse } from "next/server";
import db from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { createHash, randomBytes } from "crypto";

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { questions, answers } = body;

        if (
            !Array.isArray(questions) ||
            !Array.isArray(answers) ||
            questions.length === 0 ||
            answers.length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Questions and answers are required",
                },

                { status: 400 },
            );

        }
        const claimToken = randomBytes(32).toString('hex');
        const claimTokenHash = createHash('sha256').update(claimToken).digest('hex')
        const [results] = await db.execute<ResultSetHeader>(
            `INSERT INTO interviews
    (questions, answers, status, claim_token_hash)
    VALUES(?,?,?,?)`,
            [
                JSON.stringify(questions),
                JSON.stringify(answers),
                'pending_evaluation',
                claimTokenHash
            ],
        );
        const interviewId = results.insertId;
        console.log("Interview saved:", results);
        console.log("Interview data:", body);
        return NextResponse.json({
            success: true,
            message: "Interview data received successfully",
            interviewId,
            claimToken
        })
    }
    catch (error: unknown) {
        console.error("INTERVIEW SAVE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Data cannot be saved",
            },
            { status: 500 }
        );
    }
}