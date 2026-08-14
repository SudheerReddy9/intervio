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
You are a Senior Software Engineer conducting a technical interview.

Analyze the candidate's resume carefully.

Generate 8 interview questions based specifically on:
- Their work experience
- Projects
- Technical skills
- Technologies mentioned in the resume
- Responsibilities and achievements

Include a mix of:
- Resume-based questions
- Technical questions
- Project deep-dive questions
- Behavioral questions

Return ONLY valid JSON in this format:

{
  "questions": [
    {
      "question": "",
    }
  ]
}
`,
        },
      ],
    });
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

    // const parser = new PDFParse({
    //     data: buffer,
    // });

    // const result = await parser.getText();

    // await parser.destroy();

    // console.log(result.text);

    return NextResponse.json({
      success: true,
      message: "Interview questions generated successfully",
      fileName: resume.name,
      questions: result.questions,
    });
  } catch (error) {
    console.error("Resume parsing error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process resume",
      },
      { status: 500 },
    );
  }
}
