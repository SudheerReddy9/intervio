'use client'
import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    Snackbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
const ResumeUpload = () => {
    const router = useRouter();
    const [resume, setResume] = useState<File | null>(null);
    const [questions, setQuestions] = useState<
        { id: number; question: string; category: string }[]
    >([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]
        if (!file) {
            return;
        }
        if (file.type !== 'application/pdf') {
            return;
        }
        setResume(file)
    }
    const handleUpload = async () => {
        if (!resume) {
            return
        }
        const formData = new FormData()
        formData.append('resume', resume)
        const response = await fetch('api/resume/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        console.log(data);

        if (data.success) {
            sessionStorage.setItem(
                "interviewQuestions",
                JSON.stringify(data.questions)
            );

            router.push("/questions");
        }
    }
    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 80px)",
                position: "relative",
                overflow: "hidden",
                py: {
                    xs: 6,
                    md: 10,
                },
                px: 2,

                background: `
            radial-gradient(
                circle at 50% 35%,
                rgba(37, 99, 235, 0.20) 0%,
                rgba(37, 99, 235, 0.08) 25%,
                transparent 50%
            ),
            linear-gradient(
                180deg,
                #111827 0%,
                #030712 100%
            )
        `,
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 5,
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: "white",
                        }}
                    >
                        Personalize Your{" "}
                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg, #60A5FA, #818CF8)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            Interview
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mt: 2,
                            color: "#94A3B8",
                        }}
                    >
                        Upload your resume and we&apos;ll generate questions
                        based on your actual experience.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        maxWidth: 700,
                        mx: 'auto',
                        p: {
                            xs: 3,
                            md: 5,
                        },
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        boxShadow: `
    0 25px 60px rgba(0, 0, 0, 0.45),
    0 0 35px rgba(79, 70, 229, 0.18)
`,

                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 700,
                            mx: "auto",
                            mt: 5,
                            p: {
                                xs: 3,
                                md: 5,
                            },

                            bgcolor: "#FFFFFF",
                            borderRadius: 4,

                            border: "1px solid rgba(255,255,255,0.15)",


                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                            }}
                        >
                            Upload your Resume
                        </Typography>

                        <Typography color="text.secondary">
                            Drag & drop your resume here
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                my: 3,
                            }}
                        >
                            <Divider sx={{ flex: 1 }} />

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ px: 2 }}
                            >
                                OR
                            </Typography>

                            <Divider sx={{ flex: 1 }} />
                        </Box>

                        <Button
                            component="label"
                            variant="contained"
                            sx={{
                                px: 5,
                                py: 1.4,
                                borderRadius: 3,
                                fontWeight: 700,

                                background:
                                    "linear-gradient(135deg, #4F46E5, #6366F1)",

                                boxShadow:
                                    "0 8px 24px rgba(79, 70, 229, 0.35)",

                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #4338CA, #4F46E5)",
                                    boxShadow:
                                        "0 10px 30px rgba(79, 70, 229, 0.45)",
                                },
                            }}
                        >
                            Browse Resume

                            <input
                                hidden
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />
                        </Button>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 2 }}
                        >
                            PDF only • Maximum 5 MB
                        </Typography>
                    </Box>

                    {resume && (
                        <Box
                            sx={{
                                mt: 3,
                                p: 2.5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: 2,
                                bgcolor: '#F0FDF4',
                                border: '1px solid #BBF7D0',
                            }}
                        >
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: 'success.main',
                                    }}
                                >
                                    ✓ Resume selected
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {resume.name}
                                </Typography>
                            </Box>

                            <Button
                                color="error"
                                onClick={() => setResume(null)}
                            >
                                Remove
                            </Button>
                        </Box>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={!resume}
                        onClick={handleUpload}
                        sx={{
                            mt: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 700,
                        }}
                    >
                        Continue
                    </Button>
                </Box>
                {questions.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5">
                            Your Personalized Interview Questions
                        </Typography>

                        {questions.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: "background.paper",
                                    boxShadow: 2,
                                }}
                            >
                                <Typography sx={{ fontWeight: 600 }}>
                                    {index + 1}. {item.question}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Container>
            <Snackbar
                open={showSuccess}
                autoHideDuration={4000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setShowSuccess(false)}
                >
                    Resume uploaded successfully! Your interview is ready 🚀
                </Alert>
            </Snackbar>
        </Box>
    )
}
export default ResumeUpload;