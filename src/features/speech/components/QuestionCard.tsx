import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { resume } from "react-dom/server"
import { resumeQuestions } from "../data/resumeQuestion"

interface QuestionCardProps {
    question: string,
    questionNumber: number,
    totalQuestions: number
}
const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    questionNumber,
    totalQuestions
}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    return (
        <Box>
            <Typography>
                Question {questionNumber} of {totalQuestions}
            </Typography>
            <Typography>
                {question}
            </Typography>
            <QuestionCard
                question={resumeQuestions[currentQuestion].question}
                questionNumber={currentQuestion + 1}
                totalQuestions={resumeQuestions.length}
            />
            <Button
                variant="contained"
                onClick={() => {
                    if (currentQuestion < resumeQuestions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1)
                    }
                }
                }
            >
                NextQuestion
            </Button>
        </Box>
    )
}
export default QuestionCard;