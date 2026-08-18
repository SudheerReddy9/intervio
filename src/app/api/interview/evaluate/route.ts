import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(request: Request) {
  const { answers } = await request.json();

  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Interview answers are required",
      },
      { status: 400 },
    );
  }

  const prompt = `
You are a Senior Frontend Software Engineer evaluating a completed technical interview.

Review the candidate's full interview performance.

Interview Responses:
${JSON.stringify(answers, null, 2)}

Evaluate the candidate across the entire interview based on:

1. Relevance of answers.
2. Technical accuracy.
3. Communication clarity.
4. Confidence.
5. Completeness.
6. Consistency across answers.

Give constructive feedback based on the interview as a whole.

Return ONLY valid JSON in this format:

{
  "overallScore": 0,
  "communication": 0,
  "technicalKnowledge": 0,
  "confidence": 0,
  "strengths": [],
  "improvements": [],
  "overallFeedback": ""
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemini did not return any response.",
        },
        { status: 500 },
      );
    }

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const feedback = JSON.parse(cleanedText);

    return NextResponse.json({
      success: true,
      feedback,
    });
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