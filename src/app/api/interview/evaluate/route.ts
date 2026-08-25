import { NextResponse } from "next/server";
import db from "@/lib/db";
import { generateInterviewFeedback } from "@/lib/generateInterviewFeedback";

export async function POST(request: Request) {
  const { answers, interviewId } = await request.json();

  if (!interviewId || !Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Interview ID and answers are required",
      },
      { status: 400 },
    );
  }



  try {
    const feedback = await generateInterviewFeedback(answers);

    await db.execute(
      `UPDATE Interviews
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
      feedback,
    });
  }
  catch (error: unknown) {
    console.error("Interview evaluation error:", error);

    try {
      await db.execute(
        `UPDATE Interviews
       SET status = ?
       WHERE id = ?`,
        ["evaluation_failed", interviewId],
      );
    } catch (dbError) {
      console.error(
        "Failed to update interview status:",
        dbError,
      );
    }

    if (
      error instanceof Error &&
      error.message.includes("429")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "AI usage limit reached. Please try again later.",
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to evaluate interview.",
      },
      { status: 500 },
    );
  }
}