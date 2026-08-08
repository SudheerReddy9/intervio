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

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  if (!feedback) {
    return null;
  }

  const scores = [
    {
      label: "Overall Score",
      value: feedback.overallScore,
    },
    {
      label: "Communication",
      value: feedback.communication,
    },
    {
      label: "Technical Knowledge",
      value: feedback.technicalKnowledge,
    },
    {
      label: "Confidence",
      value: feedback.confidence,
    },
  ];

  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700 }}
      >
        🤖 AI Feedback
      </Typography>

      <Box sx={{ mt: 3 }}>
        {scores.map((score) => (
          <Box
            key={score.label}
            sx={{ mb: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography>
                {score.label}
              </Typography>

              <Typography sx={{ fontWeight: 700 }}>
                {score.value}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={score.value}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#E5E7EB",

                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  backgroundColor:
                    getScoreColor(score.value),
                },
              }}
            />
          </Box>
        ))}
      </Box>

      <Typography
        sx={{
          mt: 3,
          color: "text.secondary",
          lineHeight: 1.7,
        }}
      >
        {feedback.overallFeedback}
      </Typography>
    </Paper>
  );
};

export default FeedbackCard;