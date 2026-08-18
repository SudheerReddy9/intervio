"use client";

import {
    Box,
    Container,
    Typography,
} from "@mui/material";
import { useSyncExternalStore } from "react";

interface InterviewFeedback {
    overallScore: number;
    communication: number;
    technicalKnowledge: number;
    confidence: number;
    strengths: string[];
    improvements: string[];
    overallFeedback: string;
}

export default function InterviewResultsPage() {
    const storedFeedback = useSyncExternalStore(
        () => () => { },
        () => sessionStorage.getItem("interviewFeedback"),
        () => null,
    );

    const feedback: InterviewFeedback | null = storedFeedback
        ? JSON.parse(storedFeedback)
        : null;
    if (!feedback) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography>
                    No interview results found.
                </Typography>
            </Container>
        );
    }
    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 8,
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
                        Interview Results
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            color: "#94A3B8",
                        }}
                    >
                        Your AI-powered interview performance report
                    </Typography>
                </Box>

                <Box
                    sx={{
                        bgcolor: "white",
                        borderRadius: 4,
                        p: 5,
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        Overall Score
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 64,
                            fontWeight: 800,
                            mt: 1,
                        }}
                    >
                        {feedback.overallScore}%
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(3, 1fr)",
                            },
                            gap: 2,
                            mt: 4,
                        }}
                    >
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: "#F8FAFC",
                            }}
                        >
                            <Typography color="text.secondary">
                                Communication
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                {feedback.communication}%
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: "#F8FAFC",
                            }}
                        >
                            <Typography color="text.secondary">
                                Technical Knowledge
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                {feedback.technicalKnowledge}%
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: "#F8FAFC",
                            }}
                        >
                            <Typography color="text.secondary">
                                Confidence
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                {feedback.confidence}%
                            </Typography>
                        </Box>

                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: 3,
                            mt: 4,
                        }}
                    >
                        {/* Strengths */}
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: "#F0FDF4",
                                border: "1px solid #BBF7D0",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                    color: "#166534",
                                    mb: 2,
                                }}
                            >
                                Strengths
                            </Typography>

                            {feedback.strengths.map((strength, index) => (
                                <Typography
                                    key={index}
                                    sx={{
                                        mb: 1,
                                        color: "#374151",
                                    }}
                                >
                                    {strength}
                                </Typography>
                            ))}
                        </Box>

                        {/* Improvements */}
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: "#FFF7ED",
                                border: "1px solid #FED7AA",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                    color: "#9A3412",
                                    mb: 2,
                                }}
                            >
                                Areas to Improve
                            </Typography>

                            {feedback.improvements.map((improvement, index) => (
                                <Typography
                                    key={index}
                                    sx={{
                                        mb: 1,
                                        color: "#374151",
                                    }}
                                >
                                    • {improvement}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 3,
                            bgcolor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Overall Feedback
                        </Typography>

                        <Typography
                            sx={{
                                color: "#475569",
                                lineHeight: 1.8,
                            }}
                        >
                            {feedback.overallFeedback}
                        </Typography>
                    </Box>
                </Box>
            </Container >
        </Box >
    );
}