'use client'
import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { theme } from "@/theme";

const LoginPage: React.FC = () => {
    const router = useRouter();
    return (

        <Box
            sx={{
                p: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: 500,
                borderWidth: '5px',
                background: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
            }}
        >
            <Box
                sx={{
                    textAlign: 'center'
                }}
            >
                <Image
                    src='/intervio_Logo.png'
                    width={100}
                    height={100} alt={""}
                />

            </Box>

            <Typography sx={{ fontFamily: theme.typography.h6, textAlign: 'center' }}>Welcome Back</Typography>
            <Typography sx={{ fontFamily: theme.typography.body1, textAlign: 'center' }}>Continue your interview journey</Typography>
            <Box>
                <Typography >
                    Email
                </Typography>
                <TextField
                    fullWidth
                    placeholder='example@email.com'
                >
                </TextField>
                <Typography >
                    Password
                </Typography>
                <TextField
                    fullWidth
                    placeholder='********'
                >
                </TextField>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button variant="text" sx={{
                        fontFamily: theme.typography.body2
                    }}>
                        Forgot Password?
                    </Button>
                </Box>
            </Box>
            <Button
                fullWidth
                sx={{
                    p: 1,
                    fontFamily: theme.typography.button,
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                }}
            >
                Sign In
            </Button>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    my: 3,
                }}
            >
                <Divider sx={{ flex: 1 }} />
                <Typography
                    variant="body2"
                    sx={{
                        px: 2,
                        color: "text.secondary",
                    }}
                >
                    OR
                </Typography>
                <Divider sx={{ flex: 1 }} />
            </Box>
            <Box
                sx={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Typography variant="body1" sx={{
                    px: 1,
                    fontFamily: theme.typography.body2
                }}>
                    Don't have an account?
                </Typography>
                <Button
                    onClick={() => router.push('/register')
                    }
                    variant="text"
                    sx={{
                        fontFamily: theme.typography.body2,
                        textTransform: 'none',
                        minWidth: 'auto',
                        p: 0,
                    }}
                >
                    Create Account
                </Button>
            </Box>
        </Box >

    )
}
export default LoginPage