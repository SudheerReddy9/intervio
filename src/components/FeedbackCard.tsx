import { InterviewFeedback } from "@/features/speech/types";

import {
  Box,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

interface FeedbackCardProps {
  feedback: InterviewFeedback | null;
}

const getScoreColor = (score: number) => {
  if (score < 30) return "#EF4444";
  if (score < 60) return "#F59E0B";
  if (score < 80) return "#3B82F6";
  return "#22C55E";
};

const getScoreLabel = (score: number) => {
  if (score < 30) return "Needs Improvement";
  if (score < 60) return "Developing";
  if (score < 80) return "Good";
  if (score < 90) return "Strong";
  return "Excellent";
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedback,
}) => {
  if (!feedback) {
    return null;
  }

  const scores = [
    {
      label: "Communication",
      value: feedback.communication,
      description: "Clarity and structure of your answers",
    },
    {
      label: "Technical Knowledge",
      value: feedback.technicalKnowledge,
      description: "Depth and accuracy of your knowledge",
    },
    {
      label: "Confidence",
      value: feedback.confidence,
      description: "Confidence demonstrated in your responses",
    },
  ];

  const overallColor = getScoreColor(
    feedback.overallScore
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",

        p: {
          xs: 2.5,
          sm: 4,
          md: 5,
        },

        borderRadius: 4,

        border: "1px solid #E2E8F0",

        bgcolor: "#FFFFFF",

        boxShadow:
          "0 20px 60px rgba(15, 23, 42, 0.08)",
      }}
    >
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            color: "#6366F1",
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          AI Interview Analysis
        </Typography>

        <Typography
          component="h2"
          sx={{
            mt: 1,

            fontSize: {
              xs: "1.7rem",
              sm: "2rem",
            },

            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.03em",
          }}
        >
          Your Interview Performance
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#64748B",
          }}
        >
          Here&apos;s how you performed across the key
          interview areas.
        </Typography>
      </Box>

      {/* ============================= */}
      {/* OVERALL SCORE */}
      {/* ============================= */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          py: {
            xs: 3,
            sm: 4,
          },

          mb: 4,

          borderRadius: 3,

          background:
            "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)",

          border: "1px solid #E2E8F0",
        }}
      >
        {/* SCORE CIRCLE */}

        <Box
          sx={{
            width: {
              xs: 130,
              sm: 150,
            },

            height: {
              xs: 130,
              sm: 150,
            },

            borderRadius: "50%",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            bgcolor: "#FFFFFF",

            border: `8px solid ${overallColor}`,

            boxShadow:
              "0 12px 30px rgba(15, 23, 42, 0.10)",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "2.2rem",
                sm: "2.6rem",
              },

              lineHeight: 1,

              fontWeight: 800,
              color: "#0F172A",
            }}
          >
            {feedback.overallScore}%
          </Typography>

          <Typography
            variant="caption"
            sx={{
              mt: 0.7,
              color: "#64748B",
              fontWeight: 600,
            }}
          >
            Overall Score
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 2,

            fontWeight: 800,
            fontSize: "1.15rem",

            color: overallColor,
          }}
        >
          {getScoreLabel(feedback.overallScore)}
        </Typography>
      </Box>

      {/* ============================= */}
      {/* CATEGORY SCORES */}
      {/* ============================= */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },

          gap: 2,

          mb: 4,
        }}
      >
        {scores.map((score) => {
          const scoreColor = getScoreColor(score.value);

          return (
            <Box
              key={score.label}
              sx={{
                p: 2.5,

                border: "1px solid #E2E8F0",
                borderRadius: 3,

                bgcolor: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  gap: 1,

                  mb: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#334155",
                  }}
                >
                  {score.label}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 800,
                    color: scoreColor,
                  }}
                >
                  {score.value}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={score.value}
                sx={{
                  height: 8,

                  borderRadius: 10,

                  bgcolor: "#E2E8F0",

                  "& .MuiLinearProgress-bar": {
                    borderRadius: 10,
                    bgcolor: scoreColor,
                  },
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  mt: 1.5,

                  color: "#64748B",
                  lineHeight: 1.5,
                }}
              >
                {score.description}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ============================= */}
      {/* AI FEEDBACK */}
      {/* ============================= */}

      <Box
        sx={{
          p: {
            xs: 2.5,
            sm: 3,
          },

          borderRadius: 3,

          bgcolor: "#F8FAFC",

          border: "1px solid #E2E8F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,

            mb: 1.5,
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: 2,

              bgcolor: "#EEF2FF",
            }}
          >
            ✨
          </Box>

          <Typography
            sx={{
              fontWeight: 800,
              color: "#0F172A",
              fontSize: "1.05rem",
            }}
          >
            Your AI Feedback
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#475569",

            lineHeight: 1.8,

            fontSize: {
              xs: "0.95rem",
              sm: "1rem",
            },
          }}
        >
          {feedback.overallFeedback}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FeedbackCard;