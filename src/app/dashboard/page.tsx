
import { Box, Button, Chip, Typography } from "@mui/material";
import { theme } from "@/theme";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
interface InterviewFeedback {
    overallScore: number;
    communication: number;
    technicalKnowledge: number;
    confidence: number;
    strengths: string[];
    improvements: string[];
    overallFeedback: string;

}
interface InterviewRow extends RowDataPacket {
    id: number;
    feedback: InterviewFeedback;
    created_at: Date;
}
const DashboardPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }
    const [interviews] = await db.execute<InterviewRow[]>(
        `
        SELECT id, feedback, created_at
        FROM interviews
        WHERE user_id = ?
          AND status = 'completed'
          AND feedback IS NOT NULL
        ORDER BY created_at DESC
        LIMIT 10
    `,
        [user.id]
    );

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: theme.palette.background.default,
                p: 4,
            }}
        >
            <Typography variant="h4">
                Dashboard
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >


                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontSize: '48px'
                }}>
                    Welcome, {" "}
                </Typography >
                <Typography variant="h5"
                    sx={{
                        background:
                            "linear-gradient(90deg, #2563EB, #7C3AED)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 'bold',
                        fontSize: '48px'
                    }}
                >
                    {user.name.split(" ")[0]}!
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between'
                }}
            >
                <Typography sx={{ mt: 1, fontSize: '30px' }}>
                    Your account has been created successfully.
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 1, fontSize: '20px', }}
                    href="/resume"
                >
                    Start New Interview
                </Button>
            </Box>
            <Typography
                variant="h5"
                sx={{
                    mt: 5,
                    mb: 2,
                    fontWeight: 600,
                }}
            >
                Recent Interviews
            </Typography>
            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                {interviews.map((interview) => (
                    <Box
                        key={interview.id}
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                            },
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            boxShadow:
                                "0 8px 30px rgba(15, 23, 42, 0.06)",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Interview #{interview.id}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {new Date(
                                        interview.created_at
                                    ).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Chip label="Completed" color="success" size="small" />
                        </Box>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    lg: "repeat(4, 1fr)",
                                },
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: "background.default",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Overall Score
                                </Typography>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        mt: 1,
                                        fontWeight: 700,
                                    }}
                                >
                                    {interview.feedback.overallScore}%
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: "background.default",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Communication
                                </Typography>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        mt: 1,
                                        fontWeight: 700,
                                    }}
                                >
                                    {interview.feedback.communication}%
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: "background.default",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Technical Knowledge
                                </Typography>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        mt: 1,
                                        fontWeight: 700,
                                    }}
                                >
                                    {interview.feedback.technicalKnowledge}%
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: "background.default",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Confidence
                                </Typography>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        mt: 1,
                                        fontWeight: 700,
                                    }}
                                >
                                    {interview.feedback.confidence}%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box sx={{ mt: 2 }}>
                <LogoutButton />
            </Box>
        </Box>
    );
};

export default DashboardPage;