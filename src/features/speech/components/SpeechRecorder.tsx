import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import MicIcon from "@mui/icons-material/Mic";
import ClearIcon from "@mui/icons-material/Clear";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useState } from "react";

const SpeechRecorder: React.FC = (

) => {
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        clearTranscript,
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">
                        {isListening
                            ? "🎤 Listening..."
                            : "🎤 Click the microphone to start"}
                    </Typography>

                    {transcript && (
                        <IconButton onClick={clearTranscript}>
                            <ClearIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>
            <TextField
                fullWidth
                value={transcript}
                multiline
                minRows={8}
                placeholder="Start Speaking..."
                slotProps={{
                    htmlInput: {
                        readOnly: true,
                    },
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">

                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Button
                variant="contained"
                disabled={!transcript.trim()}
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
        </Box >
    )
}
export default SpeechRecorder;