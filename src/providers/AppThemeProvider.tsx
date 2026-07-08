'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme';

interface AppThemeProviderProps {
    children: React.ReactNode;
}

export default function AppThemeProvider({
    children,
}: AppThemeProviderProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}