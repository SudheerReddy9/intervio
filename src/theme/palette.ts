import { PaletteOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
    mode: 'light',
    // Brand Color
    primary: {
        main: '#4F46E5', //Indgo 600
        light: '#6366F1',
        dark: '#4338CA',
        contrastText: '#FFFFFF',
    },

    secondary: {
        main: '#06B6D4',
        light: '#22D3EE',
        dark: '#0891B2',
        contrastText: '#FFFFFF',
    },
    // Status Colors
    success: {
        main: '#16A34A',
    },

    warning: {
        main: '#F59E0B',
    },

    error: {
        main: '#DC2626',
    },

    info: {
        main: '#0284C7',
    },
    // Layout Colors
    background: {
        default: '#F8FAFC',
        paper: '#FFFFFF',
    },
    // Typography Colors
    text: {
        primary: '#0F172A',
        secondary: '#64748B',
    },
    //Borders
    divider: '#E2E8F0',
    //actions
    action: {
        hover: 'rgba(79,70,229,0.08)',
        selected: 'rgba(79,70,229,0.12)',
        disabled: '#94A3B8',
        disabledBackground: '#E2E8F0',
    },
};