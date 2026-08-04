'use client';
import QuestionCard from "@/features/speech/components/QuestionCard";
import SpeechRecorder from "@/features/speech/components/SpeechRecorder";
import { resumeQuestions } from "@/features/speech/data/resumeQuestion";
import { Box, Button, Container } from "@mui/material";
import { useState } from "react";

export default function InterviewPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    return (
        <Container>
            <QuestionCard
                question={resumeQuestions[currentQuestion].question}
                questionNumber={currentQuestion + 1}
                totalQuestions={resumeQuestions.length}
            />
            <SpeechRecorder />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                }}
            >
                <Button
                    onClick={() => {
                        if (currentQuestion < resumeQuestions.length - 1) {
                            setCurrentQuestion(currentQuestion + 1);
                        }
                    }}
                >
                    Next Question
                </Button>
            </Box>
        </Container>
    );
}