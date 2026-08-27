import MicIcon from "@mui/icons-material/Mic";
import ClearIcon from "@mui/icons-material/Clear";
import StopRoundedIcon from "@mui/icons-material/StopRounded";

import {
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

interface SpeechRecorderProps {
  onTranscriptChange: (transcript: string) => void;
  questionId: number;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({
  onTranscriptChange,
  questionId,
}) => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();

  /*
   * Send transcript back to InterviewPage
   */
  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  /*
   * Clear transcript when question changes
   */
  useEffect(() => {
    clearTranscript();
  }, [clearTranscript, questionId]);

  const handleMicrophone = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 760,
        mx: "auto",

        mt: {
          xs: 3,
          md: 4,
        },

        mb: 4,
      }}
    >
      {/* ================================= */}
      {/* RECORDING CONTROL */}
      {/* ================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          gap: {
            xs: 1.5,
            sm: 2,
          },

          p: {
            xs: 2,
            sm: 2.5,
          },

          borderRadius: 3,

          border: "1px solid",

          borderColor: isListening
            ? "#FCA5A5"
            : "#E2E8F0",

          bgcolor: isListening
            ? "#FEF2F2"
            : "#F8FAFC",

          transition: "all 0.25s ease",
        }}
      >
        {/* MICROPHONE */}

        <IconButton
          onClick={handleMicrophone}
          aria-label={
            isListening
              ? "Stop recording"
              : "Start recording"
          }
          sx={{
            width: {
              xs: 52,
              sm: 58,
            },

            height: {
              xs: 52,
              sm: 58,
            },

            flexShrink: 0,

            bgcolor: isListening
              ? "#EF4444"
              : "#2563EB",

            color: "#FFFFFF",

            boxShadow: isListening
              ? "0 0 0 8px rgba(239,68,68,0.12)"
              : "0 8px 20px rgba(37,99,235,0.20)",

            transition: "all 0.2s ease",

            "&:hover": {
              bgcolor: isListening
                ? "#DC2626"
                : "#1D4ED8",

              transform: "scale(1.04)",
            },
          }}
        >
          {isListening ? (
            <StopRoundedIcon />
          ) : (
            <MicIcon />
          )}
        </IconButton>

        {/* STATUS */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {isListening && (
              <Box
                sx={{
                  width: 8,
                  height: 8,

                  borderRadius: "50%",

                  bgcolor: "#EF4444",

                  animation:
                    "recordingPulse 1.4s infinite",

                  "@keyframes recordingPulse": {
                    "0%": {
                      opacity: 1,
                      transform: "scale(1)",
                    },

                    "50%": {
                      opacity: 0.4,
                      transform: "scale(1.4)",
                    },

                    "100%": {
                      opacity: 1,
                      transform: "scale(1)",
                    },
                  },
                }}
              />
            )}

            <Typography
              sx={{
                fontWeight: 700,

                color: isListening
                  ? "#B91C1C"
                  : "#0F172A",

                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                },
              }}
            >
              {isListening
                ? "Listening to your answer..."
                : transcript
                  ? "Answer recorded"
                  : "Ready to answer"}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 0.4,

              color: "#64748B",

              lineHeight: 1.5,

              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {isListening
              ? "Speak naturally. Click the stop button when you're finished."
              : transcript
                ? "Review your answer below or record it again."
                : "Click the microphone when you're ready to start speaking."}
          </Typography>
        </Box>

        {/* CLEAR ANSWER */}

        {transcript && !isListening && (
          <IconButton
            onClick={clearTranscript}
            aria-label="Clear answer"
            title="Clear answer"
            sx={{
              flexShrink: 0,

              color: "#64748B",

              "&:hover": {
                color: "#DC2626",
                bgcolor: "#FEF2F2",
              },
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      {/* ================================= */}
      {/* TRANSCRIPT */}
      {/* ================================= */}

      <Box
        sx={{
          mt: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#334155",
            }}
          >
            Your answer
          </Typography>

          {transcript && (
            <Typography
              variant="caption"
              sx={{
                color: "#94A3B8",
              }}
            >
              Speech transcript
            </Typography>
          )}
        </Box>

        <TextField
          fullWidth
          value={transcript}
          multiline
          minRows={6}
          maxRows={10}
          placeholder={
            isListening
              ? "Listening..."
              : "Your spoken answer will appear here..."
          }
          slotProps={{
            htmlInput: {
              readOnly: true,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              alignItems: "flex-start",

              borderRadius: 3,

              bgcolor: "#FFFFFF",

              transition: "all 0.2s ease",

              "& fieldset": {
                borderColor: isListening
                  ? "#93C5FD"
                  : "#CBD5E1",
              },

              "&:hover fieldset": {
                borderColor: isListening
                  ? "#60A5FA"
                  : "#94A3B8",
              },
            },

            "& .MuiInputBase-input": {
              fontFamily: "inherit",

              fontSize: {
                xs: "0.95rem",
                sm: "1rem",
              },

              lineHeight: 1.7,

              color: "#334155",
            },

            "& textarea::placeholder": {
              color: "#94A3B8",
              opacity: 1,
            },
          }}
        />

        {/* HELPER MESSAGE */}

        {!transcript && !isListening && (
          <Typography
            variant="body2"
            sx={{
              mt: 1.25,

              color: "#94A3B8",

              lineHeight: 1.5,
            }}
          >
            Your answer will be transcribed automatically
            while you speak.
          </Typography>
        )}

        {transcript && !isListening && (
          <Typography
            variant="body2"
            sx={{
              mt: 1.25,

              color: "#64748B",

              lineHeight: 1.5,
            }}
          >
            If you&apos;re happy with your answer, continue
            to the next question.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SpeechRecorder;