import { Box, Button, IconButton, Paper, Typography } from "@mui/material"
import MicIcon from "@mui/icons-material/Mic";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useState } from "react";

const SpeechRecorder: React.FC = (

) => {
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
    } = useSpeechRecognition();
    const [feedback, setFeedback] = useState('');
    const evaluateAnswer = async () => {
        if (!transcript.trim()) {
            return;
        }

        const response = await fetch('/api/interview/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: transcript,
            }),
        });

        const data = await response.json();

        console.log(data);

        setFeedback(data.answer);
    };
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
            <Button
                variant="contained"
                onClick={evaluateAnswer}
            >
                Evaluate Answer
            </Button>
            <Paper
                sx={{
                    mt: 3,
                    p: 2,
                }}
            >
                <Typography variant="h6">
                    API Response
                </Typography>

                <Typography>
                    {feedback}
                </Typography>
            </Paper>
        </Box>
    )
}
export default SpeechRecorder;