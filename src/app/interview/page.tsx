'use client';
import FeedbackCard from "@/components/FeedbackCard";
import QuestionCard from "@/features/speech/components/QuestionCard";
import SpeechRecorder from "@/features/speech/components/SpeechRecorder";
import { resumeQuestions } from "@/features/speech/data/resumeQuestion";
import { InterviewFeedback } from "@/features/speech/types";
import { Box, Button, Container } from "@mui/material";
import { useState } from "react";

export default function InterviewPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [transcript, setTranscript] = useState("");
    const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
    const handleNextQuestion = () => {
        if (currentQuestion < resumeQuestions.length - 1) {
            setCurrentQuestion((previous) => previous + 1);
        }
    };
    const evaluateAnswer = async () => {
        if (!transcript.trim()) {
            return;
        }

        try {
            const response = await fetch("/api/interview/evaluate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: resumeQuestions[currentQuestion].question,
                    answer: transcript,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setFeedback(data.feedback);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container>
            <QuestionCard
                question={resumeQuestions[currentQuestion].question}
                questionNumber={currentQuestion + 1}
                totalQuestions={resumeQuestions.length}
            />
            <SpeechRecorder
                onTranscriptChange={setTranscript}
            />
            <FeedbackCard feedback={feedback} />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                }}
            >
                <Button
                    variant="contained"
                    disabled={!transcript.trim()}
                    onClick={evaluateAnswer}
                >
                    Evaluate Answer
                </Button>
                <Button
                    onClick={handleNextQuestion}
                >
                    Next Question
                </Button>
            </Box>
        </Container>
    );
}