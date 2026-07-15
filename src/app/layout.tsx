import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import AppThemeProvider from '@/providers/AppThemeProvider';
import Header from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Intervio',
  description: 'AI-powered interview preparation platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}