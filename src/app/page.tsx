'use client'
import HomeClient from '@/components/HomeClient';
import HowItWorks from '@/features/auth/components/HowItWorks';
import SpeechRecorder from '@/features/speech/components/SpeechRecorder';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container >
      {/* <Box
        sx={{
          py: 10,
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" gutterBottom>
          Welcome to Intervio
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}
        >
          AI-powered interview preparation platform built with Next.js,
          TypeScript and Material UI.
        </Typography>

        <Button variant="contained" size="large"
          onClick={() => router.push('/register')
          }
        >

          Get Started
        </Button>
      </Box> */}
      <HomeClient />
      <HowItWorks />
      <SpeechRecorder />
    </Container>
  );
}