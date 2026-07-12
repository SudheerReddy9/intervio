'use client'
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <Container maxWidth="lg">
      <Box
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
      </Box>
    </Container>
  );
}