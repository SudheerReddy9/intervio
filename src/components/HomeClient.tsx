
import { Box, Button, Divider, LinearProgress, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MicIcon from "@mui/icons-material/Mic";
export default function Home(): React.JSX.Element | null {
    const getScoreColor = (score: number) => {
        if (score < 30) return "#EF4444";
        if (score < 60) return "#F59E0B";
        if (score < 80) return "#3B82F6";
        return "#22C55E";
    };
    const demoFeedback = {
        communication: 29,
        technical: 46,
        confidence: 78,
    };
    return (
        <Box
            component="section"
            sx={{
                minHeight: "calc(100vh - 80px)",
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "2fr 1fr",
                },
                alignItems: "center",
                gap: 10,
                py: 10,
                px: {
                    xs: 2,
                    md: 4,
                },
                borderRadius: '25px',
                background:
                    "linear-gradient(180deg,#F8FAFC 0%,#EEF2FF 100%)",
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 999,
                        bgcolor: "#E0E7FF",
                        mb: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: "success.main",
                        }}
                    />

                    <Typography
                        sx={{
                            fontWeight: 600,
                        }}
                    >
                        AI-powered interview coach
                    </Typography>
                </Box>

                <Typography
                    variant="h1"
                    sx={{
                        fontSize: {
                            xs: 56,
                            md: 72,
                        },
                        fontWeight: 800,
                        lineHeight: 1.05,
                    }}
                >
                    Ace your next
                    <br />
                    <span style={{ color: "#2563EB" }}>
                        interview
                    </span>{" "}
                    with AI
                </Typography>

                <Typography
                    sx={{
                        mt: 3,
                        color: "text.secondary",
                        maxWidth: 520,
                        lineHeight: 1.8,
                        fontSize: "1.1rem",
                    }}
                >
                    Practice realistic mock interviews, receive instant AI feedback,
                    improve your communication skills, and track your progress—all in one place.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mt: 5,
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        href="/resume"
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                        }}
                    >
                        Start Free
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                        }}
                    >
                        Watch Demo
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    borderRadius: 1.5,
                    p: 4,
                    justifyContent: 'flex-end',
                    width: '455px',
                    boxShadow: 8,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                    }}
                >
                    🎤 Mock Interview
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography
                    color="text.secondary"
                >
                    Question 3 of 8
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mt: 1,
                        mb: 3,
                    }}
                >
                    Tell me about yourself.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <MicIcon color="error" />

                        <Typography
                            color="error.main"
                            sx={{ fontWeight: 600 }}
                        >
                            Recording...
                        </Typography>
                    </Box>

                    <Typography sx={{ fontWeight: 600 }}>
                        00:48
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                    }}
                >
                    🤖 AI Feedback
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>Communication</Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                            {demoFeedback.communication}%
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={demoFeedback.communication}
                        sx={{
                            mt: 1,
                            borderRadius: 10,
                            height: 8,
                            backgroundColor: "#E5E7EB",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: getScoreColor(demoFeedback.communication),
                                borderRadius: 10,
                            },
                        }}
                    />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>Technical</Typography>
                        <Typography sx={{ fontWeight: 600 }}>{demoFeedback.technical}%</Typography>
                    </Box>

                    <LinearProgress


                        variant="determinate"
                        value={demoFeedback.technical}
                        sx={{
                            mt: 1,
                            borderRadius: 10,
                            height: 8,
                            background: "#E5E7EB",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: getScoreColor(demoFeedback.technical),
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>Confidence</Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                            {demoFeedback.confidence}%
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={demoFeedback.communication}
                        sx={{
                            background: "#E5E7EB",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: getScoreColor(demoFeedback.confidence),
                            },
                            mt: 1,
                            borderRadius: 10,
                            height: 8,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
