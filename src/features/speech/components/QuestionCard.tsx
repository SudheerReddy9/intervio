import { Box, Typography } from "@mui/material";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <Box>
      <Typography>
        Question {questionNumber} of {totalQuestions}
      </Typography>

      <Typography>{question}</Typography>
    </Box>
  );
};

export default QuestionCard;
