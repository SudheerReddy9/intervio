import { ai } from "./gemini";
interface InterviewAnswer {
    question: string;
    answer: string;
}
export async function generateInterviewFeedback(
    answers: InterviewAnswer[],
) {
    const prompt = `
You are an experienced technical interviewer evaluating a completed interview.

The candidate may come from any technical background, including frontend,
backend, full stack, AI/ML, data science, DevOps, cloud, software engineering,
or may be a student/fresher.

Determine the candidate's technical domain and expected experience level
from the interview questions and answers.

Evaluate the candidate according to the role, technologies, projects,
skills, and experience reflected in their interview.

Do not assume the candidate is a frontend engineer.

Interview Responses:
${JSON.stringify(answers, null, 2)}

Evaluate the candidate's overall interview performance based on:

1. Relevance of answers
2. Technical accuracy
3. Communication clarity
4. Confidence
5. Completeness
6. Consistency across answers
7. Understanding of technologies and concepts relevant to their background

Important:
The candidate's answers were captured using speech-to-text.

Do not penalize the candidate for:
- Minor speech-to-text transcription mistakes
- Accent-related recognition errors
- Missing punctuation
- Small grammatical mistakes
- Incorrectly transcribed words when the intended meaning is clear

Focus primarily on the candidate's understanding, reasoning, technical
knowledge, and ability to communicate their ideas.

Give constructive and actionable feedback.

All scores must be numbers from 0 to 100.

Return ONLY valid JSON in this exact format:

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


    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    const text = response.text;
    if (!text) {
        throw new Error('Gemini did not return any response')
    }

    const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    return JSON.parse(cleanedText);
}