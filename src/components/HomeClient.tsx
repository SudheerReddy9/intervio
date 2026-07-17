import { theme } from "@/theme";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { IoPlayCircleOutline } from "react-icons/io5";

export default function Home(): React.JSX.Element | null {
    return (
        <Box
            component="section"
            sx={{
                minHeight: 'calc(100vh - 80px)',
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    md: '1.1fr 0.9fr',
                },
                alignItems: 'center',
                gap: 6,
                px: {
                    xs: 3,
                    md: 8,
                    lg: 12,
                },
                py: {
                    xs: 8,
                    md: 10,
                },
                bgcolor: 'background.default',
            }}
        >
            <Box>
                <Box
                    sx={{
                        gap: 1,
                        alignItems: 'center',
                        display: 'inline-flex',
                        px: 2,
                        mb: 3,
                        borderRadius: '25px',
                        bgcolor: theme.palette.action.disabled
                    }}
                >
                    <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.success.main,
                            position: "relative",
                        }}
                    />
                    <Typography>AI-powered interview coach </Typography>

                </Box>
                <Box>
                    <Typography variant="h1" color="primary.main"> Ace your next<br /> <span style={{ color: '#3182ce' }}>interview</span> with AI</Typography>
                    <Typography sx={{ marginTop: '16px', fontSize: theme.typography.body1, color: theme.palette.text.secondary }}>Practice realistic mock interviews, get instant <br />feedback on every answer, and track your <br />progress with a coach that never gets tired of <br />you.</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 2, gap: 2
                    }}
                >
                    <Button
                        sx={{
                            p: 1.5,
                            whiteSpace: 'nowrap',
                            minWidth: 100,
                            fontFamily: theme.typography.button,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        Start Free
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<IoPlayCircleOutline />}
                    >
                        Watch Demo
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    borderRadius: 0,

                    borderColor: 'green'

                }}
            >
                <Typography>Mock Interview</Typography>
                <Divider />
                <Typography> Question 3 of 8</Typography>
                <Typography> Tell me about your self</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.error.main,
                            position: "relative",
                            boxShadow: theme.shadows[3],
                        }}
                    >

                    </Box>
                    <Typography>Recording...</Typography>
                </Box>
                <Box
                    sx={{
                        p: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        boxShadow: theme.shadows[3],
                    }}
                >
                    <Typography>AI FeedBack</Typography>
                    <Typography>Clarity 91%</Typography>
                    <Typography>Technical 86%</Typography>
                    <Typography>Confidence 78%</Typography>

                </Box>
            </Box>
        </Box>
    )
}