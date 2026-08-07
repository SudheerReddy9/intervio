import { InterviewFeedback } from "@/features/speech/types";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";

interface FeedbackCardProps {
  feedback: InterviewFeedback | null;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  if (!feedback) {
    return null;
  }
  const getScoreColor = (score: number) => {
    if (score < 30) return "#EF4444";
    if (score < 60) return "#F59E0B";
    if (score < 80) return "#3B82F6";
    return "#22C55E";
  };
  return (

    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5">AI Feedback</Typography>

      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>
          Overall Score: {feedback.overallScore}%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={feedback.overallScore}
          sx={{
            width: '25%',
            height: 5,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              backgroundColor: getScoreColor(feedback.overallScore),
            },
            backgroundColor: "#E5E7EB",
          }}
        />
      </Box>

      <Typography>Communication: {feedback.communication}</Typography>

      <Typography>
        Technical Knowledge: {feedback.technicalKnowledge}
      </Typography>

      <Typography>Confidence: {feedback.confidence}</Typography>

      <Typography sx={{ mt: 2 }}>{feedback.overallFeedback}</Typography>
    </Paper>
  );
};

export default FeedbackCard;
