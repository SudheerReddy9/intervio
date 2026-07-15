import { theme } from "@/theme";
import { AppBar, Box, Button, Toolbar, Typography, } from "@mui/material"
import Image from 'next/image';
import Link from 'next/link';
const Header: React.FC = () => {
    const navItems: Array<{
        label: string;
        href: string;
    }> = [
            {
                label: 'Features',
                href: '/projects',
            },
            {
                label: 'Pricing',
                href: '/experience',
            },
            {
                label: 'About',
                href: '/contact',
            },
        ];
    return (
        <AppBar
            component='main'
            position='sticky'
            sx={{
                background: theme.palette.background.default
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 0.5,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        px: '12px',
                        pt: '12px'

                    }}

                >
                    <Link href='/' passHref>
                        <Image
                            src='/intervio_Logo.png'
                            alt='Intervio Logo'
                            width={50}
                            height={50}

                        />
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    {navItems.map((item) => {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontFamily: theme.typography.button,
                                        fontSize: theme.typography.h6,
                                        p: '12px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Link>
                        )
                    })

                    }
                </Box>
                <Button
                    sx={{
                        p: 1,
                        whiteSpace: 'nowrap',
                        minWidth: 100,
                        fontFamily: theme.typography.button,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    Sign In
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;