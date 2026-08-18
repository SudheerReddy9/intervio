import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resume = formData.get("resume");

    if (!(resume instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume is required",
        },
        { status: 400 },
      );
    }

    if (resume.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF files are allowed",
        },
        { status: 400 },
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (resume.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume must be smaller than 5 MB",
        },
        { status: 400 },
      );
    }
    const arrayBuffer = await resume.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const base64Pdf = buffer.toString("base64");

    console.log("PDF Buffer:", buffer.length);
    console.log("Base64 length:", base64Pdf.length);
    console.time('resume-ai')
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64Pdf,
          },
        },
        {
          text: `
You are an experienced technical interviewer.

Analyze the candidate's resume and determine their primary professional
role, technical domain, experience level, skills, and areas of expertise.

Act as an interviewer appropriate for that candidate's background.

For example:
- Frontend candidate → Frontend interviewer
- Backend candidate → Backend interviewer
- AI/ML candidate → AI/ML interviewer
- Data Science candidate → Data Science interviewer
- DevOps candidate → DevOps/Cloud interviewer
- Full Stack candidate → Full Stack interviewer
- Student/Fresher → Entry-level interviewer

Generate exactly 8 interview questions specifically based on the candidate's resume.

Focus on:
- Work experience
- Projects
- Technical skills
- Technologies mentioned
- Responsibilities
- Achievements
- Relevant fundamentals for their field

Do not ask questions about technologies or experience that are not
supported by the resume.

Return ONLY valid JSON in the required format.


{
 "questions": [
    {
      "question": "",
      "category": ""
    }
  ]
}
`,
        },
      ],
    });
    console.timeEnd("resume-ai")
    const text = response.text;

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemini did not return questions",
        },
        { status: 500 },
      );
    }

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanedText);
    const fixedQuestions = [
      {
        id: 1,
        question: "Tell me about yourself and walk me through your experience.",
        category: "Introduction",
      },
      {
        id: 2,
        question:
          "What are your key strengths, and why do you think you're a good fit for this role?",
        category: "Introduction",
      },
    ];
    const resumeQuestions = result.questions.map(
      (item: { question: string; category: string }, index: number) => ({
        id: index + 3,
        question: item.question,
        category: item.category,
      }),
    );

    const questions = [
      ...fixedQuestions,
      ...resumeQuestions,
    ];

    return NextResponse.json({
      success: true,
      message: "Interview questions generated successfully",
      fileName: resume.name,
      questions,
    });
  }
  catch (error: unknown) {
    console.error("Resume processing error:", error);

    if (
      error instanceof Error &&
      error.message.includes("503")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "AI service is currently busy. Please try again in a moment.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process resume.",
      },
      { status: 500 }
    );
  }
}
