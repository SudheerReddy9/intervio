import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import AppThemeProvider from "@/providers/AppThemeProvider";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "YourCareerForge | AI Interview Preparation",
  description:
    "Practice personalized interviews, get AI-powered feedback, and improve your interview performance with YourCareerForge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppThemeProvider>
          <Header />
          {children}
        </AppThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
