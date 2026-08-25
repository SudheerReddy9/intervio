import { NextResponse } from "next/server";
import db from "@/lib/db";
import { ResultSetHeader } from "mysql2";

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
        const [results] = await db.execute<ResultSetHeader>(
            `INSERT INTO Interviews
    (questions, answers, status)
    VALUES(?,?,?)`,
            [
                JSON.stringify(questions),
                JSON.stringify(answers),
                'pending_evaluation'
            ],
        );
        const interviewId = results.insertId;
        console.log("Interview saved:", results);
        console.log("Interview data:", body);
        return NextResponse.json({
            success: true,
            message: "Interview data received successfully",
            interviewId
        })
    } catch (error) {
        console.error('Saving the data have field', error)
        return NextResponse.json({
            success: false,
            message: 'Data cannot be saved'
        },
            { status: 500 }
        );
    }
}