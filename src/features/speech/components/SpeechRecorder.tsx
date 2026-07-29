import { Box, Button, IconButton, Paper, Typography } from "@mui/material"
import MicIcon from "@mui/icons-material/Mic";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

const SpeechRecorder: React.FC = (

) => {
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
    } = useSpeechRecognition();
    return (

        <Box
            sx={{
                maxWidth: 700,
                margin: '40px auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}
        >
            <IconButton
                color={isListening ? "error" : "primary"}
                onClick={() => {
                    if (isListening) {
                        stopListening();
                    } else {
                        startListening();
                    }
                }}
            >
                <MicIcon />
            </IconButton>
            <Typography variant="h6">
                {isListening ? "🎤 Listening..." : "Click the microphone to start"}
            </Typography>
            <Paper
                elevation={2}
                sx={{
                    minHeight: 200,
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Typography>
                    {transcript || "Start speaking..."}
                </Typography>
            </Paper>
            <Button>
                Evaluate
            </Button>
        </Box>
    )
}
export default SpeechRecorder;