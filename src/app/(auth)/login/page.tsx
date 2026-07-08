'use client'
import { Box, Button, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation";
import Image from 'next/image';

const LoginPage: React.FC = () => {
    const router = useRouter();
    return (
        <Box
            sx={{
                padding: 5,
                justifyContent: 'center'

            }}
        >
            <Box >
                <Image
                    src='/intervio_Logo.png'
                    width={100}
                    height={100} alt={""}
                />

            </Box>



            <Box sx={{ my: 3 }}>
                <Typography>
                    Sign in to access your account details and order history. If you don’t have an account
                    yet, you can <b>request an account</b> and (optionally) have us keep inventory on hand for
                    your recurring needs.
                </Typography>

                <Box
                    sx={{
                        width: '100%',
                        height: '5px',
                        background: 'var(--background-gradient-secondary)',
                        position: 'relative',
                        mt: '10px',
                        mb: '10px',
                    }}
                />
            </Box>
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
            <Button>
                Login
            </Button>
            <Button
                variant="text"
                sx={{
                    textTransform: 'none',
                    textDecoration: 'underline',
                    minWidth: 'auto',
                    p: 0,
                }}
            >
                Forgot Password?
            </Button>
            <Box>
                <Typography variant="body1">
                    Don't have an account?
                </Typography>
                <Button
                    onClick={() => router.push('/register')
                    }
                    variant="text"
                    sx={{
                        textTransform: 'none',
                        textDecoration: 'underline',
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