"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

interface InterviewQuestion {
    id: number;
    question: string;
    category: string;
}

export default function QuestionsPage() {
    const [questions] = useState<InterviewQuestion[]>(() => {
        if (typeof window === "undefined") {
            return [];
        }

        const storedQuestions =
            sessionStorage.getItem("interviewQuestions");

        if (!storedQuestions) {
            return [];
        }

        return JSON.parse(storedQuestions);
    });

    const handleDownload = () => {
        const doc = new jsPDF();
        //doc Title 
        doc.setFontSize(20);
        doc.text('Personalized Interview Question', 20, 20)
        doc.setFontSize(18);
        doc.text('Interview questions based on resume', 20, 30)
        let yPosition = 45;
        questions.forEach((item, index) => {
            doc.setFontSize(12)

            const question = `${index + 1}. ${item.question}`;

            const lines = doc.splitTextToSize(
                question,
                170
            );

            doc.text(lines, 20, yPosition);
            yPosition += lines.length * 7 + 10;
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20
            }
        });

        doc.save("interview-questions.pdf");
    };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 8,
                px: 2,
                background: `
                radial-gradient(
                    circle at 50% 20%,
                    rgba(79, 70, 229, 0.22),
                    transparent 40%
                ),
                linear-gradient(180deg, #111827, #030712)
            `,
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: "white",
                        }}
                    >
                        Your Interview Questions
                    </Typography>

                    <Typography sx={{ color: "#94A3B8", mt: 1 }}>
                        Personalized from your resume using AI
                    </Typography>
                </Box>

                {/* Document */}
                <Box
                    sx={{
                        bgcolor: "white",
                        color: "#111827",
                        borderRadius: 2,
                        p: {
                            xs: 3,
                            md: 6,
                        },
                        maxWidth: 750,
                        mx: "auto",
                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.45)",
                    }}
                >

                    <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{
                            fontWeight: 800,
                            mb: 1,
                        }}
                    >
                        Questions for your upcoming interview.
                    </Typography>

                    {questions.map((item, index) => (
                        <Box
                            key={item.id}
                            sx={{
                                py: 3,
                                borderBottom:
                                    index !== questions.length - 1
                                        ? "1px solid #E5E7EB"
                                        : "none",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#4F46E5",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    mb: 1,
                                }}
                            >
                                {String(index + 1).padStart(2, "0")} •{" "}

                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 18,
                                    lineHeight: 1.6,
                                }}
                            >
                                {item.question}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4,
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleDownload}
                    >
                        Download PDF
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}