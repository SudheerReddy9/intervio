import QuestionCard from "@/features/speech/components/QuestionCard";
import SpeechRecorder from "@/features/speech/components/SpeechRecorder";
import { Container } from "@mui/material";

export default function InterviewPage() {
    return (
        <Container>
            <QuestionCard />
            <SpeechRecorder />
        </Container>
    );
}