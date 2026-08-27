"use client";

import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";
import HowItWorks from "@/features/auth/components/HowItWorks";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container maxWidth="xl">
        <HomeClient />
        <HowItWorks />
      </Container>

      <Footer />
    </>
  );
}