import { theme } from "@/theme";
import { Box, Chip, Typography } from "@mui/material";

export default function Home(): React.JSX.Element | null {
    return (
        <Box
            sx={{
                background: theme.palette.background.default,
                top: 80,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'

            }}
        >
            <Box>
                <Box
                    sx={{
                        fontFamily: theme.palette.primary.dark,
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
            </Box>
        </Box>
    )
}