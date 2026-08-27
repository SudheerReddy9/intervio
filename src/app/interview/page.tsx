"use client";
import QuestionCard from "@/features/speech/components/QuestionCard";
import SpeechRecorder from "@/features/speech/components/SpeechRecorder";
import { Box, Button, CircularProgress, Container, LinearProgress, Typography } from "@mui/material";
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
  const [isEvaluating, setIsEvaluating] = useState(false)
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
    interviewAnswers: { question: string; answer: string }[]
  ) => {
    try {
      const response = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: interviewAnswers,
        }),
      });

      const data = await response.json();

      console.log("Final evaluation:", data);

      if (!response.ok || !data.success) {
        console.error("Evaluation failed:", data.message);
        return false;
      }

      sessionStorage.setItem(
        "interviewFeedback",
        JSON.stringify(data.feedback)
      );

      return true;
    } catch (error) {
      console.error("Evaluation failed:", error);
      return false;
    }
  };
  // const saveInterview = async (
  //   InterviewAnswers: { question: string; answer: string }[],
  // ) => {
  //   try {
  //     const response = await fetch('/api/interview/save', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         questions,
  //         answers: InterviewAnswers
  //       })
  //     });
  //     const data = await response.json();

  //     console.log("Save interview response:", data);

  //     return data;
  //   } catch (error) {
  //     console.error("Failed to save interview:", error);
  //     throw error
  //   }
  // }
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
      setIsEvaluating(true);

      const evaluationSuccess =
        await evaluateInterview(updatedAnswers);

      if (!evaluationSuccess) {
        setIsEvaluating(false);
        console.error("Interview evaluation failed");
        return;
      }

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

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,

          display: "flex",
          justifyContent: "flex-end",

          mt: 2,
          py: 2,
          px: {
            xs: 1,
            sm: 2,
          },


          backdropFilter: "blur(10px)",

          borderTop: "1px solid #E2E8F0",
        }}
      >
        <Button
          variant="contained"
          disabled={!transcript.trim()}
          onClick={handleNextQuestion}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },

            minWidth: {
              sm: 180,
            },

            py: 1.4,
            px: 4,

            borderRadius: 2.5,

            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.95rem",

            boxShadow: transcript.trim()
              ? "0 8px 20px rgba(37, 99, 235, 0.20)"
              : "none",
          }}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </Button>
        {isEvaluating && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              px: 2,

              bgcolor: "rgba(2, 6, 23, 0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,

                bgcolor: "#FFFFFF",

                borderRadius: 4,

                p: {
                  xs: 3,
                  sm: 4,
                },

                textAlign: "center",

                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.45)",
              }}
            >
              <Box
                sx={{
                  width: 68,
                  height: 68,

                  mx: "auto",
                  mb: 2.5,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 3,
                  bgcolor: "#EEF2FF",
                }}
              >
                <CircularProgress size={32} />
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: "1.4rem",
                    sm: "1.65rem",
                  },

                  fontWeight: 800,
                  color: "#0F172A",
                }}
              >
                Analyzing your interview...
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,

                  color: "#64748B",
                  lineHeight: 1.7,
                }}
              >
                YourCareerForge is reviewing your answers
                and preparing personalized feedback.
              </Typography>

              <LinearProgress
                sx={{
                  mt: 3,

                  height: 7,
                  borderRadius: 10,

                  bgcolor: "#E2E8F0",

                  "& .MuiLinearProgress-bar": {
                    borderRadius: 10,

                    background:
                      "linear-gradient(90deg, #2563EB, #7C3AED)",
                  },
                }}
              />

              <Box
                sx={{
                  mt: 3,
                  p: 2,

                  bgcolor: "#F8FAFC",

                  border: "1px solid #E2E8F0",
                  borderRadius: 2.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#475569",
                    fontWeight: 500,
                  }}
                >
                  ✨ Reviewing communication, technical
                  knowledge, confidence, and answer quality
                </Typography>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 2,
                  color: "#94A3B8",
                }}
              >
                Your results will appear automatically when
                they&apos;re ready.
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
