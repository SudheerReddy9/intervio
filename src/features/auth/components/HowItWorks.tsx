import { theme } from "@/theme";
import { Box, Typography } from "@mui/material";

export default function HowItWorks(): React.JSX.Element | null {
    const steps = [
        {
            number: '01',
            title: 'Upload Resume',
            description:
                'Upload your resume so Intervio can personalize interview questions based on your experience.',
        },
        {
            number: '02',
            title: 'Practice Interviews',
            description:
                'Answer AI-generated interview questions tailored to your target role and technology stack.',
        },
        {
            number: '03',
            title: 'Receive AI Feedback',
            description:
                'Get instant scores, strengths, weaknesses, and actionable suggestions after every interview.',
        },
    ]
    return (
        <Box
            sx={{
                justifyContent: 'space-between',

                py: {
                    xs: 8,
                    md: 10,
                },
                bgcolor: 'background.default',
            }}
        >
            <Typography variant="h2">
                How It Works
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
            >
                Everything you need to prepare for your next interview in three simple steps.
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                    mt: 6,
                }}
            >
                {steps.map((s) => {
                    return (
                        <Box
                            sx={{
                                mx: 1,
                                p: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: '16px',
                                bgcolor: 'background.paper',
                                boxShadow: theme.shadows[2],

                            }}
                        >
                            <Typography
                                variant="h1"
                                component="div"

                                color="primary.main"
                                sx={{ fontWeight: 700, }}
                            >
                                {s.number}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>{s.title}</Typography>
                            <Typography variant="body1">{s.description}</Typography>
                        </Box>
                    )
                })}

            </Box>
        </Box>
    )
}