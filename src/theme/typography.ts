

export const typography = {
    fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
    ].join(','),

    h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.03em'
    },
    h2: {
        fontSize: '3.0rem',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.02em'
    },
    h3: {
        fontSize: '2.25rem',
        fontWeight: 600,
        lineHeight: 1.25,
    },
    h4: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3
    },
    h5: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.35
    },
    h6: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4
    },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.7
    },
    body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6
    },
    button: {
        fontSize: '0.95rem',
        fontWeight: 600,
        textTransform: 'none' as const,
        letterSpacing: '0.01em',
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.5
    }
}