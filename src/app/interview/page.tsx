"use client";
import QuestionCard from "@/features/speech/components/QuestionCard";
import SpeechRecorder from "@/features/speech/components/SpeechRecorder";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
}

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([]);
  const router = useRouter();
  const storedQuestions = useSyncExternalStore(
    () => () => { },
    () => sessionStorage.getItem("interviewQuestions"),
    () => null,
  );

  const questions: InterviewQuestion[] = storedQuestions
    ? JSON.parse(storedQuestions)
    : [];

  // const handleNextQuestion = () => {
  //   if (currentQuestion < questions.length - 1) {
  //     setCurrentQuestion((previous) => previous + 1);
  //     // setFeedback(null);
  //     setTranscript("");
  //   }
  // };
  const evaluateInterview = async (
    interviewAnswers: { question: string; answer: string }[],
    interviewId: number
  ) => {
    try {
      const response = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: interviewAnswers,
          interviewId
        }),
      });

      const data = await response.json();

      console.log("Final evaluation:", data);

      if (data.success) {
        sessionStorage.setItem(
          "interviewFeedback",
          JSON.stringify(data.feedback),
        );

        console.log("Interview feedback:", data.feedback);
      }
    } catch (error) {
      console.error("Evaluation failed:", error);
    }
  };
  const saveInterview = async (
    InterviewAnswers: { question: string; answer: string }[],
  ) => {
    try {
      const response = await fetch('/api/interview/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions,
          answers: InterviewAnswers
        })
      });
      const data = await response.json();

      console.log("Save interview response:", data);

      return data;
    } catch (error) {
      console.error("Failed to save interview:", error);
      throw error
    }
  }
  const handleNextQuestion = async () => {
    console.log("Next/Finish button clicked");
    console.log("Transcript:", transcript);
    if (!transcript.trim()) {
      return;
    }

    const currentAnswer = {
      question: questions[currentQuestion].question,
      answer: transcript,
    };

    const updatedAnswers = [
      ...answers,
      currentAnswer,
    ];

    setAnswers(updatedAnswers);

    const isLastQuestion =
      currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      const savedInterview = await saveInterview(updatedAnswers);

      if (!savedInterview.success) {
        console.error("Interview could not be saved");
        return;
      }

      await evaluateInterview(
        updatedAnswers,
        savedInterview.interviewId,
      );

      router.push("/interview/results");

      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setTranscript("");
  };
  if (questions.length === 0) {
    return (
      <Container sx={{ mt: 5 }}>
        No interview questions found. Please upload your resume first.
      </Container>
    );
  }
  return (
    <Container>
      <QuestionCard
        question={questions[currentQuestion].question}
        questionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
      />
      <SpeechRecorder
        questionId={questions[currentQuestion].id}
        onTranscriptChange={setTranscript}
      />
      {/* <FeedbackCard feedback={feedback} /> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          my: 2,
        }}
      >
        <Button
          variant="contained"
          disabled={!transcript.trim()}
          onClick={handleNextQuestion}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </Button>
      </Box>
    </Container>
  );
}
