import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import ClearIcon from "@mui/icons-material/Clear";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useEffect } from "react";
interface SpeechRecorderProps {
  onTranscriptChange: (transcript: string) => void;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({
  onTranscriptChange,
}) => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();
  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);
  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            endAdornment: <InputAdornment position="end"></InputAdornment>,
          },
        }}
      />
    </Box>
  );
};
export default SpeechRecorder;
