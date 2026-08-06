import { InterviewFeedback } from "@/features/speech/types";
import { Paper, Typography } from "@mui/material";

interface FeedbackCardProps {
    feedback: InterviewFeedback | null;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
    if (!feedback) {
        return null;
    }

    return (
        <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5">
                AI Feedback
            </Typography>

            <Typography>
                Overall Score: {feedback.overallScore}
            </Typography>

            <Typography>
                Communication: {feedback.communication}
            </Typography>

            <Typography>
                Technical Knowledge: {feedback.technicalKnowledge}
            </Typography>

            <Typography>
                Confidence: {feedback.confidence}
            </Typography>

            <Typography sx={{ mt: 2 }}>
                {feedback.overallFeedback}
            </Typography>
        </Paper>
    );
};

export default FeedbackCard;