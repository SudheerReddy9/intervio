import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(request: Request) {
  const { question, answer } = await request.json();

  const prompt = `
You are a Senior Frontend Software Engineer conducting a technical interview.

Evaluate the candidate's answer professionally.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer based on:

1. Relevance to the question.
2. Technical accuracy.
3. Communication clarity.
4. Confidence.
5. Completeness.

Give constructive feedback.

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
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gemini is currently busy. Please try again.",
      },
      { status: 503 },
    );
  }
}
