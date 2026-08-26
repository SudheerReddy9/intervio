import db from "@/lib/db";
import { generateInterviewFeedback } from "@/lib/generateInterviewFeedback";
import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

interface InterviewRow extends RowDataPacket {
    id: number;
    status: string;
    answers: unknown;
    retry_count: number
}
export async function POST(request: Request) {
    try {
        const { interviewId } = await request.json();
        if (!interviewId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'InterviewId ID is required',
                },
                { status: 400 }
            )
        }
        const [rows] = await db.execute<InterviewRow[]>(
            `SELECT id, status, answers, retry_count
       FROM Interviews
       WHERE id = ?`,
            [interviewId],
        )
        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Interview not found'
                },
                { status: 404 }
            )
        }
        const interview = rows[0]
        if (interview.status !== "evaluation_failed") {
            return NextResponse.json(
                {
                    success: false,
                    message: "This interview does not need to be retried",
                },
                { status: 400 },
            );
        }
        if (interview.retry_count >= 3) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Maximum retry attempts reached",
                },
                { status: 429 },
            );
        }
        const answers = interview.answers;

        if (!Array.isArray(answers)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Saved interview answers are invalid",
                },
                { status: 500 },
            );
        }
        await db.execute(
            `UPDATE interviews
   SET retry_count = retry_count + 1,
       last_retry_at = CURRENT_TIMESTAMP
   WHERE id = ?`,
            [interviewId],
        );
        const feedback = await generateInterviewFeedback(answers);
        await db.execute(
            `UPDATE interviews
   SET feedback = ?, status = ?
   WHERE id = ?`,
            [
                JSON.stringify(feedback),
                "completed",
                interviewId,
            ],
        );
        return NextResponse.json({
            success: true,
            message: "Interview evaluation retried successfully",
            feedback,
        });
    } catch (error) {
        console.error('Retry interview error', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to retrive interview',
            },
            { status: 500 }
        )
    }
}