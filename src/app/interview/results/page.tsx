"use client";

import {
    Box,
    Button,
    Container,
    LinearProgress,
    Typography,
} from "@mui/material";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

interface InterviewFeedback {
    overallScore: number;
    communication: number;
    technicalKnowledge: number;
    confidence: number;
    strengths: string[];
    improvements: string[];
    overallFeedback: string;
}
const getScoreColor = (score: number) => {
    if (score < 30) return "#EF4444";
    if (score < 60) return "#F59E0B";
    if (score < 80) return "#3B82F6";

    return "#22C55E";
};

const getScoreLabel = (score: number) => {
    if (score < 30) return "Needs Improvement";
    if (score < 60) return "Developing";
    if (score < 80) return "Good";
    if (score < 90) return "Strong";

    return "Excellent";
};

export default function InterviewResultsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] =
        useState<boolean | null>(null);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('/api/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    setIsAuthenticated(false);
                    return;
                }
                const data = await response.json()
                setIsAuthenticated(data.authenticated === true)
            } catch (error) {
                console.error(
                    'Failed to check authentication',
                    error
                );
                setIsAuthenticated(false)
            }
        }
        checkAuthentication();
    }, [])
    const storedFeedback = useSyncExternalStore(
        () => () => { },
        () => sessionStorage.getItem("interviewFeedback"),
        () => null
    );

    const feedback: InterviewFeedback | null =
        storedFeedback
            ? JSON.parse(storedFeedback)
            : null;
    console.log("Authenticated:", isAuthenticated);
    if (!feedback) {
        return (
            <Box
                sx={{
                    minHeight: "calc(100vh - 72px)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    background:
                        "linear-gradient(180deg, #0F172A 0%, #020617 100%)",
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
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            color: "#0F172A",
                        }}
                    >
                        No interview results found
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1.5,
                            color: "#64748B",
                            lineHeight: 1.6,
                        }}
                    >
                        Complete an interview first to generate your
                        personalized performance report.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => router.push("/resume")}
                        sx={{
                            mt: 3,
                            px: 4,
                            py: 1.3,

                            borderRadius: 2.5,

                            textTransform: "none",
                            fontWeight: 700,
                        }}
                    >
                        Start an Interview
                    </Button>
                </Box>
            </Box>
        );
    }

    const overallColor = getScoreColor(
        feedback.overallScore
    );

    const scores = [
        {
            label: "Communication",
            value: feedback.communication,
            description:
                "Clarity and structure of your responses",
        },
        {
            label: "Technical Knowledge",
            value: feedback.technicalKnowledge,
            description:
                "Depth and accuracy of your technical answers",
        },
        {
            label: "Confidence",
            value: feedback.confidence,
            description:
                "Confidence demonstrated in your responses",
        },
    ];

    return (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",

                py: {
                    xs: 5,
                    sm: 7,
                    md: 8,
                },

                px: {
                    xs: 1,
                    sm: 2,
                },

                background: `
          radial-gradient(
            circle at 50% 15%,
            rgba(79, 70, 229, 0.24) 0%,
            rgba(37, 99, 235, 0.08) 30%,
            transparent 50%
          ),
          linear-gradient(
            180deg,
            #0F172A 0%,
            #020617 100%
          )
        `,
            }}
        >
            <Container maxWidth="md">


                <Box
                    sx={{
                        textAlign: "center",

                        mb: {
                            xs: 4,
                            md: 5,
                        },
                    }}
                >
                    <Typography
                        sx={{
                            color: "#818CF8",

                            fontSize: "0.85rem",
                            fontWeight: 700,

                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}
                    >
                        AI Interview Analysis
                    </Typography>

                    <Typography
                        component="h1"
                        sx={{
                            mt: 1,

                            color: "#FFFFFF",

                            fontSize: {
                                xs: "2.1rem",
                                sm: "2.7rem",
                                md: "3.2rem",
                            },

                            fontWeight: 800,
                            lineHeight: 1.1,

                            letterSpacing: "-0.04em",
                        }}
                    >
                        Your Interview Results
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1.5,

                            mx: "auto",
                            maxWidth: 600,

                            color: "#94A3B8",

                            fontSize: {
                                xs: "0.95rem",
                                sm: "1.05rem",
                            },

                            lineHeight: 1.7,
                        }}
                    >
                        YourCareerForge analyzed your responses across
                        communication, technical knowledge, and confidence.
                    </Typography>
                </Box>

                {/* ================================= */}
                {/* RESULTS CARD */}
                {/* ================================= */}

                <Box
                    sx={{
                        bgcolor: "#FFFFFF",

                        borderRadius: {
                            xs: 3,
                            sm: 4,
                        },

                        p: {
                            xs: 2.5,
                            sm: 4,
                            md: 5,
                        },

                        border:
                            "1px solid rgba(255,255,255,0.15)",

                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.35)",
                    }}
                >


                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                            py: {
                                xs: 3,
                                sm: 4,
                            },

                            px: 2,

                            borderRadius: 3,

                            background:
                                "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)",

                            border: "1px solid #E2E8F0",
                        }}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: 135,
                                    sm: 155,
                                },

                                height: {
                                    xs: 135,
                                    sm: 155,
                                },

                                borderRadius: "50%",

                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",

                                bgcolor: "#FFFFFF",

                                border: `8px solid ${overallColor}`,

                                boxShadow:
                                    "0 15px 35px rgba(15,23,42,0.12)",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "2.2rem",
                                        sm: "2.7rem",
                                    },

                                    lineHeight: 1,

                                    fontWeight: 800,

                                    color: "#0F172A",
                                }}
                            >
                                {feedback.overallScore}%
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 0.8,

                                    color: "#64748B",

                                    fontWeight: 600,
                                }}
                            >
                                Overall Score
                            </Typography>
                        </Box>

                        {/* SCORE LABEL */}

                        <Typography
                            sx={{
                                mt: 2,

                                fontSize: "1.2rem",

                                fontWeight: 800,

                                color: overallColor,
                            }}
                        >
                            {getScoreLabel(
                                feedback.overallScore
                            )}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.5,

                                color: "#64748B",
                            }}
                        >
                            Overall interview performance
                        </Typography>
                    </Box>

                    {/* ================================= */}
                    {/* CATEGORY SCORES */}
                    {/* ================================= */}

                    <Typography
                        sx={{
                            mt: 4,
                            mb: 2,

                            fontSize: "1.15rem",

                            fontWeight: 800,

                            color: "#0F172A",
                        }}
                    >
                        Performance Breakdown
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(3, 1fr)",
                            },

                            gap: 2,
                        }}
                    >
                        {scores.map((score) => {
                            const scoreColor =
                                getScoreColor(score.value);

                            return (
                                <Box
                                    key={score.label}
                                    sx={{
                                        p: 2.5,

                                        borderRadius: 3,

                                        bgcolor: "#F8FAFC",

                                        border:
                                            "1px solid #E2E8F0",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",

                                            justifyContent:
                                                "space-between",

                                            alignItems: "center",

                                            gap: 1,

                                            mb: 1.5,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,

                                                color: "#334155",

                                                fontSize:
                                                    "0.95rem",
                                            }}
                                        >
                                            {score.label}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: 800,

                                                color:
                                                    scoreColor,
                                            }}
                                        >
                                            {score.value}%
                                        </Typography>
                                    </Box>

                                    <LinearProgress
                                        variant="determinate"
                                        value={score.value}
                                        sx={{
                                            height: 8,

                                            borderRadius: 10,

                                            bgcolor: "#E2E8F0",

                                            "& .MuiLinearProgress-bar":
                                            {
                                                borderRadius: 10,

                                                bgcolor:
                                                    scoreColor,
                                            },
                                        }}
                                    />

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 1.5,

                                            color: "#64748B",

                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {score.description}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                    {isAuthenticated === true && (


                        <><Box
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

                            {/* STRENGTHS */}

                            <Box
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        sm: 3,
                                    },

                                    borderRadius: 3,

                                    bgcolor: "#F0FDF4",

                                    border: "1px solid #BBF7D0",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: 1,

                                        mb: 2,
                                    }}
                                >
                                    <CheckCircleOutlineRoundedIcon
                                        sx={{
                                            color: "#16A34A",
                                        }} />

                                    <Typography
                                        sx={{
                                            fontWeight: 800,

                                            color: "#166534",

                                            fontSize: "1.05rem",
                                        }}
                                    >
                                        Your Strengths
                                    </Typography>
                                </Box>

                                {feedback.strengths?.length >
                                    0 ? (
                                    feedback.strengths.map(
                                        (strength, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",

                                                    alignItems: "flex-start",

                                                    gap: 1,

                                                    mb: index ===
                                                        feedback
                                                            .strengths
                                                            .length -
                                                        1
                                                        ? 0
                                                        : 1.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,

                                                        mt: "9px",

                                                        flexShrink: 0,

                                                        borderRadius: "50%",

                                                        bgcolor: "#22C55E",
                                                    }} />

                                                <Typography
                                                    sx={{
                                                        color: "#374151",

                                                        lineHeight: 1.6,

                                                        fontSize: "0.95rem",
                                                    }}
                                                >
                                                    {strength}
                                                </Typography>
                                            </Box>
                                        )
                                    )
                                ) : (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#64748B",
                                        }}
                                    >
                                        No specific strengths were
                                        returned.
                                    </Typography>
                                )}
                            </Box>

                            {/* IMPROVEMENTS */}

                            <Box
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        sm: 3,
                                    },

                                    borderRadius: 3,

                                    bgcolor: "#FFF7ED",

                                    border: "1px solid #FED7AA",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: 1,

                                        mb: 2,
                                    }}
                                >
                                    <TrendingUpRoundedIcon
                                        sx={{
                                            color: "#EA580C",
                                        }} />

                                    <Typography
                                        sx={{
                                            fontWeight: 800,

                                            color: "#9A3412",

                                            fontSize: "1.05rem",
                                        }}
                                    >
                                        Areas to Improve
                                    </Typography>
                                </Box>

                                {feedback.improvements
                                    ?.length > 0 ? (
                                    feedback.improvements.map(
                                        (
                                            improvement,
                                            index
                                        ) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",

                                                    alignItems: "flex-start",

                                                    gap: 1,

                                                    mb: index ===
                                                        feedback
                                                            .improvements
                                                            .length -
                                                        1
                                                        ? 0
                                                        : 1.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,

                                                        mt: "9px",

                                                        flexShrink: 0,

                                                        borderRadius: "50%",

                                                        bgcolor: "#F97316",
                                                    }} />

                                                <Typography
                                                    sx={{
                                                        color: "#374151",

                                                        lineHeight: 1.6,

                                                        fontSize: "0.95rem",
                                                    }}
                                                >
                                                    {improvement}
                                                </Typography>
                                            </Box>
                                        )
                                    )
                                ) : (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#64748B",
                                        }}
                                    >
                                        No specific improvements were
                                        returned.
                                    </Typography>
                                )}
                            </Box>
                        </Box><Box
                            sx={{
                                mt: 4,

                                p: {
                                    xs: 2.5,
                                    sm: 3,
                                },

                                borderRadius: 3,

                                bgcolor: "#F8FAFC",

                                border: "1px solid #E2E8F0",
                            }}
                        >
                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: 1,

                                        mb: 1.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 38,
                                            height: 38,

                                            display: "flex",

                                            alignItems: "center",

                                            justifyContent: "center",

                                            borderRadius: 2,

                                            bgcolor: "#EEF2FF",

                                            color: "#4F46E5",
                                        }}
                                    >
                                        <AutoAwesomeRoundedIcon
                                            fontSize="small" />
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: 800,

                                            color: "#0F172A",

                                            fontSize: "1.05rem",
                                        }}
                                    >
                                        Your AI Feedback
                                    </Typography>
                                </Box>

                                <Typography
                                    sx={{
                                        color: "#475569",

                                        lineHeight: 1.8,

                                        fontSize: {
                                            xs: "0.95rem",
                                            sm: "1rem",
                                        },
                                    }}
                                >
                                    {feedback.overallFeedback}
                                </Typography>
                            </Box></>
                    )}
                    {isAuthenticated === false && (
                        <Box
                            sx={{
                                mt: 4,
                                p: {
                                    xs: 3,
                                    sm: 4,
                                },
                                textAlign: "center",
                                borderRadius: 3,
                                background:
                                    "linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 100%)",
                                border: "1px solid #C7D2FE",
                            }}
                        >
                            <AutoAwesomeRoundedIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#4F46E5",
                                }}
                            />

                            <Typography
                                sx={{
                                    mt: 1.5,
                                    fontSize: {
                                        xs: "1.25rem",
                                        sm: "1.45rem",
                                    },
                                    fontWeight: 800,
                                    color: "#0F172A",
                                }}
                            >
                                Unlock Your Full Interview Report
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    mx: "auto",
                                    maxWidth: 520,
                                    color: "#64748B",
                                    lineHeight: 1.7,
                                }}
                            >
                                Create a free account to see your strengths,
                                improvement areas, and personalized AI feedback.
                            </Typography>

                            <Box
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    justifyContent: "center",
                                    gap: 1.5,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() =>
                                        router.push(
                                            "/register?returnTo=/interview/results"
                                        )
                                    }
                                    sx={{
                                        px: 3.5,
                                        py: 1.2,
                                        borderRadius: 2.5,
                                        textTransform: "none",
                                        fontWeight: 700,
                                    }}
                                >
                                    Create Free Account
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() =>
                                        router.push(
                                            "/login?returnTo=/interview/results"
                                        )
                                    }
                                    sx={{
                                        px: 3.5,
                                        py: 1.2,
                                        borderRadius: 2.5,
                                        textTransform: "none",
                                        fontWeight: 700,
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    )}
                    <Box
                        sx={{
                            mt: 4,

                            pt: 4,

                            borderTop:
                                "1px solid #E2E8F0",

                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },

                            justifyContent: "center",

                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={
                                <ReplayRoundedIcon />
                            }
                            onClick={() =>
                                router.push("/resume")
                            }
                            sx={{
                                px: 4,

                                py: 1.4,

                                borderRadius: 2.5,

                                textTransform: "none",

                                fontWeight: 700,

                                boxShadow:
                                    "0 8px 20px rgba(37,99,235,0.20)",
                            }}
                        >
                            Practice Another Interview
                        </Button>

                        {isAuthenticated === true && (
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<DashboardRoundedIcon />}
                                onClick={() => router.push("/dashboard")}
                                sx={{
                                    px: 4,
                                    py: 1.4,
                                    borderRadius: 2.5,
                                    textTransform: "none",
                                    fontWeight: 700,
                                }}
                            >
                                Go to Dashboard
                            </Button>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}