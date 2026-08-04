'use client'
import HomeClient from '@/components/HomeClient';
import HowItWorks from '@/features/auth/components/HowItWorks';
import SpeechRecorder from '@/features/speech/components/SpeechRecorder';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container >

      <HomeClient />
      <HowItWorks />
    </Container>
  );
}