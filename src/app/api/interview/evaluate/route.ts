import { NextResponse } from "next/server";
import db from "@/lib/db";
import { generateInterviewFeedback } from "@/lib/generateInterviewFeedback";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

interface InterviewRow extends RowDataPacket {
  id: number;
  status: string;
}

export async function POST(request: Request) {
  try {
    const { answers, interviewId } = await request.json();

    if (
      !Number.isInteger(Number(interviewId)) ||
      !Array.isArray(answers) ||
      answers.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid interview ID and answers are required",
        },
        { status: 400 }
      );
    }

    // 1. Verify the interview actually exists
    const [interviews] = await db.execute<InterviewRow[]>(
      `
        SELECT id, status
        FROM interviews
        WHERE id = ?
        LIMIT 1
      `,
      [interviewId]
    );

    if (interviews.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview not found",
        },
        { status: 404 }
      );
    }

    const feedback = await generateInterviewFeedback(answers);

    const [result] = await db.execute<ResultSetHeader>(
      `
        UPDATE interviews
        SET
          feedback = ?,
          status = ?
        WHERE id = ?
      `,
      [
        JSON.stringify(feedback),
        "completed",
        interviewId,
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error("Interview result could not be saved");
    }

    return NextResponse.json(
      {
        success: true,
        interviewId,
        feedback,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Interview evaluation error:", error);

    if (
      error instanceof Error &&
      error.message.includes("429")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "AI usage limit reached. Please try again later.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to evaluate interview.",
      },
      { status: 500 }
    );
  }
}